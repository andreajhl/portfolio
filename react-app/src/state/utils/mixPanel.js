import mixpanel from "mixpanel-browser";

mixpanel.init("3c06764cad281ce6f4ca117975c119ef");

const isProductionEnvironment =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production";

const Mixpanel = {
  identify: (id) => {
    if (isProductionEnvironment) mixpanel.identify(id);
  },
  alias: (id) => {
    if (isProductionEnvironment) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (isProductionEnvironment) mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (isProductionEnvironment) mixpanel.people.set(props);
    }
  }
};

export { Mixpanel };
