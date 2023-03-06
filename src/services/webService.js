import BackendClient from './backendClient';
import { webURL } from "../utils/config";
export const _getContacts = () => BackendClient.get(`${webURL}/users`);
export const _getContactBySearch = (searchKey) => BackendClient.get(`${webURL}/users/like/${searchKey}`);


