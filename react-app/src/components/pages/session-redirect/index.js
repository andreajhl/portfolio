import React, {Component} from "react";
import {LoadingOverlay} from "../../layouts";
import {history} from "../../../routing/History";
import * as ROUTING_PATHS from "../../../routing/Paths";
import {Session} from "../../../state/utils/session";

class SessionRedirectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <LoadingOverlay/>
            </>
        );
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        this.checkToken(query.get('s'), query.get('r'));
    }

    checkToken(token, url) {
        if (token) {
            this.setState({
                ...this.state,
                session: new Session()
            }, () => {
                if(!this.state.session.tokenExpired()){
                    this.redirectTo(url);
                }
                this.state.session.setSession(token);
                let isValid = !this.state.session.tokenExpired()
                if (isValid) {
                    this.redirectTo(url);
                } else {
                    this.redirectToHome();
                }
            });
        } else {
            this.redirectToHome();
        }
    }

    redirectTo(url) {
        if (url) {
            history._pushRoute(url)
        }
    }

    redirectToHome() {
        history._pushRoute(ROUTING_PATHS.HOME_PATH);
    }
}

export {SessionRedirectPage};
