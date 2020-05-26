import mixpanel from 'mixpanel-browser';

mixpanel.init('3c06764cad281ce6f4ca117975c119ef');

let actions = {
    identify: (id) => {
        mixpanel.identify(id);
    },
    alias: (id) => {
        mixpanel.alias(id);
    },
    track: (name, props) => {
        mixpanel.track(name, props);
    },
    people: {
        set: (props) => {
            mixpanel.people.set(props);
        },
    },
};

export let Mixpanel = actions;
