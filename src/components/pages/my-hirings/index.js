import React, {Component} from 'react';
import {PageContainer} from "../../layouts";
import {connect} from "react-redux";
import {HiringsCardSection} from "../../layouts";
import "./styles.scss"
import {sessionOperations} from "../../../state/ducks/session";

class MyHiringsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {}
        };

    }

    componentWillMount(): void {
        this.props.getSession()
    }

    componentDidMount(): void {
        document.getElementsByClassName("f-main-body")[0].style.background = "#f7f7f7"
    }

    render() {
        return (
            <>
                <div className="MyHiringsPage">
                    <PageContainer fetchCelebrities={false}>
                        <HiringsCardSection/>
                    </PageContainer>
                </div>
            </>
        );
    };

}

// Set propTypes
MyHiringsPage.propTypes = {};

// Set defaultProps
MyHiringsPage.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    session: state.session.getSessionReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
    getSession: sessionOperations.getSession
};

// Export Class
const _MyHiringsPage = connect(mapStateToProps, mapDispatchToProps)(MyHiringsPage);
export {_MyHiringsPage as MyHiringsPage};
