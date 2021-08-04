import React from "react";
import { FormattedMessage } from "react-intl";
import * as SC from "./styles";
type AdWarrantyVideoPurchaseProps = {
  celebrityFullName: string;
};
const AdWarrantyVideoPurchase = ({
  celebrityFullName,
}: AdWarrantyVideoPurchaseProps) => {
  return (
    <SC.AdWarrantyVideoPurchaseWrapper>
      <SC.AdWarrantyHeader>
        <SC.AdWarrantyImg
          height={"29px"}
          width={"24px"}
          src={"/assets/img/shield-icon.png"}
        ></SC.AdWarrantyImg>
        <SC.AdWarrantyTitle>
          <FormattedMessage defaultMessage="Garantía Famosos" />
        </SC.AdWarrantyTitle>
      </SC.AdWarrantyHeader>
      <SC.InfoSection>
        <SC.InfoDescription>
          <FormattedMessage
            defaultMessage="Video grabado por {celebrityFullName} 100% personalizado."
            values={{
              celebrityFullName: celebrityFullName,
            }}
          />
        </SC.InfoDescription>

        <SC.VLine></SC.VLine>
        <SC.InfoDescription>
          <FormattedMessage defaultMessage="Si no recibes tu video en 7 días te reembolsamos el 100% de tu dinero." />
          <i className="fas fa-info-circle"></i>
        </SC.InfoDescription>
      </SC.InfoSection>
    </SC.AdWarrantyVideoPurchaseWrapper>
  );
};

export default AdWarrantyVideoPurchase;
