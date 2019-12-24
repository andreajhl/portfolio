import React, {Component} from 'react';
import {ValidateCellphoneSecurityCodeForm, ValidateEmailSecurityCodeForm} from "../../containers";
import {Session} from "../../../state/utils/session";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {PageContainer} from "../../layouts/page-container";


class ValidateSecurityCodePage extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.goToRoot = this.goToRoot.bind(this);
    }

    componentWillMount(): void {
        const session = new Session();
        session.checkSession();
    }

    goToRoot() {
        history._pushRoute(PATHS.ROOT_PATH)
    }

    returnSpecificForm() {
        if (this.props.match.params.form === "cellphone-form") {
            return <ValidateCellphoneSecurityCodeForm/>
        } else if (this.props.match.params.form === "email-form") {
            return <ValidateEmailSecurityCodeForm/>
        } else if (this.props.match.params.form === "whatsapp-form") {
            // return <ValidateWhatsAppSecurityCodeForm/>
        } else {
            return <span>Invalid Form (Available Forms: cellphone-form, email-form, whatsapp-form)</span>
        }
    }

    render() {
        return (
            <>
                <PageContainer fetchCelebrities={false} showFooter={false}>
                    <div className="SignInPage">
                        <div className="section">
                            <div className="auth-container">
                                <div className="logo">
                                    <img src={"/assets/img/logo-color.png"} alt="famosos-logo"/>
                                </div>
                                <div className="custom-form">
                                    {this.returnSpecificForm()}
                                </div>
                            </div>
                        </div>
                    </div>
                </PageContainer>
            </>
        );
    };

}

export {ValidateSecurityCodePage};

