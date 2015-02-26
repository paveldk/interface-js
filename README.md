# interface-js
Simple Interface implementation for js

## How it helps

Interface.create accept object as parameter and returns an Interface object. When you create an instance of your Interface you have to pass again an object as parameter. It will then check if the object you passed contains all parameters of the object you passed when creating the Interface. It will also check their Data Type, and works recursive as well.


## How to use

By setting a default value you are setting the required value type. Which means that when the interface is implemented if the implementation does not provide the required type or is missing it will throw error.

```javascript
  var MyInterface = Interface.create({
    id: "MyInterface" // id is required so it can later log eventual errors
    boolP: false, // requires boolean in implementation; could be false/true
    stringP: "", // requires string in implementation; could be any string
    numberP: 0, // requires number in implementation; could be any number
    arrayP: [], // requires array in implementation; could be empty or not array
    objP: { // requires object in implementation
      subObj: 5 // requires number in implementation
    }
  });
  
  var myObject = new MyInterface({
    boolP: false, 
    stringP: "Hello World",
    numberP: 10,
    arrayP: [1, 2, 3],
    objP: {
      subObj: 10
    }
  });
  
  var myObj = new MyInterface({
    stringP: "Sad Face"
  }); // this will error into "MyInterface.boolP has not been implemented"
```
