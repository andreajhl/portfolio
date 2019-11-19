import React, {Component} from 'react';
import {HiringPreviewLayout, PageContainer} from "../../layouts";
import {connect} from "react-redux";
import "./styles.scss"
import {contractOperations} from "../../../state/ducks/contracts";

class HiringPreviewPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {}
        };
    }

    componentWillMount(): void {
        this.props.getClientContract(this.props.match.params.contract_reference)
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
                <div className="HiringPreviewPage">
                    <PageContainer fetchCelebrities={false} showFooter={false}>
                        <HiringPreviewLayout contract={this.props.contract}/>
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
const mapStateToProps = (state: any) => ({
    isLoading: state.contracts.getClientContractReducer.loading,
    contract: state.contracts.getClientContractReducer.data.contract
});

// mapStateToProps
const mapDispatchToProps = {
    getClientContract: contractOperations.getClientContract
};

// Export Class
const _HiringPreviewPage = connect(mapStateToProps, mapDispatchToProps)(HiringPreviewPage);
export {_HiringPreviewPage as HiringPreviewPage};
