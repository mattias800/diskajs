# diska

A lightweight DI framework in Javascript, inspired by Guice by Google.

## Information on Babel 6

Babel 6 doesn't support decorators, which is an important part of diska.
There is a Babel plugin that provides support for legacy decorators, which works the same way they did in Babel 5.
This plugig works with diska, and it is recommended until Babel 6 supports decorators officially.
https://www.npmjs.com/package/babel-plugin-transform-decorators-legacy

React Native supports custom babelrc as of 0.20 which makes it easy to add this plugin.

## Information on React Native

RN 0.15 and older uses Babel 5 and diska works out of the box.
RN 0.16-0.19 uses Babel 6, but uses it's own internal babelrc.
To use diska, you need to patch the babelrc file.
It is recommended to upgrade to RN 0.20 or later, and then add `babel-plugin-transform-decorators-legacy`.

## Releases

#### 1.1.4 (2016-02-26)
* Removed .babelrc from distributed package.

#### 1.1.3 (2016-02-23)
* Bug fix

#### 1.1.2 (2016-02-23)
* New way of creating instances which doesn't create an intermediary object of type Temp. Types are now correct in all ways.
* Added defaultInjector which is empty, and can be used when not needing to bind any types explicitly in a module.

```js
import { defaultInjector } from "diskajs";
import MySweetClass from "./MySweetClass";

let obj = defaultInjector.get(MySweetClass);
```

#### 1.1.1 (2016-01-16)
* Support for injecting the injector

#### 1.1.0 (2015-12-17)
* Support for decorators, @Singleton() and @Inject().

Breaking changes
* Injection based on constructor argument names no longer supported.

#### 1.0.1
* Bug fixes

#### 1.0.0 
* First official release
* Support for injection based on constructor argument names
* Support for static inject()
* Support for modules
* Support for child injectors
* Support for providers

## Installation

```
npm install diskajs --save-dev
```

## Compatibility

