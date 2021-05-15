import useForm from "lib/hooks/useForm";
import React, { useState } from "react";
import { connect } from "react-redux";
import { contractOperations } from "react-app/src/state/ducks/contracts";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import styles from "./styles.module.scss";
import { CommentCreator } from "../comment-creator";
// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.contracts.addContractCommentReducer.loading,
  contractComment: state.contracts.addContractCommentReducer.data,
  isCompleted: state.contracts.addContractCommentReducer.completed,
});

// mapStateToProps
const mapDispatchToProps = {
  addContractComment: contractOperations.addContractComment,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type CelebritySimilarVideosReelProps = {
  contract_reference: string;
} & StateProps &
  DispatchProps;

function CommentContractSection({
  contract_reference,
}: CelebritySimilarVideosReelProps) {
  console.log(contract_reference);
  return (
    <div className={styles.CommentContractWrapper}>
      <div className={styles.CommentContractHeader}>
        <p>Comentarios</p>
      </div>
      <CommentCreator
        onCommentCreated={() => console.log("new comment")}
        contract_reference={contract_reference}
      ></CommentCreator>
    </div>
  );
}

const _CommentContractSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentContractSection);

export { _CommentContractSection as CommentContractSection };
