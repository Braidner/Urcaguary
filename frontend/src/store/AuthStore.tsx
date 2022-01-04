import {computed, makeAutoObservable} from "mobx";
import axios from "axios";
import notification from "antd/es/notification";


class AuthStore {

    currentUser: any = null;
    loading: boolean = true;

    constructor() {
        makeAutoObservable(this)
    }

    @computed get isAuth(): boolean {
        return !!this.currentUser
    }

    fetchCurrentUser = async () => {
        try {
            this.loading = true;
            let result = await axios.get("api/security/user")
            this.currentUser = result.data;
        } catch (e) {
        } finally {
            this.loading = false;
        }
    }

    login = async () => {

    }
}

export const authStore: AuthStore = new AuthStore()

axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    if (error.response.status === 403) {
        authStore.currentUser = null;
    } else if (error.response.status === 401) {
        notification.error({message: "Неправильный логин или пароль"})
        authStore.currentUser = null;
    } else {
        let message = error.response.data.message;
        notification.error({message})
    }
    return Promise.reject(error);
});

