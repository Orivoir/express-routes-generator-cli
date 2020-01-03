module.exports = function( next ) {

    const env = process['express-routes-generator-cli'] ;
    const {shot} = env ;

    if( shot.params.parse.commandName === 'reset' ) {

        return new Promise( (resolve,reject) => {

            // reset memory to default value
            env.setState( {"buildNames":[],"buildIn":["routes"]} , ( newState , state ) => {

                resolve( state ) ;

            } , err => {

                reject( err ) ;
            }  ) ;

        } ) ;

    } else {

        next() ;
        return false;
    }

} ;
