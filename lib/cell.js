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
		window.Cell = lib(window.ILDB);
	}
})(function(ILDB) {

var defaults = {
	"store": "cell.db"

};

var Cell = function( options ){
	// constructor
	// - setting options
	options = options || {};
	this.options = defaults;
	Object.extend(this.options, options);
	// - setup DB
	db = new ILDB( this.options.store );
	/*
	return db.ready(function() {
		//return typeof db.clear === "function" ? db.clear(done) : void 0;
	});
	*/
	return this;
}

// Methods

Cell.prototype = {
	// Data interface
	set: function( data ){
		for( var key in data ){
			db.put(key, data[key], function(err) {
				if(err) console.log(err);
				// callback?
			});
		}
	},

	get: function( key, cb ){
		db.get(key, function(err, val) {
			if(err) console.log(err);
			if( cb ) cb( val );
		});
	},

	remove: function( key ){
		db.del(key, function(err) {
			if(err) console.log(err);
			// callback?
		});
	},

	all: function( cb ){
		db.getAll(function(err, all) {
			if(err) console.log(err);
			if( cb ) cb( all );
		});
	}
};


// Helpers

Object.extend = function(destination, source) {
	for (var property in source) {
		if (source[property] && source[property].constructor && source[property].constructor === Object) {
			destination[property] = destination[property] || {};
			arguments.callee(destination[property], source[property]);
		} else {
			destination[property] = source[property];
		}
	}
	return destination;
};


return Cell;

});

