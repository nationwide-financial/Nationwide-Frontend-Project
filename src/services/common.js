import BackendClient from './backendClient';
import { baseURL } from "../utils/config";

export const _setAutoAssignMember  = (body) => BackendClient.post(`${baseURL}/auto-member-assignment`, body);
export const _getAutoAssignMember  = () => BackendClient.get(`${baseURL}/auto-member-assignment`);
export const _setActiveMember  = (body) => BackendClient.put(`${baseURL}/auto-member-assignment`, body);