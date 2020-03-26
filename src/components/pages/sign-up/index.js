import React, {Component} from 'react';
import {SignInWithCellphoneForm, SignInWithWhatsAppForm, SignUpWithEmailForm} from "../../containers";
import {Session} from "../../../state/utils/session";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {PageContainer} from "../../layouts/page-container";


class SignUpPage extends Component {

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
        const search = history.location.search;
        const params = new URLSearchParams(search);
        if (this.props.match.params.form === "cellphone-form") {
            return <SignInWithCellphoneForm signUp={true}/>
        } else if (this.props.match.params.form === "email-form") {
            const email = params.get("email");
            return <SignUpWithEmailForm email={email}/>
        } else if (this.props.match.params.form === "whatsapp-form") {
            return <SignInWithWhatsAppForm signUp={true}/>
        } else {
            return <SignInWithCellphoneForm signUp={true}/>
        }
    }

    render() {
        return (
            <>
                <PageContainer applyFetchCelebrities={false} showFooter={false}>
                    <div className="SignInPage">
                        <div className="section">
                            <div className="auth-container">
                                <h3 className="font-weight-bold text-center">Regístrate</h3>
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

export {SignUpPage};

