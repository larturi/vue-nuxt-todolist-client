export default {
    addTask(state, payload) {
        state.tasks.push(payload)
    },

    removeTask(state, payload) {
        this.$delete(state.tasks, payload)
    }
}