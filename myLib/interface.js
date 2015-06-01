//constructor
var Interface = function(name,methods){
	this.name = name;
	this.methods = [];
	if(arguments.length != 2){
		throw new Error("constructor Interface called with " + arguments.length + "arguments, but expected exactly 2 arguments.");
	}
	for(var i = 0, len = methods.length; i < len; i++){
		var method = methods[i];
		if(typeof method !== "string"){
			throw new Error("constructor Interface expect method names to be passed in as a string.");
		}
		this.methods.push(method);
	}
}
//static method
Interface.ensureImplements = function(object){
	if(arguments.length < 2){
		throw new Error("Function Interface.ensureImplements called with " + arguments.length +"arguments, but expected at least 2.");
	}
	for(var i = 1, len = arguments.length; i < len; i++){
		var interface = arguments[i];
		if(interface.constructor !== Interface){
			throw new Error("Function Interface.ensureImplements expects arguments two and above to be instances of Interface.");
		}
		for(var j = 0, methodLen = interface.methods.length; j < methodLen; j++){
			var method = interface.methods[j];			
			if(!object[method] || typeof object[method] != 'function'){
				throw new Error("Function Interface.ensureImplements object does not implement the " + interface.name + " interface.method " + method + " was not found.");
			}			
		}
	}
}
