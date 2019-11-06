import React, {Component} from 'react';
import "./styles.scss";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {CompleteProfileForm} from "../../containers/complete-profile-form";


class CompleteProfilePage extends Component {

    constructor(props) {
        super(props);

        this.state = {};
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
                                <CompleteProfileForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

}

export {CompleteProfilePage};

