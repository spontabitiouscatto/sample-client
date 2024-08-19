<template>
    <div class="container">
        <div class="ui container">
            <h1 class="ui header">Admin Dashboard</h1>
            <div v-if="users.length === 0" class="ui info message">
                No users found.
            </div>
            <div class="ui three stackable cards">
                <div v-for="user in users" :key="user._id" class="ui card">
                    <!-- admin cannot delete admin -->
                    <div class="content">
                        <div class="header">{{ user.firstname }} {{ user.lastname }}</div>
                        <div class="meta">{{ user.email }}</div>
                        <div class="description">
                            <p>Role: {{ user.role }}</p>
                        </div>
                    </div>
                    <div v-if="user.role != 'admin'" class="extra content">
                        <button class="ui red button" @click="deleteUser(user._id)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import { view_all_users, delete_an_user } from '../helpers/userapi';

export default {
    data() {
        return {
            users: [],
            error: '',
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
        async deleteUser(userId) {
            if (confirm('Are you sure you want to delete this user?')) {
                try {
                    await delete_an_user(userId);
                    //filter out the deleted user from the data
                    this.users = this.users.filter(user => user._id !== userId);
                } catch (err) {
                    this.error = err.response?.data?.message || 'An error occurred';
                }
            }
        }
    }
};
</script>

<style scoped>
.container {
    margin-top: 20px;
}

.ui.card {
    margin-bottom: 20px;
}

.ui.header {
    margin-bottom: 20px;
}

.ui.info.message {
    margin-bottom: 20px;
}
</style>