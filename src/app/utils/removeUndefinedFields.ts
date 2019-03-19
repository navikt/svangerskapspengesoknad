const removeUndefinedFields = (object: Object) => {
    let noUndefined = {};
    Object.keys(object).forEach((field) => {
        if (object[field] !== undefined) {
            noUndefined[field] = object[field];
        }
    });

    return noUndefined;
};

export default removeUndefinedFields;
