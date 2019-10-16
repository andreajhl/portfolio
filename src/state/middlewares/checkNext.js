const checkNext = () => (next) => (action) => {
    next(action);
    console.log('action:', action.type);
};

export default checkNext;
