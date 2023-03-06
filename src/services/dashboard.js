import BackendClient from './backendClient';
import { baseURL } from "../utils/config";

export const _fetchDashboardData = (body) => BackendClient.post(`${baseURL}/dashboard`, body);