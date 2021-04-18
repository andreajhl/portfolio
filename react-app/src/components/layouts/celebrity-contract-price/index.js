import React, { useMemo } from "react";
import { connect } from "react-redux";
import Maybe from "../../common/helpers/maybe";
import { ContractPriceLayout } from "../contract-price";

const getContractPrice = (contractTypes, currencyExchangeData) => {
  const videoMessageContract =
    contractTypes.find(({ contractType }) => contractType === 1) || {};

  const { discountPercentage = 0 } = videoMessageContract;

  let videoMessagePrice = 0;
  if (videoMessageContract) {
    videoMessagePrice = videoMessageContract.price;
  }
  if (currencyExchangeData.rate) {
    videoMessagePrice *= currencyExchangeData.rate;
  }
  return [videoMessagePrice, discountPercentage];
};

const CelebrityContractPrice = ({
  className,
  contractTypes,
  currencyExchangeData,
  oldPriceClassName = "",
  discountClassName = ""
}) => {
  const [price, discountPercentage] = useMemo(
    () => getContractPrice(contractTypes, currencyExchangeData),
    [contractTypes, currencyExchangeData]
  );

  const hasDiscount = discountPercentage > 0;

  const shouldRoundPrice = currencyExchangeData.to !== "USD";

  return (
    <div>
      <ContractPriceLayout
        classes={`text-black font-weight-bold ${
          hasDiscount ? oldPriceClassName : ""
        } ${className}`}
        price={price}
        currency={currencyExchangeData.to}
        rounding={shouldRoundPrice}
      />
      <Maybe it={hasDiscount}>
        <br className="d-md-none" />
        <ContractPriceLayout
          classes={`text-black font-weight-bold ${discountClassName}`}
          price={price - price * discountPercentage}
          currency={currencyExchangeData.to}
          rounding={shouldRoundPrice}
        />
      </Maybe>
    </div>
  );
};

CelebrityContractPrice.defaultProps = {
  className: "",
  contractTypes: [],
  currencyExchangeData: {
    rate: 1
  }
};

const mapStateToProps = ({ payments }) => ({
  currencyExchangeData: payments.currencyExchangeReducer.data
});

const _CelebrityContractPrice = connect(mapStateToProps)(
  CelebrityContractPrice
);

export { _CelebrityContractPrice as CelebrityContractPrice };
