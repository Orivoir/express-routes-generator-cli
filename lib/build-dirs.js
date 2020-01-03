const path = require('path') ;

module.exports = function() {

    const env = process["express-routes-generator-cli"] ;

    const createDir = require('./create-dir') ;
    const root = env.shot.clientDir ;
    const buildIn = env.memory.buildIn ;

    let rootCreate = root ;
    let stop = false;
    let createCount = 0;

    buildIn.forEach( directoryName => {

        if( stop ) return;

        const status = createDir( rootCreate , directoryName ) ;

        rootCreate = path.join( rootCreate , directoryName ) ;

        if( status ) {

            if( typeof status !== 'string' ) {

                createCount++;
                env.shot.outputColor.success( 'success create directory : ' , directoryName );
            } else {
                // dir already exists
            }
        } else {

            stop = true;
        }

    } ) ;

    return createCount ;

} ;