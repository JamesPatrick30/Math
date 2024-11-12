<template>
    <div class="container">
        <h1 class="title">
            <span>Mathe</span><span class="text-orange">nic</span>
        </h1>
        <div class="instructions">
            <h2 class="text-center" style="color: #6a1b9a;">For Host</h2>
            <ol class="instruction-list mx-auto">
                <li>Click the host button to start</li>
                <li>Set up your prepared operation, timer, and number of questions, then click create when done.</li>
                <li>Wait for the student to join.</li>
                <li>Click the start button.</li>
            </ol>
            <h2 class="text-center" style="color: #6a1b9a;">For Join</h2>
            <ol class="instruction-list mx-auto">
                <li>Click the join button.</li>
                <li>Enter the room ID/lobby ID and your name.</li>
                <li>Wait for the host to start.</li>
                <li>Start answering the following questions.</li>
            </ol>
        </div>
    </div>
<!--</form> -->


    
</template>
<!-- <script>

export default{
   
    data(){

        return{
        };
    },
    mounted(){
        this.$router.replace({query : {name : 'patrick'}});

        
    },

}
</script> -->
<style>
body {
            background-color: #f4f6f9;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
        }

        .title {
            text-align: center;
            margin-top: 50px;
            font-size: 3.5rem;
            color: #6a1b9a;  /* Purple color */
            font-weight: bold;
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }

        .text-orange {
            color: #ff9800;  /* Orange for contrast */
        }

        .instructions {
            background-color: #ffffff;
            border-radius: 12px;
            padding: 0px;
            margin-top: 0px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }

        .instruction-list {
            padding-left: 20px;
            font-size: 1rem;
            line-height: 1;
        }

        .instruction-list li {
            margin-bottom: 15px;
        }

        .instruction-list li::before {
            content: "\2022";
            color: #6a1b9a;  /* Purple bullet point */
            font-weight: bold;
            margin-right: 10px;
        }

        .footer {
            text-align: center;
            margin-top: 50px;
            font-size: 1rem;
            color: #888;
        }

        @media (max-width: 768px) {
            .title {
                font-size: 2.5rem;
            }

            .instructions {
                padding: 20px;
            }

            .instruction-list {
                font-size: 1rem;
            }
        }
</style>