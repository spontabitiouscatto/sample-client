<template>
    <div class="grade-container">
        <h1>Grades for Course "{{ courseName }}"</h1>
        <div v-if="grades.length === 0">No grades available.</div>
        <div v-else class="grade-table-container">
            <table class="grade-table">
                <thead>
                    <tr>
                        <th class="name-column">Student Name</th>
                        <th>Course</th>
                        <th>Grade</th>
                        <th v-if="isTeacher">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="grade in grades" :key="grade._id">
                        <td class="name-column">{{ grade.student.firstname }} {{ grade.student.lastname }}</td>
                        <td>{{ courseName }}</td>
                        <td>
                            <input
                                v-if="isEditing(grade._id)"
                                v-model.number="grade.editableGrade"
                                @blur="updateGrade(grade)"
                                type="number"
                                min="0"
                                max="100"
                                class="grade-input"
                            />
                            <span v-else @click="startEditing(grade._id, grade.grade)">
                                {{ grade.grade }}
                            </span>
                        </td>
                        <td v-if="isTeacher">
                            <button style="background-color: #04043c;" @click="startEditing(grade._id, grade.grade)">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { view_grades_of_course, update_a_grade } from '../helpers/gradeapi'; 
import { view_a_course } from '../helpers/courseapi';

export default {
    data() {
        return {
            grades: [],
            courseName: '',
            userRole: '',
            userId: '',
            editingGradeId: null
        };
    },
    computed: {
        isTeacher() {
            return this.userRole === 'teacher';
        },
    },
    async created() {
        const sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'));
        if (sessionUser) {
            this.userRole = sessionUser.role;
            this.userId = sessionUser._id;
        }

        if (this.userRole !== 'teacher' && this.userRole !== 'admin') {
            alert('Access Denied. Only teachers and admins can view grades.');
            this.$router.push('/');
            return;
        }

        const courseId = this.$route.params.id;
        console.log('Fetching grades and course for ID:', courseId);

        try {
            const gradesData = await view_grades_of_course(courseId);
            console.log('Grades data received:', gradesData);
            this.grades = gradesData;

            if (gradesData.length > 0) {
                this.courseName = gradesData[0].course.name || 'N/A';
            } else {
                const course = await view_a_course(courseId);
                console.log('Course fetched by ID:', course);
                this.courseName = course ? course.name : 'N/A';
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    },
    methods: {
        startEditing(gradeId, currentGrade) {
            this.editingGradeId = gradeId;
            const grade = this.grades.find(g => g._id === gradeId);
            if (grade) {
                grade.editableGrade = currentGrade;
            }
        },
        async updateGrade(grade) {
            if (grade.editableGrade < 0 || grade.editableGrade > 100) {
                alert('Grade must be between 0 and 100');
                return;
            }

            try {
                await update_a_grade(grade._id, { grade: grade.editableGrade });
                const courseId = this.$route.params.id;
                const gradesData = await view_grades_of_course(courseId);
                this.grades = gradesData;
                this.editingGradeId = null;
            } catch (err) {
                console.error('Error updating grade:', err);
            }
        },
        isEditing(gradeId) {
            return this.editingGradeId === gradeId;
        }
    }
};
</script>

<style scoped>
.grade-container {
    padding: 20px;
}

h1 {
    font-size: 36px;
    color: #04043c;
    margin-bottom: 20px;
}

.grade-table-container {
    margin-top: 20px;
}

.grade-table {
    width: 100%;
    border-collapse: collapse;
}

.grade-table th, .grade-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.grade-table th {
    background-color: #f2f2f2;
    color: #04043c;
    font-weight: bold;
}

.grade-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.grade-table tr:hover {
    background-color: #f1f1f1;
}

.name-column {
    width: 200px; 
}

.grade-input {
    width: 100%;
    max-width: 150px; 
    box-sizing: border-box;
    padding: 5px;
    border: 1px solid #ddd;
}

.grade-table button {
    background-color: #4CAF50; 
    color: white;
    border: none;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 2px 1px;
    cursor: pointer;
}

.grade-table button:hover {
    background-color: #45a049;
}
</style>
