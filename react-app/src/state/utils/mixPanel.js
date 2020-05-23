import mixpanel from 'mixpanel-browser';

mixpanel.init('3c06764cad281ce6f4ca117975c119ef');

let env_check = process.env.REACT_APP_ENVIRONMENT === 'local';

let actions = {
    identify: (id) => {
        if (env_check) mixpanel.identify(id);
    },
    alias: (id) => {
        if (env_check) mixpanel.alias(id);
    },
    track: (name, props) => {
        if (env_check) mixpanel.track(name, props);
    },
    people: {
        set: (props) => {
            if (env_check) mixpanel.people.set(props);
        },
    },
};

export let Mixpanel = actions;
