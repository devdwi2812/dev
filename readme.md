# CELL

Like neuron cells in biology, Cell is a single computation unit for simple I/O with attached storage. Its main purpose is to be easily integrated and stackable to any JavaScript app, enabling it with additional processing on an abstracted level.

Works on the client (browser) with IndexedDB and on the server (node.js) with LevelDB.


## Features

* Storing string & blob data
* Compute and analyze existing data
* Save and load a persistent state


## Examples

* [IndexedDB test](http://rawgit.com/makesites/cell/master/examples/db.html)
* [Offline Scripts](http://rawgit.com/makesites/cell/master/examples/offline-scripts.html)


## Install

On the server, using NPM:

```
npm install cell
```

On the client, using Bower:

```
bower install cell.js
```


## Methods

* **set( data )** : Store data. Accepts multiple items in the form of a key/value object.

* **get( key )** : Accesses an item already saved

* **remove( key )** : Delete an (existing) item

* **define( name, method )** Define a new method in the ```cell``` namespace

* **extend( methods )** Accpets an object with new methods

* **save( key )** : To persist the state of the data

* **load( key )** : To retrieve a previous state


## Extending

Cell has the ```extend``` and ```define``` methods that allows it to be extended with custom methods, similarly to Backbone's ```extend```, Underscore's ```mixin``` and Handlebars' ```registerHelper```. All (new) methods are meant to be targeted around the data available to the cell unit.


## Showcase

Notable applications of cell:

* [Construct Cache](http://github.com/constructjs/cache)
* [PN:OI](http://pnoi.net)


## Credits

Initiated by Makis Tracend( [@tracend](http://github.com/tracend) )

Distributed through [Makesites.org](http://makesites.org)

Released under the [MPL v2.0](http://www.mozilla.org/MPL/2.0/) & [AGPL](http://www.gnu.org/licenses/agpl.html)

