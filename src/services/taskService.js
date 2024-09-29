import axios from "axios";
import { API_ENDPOINTS } from "../const/API_ENDPOINTS";
import moment from "moment";

// Common header generator for requests
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

console.log(localStorage.getItem('token'));

// Function to create a new task
const createTask = async (task) => {
    try {
        const response = await axios.post(API_ENDPOINTS.CREATE_TASK, {
            taskTitle: task.taskTitle,
            taskDescription: task.description,
            category: task.category,
            dueDate: moment(task.dueDate).format("YYYY-MM-DD"),
            progress: task.progress,
            isCompleted: task.isCompleted,
            isImportant: task.isImportant,
        }, { headers: getHeaders() });

        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

// Function to fetch all tasks
const getAllTasks = async () => {
    try {
        const response = await axios.get(API_ENDPOINTS.GET_ALL_TASKS, {
            headers: getHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

// Function to update a task
const updateTask = async (task) => {
    try {
        const response = await axios.put(API_ENDPOINTS.UPDATE_TASK(task.taskId), {
            taskTitle: task.taskTitle,
            taskDescription: task.description,
            category: task.category,
            dueDate: moment(task.dueDate).format("YYYY-MM-DD"),
            progress: task.progress,
            isCompleted: task.isCompleted,
            isImportant: task.isImportant,
        }, { headers: getHeaders() });

        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(API_ENDPOINTS.DELETE_TASK(taskId), {
            headers: getHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

// Function to fetch important tasks
const getImportantTasks = async (isImportant) => {
    try {
        const response = await axios.get(API_ENDPOINTS.GET_IMPORTANT_TASKS, {
            headers: getHeaders(),
            params: { important: isImportant }  // Pass the 'important' parameter here
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching important tasks:', error);
        throw error;
    }
};

// Function to fetch completed tasks
const getCompletedTasks = async (isCompleted) => {
    try {
        const response = await axios.get(API_ENDPOINTS.GET_COMPLETED_TASKS, {
            headers: getHeaders(),
            params: { completed: isCompleted }  // Pass the 'completed' parameter here
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching completed tasks:', error);
        throw error;
    }
};

// Generic function to update task status
const updateTaskStatus = async (taskId, updates) => {
    try {
        const response = await axios.patch(
            API_ENDPOINTS.UPDATE_TASK_STATUS(taskId),
            updates,
            { headers: getHeaders() }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

const searchTasksByTitle = async (taskTitle) => {
    try {
        const response = await axios.get(API_ENDPOINTS.SEARCH_TASKS, {
            params: { taskTitle }, // Send the task title as a query param
            headers: getHeaders()
        });

        return response.data;

    } catch (error) {
        console.error('Error fetching tasks by title:', error);
        throw error;
    }
};


export default {createTask,
    updateTask,
    getAllTasks,
    deleteTask,
    getCompletedTasks,
    getImportantTasks,
    updateTaskStatus,
    searchTasksByTitle}
