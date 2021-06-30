<template>
  <div class="">

    <div class="mt-4">
      
        <div class="flex justify-center">
          <div class="mt-3 md:w-6/12">

            <div>
              <h1 class="mt-8 font-bold font-xl mb-6 bg-white text-black p-3 border-l-8 border-pink">Tareas Completadas</h1>
              <ul class="mb-10 bg-black">
                <Tarea 
                  v-for="(tarea, index) in tasks"
                  :key="tarea.id"
                  :task="tarea"
                  :index="index"
                  padre="completadas"
                  @toggleCompletedTask="toggleCompletedTask(tarea)"
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
      return this.$store.state.tasksCompleted;
    },
    colorButtonAddOrEdit() {
      return this.isEdit ? 'bg-yellow text-black' : 'bg-pink text-white';
    }
  },

  mounted() {
    this.getTasks();
  },

  methods: {

    async toggleCompletedTask(tarea) {

      // Elimino del store
      this.$store.commit('removeCompletedTask', tarea);
      
      // Actualizo en la BD
      tarea.completed = false;
      await axios.put(`http://todolist-vue-laravel-server.test/api/tasks/${tarea.id}`, tarea);
    },

    async getTasks() {
      try {
        const { data } = await axios.get('http://todolist-vue-laravel-server.test/api/tasks?completed=1');

        this.$store.commit('clearCompletedTasks');

        data.forEach(task => {
          this.$store.commit('addCompletedTask', task);
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
