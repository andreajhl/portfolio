import React, {Component} from "react";
import {Modal} from "react-bootstrap";

class FamososForBusinessModal extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.goToFFB = this.goToFFB.bind(this);
    }

    handleCloseModal() {
        this.props.onHide();
    }

    goToFFB() {
        this.props.onHide();
        window.open("https://business.famosos.com", '_blank');
    }

    render() {
        return (
            <div className="FamososForBusinessModal">
                <Modal
                    size="lg"
                    show={this.props.showModal}
                    onHide={this.handleCloseModal}
                >
                    <Modal.Body>
                        <div>
                            <div className="text-right">
                                <span style={{position: "relative", top: "-6px"}}>Cerrar </span>
                                <i className="fa fa-times fa-2x" onClick={this.handleCloseModal}/>
                            </div>
                            <div className={"text-center"}>
                                <img
                                    width="100%" style={{maxWidth: "450px"}}
                                    src={"/assets/img/famosos_licencia_pop-up.png"}
                                    alt={"ffb-modal"}
                                />
                                <br/>
                                <button className="btn btn-primary" onClick={this.handleCloseModal}>Cerrar</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default FamososForBusinessModal;
