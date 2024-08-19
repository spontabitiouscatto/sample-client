<template>
    <div class="ui container profile">
        <div class="ui centered card">
            <div class="image">
                <img src="../../../greenoverwich_no_avatar.png" alt="User Avatar" class="ui circular image" />
            </div>
            <div class="content">
                <div class="header">
                    <div v-if="isEditingName" class="ui input">
                        <input v-model="user.firstname" placeholder="First Name" />
                        <input v-model="user.lastname" placeholder="Last Name" style="margin-left: 5px;" />
                    </div>
                    <div v-else>
                        {{ user.firstname }} {{ user.lastname }}
                        <button v-if="isCurrentUser" class="ui icon button" @click="editField('name')">
                            <i class="edit icon"></i>
                        </button>
                    </div>
                </div>
                <div class="meta">
                    <div v-if="isEditingDOB" class="ui input">
                        <input v-model="user.birthday" type="date" />
                    </div>
                    <div v-else>
                        Date of Birth: {{ user.birthday }}
                        <button v-if="isCurrentUser" class="ui icon button" @click="editField('dob')">
                            <i class="edit icon"></i>
                        </button>
                    </div>
                </div>
                <div class="description">
                    <div v-if="isEditingEmail" class="ui input">
                        <input v-model="user.email" placeholder="Email" type="email" />
                    </div>
                    <div v-else>
                        Email: {{ user.email }}
                        <button v-if="isCurrentUser" class="ui icon button" @click="editField('email')">
                            <i class="edit icon"></i>
                        </button>
                    </div>
                </div>
                <div class="extra content">
                    <p v-if="user.role !== 'admin'">Courses: {{ coursesCount }}</p>
                    <p>Role: {{ user.role }}</p>
                </div>
            </div>
            <div class="extra content">
                <button v-if="isEditingName || isEditingDOB || isEditingEmail" class="ui green button" @click="saveChanges">Save</button>
                <button v-if="isEditingName || isEditingDOB || isEditingEmail" class="ui red button" @click="cancelEdit">Cancel</button>
            </div>
        </div>

        <div v-if="user.role === 'student' && user.courses.length !== 0" class="ui segment">
            <h3 class="ui dividing header">Grades</h3>
            <table class="ui celled table">
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="grade in grades" :key="grade._id">
                        <td>{{ grade.course.name }}</td>
                        <td>{{ grade.grade }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Password Update Section -->
        <div v-if="isCurrentUser" class="ui segment">
            <h3 class="ui dividing header">Update Password</h3>
            <form class="ui form">
                <div class="field">
                    <label>Current Password:</label>
                    <input type="password" v-model="currentPassword" placeholder="Enter current password" />
                </div>
                <div class="field">
                    <label>New Password:</label>
                    <input type="password" v-model="newPassword" placeholder="Enter new password" />
                </div>
                <div class="field">
                    <label>Confirm New Password:</label>
                    <input type="password" v-model="confirmNewPassword" placeholder="Confirm new password" />
                </div>
                <button class="ui green button" @click.prevent="updatePassword">Update Password</button>
            </form>
        </div>
    </div>
</template>

<script>
import { view_an_user, update_an_user, update_password } from '../helpers/userapi';
import { view_grades_of_student } from '../helpers/gradeapi';

export default {
    data() {
        return {
            user: {},
            backupUser: {}, // New property for storing backup data
            grades: [],
            coursesCount: 0,
            isCurrentUser: false,
            isEditingName: false,
            isEditingDOB: false,
            isEditingEmail: false,
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        };
    },
    async created() {
        try {
            const userId = this.$route.params.id;
            const sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'));

            if (userId) {
                const userResponse = await view_an_user(userId);
                if (userResponse) {
                    this.user = userResponse;
                    this.coursesCount = userResponse.courses ? userResponse.courses.length : 0;

                    if (sessionUser && sessionUser._id === userId) {
                        this.isCurrentUser = true;
                    }

                    if (this.user.role === 'student' && (sessionUser.role === 'admin' || sessionUser._id === userId)) {
                        const gradesResponse = await view_grades_of_student(userId);
                        if (gradesResponse) {
                            this.grades = gradesResponse;
                        }
                    }
                } else {
                    console.error('User not found');
                }
            } else {
                console.error('User ID is missing');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    },
    methods: {
        editField(field) {
            // Save the current user data before editing
            this.backupUser = { ...this.user };
            
            if (field === 'name') this.isEditingName = true;
            if (field === 'dob') this.isEditingDOB = true;
            if (field === 'email') this.isEditingEmail = true;
        },
        cancelEdit() {
            // Restore the user data from the backup
            this.user = { ...this.backupUser };
            
            // Exit all edit modes
            this.isEditingName = false;
            this.isEditingDOB = false;
            this.isEditingEmail = false;
        },
        async saveChanges() {
            try {
                const updatedUser = await update_an_user(this.user._id, this.user);
                this.user = updatedUser.user;
                this.isEditingName = false;
                this.isEditingDOB = false;
                this.isEditingEmail = false;

                // Update sessionStorage after saving changes
                sessionStorage.setItem('sessionUser', JSON.stringify(this.user));
                alert('Profile updated successfully.');
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        },
        async updatePassword() {
            if (this.newPassword !== this.confirmNewPassword) {
                alert("New passwords do not match!");
                return;
            }
            try {
                const result = await update_password(this.user._id, {
                    currentPassword: this.currentPassword,
                    newPassword: this.newPassword,
                });
                if (result.success) {
                    alert("Password updated successfully");
                    this.currentPassword = '';
                    this.newPassword = '';
                    this.confirmNewPassword = '';

                    sessionStorage.setItem('sessionUser', JSON.stringify(this.user));
                } else {
                    alert(result.message || "Error updating password");
                }
            } catch (error) {
                console.error('Error updating password:', error);
            }
        },
    },
};
</script>

<style scoped>
.profile {
    margin-top: 20px;
}

.ui.card {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
}

.ui.segment {
    margin-top: 20px;
}

.ui.green.button {
    background-color: #04043c;
}

.ui.form .field {
    margin-bottom: 15px;
}
</style>
