import React, {Component} from 'react';
import "./styles.scss";
import {FlagsSelect} from "../../layouts/flags-select";
import {celebrityRequestOperations} from "../../../state/ducks/celebrity-requests";
import {connect} from "react-redux";
import {history} from "../../../routing/History";

class CelebrityRequestForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                countryAlpha3Code: "COL",
                countryCellphoneCode: "+57",
                cellphoneNumber: "",
                fullName: "",
                subDomain: "",
                email: "",
                socialNetworkName: "",
                socialNetworkUsername: "",
                referral: new URLSearchParams(history.location.search).get("r") || "",
            },
            errors: {
                fullNameError: false,
                subDomainError: false,
                emailError: false,
                cellphoneNumberError: false,
                socialNetworkNameError: false,
            }
        };

        this.handleInput = this.handleInput.bind(this);
        this.onSelectCountry = this.onSelectCountry.bind(this);
        this.saveCelebrityRequest = this.saveCelebrityRequest.bind(this);
        this.close = this.close.bind(this);
    }

    close() {
        window.location.reload()
    }

    onSelectCountry(country) {
        this.setState({
            countryCellphoneCode: "+" + country.callingCodes[0],
            countryAlpha3Code: country.alpha3Code
        })
    }

    handleInput(event) {
        const data = this.state.data;
        data[event.target.name] = event.target.value;
        this.setState({data})
    }

    isAValidForm() {
        return this.state.data.fullName && this.state.data.subDomain && this.state.data.email && this.state.data.cellphoneNumber && this.state.data.socialNetworkName
    }

    saveCelebrityRequest() {
        let fullNameError = false;
        let subDomainError = false;
        let emailError = false;
        let cellphoneNumberError = false;
        let socialNetworkNameError = false;

        if (!this.state.data.fullName) {
            fullNameError = true;
        }
        if (!this.state.data.subDomain) {
            subDomainError = true;
        }
        if (!this.state.data.email) {
            emailError = true;
        }
        if (!this.state.data.cellphoneNumber) {
            cellphoneNumberError = true;
        }
        if (!this.state.data.socialNetworkName) {
            socialNetworkNameError = true;
        }

        this.setState({
            errors: {
                fullNameError,
                subDomainError,
                emailError,
                cellphoneNumberError,
                socialNetworkNameError,
            }
        });
        if (this.isAValidForm()) {
            this.props.saveCelebrityRequest(this.state.data);
        }
    }

    renderForm() {
        return (
            <>
                <h4 className="font-weight-bold text-center mb-4">¡Aplica y Reserva tu Subdominio Ahora!</h4>
                <label className="">Nombre
                    <small className="text-danger ml-1">*</small>
                </label>
                <input
                    autoFocus={true}
                    type="text"
                    className={"form-control mb-3" + (this.state.errors.fullNameError ? " border-danger " : "")}
                    placeholder="Escribe tu nombre"
                    name="fullName"
                    onChange={this.handleInput}
                    value={this.state.data.fullName}
                />
                <label className="">Subdominio
                    <small className="text-danger ml-1">*</small>
                </label>
                <div className="form-horizontal">
                    <input
                        disabled={true}
                        className={"form-control mb-3"}
                        value="famosos.com/"
                        style={{flex: 1.2}}
                    />
                    <input
                        type="text"
                        className={"form-control mb-3" + (this.state.errors.subDomainError ? " border-danger " : "")}
                        placeholder="Escribe tu Subdominio Ej: /andresito"
                        name="subDomain"
                        onChange={this.handleInput}
                        value={this.state.data.subDomain}
                        style={{flex: 2}}
                    />
                </div>
                <label className="">Correo electrónico
                    <small className="text-danger ml-1">*</small>
                </label>
                <input
                    type="email"
                    className={"form-control mb-3" + (this.state.errors.emailError ? " border-danger " : "")}
                    placeholder="Escribe tu correo electrónico"
                    name="email"
                    onChange={this.handleInput}
                    value={this.state.data.email}
                />
                <label className="">Télefono de contacto</label>
                <div className="form-horizontal">
                    <FlagsSelect
                        onSelect={this.onSelectCountry}
                    />
                    <input
                        type="number"
                        className={"form-control mb-3" + (this.state.errors.cellphoneNumberError ? " border-danger " : "")}
                        placeholder="Escribe tu número"
                        name="cellphoneNumber"
                        onChange={this.handleInput}
                        value={this.state.data.cellphoneNumber}
                    />
                </div>
                <label className="">Red Social
                    <small className="text-danger ml-1">*</small>
                </label>
                <div className="form-horizontal">
                    <select
                        className={"form-control mb-3" + (this.state.errors.socialNetworkNameError ? " border-danger " : "")}
                        style={{flex: 1}}
                        name="socialNetworkName"
                        onChange={this.handleInput}
                        value={this.state.data.socialNetworkName}
                    >
                        <option>---</option>
                        <option>Instagram</option>
                        <option>Facebook</option>
                        <option>Twitter</option>
                        <option>Youtube</option>
                        <option>TikTok</option>
                        <option>Otra</option>
                    </select>
                    <input
                        type="text"
                        className={"form-control" + (this.state.errors.socialNetworkUsernameError ? " border-danger " : "")}
                        placeholder="¿Como te encontramos? Ej: andresito"
                        name="socialNetworkUsername"
                        onChange={this.handleInput}
                        value={this.state.data.socialNetworkUsername}
                        style={{flex: 2}}
                    />
                </div>
                {
                    this.state.data.referral &&
                    <>
                        <label className="mt-3">Código de referido</label>
                        <input
                            type="text"
                            className={"form-control" + this.state.errors.referralError ? " border-danger " : ""}
                            placeholder="Código de referido"
                            name="referral"
                            onChange={this.handleInput}
                            value={this.state.data.referral}
                        />
                    </>
                }
                {
                    this.props.saveCelebrityRequestError
                    &&
                    <div className="instructions mt-4 text-danger">
                        {this.props.saveCelebrityRequestError}
                    </div>
                }
                <button
                    className="send-button"
                    disabled={!this.state.data.cellphoneNumber}
                    onClick={this.saveCelebrityRequest}
                >
                    {
                        this.props.saveCelebrityRequestLoading
                            ?
                            <span className="text-white spinner-grow spinner-grow-sm"
                                  role="status"
                                  aria-hidden="true"
                            />
                            :
                            <span className={"text-white"}>Continuar</span>
                    }
                </button>
            </>
        )
    }

    renderCongratsOne() {
        return (
            <>
                <h4 className="font-weight-bold text-center mb-4">¡Tu solicitud ha sido enviada!</h4>
                <p className="mt-4">Nuestro equipo analizará tu solicitud y se pondra en contacto contigo muy
                    pronto.</p>
                <div className={"text-center"}>
                    <img src={"/assets/img/review.svg"} alt={"img"} width="300px"/>
                </div>
                <div className={"text-center mt-4"}>
                    <button className="btn btn-primary mt-4 mb-4" onClick={this.close}>Cerrar</button>
                </div>
            </>
        )
    }

    renderCongratsTwo() {
        return (
            <>
                <h4 className="font-weight-bold text-center mb-4">¡Tu solicitud ha sido enviada!</h4>
                <p className="mt-4">Nuestro equipo analizará tu solicitud y se pondrá en contacto contigo muy
                    pronto.</p>
                <p className="text-justify"><span className="font-weight-bold mr-2">Nota:</span> Si utilizas el link de
                    referido de uno uno de los Famosos registrados en la plataforma tendrás más oportunidades de ser
                    aprobado, este link es único por cuenta y está disponible en la sección de Mi Perfil de la
                    aplicación de los Famosos.</p>
                <div className={"text-center"}>
                    <img src={"/assets/img/review.svg"} alt={"img"} width="300px"/>
                </div>
                <div className={"text-center mt-4"}>
                    <button className="btn btn-primary mt-4 mb-4" onClick={this.close}>Cerrar</button>
                </div>
            </>
        )
    }

    renderContent() {
        if (!this.props.saveCelebrityRequestCompleted || this.props.saveCelebrityRequestError) {
            return this.renderForm()
        } else if (this.props.saveCelebrityRequestData.option === "REGISTERED_WITH_REFERRAL") {
            window.scroll({top: 0,});
            return this.renderCongratsOne()
        } else if (this.props.saveCelebrityRequestData.option === "REGISTERED_WITHOUT_REFERRAL") {
            window.scroll({top: 0,});
            return this.renderCongratsTwo()
        }
    }

    render() {
        return (
            <div className="CelebrityRequestForm">
                {this.renderContent()}
            </div>
        );
    };

}

// Set propTypes
CelebrityRequestForm.propTypes = {};

// Set defaultProps
CelebrityRequestForm.defaultProps = {
    signUp: false
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    saveCelebrityRequestLoading: state.celebrityRequests.saveCelebrityRequestReducer.loading,
    saveCelebrityRequestCompleted: state.celebrityRequests.saveCelebrityRequestReducer.completed,
    saveCelebrityRequestError: state.celebrityRequests.saveCelebrityRequestReducer.error_data.error,
    saveCelebrityRequestData: state.celebrityRequests.saveCelebrityRequestReducer.data,
});

// mapStateToProps
const mapDispatchToProps = {
    saveCelebrityRequest: celebrityRequestOperations.saveRequest,
};

// Export Class
const _CelebrityRequestForm = connect(mapStateToProps, mapDispatchToProps)(CelebrityRequestForm);
export {_CelebrityRequestForm as CelebrityRequestForm};
