const fs =  require('fs') ;
const path = require('path') ;
const memoryPath = path.join( __dirname , './../memory.json' ) ;
const emitter = new ( require('events') )() ;
const MAX_TIME_READ_MEMORY = 3e3 ;

process["express-routes-generator-cli"] = {

    memory: {} ,

    shot: {
        endWrite: []
    } ,

    setState( newState , success , error ) {

        success = success instanceof Function ? success : () => {} ;

        if( typeof newState !== 'object' ) {

            throw new RangeError('arg1 `setState` should be an object') ;
        }

        Object.keys( newState ).forEach( attr => {

            this.memory[ attr ] = newState[ attr ]
        } ) ;

        this.shot.iWrite = true;
        // persist new local state
        fs.writeFile( memoryPath , JSON.stringify( this.memory ) , err => {

            this.shot.iWrite = false;

            this.shot.endWrite.forEach( cb => {

                cb instanceof Function ? cb() : null;

            } ) ;

            this.shot.endWrite = [] ;

            if( err ) {
                // persist local state fail

                if( !(error instanceof Function) ) {

                    throw new MediaStreamError( 'memory persist local state error , reject write file' ) ;
                } else {

                    error( err ) ;
                }

            } else {

                success( newState , this.memory ) ;
            }
        } ) ;
    }

} ;

const env = process["express-routes-generator-cli"] ;

fs.readFile( memoryPath , 'utf-8' , ( err , content ) => {

    if( err ) return; // promise reject with timeout

    // hydrate local state memory
    env.memory = JSON.parse( content ) ;

    emitter.emit('env-hydrated' , env ) ;
} ) ;

module.exports = function() {

    let timeoutID = null ;
    let block = false ;

    return new Promise( ( resolve , reject ) => {

        timeoutID = setTimeout(() => {

            block = true;

            reject( MAX_TIME_READ_MEMORY ) ;

        }, MAX_TIME_READ_MEMORY );

        emitter.on('env-hydrated' , env => {

            if( block ) return;

            clearTimeout( timeoutID ) ;

            resolve( env ) ;

        } ) ;

    } ) ;
} ;
