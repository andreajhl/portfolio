import {createHashHistory} from 'history';
// import ReactGA from 'react-ga';

const history = createHashHistory();
history.listen(() => {
    // ReactGA.initialize('UA-148238848-1');
    // ReactGA.pageview(history.location.pathname);
    window.scroll({top: 0,});
});
export {history};
