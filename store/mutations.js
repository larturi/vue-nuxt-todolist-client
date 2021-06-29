import Vue from 'vue';

export default {
    addTask(state, payload) {
        state.tasks.push(payload)
    },

    removeTask(state, payload) {
        // Obtengo el index para eliminar del store y elimino
        var index = state.tasks.map(function(x) {return x.id; }).indexOf(payload.id);
        Vue.delete(state.tasks, index);
    },

    editTask(state, payload) {
        // Obtengo el index para editar el store
        var index = state.tasks.map(function(x) {return x.id; }).indexOf(payload.id);
        // Vue.update(state.tasks, index);
    },

    clearTasks(state) {
        state.tasks = [];
    },

    addCompletedTask(state, payload) {
        state.tasksCompleted.push(payload)
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