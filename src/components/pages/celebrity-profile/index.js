import React, {Component} from 'react';
import {PageContainer} from "../../layouts";
import * as PropTypes from "prop-types";
import {CelebrityShape} from "../../../prop-types";
import {connect} from "react-redux";
import {celebrityOperations} from "../../../state/ducks/celebrities";
import {CelebrityDetailsSection} from "../../containers";


class CelebrityProfilePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {}
        };

        this.getCelebrity = this.getCelebrity.bind(this);
    }

    componentWillMount(): void {
        this.getCelebrity(this.props.match.params.celebrity_username);
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if(nextProps.match.params.celebrity_username !== this.props.match.params.celebrity_username){
            this.getCelebrity(nextProps.match.params.celebrity_username);
        }
    }

    getCelebrity(username) {
        this.props.getCelebrity(username)
    }

    render() {
        return (
            <>
                <PageContainer>
                    <CelebrityDetailsSection celebrity={this.props.celebrity}/>
                </PageContainer>
            </>
        );
    };

}

// Set propTypes
CelebrityProfilePage.propTypes = {
    celebrity: PropTypes.arrayOf(CelebrityShape).isRequired,
    getCelebrity: PropTypes.func.isRequired,
};

// Set defaultProps
CelebrityProfilePage.defaultProps = {
    celebrity: {
        category_data: {},
        user_data: {}
    },
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.celebrities.getCelebrityReducer.loading,
    celebrity: state.celebrities.getCelebrityReducer.data,
});

// mapStateToProps
const mapDispatchToProps = {
    getCelebrity: celebrityOperations.get
};

// Export Class
const _CelebrityProfilePage = connect(mapStateToProps, mapDispatchToProps)(CelebrityProfilePage);
export {_CelebrityProfilePage as CelebrityProfilePage};
