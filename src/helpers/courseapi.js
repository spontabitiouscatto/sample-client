//setting axios for sending requests
import axios from 'axios';

//setting base url for endpoints
const backEnd = "https://sample-server-1.onrender.com/courses/";
//retrieve a 'promise' from route
//input = data from body/url

export const enroll_in_course = async (courseId) => {
    try {
        // Get the session user from sessionStorage
        const sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'));
        if (!sessionUser) {
            throw new Error('User not logged in');
        }

        // Make the POST request to enroll the user in the course
        const response = await axios.post(`${backEnd}${courseId}/enroll`, sessionUser);

        // Log the success message
        console.log('Enrollment successful:', response.data);
        return true;
    } catch (error) {
        // Handle and log any errors
        console.error('Error enrolling in course:', error.response ? error.response.data.message : error.message);
        return false;
    }
};
export const get_all_courses = async () => {
    try {
        const response = await axios.get(backEnd);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching courses');
    }
};

export const view_a_course = async (id) => {
    try {
        const response = await axios.get(`${backEnd}${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching the course');
    }
};

export const add_a_course = async (courseData) => {
    try {
        const response = await axios.post(backEnd, courseData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error adding the course');
    }
};


export const update_a_course = async (id, courseData) => {
    try {
        const response = await axios.put(`${backEnd}${id}`, courseData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating the course');
    }
};

export const delete_a_course = async (id) => {
    try {
        const response = await axios.delete(`${backEnd}${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error deleting the course');
    }
};
