import React, { Component } from "react";

class PaginationLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1
    };

    this.changePagination = this.changePagination.bind(this);
  }

  componentDidMount() {
    this.setState({ currentPage: this.props.pagination.currentPage });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.pagination.currentPage !== this.state.currentPage) {
      this.setState({ currentPage: nextProps.pagination.currentPage });
    }
  }

  previousPage() {
    if (this.props.pagination.currentPage >= 1) {
      const page = this.props.pagination.currentPage - 1;
      this.changePagination(page);
    }
  }

  nextPage() {
    const page = this.props.pagination.currentPage + 1;
    this.changePagination(page);
  }

  changePagination(page) {
    if (page > 0 && page <= this.props.pagination.totalPages) {
      this.props.onPaginationChange(page);
    }
  }

  render() {
    // const var1 = (this.props.pagination.totalItemsOnPage * (this.props.pagination.currentPage - 1)) + 1;
    // const var2 = (this.props.pagination.totalItemsOnPage * (this.props.pagination.currentPage - 1)) +
    //     this.props.pagination.totalItemsOnPage;
    // const var3 = var2 > this.props.pagination.totalItems ? this.props.pagination.totalItems : var2;
    return (
      <div className="PaginationLayout">
        {this.props.pagination.totalPages > 1 ? (
          <div
            className={this.props.showFmainPadding ? "f-main-padding" : ""}
            style={{ marginTop: "0" }}
          >
            <nav>
              <ul className="pagination">
                <li
                  className={
                    "page-item" +
                    (!this.props.pagination.previousPage ? " disabled " : "")
                  }
                >
                  <span
                    className="page-link cursor-pointer"
                    onClick={this.previousPage.bind(this)}
                  >
                    Anterior página
                  </span>
                </li>
                {/*{*/}
                {/*    [...Array(this.props.pagination.totalPages)].map((page, index) => {*/}
                {/*        return (*/}
                {/*            <li key={index} className={"page-item " + (index + 1 === this.props.pagination.currentPage ? "active" : "")}*/}
                {/*                onClick={this.changePagination.bind(this, index + 1)}>*/}
                {/*                <span className={"page-link"}*/}
                {/*                   key={index}>*/}
                {/*                    {index + 1}*/}
                {/*                </span>*/}
                {/*            </li>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
                <li
                  className={
                    "page-item" +
                    (this.props.pagination.currentPage -
                      this.props.pagination.totalPages >=
                    1
                      ? " disabled "
                      : "")
                  }
                >
                  <span
                    className="page-link cursor-pointer"
                    onClick={this.nextPage.bind(this)}
                  >
                    Siguiente página
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        ) : null}
      </div>
    );
  }
}

// default Props
PaginationLayout.defaultProps = {
  showFmainPadding: true,
  pagination: { totalItems: 0 },
  onPaginationChange: function () {},
  totalPages: 0
};

export { PaginationLayout };
