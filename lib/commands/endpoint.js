module.exports = function() {

    const executersCallbacks = [] ;

    [ 'builder' , 'reset' ].forEach( executerName => {

        const path =  `./${executerName}.js` ;

        const exec = require( path ) ;

        executersCallbacks.push( exec instanceof Function ? exec : () => {
            console.log('error exec should be an function');
        } ) ;
    } ) ;

    const responses = [] ;

    executersCallbacks.forEach( (cb,key) => {

        const nextCb = executersCallbacks[ key +1 ] ;

        const response = cb( nextCb instanceof Function ? nextCb : () => {} ) ;

        responses.push( response ) ;

    } ) ;

    // resolve responses
    return Promise.all( responses.filter( response => !!response ) )  ;
} ;
