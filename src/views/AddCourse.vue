<template>
    <div class="add-course-container">
        <h1>Add a New Course</h1>
        <form class="ui form" @submit.prevent="submitForm">
            <div class="field">
                <label>Course Name</label>
                <input type="text" v-model="course.name" placeholder="Enter course name" required>
            </div>
            <div class="field">
                <label>Course Description</label>
                <textarea v-model="course.description" placeholder="Enter course description" required></textarea>
            </div>
            <button type="submit" class="ui button primary">Add Course</button>
        </form>
    </div>
</template>

<script>
import { add_a_course } from '../helpers/courseapi';

export default {
    data() {
        return {
            course: {
                name: '',
                description: '',
                students: [],
                teachers: []
            }
        };
    },
    async created() {
        //check authorization
        //convert json to object
        const sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'));
        if (!sessionUser || sessionUser.role !== 'admin') {
            alert('You are not authorized to view this page.');
            this.$router.push('/');
            return;
        }
        try {
            //retrieve all users
            this.users = await view_all_users();
        } catch (err) {
            this.error = err.response?.data?.message || 'An error occurred';
        }
    },
    methods: {
        async submitForm() {
            try {
                // Send course data to the backend to add a new course
                const response = await add_a_course(this.course);
                console.log(response.message);
                // Redirect to the courses page after adding the course
                this.$router.push('/courses');
            } catch (error) {
                console.error('Error adding course:', error);
            }
        }
    }
};
</script>

<style scoped>
.add-course-container {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
}

h1 {
    font-size: 32px;
    color: #04043c;
    margin-bottom: 20px;
}
</style>
