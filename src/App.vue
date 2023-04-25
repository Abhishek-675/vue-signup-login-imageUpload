<template>
  <navbar-comp></navbar-comp>
  <router-view/>
</template>

<script>
import NavbarComp from './components/NavbarComp.vue';
export default{
  components:{
    NavbarComp: NavbarComp,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}

/* * {
  box-sizing: border-box;
  margin: 0%;
  padding: 0%;
} */
</style>
