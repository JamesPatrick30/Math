<template>
  <nav v-if="notother">
    <router-link to="/">Home</router-link> |
    <router-link :to="{name : 'about'}">About</router-link> | 
    <router-link :to="{name : 'help'}">Help</router-link> 
    <!-- <router-link :to ="{name : 'hostpage'}">host</router-link> -->
    
  </nav>
  <!-- <h1>Mathenic</h1>
  <button @click = "goHome">hehe</button>
  <button @click = "goback">back</button>
  <button @click = "goforward">forward</button> -->

  <router-view/>
</template>
<script>
  export default{
    data(){
      return{
        notother : true,
        gameorhost : false
      };
    },
      methods:{
        goback(){
          this.$router.go(-1);
        },
        goforward(){
          this.$router.go(1);
        },
        goHome(){
          this.$router.push({name : 'home'});
          console.log('click1');
        }
      }
           
    }
  
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 20px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
  
}


</style>