* Babel 5.x 
* Babel 6.x (use `babel-plugin-transform-decorators-legacy`)
* React Native 0.15
* React Native 0.16-19 (no support for decorators unless you patch RN's internal babelrc, uses Babel 6)
* React Native 0.20- (add `babel-plugin-transform-decorators-legacy` to babelrc) 

## Example code

The tests contain a lot of sample code. They test all features of diska.

You can find most of them here:
https://github.com/mattias800/diskajs/blob/master/test/di/InjectorSpec.js

You can also check out this repository to see how to setup diska with Node or React Native:

https://github.com/mattias800/diskajs-examples

These have not been updated in a while though, and do not use decorators.
Also, they were made for an older version of React Native where Webpack was required for diska to work.
You can use diska in React Native projects without Webpack now.

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
import UserFactory from "./UserFactory";
const module = new Module();
const injector = new Injector(module);
const userFactory = injector.get(UserFactory);
```

This should give you an instance of UserFactory.

#### But what does the UserFactory look like?

All classes that are instantiated by diska must either

1. Be decorated with `@Inject()` or
2. have a `static inject()` method that returns a list of types to be injected.

`UserFactory` can look like this:

```js
@Inject()
export default class UserFactory {

  createUser() {
    return {};
  }  

}
```

The `@Inject()` decorator tells diska that this class can be instantiated, and has no dependencies. 
It creates the instance by running the constructor with no arguments.

#### What if we can't use decorators?

Use `static inject()` instead. It is a method that must return a list of dependency types.
If there are no dependencies, it should just return an empty list.
 
```js
export default class UserFactory {

  static inject() {
    return [];     
  }
     
  createUser() {
    return {};
  }

}
```

#### But how do I add a dependency?

To add a dependency, import it, add it to `@Inject` parameters and add a constructor argument.

```js
import UserDecorator from "./UserDecorator";
import {Inject} from "diskajs";

@Inject(UserDecorator)
export default class UserFactory {

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

Just add more types to the `@Inject(...)` decoration.

```js
import UserDecorator from "./UserDecorator";
import UserTransformer from "./UserTransformer";
import {Inject} from "diskajs";

@Inject(UserDecorator, UserTransformer)
export default class UserFactory {

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

The injected dependency instances are passed to the constructor in the same order as they are 
specified in the `@Inject()` decoration.
In this case, the `UserDecorator` instance will be passed as first argument, and `UserTransformer` as the second argument.

If any of these classes have dependencies, diska will try to instantiate them as well.
This is repeated recursively until it has created all dependencies in the object tree, or until it reaches a dependency 
that it cannot create, in which case an exception is thrown.

#### What if I want to inject a very specific instance of an object?

You can do that when binding.

```js
import User from "./User";
let myVerySpecificUser = new User(1);
const module = new Module();
module.bind(User).toInstance(myVerySpecificUser);
```

#### What if we have a mock version of `UserFactory` that we want to use in our tests?

You can bind another type to it. Setup a new module that is used just for tests (are that specific test).

```js
const module = new Module();
module.bind(UserFactory).to(MockedUserFactory);
const injector = new Injector(module);
const userFactory = injector.get(UserFactory);
```

#### What if we want the `UserFactory` to be a singleton, so that we reuse it instead of creating new instances all the time?

Add `@Singleton()` to the class.

```js
import UserDecorator from "./UserDecorator";
import {Inject, Singleton} from "diskajs";

@Inject(UserDecorator)
@Singleton()
export default class UserFactory {

  userDecorator:UserDecorator;
    
  constructor(userDecorator:UserDecorator) {
    this.userDecorator = userDecorator;
  }
    
  createUser() {
    return this.userDecorator.decorate({});
  }

}
```

### What if I need the injector to get instances manually?

Just inject it.

```js
import {Inject, Injector} from "diskajs";

@Inject(Injector)
export default class ClassWithInjector {

  injector:Injector;

  constructor(injector:Injector) {
    this.injector = injector;  
  }
  
}
```


#### What if we want to declare it as singleton in the binding, instead of forcing the class to always be a singleton?

Just add `.asSingleton()` to the binding.
```js
const module = new Module();
module.bind(UserFactory).to(UserFactory).asSingleton();
const injector = new Injector(module);
const userFactory = injector.get(UserFactory);
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
const module = new Module();
module.bind(Grinder).to(Grinder);
module.bind(CoffeeMaker).to(CoffeeMaker);
const injector = new Injector(module);
const coffeeMaker = injector.get(CoffeeMaker);
coffeeMaker.brew();
```

In this example we only have one type of Grinder and CoffeeMaker.
Binding a class to itself is optional and we can remove them.

```js
const module = new Module();
const injector = new Injector(module);
const coffeeMaker = injector.get(CoffeeMaker);
coffeeMaker.brew();
```

When there is no binding for that type in th emodul and we try to inject `CoffeeMaker`, 
it will just inject an instance of `CoffeeMaker`.

#### Using multiple modules

The injector constructor can take multiple arguments where all arguments are modules, 
or one argument that is an array of modules.

```js
// One argument that is an array of modules
const module1 = new Module();
const module2 = new Module();
const injector = new Injector([module1, module2]);
```

```js
// Several arguments that are all modules
const module1 = new Module();
const module2 = new Module();
const injector = new Injector(module1, module2);
```

If multiple modules contain binding for the same type, the binding of the first module
in the array or arguments will be used.

#### Unit tests

When testing, you typically create a separate testing module that is used to create instances in your tests.
The injector that is created with that module can then be imported in your test code and used to create instances.

```js
import {testInjector} from 'path/to/testInjector';
import ArrayUtil from 'path/to/ArrayUtil';

const arrayUtil:ArrayUtil = testInjector.get(ArrayUtil);

describe("ArrayUtil", () => {
  it("should ...", () => {
    // expect()...
  });
});
```

If a test requires something specific for that test only, you can create a local module, and a child injector with that module.

```js
import {Injector, Module} from "diskajs";

import {testInjector} from 'path/to/testInjector';
import ArrayUtil from 'path/to/ArrayUtil';
import ArrayUtilMock from 'path/to/ArrayUtilMock';

const localModule = new Module();
module.bind(ArrayUtil).to(ArrayUtilMock);

const localInjector = testInjector.getChildInjector(localModule);

const arrayUtil:ArrayUtil = localInjector.get(ArrayUtil);

// arrayUtil is an ArrayUtilMock instance

describe("ArrayUtil", () => {
  it("should ...", () => {
    // expect()...
  });
});
```

More on child injectors further down.

### Providers

If the class we are trying to inject lacks an `@Inject()` decoration (or `static inject()`), the injector
won't know how to instantiate a class. It will fail with an exception.

```js
export class Wheel {

  constructor(material) {
    this.material = material;
  }

}
```

You can supply the module with a provider for `Wheel`. The provider must extend the `Provider` class in diska.

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
instantiate `WheelProvider` and run `get()` to get the Wheel instance.

#### Providers can have dependencies

If you want, you can add an `@Inject()` (or `static inject()`) to your provider and these dependencies will be injected.

```js
import {Provider} from 'diskajs';
import {SomeDependency} from './SomeDependency';

@Inject(SomeDependency)
export class SomeProvider extends Provider {

  someDependency:SomeDependency;
  
  constructor(someDependency:SomeDependency) {
    super();
    this.someDependency = someDependency;
  }

  get() {
    return this.someDependency.createAwesomeStuff();
  }

}
```

### Singletons

Some objects, such as services and transformers, should be reused and only instantiated once.

```js
module.bind(UserService).to(UserServiceRestApi).asSingleton();
```

`UserServiceRestApi` will be instantiated the first time it is injected, 
and after that, whenever a class needs a `UserService`, that instance of the
`UserServiceRestApi` object will be injected.

You can also decorate the `UserService` or `UserServiceRestApi` class with `@Singleton()`.

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
You can get a child injector from an injector by calling `injector.getChildInjector()` with one or more modules 
for the child injector as argument.

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

Modules added to the child injectors will not be added to the parent injector.

The bindings in the child injector module are derived from the parent injector module and the parent 
injector is not changed in any way.

If the binding already exists in the parent, it is overridden for the child injector.

## Running the tests

```
npm test
```

If you have Wallaby, you can open the project in IntelliJ and start Wallaby.

## Issues

Did you find any issues? Did you fix a bug?
Please create a ticket or send a pull request.

## License

Copyright (c) 2015, Mattias Andersson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
