function extend(SonClass, ParentClass){
	var F = function(){};
	F.prototype = ParentClass.prototype;
	SonClass.prototype = new F();
	SonClass.prototype.constructor = SonClass;
}