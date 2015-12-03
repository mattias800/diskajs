function Inject() {
    var typesToInject = convertArgumentsToArray(arguments);
    return (target) => {
        target.__diska = {
            ...target.__diska,
            inject : typesToInject
        };
    };
}

function convertArgumentsToArray(list) {
    var arrayList = [];
    for (var i = 0; i < list.length; i++) {
        arrayList.push(list[i]);
    }
    return arrayList;
}

export default Inject;
