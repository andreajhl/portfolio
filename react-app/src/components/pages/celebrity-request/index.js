import React, {Component} from 'react';
import {PageContainer} from "../../layouts/page-container";
import {CelebrityRequestForm} from "../../containers/celebrity-request-form";
import "./styles.scss";


class CelebrityRequestPage extends Component {

    render() {
        return (
            <div className="CelebrityRequestPage">
                <PageContainer>
                    <div className="section">
                        <CelebrityRequestForm/>
                    </div>
                </PageContainer>
            </div>
        );
    };

}

export {CelebrityRequestPage};

