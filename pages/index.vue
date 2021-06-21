<template>
  <div class="">

    <div class="mt-4">
      
        <div class="flex justify-center">
          <div class="mt-3 md:w-6/12">
            <form>
              <input 
                type="text"
                placeholder="¿Qué vas a hacer hoy?"
                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              >
              
              <button 
                class="shadow appearance-none w-full py-3 px-3 mt-1 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" 
                type="button"
              >
                Añadir Tarea
              </button>

            </form>

            <div>
              <h1 class="mt-8">Tareas Pendientes</h1>
              <Tarea 
                v-for="tarea of tareas"
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
  components: {
    Tarea
  },
  head() {
    return {
      title: 'Todolist Nuxt & Laravel'
    }
  },
  data() {
    return {
      tareas: []
    }
  },
  async created() {
    try {
      const res = await axios.get('http://todolist-vue-laravel-server.test/api/tasks');
      this.tareas = res.data;
      console.log(this.tareas)
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style>


</style>
