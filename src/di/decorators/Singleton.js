function Singleton() {
    return (target) => {
        target.__diska = {
            ...target.__diska,
            scope : 'singleton'
        };
    };
}


export default Singleton;