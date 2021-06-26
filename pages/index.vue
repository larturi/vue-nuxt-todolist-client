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
                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              >
              
              <button 
                class="shadow appearance-none w-full py-3 px-3 mt-1 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" 
                type="submit"
              >
                Añadir Tarea
              </button>

            </form>

            <div>
              <h1 class="mt-8">Tareas Pendientes</h1>
              <Tarea 
                v-for="tarea of tasks"
                :key="tarea.id"
                :name="tarea.name" 
                :id="tarea.id"
              />
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
      task: ''
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

    removeTask(index) {
      this.$store.commit('removeTask', index);
    },

    editTask(task) {

    },

    async getTasks() {

      try {
        const { data } = await axios.get('http://todolist-vue-laravel-server.test/api/tasks');

        data.forEach(task => {
          this.$store.commit('addTask', task);
        });

      } catch (error) {
        console.error(error);
      }

    }

  }

}
</script>

<style>


</style>
