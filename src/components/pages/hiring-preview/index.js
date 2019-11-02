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
        this.props.getContractPreview(this.props.match.params.hiring_reference)
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
                    <PageContainer fetchCelebrities={false}>
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
HiringPreviewPage.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.contracts.getContractPreviewReducer.loading,
    contract: state.contracts.getContractPreviewReducer.data.contract
});

// mapStateToProps
const mapDispatchToProps = {
    getContractPreview: contractOperations.getContractPreview
};

// Export Class
const _HiringPreviewPage = connect(mapStateToProps, mapDispatchToProps)(HiringPreviewPage);
export {_HiringPreviewPage as HiringPreviewPage};
