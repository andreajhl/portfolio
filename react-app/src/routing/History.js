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
    history.push(route);
    window.scroll({top: 0,});
};

export {history};
