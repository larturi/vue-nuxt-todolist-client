<template>
  <nav class="relative flex flex-wrap items-center justify-between px-2 py-2 bg-yellow mb-3">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div class="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
        <router-link  
          class="font-extrabold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white no-underline"
          to="/"
        >
          Todolist Nuxt & Laravel
        </router-link >
        <button class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
          <fa icon="bars"></fa>
        </button>
      </div>
      
      <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center">

          <ul class="flex flex-col lg:flex-row list-none ml-auto">
            
            <li class="nav-item">
              <router-link 
                  to="/"
                  class="px-1 py-2 mr-1 ml-4 flex items-center text-xs uppercase font-extrabold leading-snug text-white hover:opacity-75"
              >
                <span>Pendientes</span>
              </router-link>
            </li>

            <li class="nav-item">
              <router-link 
                  to="/completadas"
                  class="px-1 py-2 ml-4 flex items-center text-xs uppercase font-extrabold leading-snug text-white hover:opacity-75"
              >
                <span>Completadas</span>
              </router-link>
            </li>
            
          </ul>

      </div>

    </div>
  </nav>
</template>

<script>

export default {
  name: "indigo-navbar",
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleNavbar: function(){
      this.showMenu = !this.showMenu;
    }
  },
  mounted() {
  }
}
</script>


<style>
/* home route and active route will show in bold as it matches / and /about */
a.nuxt-link-active {
  font-weight: bold;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  border-bottom: solid 2px white;
}

.no-underline {
    border-bottom: none !important;
}

</style>

