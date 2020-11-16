const {parser, rpn} = require('./lib/parser');
const { expression_replace } = require('./lib/utils');

const args = process.argv.slice(2);

const dummyOutput = (prop, value, next) => ({
	[prop]: value,
	transition: next,
});

const challengeLogic = (inputString) => {
	
	try{
		const input = JSON.parse(inputString);
		let expression = input.expression;
		if(/\w+[^0-9]\b/.test(expression)){
			const vars  = expression.match(/\w+[^0-9]\b/gm).filter((v, i, a) => a.indexOf(v) === i);
			try {
				expression = expression_replace(expression, vars, input.context);
			} catch(er) {
				console.log(JSON.stringify(dummyOutput(input.save, er, input.transitions.isError), null, 4));
				return ;
			}
		}
		const tokens = parser(expression);
		const result = rpn(tokens);
		console.log(JSON.stringify(dummyOutput(input.save, result==='true' ? true : false, result==='true' ? input.transitions.isTrue : input.transitions.isFalse), null, 4));
	}catch(error){
		console.log(`Invalid Input Format ${error}! `);
	}
}


if(args.length > 0){
	challengeLogic(args);
}

/* Examples */

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
};

const test_three = {
	expression: '((age) > 18)',
	save: 'adult',
	transitions: {
		isTrue: 15,
		isFalse: 23,
		isError: 45,
	},
	context: {}
};

const test_four = {
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
}

const test_five = {
	expression: '(age <= 18)',
	save: 'result',
	transitions: {
		isTrue: 101,
		isFalse: 102,
		isError: 404,
	},
	context: {
		age: 18
	}
};

const test_six = {
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
};

const test_seven = {
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
};

const test_eight = {
	expression: '2 != 3',
	save: 'result',
	transitions: {
		isTrue: 101,
		isFalse: 102,
		isError: 404
	},
	context: {
		
	}
};

const test_nine = {
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
};

const test_ten = {
	expression: '((age == min) && (2 < 4))',
	save: 'result',
	transitions: {
		isTrue: 101,
		isFalse: 102,
		isError: 404
	},
	context:{
		age: 1,
		min: 3
	}
}

const test_eleven = {
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

console.log(`------> Example 1 : ${test_one.expression}`);
challengeLogic(JSON.stringify(test_one));
console.log(`------> Example 2 : ${test_two.expression}`);
challengeLogic(JSON.stringify(test_two));
console.log(`------> Example 3 : ${test_three.expression}`);
challengeLogic(JSON.stringify(test_three));
console.log(`------> Example 4 : ${test_four.expression}`);
challengeLogic(JSON.stringify(test_four));
console.log(`------> Example 5 : ${test_five.expression}`);
challengeLogic(JSON.stringify(test_five));
console.log(`------> Example 6 : ${test_six.expression}`);
challengeLogic(JSON.stringify(test_six));
console.log(`------> Example 7 : ${test_seven.expression}`);
challengeLogic(JSON.stringify(test_seven));
console.log(`------> Example 8 : ${test_eight.expression}`);
challengeLogic(JSON.stringify(test_eight));
console.log(`------> Example 9 : ${test_nine.expression}`);
challengeLogic(JSON.stringify(test_nine));
console.log(`------> Example 10 : ${test_ten.expression}`);
challengeLogic(JSON.stringify(test_ten));
console.log(`------> Example 11 : ${test_eleven.expression}`);
challengeLogic(JSON.stringify(test_eleven));
