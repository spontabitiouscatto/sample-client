//setting axios for sending requests
import axios from 'axios';

//setting base url for endpoints
const backEnd = "https://sample-server-viij.onrender.com/grades/";
//response: retrieve a 'promise' from route
//input = data from body/url

export const view_grades_of_course = async (courseId) => {
    try {
        const response = await axios.get(`${backEnd}${courseId}`);
        return response.data;
    } catch (err) {
        console.error('Error fetching grades for course:', err);
        throw err;
    }
};

// View students with their grades
export const view_students_with_grades = async () => {
    try {
        let response = await axios.get(backEnd);
        return response.data;
    } catch (err) {
        console.error('Error fetching students with grades:', err);
    }
};

// View a specific grade by ID
export const view_a_grade = async (id) => {
    try {
        let response = await axios.get(`${backEnd}${id}`);
        return response.data;
    } catch (err) {
        console.error('Error fetching grade:', err);
        return null;
    }
};

// Add a new grade
export const add_a_grade = async (gradeData) => {
    try {
        let response = await axios.post(backEnd, gradeData);
        return response.data;
    } catch (err) {
        console.error('Error adding grade:', err);
    }
};

// Update a specific grade by ID
export const update_a_grade = async (gradeId, updatedGrade) => {
    try {
        const response = await axios.put(`${backEnd}${gradeId}`, updatedGrade);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating the grade');
    }
};

export const view_grades_of_student = async (studentId) => {
    try {
        const response = await axios.get(`${backEnd}students/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching grades:', error);
        return null; // Return null to indicate failure
    }
};