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

var db, queue,
	_queue = [];

var defaults = {
	"store": "cell.db"

};

var Cell = function( options ){
	// constructor
	var self = this;
	// - setting options
	options = options || {};
	this.options = defaults;
	Object.extend(this.options, options);
	// - setup DB
	db = new ILDB( this.options.store );
	// update the status on ready
	db.ready(function() {
		//return typeof db.clear === "function" ? db.clear(done) : void 0;
		self.status.ready = true;
		self._processQueue();
	});

	return this;
}

// Methods

Cell.prototype = {
	status: {
		ready: false
	},

	// temp data container
	_data: {

	},

	// Data interface
	set: function( data ){
		var self = this;

		for( var key in data ){
			// save data in memory
			this._data[key] = data[key];
			if( this.status.ready ){
				db.put(key, data[key], function(err) {
					if(err) console.log(err);
					// delete temp data
					//delete self._data[key];
					// callback?
				});
			} else {
				queue("set", arguments);
			}
		}
	},

	get: function( key, cb ){
		var self = this;

		if( this.status.ready ){
			db.get(key, function(err, val) {
				if(err) console.log(err);
				if( cb ) cb( val );
			});
		} else {
			queue("get", arguments);
		}

	},

	remove: function( key ){
		if( this.status.ready ){
			db.del(key, function(err) {
				if(err) console.log(err);
				// callback?
			});
		} else {
			queue("remove", arguments);
		}
	},

	all: function( cb ){
		db.getAll(function(err, all) {
			if(err) console.log(err);
			if( cb ) cb( all );
		});
	},

	// Logic

	define: function( name, method ){
		// validation?
		this[name] = method;
	},

	// Internal methods
	_processQueue: function(){
		for(var i in _queue){
			var action = _queue[i].action;
			var args = _queue[i].args;
			this[action].apply(this, args);
		}
	}

};


// store methods
				/*
store = {
	put: function(key, value){

	},

	get: function(){

	},

	del: function(){

	}
}
*/

queue = function(action, args){
	_queue.push({
		action: action,
		args: args
	});
}


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

