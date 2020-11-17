import { isNumeric, expressionReplace } from './../shared/utils';
const assert = require('assert');

describe('Utils testing', () => {

	it('should return true if its a number', () => {
		const m = 12;
		assert.equal(isNumeric(m), true);
	});

	it('should return false when is not a number', () => {
		const m = 'a';
		assert.equal(isNumeric(m), false);
	});

	it('should replace correct expression', () => {
		const expression = '(age > 1)';
		const find = ['age'];
		const replace = { age: 1};
		assert.equal(expressionReplace(expression, find, replace), '(1 > 1)');
	});

	it('should return error for incorrect expression', (done) => {
		const expression = '(age > 1)';
		const find = ['age'];
		const replace = {};
		assert.throws(() => { expressionReplace(expression, find, replace) } , /ReferenceError/);
		done();
	});
});
