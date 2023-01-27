import BackendClient from './backendClient';
import { baseURL } from "../utils/config";

export const _addApplication = (body) => BackendClient.post(`${baseURL}/loan/addApplication`, body);
export const _getApplications = () => BackendClient.get(`${baseURL}/loan/listApplications`);
export const _getAllApplications = () => BackendClient.get(`${baseURL}/loan/listAllApplications`);
export const _getApplicationById = (id) =>BackendClient.get(`${baseURL}/loan/listApplicationByid/${id}`);
export const _updateApplicationStatus = (id, body) => BackendClient.put(`${baseURL}/loan/applicationChangeStatus/${id}`, body)
export const _applicationAddLabel = (id,body) =>BackendClient.put(`${baseURL}/loan/editApplicationLabelById/${id}`,body);

export const _manageTeamMembers = (id,body) =>BackendClient.put(`${baseURL}/loan/manageTeamMembers/${id}`,body);
export const _changeApplicationStatus = (id,body) =>BackendClient.put(`${baseURL}/loan/applicationChangeStatus/${id}`,body);
export const _manageApplicationData = (id,body) =>BackendClient.put(`${baseURL}/loan/manageApplicationData/${id}`,body);
export const _updateRejections = (id,body) =>BackendClient.put(`${baseURL}/loan/updateApplicationRejections/${id}`,body);


