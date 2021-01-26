import React, {Component} from 'react';
import "./styles.scss";
import {Modal} from "react-bootstrap";
import {Mixpanel} from "../../../state/utils/mixPanel";
import {newsletterSubscrition} from "../../../state/ducks/authentication/actions";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {Session} from "../../../state/utils/session";

class NewsLetterModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            showModal: false,
        };
    }

    handleCloseModal = () => {
        localStorage.setItem("show-newsletter-modal", "false");
        this.setState({
            ...this.state,
            showModal: false
        })
    };

    handleInput = (e) => {
        this.setState({
            ...this.state,
            email: e.target.value
        })
    };

    componentDidMount = () => {
        const session = new Session();
        setTimeout(() => {
            if(!session.getSession()){
                this.setState({
                    ...this.state,
                    showModal: localStorage.getItem("show-newsletter-modal") === null
                })
            }
        }, 10000);
    };

    saveData = async () => {
        if (this.state.email && this.state.email?.includes("@")) {
            Mixpanel.identify(this.state.email);
            Mixpanel.people.set({
                "NEWSLETTER": true,
                "$email": this.state.email,
            });
        }
        this.handleCloseModal();
        await newsletterSubscrition(this.state.email);
    };

    render() {
        return (
            <div className="NewsLetterModal">
                <Modal
                    size="md"
                    className={"border-radius"}
                    show={this.state.showModal}
                    onHide={this.handleCloseModal}
                    centered={true}
                >
                    <div className="NewsLetterModal-div-image mx-auto">
                        <div className="NewsLetterModal-close-div">
                            <i className="fa fa-times fa-2x" onClick={this.handleCloseModal}/>
                        </div>
                        <img width="100%" src={"/assets/img/banner-suscripcion-mail_low.png"}
                             alt={"ffb-modal"}/>
                    </div>
                    <div className="NewsLetterModal-body p-4">
                        <div className="text-center" style={{"width": "100%"}}>
                            <input className="form-control float-left" onChange={this.handleInput}
                                   placeholder="Tu correo electrónico" value={this.state.email}/>
                        </div>
                        <div className="pl-1">
                            <button className="btn btn-primary float-right" onClick={this.saveData}>Enviar</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    };

}

//defaultProps
NewsLetterModal.defaultProps = {
    contract: {}
};

export {NewsLetterModal};
