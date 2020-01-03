const fs = require('fs') ;
const pathResolver = require('path') ;

module.exports = function( path , dirname ) {

    if( fs.existsSync( path ) ) {

        if( !fs.existsSync( pathResolver.join( path , dirname ) ) ) {

            fs.mkdirSync( pathResolver.join( path , dirname ) ) ;
            return true;
        } else {

            return "already";
        }

    } else {

        return false;
    }

} ;
