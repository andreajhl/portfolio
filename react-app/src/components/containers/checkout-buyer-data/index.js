import React, { Component } from "react";
import "./styles.scss";
import "react-tagsinput/react-tagsinput.css";
import { Session } from "../../../state/utils/session";

class CheckoutBuyerData extends Component {
  constructor(props) {
    super(props);

    this.session = new Session();

    this.state = {
      buyerData: {
        full_name: this.session.getSession().full_name,
        email: "",
        document: this.session.getSession().document
      }
    };

    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount(): void {
    this.props.onBuyerDataChange(this.state.buyerData);
  }

  handleInput(event) {
    const buyerData = this.state.buyerData;
    buyerData[event.target.name] = event.target.value;
    this.setState(
      {
        buyerData
      },
      () => {
        this.props.onBuyerDataChange(this.state.buyerData);
      }
    );
  }

  render() {
    return (
      <div className="CheckoutBuyerData">
        <h6 className="title font-weight-bold">
          3. Datos del comprador.
          <small className="ml-1 text-danger">*</small>
        </h6>
        <div className="row">
          <div className="col-12 col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Escribe tu nombre"
              name="full_name"
              onChange={this.handleInput}
              value={this.state.buyerData.full_name || ""}
            />
          </div>
          <div className="col-12 col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Escribe tu correo electrónico"
              name="email"
              onChange={this.handleInput}
              value={this.state.buyerData.email || ""}
            />
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Escribe tu ID o Documento de Identidad"
              name="document"
              onChange={this.handleInput}
              value={this.state.buyerData.document || ""}
            />
          </div>
        </div>
      </div>
    );
  }
}

// Export Class
CheckoutBuyerData.defaultProps = {
  onBuyerDataChange: () => {}
};

export { CheckoutBuyerData };
