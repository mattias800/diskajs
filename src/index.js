import Module from './di/Module';
import Injector from './di/Injector';
import Provider from './di/Provider';
import Inject from "./di/decorators/Inject";
import Singleton from "./di/decorators/Singleton";

const defaultInjector = new Injector(new Module());

export {
    Module,
    Injector,
    Provider,
    Inject,
    Singleton,
    defaultInjector
};
