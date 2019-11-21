const checkNext = () => (next) => (action) => {
    next(action);
    console.log(action)
};

export default checkNext;
