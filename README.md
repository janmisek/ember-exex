# Ember-exex: Exceptional Exceptions for ambitious applications

```
  _____           _                                       
 | ____|_ __ ___ | |__   ___ _ __       _____  _______  __
 |  _| | '_ ` _ \| '_ \ / _ \ '__|____ / _ \ \/ / _ \ \/ /
 | |___| | | | | | |_) |  __/ | |_____|  __/>  <  __/>  < 
 |_____|_| |_| |_|_.__/ \___|_|        \___/_/\_\___/_/\_\
                                                               
```

[![Build Status](https://travis-ci.org/janmisek/ember-exex.svg)](https://travis-ci.org/janmisek/ember-exex) 
[![Ember Observer Score](http://emberobserver.com/badges/ember-exex.svg)](https://emberobserver.com/addons/ember-exex)

## Why ember exex

When building advanced javascript application full featured error handling is required, but unfortunately it is not provided in javascript out of the box. Taste flavor of Java like exceptions in javascript:
- Custom error classes
- Re-throwing of an error with additional context and original error
- Additonal tooling

## Console example

![alt tag](https://raw.githubusercontent.com/janmisek/ember-exex/master/github/error.png)

## Compatiblity
[![Build Status](https://saucelabs.com/browser-matrix/janmisek.svg)](https://saucelabs.com/u/janmisek)

## Install
```
ember install ember-exex

```

## Multiple error classes with inheritance
```javascript

import {defineError} from 'ember-exex/error';

const ApplicationError = defineError({
    name: 'ApplicationError', 
    message: 'General application error'
});

const ServiceError = defineError({
    name: 'ServiceError', 
    message: 'Service error', 
    extends: ApplicationError
});

const UserInterfaceError = defineError({
    name: 'UserInterfaceError', 
    message: 'Service error', 
    extends: ApplicationError
});

try {
    throw new UserInterfaceError();
} catch (e) {

    console.log(e instanceof UserInterfaceError); // true
    console.log(e instanceof ApplicationError); // true
    console.log(e instanceof Error); // true
    console.log(e instanceof ServiceError); // false
    
    if (e instanceof UserInterfaceError) {
        resolveUserInterfaceError(e);
    } else if (e instanceof ServiceError) {
        resolveServiceError(e);
    } else if (e instanceof ApplicationError) {
        resolveGenericApplicationError(e);
    } else if (e instanceof Error) {
        resolveGenericError(e);
    }
}
```

## Re-throwing error with wrapped catched error

```javascript

import {defineError} from 'ember-exex/error';

const DatabaseError = defineError({
    name: 'DatabaseError', 
    message: 'Database error', 
    extends: ApplicationError
});
      
const UserInterfaceError = defineError({
    name: 'UserInterfaceError', 
    message: 'Service error', 
    extends: ApplicationError
});

try {
    throw new DatabaseError('Database IO error')
} catch (e) {
    throw new UserInterfaceError('Cannot render user interface')
        .withPreviousError(e);
}
```

Wrapped error is included as string in `error.stack` and stored as property on wrapping error `error.previous`


## Parametrized error messages
```javascript

import {defineError} from 'ember-exex/error';

const DatabaseError = defineError({
    name: 'DatabaseError', 
    message: "Database IO error at table '{table}' in '{db}'"
});

try {
    throw new DatabaseError({params: {db: 'mydb', table: 'posts'}});
} catch (e) {
    console.log(e.message); // Database IO error at 'posts' in 'mydb'
}
```

## Extending errors
```javascript

import {defineError} from 'ember-exex/error';

const ServiceError = defineError({
     name: 'ServiceError', 
     resolve: function() {
         GlobalExceptionManager.log(this);
     }
});

try {
    throw new ServiceError();
} catch (e) {
    if (e instanceof ServiceError) {
        e.resolve();
    } else {
        // do something else
    }
}
```



