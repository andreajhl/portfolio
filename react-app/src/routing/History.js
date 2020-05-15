import {createBrowserHistory} from 'history';

const history = createBrowserHistory();
history.listen(() => {
    window.scroll({top: 0,});
});

history._pushRoute = (route) => {

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
