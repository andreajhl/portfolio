import React, {Component} from 'react';
import {ValidateCellphoneSecurityCodeForm, ValidateEmailSecurityCodeForm} from "../../containers";
import {Session} from "../../../state/utils/session";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {PageContainer} from "../../layouts/page-container";
import * as GTM from "../../../state/utils/gtm";


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

    componentDidMount() {
        GTM.tagManagerDataLayer(
            "VALIDATE_SECURITY_CODE_PAGE_VIEW",
            this.props.match
        );
    }

    goToRoot() {
        history._pushRoute(PATHS.HOME_PATH)
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
                <PageContainer applyFetchCelebrities={false} showFooter={false}>
                    <div className="SignInPage">
                        <div className="section">
                            <div className="auth-container">
                                <h5 className="font-weight-bold text-center">Confirmación de código de seguridad</h5>
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

