(function(lib) {
	if (typeof define === 'function' && define.amd) {
		define("cell", [], lib);
	} else if (typeof exports === 'object') {
		module.exports = lib(require('ildb'));
	} else {
		lib(window.ILDB);
	}
})(function(ILDB) {


var Cell = function(){

}

return Cell;

});

