import { expressionReplace, dummyOutput } from './../shared/utils';
import { parser, rpn } from '../shared/parser';
import { InputString, OutputString } from '../types/input-string';

export function challengeLogic(inputString: any): OutputString{
	try{
		const input: InputString = JSON.parse(inputString);
		let expression = input.expression;
		if(/\w+[^0-9]\b/.test(expression)){
			const vars  = expression.match(/\w+[^0-9]\b/gm).filter((v, i, a) => a.indexOf(v) === i);
			try{
				expression = expressionReplace(expression, vars, input.context);
			}catch(err){
				return dummyOutput(input.save, err, input.transitions.isError);
			}
			const tokens = parser(expression);
			let result = rpn(tokens);
			result = result === 'true' || result === true ? true : result === '1' ? true : false;
			return dummyOutput(input.save, result,  result ? input.transitions.isTrue : input.transitions.isFalse);
		}
	}catch(error){
		console.log(`Invalid Input Format ${error}! `);
	}
}


const esx = '((1 > 2) != false)';
const tok = parser(esx);
console.log(tok);
const res = rpn(tok);
console.log('here', res);