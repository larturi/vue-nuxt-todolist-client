<template>
  <div>

    <div class="mt-4">
      
        <div class="flex justify-center">

          <div class="mt-3 w-10/12 lg:w-6/12">

            <form @submit.prevent="addTask">

              <div class="relative mt-5">
                <input 
                  class="w-full h-10 shadow appearance-none pl-3 pr-8 py-6 text-black text-base 
                       placeholder-gray focus:shadow-outline rounded" 
                  type="text"
                  v-model="taskName"
                  placeholder="¿Qué vas a hacer hoy?"
                />
               
              </div>

              <div>
                 <button 
                  class="w-full px-4 py-3 shadow appearance-none mt-2 uppercase font-bold text-white rounded focus:outline-none"
                  :class="colorButtonAddOrEdit" 
                  type="submit"
                >
                   {{ (this.$store.state.isEdit) ? 'Editar Tarea': 'Añadir Tarea' }}
                </button>
              </div>

            </form>

            <div class="mt-6">

              <Loading v-if="loading"/>
    
              <ul v-else class="mb-32 bg-black">
                <Tarea 
                  v-for="tarea in tasks"
                  :key="tarea.id"
                  :task="tarea"
                  padre="pendientes"
                  @cancelTask="cancelTask()"
                  @newTaskName="newTaskName()"
                />
              </ul>

              <NoTasks 
                v-if="tasks.length === 0 && !loading"
                mensaje="No tienes tareas pendientes! 😎"
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
      task: null,
      taskName: '',
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
      return this.$store.state.tasks;
    },
    colorButtonAddOrEdit() {
      return this.$store.state.isEdit ? 'bg-yellow text-white' : 'bg-gray text-white';
    }
  },

  mounted() {
    this.getTasks();
  },

  methods: {

    async addTask() {

      if (this.taskName !== '') {

        if (!this.$store.state.isEdit) {

          try {
            // Grabar en BD: Nueva Tarea
            const { data } = await axios.post(`${process.env.baseUrl}/api/tasks`, { "name": this.taskName });

            // Actualizar state
            this.$store.commit('addTask', data);
            this.taskName = '';
            this.task = null;

          } catch (error) {
            console.error(error);
          }
          
        } else {

          try {
            // Grabar en BD: Edicion
            const { data } = await axios.put(`${process.env.baseUrl}/api/tasks/${this.$store.state.selectedTask.id}`, { "name": this.taskName });

            // Actualizar state
            this.$store.commit('editTask', data);
            this.taskName = '';
            this.task = null;

          } catch (error) {
            console.error(error);
          }

        }

        this.$store.commit('selectedTask', null);
        this.$store.commit('isEdit', false);
      }
    },

    cancelTask() {
      this.task = null;
      this.taskName = '';
      this.isEdit = false;
      this.$store.commit('selectedTask', null);
    },

    newTaskName() {
      this.taskName = this.$store.state.selectedTask.name;
    },

    async getTasks() {
      
      this.loading = true;

      try {
        const { data } = await axios.get(`${process.env.baseUrl}/api/tasks?completed=0`);

        this.$store.commit('clearTasks');

        data.forEach(task => {
          this.$store.commit('addTask', task);
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