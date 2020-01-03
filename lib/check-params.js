module.exports = class {

    constructor( params ) {

        this.params = params;
    }

    get isValidCommandName() {

        return !!this.commandValid.includes( (this.params.commandName || this.params.parse.commandName) ) ;
    }

    get commandValid() {

        return ['build' , 'reset' ] ;
    }

} ;
