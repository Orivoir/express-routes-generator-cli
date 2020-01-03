module.exports = class {

    constructor( args ) {

        this.args = args ;
        this._arguments = [...arguments] ;

        this.parse = {
            extras: []
        } ;

        this
            .trim()
            .explode()
            .transform()
            .type()
        ;

        if( this.parse.type === 'crud' ) {

            this.extras = this.parse.extras ;
            this.commandName = this.parse.commandName ;
            const name = this.parse.extras[0]

            delete this.parse.extras ;
            delete this.parse.commandName ;

            this.buildParams = this.parse ;
            this.buildParams.name = name ;

        }
    }

    type() {

        if( typeof this.parse.commandName !== 'string' ) {
            this.parse.commandName = "" ;
        }

        this.parse.commandName = this.parse.commandName.toLocaleLowerCase() ;

        if( /^build(e(r|d)?(\-?crud)?)?$/.test( this.parse.commandName ) ) {

            this.parse.type = "crud" ;
        }
        if( /^(re(\-?(set|start|run|go))|(clea(n|r)(\-memor(y|ies))?))$/.test( this.parse.commandName ) ) {

            this.parse.type = "reset" ;
        }

        return this ;
    }

    transform() {

        this.parse.commandName = this.args[0] ;

        this.args.slice(1 ,).forEach( arg => {

            if( arg instanceof Array ) {

                this.parse[ arg[0] ] = arg[1] ;

            }

            this.parse.extras.push( arg ) ;

        } ) ;
        return this;
    }

    explode() {

        this.args = this.args.map(arg => {
            if( arg.indexOf('=') !== -1 ) {

                return arg.split('=').map( val => val.trim() ) ;
            }

            return arg ;
        });

        return this;
    }

    trim() {

        this.args = this.args.map(arg => (
            arg.trim()
        ) );

        return this;
    }

    get args() {

        return this._args ;
    }
    set args( val ) {

        this._args = val ;
    }

} ;
