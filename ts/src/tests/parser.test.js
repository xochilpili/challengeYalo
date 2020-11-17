"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../shared/parser");
const assert = require('assert');
describe('Parser Shunting Yard Testing', () => {
    it('should return valid tokens for expression (2 > 1)', () => {
        const expression = '(2 > 1)';
        assert.equal(parser_1.parser(expression), '2 1 >');
    });
    it('should return valid tokens for expression (( 2 >= 1 ))', () => {
        const expression = '(( 2 >= 1 ))';
        assert.equal(parser_1.parser(expression), '2 1 >=');
    });
    it('should return valid tokens for expression (( 2 > 1) && (1 < 2))', () => {
        const expression = '(( 2 > 1) && (1 < 2))';
        assert.equal(parser_1.parser(expression), '2 1 > 1 2 < &&');
    });
});
describe('Parser RPN Testing', () => {
    it('should return true for expression (1 > 0)', () => {
        const expression = '(1 > 0)';
        const tokens = parser_1.parser(expression);
        const result = parser_1.rpn(tokens);
        assert.equal(result, 'true');
    });
    it('should return true for expression: ((2 > 1) && (1 != 23))', () => {
        const expression = '((2 > 1) && (1 != 23))';
        const tokens = parser_1.parser(expression);
        const result = parser_1.rpn(tokens);
        assert.equal(result, 'true');
    });
    it('should return false for expression: (1 > 2)', () => {
        const tokens = parser_1.parser('(1 > 2)');
        assert.equal(parser_1.rpn(tokens), 'false');
    });
    it('should return false for expression: ((1 > 2) != false)', () => {
        const tokens = parser_1.parser('((1 > 2) != false)');
        assert.equal(parser_1.rpn(tokens), 'false');
    });
    it('should return true for expression: (true || false)', () => {
        const tokens = parser_1.parser('(true || false)');
        assert.equal(parser_1.rpn(tokens), '1');
    });
});
//# sourceMappingURL=parser.test.js.map