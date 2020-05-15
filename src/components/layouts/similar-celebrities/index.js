import React, {Component, createRef} from 'react';
import {CelebrityCardLayout} from "../celebrity-card";
import "./styles.scss";

class SimilarCelebritiesLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showScrollButtonRight: true,
            showScrollButtonLeft: false
        };

        this.scrollDiv = createRef();
    }

    renderLoading() {
        if (this.props.showLoading) {
            return (
                <div className="mx-auto text-center">
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
    }

    renderCelebritiesCards() {
        return (
            this.props.celebrities.map((celebrity, index) => {
                return (
                    <div className="item mr-4 mx-auto" key={"celebrity" + celebrity.id + "-" + index}>
                        <CelebrityCardLayout
                            celebrity={celebrity}
                        />
                    </div>
                )
            })
        )
    };

    onScrollButtonRightClick = (e) => {


        let scrollLeft = this.scrollDiv.current.scrollLeft;
        const divWidth = this.scrollDiv.current.clientWidth;
        const scrollWidth = this.scrollDiv.current.scrollWidth;
        scrollLeft += 100;
        this.scrollDiv.current.scrollLeft = scrollLeft;
        this.setState({
            ...this.state,
            showScrollButtonRight: !(Math.round(scrollLeft) === Math.round(scrollWidth - divWidth + 100)),
            showScrollButtonLeft: true
        });
    };

    onScrollButtonLeftClick = (e) => {
        let scrollLeft = this.scrollDiv.current.scrollLeft;
        scrollLeft -= 100;
        this.scrollDiv.current.scrollLeft = scrollLeft;
        this.setState({
            ...this.state,
            showScrollButtonRight: true,
            showScrollButtonLeft: !(this.scrollDiv.current.scrollLeft === 0)
        })
    };

    render() {
        return (
            <div className="SimilarCelebritiesLayout">
                {
                    this.props.celebrities
                    &&
                    <div className="f-container mb-2 pb-2">
                        <div className="row f-section mx-auto pt-2">
                            <div className="col-12 mb-4">
                                <b>Famosos Similares</b>
                            </div>
                            <div className="col-12 mb-4">
                                {this.renderLoading()}
                                {
                                    this.state.showScrollButtonLeft
                                    &&
                                    <div
                                        className="scroll-button scroll-button-left"
                                        onClick={e => {
                                            this.onScrollButtonLeftClick(e)
                                        }}
                                    >
                                        <i className="fa fa-arrow-circle-left"/>
                                    </div>
                                }
                                <div className="scroll-section" ref={this.scrollDiv}>
                                    {this.renderCelebritiesCards()}
                                </div>
                                {
                                    this.state.showScrollButtonRight
                                    &&
                                    <div
                                        className="scroll-button scroll-button-right"
                                        onClick={e => {
                                            this.onScrollButtonRightClick(e)
                                        }}
                                    >
                                        <i className="fa fa-arrow-circle-right"/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    };
}

// default props
SimilarCelebritiesLayout.defaultProps = {
    showLoading: false,
    celebrities: [],
};

export {SimilarCelebritiesLayout};

