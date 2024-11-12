<template>
    
    <!-- <div class="lobby-background"> -->
        
        <div class="container">
            <!-- <h1>Lobby</h1> -->
            <!-- <img v-bind:src="logopic"  class="lobby-image"> -->
            <div v-if="Ui_render.login" class="login-section">
                <div class="form-group">
                    <h1 class="title">
                    <span>Mathe</span><span class="text-orange">nic</span>
                </h1>
                <br>
                
                <br>
                    <label for="name">Enter name:</label>
                <input type="text" v-model="playername" class="input-field" placeholder="Your Name" required>
                </div>
                <div class="form-group">
                    <br>
                <br>
                <br>
                <label for="room-id">Enter room ID:</label>
                
                <input type="text" name="" id="" v-model="roomID" class="input-field" placeholder="Room ID" required>
                </div>
                
                
                <br>
                <br>
                <br>
                <br>
                
                <button  @click="join_room" class="btn">join</button>
            </div>

            <div v-if ="Ui_render.otherPlayerList" class="player-list-section">
                <h3>Room ID : {{ roomID }}</h3>

                <h4>Players : {{playerlist.length}}</h4>
                <h1>Waiting to the host to Start :</h1>
                <button @click="LeaveRoom" class="btn">Leave Room</button>
                <div class="player-list-container">
                    <ul class="player-list">
                    <li v-for="player in playerlist" :key = "playerlist.username">
                        {{ player.username }}
                    </li>
                </ul>
                </div>
                
            </div>
                
            
            <div v-if = "Ui_render.game_started" class="game-section">

                <h1>{{gameneeds.operation}}</h1>
            <h3 >{{ mins }} : {{ timecounter }} </h3>
                
            
                <p class="number">{{  fnumber }}</p>
                
                <div class="operation-display">
                    <p v-if="gameneeds.operation === 'Addition'"> + </p>
                <p v-else-if="gameneeds.operation === 'Subtraction'"> - </p>
                <p  v-else-if="gameneeds.operation == 'Multiplication'"> * </p>
                <p v-else-if="gameneeds.operation === 'Division'"> / </p>
                </div>
                
                <p class="number">{{ snumber }}</p>
                
            
                <br>
                <label for="answerimput">Answer : </label>
                <input type="number" name="answerimput" id="answerimput" v-model="inputanswer" class="input-field">
                <button @click = 'submit_ans' class="btn">Submit</button>

                
            </div>

            <div v-if="Ui_render.all_done" class="congrats-section">
                <h1>Congrats</h1>
                <div id="score-container">
                    <!-- <p>You scored : {{ score }}</p> -->
                    <h2>Your Score Result:</h2>
                    <p id="score-display">You scored: {{ score }}</p>
                </div>
                
                <br>
                <button @click="go_home" class="btn">Leave Room</button>


            </div>
        </div>
        
    <!-- </div> -->
   

    


