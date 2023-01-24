import BackendClient from './backendClient';
import { baseURL } from "../utils/config";

export const _fetchAllContacts = () => BackendClient.get(`${baseURL}/contacts`);
export const _addContact = (body) => BackendClient.post(`${baseURL}/contact`, body);
export const _addBulkContacts = (body) => BackendClient.post(`${baseURL}/contacts`, body);
export const _fetchSingleContacts = (id) => BackendClient.get(`${baseURL}/contact/${id}`);
export const _deleteContact = (id) => BackendClient.delete(`${baseURL}/contact/${id}`);
export const _fetchContactById = (id) => BackendClient.get(`${baseURL}/contact/${id}`);
export const _updateContactById = (id, body) => BackendClient.put(`${baseURL}/contact/${id}`, body);
