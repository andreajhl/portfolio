import TagManager from 'react-gtm-module'

const ENV = process.env.REACT_APP_ENVIRONMENT;

export const initialize = () => {
    if (ENV === "production") {
        TagManager.initialize({
            gtmId: 'GTM-TCDSJ3Q'
        })
    }
};
