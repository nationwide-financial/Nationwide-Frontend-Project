import BackendClient from './backendClient';
import { baseURL } from "../utils/config";

export const _fetchAllTasks = () => BackendClient.get(`${baseURL}/loan/task`);
export const _fetchTaskById = (id) => BackendClient.get(`${baseURL}/loan/task/` + id );
export const _deleteTaskById = (applicationId,taskId) => BackendClient.delete(`${baseURL}/loan/task/${applicationId}/${taskId}`);
export const _addTask = (body) => BackendClient.post(`${baseURL}/loan/task`,body);
export const _fetchTaskByapplicationId = (id) => BackendClient.get(`${baseURL}/loan/taskByApplicationId/${id}`);
export const _updateTaskByid = (applicationId,taskId,body) => BackendClient.put(`${baseURL}/loan/task/${applicationId}/${taskId}`,body);
