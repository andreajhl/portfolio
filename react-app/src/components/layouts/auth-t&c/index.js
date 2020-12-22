import React, {Component} from 'react';
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

class AuthTCLayout extends Component {

    constructor(props){
        super(props);

        this.terms = this.terms.bind(this);
        this.policy = this.policy.bind(this);
    }

    terms() {
        history._pushRoute(PATHS.TERMS_PATH)
    }

    policy() {
        history._pushRoute(PATHS.POLICIES_PATH)
    }

    render() {
        return (
            <div className="AuthTCLayout">
                <div className="tp-0 mx-auto text-center">
                    <small>
                        Al continuar acepto de manera expresa e informada los
                        <b style={{textDecoration: "underline", cursor: "pointer"}} onClick={this.terms}>
                            &nbsp;Términos &amp; Condiciones
                        </b>
                        &nbsp;y la&nbsp;
                        <b style={{textDecoration: "underline", cursor: "pointer"}} onClick={this.policy}>
                            Política de Privacidad</b> de Famosos Inc.
                    </small>
                </div>
            </div>
        );
    };

}

export {AuthTCLayout};
