import BackendClient from './backendClient';
import { baseURL } from "../utils/config";

export const _listLabel = () => BackendClient.get(`${baseURL}/loan/labels`);
export const _addLabel = (body) => BackendClient.post(`${baseURL}/loan/label`,body);
export const _deleteLabel = (id) => BackendClient.delete(`${baseURL}/loan/label/${id}`);
export const _editLabel = (id,body) => BackendClient.put(`${baseURL}/loan/label/${id}`,body);
export const _getSingleLabel = (id) => BackendClient.get(`${baseURL}/loan/getLabelById/${id}`);
