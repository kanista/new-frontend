const BASE_URL = 'http://localhost:8080/api';

export const API_ENDPOINTS = {
    LOGIN: `${BASE_URL}/login`,
    REGISTER: `${BASE_URL}/register`,
    TODOS: `${BASE_URL}/todos`,
    CREATE_TASK: `${BASE_URL}/tasks`,
    GET_ALL_TASKS: `${BASE_URL}/tasks/all-tasks`,
    GET_IMPORTANT_TASKS: `${BASE_URL}/tasks/important`,
    GET_COMPLETED_TASKS: `${BASE_URL}/tasks/completed`,
    UPDATE_TASK:(id)=>`${BASE_URL}/tasks/${id}`,
    UPDATE_TASK_STATUS:(id)=>`${BASE_URL}/tasks/${id}`,
    DELETE_TASK:(id)=>`${BASE_URL}/tasks/${id}`,
    SEARCH_TASKS: `${BASE_URL}/tasks/search`

};