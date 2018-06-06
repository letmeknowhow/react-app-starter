let path = require('path');

//线上环境
let isProductEnv = process.env.NODE_ENV === 'production';
//QA环境
let isQAEnv = process.env.NODE_ENV === 'qa';
//DEV联调环境
let isDevEnv = process.env.NODE_ENV === 'dev';
//FE开发环境
let isFeEnv = !(isProductEnv || isQAEnv || isDevEnv);

//默认使用新版本
// var defaultUseNewVersion = true;

//default to fe environment
function env(fe, product) {
	if (!product && product !== '') {
		product = fe;
	}
	return isFeEnv ? fe : product;
}


function resolve(modulePath){
	return path.join(process.cwd(), modulePath);
}

function isArrayOrObject(o){
	return isObject(o) || isArray(o);
}

function isArray(a){
	return Object.prototype.toString.call(a) === "[object Array]";
}

function isObject(o){
	return Object.prototype.toString.call(o) === "[object Object]";
}

function getEnvString(){
	return isProductEnv ? 'production' : isQAEnv? 'qa' : isDevEnv ? 'dev' : 'fe';
}

function smartEnv(smartObject){
	if(Object.prototype.toString.call(smartObject) !== "[object Object]"){
		throw new Error('smartObject must be an Object');
	}

	let common = smartObject.common;
	let production = smartObject.production;
	let qa = smartObject.qa;
	let dev = smartObject.dev;
	let fe = smartObject.fe;

	if(isArrayOrObject(common) && isArrayOrObject(production) && isArrayOrObject(qa) && isArrayOrObject(dev)){
		if(isArray(common)){
			return 	common.concat(smartObject[getEnvString()]);
		}else{
			return Object.assign({}, common, smartObject[getEnvString()]);
		}
	}else{
		throw new Error('smartObject.common|production|qa|dev must all be an Object or an Array');
	}

}

module.exports = {
	// defaultUseNewVersion: defaultUseNewVersion,
	env: env,
	smartEnv: smartEnv,
	resolve: resolve,
	isProductEnv:isProductEnv,
	isQAEnv:isQAEnv,
	isDevEnv: isDevEnv,
	isFeEnv: isFeEnv
};