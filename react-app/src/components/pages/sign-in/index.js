import React, {Component} from 'react';
import "./styles.scss";
import {SignInWithCellphoneForm, SignInWithEmailForm, SignInWithWhatsAppForm} from "../../containers";
import {Session} from "../../../state/utils/session";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {PageContainer} from "../../layouts/page-container";
import * as GTM from "../../../state/utils/gtm";
import MetaTags from "react-meta-tags";


class SignInPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this.goToRoot = this.goToRoot.bind(this);
    }

    componentWillMount() {
        const session = new Session();
        session.checkSession();
    }

    componentDidMount() {
        GTM.tagManagerDataLayer(
            "SIGN_IN_PAGE_VIEW",
            this.props.match
        );
    }

    goToRoot() {
        history._pushRoute(PATHS.HOME_PATH)
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

                <MetaTags>
                    <title>Famosos.com - Iniciar Sesión</title>
                    <meta name="description" content="Inicia sesión en Famosos.com. Reserva tu video y disfruta de experiencias únicas."/>
                </MetaTags>

                <PageContainer applyFetchCelebrities={false} showFooter={false}>
                    <div className="SignInPage">
                        <div className="section">
                            <div className="auth-container">
                                <h3 className="font-weight-bold text-center">Inicia sesión</h3>
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

