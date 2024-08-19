<template>
    <div class="instructors-container">
        <h1>Instructors</h1>
        <div class="instructor-card" v-for="instructor in instructors" :key="instructor._id">
            <img src="../../../greenoverwich_no_avatar.png" alt="Avatar" class="avatar" />
            <div class="details">
                <router-link :to="'/users/' + instructor._id">
                    <h2>{{ instructor.firstname }} {{ instructor.lastname }}</h2>
                </router-link>
                <p><strong>Email:</strong> <a :href="'mailto:' + instructor.email">{{ instructor.email }}</a></p>
                <p><strong>Courses:</strong></p>
                <ul>
                    <li v-for="course in instructor.courses" :key="course._id">{{ course.name }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { view_users_with_role } from '../helpers/userapi';

export default {
    data() {
        return {
            instructors: []
        };
    },
    async created() {
        try {
            this.instructors = await view_users_with_role('teacher');
        } catch (err) {
            console.error('Error fetching instructors:', err);
        }
    }
};
</script>

<style scoped>
.instructors-container {
    padding: 20px;
}

.instructor-card {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 400px; /* Increased width */
    padding: 15px;
    margin: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
}

.instructor-card img.avatar {
    width: 120px; /* Adjust size as needed */
    height: 120px;
    border-radius: 50%;
    margin-right: 15px;
}

.instructor-card .details {
    flex: 1;
}

.instructor-card h2 {
    color: #04043c;
    font-size: 20px;
    margin-bottom: 10px;
    cursor: pointer;
    text-decoration: underline;
}

.instructor-card p,
.instructor-card ul {
    color: #555;
    margin-bottom: 5px;
}

.instructor-card ul {
    list-style-type: none;
    padding: 0;
}
</style>
