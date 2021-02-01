import { history } from "../../routing/History";
import * as PATHS from "../../routing/Paths";
import jwt_decode from "jwt-decode";
import { Mixpanel } from "./mixPanel";

export class Session {
  constructor() {
    this.sessionName = "_fs_";
    this.visitKey = "_visit_";
    this.session = this.getSession();
  }

  setSession = (token) => {
    localStorage.setItem(this.sessionName, token);
    const decoded = this.jwtDecode(token);
    Mixpanel.identify(decoded.id);
    Mixpanel.people.set({
      USER_ID: decoded.id,
      $email: decoded.email,
      status: decoded.status,
      exp: decoded.exp
    });
  };

  applyRedirects() {
    this.session = this.getSession();
    history._pushRoute(PATHS.ROOT_PATH);
  }

  getSession = () => {
    const token = localStorage.getItem(this.sessionName);
    return token ? this.jwtDecode(token) : null;
  };

  jwtDecode(token) {
    try {
      if (token) {
        return jwt_decode(token);
      }
    } catch (e) {
      return null;
    }
  }

  removeSession = () => {
    localStorage.removeItem(this.sessionName);
    history._pushRoute(PATHS.ROOT_PATH);
  };

  tokenExpired() {
    if (this.session) {
      if (this.utcSecondsToDatetime(this.session.exp) <= new Date()) {
        this.removeSession();
        return true;
      }
    }
    return false;
  }

  allowedActionFor = (groups = []) => {
    let is_authorized = false;
    groups.forEach((g) => {
      if (this.getSession().groups.includes(g)) {
        is_authorized = true;
      }
    });
    return is_authorized;
  };

  checkSession = () => {
    try {
      let logged = "no";
      if (this.getSession()) {
        logged = "si";
        if (this.getSession().status > 0) {
          const session = this.getSession();
          if (session) {
            if (this.utcSecondsToDatetime(session.exp) >= new Date()) {
              history._pushRoute(PATHS.HOME_PATH);
            } else {
              this.removeSession();
            }
          }
        }
      }
    } catch (e) {
      history._pushRoute(PATHS.HOME_PATH);
    }
  };

  utcSecondsToDatetime = (utcSeconds) => {
    if (utcSeconds) {
      const date = new Date(0); // The 0 there is the key, which sets the date to the epoch
      date.setUTCSeconds(utcSeconds);
      return date;
    } else {
      return null;
    }
  };

  // isFirstVisit() {
  //   const isFirstVisit = localStorage.getItem(this.visitKey);
  //   if (isFirstVisit == null) {
  //     localStorage.setItem(this.visitKey, "true");
  //     return true;
  //   }
  //   return false;
  // }

  isDummy = () => {
    try {
      if (this.getSession()) {
        const email = this.getSession().email;
        if (
          this.getSession().status === 0 &&
          (email?.includes("myemail@") ||
            (email?.includes("@famosos.com") && "Anonymous"))
        ) {
          localStorage.removeItem(this.sessionName);
          return true;
        } else {
          return false;
        }
      }
      return true;
    } catch (e) {
      localStorage.removeItem(this.sessionName);
      return true;
    }
  };

  hasEmail() {
    const session = new Session();
    if (session.getSession()) {
      const email = session.getSession().email;
      if (email === null) {
        return false;
      } else {
        return email !== "" && email !== null && !email?.includes("myemail@");
      }
    }
    return false;
  }
}
