<template>
  <div class="container">
    <div class="form-wrapper">
      <h1 v-if="!isSignup" class="ui header text-align-center">Login</h1>
      <h1 v-if="isSignup" class="ui header text-align-center">Create an Account</h1>

      <!-- Buttons to Toggle Between Forms -->
      <div class="ui buttons">
        <button class="ui primary button" @click="isSignup = false" :class="{ active: !isSignup }">Login</button>
        <div class="or"></div>
        <button class="ui primary button" @click="isSignup = true" :class="{ active: isSignup }">Sign Up</button>
      </div>
      <br /><br />

      <!-- Form for Login or Signup -->
      <form class="ui form" @submit.prevent="handleSubmit">
        <div v-if="isSignup">
          <div class="field">
            <label>First Name</label>
            <input type="text" v-model="signupForm.firstname" placeholder="First Name" />
          </div>
          <div class="field">
            <label>Last Name</label>
            <input type="text" v-model="signupForm.lastname" placeholder="Last Name" />
          </div>
          <div class="field">
            <label>Birthday</label>
            <input type="date" v-model="signupForm.birthday" placeholder="Birthday" />
          </div>
          <div class="field">
            <label>Role</label>
            <select v-model="signupForm.role" class="ui dropdown">
              <option value="" disabled selected>Select your role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
        </div>
        <br>
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <!-- For Login Form -->
            <input v-if="!isSignup" type="email" name="email" placeholder="E-mail address" v-model="loginForm.email" />
            <!-- For Signup Form -->
            <input v-else type="email" name="email" placeholder="E-mail address" v-model="signupForm.email" />
          </div>
        </div>

        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <!-- For Login Form -->
            <input v-if="!isSignup" type="password" name="password" placeholder="Password" v-model="loginForm.password" />
            <!-- For Signup Form -->
            <input v-else type="password" name="password" placeholder="Password" v-model="signupForm.password" />
          </div>
        </div>

        <button class="ui primary button submit-button" type="submit">{{ isSignup ? 'Sign Up' : 'Login' }}</button>
      </form>
      <div v-if="error" class="ui error message">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import { login_user, add_an_user } from '../helpers/userapi';

export default {
  data() {
    return {
      isSignup: false,
      //creating forms to consume on submit
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        birthday: '',
        role: ''
      },
      error: '',
      userId: null,
      userRole: ''
    };
  },
  methods: {
    //when submit
    async handleSubmit() {
      this.error = '';
      try {
        if (this.isSignup) {
          await add_an_user(this.signupForm);
        } else {
          await login_user(this.loginForm);
          const sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'))
          this.userId = sessionUser._id
          console.log(sessionUser)
        }
        this.$router.push('/');
      } catch (err) {
        this.error = err.response?.data?.message || 'An error occurred';
      }
    }
  }
};
</script>


<style scoped>
body {
  background-image: url('https://www.gre.ac.uk/__data/assets/image/0025/119653/gre.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  margin: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-top: 20px;
}

.form-wrapper {
  width: 400px;
  transition: height 0.5s ease;
}

.ui.header.text-align-center {
  text-align: center;
}

.ui.buttons {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.ui.buttons .button.active {
  background-color: #04043c;
  color: #ffffff;
}

.ui.buttons .button:not(.active) {
  background-color: #cccccc;
  color: #ffffff;
}

.ui.button {
  width: 45%;
}

.ui.button.submit-button {
  float: right;
  background-color: #04043c;
}

.ui.error.message {
  margin-top: 15px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
