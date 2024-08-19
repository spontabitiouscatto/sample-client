<template>
    <div v-if="isAdmin" class="container">
        <div class="ui segment">
            <h2 class="ui header">Student Grades</h2>
            <table class="ui celled table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Course Name</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="grade in grades" :key="grade._id">
                        <td>{{ grade.studentName }}</td>
                        <td>{{ grade.courseName }}</td>
                        <td>{{ grade.grade }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="error" class="ui error message">{{ error }}</div>
        </div>
    </div>
    <div v-else>
        <p>You are not authorized to view this page.</p>
    </div>
</template>

<script>
import { view_students_with_grades } from '../helpers/gradeapi';

export default {
    data() {
        return {
            grades: [],
            error: '',
            isAdmin: false,
        };
    },
    async created() {
        const sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'));
        if (!sessionUser || sessionUser.role !== 'admin') {
            alert('You are not authorized to view this page.');
            this.$router.push('/courses');
            return;
        }
        this.isAdmin = true;
        try {
            //retrieve all grade objects
            this.grades = await view_students_with_grades();
        } catch (err) {
            this.error = err.response?.data?.message || 'An error occurred';
        }
    }
};
</script>

<style scoped>
/* Add your styles here */
.container {
    padding: 20px;
}
</style>