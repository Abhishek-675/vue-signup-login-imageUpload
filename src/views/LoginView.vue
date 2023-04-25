<template>
  <HeaderComp />
  <div class="wrapper">
    <div class="form-container">
      <h1>Login</h1>
      <form id="form" @submit.prevent="login">
        <label for="email" class="form-label">E-Mail</label>
        <input type="email" class="form-input" id="email" v-model="email" /><br />
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          class="form-input"
          id="pass"
          v-model="password"
        /><br />
        <div>
          <button type="submit" class="form-btn" id="btn-login">Login</button>
        </div>
      </form>
      <p>Don't have an account? <router-link to="/signup">Signup</router-link></p>
    </div>
  </div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue'
export default{
    name: 'login-view',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    components:{
      'HeaderComp': HeaderComp
    },
    methods:{
      login(){
        this.$store.dispatch('login', {
          email:this.email,
          password:this.password
        })
        .then((response)=>{
          if(response.status === 200) {
            // localStorage.setItem("isLoggedIn", this.$store.state.isLoggedIn)
            this.$router.push('/home')
          }
          else if(response.status === 401) return this.$store.commit('LoggedInMsg', 'Email or Password is Incorrect')
          else {
            this.$store.commit('LoggedInMsg', response.data.message)
          }
        })
      }
    }
}
</script>

<style scoped>
/* * {
  box-sizing: border-box;
  margin: 0%;
  padding: 0%;
} */

/* .wrapper {
  background: #9999ff;
} */

a {
  color: red;
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 300px;
  background: white;
  margin: 50px auto;
  border-radius: 15px;
  padding: 20px;
  align-items: center;
  height: 400px;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

form div {
  margin: 0 auto;
}

.form-input {
  padding: 2px 5px;
  outline: none;
  border-radius: 5px;
  border: solid 1px #b3cce6;
}

.form-btn {
  width: 100px;
  margin: 0 auto;
  padding: 3px 0;
  box-sizing: initial;
  background: #9999ff;
  color: white;
  font-weight: bold;
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}

#btn-forgot {
  width: 150px;
  padding: 5px;
}
</style>
