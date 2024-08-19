<template>
    <div class="ui container segment edit-course-container">
        <h1 class="ui header">Edit Course</h1>
        <form class="ui form" @submit.prevent="updateCourse">
            <!-- Course Name -->
            <div class="field">
                <label for="course-name">Course Name</label>
                <input type="text" id="course-name" v-model="course.name" placeholder="Course Name" required />
            </div>
            <!-- Description -->
            <div class="field">
                <label for="course-description">Description</label>
                <textarea id="course-description" v-model="course.description" placeholder="Course Description" required></textarea>
            </div>
            <!-- Buttons -->
            <div class="ui buttons">
                <button type="submit" class="ui primary button">Update Course</button>
                <div class="or"></div>
                <button type="button" class="ui button" @click="cancelEdit">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script>
import { view_a_course, update_a_course } from '../helpers/courseapi';

export default {
    data() {
        return {
            course: {
                name: '',
                description: '',
            }
        };
    },
    async created() {
        const courseId = this.$route.params.id;

        try {
            const response = await view_a_course(courseId);
            if (response) {
                this.course = response;
            } else {
                console.error('Course not found or an error occurred.');
            }
        } catch (err) {
            console.error('Error fetching course details:', err);
        }
    },
    methods: {
        async updateCourse() {
            const courseId = this.$route.params.id;

            try {
                const response = await update_a_course(courseId, this.course);
                if (response) {
                    alert('Course updated successfully!');
                    this.$router.push(`/courses/${courseId}`);
                } else {
                    alert('Failed to update the course.');
                }
            } catch (err) {
                console.error('Error updating course:', err);
            }
        },
        cancelEdit() {
            const courseId = this.$route.params.id;
            this.$router.push(`/courses/${courseId}`);
        }
    }
};
</script>

<style scoped>
.edit-course-container {
    padding: 20px;
    max-width: 700px;
    margin: 0 auto;
}

.ui.header {
    font-size: 28px;
    color: #04043c;
    margin-bottom: 20px;
}

.ui.form .field label {
    font-weight: bold;
}

.ui.form .field {
    margin-bottom: 20px;
}
</style>
