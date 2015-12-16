# diska

A lightweight DI framework in Javascript, inspired by Guice by Google.

## Information on Babel 6

Babel 6 doesn't support decorators, which is an important part of diska.
If you use Babel 6 to compile your code, you can still use diska without decorators.

The distributed version of diska (in NPM) is compiled with Babel 5 until this is resolved by the Babel team.
 
There is a plugin for Babel 6 that adds support for decorators, but we haven't tried it.
https://www.npmjs.com/package/babel-plugin-transform-decorators-legacy

## Installation

```
npm install diskajs --save-dev
```

You could also download the repository and just reference the files directly.

`src/index.js` for ES6+ (Babel) sources.

`lib/index.js` for ES5 sources that was compiled from ES6 sources with Babel.

## Compatibility

* Babel 5.x (all features)
* Babel 6.x (no decorators)

diska works with everything if you compile your code with Babel.

* Node
* React Native 0.15 (all features, uses Babel 5)
* React Native 0.16 (no decorators, uses Babel 6)

## Example code

The tests contain a lot of sample code. They test all features of diska.

https://github.com/mattias800/diskajs/blob/master/test/di/InjectorSpec.js

You can also check out this repository to see how to setup diska with Node or React Native:

https://github.com/mattias800/diskajs-examples

## Dependency injection

To learn how dependency injection and Guice works, please see the Guice documentation.
All diska documentation assumes that you have previous experience with Guice and DI.
While this is not a clone of Guice, it is inspired by it and anyone who has used Guice
will be instantly familiar with diska.

## Tutorial

First things first; To start injecting, you need an injector.
And to get an injector, you need a module that defines what to inject.

Let's start with an empty module.

```js
const module = new Module();
const injector = new Injector(module);
const userFactory:UserFactory = injector.get(UserFactory);
```

This should give you an instance of UserFactory.
But what does the UserFactory look like?

All classes that are instantiated by diska must either
1. Be decorated with `@Inject()` or
2. have a `static inject()` method that returns a list of types to be injected.

`UserFactory` can look like this:

```js
@Inject()
export class UserFactory {

	createUser() {
		return {};
	}
}
```

The `@Inject()` tells diska that this class can be instantiated, and has no dependencies. 
It creates the instance by running the constructor with no arguments.

#### What if we can't use decorators?

```js
@Inject()
export class UserFactory {

	static inject() {
		return [];		 
	}
		 
	createUser() {
		return {};
	}
}
```

To add a dependency, import it, add it to `@Inject` parameters and add a constructor argument.

```js
import UserDecorator from "./UserDecorator";
import {Inject} from "diskajs";

@Inject(UserDecorator)
export class UserFactory {

	userDecorator:UserDecorator;
		
	constructor(userDecorator:UserDecorator) {
		this.userDecorator = userDecorator;
	}
		
	createUser() {
		return this.userDecorator.decorate({});
	}
}
```

If you cannot use decorators, add the dependency to the list returned by `static inject()`.

```js
static inject() {
	return [UserDecorator];		 
}
```

Now when diska tries to create an instance, it finds that it needs a `UserDecorator` instance, 
so it creates an instance of it in the same way it is trying to create an instance of `UserDecorator`.

#### What if you have more than one dependency?

```js
import UserDecorator from "./UserDecorator";
import {Inject} from "diskajs";

@Inject(UserDecorator, UserTransformer)
export class UserFactory {

	userDecorator:UserDecorator;
	userTransformer:UserTransformer;
		
	constructor(userDecorator:UserDecorator,
							userTransformer:UserTransformer) {
		this.userDecorator = userDecorator;
		this.userTransformer = userTransformer;
	}
		
	createUser() {
		return this.userDecorator.decorate({});
	}
}
```

The injected dependencies are passed to the constructor in the same order as in the `@Inject()` decoration.
In this case, the UserDecorator instance will be passed as first argument, and UserTransformer as the second argument.

If any of these classes have dependencies, diska will try to instantiate them as well.
This is repeated recursively until it has created all dependencies in the object tree (or fails).

#### What if we have a mock version of `UserFactory` that we want to use in our tests?

Just bind the mock version.

```js
const module = new Module();
module.bind(UserFactory).to(MockedUserFactory);
const injector = new Injector(module);
const userFactory:UserFactory = injector.get(UserFactory);
```

#### What if we want the `UserFactory` to be a singleton, so that we reuse it instead of creating new instances all the time?

Add `@Singleton()` to the class.

```js
import UserDecorator from "./UserDecorator";
import {Inject, Singleton} from "diskajs";

@Inject(UserDecorator)
@Singleton()
export class UserFactory {

		userDecorator:UserDecorator;
		
		constructor(userDecorator:UserDecorator) {
				this.userDecorator = userDecorator;
		}
		
    createUser() {
      return this.userDecorator.decorate({});
    }
}
```

#### What if we want to declare it as singleton in the binding, instead of forcing the class to always be a singleton?

Just add `.asSingleton()` to the binding.
```js
const module = new Module();
module.bind(UserFactory).to(UserFactory).asSingleton();
const injector = new Injector(module);
const userFactory:UserFactory = injector.get(UserFactory);
```

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

#### Unit tests

When testing, you typically create a module that is used to create instances in the tests.
The injector that is created from that module can then be imported into your test modules and used to create instances.

If a test requires something specific for that test only, you can create a local module, and a child injector with that module.
More on child injectors further down.

### Providers

If the class we are trying to inject lacks a `@Inject()` (or `static inject()`), the injector
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
import {Provider} from 'diskajs';
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

If you want, you can add an `@Inject()` (or `static inject()`) to your provider and these dependencies will be injected.

```js
import {Provider} from 'diska';
import {AnyString} from './AnyString';

@Inject(AnyString)
export class InjectedAnyStringProvider extends Provider {

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

```js
module.bind(UserService).to(UserServiceRestApi).asSingleton();
```

`UserServiceRestApi` will be instantiated the first time it is injected, 
and after that, whenever a class needs a `UserService`, that instance of the
`UserServiceRestApi` object will be injected.

You can also decorate `UserServiceRestApi` with `@Singleton()`.

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
The bindings in the child injector module are derived from the parent injector module and the parent injector is not changed in any way.
If the binding already exists in the parent, it is overridden for the child injector.

## Running the tests

```
npm test
```

If you have Wallaby, you can open the project in IntelliJ and start Wallaby.

## Issues

Did you find any issues? Did you fix a bug?
Please create a ticket or send a pull request.
