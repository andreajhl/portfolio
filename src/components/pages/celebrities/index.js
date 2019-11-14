import React, {Component, createRef} from 'react';
import {CelebrityCardsSectionLayout, IndexHeaderLayout, PageContainer} from "../../layouts";
import * as PropTypes from "prop-types";
import {CelebrityShape, PaginationShape} from "../../../prop-types";
import {connect} from "react-redux";
import {celebrityOperations} from "../../../state/ducks/celebrities";
import "./styles.scss"
import * as GTM from "../../../state/utils/gtm";


class CelebritiesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {
                page: 1,
                status: 50
            }
        };

        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.updateParams = this.updateParams.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.fetchCelebrities = this.fetchCelebrities.bind(this);

        this.scrollDiv = createRef();
    }

    componentDidMount(): void {
        // Detect when scrolled to bottom.
        this.scrollDiv.current.addEventListener("scroll", () => {
            if (
                this.scrollDiv.current.scrollTop + this.scrollDiv.current.clientHeight >=
                this.scrollDiv.current.scrollHeight
            ) {
                const state = this.state;
                if(this.props.paginationData.nextPage && !this.props.isLoading){
                    const page = 1;
                    if(state.params.page + 1 <= this.props.paginationData.totalPages) {
                        this.onPaginationChange(state.params.page + 1);
                    }
                }
            }
        });
    }

    fetchCelebrities() {
        this.props.fetchCelebrities(this.state.params);
    }

    onPaginationChange(page) {
        this.updateParams("page", page);
    }

    onSearchChange(keywork) {
        this.updateParams("search", keywork);
    }

    updateParams(key, value) {
        const {params}= this.state;
        params[key] = value;
        if(key === "search"){
            params["page"] = 1;
        }
        this.setState({
            params: params,
        }, () => this.fetchCelebrities());
    }

    render() {
        return (
            <>
                <div className="CelebritiesPage">
                    <PageContainer>
                        {/*/!* ShowHeader *!/*/}
                        {localStorage.getItem("hideIndexHeader") === null ? <IndexHeaderLayout/> : null}
                        {/*/!* End ShowHeader *!/*/}


                        {/*/!* MainMenuLayout *!/*/}
                        {/*<MainMenuLayout/>*/}
                        {/*/! End MainMenuLayout *!/*/}

                        {/* CelebrityCardsSectionLayout */}
                        <div className="pt-4" style={{height: "calc(100vh - 100px)", overflow: "auto"}}
                             ref={this.scrollDiv}>
                            <CelebrityCardsSectionLayout
                                title={"Famosos destacados"}
                                showShimmerCards={this.props.isLoading}
                                celebrities={this.props.celebrities}
                            />
                        </div>
                        {/* End CelebrityCardsSectionLayout */}

                        {/* PaginationLayout */}
                        {/*<PaginationLayout*/}
                        {/*    pagination={this.props.paginationData}*/}
                        {/*    onPaginationChange={this.onPaginationChange}*/}
                        {/*/>*/}
                        {/* End PaginationLayout */}
                    </PageContainer>
                </div>
            </>
        );
    };

}

// Set propTypes
CelebritiesPage.propTypes = {
    celebrities: PropTypes.arrayOf(CelebrityShape).isRequired,
    fetchCelebrities: PropTypes.func.isRequired,
    paginationData: PaginationShape
};

// Set defaultProps
CelebritiesPage.defaultProps = {
    celebrities: [],
    paginationData: {}
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.celebrities.fetchCelebritiesReducer.loading,
    celebrities: state.celebrities.fetchCelebritiesReducer.data.results,
    paginationData: state.celebrities.fetchCelebritiesReducer.data.pagination_data
});

// mapStateToProps
const mapDispatchToProps = {
    fetchCelebrities: celebrityOperations.list
};

// Export Class
const _CelebritiesPage = connect(mapStateToProps, mapDispatchToProps)(CelebritiesPage);
export {_CelebritiesPage as CelebritiesPage};
