import React, {Component} from 'react';

class NavbarSearchLayout extends Component {

    state = {
        keyword: ""
    };

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (nextProps.removeKeywords) {
            this.setState({
                keyword: ""
            });
        }
    }

    inputHandler(e) {
        if (e.target.value && e.target.value.length > 1) {
            if (e.target.value.length % 2 === 0) {
                if (this.props.onSearchChange) {
                    this.props.onSearchChange(e.target.value)
                }
            }
        }
        this.setState({
            keyword: e.target.value
        });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            if (this.props.onSearchChange) {
                this.props.onSearchChange(this.state.keyword)
            }
        }
    }

    handleBlur() {
        if (this.props.onSearchChange) {
            this.props.onSearchChange(this.state.keyword)
        }
    }

    render() {
        return (
            <>
                <div className="form-group">
                    <div className="input-group">
                        <input
                            className="form-control"
                            type="text"
                            name="search"
                            value={this.state.keyword}
                            onKeyPress={this.handleKeyPress.bind(this)}
                            // onBlur={this.handleBlur.bind(this)}
                            onChange={this.inputHandler.bind(this)}
                            placeholder={this.props.searchLabel}
                        />
                        <span className="input-group-btn bg-primary" style={{color: "white !important"}}>
                                {
                                    !this.state.keyword.length
                                        ?
                                        <button className="btn btn-default text-white" type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    this.props.onSearchChange(this.state.keyword)
                                                }}
                                        >
                                            <i className="fa fa-search"></i> Buscar
                                        </button>
                                        :
                                        <button className="btn btn-danger text-white" type="button"
                                                onClick={(e) => {
                                                    this.setState({keyword: ""}, () => {
                                                        this.props.onSearchChange(null)
                                                    })
                                                }}
                                        >
                                            Cancel
                                        </button>
                                }
                            </span>
                    </div>
                </div>
            </>
        )
    }
}

// Set defaultProps
NavbarSearchLayout.defaultProps = {
    searchLabel: "Busca a un Famoso",
    onSearchChange: function () {
    }
};

export {NavbarSearchLayout};
