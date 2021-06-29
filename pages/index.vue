<template>
  <div class="">

    <div class="mt-4">
      
        <div class="flex justify-center">
          <div class="mt-3 md:w-6/12">
            <form @submit.prevent="addTask">

              <div class="relative mt-5">
                <input 
                  class="w-full h-10 shadow appearance-none pl-3 pr-8 py-6 text-black text-base placeholder-gray focus:shadow-outline" 
                  type="text"
                  v-model="task"
                  placeholder="¿Qué vas a hacer hoy?"
                />
                <button 
                  class="absolute inset-y-0 right-0 flex items-center px-4 py-6 font-bold text-white"
                  :class="colorButtonAddOrEdit" 
                  type="submit"
                >
                   {{ (isEdit) ? 'Editar Tarea': 'Añadir Tarea' }}
                </button>
              </div>

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
      return this.isEdit ? 'bg-yellow text-black' : 'bg-pink text-white';
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
