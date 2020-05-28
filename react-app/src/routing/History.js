import {createBrowserHistory} from 'history';
import * as GTM from "../state/utils/gtm";

const history = createBrowserHistory();
history.listen(() => {
    window.scroll({top: 0,});
});

history._pushRoute = (route) => {

    GTM.tagManagerDataLayer(
        "PAGE_VIEW",
        history.location
    );

    let search = history.location.search;

    const redirectTo = localStorage.getItem("redirectTo");

    if (redirectTo && route === "/celebrities/" || redirectTo && route === "/") {
        localStorage.removeItem("redirectTo");
        history.push(redirectTo);
    } else {
        history.push(route);
    }

};

export {history};
