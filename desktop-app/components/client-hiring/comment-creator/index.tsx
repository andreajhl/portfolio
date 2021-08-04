import { useEffect } from "react";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import styles from "./styles.module.scss";
import { contractOperations } from "react-app/src/state/ducks/contracts";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import { connect } from "react-redux";
import WarningMessage from "desktop-app/components/common/warning-message";
import classes from "classnames";
import {
  defineMessages,
  FormattedMessage,
  IntlFormatters,
  useIntl,
} from "react-intl";
import errorMessages from "lib/validations/errorMessages";

const messages = defineMessages({
  firstCommentPlaceholder: {
    defaultMessage: "Sé el primero en agregar un comentario.",
  },
  lastCommentPlaceholder: {
    defaultMessage: "Agrega un comentario",
  },
});

const mapStateToProps = (state) => ({
  isLoading: state.contracts.addContractCommentReducer.loading,
  contractComment: state.contracts.addContractCommentReducer.data,
  isCompleted: state.contracts.addContractCommentReducer.completed,
});

const mapDispatchToProps = {
  addContractComment: contractOperations.addContractComment,
};
const initialValues = {
  comment: "",
};

type InitialValuesType = typeof initialValues;

function getValidations(
  formatMessage: IntlFormatters["formatMessage"]
): ValidationsType<InitialValuesType> {
  return {
    comment(value: string) {
      if (value === "") return formatMessage(errorMessages.emptyReview);
    },
  };
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type CommentCreatorProps = {
  contract_reference: string;
  previewMode?: boolean;
  onCommentCreated: () => void;
  firstComment: boolean;
} & StateProps &
  DispatchProps;

function CommentCreator({
  isLoading,
  contractComment,
  contract_reference,
  isCompleted,
  onCommentCreated,
  previewMode = false,
  addContractComment,
  firstComment,
}: CommentCreatorProps) {
  useEffect(() => {
    if (isCompleted) onCommentCreated();
  }, [isCompleted]);
  const { formatMessage } = useIntl();
  const { values, onChangeField, submitForm, errors } = useForm({
    initialValues: {
      comment: "",
    },
    validations: getValidations(formatMessage),
    onSubmit(data) {
      if (previewMode) return;
      addContractComment(contract_reference, {
        comment: data.comment,
      });
    },
  });
  if (isCompleted) {
    return (
      <div className={styles.CommentBox}>
        <h4 className={styles.CommentSucceeded}>
          <FormattedMessage defaultMessage="Tu comentario ha sido enviado." />
        </h4>
      </div>
    );
  }

  const firstCommentPlaceholder = formatMessage(
    messages.firstCommentPlaceholder
  );

  const lastCommentPlaceholder = formatMessage(messages.lastCommentPlaceholder);

  const commentTextareaPlaceholder = firstComment
    ? firstCommentPlaceholder
    : lastCommentPlaceholder;

  return (
    <div className={styles.CommentBoxWrapper}>
      <div className={styles.CommentBox}>
        <img
          alt="Avatar"
          height="40px"
          width="40px"
          className={styles.UserImgProfile}
          src="/assets/img/avatar-blank.png"
        />
        <textarea
          id="comment-textarea"
          name="comment"
          value={values.comment}
          className={styles.CommentTextArea}
          placeholder={commentTextareaPlaceholder}
          onChange={!previewMode ? onChangeField : undefined}
        />
        <button
          disabled={isLoading === "loading"}
          type="button"
          className={`btn btn-outline  ${styles.SubmitComment}`}
          onClick={submitForm}
        >
          <SubmitText
            baseText={<FormattedMessage defaultMessage="Publicar" />}
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
