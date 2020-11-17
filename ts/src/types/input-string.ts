import { TranspileOptions } from "typescript";

export interface InputString{
	expression: string;
	save: string;
	transitions: Transitions;
	context?: any;
};

export interface Transitions{
	isTrue?: number;
	isFalse?: number;
	isError?: number;
	next?: number;
	error?: number;
};

export interface OutputString{
	[prop: string]: any;
	transition: number;
};