<template>
    <div class="courses-container">
        <h1>Courses</h1>
        <!-- Admin-only Add Course Button -->
        <button v-if="isAdmin" class="ui button primary add-course-button" @click="goToAddCourse">Add New Course</button>
        <br><br>
        <div class="course-grid">
            <div class="course-card" v-for="course in courses" :key="course._id" @click="goToCourseDetail(course._id)">
                <h2>{{ course.name }}</h2>
                <p>{{ course.description }}</p>
                <p><strong>Instructor(s):</strong>
                    <span v-for="teacher in course.teachers" :key="teacher._id">
                        {{ teacher.firstname }} {{ teacher.lastname }},
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { get_all_courses } from '../helpers/courseapi';

export default {
    data() {
        return {
            courses: [],
            isAdmin: false
        };
    },
    async created() {
        try {
            // Retrieve all courses objects
            this.courses = await get_all_courses();
            // Check if the logged-in user is an admin
            const sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'));
            this.isAdmin = sessionUser && sessionUser.role === 'admin';
        } catch (err) {
            console.error('Error fetching courses:', err);
        }
    },
    methods: {
        goToCourseDetail(courseId) {
            this.$router.push(`/courses/${courseId}`);
        },
        goToAddCourse() {
            this.$router.push('/courses/add');
        }
    }
};
</script>

<style scoped>
.ui.button.primary.add-course-button {
    background-color: #04043c;
}

.courses-container {
    padding: 20px;
    text-align: left;
}

h1 {
    font-size: 36px;
    color: #04043c;
    margin-bottom: 20px;
}

.add-course-button {
    margin-bottom: 20px;
}

.course-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    justify-items: center;
}

.course-card {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 300px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    cursor: pointer;
}

.course-card:hover {
    transform: scale(1.05);
}

.course-card h2 {
    color: #04043c;
    font-size: 20px;
    margin-bottom: 10px;
}

.course-card p {
    color: #555;
    margin-bottom: 5px;
}
</style>
