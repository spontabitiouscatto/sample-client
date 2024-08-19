//setting axios for sending requests
import axios from 'axios';

//setting base url for endpoints
const backEnd = "https://sample-server-1.onrender.com/users/";
//response: retrieve a 'promise' from route
//input = data from body/url

// View all users
export const view_all_users = async () => {
    try {
        let response = await axios.get(backEnd);    
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

// View a specific user by ID
export const view_an_user = async (id) => {
    try {
        let response = await axios.get(`${backEnd}${id}`);  //retrieve a 'promise' from route
        return response.data;   //return json
    } catch (err) {
        console.error(err); 
        return null;
    }
};

// Add a new user (signup)
export const add_an_user = async (userData) => {
    try {
        let response = await axios.post(backEnd, userData); //retrieve a 'promise' from route
        return response.data;   //return json
    } catch (err) {
        console.error(err);
    }
};

// Update a specific user by ID
export const update_an_user = async (id, userData) => {
    try {
        let response = await axios.put(`${backEnd}${id}`, userData); 
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const update_password = async (id, passwords) => {
    try {
        let response = await axios.put(`${backEnd}${id}/password`, passwords); 
        return response.data;
    } catch (err) {
        console.error('Error updating password:', err);
    }
};

// Delete a specific user by ID
export const delete_an_user = async (id) => {
    try {
        let response = await axios.delete(`${backEnd}${id}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

// Login user
export const login_user = async (loginForm) => {
    try {
        const response = await axios.post(`${backEnd}login`, loginForm);
        const user = response.data.user;
        sessionStorage.setItem('sessionUser', JSON.stringify(user))
        return user;
    } catch (err) {
        console.error('Login error:', err);
        throw err;
    }
};


// View users by role
export const view_users_with_role = async (role) => {
    try {
        if (!role) throw new Error('Role is required');
        let response = await axios.get(`${backEnd}role/${role}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};
