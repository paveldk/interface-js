var Interface = (function () {
    var InterfaceObj,
        _consts,
        _objToString;

    _objToString = Object.prototype.toString;
    _consts = {
        reservedKeys: ["implementation"],
        maxSafeInteger: Math.pow(2, 53) - 1,
        tags: {
            bool: "[object Boolean]",
            number: "[object Number]",
            string: "[object String]",
            array: "[object Array]",
        },
        errors: {
            missingArgs: "No arguments supplied to an instance of Interface constructor.",
            missingId: "Interface.id has not been defined.",
            missingImplementation: " has not been implemented.",
            isNotBool: " should be of type boolean",
            isNotNumber: " should be of type number",
            isNotString: " should be of type string",
            isNotArray: " should be of type array",
            isNotFunction: " should be of type function",
            isNotObject: " should be of type object",
            invalidArgumentCount: " does not have the correct number of arguments."
        }
    };

    function _contains(array, value) {
        return array.indexOf(value) > -1;
    }

    function _isValidLength(value) {
        return typeof value == "number" && value > -1 && value % 1 === 0 && value <= _consts.maxSafeInteger;
    }

    function _isObjectLike(value) {
        return (value && typeof value == "object") || false;
    }

    function _isBool(value) {
        return (value === true || value === false || _isObjectLike(value) && _objToString.call(value) == _consts.tags.bool) || false;
    }

    function _isString(value) {
        return typeof value == "string" || (_isObjectLike(value) && _objToString.call(value) == _consts.tags.string) || false;
    }

    function _isNumber(value) {
        return typeof value == "number" || (_isObjectLike(value) && _objToString.call(value) == _consts.tags.number) || false;
    }

    function _isArray(value) {
        return (_isObjectLike(value) && _isValidLength(value.length) && _objToString.call(value) == _consts.tags.array) || false;
    }

    function _isFunction(value) {
        return typeof value == "function" || false;
    }

    function _isObject(value) {
        var type = typeof value;

        return (value && type == "object" && !_isArray(value) && !_isFunction(value)) || false;
    }

    function _hasValidArgumentCount(signature, implementation) {
        if (!_isFunction(signature)) {
            throw new Error("signature" + _consts.errors.isNotFunction);
        }

        if (!_isFunction(implementation)) {
            throw new Error("implementation" + _consts.errors.isNotFunction);
        }

        return signature.length === implementation.length;
    }

    function _verifyImplementation(signature, implementation, result, parentPrefix) {
        var currentLocation,
            currentSignature,
            currentSignatureKey,
            currentImplementation,
            signatureKeys = Object.keys(signature),
            implementationKeys = Object.keys(implementation);

        for (var i = 0, l = signatureKeys.length; i < l; i++) {
            currentSignatureKey = signatureKeys[i];
            currentSignature = signature[currentSignatureKey];
            currentImplementation = implementation[currentSignatureKey];
            currentLocation = parentPrefix + "." + currentSignatureKey;

            if (_contains(_consts.reservedKeys, currentSignatureKey)) {
                continue;
            }

            if (_isBool(currentSignature) &&
                !_isBool(currentImplementation)) {
                throw new Error(currentLocation + _consts.errors.isNotBool);
            }

            if (_isBool(currentSignature)) {
                result[currentSignatureKey] = currentImplementation;
                continue;
            }

            if (!currentImplementation) {
                throw new Error(currentLocation + _consts.errors.missingImplementation);
            }

            if (_isNumber(currentSignature) &&
                !_isNumber(currentImplementation)) {
                throw new Error(currentLocation + _consts.errors.isNotNumber);
            }

            if (_isString(currentSignature) &&
                !_isString(currentImplementation)) {
                throw new Error(currentLocation + _consts.errors.isNotString);
            }

            if (_isArray(currentSignature) &&
                !_isArray(currentImplementation)) {
                throw new Error(currentLocation + _consts.errors.isNotArray);
            }

            if (_isFunction(currentSignature) &&
                !_isFunction(currentImplementation)) {
                throw new Error(currentLocation + _consts.errors.isNotFunction);
            }

            if (_isFunction(currentSignature) &&
                !_hasValidArgumentCount(currentSignature, currentImplementation)) {
                throw new Error(currentLocation + _consts.errors.invalidArgumentCount);
            }

            if (_isObject(currentSignature) &&
                !_isObject(currentImplementation)) {
                throw new Error(currentLocation + _consts.errors.isNotObject);
            }

            if (_isObject(currentSignature) &&
                !_isFunction(currentSignature)) {
                result[currentSignatureKey] = {};
                _verifyImplementation(currentSignature, currentImplementation, result[currentSignatureKey], currentLocation);
            } else {
                result[currentSignatureKey] = currentImplementation;
            }
        }
    }

    InterfaceObj = function (id, args) {
        var result = {};

        if (!args.implementation) {
            throw new Error(args.id + _consts.errors.missingImplementation);
        }

        _verifyImplementation(args, args.implementation, result, id);

        return result;
    };

    function createInterface(id, interfaceObj) {
        if(!id) {
            throw new Error(_consts.errors.missingId);
        }

        if(!interfaceObj) {
            throw new Error(_consts.errors.missingArgs);
        }

        return function (implementation) {
            interfaceObj.implementation = implementation;
            return new InterfaceObj(id, interfaceObj);
        };
    }

    return {
        create: createInterface
    };
})();
