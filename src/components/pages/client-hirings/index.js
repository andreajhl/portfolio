import React, {Component} from 'react';
import {HiringsCardSectionLayout, PageContainer} from "../../layouts";
import {connect} from "react-redux";
import "./styles.scss"
import {contractOperations} from "../../../state/ducks/contracts";

class ClientHiringsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {}
        };

    }

    componentWillMount(): void {
        this.props.listClientContracts();
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
                <div className="ClientHiringsPage">
                    <PageContainer fetchCelebrities={false}>
                        <HiringsCardSectionLayout
                            isLoading={this.props.isLoading}
                            contracts={this.props.contracts}
                        />
                    </PageContainer>
                </div>
            </>
        );
    };

}

// Set propTypes
ClientHiringsPage.propTypes = {};

// Set defaultProps
ClientHiringsPage.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.contracts.listClientContractsReducer.loading,
    contracts: state.contracts.listClientContractsReducer.data.contracts
});

// mapStateToProps
const mapDispatchToProps = {
    listClientContracts: contractOperations.listClientContracts
};

// Export Class
const _ClientHiringsPage = connect(mapStateToProps, mapDispatchToProps)(ClientHiringsPage);
export {_ClientHiringsPage as ClientHiringsPage};
