/* @flow */
export default class Provider {

    get():any {
        throw Error('Provider subclasses must implement get().');
    }

}