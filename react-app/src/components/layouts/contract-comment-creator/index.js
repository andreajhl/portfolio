import React, { Component } from "react";

import { contractOperations } from "../../../state/ducks/contracts";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class ContractCommentCreatorLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.send = this.send.bind(this);
    this.state = {};
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.isCompleted) {
      this.setState({ comment: "" });
    }
  }

  handleInput(e) {
    this.setState({
      comment: e.target.value
    });
  }

  send() {
    this.props.addContractComment(this.props.contractReference, {
      comment: this.state.comment
    });
  }

  render() {
    return (
      <div className="ContractCommentCreatorLayout">
        <h6 className="font-weight-bold">{this.props.title}</h6>
        <textarea
          className="form-control mb-2"
          value={this.state.comment}
          onChange={this.handleInput}
        />
        <button className=" btn btn-primary" onClick={this.send}>
          {this.props.isLoading ? (
            <span
              className="text-white spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <span className="text-white">
              <FormattedMessage defaultMessage="Agregar Comentario" />
            </span>
          )}
        </button>
        {this.props.isCompleted ? (
          <small className="ml-3">
            <FormattedMessage defaultMessage="Tu comentario ha sido enviado." />
          </small>
        ) : null}
      </div>
    );
  }
}

// Set propTypes
ContractCommentCreatorLayout.propTypes = {};

// Set defaultProps
ContractCommentCreatorLayout.defaultProps = {
  contractReference: "",
  title: "Agrega un comentario:"
};

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.contracts.addContractCommentReducer.loading,
  contractComment: state.contracts.addContractCommentReducer.data,
  isCompleted: state.contracts.addContractCommentReducer.completed
});

// mapStateToProps
const mapDispatchToProps = {
  addContractComment: contractOperations.addContractComment
};

// Export Class
const _ContractCommentCreatorLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractCommentCreatorLayout);
export { _ContractCommentCreatorLayout as ContractCommentCreatorLayout };
