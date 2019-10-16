import React, {Component} from 'react';
import {FooterLayout} from "../footer";
import {MainMenuLayout} from "../main-menu";

class PageContainer extends Component {

    render() {
        return (
            <>
                {/* MainMenuLayout */}
                <MainMenuLayout/>
                {/* End MainMenuLayout */}

                {/* FooterLayout */}
                <FooterLayout/>
                {/* End FooterLayout */}
            </>
        );
    };

}

export {PageContainer};
