import React, {Component, createRef} from 'react';
import "./styles.scss";
import {connect} from "react-redux";
import {ContractCommentCardLayout} from "../contract-comment-card";
import {contractOperations} from "../../../state/ducks/contracts";
import {ContractCommentCreatorLayout} from "../contract-comment-creator";
import {SessionRequiredToCommentLayout} from "../session-required-to-comment";
import {Session} from "../../../state/utils/session";


class ContractCommentSectionLayout extends Component {


    constructor(props) {
        super(props);

        this.state = {
            params: {
                page: 1
            },
            firstCall: false
        };

        this.listContractComments = this.listContractComments.bind(this);
        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.updateParams = this.updateParams.bind(this);

        this.scrollDiv = createRef();
        this.session = new Session();
    }

    componentDidMount() {
        // Detect when scrolled to bottom.
        this.scrollDiv.current.addEventListener("scroll", () => {
            if (
                this.scrollDiv.current.scrollTop + this.scrollDiv.current.clientHeight >=
                (this.scrollDiv.current.scrollHeight - 500)
            ) {
                const state = this.state;
                if (this.props.paginationData.nextPage && !this.props.isLoading) {
                    setTimeout(() => {
                        const page = 1;
                        if (state.params.page + 1 <= this.props.paginationData.totalPages) {
                            this.onPaginationChange(state.params.page + 1);
                        }
                    }, 500)
                }
            }
        });
    }

    componentWillMount() {
        this.listContractComments();
    }

    listContractComments() {
        this.props.listContractComments(this.props.contract.reference, this.state.params);
    }

    onPaginationChange(page) {
        this.updateParams("currentPage", page);
    }

    onSearchChange(keywork) {
        this.updateParams("search", keywork);
    }

    updateParams(key, value) {
        const {params} = this.state;
        params[key] = value;
        if (key === "search") {
            params["currentPage"] = 1;
        }
        this.setState({
            params: params,
        }, () => this.listContractComments());
    }

    renderContractComments() {
        if (this.props.contractComments.length) {
            return (
                this.props.contractComments.map((comment, index) => {
                    return (
                        <div className="item mr-4 mb-2 mx-auto" key={index + "-" + comment.id}>
                            <ContractCommentCardLayout
                                contractComment={comment}
                            />
                        </div>
                    )
                })
            )
        } else {
            return (
                <h6>Sé el primero en agregar un comentario.</h6>
            )
        }
    };

    renderContractCommentCreator() {
        if (this.session.getSession()) {
            return <ContractCommentCreatorLayout contractReference={this.props.contract.reference}/>
        }else{
            return <SessionRequiredToCommentLayout/>
        }
    }

    render() {
        return (
            <div className="ContractCommentSectionLayout mb-4 mb-lg-0">
                <h6 className="font-weight-bold">Comentarios:</h6>
                <div className="pt-0 scroll-section"
                     style={{height: "300px", overflow: "scroll"}}
                     ref={this.scrollDiv}
                >
                    {this.renderContractComments()}
                </div>
                {this.renderContractCommentCreator()}
            </div>
        );
    };
}

// Set propTypes
ContractCommentSectionLayout.propTypes = {};

// Set defaultProps
ContractCommentSectionLayout.defaultProps = {
    isLoading: false,
    contract: {},
    contractComments: [],
    paginationData: {}
};

// mapStateToProps
const mapStateToProps = (state) => ({
    isLoading: state.contracts.listContractCommentsReducer.loading,
    contractComments: state.contracts.listContractCommentsReducer.data.results,
    paginationData: state.contracts.listContractCommentsReducer.data.informationPage,
});

// mapStateToProps
const mapDispatchToProps = {
    listContractComments: contractOperations.listContractComments,
};

// Export Class
const _ContractCommentSectionLayout = connect(mapStateToProps, mapDispatchToProps)(ContractCommentSectionLayout);
export {_ContractCommentSectionLayout as ContractCommentSectionLayout};

