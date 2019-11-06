import React, {Component} from 'react';
import "./styles.scss";
import {Session} from "../../../state/utils/session";
import {ResetPasswordForm} from "../../containers";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

class ResetPasswordPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginWithMail: false,
        };

        this.onChangeSignInType = this.onChangeSignInType.bind(this);
        this.goToRoot = this.goToRoot.bind(this);
    }

    componentWillMount(): void {
        const session = new Session();
        session.checkSession();
    }

    onChangeSignInType(type) {
        switch (type) {
            case "email":
                this.setState({loginWithMail: true});
                break;
            case "cellphone":
            default:
                this.setState({loginWithMail: false});
                break;
        }
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
                                <ResetPasswordForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

}

export {ResetPasswordPage};

