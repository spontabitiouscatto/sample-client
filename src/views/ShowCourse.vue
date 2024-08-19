<template>
    <div class="course-detail-container">
        <h1>{{ course.name }}</h1>
        <p><strong>Description:</strong> {{ course.description }}</p>
        <p><strong>Instructor(s):</strong>
            <span v-for="teacher in course.teachers" :key="teacher._id">
                {{ teacher.firstname }} {{ teacher.lastname }}
            </span>
        </p>
        <p><strong>Students:</strong>
            <span v-for="student in course.students" :key="student._id">
                {{ student.firstname }} {{ student.lastname }}
            </span>
        </p>

        <!-- Enroll Button -->
        <button style="background-color: #04043c;" v-if="showEnrollButton" class="ui primary button" @click="confirmEnrollment">
            Enroll
        </button>

        <!-- Go to Grade Page Button -->
        <button v-if="showGradePageButton" class="ui secondary button" @click="goToGradePage">
            Go to Grade Page
        </button>

        <!-- Edit Course Button (Admin Only) -->
        <button v-if="userRole === 'admin'" class="ui blue button" @click="goToEditCourse">
            Edit Course
        </button>

        <!-- Delete Course Button (Admin Only) -->
        <button v-if="userRole === 'admin'" class="ui red button" @click="confirmDeleteCourse">
            Delete Course
        </button>
    </div>
</template>

<script>
import { view_a_course, enroll_in_course, delete_a_course } from '../helpers/courseapi';
import { add_a_grade } from '../helpers/gradeapi'; 

export default {
    data() {
        return {
            course: {
                teachers: [],
                students: []
            },
            userRole: '',
            userId: '',
        };
    },
    computed: {
        showEnrollButton() {
            const isStudentEnrolled = this.course.students.some(student => student._id === this.userId);
            const isTeacherEnrolled = this.course.teachers.some(teacher => teacher._id === this.userId);

            if (this.userRole === 'student' && isStudentEnrolled) {
                return false; // Hide enroll button if student is already enrolled
            } else if (this.userRole === 'teacher' && isTeacherEnrolled) {
                return false; // Hide enroll button if teacher is already enrolled
            }
            return this.userRole === 'student' || this.userRole === 'teacher'; // Show enroll button if not already enrolled
        },
        showGradePageButton() {
            return this.userRole === 'admin' ||
                (this.userRole === 'teacher' && this.course.teachers.some(teacher => teacher._id === this.userId));
        }
    },
    async created() {
        const courseId = this.$route.params.id;

        const sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'));
        if (sessionUser) {
            this.userRole = sessionUser.role;
            this.userId = sessionUser._id;
        }

        try {
            const response = await view_a_course(courseId);
            if (response) {
                this.course = response;
            } else {
                console.error('Course not found or an error occurred.');
            }
        } catch (err) {
            console.error('Error fetching course:', err);
        }
    },
    methods: {
        async confirmEnrollment() {
            if (confirm('Do you want to enroll in this course?')) {
                try {
                    const response = await enroll_in_course(this.course._id);
                    if (response) {
                        alert('Successfully enrolled!');
                        await this.addGrade(); // Add grade after successful enrollment
                        const updatedCourse = await view_a_course(this.course._id);
                        if (updatedCourse) {
                            this.course = updatedCourse;
                        }
                    } else {
                        alert('Enrollment failed');
                    }
                } catch (err) {
                    console.error('Error enrolling in course:', err);
                    alert('Error enrolling in the course. Please try again.');
                }
            }
        },
        async addGrade() {
            try {
                const gradeData = {
                    student: this.userId,
                    course: this.course._id,
                    grade: 0
                };
                await add_a_grade(gradeData);
            } catch (err) {
                console.error('Error adding grade:', err);
                alert('Error adding grade. Please try again.');
            }
        },
        goToGradePage() {
            this.$router.push(`/grades/${this.course._id}`);
        },
        goToEditCourse() {
            this.$router.push(`/courses/edit/${this.course._id}`);
        },
        async confirmDeleteCourse() {
            if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
                try {
                    const response = await delete_a_course(this.course._id);
                    if (response && response.data.message === 'Course deleted successfully!') {
                        alert('Course deleted successfully.');
                        this.$router.push('/courses'); // Redirect to courses list
                    } else {
                        alert('Failed to delete the course.');
                    }
                } catch (err) {
                    console.error('Error deleting course:', err);
                    alert('Error deleting the course. Please try again.');
                }
            }
        }
    }
};
</script>

<style scoped>
.course-detail-container {
    padding: 20px;
}

h1 {
    font-size: 36px;
    color: #04043c;
    margin-bottom: 20px;
}
</style>
