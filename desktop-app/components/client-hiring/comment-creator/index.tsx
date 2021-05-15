import React, { useEffect, useState } from "react";
import useForm from "lib/hooks/useForm";
import styles from "./styles.module.scss";
import { contractOperations } from "react-app/src/state/ducks/contracts";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import { connect } from "react-redux";
import WarningMessage from "desktop-app/components/common/warning-message";
import classes from "classnames";
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

type CommentCreatorProps = {
  contract_reference: string;
  onCommentCreated: () => void;
} & StateProps &
  DispatchProps;
function CommentCreator({
  isLoading,
  contractComment,
  contract_reference,
  isCompleted,
  onCommentCreated,
  addContractComment,
}: CommentCreatorProps) {
  console.log(contract_reference);
  useEffect(() => {
    if (isCompleted) onCommentCreated();
  }, [isCompleted]);
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
  if (isCompleted)
    return (
      <div className={styles.CommentBox}>
        <h4 className={styles.CommentSucceeded}>
          Tu comentario ha sido enviado.
        </h4>
      </div>
    );

  return (
    <div className={styles.CommentBoxWrapper}>
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
            status={isLoading ? "loading" : "idle"}
          />
        </button>
      </div>
      <WarningMessage
        message={errors?.comment || null}
        className={classes(
          styles.FormError,
          errors?.comment && styles.ErrorIsVisible
        )}
      />
    </div>
  );
}

const _CommentCreator = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentCreator);

export { _CommentCreator as CommentCreator };
