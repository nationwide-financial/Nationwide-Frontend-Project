import BackendClient from './backendClient';
import { baseURL } from "../utils/config";
export const _getApplicationNotesByApplicationId = (id) =>  BackendClient.get(`${baseURL}/loan/listNoteByApplicationId/${id}`);
export const _addApplicationNote = (body) => BackendClient.post(`${baseURL}/loan/addNote`,body);
