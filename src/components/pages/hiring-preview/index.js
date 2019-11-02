import React, {Component} from 'react';
import {PageContainer} from "../../layouts";
import {connect} from "react-redux";
import {HiringsCardSection} from "../../layouts";
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
        this.props.fetchMyContracts()
    }

    componentDidMount(): void {
        document.getElementsByClassName("f-main-body")[0].style.background = "#f7f7f7"
    }

    render() {
        return (
            <>
                <div className="HiringPreviewPage">
                    <PageContainer fetchCelebrities={false}>
                        <HiringsCardSection contracts={this.props.contracts}/>
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
    isLoading: state.contracts.fetchMyContractsReducer.loading,
    contracts: state.contracts.fetchMyContractsReducer.data.contracts
});

// mapStateToProps
const mapDispatchToProps = {
    fetchMyContracts: contractOperations.listMyContracts
};

// Export Class
const _HiringPreviewPage = connect(mapStateToProps, mapDispatchToProps)(HiringPreviewPage);
export {_HiringPreviewPage as HiringPreviewPage};
