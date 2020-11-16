const { parser, rpn } = require('../lib/parser');
const assert = require('assert');


describe('Parser Shunting Yard Testing', () => {

	it('should return valid tokens for expression (2 > 1)', () => {
		const expression = '(2 > 1)';
		assert.equal(parser(expression), '2 1 >');
	});
	
	it('should return valid tokens for expression (( 2 >= 1 ))', () => {
		const expression = '(( 2 >= 1 ))';
		assert.equal(parser(expression), '2 1 >=');
	});
	
	it('should return valid tokens for expression (( 2 > 1) && (1 < 2))', () => {
		const expression = '(( 2 > 1) && (1 < 2))';
		assert.equal(parser(expression), '2 1 > 1 2 < &&');
	});
});

describe('Parser RPN Testing', () => {
	
	it('should return true for expression (1 > 0)', () => {
		const expression = '(1 > 0)';
		const tokens = parser(expression);
		const result = rpn(tokens);
		assert.equal(result, 'true');
	});
	
	it('should return true for expression: ((2 > 1) && (1 != 23))', () => {
		const expression = '((2 > 1) && (1 != 23))';
		const tokens = parser(expression);
		const result = rpn(tokens);
		assert.equal(result, 'true');
	});
	
	it('should return false for expression: (1 > 2)', () => {
		const tokens = parser('(1 > 2)');
		assert.equal(rpn(tokens), 'false');
	});
	
	it('should return false for expression: ((1 > 2) != false)', () => {
		const tokens = parser('((1 > 2) != false)');
		assert.equal(rpn(tokens), 'false');
	});
	
	it('should return true for expression: (true || false)', () => {
		const tokens = parser('(true || false)');
		assert.equal(rpn(tokens), '1');
	});
});
