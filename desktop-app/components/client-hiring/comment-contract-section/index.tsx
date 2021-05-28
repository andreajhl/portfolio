import useForm from "lib/hooks/useForm";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { contractOperations } from "react-app/src/state/ducks/contracts";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import styles from "./styles.module.scss";
import { CommentCreator } from "../comment-creator";
import CommentsContractVideo from "../comments-contract-video";
import Maybe from "desktop-app/components/common/helpers/maybe";
// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.contracts.listContractCommentsReducer.loading,
  isCompleted: state.contracts.listContractCommentsReducer.completed,
  contractComments: state.contracts.listContractCommentsReducer.data.results,
  paginationData:
    state.contracts.listContractCommentsReducer.data.informationPage,
});

// mapStateToProps
const mapDispatchToProps = {
  listContractComments: contractOperations.listContractComments,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type CelebritySimilarVideosReelProps = {
  contract_reference: string;
  previewMode?: boolean;
} & StateProps &
  DispatchProps;

function CommentContractSection({
  contract_reference,
  listContractComments,
  paginationData,
  contractComments,
  isLoading,
  previewMode = false,
  isCompleted,
}: CelebritySimilarVideosReelProps) {
  useEffect(() => {
    listContractComments(contract_reference);
  }, [contract_reference]);

  return (
    <section className={styles.CommentContractWrapper}>
      <div className={styles.CommentContractHeader}>
        <h2>Comentarios</h2>
      </div>
      <Maybe it={!isLoading && isCompleted}>
        <CommentsContractVideo contractComments={contractComments} />
      </Maybe>
      <CommentCreator
        previewMode={previewMode}
        firstComment={isCompleted && contractComments?.length < 1}
        onCommentCreated={() => listContractComments(contract_reference)}
        contract_reference={contract_reference}
      />
    </section>
  );
}

const _CommentContractSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentContractSection);

export { _CommentContractSection as CommentContractSection };
