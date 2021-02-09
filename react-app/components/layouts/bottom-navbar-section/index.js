import React, { Component } from "react";

import * as PATHS from "../../../routing/Paths";
import { NavLink } from "react-app/components/common/routing";
import { history } from "../../../routing/History";

class BottomNavbarSectionLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSearch: false
    };
  }

  componentDidMount() {
    this.setState(
      {
        showSearch: history.location.pathname === PATHS.SEARCH_PATH
      },
      () => this.updateClasses()
    );
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    this.updateClasses();
  }

  updateClasses() {
    if (this.state.showSearch === true) {
      const fMainPadding = document.getElementsByClassName("f-main-padding");
      const fContainer = document.getElementsByClassName("f-container");
      if (fMainPadding.length) {
        fMainPadding[0].className += " search-sm-active ";
      }
      if (fContainer.length) {
        fContainer[0].className += " search-sm-active ";
      }
      document.getElementById("input-search").autofocus = true;
    } else {
      const fMainPadding = document.getElementsByClassName("f-main-padding");
      const fContainer = document.getElementsByClassName("f-container");
      if (fMainPadding.length) {
        fMainPadding[0].className = " f-main-padding ";
      }
      if (fContainer.length) {
        fContainer[0].className = " f-container ";
      }
    }
  }

  render() {
    return (
      <div className="BottomNavbarSectionLayout d-block d-md-none">
        <div className="bottom-navbar-container f-shadow">
          <NavLink
            className="box secondary-option"
            activeClassName="active"
            to={PATHS.TRENDING}
          >
            <i className={"fa fa-home icon"} />
          </NavLink>
          <NavLink
            className="box secondary-option"
            activeClassName="active"
            to={PATHS.SEARCH_PATH}
          >
            <i className={"fa fa-search icon"} />
          </NavLink>
          <NavLink
            className="box primary-option"
            activeClassName="active"
            to={PATHS.HOME_PATH}
          >
            <img
              className={"icon primary-option-icon"}
              width="42px"
              src={"/assets/img/favicon.png"}
              alt={"main-icon"}
            />
          </NavLink>
          <NavLink
            className="box secondary-option"
            activeClassName="active"
            to={PATHS.CLIENT_HIRINGS}
          >
            <i className="fa fa-clipboard icon" />
          </NavLink>
          <NavLink
            className="box secondary-option"
            activeClassName="active"
            to={PATHS.CLIENT_PROFILE}
          >
            <i className="fa fa-user icon" />
          </NavLink>
        </div>
      </div>
    );
  }
}

// default props
BottomNavbarSectionLayout.defaultProps = {
  onSearchClick: () => {}
};

export { BottomNavbarSectionLayout };
