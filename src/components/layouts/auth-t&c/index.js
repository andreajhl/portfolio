import React, {Component} from 'react';

class AuthTCLayout extends Component {

    constructor(props){
        super(props);

        this.openPage = this.openPage.bind(this);
    }

    openPage() {
        window.open("https://www.famosos.com/politicas", '_blank');
    }

    render() {
        return (
            <div className="AuthTCLayout">
                <div className="terms custom-control custom-checkbox p-0">
                    <small>
                        Al continuar acepto de manera expresa e informada los
                        <b style={{textDecoration: "underline", cursor: "pointer"}} onClick={this.openPage}>
                            &nbsp;Términos &amp; Condiciones
                        </b>
                        &nbsp;y la&nbsp;
                        <b style={{textDecoration: "underline", cursor: "pointer"}} onClick={this.openPage}>
                            Política de Privacidad</b> de Famosos Inc.
                    </small>
                </div>
            </div>
        );
    };

}

export {AuthTCLayout};
