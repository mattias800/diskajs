/* @flow */

import Singleton from './scopes/Singleton';

export default class As {

    args:any;

    constructor(args:any) {
        this.args = args;
    }

    asSingleton():void {
        this.args.setScope(Singleton);
    }


}
