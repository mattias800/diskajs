/* @flow */
export default class Provider {

    get():any {
        if (this instanceof Provider) {
            throw Error('Provider subclasses must implement get().');
        }
        return undefined;
    }

}