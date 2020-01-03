const env = process["express-routes-generator-cli"] ;

module.exports = function() {

    const dir = __dirname ;

    if( dir.indexOf('node_modules') === -1 ) {
        // local dev usage
        env.shot.devUse = true ;

        return env.shot.params.parse['dev-use'] || null;

    } else {

        env.shot.devUse = false;

        let found = false;

        return dir.split('\\').join('/').split('/').filter( ressource => {

            if( found ) return false;

            if( /node_modules/.test( ressource ) ) {

                found = true;
                return false;
            }

            return true ;

        } ).join('/') ;
    }
} ;
