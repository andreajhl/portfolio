import React from "react";
import * as SC from "./styles";
type AdWarrantyVideoPurchaseProps = {
  celebrityFullName: string;
};
const AdWarrantyVideoPurchase = ({
  celebrityFullName
}: AdWarrantyVideoPurchaseProps) => {
  return (
    <SC.AdWarrantyVideoPurchaseWrapper>
      <SC.AdWarrantyHeader>
        <SC.AdWarrantyImg></SC.AdWarrantyImg>
        <SC.AdWarrantyTitle>Garantía Famosos</SC.AdWarrantyTitle>
      </SC.AdWarrantyHeader>
      <SC.InfoSection>
        <SC.InfoDescription></SC.InfoDescription>
        <hr></hr>
        <SC.InfoDescription></SC.InfoDescription>
      </SC.InfoSection>
    </SC.AdWarrantyVideoPurchaseWrapper>
  );
};

export default AdWarrantyVideoPurchase;
