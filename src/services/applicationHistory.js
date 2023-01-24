import BackendClient from './backendClient';
import { baseURL } from "../utils/config";

export const _addHistory = (body) => BackendClient.post(`${baseURL}/loan/application/addHistory`, body);
export const _getAppHistoryByApplicationId = (id) => BackendClient.get(`${baseURL}/loan/appHistoryByApplicationId/${id}`);