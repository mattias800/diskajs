/* @flow */

import SingletonScope from './scopes/SingletonScope';

export default class As {

    args:any;

    constructor(args:any) {
        this.args = args;
    }

    asSingleton() {
        this.args.setScope(SingletonScope);
    }


}
