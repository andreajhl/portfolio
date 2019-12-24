import React, {Component} from 'react';
import "./styles.scss";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {CompleteProfileForm} from "../../containers/complete-profile-form";
import {sessionOperations} from "../../../state/ducks/session";
import {connect} from "react-redux";
import {PageContainer} from "../../layouts/page-container";


class CompleteProfilePage extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.goToRoot = this.goToRoot.bind(this);

    }

    componentWillMount(): void {
        this.props.getToken()
    }

    goToRoot() {
        history._pushRoute(PATHS.ROOT_PATH)
    }

    render() {
        return (
            <>
                <PageContainer fetchCelebrities={false} showFooter={false}>
                    <div className="SignInPage">
                        <div className="section">
                            <div className="auth-container">
                                <div className="logo">
                                    <img src={"/assets/img/logo-color.png"} alt="famosos-logo"/>
                                </div>
                                <div className="custom-form">
                                    <CompleteProfileForm session={this.props.session}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </PageContainer>
            </>
        );
    };

}


// Set propTypes
CompleteProfilePage.propTypes = {};

// Set defaultProps
CompleteProfilePage.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    session: state.session.getSessionReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
    getToken: sessionOperations.getToken
};

// Export Class
const _CompleteProfilePage = connect(mapStateToProps, mapDispatchToProps)(CompleteProfilePage);
export {_CompleteProfilePage as CompleteProfilePage};


