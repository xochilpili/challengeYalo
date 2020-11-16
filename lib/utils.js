exports.isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

exports.expression_replace = (str, find, replace) => {
	for(let i=0; i < find.length; i++){
		const regex = new RegExp(find[i], 'g');
		try{
			const el = replace[find[i]];
			if(el){
				str = str.replace(regex, el);
			}else{
				throw `Uncaught ReferenceError: '${find[i]}' is not defined`;
			}
		}catch(err){
			throw `Uncaught ReferenceError: '${find[i]}' is not defined`;
		}
	}
	return str;
};
