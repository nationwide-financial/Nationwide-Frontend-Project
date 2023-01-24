import BackendClient from './backendClient';
import { baseURL } from "../utils/config";

export const _login = (body) => BackendClient.post(`${baseURL}/sign-in`, body);
export const _verifyUser = () => BackendClient.post(`${baseURL}/verify-user`);
export const _addUser = (body) =>  BackendClient.post(`${baseURL}/user`,body);
export const _getAllPlatformUserByAdmin = (page,limit) =>  BackendClient.get(`${baseURL}/users?page=${page}&limit=${limit}`);
export const _searchPlatformUserByAdmin = (searchKey) =>  BackendClient.get(`${baseURL}/user/searchPlatformUserByAdmin?searchKey=${searchKey}`);
export const _deactivateUser = (userId,body) => BackendClient.put(`${baseURL}/user/${userId}/deactive`,body );
export const _editPermissionGroup = (userId,body) => BackendClient.put(`${baseURL}/user/${userId}/editPermissionGroup`,body );
export const _setPassword = (id, body) => BackendClient.put(`${baseURL}/user/${id}/set-password`, body);
export const _getUser = () => BackendClient.get(`${baseURL}/user-info`);
export const _updateUserField = (id, field, body) => BackendClient.put(`${baseURL}/user/update/${id}/${field}`, body);
export const _resetPassword = (id, body) => BackendClient.put(`${baseURL}/user/auth/reset-password`, body);
export const _updateNoficationPreference = (body) => BackendClient.put(`${baseURL}/notificationPreference`, body);

export const _upoadProfilePic = async(profileImg) => {
    let formData = new FormData();
    formData.append("profile-image", profileImg);
    const res = await BackendClient.post(`${baseURL}/upload-profile-image`, formData);
    return res;
};