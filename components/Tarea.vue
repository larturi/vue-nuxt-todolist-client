<template>
    
     <li class="py-4 border-b border-gray border-1 font-semibold list-none">
         <div class="sm:flex sm:justify-between flex-col md:flex-row">
            <div class="w-full p-3">
                <span>
                    <input type="radio" v-on:click.prevent="onClickToggleCompleted(task)">
                </span>

                <span class="ml-1 font-normal">{{ task.name }}</span>
            </div>

            <div class="w-full">
                <span class="w-full">
                    <button 
                        class="p-3 mt-2 font-bold bg-yellow text-black text-xs lg:w-28 w-6/12 float-right rounded-r"
                        v-on:click.prevent="onClickSelect(task)"
                        v-if="padre==='pendientes' && !this.$store.state.selectedTask || (this.$store.state.selectedTask && this.$store.state.selectedTask.id !== task.id)"
                    >EDITAR</button>

                    <button 
                        class="p-3 mt-2 font-bold bg-purple text-white text-xs lg:w-28 w-6/12 float-right rounded-l"
                        v-on:click.prevent="onClickCancel()"
                        v-if="this.$store.state.selectedTask && this.$store.state.selectedTask.id === task.id"
                    >CANCELAR</button>

                    <button 
                        class="p-3 mt-2 font-bold bg-pink text-white text-xs lg:w-28 w-6/12 mb-4 float-right rounded-l"
                        v-on:click.prevent="onClickDelete(task)"
                    >ELIMINAR</button>
                </span>
            </div>
        </div>
     </li>

</template>

<script>
import axios from 'axios';

export default {
    name: 'Tarea',

    props: {
        task: {},
        index: 0,
        padre: ''
    },

    methods: {

        async onClickDelete(tarea) {
            // Elimino del store dependiendo si viene de Pendientes o COmpletadas
            if (tarea.completed) {
                this.$store.commit('removeCompletedTask', tarea);
            } else {
                this.$store.commit('removeTask', tarea);
            }

            // Elimino de la BD
            tarea.deleted = true;
            await axios.put(`${process.env.baseUrl}/api/tasks/${tarea.id}`, tarea);
        },

        onClickSelect(tarea) {
            this.task = tarea;
            //this.taskName = tarea.name;
            this.$store.commit('isEdit', true);
            this.$store.commit('selectedTask', tarea);
            this.$emit('newTaskName');
        },

        onClickCancel() {
            this.$emit('cancelTask');
        },

        async onClickToggleCompleted(tarea) {

            // Elimino del store dependiendo si viene de Pendientes o COmpletadas
            if (tarea.completed) {
                this.$store.commit('removeCompletedTask', tarea);
                tarea.completed = false;
            } else {
                this.$store.commit('removeTask', tarea);
                tarea.completed = true;
            }

            // Actualizo en la BD
            await axios.put(`${process.env.baseUrl}/api/tasks/${tarea.id}`, tarea);
        },

    }
}

</script>