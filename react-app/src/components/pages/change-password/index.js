import React, {Component} from 'react';
import {ChangePasswordForm} from "../../containers/change-password-form";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";

class ChangePasswordPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginWithMail: false,
        };

        this.goToRoot = this.goToRoot.bind(this);
    }

    componentDidMount() {
        GTM.tagManagerDataLayer(
            "CHANGE_PASSWORD_PAGE_VIEW",
            {}
        );
    }

    goToRoot() {
        history._pushRoute(PATHS.ROOT_PATH)
    }

    render() {
        return (
            <>
                <div className="SignInPage">
                    <div className="section">
                        <div className="auth-container">
                            <div className="logo" onClick={this.goToRoot}>
                                <img src={"/assets/img/logo-color.png"} alt="famosos-logo"/>
                            </div>
                            <div className="custom-form">
                                <ChangePasswordForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

}

export {ChangePasswordPage};

