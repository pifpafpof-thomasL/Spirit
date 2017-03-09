const logger = store => next => action => {
    console.info(action.type, action);
    next(action);
}

export default logger;