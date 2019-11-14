export const tagManagerDataLayer = (event, dataLayer) => {
    window.dataLayer.push({
        ...dataLayer,
        event
    });
};
