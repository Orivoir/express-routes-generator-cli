# express-routes-generator-cli

command line interface of [express-routes-generator](https://www.npmjs.com/package/express-routes-generator)

## installation

- npm i express-routes-generator-cli --save
- yarn add express-routes-generator-cli

### usage:

from console:
**.\node_modules\.bin\express-routes-generator-cli build product**

## script define
```json
{
    "scripts": {
        "crud": "express-routes-generator-cli"
    }
}
```

## usage:

from console:
**npm run crud build product**

generate files crud routes and build structure directories ,
build too an file **all-routes.js** with e.g:

```js
const Product = require('./product');
const Article = require('./Article');

module.exports =
/**
 * @class Routes
 * @classdesc implement all routes
 */
class {

    constructor( app ) {

        new Product( app ) ;
        new Article( app ) ;

    }

} ;

```

for implements all routes with one call

## server.js
```javascript

const
    express = require('express')
    ,app = express()
    ,Routes = require('./routes/all-routes')
;

new Routes( app ) ; // implements route

```

## for reset data build **all-routes.js** use:

**npm run crud reset**

#### develop by [Samuel Gaborieau](https://orivoir.github.io/profil-reactjs) with <3 and Nodejs for *OpenSource* , enjoy !
