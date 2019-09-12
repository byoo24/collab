

export const isEmpty = (obj) => {
    if(obj === null || obj === undefined) return true;
    
    switch(typeof obj) {
        case 'array':
        case 'string':
            return obj.length === 0;
        case 'object':
            return Object.getOwnPropertyNames(obj).length === 0;
        default:
            return false;
    }
}