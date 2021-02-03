import React, { Component } from "react";
import "./styles.scss";
import { authenticationOperations } from "../../../state/ducks/authentication";
import { connect } from "react-redux";
import "react-tagsinput/react-tagsinput.css";
import { Session } from "../../../state/utils/session";
import { history } from "../../../routing/History";
import { CelebritiesMultiselect } from "../../layouts/celebrities-multiselect"; // If using WebPack and style-loader.
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";

class CompleteProfileForm extends Component {
  constructor(props) {
    super(props);
    this.session = new Session();
    this.state = {
      fullName: "",
      email: this.session.hasEmail() ? this.session.getSession().email : "",
      favCelebrities: [],
      dialCode: "",
      cellphoneNumber: "",
      _phone: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.completeProfile = this.completeProfile.bind(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.session.userId) {
      // this.setState({
      //     fullName: nextProps.session.fullName,
      //     email: nextProps.session.email?.includes("myemail@") ? "" : nextProps.session.email,
      // });
    }
  }

  handleInput(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleChange(favCelebrities) {
    this.setState({
      ...this.state,
      favCelebrities
    });
  }

  completeProfile() {
    this.props.completeProfile(this.state);
  }

  onCellphoneChange = (dialCode, cellphoneNumber) => {
    this.setState({
      ...this.state,
      dialCode: "+" + dialCode,
      cellphoneNumber: cellphoneNumber
    });
  };

  render() {
    const search = history.location.search;
    const params = new URLSearchParams(search);
    const email = params.get("email");
    return (
      <div className="CompleteProfileForm">
        <h6>¿Cuál es su nombre?</h6>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Escribe tu nombre"
          name="fullName"
          onChange={this.handleInput}
          value={this.state.fullName}
        />
        {!this.session.hasEmail() ? (
          <>
            <h6>¿Cuál es su correo?</h6>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Escribe tu correo"
              name="email"
              onChange={this.handleInput}
              value={this.state.email}
            />
          </>
        ) : (
          <>
            <h6>¿Cuál es su número de celular?</h6>
            <PhoneInput
              enableSearch={true}
              country={"us"}
              value={this.state._phone}
              className="form-control mb-3"
              onChange={(phone, val) => {
                this.onCellphoneChange(
                  val["dialCode"],
                  phone.substring(val["dialCode"].length, phone.length)
                );
              }}
            />
            <div className={"mb-3"} />
          </>
        )}
        <h6>¿Cuáles son tus Famosos favoritos? (Opcional)</h6>
        <CelebritiesMultiselect
          currentValue={
            this.state.favCelebrities ? this.state.favCelebrities : []
          }
          className="form-control mb-3"
          onChange={this.handleChange}
        />
        {this.props.completeProfileError ? (
          <p className="instructions mt-4 text-danger">
            {this.props.completeProfileError}
          </p>
        ) : null}
        <button
          className="send-button"
          disabled={
            this.state.isLoading || !this.state.email || !this.state.fullName
          }
          onClick={this.completeProfile}
        >
          {this.props.isLoading ? (
            <span
              className="text-white spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <span className={"text-white"}>Guardar</span>
          )}
        </button>
      </div>
    );
  }
}

// Set propTypes
CompleteProfileForm.propTypes = {};

// Set defaultProps
CompleteProfileForm.defaultProps = {
  session: {}
};

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.authentication.completeProfileReducer.loading,
  completeProfileCompleted:
    state.authentication.completeProfileReducer.completed,
  completeProfileError:
    state.authentication.completeProfileReducer.error_data.error
});

// mapStateToProps
const mapDispatchToProps = {
  completeProfile: authenticationOperations.completeProfile
};

// Export Class
const _CompleteProfileForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompleteProfileForm);
export { _CompleteProfileForm as CompleteProfileForm };
