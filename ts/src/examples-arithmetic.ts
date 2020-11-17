import { arithmetiChallengeMath } from './domain/arithmetic';
import { InputString } from './types/input-string';


const examples: InputString[] = [
	{
		expression: '180/(99**2)',
		save: 'result',
		transitions: {
			next: 1,
			error: 2
		}
	},{
		expression: '(str/2)',
		save: 'result',
		transitions: {
			next: 101,
			error: 102
		}
	},{
		expression: '(10/2)',
		save: 'result',
		transitions: {
			next: 25,
			error: 50
		}
	},{
		expression: '12 + (5**2) - 3',
		save: 'result',
		transitions:{
			next: 101,
			error: 102
		}
	},{
		expression: '(3 + 2) * (5 - 2) / (3 + 3)',
		save: 'result',
		transitions: {
			next: 101,
			error: 102
		}
	},{
		expression: '(3+2) + 5!',
		save: 'result',
		transitions:{
			next: 101,
			error: 102
		}
	}
];

examples.map((example, i) => {
	console.log(`\t---- Input Example  ${i} ----\t`);
	console.log(JSON.stringify(example, null, 4));
	console.log(`\t---- Output Example ${i} ----\t`);
	console.log(JSON.stringify(arithmetiChallengeMath(JSON.stringify(example)), null,4));
});