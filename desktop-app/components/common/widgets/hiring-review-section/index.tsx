import ClientContractType from "desktop-app/types/clientContract";
import { ContractReviewVideo } from "../../../client-hiring/contract-review-video-for-other-card";
import { CommentContractSection } from "desktop-app/components/client-hiring/comment-contract-section";
import Maybe from "desktop-app/components/common/helpers/maybe";

function HiringReviewSection({
  contractData,
  asContractOwner = false,
  previewMode = false,
}: {
  contractData: ClientContractType;
  asContractOwner?: boolean;
  previewMode?: boolean;
}) {
  return (
    <Maybe
      it={asContractOwner && contractData.review === ""}
      orElse={
        <div>
          <CommentContractSection
            previewMode={previewMode}
            contract_reference={contractData.reference}
          />
        </div>
      }
    >
      <ContractReviewVideo contract_reference={contractData.reference} />
    </Maybe>
  );
}

export { HiringReviewSection };
