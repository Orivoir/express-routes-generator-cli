const chalk = require('chalk') ;

module.exports = {

    checkText: function() {

        [ this.left , this.right ].forEach( current => {

            if( typeof current !== 'string' || !current.length ) {

                const outError = current !== 'string' ? '' : 'valid'

                throw new RangeError(`arg1 should be an ${outError} string`) ;
            }

        } ) ;

        return this;
    } ,

    error: function( left , right ) {

        this.left = left ;
        this.right = right;

        this.checkText().log( 192 , 32 , 41 ) ;

        return [left , right] ;

    } ,

    success: function( left , right ) {

        this.left = left ;
        this.right = right;

        this.checkText().log( 42,172,31 ) ;

        return [left , right] ;
    } ,

    info: function( left , right ) {

        this.left = left ;
        this.right = right;

        this.checkText().log( 30,100,190 ) ;

        return [left , right] ;

    } ,

    log: function( r , g , b ) {

        console.log(
            chalk.rgb( r , g , b ).bold( this.left ) + ' ' +  this.right
        ) ;

        return this;
    }

} ;
