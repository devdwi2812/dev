/**
 * @name {{name}}
 * {{description}}
 *
 * Version: {{version}} ({{build_date}})
 * Homepage: {{homepage}}
 *
 * @author {{author}}
 * Initiated by: Makis Tracend (@tracend)
 *
 * @cc_on Copyright © Makesites.org
 * @license {{#license licenses}}{{/license}}
 */

{{{lib}}}

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

