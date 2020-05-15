import React, {Component} from 'react';
import {CreatePasswordForm} from "../../containers/create-password-form";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

class CreatePasswordPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginWithMail: false,
        };

        this.goToRoot = this.goToRoot.bind(this);
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
                                <CreatePasswordForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

}

export {CreatePasswordPage};

