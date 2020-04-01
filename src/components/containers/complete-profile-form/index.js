import React, {Component} from 'react';
import "./styles.scss";
import {authenticationOperations} from "../../../state/ducks/authentication";
import {connect} from "react-redux";
import 'react-tagsinput/react-tagsinput.css'
import {Session} from "../../../state/utils/session";
import {history} from "../../../routing/History";
import {CelebritiesMultiselect} from "../../layouts/celebrities-multiselect"; // If using WebPack and style-loader.

class CompleteProfileForm extends Component {

    constructor(props) {
        super(props);

        this.session = new Session();

        this.state = {
            fullName: "",
            email: "",
            favCelebrities: []
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.completeProfile = this.completeProfile.bind(this);

    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (nextProps.session.userId) {
            this.setState({
                fullName: nextProps.session.fullName,
                email: nextProps.session.email,
            });
        }
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleChange(favCelebrities) {
        this.setState({favCelebrities})
    }

    completeProfile() {
        this.props.completeProfile(this.state)
    }

    hasEmail(){
        if (this.props.session) return this.props.session;
        return false
    }

    render() {
        const search = history.location.search;
        const params = new URLSearchParams(search);
        const email = params.get("email");
        return (
            <div className="CompleteProfileForm">
                <h6>¿Cuál es su nombre?</h6>
                <input
                    autoFocus={true}
                    type="text"
                    className="form-control mb-3"
                    placeholder="Escribe tu nombre"
                    name="fullName"
                    onChange={this.handleInput}
                    value={this.state.fullName}
                />
                {
                    this.hasEmail()
                        ?
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
                        : null
                }
                <h6>¿Cuáles son tus Famosos favoritos? (Opcional)</h6>
                <CelebritiesMultiselect
                    currentValue={this.state.favCelebrities ? this.state.favCelebrities : []}
                    onChange={this.handleChange}
                />
                {
                    this.props.completeProfileError
                        ?
                        <p className="instructions mt-4 text-danger">
                            {this.props.completeProfileError}
                        </p>
                        : null
                }
                <button className="send-button"
                        disabled={this.state.isLoading || !this.state.email || !this.state.fullName}
                        onClick={this.completeProfile}
                >
                    {
                        this.props.isLoading
                            ?
                            <span className="text-white spinner-grow spinner-grow-sm"
                                  role="status"
                                  aria-hidden="true"
                            />
                            :
                            <span className={"text-white"}>Guardar</span>

                    }
                </button>
            </div>
        );
    };

}

// Set propTypes
CompleteProfileForm.propTypes = {};

// Set defaultProps
CompleteProfileForm.defaultProps = {
    session: {}
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.authentication.completeProfileReducer.loading,
    completeProfileCompleted: state.authentication.completeProfileReducer.completed,
    completeProfileError: state.authentication.completeProfileReducer.error_data.error,
});

// mapStateToProps
const mapDispatchToProps = {
    completeProfile: authenticationOperations.completeProfile,
};

// Export Class
const _CompleteProfileForm = connect(mapStateToProps, mapDispatchToProps)(CompleteProfileForm);
export {_CompleteProfileForm as CompleteProfileForm};
