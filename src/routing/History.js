import {createHashHistory} from 'history';

const history = createHashHistory();
history.listen(() => {
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
