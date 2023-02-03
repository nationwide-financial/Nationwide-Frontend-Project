import axios from 'axios'
import {getCookie} from '../utils/utils'

class BackendClient {
    
    createInstance = (excludeAccessToken) => {
        const instance = axios.create({
            timeout: 2000
        });

        if (excludeAccessToken) { delete instance.defaults.headers.authorization }
        return instance
    };

    getRequestHeader = excludeAccessToken => {
        console.log(getCookie('token'));
        axios.defaults.withCredentials = true;
        let header = {
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*',
            // 'Authorization': excludeAccessToken ? '' : getCookie('token')
        };
        if (excludeAccessToken) { delete header.authorization }
        return header
    };

    enableRequestInterceptors = excludeAccessToken => {
        axios.interceptors.request.use(
            request => {
                request.headers = this.getRequestHeader(excludeAccessToken);
                return request
            },
            error => {
                console.log('enableRequestInterceptors ', error);
                Promise.reject(error)
            })
    };

    get = (path, excludeAccessToken = false) => {
        let instance = excludeAccessToken ? this.createInstance(excludeAccessToken) : axios;
        this.enableRequestInterceptors();

        return instance.get(path, { headers: this.getRequestHeader(excludeAccessToken) })
            .then(response => (response))
            .catch((error) => error)
    };

    delete = path => {
        this.enableRequestInterceptors();
        return axios.delete(path, { headers: this.getRequestHeader(false) })
            .then(response => (response))
            .catch((error) => error)
    };

    put = (path, data, stringify = false ) => {
        this.enableRequestInterceptors();
        return axios.put(path, stringify ? JSON.stringify(data) : data, { headers: this.getRequestHeader(false) })
            .then(response => response)
            .catch((error) => error )
    };

    post = (path, body, isUploadRequest = false, fileName="file") => {
        this.enableRequestInterceptors();

        if (isUploadRequest) {
            const formData = new FormData();
            //formData.append(fileName, body[fileName]);
            formData.append(body);
            axios.defaults.withCredentials = true;
            return axios.post(path, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': '*/*',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(data => data)
            .catch(error => error)
        } else {
            return axios.post(path, body, { headers: this.getRequestHeader(false) })
                .then(response => response)
                .catch((error) =>  error)
        }
    };
}

export default new BackendClient();