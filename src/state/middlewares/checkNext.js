const checkNext = () => (next) => (action) => {
    next(action);
};

export default checkNext;
