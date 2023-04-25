<template>
  <div class="container">
    <div class="child">
      <h1>Welcome, {{ name }}</h1>
      <button type="button" class="btn btn-primary" @click="getUsers">Get Users</button>
      <div>
        <h3>User List</h3>
        <div id="user">
          <li v-for="(value, key) in this.$store.state.userList" :key="key">{{ value.name }}</li>
        </div>
      </div>
      <button id="logout-btn" @click="logout">Logout</button>
      <div>
        <!-- <button @click="newToken">Generate New Token</button> -->
        <!-- <button @click="deleteToken">Delete Token</button> -->
      </div>
    </div>

  </div>
</template>

<script>
export default{
  name: 'home-view',
  data(){
    return {
      name: localStorage.getItem('userName')
    }
  },
  methods:{
    getUsers(){
      this.$store.dispatch('users')
      .then((response)=>{
        // console.log(response)
        if (response.status === 200) return
        if(response.status === 200 && response.data.user.length === 0) return this.$store.commit('LoggedInMsg', "No Users Registered")
        if(response.status === 403) {
          this.$store.state.userList = '';
          return this.$store.commit('LoggedInMsg', response.data.message)
        }
        else{
          // alert(response.data.message)
          this.$store.commit('LoggedInMsg', response.data.message)

        }
      })
    },
    logout(){
      localStorage.clear()
      this.$store.commit('SET_LOGIN', false)
      this.$router.push('/login')
    },
    newToken(){
      this.$store.dispatch('newToken',{
        refreshToken: localStorage.getItem("refreshToken")
      })
      .then((response)=>{
        console.log(response);
        if(response.status===200) {
          localStorage.setItem("accessToken", response.data.accessToken)
          return alert("New Token Generated")
        }
        alert(response.status)
      })
    },
    deleteToken(){

    }
  },
  // mounted(){
  //   this.$store.dispatch('users')
  // }
}
</script>

<style scoped>
/* .container {
  
} */

.child {
 text-align: center;
}

#logout-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: red;
            color: white;
            font-size: 20px;
            font-weight: 700;
            border-radius: 5px;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
        }

#user{
  text-align: start;
    width: 200px;
    margin: auto;
    list-style: decimal;
    padding-left: 50px;
}

</style>