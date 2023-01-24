import BackendClient from './backendClient';
import { baseURL } from "../utils/config";

export const _gatReason = () => BackendClient.get(`${baseURL}/loan/reasons`);
