<template>
    <h1 id ='error'>404</h1>
    <h1 id ='error'>Page not found</h1>
    <button @click="goHome">go back</button>
</template>
<script>
export default{
    methods:{
        goHome(){
            this.$router.push({name : 'home'})
        }
    }
}
</script>
<style>
#errpr{
    color: red;
}
</style>