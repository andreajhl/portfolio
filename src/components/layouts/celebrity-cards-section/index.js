import React, {Component} from 'react';
import {CelebrityShimmerCardLayout} from "../celebrity-shimmer-card";
import {CelebrityCardLayout} from "../celebrity-card";
import "./styles.scss";
import {getTotalColumns} from "../../../state/utils/gridSystem";

class CelebrityCardsSectionLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    static renderShimmerCards() {
        return (
            [...Array(getTotalColumns() * 3)].map((o, index) => {
                return (
                    <div className="item mr-4 mb-2 mx-auto" key={index}>
                        <CelebrityShimmerCardLayout/>
                    </div>
                )
            })
        )
    };

    renderCelebritiesCards() {
        return (
            this.props.celebrities.map((celebrity, index) => {
                return (
                    <div className="item mr-4 mb-2 mx-auto" key={index}>
                        <CelebrityCardLayout
                            celebrity={celebrity}
                        />
                    </div>
                )
            })
        )
    };

    render() {
        return (
            <div className="CelebrityCardsSectionLayout">
                <div className={"f-main-padding"}>
                    {/*{this.props.title ? <h6 className="float-left font-weight-bold">{this.props.title}</h6> : null}*/}
                    {
                        this.props.title
                            ?
                            <div className="clearfix">
                                <h6 className="float-left">
                                    <b>{this.props.title}</b>
                                </h6>
                            </div> : null
                    }
                    <div className={"scrolling-wrapper " + (this.props.horizontalScroll ? "horizontal-scroll" : "")}>
                        {this.renderCelebritiesCards()}
                    </div>
                    {
                        this.props.showShimmerCards
                            ?
                            <div className="scrolling-wrapper">
                                {CelebrityCardsSectionLayout.renderShimmerCards()}
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        );
    };
}

// default props
CelebrityCardsSectionLayout.defaultProps = {
    horizontalScroll: false,
    title: "",
    showShimmerCards: true,
    celebrities: []
};

export {CelebrityCardsSectionLayout};
