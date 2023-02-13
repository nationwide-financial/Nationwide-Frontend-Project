import BackendClient from './backendClient';
import { baseURL } from "../utils/config";

export const _gatReason = () => BackendClient.get(`${baseURL}/loan/reasons`);
export const _addRejection = (body) => BackendClient.post(`${baseURL}/loan/reason`, body);
export const _updateRejection = (id, body) => BackendClient.put(`${baseURL}/loan/reason/${id}`, body );
export const _deleteReason = (id) => BackendClient.delete(`${baseURL}/loan/reason/${id}`);

