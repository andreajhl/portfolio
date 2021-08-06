import { withRouter } from "next/router";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

import { occasionsData } from "../../../constants/options";

const optionsForContractType = [
  "LOVE",
  "MAKE_SMILE",
  "HOPE",
  "ASK_FOR_FORGIVENESS",
];

class index extends Component {
  render() {
    const locale = this.props.router.locale;
    const optionsToRender = Object.keys(occasionsData[locale]).map(
      (optionKey) => {
        return this.props.contractType === 0 &&
          optionsForContractType.includes(optionKey) ? null : (
          <div
            className={`col option-container ${
              this.props.currentChoise === optionKey ? "choose" : ""
            }`}
            key={optionKey}
            onClick={() => this.props.clicked(optionKey)}
          >
            <div
              className={`container-circle ${
                this.props.currentChoise === optionKey ? "choose" : ""
              }`}
            >
              <i className={"fas " + occasionsData[locale][optionKey].icon}></i>
            </div>
            <span className="container-legend subtitle">
              {occasionsData[locale][optionKey].title}
            </span>
          </div>
        );
      }
    );

    return (
      <div style={{ marginBottom: "10px" }}>
        <h6 className="subtitle">
          <FormattedMessage defaultMessage="Selecciona una ocasión" />
        </h6>
        <div className="row row-cols-4">{optionsToRender}</div>
      </div>
    );
  }
}

export default withRouter(index);
