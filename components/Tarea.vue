<template>
    
     <li class="py-4 border-b border-gray-600 border-1 font-semibold list-none">
         <span>
             <input type="radio" name="" id="">
         </span>
         <span class="ml-1">{{ task.name }}</span>
         <span class="float-right px-2">
             <button class="p-1 rounded -mt-5 w-24 font-bold bg-green-700 text-white text-sm mr-2">EDITAR</button>
             <button 
                class="p-1 rounded -mt-5 w-24 font-bold bg-yellow-600 text-white text-sm"
                v-on:click.prevent="onClickDelete(task)"
            >
                 ELIMINAR
            </button>
         </span>
     </li>

</template>

<script>

export default {
    name: 'Tarea',
    props: {
        task: {},
        index: 0
    },

    methods: {

        onClickDelete(tarea) {
            this.$emit('removeTask', tarea);
        },

    }
}

</script>