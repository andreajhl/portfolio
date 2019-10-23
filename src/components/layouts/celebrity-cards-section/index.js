import React, {Component} from 'react';
import {CelebrityShimmerCardLayout} from "../celebrity-shimmer-card";
import {CelebrityCardLayout} from "../celebrity-card";
import "./styles.scss";

class CelebrityCardsSectionLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    static renderShimmerCards() {
        return (
            [...Array(12)].map((o, index) => {
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
                <div className="f-main-padding">
                    {
                        this.props.title
                            ?
                            <div className="clearfix mb-2">
                                <h6 className="float-left">
                                    <b>{this.props.title}</b>
                                </h6>
                            </div> : null
                    }
                    {
                        this.props.showShimmerCards ?
                            <div className="scrolling-wrapper">
                                {CelebrityCardsSectionLayout.renderShimmerCards()}
                            </div>
                            :
                            <div className="scrolling-wrapper">
                                {this.renderCelebritiesCards()}
                            </div>
                    }
                </div>
            </div>
        );
    };
}

// default props
CelebrityCardsSectionLayout.defaultProps = {
    title: "",
    showShimmerCards: true,
    celebrities: []
};

export {CelebrityCardsSectionLayout};
