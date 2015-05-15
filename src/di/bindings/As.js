import {Singleton} from './scopes/Singleton';

export class As {

    constructor(args) {
        this.args = args;
    }

    asSingleton() {
        this.args.setScope(Singleton);
    }


}
