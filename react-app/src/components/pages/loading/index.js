import React, {Component} from 'react';
import "./styles.scss";
import {Session} from "../../../state/utils/session";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

class LoadingPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            // readyState: false,
            readyState: true,
        };
    }


    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({
        //         readyState: true,
        //     })
        // }, 800);
        // // CHECK VISIT
        // const session = new Session();
        // if (session.isFirstVisit()) {
        //     setTimeout(() => {
        //         window.location.href = "https://landing.famosos.com";
        //     }, 1200)
        // } else {
        //     setTimeout(() => {
        //         history._pushRoute(PATHS.HOME_PATH)
        //     }, 1200)
        // }


        const session = new Session();
        if (session.isFirstVisit()) {
            window.location.href = "https://landing.famosos.com";
        } else {
            history._pushRoute(PATHS.HOME_PATH)
        }
    }

    render() {
        return (
            <div className="LoadingPage">
                <div className="height100vh">
                    <div className={"loading-container mx-auto " + (!this.state.readyState ? " on " : " off ")}>
                        <div className="stage">
                            <img src={"https://v.fastcdn.co/u/054523e2/48208445-0-FAMOSOS-favicon.png"} width="100%"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}

export {LoadingPage};

