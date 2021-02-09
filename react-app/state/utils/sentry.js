import * as Sentry from "@sentry/browser";

const ENV = process.env.REACT_APP_ENVIRONMENT;

export const initialize = () => {
    if (ENV !== "development") {
        Sentry.init({
            environment: ENV,
            dsn: "https://cc0f9ee45e3f4294a65c84b5f34c8359@sentry.io/1818785"
        });
    }
};
