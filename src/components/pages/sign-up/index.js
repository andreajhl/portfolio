import React, {Component} from 'react';
import {SignInWithCellphoneForm, SignUpWithEmailForm} from "../../containers";
import {Session} from "../../../state/utils/session";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";


class SignUpPage extends Component {

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
        history.push(PATHS.ROOT_PATH)
    }

    render() {
        const search = history.location.search;
        const params = new URLSearchParams(search);
        const use_email = params.get("use_email");
        const email = params.get("email");
        return (
            <>
                <div className="SignInPage">
                    <div className="section">
                        <div className="auth-container">
                            <div className="logo" onClick={this.goToRoot}>
                                <img src={"/assets/img/logo-color.png"} alt="famosos-logo"/>
                            </div>
                            <div className="custom-form">
                                {
                                    !this.state.loginWithMail && (!use_email || !email)
                                        ?
                                        <SignInWithCellphoneForm
                                            onChangeSignInType={this.onChangeSignInType}
                                        />
                                        :
                                        <SignUpWithEmailForm
                                            email={email}
                                            onChangeSignInType={this.onChangeSignInType}
                                        />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

}

export {SignUpPage};

