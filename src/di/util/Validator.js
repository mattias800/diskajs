/* @flow */
export default class Validator {

    validateListOnlyContainsInstancesOf(list:Array<any>, type:any, message:string):boolean {
        if (list === undefined) {
            throw Error(message);
        }
        if (type === undefined) {
            throw Error(message);
        }
        if (list && list.length) {
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if (!(item instanceof type)) {
                    throw Error(message);
                }
            }
        }
        return true;
    }

}
