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

try{
	const input = JSON.parse(args);
	const inputSchema = transformInput2KeyValue(schema);
	const inputParsed = transformInput2KeyValue(input);
	if(dummySchemaValidator(inputParsed, inputSchema)){
		try{
			const result = mathjs.evaluate(input.expression.replace('**', '^'));
			// DEBUG
			// console.log(mathjs.evaluate(input.expression.replace('**', '^')));
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

