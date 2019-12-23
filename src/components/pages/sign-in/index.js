import React, {Component} from 'react';
import "./styles.scss";
import {SignInWithCellphoneForm, SignInWithEmailForm, SignInWithWhatsAppForm} from "../../containers";
import {Session} from "../../../state/utils/session";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {PageContainer} from "../../layouts/page-container";
import {HiringsCardSectionLayout} from "../../layouts/hirings-card-section";


class SignInPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };

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
            return <SignInWithCellphoneForm title={params.get("title") ? params.get("title") : "Ingresa con tu número de celular"}/>
        } else if (this.props.match.params.form === "email-form") {
            const email = params.get("email");
            return <SignInWithEmailForm email={email}/>
        } else if (this.props.match.params.form === "whatsapp-form") {
            return <SignInWithWhatsAppForm/>
        } else {
            return <SignInWithCellphoneForm title={params.get("title") ? params.get("title") : "Ingresa con tu número de celular"}/>
        }
    }

    render() {
        return (
            <>
                <PageContainer fetchCelebrities={false} showFooter={window.innerWidth >= 768}>
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

export {SignInPage};

