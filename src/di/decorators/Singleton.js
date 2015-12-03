import SingletonScope from "../bindings/scopes/SingletonScope";

function Singleton() {
    return (target) => {
        target.__diska = {
            ...target.__diska,
            scope : SingletonScope
        };
    };
}


export default Singleton;