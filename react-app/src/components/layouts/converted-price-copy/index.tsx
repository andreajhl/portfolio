import React from "react";
import { connect } from "react-redux";
import Maybe from "../../common/helpers/maybe";
import PriceLayout from "../../price-layout";
import { CopySpan } from "./styles";

const mapStateToProps = ({ payments }) => ({
  currencyExchangeData: payments.currencyExchangeReducer.data,
});

const ConvertedPriceCopy = ({
  currencyExchangeData,
  currency = "USD",
  price,
  showPrefix = false,
}) => (
  <Maybe it={currencyExchangeData.to !== currency}>
    <CopySpan>
      El valor en {currencyExchangeData.to} es aproximado
      <p className="mb-0">
        El cobro que se hará en dólares es:{" "}
        <span>
          <PriceLayout
            price={price}
            currencyData={{ to: currency }}
            showPrefix={showPrefix}
          />
        </span>
      </p>
    </CopySpan>
  </Maybe>
);

const _ConvertedPriceCopy = connect(mapStateToProps)(ConvertedPriceCopy);

export { _ConvertedPriceCopy as ConvertedPriceCopy };
