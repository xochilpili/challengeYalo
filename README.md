# Challenge

###### How to: 
```
	1.- git clone https://github.com/xochilpili/challengeYalo
	2.- npm i
	3.- node logic.js || node arithmetic.js
```

###### Arithmetic

This version required **mathjs**. This library is a wellknown and oficial library for math operations and even _in our case_
LL1, Shunting Yard and RPN Algorithms. For further information, please follow [MathJS](https://mathjs.org/).

###### There're two versions of logic
The file **logic_old** was a pre-build schematic without complex operations such as ```((a && b) != (a < b))```

The second one, **functional** based on requirements, it's **logic.js**


## Arithmetic.js

```
	node arithmetic.js '{"expression": "((2+3) - (5 * 2 + 3)", "save":"result", "transitions": {"next": 1, "error": 2}}' // if you want to pass JSON input as argv
	**or**
	node arithmetic.js // which contains several examples.
```

## Logic.js

```
	node logic.js '{"expression": "(age > 18)", "save":"result", "transitions": {"isTrue": 1, "isFalse": 2, "isError": 3}, "context": { "age": 12}}' // if you want to pass JSON input as argv
	** or **
	node logic.js // which contains several examples.
```

xOCh et Am.
	
