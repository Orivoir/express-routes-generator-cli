const fs = require('fs') ;

module.exports = function( path , content ) {

    if( fs.existsSync( path ) ) {

        fs.writeFileSync( path , content  ) ;

        return true ;

    } else {

        return false;
    }

} ;