import { OutputString } from './../types/input-string';
export const isNumeric = (n) => !isNaN(n) && isFinite(n);

export const expressionReplace = (str: string, find: any[], replace: any) => {
	// tslint:disable-next-line:prefer-for-of
	for(let i=0; i < find.length; i++){
		const regex = new RegExp(find[i], 'g');
		try{
			const el:string = replace[find[i]];
			if(typeof el === 'string' || typeof el === 'number' || typeof el === 'boolean'){
				str = str.replace(regex, el);
			}else{
				// tslint:disable-next-line:no-string-throw
				throw `Uncaught ReferenceError: '${find[i]}' is not defined.`;
			}
		}catch(err){
			// tslint:disable-next-line:no-string-throw
			throw `Uncaught ReferenceError: '${find[i]}' is not defined.`;
		}
	}

	return str;
};

export function dummyOutput(prop: string, value: any, next: number): OutputString {
	return {
		[prop]: value,
		transition: next,
	};
}