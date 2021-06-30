<template>
    
     <li class="py-4 border-b border-gray border-1 font-semibold list-none">
         <span>
             <input type="radio" v-on:click.prevent="onClickToggleCompleted(task)">
         </span>

         <span class="ml-1">{{ task.name }}</span>

         <span class="float-right px-2">
            <button 
                class="p-2 -mt-5 w-20 font-bold bg-yellow text-black text-xs mr-2"
                v-on:click.prevent="onClickSelect(task)"
                v-if="padre==='pendientes' && !this.$store.state.selectedTask || (this.$store.state.selectedTask && this.$store.state.selectedTask.id !== task.id)"
            >EDITAR</button>

            <button 
                class="p-2 -mt-5 w-20 font-bold bg-purple text-white text-xs mr-2"
                v-on:click.prevent="onClickCancel()"
                v-if="this.$store.state.selectedTask && this.$store.state.selectedTask.id === task.id"
            >CANCELAR</button>

            <button 
                class="p-2 -mt-5 w-20 font-bold bg-pink text-white text-xs"
                v-on:click.prevent="onClickDelete(task)"
            >ELIMINAR</button>
         </span>
     </li>

</template>

<script>

export default {
    name: 'Tarea',

    props: {
        task: {},
        index: 0,
        padre: ''
    },

    methods: {

        onClickDelete(tarea) {
            this.$emit('removeTask', tarea);
        },
        onClickSelect(tarea) {
            this.$emit('selectTask', tarea);
        },
        onClickCancel() {
            this.$emit('cancelTask');
        },
        onClickToggleCompleted() {
            this.$emit('toggleCompletedTask');
        },

    }
}

</script>