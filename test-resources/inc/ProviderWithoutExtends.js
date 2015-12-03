import IncString from './IncString';

export default class ProviderWithoutExtends {

    static inject() {
        return [IncString];
    }

    constructor(anyString) {
        this.anyString = anyString;
    }

    get() {
        return this.anyString;
    }
}

