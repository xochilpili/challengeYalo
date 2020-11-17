"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummyOutput = exports.expressionReplace = exports.isNumeric = void 0;
exports.isNumeric = (n) => !isNaN(n) && isFinite(n);
exports.expressionReplace = (str, find, replace) => {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < find.length; i++) {
        const regex = new RegExp(find[i], 'g');
        try {
            const el = replace[find[i]];
            if (typeof el === 'string' || typeof el === 'number' || typeof el === 'boolean') {
                str = str.replace(regex, el);
            }
            else {
                // tslint:disable-next-line:no-string-throw
                throw `Uncaught ReferenceError: '${find[i]}' is not defined.`;
            }
        }
        catch (err) {
            // tslint:disable-next-line:no-string-throw
            throw `Uncaught ReferenceError: '${find[i]}' is not defined.`;
        }
    }
    return str;
};
function dummyOutput(prop, value, next) {
    return {
        [prop]: value,
        transition: next,
    };
}
exports.dummyOutput = dummyOutput;
//# sourceMappingURL=utils.js.map