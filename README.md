# interface-js
Simple Interface implementation for js

## How it helps

Interface.create accept object as parameter and returns an Interface object. When you create an instance of your Interface you have to pass again an object as parameter. It will then check for:
- all parameters implemented(recursive)
- parameters Data Type is correct in implementation
- number of function arguments is correct in implementation


## How to use

By setting a default value you are setting the required value type. Which means that when the interface is implemented if the implementation does not provide the required type or is missing it will throw error.

```javascript
  // pass id which is needed for loging eventual errors and the interface itself
  var MyInterface = Interface.create("MyInterfaceID", {
    boolP: false, // requires boolean in implementation; could be false/true
    stringP: "", // requires string in implementation; could be any string
    numberP: 0, // requires number in implementation; could be any number
    arrayP: [], // requires array in implementation; could be empty or not array
    objP: { // requires object in implementation
      subObj: 5 // requires number in implementation
    },
    funcP: function(a, b, c) {} //requires function in implementation and that function should have the same number of arguments
  });
  
  var myObject = new MyInterface({
    boolP: false, 
    stringP: "Hello World",
    numberP: 10,
    arrayP: [1, 2, 3],
    objP: {
      subObj: 10
    },
    funcP: function(a, b, c) {
      
    }
  });
  
  var myObj = new MyInterface({
    stringP: "Sad Face"
  }); // this will error into "MyInterface.boolP has not been implemented"
```
