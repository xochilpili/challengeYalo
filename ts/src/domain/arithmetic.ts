import { InputString, OutputString } from './../types/input-string';
import * as mathjs from 'mathjs';
import { dummyOutput } from '../shared/utils';

export function arithmetiChallengeMath(inputString: any): OutputString{
	try{
		const input: InputString = JSON.parse(inputString);
		try{
			const result = mathjs.evaluate(input.expression.replace('**', '^'));
			return dummyOutput(input.save, result.toString(), Number(input.transitions.next));
		}catch(err){
			return dummyOutput(input.save, 'NaN', Number(input.transitions.error));
		}
	}catch(error){
		console.log(`Invalidd JSON Input Schema`);
	}
}
