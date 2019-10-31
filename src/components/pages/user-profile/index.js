import React, {Component} from 'react';
import {PageContainer} from "../../layouts";
import {connect} from "react-redux";
import {UserProfileDetailsCardLayout} from "../../layouts/user-profile-details-card";
import "./styles.scss"
import {authenticationOperations} from "../../../state/ducks/authentication";

class UserProfilePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {}
        };

    }

    componentWillMount(): void {
        this.props.getSession()
    }

    componentDidMount(): void {
        document.getElementsByClassName("f-main-body")[0].style.background = "#f7f7f7"
    }

    render() {
        return (
            <>
                <div className="UserProfilePage">
                    <PageContainer fetchCelebrities={false}>
                        <UserProfileDetailsCardLayout session={this.props.session}/>
                    </PageContainer>
                </div>
            </>
        );
    };

}

// Set propTypes
UserProfilePage.propTypes = {};

// Set defaultProps
UserProfilePage.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    session: state.authentication.sessionReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
    getSession: authenticationOperations.getSession
};

// Export Class
const _UserProfilePage = connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
export {_UserProfilePage as UserProfilePage};
