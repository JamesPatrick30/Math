<template>
    <!-- <div class="container"> -->
            <div class="col-md-6 left-section">
                <h1><span class="Math">Mathe</span><span class="nic">nic</span></h1>
                <div v-if="ui_render.create">
                    <h2>Set Up</h2>
                    <div class="form-group">
                        <label for="operation">Operation</label>
                        <select id="operation" class="form-control" v-model="room.operation">
                            <option value="">Select Operation</option>
                            <option value="Addition" >Addition</option>
                            <option value="Subtraction">Subtraction</option>
                            <option value="Multiplication">Multiplication</option>
                            <option value="Division">Division</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="timer">Timer ( In minutes)</label>
                        <input type="number" name="timer" id="timer" class="form-control timer-input" v-model="room.time">
                    </div>
                    
                    <div class="form-group">
                        <label for="question">No. of Question</label>
                        <input type="number" name="question" id="question" class="form-control question-input" v-model="room.noOFquestion">
                    </div>
                    
                    <div class="form-group">
                        <button @click="createLobby" class="btn btn-primary">create</button>
                    </div>
            
            </div>
            <div v-else-if="ui_render.showplayer" >
                <h3> Game id : {{ roomid }}</h3>
                All players : {{ players.length }}
                <button @click="start_game" class="btn btn-success">Start</button>

                <div class="players-list">
                <div class="player-item" v-for="player in players" :key="player.username">
                    <div class="player-avatar"> {{ player.username[0] }} </div>
                    <div class="player-details">
                        <span class="player-name">{{ player.username }}</span>
                    </div>
                </div>
                </div>
                <!-- <ul>
                    <li v-for="player in players" :key="player.username">
                        {{ player.username }}
                    </li>
                </ul> -->
            </div>
            <div v-else-if="ui_render.showscoreboard">
                <h3>player done : {{ playersdone.length }} All players : {{ players.length }}</h3>
                <h1>player score</h1>
                <button v-on:click="endThematch" class="btn btn-danger">End the match</button>
                <div class="scoreboard-box">
                    <div class="scoreboard-item" v-for="player in sortToDone" :key="player.username">
                        <span class="player-name">{{ player.username }}</span>
                        <span class="player-score">{{ player.score }}</span>
                    </div>
                </div>
                <!-- <ol>
                    <li v-for="player in sortToDone" :key="player.username" >
                        {{ player.username }} || {{ player.score }} 
                    </li>
                </ol> -->
            </div>
        </div>
    <!-- </div> -->
    

</template>

<script>
//import { gameorhost } from '@/App.vue';
import {io} from 'socket.io-client';
import { useRoute } from 'vue-router';
export default{
    data (){
        return{
            ui_render :{
                create : true,
                showplayer : false,
                showscoreboard: false
            },
            players : [],
            playersdone : [],
            room : {
                operation : '',
                time : 0,
                noOFquestion: 0
            },
            roomid : '',
        };
    },
    methods :{
        createLobby(){
            this.socket.emit('create_lobby',this.room)
        },
        handle_reload(){
            if(this.$route.query.roomid === '' || this.$route.query.roomkey === '' || this.$route.query === null){
                console.log('reload from host')
            }else{
                const route = useRoute();
                if(route.path === '/home/hosting'){
                    console.log('hello from host')
                    console.log(this.players)
                    this.socket.emit('handle_ar_host',{roomid : this.$route.query.roomid,roomkey : this.$route.query.roomkey})
                }
            }
        },
        start_game(){
            this.socket.emit('start_game',{roomid : this.$route.query.roomid,roomkey : this.$route.query.roomkey});
        },
        endThematch(){
            this.socket.emit('delete_room',{roomid : this.$route.query.roomid,roomkey : this.$route.query.roomkey})
            
            this.$router.push({name : 'home'})
           // gameorhost = false;
        },
        detect_to_delete(){
            if(this.playersdone.length() === this.players.length()){
                this.endThematch();
            }
        }
    },
    mounted(){
        this.socket = io('http://localhost:2000')

        this.handle_reload()
        
        this.socket.on('room_created',(data)=> {
            this.$router.replace({query : {roomid : data.roomid,roomkey : data.roomkey}})
            this.roomid = data.roomid;
            this.ui_render.create = false;
            this.ui_render.showplayer = true;
            this.ui_render.showscoreboard = false;

        });
        this.socket.on('Room_Update', (data)=>{
            this.players = data;
        });

        this.socket.on('error' , (data) =>{
            alert(data);
            if(data ==='the room is successfully deleted'){
                this.$router.push({name : 'home'});
            }
            this.$router.replace({query : {roomid : '',roomkey : ''}})
        });

        this.socket.on('alerthost_gamestarted' , () =>{
            this.ui_render.create = false;
            this.ui_render.showplayer = false;
            this.ui_render.showscoreboard = true;
        });

        this.socket.on('Update_score',(data)=>{
            this.playersdone.push(data)
        });

    },
    computed : {
        // sortTheId(){
        //     return this.jobs.slice().sort((a,b) => b.id -a.id);
        // },
        sortToDone(){
          let b = this.playersdone.slice().sort((a,b) => b.score - a.score);
          return  b
        }
    },
    beforeDestroy(){
        this.detect_to_delete();
        this.socket.disconnect();
    }


}

