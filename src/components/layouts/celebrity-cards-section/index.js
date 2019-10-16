import React, {Component} from 'react';
import "./styles.scss";
import {CelebrityShimmerCardLayout} from "../celebrity-shimmer-card";
import {CelebrityCardLayout} from "../celebrity-card";

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
            <>
                <div className="f-main-padding">
                    {/*<div className="clearfix mb-2">*/}
                    {/*    <h6 className="float-left">*/}
                    {/*        <b>Famosos destacados</b>*/}
                    {/*    </h6>*/}
                    {/*</div>*/}
                    <div>
                        {
                            this.props.showShimmerCards ?
                                <div className="scrolling-wrapper">
                                    {CelebrityCardsSectionLayout.renderShimmerCards()}
                                </div>
                                :
                                <div className="scrolling-wrapper">
                                    {this.renderCelebritiesCards()}
                                    {this.renderCelebritiesCards()}
                                    {this.renderCelebritiesCards()}
                                    {this.renderCelebritiesCards()}
                                    {this.renderCelebritiesCards()}
                                    {this.renderCelebritiesCards()}
                                    {this.renderCelebritiesCards()}
                                    {this.renderCelebritiesCards()}
                                    {this.renderCelebritiesCards()}
                                    {this.renderCelebritiesCards()}
                                    {this.renderCelebritiesCards()}
                                    {this.renderCelebritiesCards()}
                                </div>
                        }
                    </div>
                </div>
            </>
        );
    };
}

// default props
CelebrityCardsSectionLayout.defaultProps = {
    showShimmerCards: true,
    celebrities: []
};

export {CelebrityCardsSectionLayout};
