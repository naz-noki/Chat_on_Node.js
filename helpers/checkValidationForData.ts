const checkValidationForData = <T>(...args: any[]):boolean => {
    for(const idx in args) {
        const el:T = args[idx];
        if(
            el === undefined || 
            el === null
        ) return false;
    };
    return true;
};

module.exports = checkValidationForData;