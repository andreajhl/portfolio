import ClientContractType from "desktop-app/types/clientContract";
import { ContractReviewVideo } from "../../../client-hiring/contract-review-video-for-other-card";
import { CommentContractSection } from "desktop-app/components/client-hiring/comment-contract-section";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { useState } from "react";

function HiringReviewSection({
  contractData,
  asContractOwner = false,
  previewMode = false,
}: {
  contractData: ClientContractType;
  asContractOwner?: boolean;
  previewMode?: boolean;
}) {
  const [showReview, setShowReview] = useState(true);
  return (
    <Maybe
      it={asContractOwner && contractData.review === "" && showReview}
      orElse={
        <div>
          <CommentContractSection
            previewMode={previewMode}
            contract_reference={contractData.reference}
          />
        </div>
      }
    >
      <ContractReviewVideo
        onDismissReview={() => setShowReview(false)}
        contract_reference={contractData.reference}
      />
    </Maybe>
  );
}

export { HiringReviewSection };