</script>

<style scoped>
/* .showscoreboard {
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in;
  width: 100%;
}

h1 {
  font-size: 2em;
  color: #6a2c91;
  margin-bottom: 20px;
  text-align: center;
}

h3 {
  font-size: 1.4em;
  color: #6a2c91;
  margin-bottom: 20px;
  text-align: center;
}

.scoreboard-box {
  margin-top: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.scoreboard-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1.2em;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.scoreboard-item:hover {
  background-color: #eaeaea;
}

.player-name {
  color: #6a2c91;
}

.player-score {
  color: #5c1d7f;
  font-weight: 700;
}

.btn-danger {
  background-color: #d9534f;
  color: white;
  font-size: 1.1em;
  padding: 10px 20px;
  border-radius: 8px;
  width: 100%;
  border: none;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.btn-danger:hover {
  background-color: #c9302c;
} */
/* 
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #6a2c91;
}

.container {
  max-width: 800px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-section {
  background-color: #f4edfa;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in;
  width: 100%;
}

h1 {
  font-size: 2.2em;
  margin-bottom: 10px;
  animation: bounce 1s ease;
}

.math {
  color: #6a2c91;
}

.nic {
  color: orange;
}

h2 {
  color: #6a2c91;
  font-size: 1.4em;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.timer-input {
  height: 40px;
  width: 100%;
  font-size: 1.2em;
  margin-bottom: 15px;
  padding: 0 10px;
  box-sizing: border-box;
}

.question-input {
  height: 40px;
  width: 100%;
  font-size: 1.2em;
  margin-bottom: 15px;
  padding: 0 10px;
  box-sizing: border-box;
}

.form-control {
  font-size: 1.1em;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid #ddd;
  height: 45px;
  width: 100%;
}

.btn {
  background-color: purple;
  color: white;
  border-radius: 8px;
  font-size: 1.1em;
  padding: 10px 20px;
  width: 100%;
  border: none;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #5c1d7f;
}

.calculator-image-container {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

.calculator-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 12px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

.players-list {
  margin-top: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
} */
/* 
.player-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.player-item:hover {
  background-color: #eaeaea;
}

.player-avatar {
  width: 35px;
  height: 35px;
  background-color: #6a2c91;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.player-details {
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.player-name {
  font-size: 1.1em;
  color: #6a2c91;
  font-weight: 600;
  margin-right: 10px;
}

.players-list::-webkit-scrollbar {
  width: 8px;
}

.players-list::-webkit-scrollbar-thumb {
  background-color: #6a2c91;
  border-radius: 10px;
}

.players-list::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 10px;
}

.players-list::-webkit-scrollbar-thumb:hover {
  background-color: #5c1d7f;
} */

body {
  background-image: url('/src/assets/Mathenic_logo.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
  
}

.left-section {
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in;
  width: 100%;
  max-width: 600px;
}

h1 {
  font-size: 2.2em;
  margin-bottom: 10px;
  animation: bounce 1s ease;
}

.math {
  color: #6a2c91;
}

.nic {
  color: orange;
}

h2 {
  color: #6a2c91;
  font-size: 1.4em;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.timer-input,
.question-input {
  height: 40px;
  width: 100%;
  font-size: 1.2em;
  margin-bottom: 15px;
  padding: 0 10px;
  box-sizing: border-box;
}

.form-control {
  font-size: 1.1em;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid #ddd;
  height: 45px;
  width: 100%;
}

.btn {
  background-color: purple;
  color: white;
  border-radius: 8px;
  font-size: 1.1em;
  padding: 10px 20px;
  width: 100%;
  border: none;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #5c1d7f;
}

.scoreboard-box {
  margin-top: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.scoreboard-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1.2em;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.scoreboard-item:hover {
  background-color: #eaeaea;
}

.player-name {
  color: #6a2c91;
}

.player-score {
  color: #5c1d7f;
  font-weight: 700;
}

.players-list {
  margin-top: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.player-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.player-item:hover {
  background-color: #eaeaea;
}

.player-avatar {
  width: 35px;
  height: 35px;
  background-color: #6a2c91;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.player-details {
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.player-name {
  font-size: 1.1em;
  color: #6a2c91;
  font-weight: 600;
  margin-right: 10px;
}

.players-list::-webkit-scrollbar {
  width: 8px;
}

.players-list::-webkit-scrollbar-thumb {
  background-color: #6a2c91;
  border-radius: 10px;
}

.players-list::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 10px;
}

.players-list::-webkit-scrollbar-thumb:hover {
  background-color: #5c1d7f;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}
</style>