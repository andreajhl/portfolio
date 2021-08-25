import React, { useState } from "react";
import styles from "./styles.module.scss";
import errorMessages from "lib/validations/errorMessages";
import {
  defineMessages,
  FormattedMessage,
  IntlFormatters,
  useIntl,
} from "react-intl";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import { SubmitText } from "../helpers/submit-button-text";
import classes from "classnames";
import WarningMessage from "../warning-message";

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

const messages = defineMessages({
  firstCommentPlaceholder: {
    defaultMessage: "Sé el primero en agregar un comentario.",
  },
  lastCommentPlaceholder: {
    defaultMessage: "Agrega un comentario",
  },
});

interface CommentCreatorProps {
  onAddComment: (comment: string) => void;
  isLoading: boolean;
  error: boolean;
  firstComment: boolean;
}

function CommentCreator({
  onAddComment,
  error,
  firstComment,
  isLoading,
}: CommentCreatorProps) {
  const { formatMessage } = useIntl();
  const { values, onChangeField, submitForm, errors } = useForm({
    initialValues: {
      comment: "",
    },
    validations: getValidations(formatMessage),
    onSubmit(data) {
      onAddComment(data.comment);
    },
  });
  const firstCommentPlaceholder = formatMessage(
    messages.firstCommentPlaceholder
  );

  const lastCommentPlaceholder = formatMessage(messages.lastCommentPlaceholder);

  const commentTextareaPlaceholder = firstComment
    ? firstCommentPlaceholder
    : lastCommentPlaceholder;
  return (
    <form className={styles.CommentBoxWrapper} onSubmit={submitForm}>
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
          onKeyPress={(e) => {
            if ("Enter" === e.key && !e.shiftKey) {
              e.preventDefault();
              submitForm();
            }
          }}
          className={styles.CommentTextArea}
          placeholder={commentTextareaPlaceholder}
          onChange={onChangeField}
        />

        <button
          disabled={isLoading}
          type="submit"
          className={`btn btn-outline  ${styles.SubmitComment}`}
        >
          <SubmitText
            baseText={<FormattedMessage defaultMessage="Publicar" />}
            status={isLoading ? "loading" : "idle"}
          />
        </button>
      </div>

      {errors?.comment && (
        <WarningMessage
          message={errors?.comment || null}
          className={classes(
            styles.FormError,
            errors?.comment && styles.ErrorIsVisible
          )}
        />
      )}
    </form>
  );
}

export { CommentCreator };
