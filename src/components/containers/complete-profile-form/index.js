import React, {Component} from 'react';
import "./styles.scss";
import {authenticationOperations} from "../../../state/ducks/authentication";
import {connect} from "react-redux";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import {Session} from "../../../state/utils/session";
import {history} from "../../../routing/History";
import {CelebritiesMultiselect} from "../../layouts/celebrities-multiselect"; // If using WebPack and style-loader.

class CompleteProfileForm extends Component {

    constructor(props) {
        super(props);

        this.session = new Session();

        this.state = {
            full_name: "",
            email: "",
            fav_celebrities: []
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.completeProfile = this.completeProfile.bind(this);

    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if(nextProps.session.client){
            this.setState({
                full_name: nextProps.session.client.full_name,
                email: nextProps.session.client.email,
            });
        }
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleChange(fav_celebrities) {
        this.setState({fav_celebrities})
    }

    completeProfile() {
        this.props.completeProfile(this.state)
    }

    hasEmail(){
        if(this.props.session.client) return this.props.session.client;
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
                    name="full_name"
                    onChange={this.handleInput}
                    value={this.state.full_name}
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
                    currentValue={this.state.fav_celebrities ? this.state.fav_celebrities : []}
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
                        disabled={this.state.isLoading || !this.state.email || !this.state.full_name}
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
