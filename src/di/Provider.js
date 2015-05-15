export class Provider {

    get() {
        throw Error('Provider subclasses must implement get().');
    }

}