import {history} from "../../routing/History";
import * as PATHS from "../../routing/Paths";
import jwt_decode from "jwt-decode";

export class Session {
    constructor() {
        this.sessionName = "fs"; // simetrik session
        this.session = this.getSession();
    }

    setSession = (token) => {
        localStorage.setItem(this.sessionName, token);
    };

    applyRedirects() {
        this.session = this.getSession();
        history._pushRoute(PATHS.HOME_PATH);
    }

    getSession = () => {
        const token = localStorage.getItem(this.sessionName);
        return token ? this.jwtDecode(token) : null
    };

    jwtDecode(token) {
        try {
            if (token) {
                return jwt_decode(token)
            }
        } catch (e) {
            return null
        }
    }

    removeSession = () => {
        localStorage.removeItem(this.sessionName);
        history._pushRoute(PATHS.ROOT_PATH);
        window.location.replace("/")
    };

    tokenExpired() {
        if (this.utcSecondsToDatetime(this.session.exp) <= new Date()) {
            this.removeSession();
            return true;
        }
        return false;
    }

    allowedActionFor = (groups=[]) => {
        let is_authorized = false;
        groups.forEach(g => {
            if (this.getSession().groups.includes(g)) {
                is_authorized = true;
            }
        });
        return is_authorized
    };

    checkSession = () => {
        try {
            let logged = "no";
            if (this.getSession()) {
                logged = "si";
                if (this.getSession().client_status > 0) {

                    const session = this.getSession();
                    if (session) {
                        if (this.utcSecondsToDatetime(session.exp) >= new Date()) {
                            history._pushRoute(PATHS.ROOT_PATH);
                        } else {
                            this.removeSession();
                        }
                    }


                }
            }
        }catch (e) {
            history._pushRoute(PATHS.ROOT_PATH);
        }
    };

    utcSecondsToDatetime = (utcSeconds) => {
        if (utcSeconds) {
            const date = new Date(0); // The 0 there is the key, which sets the date to the epoch
            date.setUTCSeconds(utcSeconds);
            return date
        } else {
            return null
        }
    };
}
