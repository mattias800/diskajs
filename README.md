# diska

A lightweight DI framework in Javascript, inspired by Guice by Google.

## Installation

```
npm install diska
```

You could also download the repository and just reference the files directly.

`src/index.js` for ES6 sources.

`lib/index.js` for ES5 sources that was compiled from ES6 sources with Babel.

## Compatibility

* Node
* iojs
* React Native (use `react-native-webpack-server`)

## Example code

The tests contain a lot of sample code.
https://github.com/mattias800/diskajs/blob/master/test/di/InjectorSpec.js

You can also check out this repository to see how to setup diska with Node or React Native:

https://github.com/mattias800/diskajs-examples

## Dependency injection

To learn how dependency injection and Guice works, please see the Guice documentation.
All diska documentation assumes that you have previous experience with Guice and DI.
While this is not a clone of Guice, it is inspired by it and anyone who has used Guice
will be instantly familiar with diska.

## Full documentation

Please see the tests. They contain all implemented use cases.
https://github.com/mattias800/diskajs/blob/master/test/di/InjectorSpec.js

## Tutorial

#### About the examples

Most of these examples are copied from the tests.
Because of this, some module reference look different from how they would in application code.

```js
import {Provider} from '../../src/index';
```

This import statement for example, would be replaced with require() (depending on your environment).

```js
var Provider = require('diska');
```

### Injecting class instances

In diska, you use modules, providers and injectors.

The module defines the bindings, while the injector instantiates the objects.

```js
var module = new Module();
module.bind(Grinder).to(Grinder);
module.bind(CoffeeMaker).to(CoffeeMaker);
var injector = new Injector(module);
var coffeeMaker = injector.get(CoffeeMaker);
coffeeMaker.brew();
```

In this example, diska will try to create a `CoffeeMaker`. When doing so, it calls CoffeeMaker.inject()
and identifies that the `CoffeeMaker` requires a `Grinder`. 

```js
import {Grinder} from './Grinder';

export class CoffeeMaker {

    static inject() {
        return [Grinder];
    }

    constructor(grinder) {
        this.grinder = grinder;
    }

    brew() {
        this.grinder.grind();
        return 'brew';
    }
}
```

`Grinder` has no dependencies, so diska instantiates the `Grinder` by running its constructor
with no parameters.
 
```js
export class Grinder {

    static inject() {
        return [];
    }

    constructor() {

    }

    grind() {
        console.log('grinding...');
    }

}
```

The `Grinder` object is then passed into the `CoffeeMaker` constructor and 
diska then returns the `CoffeeMaker` object.

### inject() required

Classes that are injected must have a static method `inject` which returns a 
list of types (functions in ES5, classes in ES6) to inject.

(If they don't have an inject() method, we can still create them with a provider.
More on that below.)

#### ES5

If you are running ES5, you don't have classes. 
Instead, you can use functions and set the `inject` property on the function.

```js
var Grinder = require('./Grinder');

function CoffeeMaker(grinder) {

    this.grinder = grinder;
    
    this.brew = function() {
        this.grinder.grind();
        return 'brew';
    }
}

CoffeeMaker.inject = function() {
    return [Grinder];
}
```

### Modules

A module is a configuration that defines what the injector should inject.

```js
var module = new Module();
module.bind(Grinder).to(Grinder);
module.bind(CoffeeMaker).to(CoffeeMaker);
var injector = new Injector(module);
var coffeeMaker = injector.get(CoffeeMaker);
coffeeMaker.brew();
```

In this example we only have one type of Grinder and CoffeeMaker.
Binding a class to itself is optional and we can remove them.

```js
var module = new Module();
var injector = new Injector(module);
var coffeeMaker = injector.get(CoffeeMaker);
coffeeMaker.brew();
```

When there is no binding, and we try to inject `CoffeeMaker`, it will just inject `CoffeeMaker`.

But you could easily pass in a mock instead, for example when running tests.

```js
var module = new Module();
module.bind(Grinder).to(GrinderMock);
var injector = new Injector(module);
var coffeeMaker = injector.get(CoffeeMaker);
coffeeMaker.brew();
```

#### Using multiple modules

The injector constructor can take multiple arguments, where all arguments are modules,
or one array with modules.

```js
var module1 = new Module();
var module2 = new Module();
var injector = new Injector([module1, module2]);
```

```js
var module1 = new Module();
var module2 = new Module();
var injector = new Injector(module1, module2);
```

If multiple modules contain binding for the same type, the binding of the first module
in the array or arguments will be used.

### Providers

If the class we are trying to inject lacks an `inject()` method, the injector
won't know how to instantiate a class. It will fail with an exception.

```js
export class Wheel {

    constructor(material) {
        this.material = material;
    }

}
```

You can supply the module with a provider for Wheel. The provider must extend 
the Provider class in diska.

```js
import {Provider} from '../../src/index';
import {Wheel} from './Wheel';

export class WheelProvider extends Provider {

    get() {
        return new Wheel({ type: 'iron' });
    }
}
```

This way we delegate the responsibility of instantiating the class to the provider, and diska will 
instantiate the `WheelProvider` and run `get()` to get the Wheel instance.

#### Providers can have dependencies

If you want, you can add an `inject()` to your provider and these dependencies will be injected.

```js
import {Provider} from '../../src/index';
import {AnyString} from './AnyString';

export class InjectedAnyStringProvider extends Provider {

    static inject() {
        return [AnyString];
    }

    constructor(incString) {
        super();
        this.incString = incString;
    }

    get() {
        return this.incString;
    }

}
```

### Singletons

Some objects, such as services, should be reused and only instantiated once.
That instance will be reused whereever it is needed.

```js
module.bind(UserService).to(UserServiceRestApi).asSingleton();
```

`UserServiceRestApi` will be instantiated the first time it is injected, 
and after that, whenever a class needs a `UserService`, that instance of the
`UserServiceRestApi` object will be injected.

#### Singletons and providers

You can use providers to instantiate singletons as well.

```js
module.bind(UserService).toProvider(UserServiceProvider).asSingleton();
```

When a class depends on a `UserService` the `UserServiceProvider` will be
instantiated, `get()` will be called and the returned object will be reused
whenever any other class depends on `UserService`.
The provider will only be instantiated once, and `get()` will only be called once.

### Child injectors

diska supports child injectors.
You can get a child injector from an injector by calling `injector.getChildInjector()`
with one or more modules for the child injector as argument.

```js
var module = new Module();
module.bind(GlobalService).toProvider(GlobalServiceProvider).asSingleton();
var injector = new Injector(module);
var childModule = new Module();
childModule.bind(LocalService).toProvider(LocalServiceProvider);
var childInjector = injector.getChildInjector(childModule);
var service = childInjector.get(LocalService);
var error = injector.get(LocalService); // Throws exception
```

Modules added to the child injectors will not be available in the parent injector.
The bindings in the child injector module are derived from the parent injector module.
If the binding already exists in the parent, it is overridden.

## Issues

Did you find any issues? Did you fix a bug?
Please create a ticket or send a pull request.

## Running the tests

```
npm test
```

If you have Wallaby, you can open the project in IntelliJ and start Wallaby.

## In the future

#### ES7 decorators

Support for ES7 decorators, with `@Inject`, `@Provider` and `@Singleton`.
This will complement `inject()`, so that you can use either one.
This feature is in development.

