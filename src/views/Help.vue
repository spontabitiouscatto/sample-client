<template>
    <div class="admins-container">
        <h1>Admins</h1>
        <div class="admin-card" v-for="admin in admins" :key="admin._id">
            <img src="../assets/greenoverwich_no_avatar.png" alt="Avatar" class="avatar" />
            <div class="details">
                <router-link :to="'/users/' + admin._id">
                    <h2>{{ admin.firstname }} {{ admin.lastname }}</h2>
                </router-link>
                <p><strong>Email:</strong> <a :href="'mailto:' + admin.email">{{ admin.email }}</a></p>
            </div>
        </div>
    </div>
</template>

<script>
import { view_users_with_role } from '../helpers/userapi';

export default {
    data() {
        return {
            admins: []
        };
    },
    async created() {
        try {
            this.admins = await view_users_with_role('admin');
        } catch (err) {
            console.error('Error fetching admins:', err);
        }
    }
};
</script>

<style scoped>
.admins-container {
    padding: 20px;
}

.admin-card {
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

.admin-card img.avatar {
    width: 120px; /* Adjust size as needed */
    height: 120px;
    border-radius: 50%;
    margin-right: 15px;
}

.admin-card .details {
    flex: 1;
}

.admin-card h2 {
    color: #04043c;
    font-size: 20px;
    margin-bottom: 10px;
}

.admin-card p,
.admin-card ul {
    color: #555;
    margin-bottom: 5px;
}

.admin-card ul {
    list-style-type: none;
    padding: 0;
}
</style>