</template>
<script>
import { io } from "socket.io-client";
import { useRoute } from "vue-router";
//import { gameorhost } from '@/App.vue';
export default{
// props:['name']

    data(){
        return{
            logopic : require("/src/assets/Mathenic_logo.png"),
            Ui_render : {
                login : true,
                otherPlayerList : false,
                game_started : false,
                all_done : false
            },
            gameneeds : {
                time : 0,
                operation : null,
                numberOfQuestions : 0
            },
            playername : '',
            roomID : '',
            playerlist : [],
           // playerscore :0,

            isrunning : false,
            timer : null,

            fnumber : 0,
            snumber : 0,
            inputanswer : null,
            score : 0,
        };
    },
    methods:{
        join_room  () {
            
            if (this.roomID.trim() !== '' && this.playername.trim() !== ''){
                this.socket.emit('join_room',{username : this.playername, room_id :this.roomID});
            }else{
                alert('please enter')
                
            }
        },

        detect_query  () {
            if(this.$route.query.game_id === '' || this.$route.query.userid === ''){
                console.log('no gameid')
            }else{
                
                let route = useRoute()
                console.log('route : ',route.path)
                console.log('reload')
                if (route.path === '/lobbies'){
                    console.log('needs')
                    this.socket.emit('accidental_reload',{playerid : this.$route.query.userid ,roomid :this.$route.query.game_id })
                }
            }
         },

         start_timer(){
            if(!this.isrunning && this.gameneeds.time > 0){
                this.isrunning = true;
                this.timer = setInterval(() =>{
                    if(this.gameneeds.time > 0){
                        this.gameneeds.time -= 1;
                    }else {
                        this.Ui_render.game_started = false;
                        console.log('game done')
                        this.Ui_render.login = false;
                        this.Ui_render.otherPlayerList=false;
                        this.Ui_render.game_started = false;
                        this.Ui_render.all_done = true;
                       // this.update_score();
                       this.update_score()
                       this.stoptimer()
                    }
                },1000)
            }
        },
        
        submit_ans(){
            //const tempanswer = String(this.inputanswer);
            console.log(this.inputanswer)
            if (this.gameneeds.operation === 'Addition'){
                if(this.inputanswer == (this.fnumber + this.snumber)){
                    this.score += 1;
                    console.log('correct!!')
                }
                
            }else if (this.gameneeds.operation === 'Subtraction'){
                if(this.inputanswer == (this.fnumber - this.snumber)){
                    this.score += 1;
                }

            }else if (this.gameneeds.operation === 'Multiplication'){
                if(this.inputanswer == (this.fnumber * this.snumber)){
                    this.score += 1;
                }
                
            }else if (this.gameneeds.operation === 'Division'){
                if(this.inputanswer == (this.fnumber / this.snumber)){
                    this.score += 1;
                }
            }
           this.randomnumber();
           this.inputanswer = null;
           this.gameneeds.numberOfQuestions -=1
           if (this.gameneeds.numberOfQuestions === 0){
            this.stoptimer();
            
            this.update_score();

            this.Ui_render.login = false;
            this.Ui_render.otherPlayerList=false;
            this.Ui_render.game_started = false;
            this.Ui_render.all_done = true;
            console.log('done')
           }
        },
        
        stoptimer(){
            clearInterval(this.timer);
            this.isrunning = false;
            this.timer = null;
        },
        update_score(){
            this.socket.emit('score_update',{room_id : this.$route.query.game_id,userid : this.$route.query.userid,score : this.score});
        },
        LeaveRoom(){
            this.$router.push({name : 'home'})
            this.socket.emit('leaveroom',{room_id : this.$route.query.game_id,userid : this.$route.query.userid,score : this.score});
            //gameorhost = false;
        },
        go_home(){
            this.$router.push({name : 'home'})
           // gameorhost = false;

        },
        randomnumber(){
            if (this.gameneeds.operation === 'Addition'){
                
                this.fnumber = Math.floor(Math.random()*99) + 1;
                while (this.fnumber >99){
                    this.fnumber = Math.floor(Math.random()*99) + 1;
                }
                this.snumber = Math.floor(Math.random()*99) + 1;
                while (this.snumber >99){
                    this.snumber = Math.floor(Math.random()*99) + 1;
                }
            }else if (this.gameneeds.operation === 'Subtraction'){
                

                this.fnumber = Math.floor(Math.random()*150) + 50;
                while (this.fnumber >150){
                    this.fnumber = Math.floor(Math.random()*150) + 50;
                }
                
                do{
                    this.snumber = Math.floor(Math.random()*99) + 1;
                }while(this.snumber >99 || this.snumber > this.fnumber);

            }else if (this.gameneeds.operation === 'Multiplication'){
                
                this.fnumber = Math.floor(Math.random()*99) + 1;
                while (this.fnumber >99){
                    this.fnumber = Math.floor(Math.random()*99) + 1;
                }
                this.snumber = Math.floor(Math.random()*20) + 1;
                while (this.snumber >20 ){
                    this.snumber = Math.floor(Math.random()*20) + 1;
                }

            }else if (this.gameneeds.operation === 'Division'){
                this.snumber = Math.floor(Math.random()*12) + 1;
                while (this.snumber >12){
                    this.snumber = Math.floor(Math.random()*12) + 1;
                }
                const temp = Math.floor(Math.random()*20) + 1;
                 
                while (temp >20 ){
                    temp =  Math.floor(Math.random()*20) + 1;
                }
                this.fnumber = temp * this.snumber;
            }
        }
    },
    mounted(){
         
        this.socket = io('http://localhost:2000');
        
        this.detect_query();


        this.socket.on('error' ,(data) =>{
            alert(data)
            this.$router.replace({query :{game_id : '',userid : ''}});
        });

        this.socket.on('Room_update' ,(data) =>{
            this.playerlist = data ;
            // this.Ui_render.login = false;
            // this.Ui_render.otherPlayerList = true;
            this.roomID = this.$route.query.game_id;
            
        });

        this.socket.on('userJoined',(data)=>{
            this.$router.replace({query :{game_id : this.roomID,userid : data}});
            this.Ui_render.login = false;
            this.Ui_render.otherPlayerList = true;
        if( this.Ui_render.game_started === true){
            this.Ui_render.otherPlayerList = false;
        }

        });

        this.socket.on('showscore', (data) =>{
            this.Ui_render.login = false;
            this.Ui_render.otherPlayerList=false;
            this.Ui_render.game_started = false;
            this.Ui_render.all_done = true;
            this.score=data;
        })

        this.socket.on('gamestart',(data)=>{
           // this.$router.replace({query :{game_id : this.roomID,userid : data}});
            this.gameneeds.time = data.time * 60;
            this.gameneeds.operation = data.operation;
            this.gameneeds.numberOfQuestions = data.numberOfQuestion;
            this.Ui_render.login = false;
            this.Ui_render.otherPlayerList=false;
            this.Ui_render.game_started = true;
            this.Ui_render.all_done = false;
            console.log('q :', this.gameneeds.numberOfQuestions)
            this.randomnumber();
            this.start_timer();
            
        });
    },
   computed : {
        timecounter(){
            
            const secs = String(this.gameneeds.time % 60).padStart(2,'0');
            return secs;
        },
        mins(){
            const minstime = Math.floor(this.gameneeds.time /60);//.padStart(2,'0');
            if(minstime === 0){
                return '0';
            }
            return minstime;
        },
        hours(){
            const hrs = Math.floor((this.gameneeds.time /60)/60);//.padStart(2,'0');
            if(hrs === 0){
                return '0';
            }
            return hrs;
        }

   },
    beforeDestroy(){
        this.stoptimer();
   }
}
</script>
<style>
.lobby-background {
  background: linear-gradient(135deg, #eae6fa, #c4a6fc);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px;
  
}

.container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  
  
}

