<template>
    <h1>This Page does not exist</h1>
    <button @click="home"><router-view to="/home">Back To Home</router-view></button>
</template>

<script>
export default{
    name: "PageNotFound",
    methods:{
        home(){
            this.$router.push('/home')
        }
    }
}
</script>

