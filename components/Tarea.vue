<template>
    
     <li class="py-1 border-b border-gray border-1 font-semibold list-none">
         <div class="sm:flex sm:justify-between flex-col md:flex-row">
            <div class="w-full p-3 mt-1">
                <span>
                    <input type="radio" v-on:click.prevent="onClickToggleCompleted(task)">
                </span>
                
                <span class="ml-1 font-normal">{{ task.name }}</span>
            </div>

            <div class="w-full mt-1">
                <span class="w-full">
                    <button 
                        class="p-2 mt-2 mr-2 font-bold bg-yellow text-white border border-yellow text-xs lg:w-28 w-6/12 float-right rounded-r focus:outline-none"
                        v-on:click.prevent="onClickSelect(task)"
                        v-if="padre==='pendientes' && !this.$store.state.selectedTask || (this.$store.state.selectedTask && this.$store.state.selectedTask.id !== task.id)"
                    >EDITAR</button>

                    <button 
                        class="p-2 mt-2 mr-2 font-bold bg-purple border border-purple text-white text-xs lg:w-28 w-6/12 float-right rounded-r focus:outline-none"
                        :class="roundedButtonRight(padre)" 
                        v-on:click.prevent="onClickCancel()"
                        v-if="this.$store.state.selectedTask && this.$store.state.selectedTask.id === task.id"
                    >CANCELAR</button>

                    <button 
                        class="p-2 mt-2 font-bold bg-gray border border-gray text-white text-xs lg:w-28 mb-4 float-right rounded-l focus:outline-none"
                        :class="[roundedButtonRight(padre), widthButtonDelete(padre)]" 
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
            this.$store.commit('isEdit', true);
            this.$store.commit('selectedTask', tarea);
            this.$emit('newTaskName');
        },

        onClickCancel() {
            this.$emit('cancelTask');
            this.$store.commit('isEdit', false);
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

        roundedButtonRight(padre) {
            return (padre==='completadas') && 'rounded-r' ;
        },

        widthButtonDelete(padre) {
            return (padre==='completadas') ? 'w-full' : 'w-6/12' ;
        }

    }
}

</script>