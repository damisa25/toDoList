import { computed, observable, action } from "mobx";
import { createContext } from "react";
import axios from "axios";
import { BehaviorSubject } from "rxjs";
import { createBrowserHistory } from "history";
import "mobx-react-lite/batchingForReactDom";
import { message } from 'antd'


const API_URL = "http://127.0.0.1:3333/api/auth/login";
const history = createBrowserHistory();

class Authentication {
    @observable currentUserSubject;

    constructor() {
        this.currentUserSubject = new BehaviorSubject(
            JSON.parse(sessionStorage.getItem("accessToken") as string)
        );
    }

    @computed get currentUserValue() {
        return this.currentUserSubject.value;
    }
    @action.bound async login(username: string) {
        try {
            const response = await axios.post(API_URL, { username: username });


            if (response.data.access_token) {
                sessionStorage.setItem(
                    "accessToken",
                    JSON.stringify(response.data.access_token)
                );
                sessionStorage.setItem(
                    "userId",
                    JSON.stringify(response.data.userId)
                );
                sessionStorage.setItem(
                    "username",
                    JSON.stringify(response.data.username)
                );

                this?.currentUserSubject.next(response.data.access_token);
                history.push("/");
                window.location.reload();
            }

            return response.data;
        } catch (error) {
            console.error(error);
            message.error('Login fail');

            return error;
        }
    }

    @action.bound logout() {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("username");
        this?.currentUserSubject.next(null)
    }

    @computed get userId() {
        const userId = sessionStorage.getItem("userId");
        // const userInfo = sessionStorage.getItem("userInfo");
        if (userId) {
            return JSON.parse(userId);
        } else {
            return {};
        }
    }
}

export default createContext(new Authentication());