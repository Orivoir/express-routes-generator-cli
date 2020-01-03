const reader = require('readline-sync') ;

const types = ['crudName' , 'buildIn' ] ;

module.exports = function( type ) {

    const env = process["express-routes-generator-cli"] ;

    const {memory} = env;

    if( typeof type !== 'string' || !types.includes( type ) ) {

        throw new RangeError( 'arg1 should be an valid type reader line' ) ;
    }

    if( type === 'buildIn' ) {

        const ok = reader.keyInYN(`build in "./${memory.buildIn.join('/')}"`) ;

        if( ok || typeof ok === 'string' ) {

            return;
        } else {
            let getBuildIn = reader.question(`where buildIn [./${memory.buildIn.join('/')}] : `) ;

            if( getBuildIn.length >= 2 && getBuildIn.length < 255 ) {
                getBuildIn = getBuildIn.split('\\').join('/').split('/').filter( r => /[a-z]/.test(r) && r.length  ) ;

                env.setState( {
                    "buildIn": getBuildIn
                } ) ;

            } else if( getBuildIn.trim().length ) {
                env.shot.outputColor.error('error ' , ('cant build : ' + getBuildIn) ) ;
            } else {
                env.shot.outputColor.info('persist ' , ('build in  : ./'+memory.buildIn.join('/') ) ) ;
            }
        }

    } else {



    }

} ;
