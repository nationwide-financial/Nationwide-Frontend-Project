import BackendClient from './backendClient';
import { baseURL } from "../utils/config";

export const _gatLoanType = () => BackendClient.get(`${baseURL}/loan/types`);
export const _addLoanType = async (body) => {
  const { loanName, loanIcon, loanStatus } = body;
  let formData = new FormData();
  formData.append("loanName", loanName);
  formData.append("loanIcon", loanIcon);
  formData.append("loanStatus", loanStatus);
  const res = await BackendClient.post(`${baseURL}/loan/type`, formData);
  return res;
}; 
export const _getImage = (id) => BackendClient.get(`${baseURL}/loan/${id}/image`);
export const _gatSingleLoanType = (id) => BackendClient.get(`${baseURL}/loan/listSingleLoanType/${id}`);
