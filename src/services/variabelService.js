import BackendClient from './backendClient';
import { baseURL } from "../utils/config";

export const _gatVariabels = () => BackendClient.get(`${baseURL}/loan/variables`);
export const _searchVariabels = (limit,page,searchKey) => BackendClient.get(`${baseURL}/loan/variables/search?page=${page}&limit=${limit}&searchKey=${searchKey}`);
export const _addVariabel = (body) => BackendClient.post(`${baseURL}/loan/variable`,body);
export const _deleteVariabels = (id) => BackendClient.delete(`${baseURL}/loan/variable/${id}`);
export const _updateVariabels = (id,body) => BackendClient.put(`${baseURL}/loan/variable/${id}`,body);
