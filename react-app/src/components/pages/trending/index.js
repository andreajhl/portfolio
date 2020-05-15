import React, {Component} from 'react';
import {PageContainer} from "../../layouts";
import "./styles.scss"
import {TrendingVideosSectionLayout} from "../../layouts/trending-videos-section";


class TrendingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <>
                <div className={"TrendingPage "}>
                    <PageContainer showNavbar={true} applyFetchCelebrities={false} showFooter={false}>
                        {/* CelebrityCardsSectionLayout */}
                        <div className="trending-section">
                            <TrendingVideosSectionLayout/>
                        </div>
                        {/* End CelebrityCardsSectionLayout */}
                    </PageContainer>
                </div>
            </>
        );
    };

}

// Export Class
export {TrendingPage};
