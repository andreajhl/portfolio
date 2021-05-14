import useForm from "lib/hooks/useForm";
import React, { useState } from "react";
import { connect } from "react-redux";
import { contractOperations } from "react-app/src/state/ducks/contracts";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import styles from "./styles.module.scss";
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

const initialValues = {
  comment: "",
};

const validations = {
  comment(value: string) {
    if (value === "") return "Debes escribir un comentario";
  },
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type CelebritySimilarVideosReelProps = {
  contract_reference: string;
} & StateProps &
  DispatchProps;

function CommentContract({
  isLoading,
  contractComment,
  contract_reference,
  isCompleted,
  addContractComment,
}: CelebritySimilarVideosReelProps) {
  const { values, onChangeField, setFieldValue, submitForm, errors } = useForm<
    typeof initialValues
  >({
    initialValues: {
      comment: "",
    },
    validations,
    onSubmit(data) {
      addContractComment(contract_reference, {
        comment: data.comment,
      });
    },
  });
  return (
    <div className={styles.CommentContractWrapper}>
      <div className={styles.CommentContractHeader}>
        <p>Comentarios</p>
      </div>
      <div className={styles.CommentBox}>
        <img
          alt="Imagen de perfil"
          height="40px"
          width="40px"
          className={styles.UserImgProfile}
          src="/assets/img/avatar-blank.png"
        ></img>
        <textarea
          id="comment-textarea"
          name="comment"
          value={values.comment}
          className={styles.CommentTextArea}
          placeholder="Sé el primero en agregar un comentario."
          onChange={onChangeField}
        ></textarea>
        <button
          disabled={isLoading === "loading"}
          type="button"
          className={`btn btn-outline  ${styles.SubmitComment}`}
          onClick={submitForm}
        >
          <SubmitText
            baseText="Publicar"
            status={isLoading === "loading" ? "loading" : "idle"}
          />
        </button>
      </div>
    </div>
  );
}

const _CommentContract = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentContract);

export { _CommentContract as CommentContract };
