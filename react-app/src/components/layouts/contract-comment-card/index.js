import React, { Component } from "react";

class ContractCommentCardLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="ContractCommentCardLayout">
        <div className="custom-card-title">
          <div className="avatar">
            <i className="fa fa-user" />
          </div>
          <div className="client-name">
            {this.props.contractComment.userFullName}
          </div>
        </div>
        <div className="custom-card-body">
          <div className="comment">{this.props.contractComment.comment}</div>
        </div>
      </div>
    );
  }
}

// default props
ContractCommentCardLayout.defaultProps = {
  contractComment: {}
};

// Export Class
export { ContractCommentCardLayout };
