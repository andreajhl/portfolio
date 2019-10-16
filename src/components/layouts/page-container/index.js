import React, {Component} from 'react';
import {NavbarSectionLayout} from "../navbar-section";

class PageContainer extends Component {

    render() {
        return (
            <>
                {/* NavbarSectionLayout */}
                {this.props.showFooter ? <NavbarSectionLayout onSearchChange={this.props.onSearchChange}/> : null}
                {/* End NavbarSectionLayout */}

                {this.props.children}

                {/* FooterLayout */}
                {/*{this.props.showFooter ? <FooterLayout/> : null}*/}
                {/* End FooterLayout */}
            </>
        );
    };

}

// default props
PageContainer.defaultProps = {
    onSearchChange: () => {},
    showFooter: true,
    showNavbar: true
};

export {PageContainer};
