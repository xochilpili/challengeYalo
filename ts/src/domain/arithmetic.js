"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arithmetiChallengeMath = void 0;
const mathjs = require("mathjs");
const utils_1 = require("../shared/utils");
function arithmetiChallengeMath(inputString) {
    try {
        const input = JSON.parse(inputString);
        try {
            const result = mathjs.evaluate(input.expression.replace('**', '^'));
            return utils_1.dummyOutput(input.save, result.toString(), Number(input.transitions.next));
        }
        catch (err) {
            return utils_1.dummyOutput(input.save, 'NaN', Number(input.transitions.error));
        }
    }
    catch (error) {
        console.log(`Invalidd JSON Input Schema`);
    }
}
exports.arithmetiChallengeMath = arithmetiChallengeMath;
//# sourceMappingURL=arithmetic.js.map