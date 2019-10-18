import React, {Component} from 'react';
import "./styles.scss";

class MainMenuLayout extends Component {

    render() {
        return (
            <div className="MainMenuLayout">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-6">
                        <div className="f-main-padding mt-3">
                            <div className="row f-menu f-menu-sm f-shadow f-rounded">
                                <div className="col text-center bg-purple p-2 cursor-pointer">
                                    Para Ti
                                </div>
                                <div className="col text-center bg-purple p-2 cursor-pointer">
                                    Categorias
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}

export {MainMenuLayout};
