```
  ______          ______                _       
 |  ____|        |  ____|              (_)      
 | |__    __  __ | |__    __  __        _   ___ 
 |  __|   \ \/ / |  __|   \ \/ /       | | / __|
 | |____   >  <  | |____   >  <   _    | | \__ \
 |______| /_/\_\ |______| /_/\_\ (_)   | | |___/
                                      _/ |      
                                     |__/       
```



# Exceptional Exceptions for Javascript
When building advanced javascript application full featured error handling is required, unfortunatelly javascript does not provide it out of the box. Ever wantend used flavor of java exceptions in javascript? Here it is.

## Multiple exception classes with inheritance
```javascript
var ApplicationError = defineError({name: 'ApplicationError', message: 'General application error'});
var ServiceError = defineError({name: 'ServiceError', message: 'Service error', parent: ApplicationError});
var UserInterfaceError = defineError({name: 'UserInterfaceError', message: 'Service error', parent: ApplicationError});

try {
    throw new UserInterfaceError();
} catch (e) {
    console.log(e instanceof UserInterfaceError); // true
    console.log(e instanceof ApplicationError); // true
    console.log(e instanceof Error); // true
    console.log(e instanceof ServiceError); // false
    
    if (e instanceof UserInterfaceError) {
        resolveUserInterfaceError(e);
    }
    else if (e instanceof ServiceError) {
        resolveServiceError(e);
    }
    else if (e instanceof ApplicationError) {
        resolveGenericApplicationError(e);
    }
    else if (e instanceof Error) {
        resolveGenericError(e);
    }
}
```

## Exception chaining
```javascript
var DatabaseError = defineError({name: 'DatabaseError', message: 'Database error', parent: ApplicationError});
var UserInterfaceError = defineError({name: 'UserInterfaceError', message: 'Service error', parent: ApplicationError});

try {
    throw new DatabaseError('There was error during loading data from database');
} catch (e) {
    throw new UserInterfaceError('Cannot render user interface').withPreviousError(e);
}
```
@todo: example of stack trace here

## Parametrized exceptions
```javascript
var DatabaseError = defineError({name: 'DatabaseError', message: 'There was error during loading data from table {dbtable} of database {db}'});

try {
    throw new DatabaseError({params: {db: 'myapp', dbtable: 'posts'}});
} catch (e) {
    console.log(e.message); // There was error during loading data from table posts of database myapp
}
```

## Extending exceptions
```javascript
var ServiceError = defineError({
        name: 'ServiceError', 
        extend: {
            resolve: function() {
                GlobalExceptionManager.log(this);
            }
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

## Clever stacktraces and compatibility
@todo: why we call exceptions as errors - js compat
@todo: example of stack trace here  
@todo: exaple of exception naming  
@todo: compatibility  

## Adapters for well known network error loggers
@todo: sentry



