import React, {Component} from 'react';
import {HiringPreviewLayout, PageContainer} from "../../layouts";
import {connect} from "react-redux";
import "./styles.scss"
import {contractOperations} from "../../../state/ducks/contracts";
import * as GTM from "../../../state/utils/gtm";
import MetaTags from "react-meta-tags";

class HiringPreviewPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {}
        };
    }

    componentWillMount() {
        this.props.getContract(this.props.match.params.contract_reference)
    }

    componentDidMount() {
        document.getElementsByClassName("f-main-body")[0].style.background = "#f7f7f7"
        GTM.tagManagerDataLayer(
            "HIRING_PREVIEW_PAGE_VIEW",
            this.props.match
        );
    }

    componentWillUnmount() {
        document.getElementsByClassName("f-main-body")[0].style.background = "#fff"
    }

    render() {
        return (
            <>
                <div className="HiringPreviewPage">
                    <PageContainer applyFetchCelebrities={false} showFooter={this.props.isCompleted}>
                        {
                            this.props.contract.reference
                                ?
                                <HiringPreviewLayout contract={this.props.contract}/>
                                : null
                        }
                    </PageContainer>
                </div>
            </>
        );
    };

}

// Set propTypes
HiringPreviewPage.propTypes = {};

// Set defaultProps
HiringPreviewPage.defaultProps = {
    contract: {}
};

// mapStateToProps
const mapStateToProps = (state) => ({
    isLoading: state.contracts.getContractReducer.loading,
    contract: state.contracts.getContractReducer.data,
    isCompleted: state.contracts.getContractReducer.completed
});

// mapStateToProps
const mapDispatchToProps = {
    getContract: contractOperations.getContract
};

// Export Class
const _HiringPreviewPage = connect(mapStateToProps, mapDispatchToProps)(HiringPreviewPage);
export {_HiringPreviewPage as HiringPreviewPage};
