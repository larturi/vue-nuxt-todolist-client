<template>
  <div>

    <div class="mt-4">
      
        <div class="flex justify-center">
          <div class="mt-3 w-10/12 lg:w-6/12">

            <div>
              
              <ul class="mb-32 bg-black">
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
    Tarea,
    NoTasks
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
      try {
        const { data } = await axios.get(`${process.env.baseUrl}/api/tasks?completed=1`);

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
