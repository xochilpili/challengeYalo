const { isNumeric } = require('./utils');

const operators = {
		'>': {
			precedence: 2,
			associativity: 'Left'
		},
		'>=': {
			prececende: 2,
			associativity: 'Left'
		},
		'<': {
			precedence: 2,
			associativity: 'Left'
		},
		'<=': {
			precedence: 2,
			associativity: 'Left'
		},
		'&&': {
			precedence: 3,
			associativity: 'Left'
		},
		'||': {
			precedence: 3,
			associativity: 'Left'
		},
		'==':{
			precedence: 2,
			associativity: 'Left'
		},
		'!=':{
			precedence: 2,
			associative: 'Left'
		}
	};


exports.parser = (expression) => {
	const operatorStack = [];
	let currentStr = '';
	expression = expression.replace(/\s/g,'');
	expression = expression.replace(/true/g,1);
	expression = expression.replace(/false/g,0);
	expression = expression.split(/(&&|<=|<|>=|>|\|\||\(|\)|==|!=)/).filter(s => s);
	for(let i = 0; i < expression.length; i++){
		const currentChar = expression[i];
		if(isNumeric(currentChar)){
			currentStr += currentChar + ' ';
		}else if('==&&||<><=>=!='.indexOf(currentChar) !== -1){
			const o1 = currentChar;
			let o2 = operatorStack[operatorStack.length - 1];
			while('==&&||<><=>=!='.indexOf(o2) !== -1 && ((operators[o1].associativity === "Left" && operators[o1].precedence <= operators[o2].precedence) || (operators[o1].associativity === "Right" && operators[o1].precedence < operators[o2].precedence))){
				currentStr += operatorStack.pop() + ' ';
				o2 = operatorStack[operatorStack.length - 1];
			}
			operatorStack.push(o1);
		}else if(currentChar === '('){
			operatorStack.push(currentChar);
		}else if(currentChar === ')'){
			while(operatorStack[operatorStack.length - 1] !== '('){
				currentStr += operatorStack.pop() + ' ';
			}
			operatorStack.pop();
		}
	}
	while(operatorStack.length > 0){
		currentStr += operatorStack.pop() + ' ';
	}
	return currentStr;
}

const evaluate = {
	'&&': (x, y) => (x && y),
	'||': (x, y) => (x || y),
	'>' : (x, y) => (x > y),
	'<' : (x, y) => (x < y),
	'>=': (x, y) => (x >= y),
	'<=': (x, y) => (x <= y),
	'==': (x, y) => (x == y),
	'!=': (x, y) => (x != y)
};

exports.rpn = (expression) => {
	const s = [];
	const tokens = expression.split(' ').filter(s => s);
	for (const token of tokens){
		const n = Number(token);
		if(!isNaN(n)){
			s.push(n);
		}else{
			if(s.length < 2 ){
				console.log(`${token}: ${s}: insufficient operands`);
				return ;
			}
			const o1 = s.pop();
			const o2 = s.pop();
			// console.log(` ${o2} ${token} ${o1} = ${evaluate[token](o2,o1)}`);
			s.push(evaluate[token](o2, o1));
		}
	}
	return s.join('');
};

