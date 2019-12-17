import React, {Component} from 'react';
import "./styles.scss";

class BottomNavbarSectionLayout extends Component {

    render() {
        return (
            <div className="BottomNavbarSectionLayout">
                <div className="bottom-navbar-container f-shadow">
                    <div className="box secondary-option ">
                        <i className="fa fa-home icon"/>
                    </div>
                    <div className="box secondary-option">
                        <i className="fa fa-search icon"/>
                    </div>
                    <div className="box primary-option">
                        <i className="fa fa-video icon"/>
                    </div>
                    <div className="box secondary-option">
                        <i className="fa fa-clipboard icon"/>
                    </div>
                    <div className="box secondary-option ">
                        <i className="fa fa-user icon"/>
                    </div>
                </div>
            </div>
        );
    };

}

export {BottomNavbarSectionLayout};
