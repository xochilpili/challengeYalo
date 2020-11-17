import { challengeLogic } from './domain/logic';
import { InputString } from './types/input-string';

const examples: InputString[] = [
	{
		expression: '(amount > min)',
		save: 'validAmount',
		transitions: {
			isTrue: 5,
			isFalse: 10,
			isError: 25,
		},
		context: {
			amount: 150,
			min: 45
		}
	},{
		expression: '(age >= 18)',
		save: 'adult',
		transitions: {
			isTrue: 15,
			isFalse: 23,
			isError: 45
		},
		context: {
			age: 15
		}
	},{
		expression: '((age) > 18)',
		save: 'adult',
		transitions: {
			isTrue: 15,
			isFalse: 23,
			isError: 45,
		},
		context: {}

	},{
		expression: '(age < 18)',
		save: 'result',
		transitions: {
			isTrue: 101,
			isFalse: 102,
			isError: 103
		},
		context: {
			age: 20
		}
	},{
		expression: '(age && min)',
		save: 'result',
		transitions: {
			isTrue: 101,
			isFalse: 102,
			isError: 404,
		},
		context:{
			age: true,
			min: false
		}
	},{
		expression: '(age || min)',
		save: 'result',
		transitions: {
			isTrue: 101,
			isFalse: 102,
			isError: 404
		},
		context: {
			age: false,
			min: true
		}
	},{
		expression: '(age || min)',
		save: 'result',
		transitions: {
			isTrue: 101,
			isFalse: 102,
			isError: 404
		},
		context: {
			age: false,
			min: true
		}
	},{
		expression: '2 != 3',
		save: 'result',
		transitions: {
			isTrue: 101,
			isFalse: 102,
			isError: 404
		},
		context: {}
	},{
		expression: '(age == min)',
		save: 'result',
		transitions: {
			isTrue: 101,
			isFalse: 102,
			isError: 404
		},
		context: {
			age: 20,
			min: 18
		}
	},{
		expression: '((age == min) && (2 < 4))',
		save: 'result',
		transitions: {
			isTrue: 101,
			isFalse: 102,
			isError: 404
		},
		context:{
			age: 1,
			min: 2
		}
	},{
		expression: '((age > min) && (1 == 1))',
		save: 'result',
		transitions: {
			isTrue: 101,
			isFalse: 102,
			isError: 404
		},
		context:{
			age: 20,
			min: 18
		}
	}
];

examples.map((example, i) => {
	console.log(`\t ---- Input Example ${i} ----\t`);
	console.log(JSON.stringify(example, null, 4));
	console.log(`\t---- Output Example ${i} ----\t`);
	console.log(JSON.stringify(challengeLogic(JSON.stringify(example)), null, 4));
});