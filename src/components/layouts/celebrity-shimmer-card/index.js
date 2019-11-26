import React, {Component} from 'react';
import "./styles.scss";

class CelebrityShimmerCardLayout extends Component {

    render() {
        return (
            <div className="CelebrityShimmerCardLayout">
                <div className="shimmer-card f-card f-rounded hover f-shadow p-2 pt-0 cursor-pointer text-center mx-auto">
                    <div className="mx-auto">
                        <div className="shimmerBG mr-0"/>
                        <div className="mt-3">
                            <div className="title-line mt-2"/>
                            <div className="title-line mt-2"/>
                            <div className="title-line mt-2"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}

export {CelebrityShimmerCardLayout};
