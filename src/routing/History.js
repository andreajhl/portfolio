import {createHashHistory} from 'history';
// import ReactGA from 'react-ga';

const history = createHashHistory();
history.listen(() => {
    // ReactGA.initialize('UA-148238848-1');
    // ReactGA.pageview(history.location.pathname);
    window.scroll({top: 0,});
});

history._pushRoute = (route) => {
    const redirectTo = localStorage.getItem("redirectTo");

    console.log("route:_", route);

    if (route.includes("?")) {
        if (!route.includes("redirectTo")) {
            route += "&redirectTo=" + redirectTo
        }
    } else if(redirectTo){
        route += "?redirectTo=" + redirectTo
    }

    if (route.split("?")[0] === "/" && redirectTo) {
        localStorage.removeItem("redirectTo");
        history.push(redirectTo);
    } else {
        history.push(route);
    }

};

export {history};
