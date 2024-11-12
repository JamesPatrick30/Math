<template>
<!-- 
  <h1 ></h1>
  <div>
    <label for="Hostname">Hostname : </label>
  <input type="text" name ="Hostname" v-model="room.host">
  <br>
  <label for="HostID">HostID : </label>
  <input type="text" name="HostID" id="" v-model="room.host_id">
  <br>
  <label for="Questiom">Number of Question : </label>
  <input type="number" name="Questiom" id="" v-model="room.Number_of_Questions">
  <button @click ="addonmessage">add</button>

  <br>
  
  <div class="form-group">
        <label for="operation">Operation</label>
        <select id="operation" class="form-control" v-model="room.gamerules">
          <option value="">Select Operation</option>
          <option value="Addition" >Addition</option>
          <option value="Subtraction">Subtraction</option>
          <option value="Multiplication">Multiplication</option>
          <option value="Division">Division</option>
        </select>
      </div>
      
<div class="form-group">
        <label for="timer">Timer (in minutes)</label>
        <input type="number" id="timer" class="form-control" value="0" v-model="room.timer">
      </div>
  </div>
  <br>
  <br>
  <input type="text" name="" id="" v-model="roomStartId">
  <button @click="startTheGame">start</button>
   <ul>
    <li v-for="mess,index in allmessages" :key="mess">
      {{ mess}}
    </li>
  </ul> 
  <ul>
    <li v-for="mess,index in exmessages" :key="mess">
      {{ mess}}
    </li>
  </ul>
  <input type="text" name="" id=""v-model ="join_data.username">
  <input type="text" name="" id="" v-model="join_data.room_id">
  <button @click="join_room">join</button>

  <ul>
      <li v-for="user in users":key ="user"  id = 'joblist'>
      <h4 > {{ user.username }}</h4>
    
     </li>
    </ul>  
     -->
     
    <div class="box">
        <h1>About <span style="color: purple;">Mathe</span><span class="text-orange">nic</span>: Where Learning Meets Fun</h1>
        <p>Mathenic is more than just a quiz app; it's a vibrant community of learners who love to test their knowledge and compete in real-time. We believe that learning should be engaging, exciting, and rewarding, and that's exactly what Mathenic offers.</p>

        <h1>Our Mission:</h1>
        <p>To create a platform where everyone can learn and grow through the power of interactive quizzes. We aim to make learning fun, accessible, and competitive, fostering a love for knowledge in every participant.</p>

        <!-- <h1><b>What Makes Mathenic Unique:</b></h1>
        <ul>
            <li><b>Real-time Quizzes:</b> Challenge yourself and others in exciting, real-time quizzes across a wide range of categories.</li>
            <li><b>Learning Through Competition:</b> Learn something new with every quiz, identify areas for improvement, and celebrate your achievements.</li>
            <li><b>Engaging Gameplay:</b> Enjoy a variety of question types, dynamic leaderboards, and rewarding scoring systems.</li>
            <li><b>A Supportive Community:</b> Connect with other learners, share your knowledge, and build a network of like-minded individuals.</li>
        </ul> -->
<!-- 
        <h1><b>Our Vision:</b></h1>
        <p>To empower learners of all ages and backgrounds by providing a platform that makes learning enjoyable and effective. We envision a future where Mathenic becomes a go-to resource for anyone seeking to expand their knowledge and engage in friendly competition.</p>

        <h1>Join the Mathenic Community Today:</h1>
        <p>Ready to test your knowledge and have some fun? Sign up for Mathenic and join the exciting world of real-time learning!</p> -->

    </div>
</template>

<!-- <script>
import { io } from 'socket.io-client';

export default {
  data() {
    return {
      join_data :{
        username : '',
        room_id :''

      },
      users : [],
      // message : '',
      // add_message: '',
      // allmessages : [],
      // exmessages : [
      //   'pas','pes'
      // ],
      room : {
        Number_of_Questions : null,
        host: '',
        host_id: '',
        gamerules : '',
        timer : 60,
        
      },
      gamestarted : false,
      roomStartId : ''
    };
  },
  mounted() {
     this.socket = io('http://localhost:2000');  // Connect to Flask WebSocket server
     
     this.socket.on('error',(data) =>{
      alert(data)
     });

     this.socket.on('join_room',(data) =>{
      //this.message = data;
      this.users = data;
     });

     this.socket.on('allertme', (data) =>{
      alert(data)
     });

     this.socket.on('recievedmessage',(data) =>
    {
      this.allmessages.push(data) ;
    });

    //dito mo malalaman kapag nag start na yung game
    this.socket.on('game_started',(data) =>{
      this.gamestarted = data.booltf;
      this.message = data.message;
      this.$router.push({ name : 'lobby' , query :{game_id : data.game_id,player_id : data.player_id, player_s : 0,q : 0}})
    });

    // this.socket.on('message',(data) =>{
    //   this.message = data;
    //   console.log('received data :', {data})
    //  });
    // // Listen for updates on room data (query response from Flask)
     this.socket.emit('connection');
     //this.socket.emit('update_message');
     this.socket.emit('client_message','hello from vue')

     this.socket.on('id_create',(data) =>{
      console.log('room id : ',data)
     });



  },
  methods: {
    
    addonmessage(){
      if(this.room.gamerules && this.room.timer && this.room.Number_of_Questions && this.room.host && this.room.host_id !== null){
        this.socket.emit('create_lobby',this.room);
      }else{
        alert('Double check your input')
      }
      
    },
    join_room(){
      this.socket.emit('join_room',this.join_data);
    },
    //clickme when you want to start the game
    startTheGame(){
      this.socket.emit('start_match',this.roomStartId);
    }


  }
};
</script> -->
<style>
body {
            background-color: #f0f4ff; 
            font-family: Arial, sans-serif;
        }
        .box {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 30px;
            margin: 50px auto;
            max-width: 800px;
        }
        h1 {
            color: purple;
            margin-top: 20px;
        }
        .text-orange {
            color: orange;
        }
        p {
            color: #333;
        }
        ul {
            margin-left: 20px;
            color: #333;
        }
        .social-btn {
            margin-top: 30px;
            text-align: center;
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
}
</style>