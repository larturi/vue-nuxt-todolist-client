<template>
    
     <li class="py-1 border-b border-black2 border-1 font-semibold list-none">
         <div class="flex justify-between flex-row">
            <div class="w-full p-3 m-auto">
                <span>
                    <input type="radio" v-on:click.prevent="onClickToggleCompleted(task)">
                </span>
                
                <span class="ml-1 font-normal">{{ task.name }}</span>
            </div>

            <div class="w-full flex mt-1">
                <div class="w-full m-auto">
                    <button 
                        class="p-2 mt-2 mr-2 font-bold bg-yellow text-white border border-yellow text-xs w-16 lg:w-28 float-right rounded-r focus:outline-none"
                        v-on:click.prevent="onClickSelect(task)"
                        v-if="padre==='pendientes' && !this.$store.state.selectedTask || (this.$store.state.selectedTask && this.$store.state.selectedTask.id !== task.id)"
                    > <fa icon="edit"></fa></button>

                    <button 
                        class="p-2 mt-2 mr-2 font-bold bg-purple border border-purple text-white text-xs w-16 lg:w-28 float-right rounded-r focus:outline-none"
                        :class="roundedButtonRight(padre)" 
                        v-on:click.prevent="onClickCancel()"
                        v-if="this.$store.state.selectedTask && this.$store.state.selectedTask.id === task.id"
                    ><fa icon="hand-paper"></fa></button>

                    <button 
                        class="p-2 mt-2 font-bold bg-gray border border-gray text-white text-xs w-16 lg:w-28 mb-4 float-right rounded-l focus:outline-none"
                        :class="[roundedButtonRight(padre), widthButtonDelete(padre)]" 
                        v-on:click.prevent="onClickDelete(task)"
                    ><fa icon="trash"></fa></button>
                </div>
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
            return (padre==='completadas') ? 'w-full' : 'w-18 text-xs' ;
        }

    }
}

</script>

<style scoped>
    li:first-child {
        border-top-width: 1px;
    }
</style>