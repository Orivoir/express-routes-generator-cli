const buildRoutes = require('express-routes-generator') ;

module.exports = function( next ) {

    const env = process['express-routes-generator-cli'] ;
    const {shot,memory} = env ;

    const {buildParams} = shot.params ;

    if( buildParams ) {

        ['getOne','update','delete','create'].forEach( routeName => {

            if( typeof buildParams[ routeName ] === 'string' ) {

                const val = buildParams[ routeName ] ;
                buildParams[ routeName ] = {
                    route: val
                } ;
            }

        } ) ;

        // persist buildName if not exists
        if( !memory.buildNames.find( buildName => buildName === shot.params.buildParams.name ) ) {

            env.setState( {
                buildNames: [ ...memory.buildNames , shot.params.buildParams.name ]
            } ) ;

        }

        return buildRoutes( shot.params.buildParams ) ;

    } else {

        next() ;
        return false;
    }

} ;
