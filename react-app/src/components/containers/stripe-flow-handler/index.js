import React, {Component} from 'react';
import "./styles.scss"
import {retrieveUserCards} from "../../../state/ducks/payments/actions";
import StripeCardForm from "../stripe-card-form";
import StripeCustomerSources from "../stripe-customer-sources";

class StripeFlowHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoading: true,
            showCardForm: false,
            showCards: false,
            availableSources: []
        };
    }

    componentDidMount(): void {
        this.retrieveUserCards();
    }

    retrieveUserCards = () => {
        retrieveUserCards()
            .then(res => {
                console.log("res:", res);
                this.setState({
                    ...this.state,
                    showLoading: false,
                    showCardForm: !res["availableSources"].length,
                    showCards: !!res["availableSources"].length,
                    availableSources: res["availableSources"]
                })
            })
            .catch(err => {
                this.setState({
                    ...this.state,
                    showLoading: false,
                    showCardForm: true,
                    showCards: false,
                })
            })
    };

    renderLoading = () => {
        if (this.state.showLoading) {
            return (
                <div className={"text-center p-4"}>
                    <h6>Cargando...</h6>
                </div>
            );
        }
    };


    renderCardForm = () => {
        if (this.state.showCardForm) {
            return (
                <StripeCardForm
                    contractReference={this.props.contractReference}
                    contractPrice={this.props.contractPrice}
                />
            );
        }
    };

    renderCards = () => {
        if (this.state.showCards) {
            return (
                <StripeCustomerSources
                    contractReference={this.props.contractReference}
                    availableSources={this.state.availableSources}
                />
            );
        }
    };

    render() {
        return (
            <div className="StripeFlowHandler">
                {this.renderLoading()}
                {this.renderCardForm()}
                {this.renderCards()}
            </div>
        );
    };
}


// defaultProps
StripeFlowHandler.defaultProps = {
    contractReference: "",
    contractPrice: 0
};
export default StripeFlowHandler;
