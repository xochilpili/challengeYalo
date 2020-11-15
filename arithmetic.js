// to use with bash; there's a shebang
// #!/usr/bin/node
//
const mathjs = require('mathjs');

const schema = {
	expression: '',
	save: '',
	transitions: {
		next: '',
		error: '',
	}
};

const args = process.argv.slice(2);

const transformInput2KeyValue = input => Object.keys(input).filter(key => input[key] instanceof Object).map(key => transformInput2KeyValue(input[key]).map(k=>`${key}.${k}`)).reduce((x,y) => x.concat(y), Object.keys(input));

const dummySchemaValidator = (input, schema) => JSON.stringify(input) === JSON.stringify(schema);

const dummyOutput = (prop, value, next) => ({
	[prop]: value,
	transition: next
});

if(args.length > 0){
	arithmeticChallenge(args);
}


function arithmeticChallenge(inputString){
	try{
		const input = JSON.parse(inputString);
		const inputSchema = transformInput2KeyValue(schema);
		const inputParsed = transformInput2KeyValue(input);
		if(dummySchemaValidator(inputParsed, inputSchema)){
			try{
				const result = mathjs.evaluate(input.expression.replace('**', '^'));
				console.log(JSON.stringify(dummyOutput(input.save, result.toString(), Number(input.transitions.next)), null, 4));
				return ;
			}catch(e){
				console.log(JSON.stringify(dummyOutput(input.save, 'NaN', Number(input.transitions.error)), null, 4));
			}
		}else{
			console.log('Error invalid schema!');
		}
	}catch(err){
		console.log(`Invalid Input JSON! ${err}`);
	}
}

/* examples */
const test_one = {
	expression: '180/(99**2)',
	save: 'result',
	transitions: {
		next: 1,
		error: 2
	}
};

const test_two = {
	expression: '(str/2)',
	save: 'result',
	transitions: {
		next: 101,
		error: 102
	}
};

const test_three = {
	expression: '(10/2)',
	save: 'result',
	transitions: {
		next: 25,
		error: 50
	}
};

const test_four = {
	expression: '12 + (5**2) - 3',
	save: 'result',
	transitions:{
		next: 101,
		error: 102
	}
};

const test_five = {
	expression: '(3 + 2) * (5 - 2) / (3 + 3)',
	save: 'result',
	transitions: {
		next: 101,
		error: 102
	}
};

const test_six = {
	expression: '(3+2) + 5!',
	save: 'result',
	transitions:{
		next: 101,
		error: 102
	}
}

console.log(`----- > Example 1 : ${test_one.expression} ----`);
arithmeticChallenge(JSON.stringify(test_one));
console.log(`----- > Example 2 : ${test_two.expression} ----`);
arithmeticChallenge(JSON.stringify(test_two));
console.log(`----- > Example 3 : ${test_three.expression} ----`);
arithmeticChallenge(JSON.stringify(test_three));
console.log(`----- > Example 4 : ${test_four.expression} ----`);
arithmeticChallenge(JSON.stringify(test_four));
console.log(`----- > Example 5 : ${test_five.expression} ----`);
arithmeticChallenge(JSON.stringify(test_five));
console.log(`----- > Example 6 : ${test_six.expression} ----`);
arithmeticChallenge(JSON.stringify(test_six));
