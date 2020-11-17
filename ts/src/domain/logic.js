"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.challengeLogic = void 0;
const utils_1 = require("./../shared/utils");
const parser_1 = require("../shared/parser");
function challengeLogic(inputString) {
    try {
        const input = JSON.parse(inputString);
        let expression = input.expression;
        if (/\w+[^0-9]\b/.test(expression)) {
            const vars = expression.match(/\w+[^0-9]\b/gm).filter((v, i, a) => a.indexOf(v) === i);
            try {
                expression = utils_1.expressionReplace(expression, vars, input.context);
            }
            catch (err) {
                return utils_1.dummyOutput(input.save, err, input.transitions.isError);
            }
            const tokens = parser_1.parser(expression);
            let result = parser_1.rpn(tokens);
            result = result === 'true' || result === true ? true : result === '1' ? true : false;
            return utils_1.dummyOutput(input.save, result, result ? input.transitions.isTrue : input.transitions.isFalse);
        }
    }
    catch (error) {
        console.log(`Invalid Input Format ${error}! `);
    }
}
exports.challengeLogic = challengeLogic;
const esx = '((1 > 2) != false)';
const tok = parser_1.parser(esx);
console.log(tok);
const res = parser_1.rpn(tok);
console.log('here', res);
//# sourceMappingURL=logic.js.map