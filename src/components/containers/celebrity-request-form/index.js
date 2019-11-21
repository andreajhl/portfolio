import React, {Component} from 'react';
import "./styles.scss";
import {FlagsSelect} from "../../layouts/flags-select";
import {celebrityRequestOperations} from "../../../state/ducks/celebrity-requests";
import {connect} from "react-redux";

class CelebrityRequestForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countryAlpha3Code: "COL",
            countryCellphoneCode: "+57",
            cellphoneNumber: "",
            fullName: "",
            subDomain: "",
            email: "",
            socialNetworkName: "",
            socialNetworkUsername: "",
            referralCode: "",
        };

        this.handleInput = this.handleInput.bind(this);
        this.onSelectCountry = this.onSelectCountry.bind(this);
        this.saveCelebrityRequest = this.saveCelebrityRequest.bind(this);
    }

    onSelectCountry(country) {
        this.setState({
            countryCellphoneCode: "+" + country.callingCodes[0],
            countryAlpha3Code: country.alpha3Code
        })
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    saveCelebrityRequest() {
        this.props.saveCelebrityRequest(this.state);
    }

    render() {
        return (
            <div className="CelebrityRequestForm">
                <h4 className="font-weight-bold text-center mb-4">¡Aplica y Reserva tu Subdominio Ahora!</h4>
                <label className="">Nombre
                    <small className="text-danger ml-1">*</small>
                </label>
                <input
                    autoFocus={true}
                    type="text"
                    className="form-control mb-3"
                    placeholder="Escribe tu nombre"
                    name="fullName"
                    onChange={this.handleInput}
                    value={this.state.fullName}
                />
                <label className="">Subdominio
                    <small className="text-danger ml-1">*</small>
                </label>
                <div className="form-horizontal">
                    <input
                        disabled={true}
                        className="form-control mb-3"
                        value="famosos.com/"
                        style={{flex: 1.2}}
                    />
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Escribe tu Subdominio Ej: /andresito"
                        name="subDomain"
                        onChange={this.handleInput}
                        value={this.state.subDomain}
                        style={{flex: 2}}
                    />
                </div>
                <label className="">Correo electrónico
                    <small className="text-danger ml-1">*</small>
                </label>
                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Escribe tu correo electrónico"
                    name="email"
                    onChange={this.handleInput}
                    value={this.state.email}
                />
                <label className="">Télefono de contacto</label>
                <div className="form-horizontal">
                    <FlagsSelect
                        onSelect={this.onSelectCountry}
                    />
                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Escribe tu número"
                        name="cellphoneNumber"
                        onChange={this.handleInput}
                        value={this.state.cellphoneNumber}
                    />
                </div>
                <label className="">Red Social
                    <small className="text-danger ml-1">*</small>
                </label>
                <div className="form-horizontal">
                    <select
                        className="form-control mb-3"
                        style={{flex: 1}}
                        name="socialNetworkName"
                        onChange={this.handleInput}
                        value={this.state.socialNetworkName}
                    >
                        <option>Instagram</option>
                        <option>Facebook</option>
                        <option>Twitter</option>
                        <option>Youtube</option>
                        <option>TikTok</option>
                        <option>Otra</option>
                    </select>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="¿Como te encontramos? Ej: andresito"
                        name="socialNetworkUsername"
                        onChange={this.handleInput}
                        value={this.state.socialNetworkUsername}
                        style={{flex: 2}}
                    />
                </div>
                <label className="">Código de referido</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Código de referido"
                    name="referralCode"
                    onChange={this.handleInput}
                    value={this.state.referralCode}
                />

                {
                    this.props.saveCelebrityRequestError
                    &&
                    <div className="instructions mt-4 text-danger">
                        {this.props.saveCelebrityRequestError}
                    </div>
                }
                <button
                    className="send-button"
                    disabled={!this.state.cellphoneNumber}
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
