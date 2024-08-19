<template>
    <div class="settings-container">
        <h1 class="ui header">Settings</h1>

        <div class="ui buttons">
            <router-link :to="userProfileLink" class="ui primary button">Modify my account</router-link>
        </div>
        <br>
        <div class="ui buttons">
            <template v-if="isAdmin">
                <router-link to="/admin/delete" class="ui third button">Delete a user</router-link>
            </template>
            <template v-if="isAdmin">
                <router-link to="/admin/grades" class="ui third button">See all grades</router-link>
            </template>
        </div>
        <br>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isAdmin: false,
            userProfileLink: '',
        };
    },
    created() {
        this.checkUserRole();
    },
    methods: {
        checkUserRole() {
            const sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'));
            if (sessionUser) {
                this.userProfileLink = `/users/${sessionUser._id}`; // Set the profile link
                if (sessionUser.role === 'admin') {
                    this.isAdmin = true;
                }
            }
        }
    }
};
</script>

<style scoped>
.settings-container {
    padding: 20px;
}

.ui.header {
    text-align: center;
}

.ui.buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.ui.button {
    margin: 0 10px;
}
</style>
