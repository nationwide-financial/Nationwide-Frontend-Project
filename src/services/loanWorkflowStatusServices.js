import BackendClient from './backendClient';
import { baseURL } from "../utils/config";

export const _addWorkflowStatus = (body) => BackendClient.post(`${baseURL}/loan/status`, body);
export const _fetchWorkflowStatuses = () => BackendClient.get(`${baseURL}/loan/statuses`);
export const _deleteWorkflowStatus = (id) => BackendClient.delete(`${baseURL}/loan/status/` + id );
export const _updateWorkflowStatus = (id, body) => BackendClient.put(`${baseURL}/loan/status/` + id, body );