import BackendClient from './backendClient';
import { baseURL } from "../utils/config";

export const _sendCustomEmail = (body) => BackendClient.post(`${baseURL}/send-custom-email`,body);
