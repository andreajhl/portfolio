import TagManager from 'react-gtm-module'
import {Mixpanel} from './mixPanel';

const ENV = process.env.REACT_APP_ENVIRONMENT;

export const initialize = () => {
    if (ENV === "production") {
        TagManager.initialize({
            gtmId: 'GTM-TCDSJ3Q'
        })
    }else{
        TagManager.initialize({
            gtmId: 'GTM-NH95V75'
        });
    }
};

export const tagManagerDataLayer = (event, dataLayer) => {
    try {
        // GTM NOTIFICATION
        window.dataLayer.push({
            ...dataLayer,
            event
        });

        // MIX PANEL
        Mixpanel.track(event, dataLayer);
    }catch (e) {
        console.log("tagManagerDataLayer Error:", e)
    }
};
