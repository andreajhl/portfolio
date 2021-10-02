import { ContractDataStarInput } from "desktop-app/components/common/form/contract-data-star-input";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { AnimatedPopup } from "desktop-app/components/common/animated-popup";
import useDiscountStarsSelected from "lib/hooks/useDiscountStarsSelected";
import { useAuth } from "lib/famosos-auth";
import classes from "classnames";
import { ReferralsStarIcon } from "desktop-app/components/common/icons";
import ModalInfoStar from "desktop-app/components/layouts/modal-info-star";
import Maybe from "desktop-app/components/common/helpers/maybe";
import isReferralWithFirstBuyDiscount from "lib/utils/isReferralWithFirstBuyDiscount";
import { REFERRAL_FIRST_BUY_STARS } from "constants/referrals";
import useGetContractTotalPrice from "lib/hooks/useGetContractTotalPrice";
import { CollapsibleErrorMessage } from "desktop-app/components/common/widgets/collapsible-error-message";
import { starsInputErrorMessages } from "lib/messages/referrals";
import usePopupWithBackButton from "lib/hooks/usePopupWithBackButton";

const initialInputError = null;

type SelectorStarProps = {
  className?: string;
};

function SelectorStar({ className }: SelectorStarProps) {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(initialInputError);
  const { formatMessage } = useIntl();
  const { user } = useAuth();
  const totalContractPrice = useGetContractTotalPrice();
  const [starsSelected, setStarsSelected] = useDiscountStarsSelected();
  const [modalIsOpen, openModal, closeModal] = usePopupWithBackButton();
  const shouldApplyFirstBuyDiscount =
    user && isReferralWithFirstBuyDiscount(user);
  const userStars = user?.stars || 0;
  const availableStars = shouldApplyFirstBuyDiscount
    ? userStars + REFERRAL_FIRST_BUY_STARS
    : userStars;

  function cleanInputError() {
    setInputError(initialInputError);
  }

  function getInputErrorMessage(newStarsSelected: number) {
    if (
      shouldApplyFirstBuyDiscount &&
      newStarsSelected < REFERRAL_FIRST_BUY_STARS
    ) {
      return starsInputErrorMessages.referralDiscountRequired;
    }
    const starsDifference = newStarsSelected - starsSelected;
    if (totalContractPrice - starsDifference < 0) {
      return starsInputErrorMessages.starsExceeded;
    }
    if (newStarsSelected < 0) return starsInputErrorMessages.onlyPositives;
    if (newStarsSelected > availableStars) {
      return starsInputErrorMessages.notEnoughStars;
    }
  }

  function changeStarsSelected(inputValue: string) {
    cleanInputError();
    setInputValue(inputValue);
    const newStarsSelected = parseInt(inputValue, 10) ?? 0;
    const errorMessage = getInputErrorMessage(newStarsSelected);
    if (errorMessage) {
      return setInputError(formatMessage(errorMessage, { starsSelected }));
    }
    setInputValue(newStarsSelected?.toString?.());
    setStarsSelected(newStarsSelected);
  }

  useEffect(() => {
    if (!shouldApplyFirstBuyDiscount) return;
    setStarsSelected(REFERRAL_FIRST_BUY_STARS);
    setInputValue(REFERRAL_FIRST_BUY_STARS?.toString?.());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldApplyFirstBuyDiscount]);

  return (
    <div className={classes(styles.containerPriceStarBody, className)}>
      <div className={classes(styles.FieldContainer)}>
        <div className={styles.containerPriceStarBody_left}>
          <label>
            <Maybe
              it={shouldApplyFirstBuyDiscount}
              orElse={
                <FormattedMessage defaultMessage="Pagar con mis estrellas" />
              }
            >
              <FormattedMessage defaultMessage="Hemos aplicado tu descuento por ser referido" />
            </Maybe>
          </label>
          <p>
            <Maybe
              it={availableStars || shouldApplyFirstBuyDiscount}
              orElse={<FormattedMessage defaultMessage="No tienes estrellas" />}
            >
              <FormattedMessage
                defaultMessage="Tienes {stars} estrellas"
                values={{ stars: availableStars }}
              />
            </Maybe>
            <button className={styles.btn_info} onClick={openModal}>
              <FormattedMessage defaultMessage="Mas info." />
            </button>
          </p>
        </div>
        <div className={styles.containerPriceStarBody_right}>
          <ContractDataStarInput
            hasError={Boolean(inputError)}
            placeHolderButton={<ReferralsStarIcon />}
            placeHolderInput="0"
            inputName="starsSelectedInput"
            inputValue={inputValue}
            setInputValue={changeStarsSelected}
          />
        </div>
      </div>
      <CollapsibleErrorMessage
        errorMessage={inputError}
        className={styles.StarsErrorMessage}
      />
      <AnimatedPopup
        className={styles.pop}
        open={modalIsOpen}
        onClose={closeModal}
        closeOnDocumentClick={false}
      >
        <ModalInfoStar closeModal={closeModal} />
      </AnimatedPopup>
    </div>
  );
}

export default SelectorStar;
