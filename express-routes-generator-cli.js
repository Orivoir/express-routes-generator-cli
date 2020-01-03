#!/usr/bin/env node

const
    args = process.argv.slice( 2 , ) ,
    hydrateEnv = require('./lib/env-vars') ,
    NormalizeParams = require('./lib/normalize-params') ,
    clientDir = require('./lib/client-dir') ,
    fs = require('fs') ,
    outputColor = require('./lib/output-color') ,
    CheckParams = require('./lib/check-params') ,
    buildRoutes = require('express-routes-generator') ,
    reader = require('./lib/readLine') ,
    path = require('path')
;

const execCrud = ( outputColor , env , caller , model , first ) => {

    reader( 'buildIn' ) ;
    // build structure dirs
    const countCreateDirs = require('./lib/build-dirs')() ;

    outputColor.info('have append :' , (  countCreateDirs + ' directories' ) ) ;

    const heroePush = path.join( env.shot.clientDir , env.memory.buildIn.join('/') ) ;
    const buildName = env.shot.params.buildParams.name ;

    fs.writeFileSync( path.join( heroePush , (buildName + '.js') ) , first.content ) ;

    outputColor.success( 'success create file crud : ' , ( buildName + '.js' ) ) ;

    const modelContent = fs.readFileSync( model , 'utf-8' ) ;
    fs.writeFileSync( path.join( heroePush , ( 'model-route.js' ) ) , modelContent ) ;
    // console.log( modelContent );

    outputColor.success('success create file : ' , 'model-route.js' ) ;

    fs.writeFileSync( path.join( heroePush , 'all-routes.js' ) , caller.content ) ;

    outputColor.success( 'success create file : ' , 'all-routes.js' )
} ;

hydrateEnv().then( env => {

    const params = new NormalizeParams( args ) ;

    env.shot.params = params ;

    env.shot.clientDir = clientDir() ;
    env.shot.outputColor = outputColor ;

    const checkParams = new CheckParams( params ) ;

    if( !env.shot.clientDir || !fs.existsSync( env.shot.clientDir )  ) {

        throw 'client directory not resolve ' ;
    }

    // env is hydrated with success

    if( env.shot.devUse ) {

        outputColor.info('info' , 'exec in mode dev' ) ;
    }

    if( !checkParams.isValidCommandName ) {

        outputColor.error('error : ' ,  (params.parse.commandName + ' is not valid command name' ) ) ;

    } else {

        // command is valid

        const executer = require('./lib/commands/endpoint') ;
        executer().then( responses => {

            const first = responses[ 0 ] ;

            if( first.code ) {
                // crud build

                if( first.success ) {
                    // build success

                    const model = buildRoutes.sync( {
                        type: 'model-route'
                    } ).content; // absolute path model routes

                    const caller = buildRoutes.sync( {

                        type: 'caller' ,
                        with: env.memory.buildNames
                    } ) ;

                    if( env.shot.iWrite ) {
                        env.shot.endWrite.push( () => execCrud( outputColor , env , caller , model , first ) ) ;
                    } else {
                        execCrud( outputColor , env  , caller , model , first ) ;
                    }

                } else {


                }


            } else {
                // reset memory
                outputColor.success('memory reset success' , 'default value affect') ;
            }

        } ).catch( () => {

            throw 'endpoint error executers' ;

        } ) ;

    }

} ).catch( (details) => {

    console.log( "errors details : " + details );
    throw 'hydrate local state reject' ;
} ) ;
