import React, { Component } from "react";

import {
  removeSource,
  retrieveUserCards
} from "../../../state/ducks/payments/actions";
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

  componentDidMount() {
    this.retrieveUserCards();
  }

  retrieveUserCards = () => {
    retrieveUserCards()
      .then((res) => {
        console.log("res:", res);
        this.setState({
          ...this.state,
          showLoading: false,
          showCardForm: !res["availableSources"].length,
          showCards: !!res["availableSources"].length,
          availableSources: res["availableSources"]
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          showLoading: false,
          showCardForm: true,
          showCards: false
        });
      });
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
          discountCouponId={this.props.discountCouponId}
        />
      );
    }
  };

  renderCards = () => {
    if (this.state.showCards) {
      return (
        <StripeCustomerSources
          onDeleteSource={this.onDeleteSource}
          contractReference={this.props.contractReference}
          availableSources={this.state.availableSources}
          discountCouponId={this.props.discountCouponId}
          contractPrice={this.props.contractPrice}
        />
      );
    }
  };

  onDeleteSource = async (index) => {
    const { availableSources } = this.state;
    await removeSource(availableSources[index].sourceId)
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
    availableSources.splice(index, 1);
    this.setState({
      ...this.state,
      showCardForm: !availableSources.length,
      showCards: !!availableSources.length,
      availableSources
    });
  };

  renderOptions = () => {
    if (this.state.availableSources.length && this.state.showCardForm) {
      return (
        <div className={"p-4 text-center"} onClick={this.changeContainer}>
          <h6>Seleccionar una tarjeta</h6>
        </div>
      );
    } else if (this.state.availableSources && !this.state.showCardForm) {
      return (
        <div className={"p-4 text-center"} onClick={this.changeContainer}>
          <h6>Agregar nueva tarjeta</h6>
        </div>
      );
    }
  };

  changeContainer = () => {
    this.setState({
      ...this.state,
      showCardForm: !this.state.showCardForm,
      showCards: !this.state.showCards
    });
  };

  render() {
    return (
      <div className="StripeFlowHandler">
        {this.renderLoading()}
        {this.renderCardForm()}
        {this.renderCards()}
        {this.renderOptions()}
      </div>
    );
  }
}

// defaultProps
StripeFlowHandler.defaultProps = {
  contractReference: "",
  contractPrice: 0
};
export default StripeFlowHandler;
