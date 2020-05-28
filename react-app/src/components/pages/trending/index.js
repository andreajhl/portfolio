import React, {Component} from 'react';
import {PageContainer} from "../../layouts";
import "./styles.scss"
import {TrendingVideosSectionLayout} from "../../layouts/trending-videos-section";
import * as GTM from "../../../state/utils/gtm";


class TrendingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        GTM.tagManagerDataLayer(
            "TRENDING_PAGE_VIEW",
            this.props.match
        );
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
