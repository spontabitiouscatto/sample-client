import Vue from 'vue';
import Router from 'vue-router';
import LoginSignup from './views/LoginSignup.vue';
import Courses from './views/Courses.vue';
import Instructors from './views/Instructors.vue';
import Help from './views/Help.vue';
import ShowCourse from './views/ShowCourse.vue';
import Profile from './views/Profile.vue';
import Grades from './views/Grades.vue';
import Settings from './views/Settings.vue';
import AdminDelete from './views/AdminDelete.vue';
import AdminGrades from './views/AdminGrades.vue';
import About from './views/About.vue';
import AddCourse from './views/AddCourse.vue';
import EditCourse from './views/EditCourse.vue';

Vue.use(Router);

const router = new Router({
   mode: 'history',
   routes: [
      {
         path: '/',
         name: 'About',
         component: About
      },
      {
         path: '/login',
         name: 'LoginSignup',
         component: LoginSignup
      },
      {
         path: '/courses',
         name: 'Courses',
         component: Courses
      },
      {
         path: '/instructors',
         name: 'Instructors',
         component: Instructors
      },
      {
         path: '/help',
         name: 'Help',
         component: Help
      },
      {
         path: '/courses/add',
         name: 'AddCourse',
         component: AddCourse
      },
      {
         path: '/courses/:id',
         name: 'ShowCourse',
         component: ShowCourse
      },
      {
         path: '/courses/edit/:id',
         name: 'EditCourse',
         component: EditCourse
      },
      {
         path: '/users/:id',
         name: 'Profile',
         component: Profile
      },
      {
         path: '/grades/:id',
         name: 'Grades',
         component: Grades
      },
      {
         path: '/settings',
         name: 'Settings',
         component: Settings
      },
      {
         path: '/admin/delete',
         name: 'AdminDelete',
         component: AdminDelete
      },
      {
         path: '/admin/grades',
         name: 'AdminGrades',
         component: AdminGrades
      }
   ]
});

// Navigation guard
// router.beforeEach((to, from, next) => {
//    const sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'));

//    // If route requires authentication and user is not logged in
//    if (to.path !== '/login' && (!sessionUser || !sessionUser._id)) {
//       next('/login');
//    } else {
//       next();
//    }
// });

export default router;
