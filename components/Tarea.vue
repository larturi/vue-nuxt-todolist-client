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
                v-if="!isEdit"
            >EDITAR</button>

            <button 
                class="p-2 -mt-5 w-20 font-bold bg-purple text-white text-xs mr-2"
                v-on:click.prevent="onClickCancel()"
                v-if="isEdit"
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

     data() {
        return {
            isEdit: false
        }
    },

    props: {
        task: {},
        index: 0,
    },

    created() {
      window.addEventListener('click', (e) => {
        if (!this.$el.contains(e.target)){
          this.isEdit = false;
        }
      })
    },

    methods: {

        onClickDelete(tarea) {
            this.$emit('removeTask', tarea);
        },
        onClickSelect(tarea) {
            this.$emit('selectTask', tarea);
            this.isEdit = true;
        },
        onClickCancel() {
            this.$emit('cancelTask');
            this.isEdit = false;
        },
        onClickToggleCompleted() {
            this.$emit('toggleCompletedTask');
            this.isEdit = false;
        },

    }
}

</script>