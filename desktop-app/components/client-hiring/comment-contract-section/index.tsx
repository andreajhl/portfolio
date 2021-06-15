import useForm from "lib/hooks/useForm";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchCommentHiring } from "react-app/src/state/ducks/hiring/operations";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import styles from "./styles.module.scss";
import { CommentCreator } from "../comment-creator";
import CommentsContractVideo from "../comments-contract-video";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { RootState } from "react-app/src/state/store";
// mapStateToProps
const mapStateToProps = ({ hiring }: RootState) => ({
  isLoading: hiring.fetchCommentHiringReducer.loading,
  isCompleted: hiring.fetchCommentHiringReducer.completed,
  contractComments: hiring.fetchCommentHiringReducer.data.results,
  paginationData: hiring.fetchCommentHiringReducer.data.informationPage,
});

// mapStateToProps
const mapDispatchToProps = {
  fetchCommentHiring,
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
  fetchCommentHiring,
  paginationData,
  contractComments,
  isLoading,
  previewMode = false,
  isCompleted,
}: CelebritySimilarVideosReelProps) {
  useEffect(() => {
    fetchCommentHiring(contract_reference);
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
        onCommentCreated={() => fetchCommentHiring(contract_reference)}
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
