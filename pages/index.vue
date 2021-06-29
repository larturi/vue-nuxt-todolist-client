<template>
  <div class="">

    <div class="mt-4">
      
        <div class="flex justify-center">
          <div class="mt-3 md:w-6/12">
            <form @submit.prevent="addTask">
              <input 
                type="text"
                v-model="task"
                placeholder="¿Qué vas a hacer hoy?"
                class="shadow appearance-none border w-full py-2 px-3 text-black focus:outline-none focus:shadow-outline"
              >
              
              <button 
                class="shadow appearance-none w-full py-3 px-3 mt-1 font-bold uppercase 
                       text-xs hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                :class="colorButtonAddOrEdit" 
                type="submit"
              >
                {{ (isEdit) ? 'Editar Tarea': 'Añadir Tarea' }}
              </button>

            </form>

            <div>
              <h1 class="mt-8 font-bold font-xl mb-6 bg-white text-black p-3 border-l-8 border-yellow">Tareas Pendientes</h1>
              <ul class="mb-10 bg-black">
                <Tarea 
                  v-for="(tarea, index) in tasks"
                  :key="tarea.id"
                  :task="tarea"
                  :index="index"
                  @removeTask="removeTask(tarea)"
                  @toggleCompletedTask="toggleCompletedTask(tarea)"
                  @selectTask="selectTask(tarea)"
                  @cancelTask="cancelTask()"
                />
              </ul>
              
            </div>
          </div>
        </div>
      
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import Tarea from '../components/Tarea.vue';

export default {

  data() {
    return {
      task: '',
      isEdit: false
    }
  },

  head() {
    return {
      title: 'Todolist Nuxt & Laravel'
    }
  },

  components: {
    Tarea
  },

  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    colorButtonAddOrEdit() {
      return this.isEdit ? 'bg-yellow text-black' : 'bg-gray text-white';
    }
  },

  mounted() {
    this.getTasks();
  },

  methods: {

    async addTask() {

      if (this.task !== '') {

        try {
          // Grabar en BD
          const { data } = await axios.post('http://todolist-vue-laravel-server.test/api/tasks', { "name": this.task });

          // Actualizar state
          this.$store.commit('addTask', data);
          this.task = '';

        } catch (error) {
          console.error(error);
        }

      }
    },
    selectTask(tarea) {
      this.task = tarea.name;
      this.isEdit = true;
    },
    cancelTask() {
      this.task = '';
      this.isEdit = false;
    },
    async removeTask(tarea) {
      // Elimino del store
      this.$store.commit('removeTask', tarea);
      
      // Elimino de la BD
      tarea.deleted = true;
      await axios.put(`http://todolist-vue-laravel-server.test/api/tasks/${tarea.id}`, tarea);
    },
    async toggleCompletedTask(tarea) {
      // Elimino del store
      this.$store.commit('removeTask', tarea);
      
      // Actualizo en la BD
      tarea.completed = true;
      await axios.put(`http://todolist-vue-laravel-server.test/api/tasks/${tarea.id}`, tarea);
    },
    async editTask(tarea) {
      // Edito en el store
      // this.$store.commit('editTask', tarea);
      
      // Edito en la BD
      // tarea.name = "Lalala";
      // await axios.put(`http://todolist-vue-laravel-server.test/api/tasks/${tarea.id}`, tarea);
    },
    async getTasks() {
      try {
        const { data } = await axios.get('http://todolist-vue-laravel-server.test/api/tasks');

        this.$store.commit('clearTasks');

        data.forEach(task => {
          this.$store.commit('addTask', task);
        });

      } catch (error) {
        console.error(error);
      }
    },

  }

}
</script>

<style>


</style>