.form-section {
  width: 100%;
  max-width: 700px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 30px 40px;
}

.login-section,
.player-list-section,
.game-section,
.congrats-section {
  width: 100%;
}

h1 {
  margin-bottom: 30px;
  text-align: center;
  font-size: 3.2em;
  color: #6a0dad;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 1.1em;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
}

.input-field:focus {
  border: 2px solid #6a0dad;
  outline: none;
  box-shadow: 0 0 10px rgba(106, 13, 173, 0.2);
}

.btn {
  background-color: #6a0dad;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  font-size: 1.1em;
  font-family: 'Poppins', sans-serif;
  transition: background-color 0.3s, transform 0.3s;
}

.btn:hover {
  background-color: #9c4a9f;
  transform: translateY(-2px);
}

.player-list-container {
  max-height: 180px;
  overflow-y: auto;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.player-list {
  list-style-type: none;
  padding: 0;
}

.player-list li {
  background-color: #d1c4e9;
  margin: 8px 0;
  padding: 12px;
  border-radius: 10px;
  font-family: 'Poppins', sans-serif;
  font-size: 1.2em;
  color: #4a0072;
  transition: background-color 0.3s, transform 0.2s;
}

.player-list li:hover {
  background-color: #b493e0;
  transform: translateX(5px);
}

.congrats-section {
  text-align: center;
  align-items: center;
}

#score-container {
  background-color: #d1c4e9;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

#score-display {
  font-size: 2.2em;
  font-weight: 700;
  color: #6a0dad;
}

.lobby-image {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 220px;
  height: auto;
}

.operation-display {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  font-weight: 600;
}

.number {
    /* justify-content: center; */
    text-align: center;
    /* align-content: center; */
  /* align-items: center; */
  margin: 0 15px;
  color: #6a0dad;
  font-size: 4.5em;
}
.title {
            text-align: center;
            margin-top: 50px;
            font-size: 3.5rem;
            color: #6a1b9a;  /* Purple color */
            font-weight: bold;
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }
</style>