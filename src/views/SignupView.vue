<template>
  <HeaderComp/>
  <div class="form-container">
    <h1>Sign Up</h1>
    <Form id="form" v-on:submit="signup" :validation-schema="schema">
      <label for="name" class="form-label">Name</label>
      <Field name="name" type="text" class="form-input" id="name" v-model="name" /><br />
      <ErrorMessage name="name" id="errorMsg"/>
      <label for="email" class="form-label">E-Mail</label>
      <Field name="email" type="email" class="form-input" id="email" v-model="email" /><br />
      <ErrorMessage name="email" id="errorMsg"/>
      <label for="phone-number" class="form-label" >Phone Number</label>
      <Field name="phone" type="tel" class="form-input" id="tel" v-model="phone" placeholder="1234567809" /><br />
      <ErrorMessage name="phone" id="errorMsg"/>
      <label for="password" class="form-label">Password</label>
      <Field name="password"
        type="password"
        class="form-input"
        id="pass"
        v-model="password"
      /><br />
      <ErrorMessage name="password" id="errorMsg"/>
      <button type="submit" class="form-btn" id="btn">Sign Up</button>
    </Form>
    <p>Already a member? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import {Field, Form, ErrorMessage} from "vee-validate"
import * as yup from "yup"
import HeaderComp from "../components/HeaderComp.vue"

export default {
  name: "signup-view",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      password: "",
      // phonePattern: "/^\d{3}-\d{3}-\d{4}$/",

    };
  },
  methods: {
    signup() {
      this.$store
        .dispatch("signup", {
          name: this.name,
          email: this.email,
          phoneno: this.phone,
          password: this.password,
        })
        .then((response) => {
          if(response.status === 201){
            this.$store.commit('LoggedInMsg', response.data.message)
            this.$router.push("/login");
          }
          else {
            this.$store.commit('LoggedInMsg', response.data.message)
          }
        });
    },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
    HeaderComp
  },
  computed:{
    schema(){
      return yup.object({
        name: yup.string().required(),
        email: yup.string().required().email(),
        phone: yup.string().required().length(10),
        // .matches(this.phonePattern, "Phone number is not valid"),
        password: yup.string().min(4),

      })
    }
  }
};
</script>

<style scoped>
/* * {
  box-sizing: border-box;
  margin: 0%;
  padding: 0%;
} */

/* body {
  background: #9999ff;
} */

#errorMsg{
  color: red
}

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

.form-btn:disabled {
  background-color: gray;
}

#btn-forgot {
  width: 150px;
  padding: 5px;
}
</style>
