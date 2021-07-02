<template>
  <div>

    <div class="mt-4">

        <div class="flex justify-center">
          <div class="mt-3 w-10/12 lg:w-6/12">

          <h1 class="p-3 rounded mt-4 mb-8 bg-white text-black text-center text-lg font-bold border-yellow border-l-8">
            Completadas
          </h1>

            <div>

              <Loading v-if="loading"/>
              
              <ul v-else class="mb-32 bg-black">
                <Tarea 
                  v-for="(tarea, index) in tasks"
                  :key="tarea.id"
                  :task="tarea"
                  :index="index"
                  padre="completadas"
                />
              </ul>

              <NoTasks 
                v-if="tasks.length === 0"
                mensaje="No hay tareas completadas."
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
import NoTasks from '../components/NoTasks.vue';
import Loading from '../components/Loading.vue';

export default {

  data() {
    return {
      task: '',
      isEdit: false,
      loading: true,
    }
  },

  head() {
    return {
      title: 'Todolist Nuxt & Laravel'
    }
  },

  components: {
    Tarea,
    NoTasks,
    Loading
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

    async getTasks() {
      this.loading = true;

      try {
        const { data } = await axios.get(`${process.env.baseUrl}/api/tasks?completed=1`);

        this.$store.commit('clearCompletedTasks');

        data.forEach(task => {
          this.$store.commit('addCompletedTask', task);
        });

        this.loading = false;

      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },

  }

}
</script>

<style>


</style>
