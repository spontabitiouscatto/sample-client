<template>
  <div>
    <div class="ui inverted segment navbar">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          <!-- logo -->
          <router-link to="/" class="item">
            <img src="./assets/greenwich university logo.png" alt="Logo" class="ui mini image" />
          </router-link>

          <!-- links -->
          <router-link to="/courses" class="item">
            <i class="book icon"></i>Courses
          </router-link>
          <router-link to="/instructors" class="item">
            <i class="user icon"></i>Instructors
          </router-link>
          <router-link to="/help" class="item">
            <i class="help circle icon"></i>Need Help?
          </router-link>
          <router-link :to="profileLink" class="item">
            <i class="user circle icon"></i>Profile
          </router-link>
            <!-- : v-bind, @v-on -->
          <!-- hide/disable button if it is a specific page, prevent redirection, only trigger method-->
          <template v-if="!isLoginPage">
            <a @click.prevent="handleAuthClick" class="item">
              <i :class="authIcon"></i>{{ authText }}
            </a>
            <a @click.prevent="checkLoginAndRedirect('settings')" class="item" :class="{ 'disabled': isSettingsPage }">
              <i class="settings icon"></i>Settings
            </a>
          </template>
        </div>
      </div>
    </div>

    <div class="ui container main-content">
      <div class="ui grid">
        <div class="row">
          <div>
            <router-view />
          </div>
          <div class="four wide column">
          </div>
        </div>
      </div>
    </div>
    <!-- vue assign action -->
    <button @click="scrollToTop" class="scroll-to-top ui primary button" style="background-color: #04043c;">
      <i class="arrow up icon"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      profileLink: this.getProfileLink(),
      isLoggedIn: false,
      isLoginPage: false,
      isSettingsPage: false,
    };
  },
  computed: {
    authText() {
      return this.isLoggedIn ? 'Logout' : 'Login';
    },
    authIcon() {
      return this.isLoggedIn ? 'sign-out icon' : 'sign-in icon';
    }
  },
  methods: {
    //  check session 
    async checkLoginStatus() {
      const sessionUser = sessionStorage.getItem('sessionUser');
      if (sessionUser) {
        this.isLoggedIn = true;
        this.profileLink = this.getProfileLink();
      } else {
        this.isLoggedIn = false;
      }
    },
    //only logout if loggedin
    handleAuthClick() {
      if (this.isLoggedIn) {
        this.confirmLogout();
        //extra ensuring even when button is hidden
      } else {
        this.$router.push('/login');
      }
    },
    //redirect non-loggedin users to prevent unauthorized/inappropriate visits/requests
    async checkLoginAndRedirect(page) {
      if (this.isLoggedIn) {
        this.$router.push(`/${page}`); // Redirect to settings or other pages
      } else {
        alert('You need to log in first.'); // Alert message
        this.$router.push('/login'); // Redirect to login if not logged in
      }
    },
    //scroll to top of the page
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    // ask confirmation
    async confirmLogout() {
      if (confirm('Are you sure you want to logout?')) {
        await this.logout();
      }
    },
    async logout() {
      try {
        //remove sessionuser from the sessionstorage
        sessionStorage.removeItem('sessionUser');
        //set data
        this.profileLink = '/users'; // Reset profile link after logout
        this.isLoggedIn = false;
        //redirect to login page
        this.$router.push('/login');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },
    getProfileLink() {
      //retrieve from sessionstorage object user
      const sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'));
      if (sessionUser && sessionUser._id) {
        return `/users/${sessionUser._id}`;
      }
      return '/users'; // Fallback URL
    }
  },
  //monitor the changes to trigger actions inside this block
  watch: {
    //'$route.path' = current path of the router ($route: built-in, store current route info)
    '$route.path': function () {
      this.profileLink = this.getProfileLink();
      this.checkLoginStatus();
      // this.$route.path: check current route
      this.isLoginPage = this.$route.path === '/login';
      this.isSettingsPage = this.$route.path === '/settings';
    }
  },
  mounted() {
    this.checkLoginStatus(); // Ensure the status is checked when the component mounts
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.ui.inverted.segment.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  /* Ensure it stays on top of other elements */
  height: 85px;
  /* Adjust the height as needed */
  background-color: #04043c;
  display: flex;
  align-items: center;
  /* Center vertically */
  justify-content: center;
  /* Center horizontally */
}

.ui.large.secondary.inverted.pointing.menu.compact {
  border-color: transparent;
  display: flex;
  align-items: center;
  /* Center-aligns the navbar items vertically */
  justify-content: center;
  /* Center-aligns the navbar items horizontally */
  font-size: 20px;
  width: 100%;
  /* Make sure the menu takes full width for centering */
}

.ui.mini.image {
  width: 50px;
  /*Adjust the size of the logo as needed */
  /* margin-right: 20px; */
  object-fit: contain;
}

.main-content {
  margin-top: 85px;
  /* Adjust this value based on your navbar height */
}

.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #04043c;
  /* Same color as the buttons */
  color: #ffffff;
  border-color: #04043c;
  z-index: 1000;
  /* Ensure it stays on top of other elements */
}

.scroll-to-top:hover {
  background-color: #04043c;
  /* Darker color on hover */
}

/* Disable button styling */
.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
