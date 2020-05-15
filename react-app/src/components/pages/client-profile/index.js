import React, {Component} from 'react';
import {PageContainer} from "../../layouts";
import {connect} from "react-redux";
import {UserProfileDetailsCardLayout} from "../../layouts/user-profile-details-card";
import "./styles.scss"
import {sessionOperations} from "../../../state/ducks/session";

class ClientProfilePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {}
        };

    }

    componentWillMount(): void {
        this.props.getToken()
    }

    componentDidMount(): void {
        document.getElementsByClassName("f-main-body")[0].style.background = "#f7f7f7"
    }

    componentWillUnmount(): void {
        document.getElementsByClassName("f-main-body")[0].style.background = "#fff"
    }

    render() {
        return (
            <>
                <div className="ClientProfilePage">
                    <PageContainer applyFetchCelebrities={false}>
                        <UserProfileDetailsCardLayout session={this.props.session}/>
                    </PageContainer>
                </div>
            </>
        );
    };

}

// Set propTypes
ClientProfilePage.propTypes = {};

// Set defaultProps
ClientProfilePage.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    session: state.session.getSessionReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
    getToken: sessionOperations.getToken
};

// Export Class
const _UserProfilePage = connect(mapStateToProps, mapDispatchToProps)(ClientProfilePage);
export {_UserProfilePage as ClientProfilePage};
