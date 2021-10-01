import { ContractDataStarInput } from "desktop-app/components/common/form/contract-data-star-input";
import { FormattedMessage } from "react-intl";
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

type SelectorStarProps = {
  className?: string;
};

function SelectorStar({ className }: SelectorStarProps) {
  const { user } = useAuth();
  const totalContractPrice = useGetContractTotalPrice();
  const [starsSelected, setStarsSelected] = useDiscountStarsSelected();
  const [isOpen, setIsOpen] = useState(false);
  const shouldApplyFirstBuyDiscount =
    user && isReferralWithFirstBuyDiscount(user);
  const userStars = user?.stars || 0;
  const availableStars = shouldApplyFirstBuyDiscount
    ? userStars + REFERRAL_FIRST_BUY_STARS
    : userStars;

  function closeModal() {
    setIsOpen(false);
  }

  function isValidValue(newStarsSelected: number) {
    if (
      shouldApplyFirstBuyDiscount &&
      newStarsSelected < REFERRAL_FIRST_BUY_STARS
    ) {
      return;
    }
    const starsDifference = newStarsSelected - starsSelected;
    if (totalContractPrice - starsDifference < 0) return;
    if (newStarsSelected < 0) return;
    if (newStarsSelected > availableStars) return;
    return true;
  }

  function changeStarsSelected(inputValue: string) {
    const newStarsSelected = parseInt(inputValue, 10) ?? 0;
    if (!isValidValue(newStarsSelected)) return;
    setStarsSelected(newStarsSelected);
  }

  useEffect(() => {
    if (!shouldApplyFirstBuyDiscount) return;
    setStarsSelected(REFERRAL_FIRST_BUY_STARS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldApplyFirstBuyDiscount]);

  return (
    <div className={classes(styles.containerPriceStarBody, className)}>
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
          <button className={styles.btn_info} onClick={() => setIsOpen(true)}>
            <FormattedMessage defaultMessage="Mas info." />
          </button>
        </p>
      </div>
      <div className={styles.containerPriceStarBody_right}>
        <ContractDataStarInput
          placeHolderButton={<ReferralsStarIcon />}
          placeHolderInput=""
          inputName="starsSelected"
          inputValue={starsSelected}
          setInputValue={changeStarsSelected}
        />
      </div>
      <AnimatedPopup
        className={styles.pop}
        open={isOpen}
        onClose={closeModal}
        closeOnDocumentClick={false}
      >
        <ModalInfoStar closeModal={closeModal} />
      </AnimatedPopup>
    </div>
  );
}

export default SelectorStar;
