#!/usr/bin/node

const args = process.argv.slice(2);

const schema = {
	expression: '',
	save: '',
	transitions: {
		isTrue: 0,
		isFalse: 0,
		isError: 0,
	},
	context: {}
};

const transformInput2KeyValue = input => Object.keys(input).filter(key => input[key] instanceof Object).map(key => transformInput2KeyValue(input[key]).map(k=>`${key}.${k}`)).reduce((x,y) => x.concat(y), Object.keys(input));

const dummySchemaValidator = (input, schema) => JSON.stringify(input) === JSON.stringify(schema);
const isNumber = (n) => (Number(n) === n);
const evaluate = {
	'>':  (x, y) => x > y,
	'<':  (x, y) => x < y,
	'>=': (x, y) => x >= y,
	'<=': (x, y) => x <= y,
	'==': (x, y) => x == y,
	'!=': (x, y) => x != y,
	'||': (x, y) => x || y,
	'&&': (x, y) => x && y
};

const dummyOutput = (prop, value, next) => ({
	[prop]: value,
	transition: next,
});

if(args.length > 0){
	logicalChallenge(args);
}

function logicalChallenge(inputString){
	try{

		const input = JSON.parse(inputString);
		const regex = new RegExp(/\>\=|\<\=|\>|\<|\=\=|\!\=|\|\||\&\&/);
		if(regex.test(input.expression)){
			const operator = input.expression.match(regex)[0];
			const [a, b] = input.expression.replace(/\(|\)|\s/g,'').split(operator);
			
			const x = isNumber(+a) ? Number(+a) : Number(input.context[a.trim()]);
			const y = isNumber(+b) ? Number(+b) : Number(input.context[b.trim()]);
			let result = false;
			if(isNumber(x) && isNumber(y)){
				result = evaluate[operator](x, y);
				console.log(JSON.stringify(dummyOutput(input.save, result ? true : false, result ? input.transitions.isTrue : input.transitions.isFalse), null, 4));
			}else{
				result = `Uncaught ReferenceError: Neither '${a}' or '${b}' are not defined`;
				console.log(JSON.stringify(dummyOutput(input.save, result, input.transitions.isError), null, 4));
			}
		}else{
			console.log(JSON.stringify(dummyOutput(input.save, 'Uncaught ReferenceError: Invalid Input Schema', input.transitions.isError), null, 4));
		}
	}catch(error){
		console.log(`Error: Invalid JSON input : ${error}`);
	}
}

const test_one = {
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
};

const test_two = {
	
};

const test_three = {
	expression: '((age) > 18)',
	save: 'adult',
	transitions: {
		isTrue: 101,
		isFalse: 102,
		isError: 103,
	},
	context: {}
};

logicalChallenge(JSON.stringify(test_three));
logicalChallenge(JSON.stringify(test_one));
