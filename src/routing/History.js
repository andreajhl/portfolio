import {createHashHistory} from 'history';
// import ReactGA from 'react-ga';

const history = createHashHistory();
history.listen(() => {
    // ReactGA.initialize('UA-148238848-1');
    // ReactGA.pageview(history.location.pathname);
    window.scroll({top: 0,});
});

history._pushRoute = (route) => {

    let search = history.location.search;

    const redirectTo = localStorage.getItem("redirectTo");

    if (route.split("?")[0] === "/" && redirectTo) {
        localStorage.removeItem("redirectTo");
        history.push(redirectTo);
    } else {
        const add = route.split("?")[0];

        history.push(route + search + (add.includes("=") ? "&" : ""));
    }

};

export {history};
