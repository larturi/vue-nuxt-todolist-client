import Vue from 'vue';

export default {
    addTask(state, payload) {
        state.tasks.push(payload)
    },

    selectedTask(state, payload) {
        if(payload) {
            state.tasks.map(function(x) {return x.id; }).indexOf(payload.id);
            state.selectedTask = payload;
        } else {
            state.selectedTask = null;
        }
    },

    removeTask(state, payload) {
        // Obtengo el index para eliminar del store y elimino
        var index = state.tasks.map(function(x) {return x.id; }).indexOf(payload.id);
        Vue.delete(state.tasks, index);
    },

    editTask(state, payload) {
        state.tasks.map((x) => {
            x.id === payload.id ? x.name = payload.name : x.name
        });

        state.selectedTask = null;
    },

    clearTasks(state) {
        state.tasks = [];
    },

    addCompletedTask(state, payload) {
        state.tasksCompleted.push(payload);
    },

    clearCompletedTasks(state) {
        state.tasksCompleted = [];
    },

    removeCompletedTask(state, payload) {
        // Obtengo el index para eliminar del store y elimino
        var index = state.tasksCompleted.map(function(x) {return x.id; }).indexOf(payload.id);
        Vue.delete(state.tasksCompleted, index);
    },

}