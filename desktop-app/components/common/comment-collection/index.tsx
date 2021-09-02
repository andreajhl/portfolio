import { FormattedMessage } from "lib/custom-intl";
import React from "react";
import { CommentItem, CommentItemType } from "../comment-element";

interface CommentCollectionProps {
  onShowMoreComments?: () => void;
  comments: CommentItemType[];
  displayShowMoreButton?: boolean;
}

function CommentCollection({
  displayShowMoreButton,
  comments,
  onShowMoreComments,
}: CommentCollectionProps) {
  return (
    <div className="comment-collection">
      {comments.map((item, index) => (
        <CommentItem
          avatar_url={item.avatar_url}
          userFullName={item.userFullName}
          key={index}
          comment={item.comment}
        />
      ))}
      <div className="comment-collection-footer">
        {displayShowMoreButton && (
          <button
            style={{
              fontSize: "0.8rem",
              marginLeft: "1rem",
              marginTop: "1rem",
              fontWeight: "bold",
            }}
            className="btn btn-light"
            onClick={onShowMoreComments}
          >
            <FormattedMessage defaultMessage="Mostrar más comentarios" />
          </button>
        )}
      </div>
    </div>
  );
}

export { CommentCollection };
