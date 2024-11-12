<template>
  <!-- <button v-if="gameorhost"  @click="goback">back to game</button> -->
  <!-- <br>
  <button @click="gohost">Host</button>
  <br>
  <button @click="gojion">Join</button> -->
  <div class="wrapper">
    <div class="container">
      <h1>
        <span class="text-purple">Mathe</span><span class="text-orange">nic</span>
      </h1>

      <p class="p-quiznow">
        <b>
          <span class="text-purple">Quiz</span>
          <span class="text-orange">now.</span>
        </b>
        <br>
        <b>Sharpen your Math skills, Compete in Real time, and Learn with every Quiz!</b>
      </p>
      <!-- <p class="catalog">
        <b>Sharpen your Math skills, Compete in Real time, and Learn with every Quiz!</b>
      </p> -->

      <div class="button-host-or-join">
        <button  class="main-button" @click="gohost">Host</button>
        <button  class="main-button" @click="gojion">Join</button>
        <!-- <button  class="main-button" @click="goback">Back to Game</button> -->
      </div>
    </div>
  </div>
</template>

<script>


// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  // name: 'HomeView',
  // components: {
  //   HelloWorld
  // }
  data(){
    return{
      
    };
  },
  methods:{
    gojion(){
      
      this.$router.push({ name : 'lobby' , query :{game_id : '' , player_id : ''}})
      
    },
    gohost(){
      this.$router.push({ name : 'hostpage' , query : {roomid : '',roomkey : ''}})
      
    },
    goback(){
          this.$router.go(-1);
        },
    
  },
    
  
}
</script>
<style >
/* #joblist{
    margin-top: 5px;
    width: 100px;
    padding: center;
    background-color: aquamarine;
    color: rgb(8, 15, 21);
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: transform 0.5s;
} */

body {
  background-color: #f8bcff;
  background-image: url('/src/assets/MathennicBackgound.png');
  background-size: cover;
  background-position: center center;
  /* background-position: absolute; */
  background-color: #f8bcff;
  background-repeat: no-repeat;
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: Arial, sans-serif;
  /* background-color: #5a2d91; */
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  /* height: auto; */
  /* margin-top: 50px; */
}

.container {
  text-align: left;
  max-width: 400px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-height: 400px;
  margin-right: 20px;
}

h1 {
  font-size: 3rem;
  margin-top: 0;
}

.text-purple {
  color: purple;
}

.text-orange {
  color: orange;
}

.p-quiznow {
  font-size: 1.5rem;
}

.catalog b {
  font-size: 1.2rem;
}

.button-host-or-join {
  margin: 80px 0 20px;
}

.main-button {
  padding: 15px 40px;
  border-radius: 25px;
  background-color: purple;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s, transform 0.3s;
  width: 100%;
  margin-bottom: 10px;
}
.main-button:hover {
  background-color: #5a2d91;
  transform: scale(1.05);
}
</style>