var SchemaForm = (function (exports) {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


	var global$l = // eslint-disable-next-line es/no-global-this -- safe
	check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
	check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
	function () {
	  return this;
	}() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$d = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$c = fails$d; // Detect IE8's incomplete defineProperty implementation

	var descriptors = !fails$c(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, {
	    get: function () {
	      return 7;
	    }
	  })[1] != 7;
	});

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable$1 = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

	var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

	var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable$1.call({
	  1: 2
	}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$2(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$1;

	var createPropertyDescriptor$3 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString$4 = {}.toString;

	var classofRaw$1 = function (it) {
	  return toString$4.call(it).slice(8, -1);
	};

	var fails$b = fails$d;
	var classof$7 = classofRaw$1;
	var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

	var indexedObject = fails$b(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$7(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// https://tc39.es/ecma262/#sec-requireobjectcoercible

	var requireObjectCoercible$5 = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	var IndexedObject$4 = indexedObject;
	var requireObjectCoercible$4 = requireObjectCoercible$5;

	var toIndexedObject$7 = function (it) {
	  return IndexedObject$4(requireObjectCoercible$4(it));
	};

	var isObject$f = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var isObject$e = isObject$f; // `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string

	var toPrimitive$3 = function (input, PREFERRED_STRING) {
	  if (!isObject$e(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$e(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject$e(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$e(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var requireObjectCoercible$3 = requireObjectCoercible$5; // `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject

	var toObject$6 = function (argument) {
	  return Object(requireObjectCoercible$3(argument));
	};

	var toObject$5 = toObject$6;
	var hasOwnProperty$5 = {}.hasOwnProperty;

	var has$a = function hasOwn(it, key) {
	  return hasOwnProperty$5.call(toObject$5(it), key);
	};

	var global$k = global$l;
	var isObject$d = isObject$f;
	var document$3 = global$k.document; // typeof document.createElement is 'object' in old IE

	var EXISTS = isObject$d(document$3) && isObject$d(document$3.createElement);

	var documentCreateElement$1 = function (it) {
	  return EXISTS ? document$3.createElement(it) : {};
	};

	var DESCRIPTORS$a = descriptors;
	var fails$a = fails$d;
	var createElement$1 = documentCreateElement$1; // Thank's IE8 for his funny defineProperty

	var ie8DomDefine = !DESCRIPTORS$a && !fails$a(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
	  return Object.defineProperty(createElement$1('div'), 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var DESCRIPTORS$9 = descriptors;
	var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$2 = createPropertyDescriptor$3;
	var toIndexedObject$6 = toIndexedObject$7;
	var toPrimitive$2 = toPrimitive$3;
	var has$9 = has$a;
	var IE8_DOM_DEFINE$1 = ie8DomDefine; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$9 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$6(O);
	  P = toPrimitive$2(P, true);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) {
	    /* empty */
	  }
	  if (has$9(O, P)) return createPropertyDescriptor$2(!propertyIsEnumerableModule$2.f.call(O, P), O[P]);
	};

	var objectDefineProperty = {};

	var isObject$c = isObject$f;

	var anObject$d = function (it) {
	  if (!isObject$c(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  }

	  return it;
	};

	var DESCRIPTORS$8 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var anObject$c = anObject$d;
	var toPrimitive$1 = toPrimitive$3; // eslint-disable-next-line es/no-object-defineproperty -- safe

	var $defineProperty$1 = Object.defineProperty; // `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty

	objectDefineProperty.f = DESCRIPTORS$8 ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject$c(O);
	  P = toPrimitive$1(P, true);
	  anObject$c(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty$1(O, P, Attributes);
	  } catch (error) {
	    /* empty */
	  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$7 = descriptors;
	var definePropertyModule$5 = objectDefineProperty;
	var createPropertyDescriptor$1 = createPropertyDescriptor$3;
	var createNonEnumerableProperty$7 = DESCRIPTORS$7 ? function (object, key, value) {
	  return definePropertyModule$5.f(object, key, createPropertyDescriptor$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var redefine$6 = {exports: {}};

	var global$j = global$l;
	var createNonEnumerableProperty$6 = createNonEnumerableProperty$7;

	var setGlobal$3 = function (key, value) {
	  try {
	    createNonEnumerableProperty$6(global$j, key, value);
	  } catch (error) {
	    global$j[key] = value;
	  }

	  return value;
	};

	var global$i = global$l;
	var setGlobal$2 = setGlobal$3;
	var SHARED = '__core-js_shared__';
	var store$3 = global$i[SHARED] || setGlobal$2(SHARED, {});
	var sharedStore = store$3;

	var store$2 = sharedStore;
	var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

	if (typeof store$2.inspectSource != 'function') {
	  store$2.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource$3 = store$2.inspectSource;

	var global$h = global$l;
	var inspectSource$2 = inspectSource$3;
	var WeakMap$1 = global$h.WeakMap;
	var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$2(WeakMap$1));

	var shared$5 = {exports: {}};

	var store$1 = sharedStore;
	(shared$5.exports = function (key, value) {
	  return store$1[key] || (store$1[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.12.1',
	  mode: 'global',
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});

	var id = 0;
	var postfix = Math.random();

	var uid$3 = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var shared$4 = shared$5.exports;
	var uid$2 = uid$3;
	var keys = shared$4('keys');

	var sharedKey$3 = function (key) {
	  return keys[key] || (keys[key] = uid$2(key));
	};

	var hiddenKeys$5 = {};

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$g = global$l;
	var isObject$b = isObject$f;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$7;
	var objectHas = has$a;
	var shared$3 = sharedStore;
	var sharedKey$2 = sharedKey$3;
	var hiddenKeys$4 = hiddenKeys$5;
	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var WeakMap = global$g.WeakMap;
	var set$2, get, has$8;

	var enforce = function (it) {
	  return has$8(it) ? get(it) : set$2(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;

	    if (!isObject$b(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    }

	    return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$3.state) {
	  var store = shared$3.state || (shared$3.state = new WeakMap());
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;

	  set$2 = function (it, metadata) {
	    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    wmset.call(store, it, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };

	  has$8 = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey$2('state');
	  hiddenKeys$4[STATE] = true;

	  set$2 = function (it, metadata) {
	    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$5(it, STATE, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return objectHas(it, STATE) ? it[STATE] : {};
	  };

	  has$8 = function (it) {
	    return objectHas(it, STATE);
	  };
	}

	var internalState = {
	  set: set$2,
	  get: get,
	  has: has$8,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var global$f = global$l;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$7;
	var has$7 = has$a;
	var setGlobal$1 = setGlobal$3;
	var inspectSource$1 = inspectSource$3;
	var InternalStateModule$2 = internalState;
	var getInternalState$2 = InternalStateModule$2.get;
	var enforceInternalState = InternalStateModule$2.enforce;
	var TEMPLATE = String(String).split('String');
	(redefine$6.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var state;

	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has$7(value, 'name')) {
	      createNonEnumerableProperty$4(value, 'name', key);
	    }

	    state = enforceInternalState(value);

	    if (!state.source) {
	      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
	    }
	  }

	  if (O === global$f) {
	    if (simple) O[key] = value;else setGlobal$1(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }

	  if (simple) O[key] = value;else createNonEnumerableProperty$4(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState$2(this).source || inspectSource$1(this);
	});

	var global$e = global$l;
	var path$2 = global$e;

	var path$1 = path$2;
	var global$d = global$l;

	var aFunction$6 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn$6 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$6(path$1[namespace]) || aFunction$6(global$d[namespace]) : path$1[namespace] && path$1[namespace][method] || global$d[namespace] && global$d[namespace][method];
	};

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor = Math.floor; // `ToInteger` abstract operation
	// https://tc39.es/ecma262/#sec-tointeger

	var toInteger$3 = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var toInteger$2 = toInteger$3;
	var min$2 = Math.min; // `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength

	var toLength$6 = function (argument) {
	  return argument > 0 ? min$2(toInteger$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toInteger$1 = toInteger$3;
	var max = Math.max;
	var min$1 = Math.min; // Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toInteger$1(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	var toIndexedObject$5 = toIndexedObject$7;
	var toLength$5 = toLength$6;
	var toAbsoluteIndex = toAbsoluteIndex$1; // `Array.prototype.{ indexOf, includes }` methods implementation

	var createMethod$4 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$5($this);
	    var length = toLength$5(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value; // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check

	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

	      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    }
	    return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$4(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$4(false)
	};

	var has$6 = has$a;
	var toIndexedObject$4 = toIndexedObject$7;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$3 = hiddenKeys$5;

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$4(object);
	  var i = 0;
	  var result = [];
	  var key;

	  for (key in O) !has$6(hiddenKeys$3, key) && has$6(O, key) && result.push(key); // Don't enum bug & hidden keys


	  while (names.length > i) if (has$6(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }

	  return result;
	};

	var enumBugKeys$3 = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;
	var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe

	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$2);
	};

	var objectGetOwnPropertySymbols = {};

	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$5 = getBuiltIn$6;
	var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
	var anObject$b = anObject$d; // all object keys, includes non-enumerable and symbols

	var ownKeys$1 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule$1.f(anObject$b(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$2.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var has$5 = has$a;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
	var definePropertyModule$4 = objectDefineProperty;

	var copyConstructorProperties$2 = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule$4.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$1.f;

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has$5(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var fails$9 = fails$d;
	var replacement = /#|\.prototype\./;

	var isForced$2 = function (feature, detection) {
	  var value = data$1[normalize(feature)];
	  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails$9(detection) : !!detection;
	};

	var normalize = isForced$2.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data$1 = isForced$2.data = {};
	var NATIVE = isForced$2.NATIVE = 'N';
	var POLYFILL = isForced$2.POLYFILL = 'P';
	var isForced_1 = isForced$2;

	var global$c = global$l;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$7;
	var redefine$5 = redefine$6.exports;
	var setGlobal = setGlobal$3;
	var copyConstructorProperties$1 = copyConstructorProperties$2;
	var isForced$1 = isForced_1;
	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/

	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

	  if (GLOBAL) {
	    target = global$c;
	  } else if (STATIC) {
	    target = global$c[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global$c[TARGET] || {}).prototype;
	  }

	  if (target) for (key in source) {
	    sourceProperty = source[key];

	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];

	    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties$1(sourceProperty, targetProperty);
	    } // add a flag to not completely full polyfills


	    if (options.sham || targetProperty && targetProperty.sham) {
	      createNonEnumerableProperty$3(sourceProperty, 'sham', true);
	    } // extend global


	    redefine$5(target, key, sourceProperty, options);
	  }
	};

	var aFunction$5 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  }

	  return it;
	};

	var aFunction$4 = aFunction$5; // optional / simple context binding

	var functionBindContext = function (fn, that, length) {
	  aFunction$4(fn);
	  if (that === undefined) return fn;

	  switch (length) {
	    case 0:
	      return function () {
	        return fn.call(that);
	      };

	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };

	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };

	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }

	  return function ()
	  /* ...args */
	  {
	    return fn.apply(that, arguments);
	  };
	};

	var classof$6 = classofRaw$1; // `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe

	var isArray$6 = Array.isArray || function isArray(arg) {
	  return classof$6(arg) == 'Array';
	};

	var getBuiltIn$4 = getBuiltIn$6;
	var engineUserAgent = getBuiltIn$4('navigator', 'userAgent') || '';

	var global$b = global$l;
	var userAgent$2 = engineUserAgent;
	var process$3 = global$b.process;
	var versions = process$3 && process$3.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] < 4 ? 1 : match[0] + match[1];
	} else if (userAgent$2) {
	  match = userAgent$2.match(/Edge\/(\d+)/);

	  if (!match || match[1] >= 74) {
	    match = userAgent$2.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	/* eslint-disable es/no-symbol -- required for testing */
	var V8_VERSION$2 = engineV8Version;
	var fails$8 = fails$d; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$8(function () {
	  return !String(Symbol()) || // Chrome 38 Symbol has incorrect toString conversion
	  // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	  !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */
	var NATIVE_SYMBOL$2 = nativeSymbol;
	var useSymbolAsUid = NATIVE_SYMBOL$2 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

	var global$a = global$l;
	var shared$2 = shared$5.exports;
	var has$4 = has$a;
	var uid$1 = uid$3;
	var NATIVE_SYMBOL$1 = nativeSymbol;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
	var WellKnownSymbolsStore$1 = shared$2('wks');
	var Symbol$5 = global$a.Symbol;
	var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$5 : Symbol$5 && Symbol$5.withoutSetter || uid$1;

	var wellKnownSymbol$g = function (name) {
	  if (!has$4(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
	    if (NATIVE_SYMBOL$1 && has$4(Symbol$5, name)) {
	      WellKnownSymbolsStore$1[name] = Symbol$5[name];
	    } else {
	      WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
	    }
	  }

	  return WellKnownSymbolsStore$1[name];
	};

	var isObject$a = isObject$f;
	var isArray$5 = isArray$6;
	var wellKnownSymbol$f = wellKnownSymbol$g;
	var SPECIES$5 = wellKnownSymbol$f('species'); // `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate

	var arraySpeciesCreate$1 = function (originalArray, length) {
	  var C;

	  if (isArray$5(originalArray)) {
	    C = originalArray.constructor; // cross-realm fallback

	    if (typeof C == 'function' && (C === Array || isArray$5(C.prototype))) C = undefined;else if (isObject$a(C)) {
	      C = C[SPECIES$5];
	      if (C === null) C = undefined;
	    }
	  }

	  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var bind$3 = functionBindContext;
	var IndexedObject$3 = indexedObject;
	var toObject$4 = toObject$6;
	var toLength$4 = toLength$6;
	var arraySpeciesCreate = arraySpeciesCreate$1;
	var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation

	var createMethod$3 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_OUT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$4($this);
	    var self = IndexedObject$3(O);
	    var boundFunction = bind$3(callbackfn, that, 3);
	    var length = toLength$4(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
	    var value, result;

	    for (; length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);

	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	            case 3:
	              return true;
	            // some

	            case 5:
	              return value;
	            // find

	            case 6:
	              return index;
	            // findIndex

	            case 2:
	              push.call(target, value);
	            // filter
	          } else switch (TYPE) {
	            case 4:
	              return false;
	            // every

	            case 7:
	              push.call(target, value);
	            // filterOut
	          }
	      }
	    }

	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$3(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$3(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$3(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$3(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$3(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$3(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$3(6),
	  // `Array.prototype.filterOut` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterOut: createMethod$3(7)
	};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3; // `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe

	var objectKeys$4 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$6 = descriptors;
	var definePropertyModule$3 = objectDefineProperty;
	var anObject$a = anObject$d;
	var objectKeys$3 = objectKeys$4; // `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe

	var objectDefineProperties = DESCRIPTORS$6 ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$a(O);
	  var keys = objectKeys$3(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;

	  while (length > index) definePropertyModule$3.f(O, key = keys[index++], Properties[key]);

	  return O;
	};

	var getBuiltIn$3 = getBuiltIn$6;
	var html$2 = getBuiltIn$3('document', 'documentElement');

	var anObject$9 = anObject$d;
	var defineProperties = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys$1 = hiddenKeys$5;
	var html$1 = html$2;
	var documentCreateElement = documentCreateElement$1;
	var sharedKey$1 = sharedKey$3;
	var GT = '>';
	var LT = '<';
	var PROTOTYPE$1 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey$1('IE_PROTO');

	var EmptyConstructor = function () {
	  /* empty */
	};

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak

	  return temp;
	}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html$1.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	}; // Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug


	var activeXDocument;

	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject -- old IE */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) {
	    /* ignore */
	  }

	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;

	  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];

	  return NullProtoObject();
	};

	hiddenKeys$1[IE_PROTO] = true; // `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create

	var objectCreate = Object.create || function create(O, Properties) {
	  var result;

	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$1] = anObject$9(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$1] = null; // add "__proto__" for Object.getPrototypeOf polyfill

	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();

	  return Properties === undefined ? result : defineProperties(result, Properties);
	};

	var wellKnownSymbol$e = wellKnownSymbol$g;
	var create = objectCreate;
	var definePropertyModule$2 = objectDefineProperty;
	var UNSCOPABLES = wellKnownSymbol$e('unscopables');
	var ArrayPrototype$1 = Array.prototype; // Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

	if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
	  definePropertyModule$2.f(ArrayPrototype$1, UNSCOPABLES, {
	    configurable: true,
	    value: create(null)
	  });
	} // add a key to Array.prototype[@@unscopables]


	var addToUnscopables$1 = function (key) {
	  ArrayPrototype$1[UNSCOPABLES][key] = true;
	};

	var $$d = _export;
	var $find = arrayIteration.find;
	var addToUnscopables = addToUnscopables$1;
	var FIND = 'find';
	var SKIPS_HOLES = true; // Shouldn't skip holes

	if (FIND in []) Array(1)[FIND](function () {
	  SKIPS_HOLES = false;
	}); // `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find

	$$d({
	  target: 'Array',
	  proto: true,
	  forced: SKIPS_HOLES
	}, {
	  find: function find(callbackfn
	  /* , that = undefined */
	  ) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	}); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

	addToUnscopables(FIND);

	var fails$7 = fails$d;

	var arrayMethodIsStrict$4 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$7(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
	    method.call(null, argument || function () {
	      throw 1;
	    }, 1);
	  });
	};

	var $forEach$1 = arrayIteration.forEach;
	var arrayMethodIsStrict$3 = arrayMethodIsStrict$4;
	var STRICT_METHOD$3 = arrayMethodIsStrict$3('forEach'); // `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach

	var arrayForEach = !STRICT_METHOD$3 ? function forEach(callbackfn
	/* , thisArg */
	) {
	  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined); // eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	var $$c = _export;
	var forEach$1 = arrayForEach; // `Array.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe

	$$c({
	  target: 'Array',
	  proto: true,
	  forced: [].forEach != forEach$1
	}, {
	  forEach: forEach$1
	});

	var fails$6 = fails$d;
	var wellKnownSymbol$d = wellKnownSymbol$g;
	var V8_VERSION$1 = engineV8Version;
	var SPECIES$4 = wellKnownSymbol$d('species');

	var arrayMethodHasSpeciesSupport$2 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$6(function () {
	    var array = [];
	    var constructor = array.constructor = {};

	    constructor[SPECIES$4] = function () {
	      return {
	        foo: 1
	      };
	    };

	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$b = _export;
	var $map = arrayIteration.map;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$2;
	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('map'); // `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species

	$$b({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT$1
	}, {
	  map: function map(callbackfn
	  /* , thisArg */
	  ) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var aFunction$3 = aFunction$5;
	var toObject$3 = toObject$6;
	var IndexedObject$2 = indexedObject;
	var toLength$3 = toLength$6; // `Array.prototype.{ reduce, reduceRight }` methods implementation

	var createMethod$2 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aFunction$3(callbackfn);
	    var O = toObject$3(that);
	    var self = IndexedObject$2(O);
	    var length = toLength$3(O.length);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }

	      index += i;

	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }

	    for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }

	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduce
	  left: createMethod$2(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$2(true)
	};

	var classof$5 = classofRaw$1;
	var global$9 = global$l;
	var engineIsNode = classof$5(global$9.process) == 'process';

	var $$a = _export;
	var $reduce = arrayReduce.left;
	var arrayMethodIsStrict$2 = arrayMethodIsStrict$4;
	var CHROME_VERSION = engineV8Version;
	var IS_NODE$3 = engineIsNode;
	var STRICT_METHOD$2 = arrayMethodIsStrict$2('reduce'); // Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982

	var CHROME_BUG = !IS_NODE$3 && CHROME_VERSION > 79 && CHROME_VERSION < 83; // `Array.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduce

	$$a({
	  target: 'Array',
	  proto: true,
	  forced: !STRICT_METHOD$2 || CHROME_BUG
	}, {
	  reduce: function reduce(callbackfn
	  /* , initialValue */
	  ) {
	    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $$9 = _export;
	var $some = arrayIteration.some;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$4;
	var STRICT_METHOD$1 = arrayMethodIsStrict$1('some'); // `Array.prototype.some` method
	// https://tc39.es/ecma262/#sec-array.prototype.some

	$$9({
	  target: 'Array',
	  proto: true,
	  forced: !STRICT_METHOD$1
	}, {
	  some: function some(callbackfn
	  /* , thisArg */
	  ) {
	    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $$8 = _export;
	var toObject$2 = toObject$6;
	var nativeKeys = objectKeys$4;
	var fails$5 = fails$d;
	var FAILS_ON_PRIMITIVES = fails$5(function () {
	  nativeKeys(1);
	}); // `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys

	$$8({
	  target: 'Object',
	  stat: true,
	  forced: FAILS_ON_PRIMITIVES
	}, {
	  keys: function keys(it) {
	    return nativeKeys(toObject$2(it));
	  }
	});

	var wellKnownSymbol$c = wellKnownSymbol$g;
	var TO_STRING_TAG$2 = wellKnownSymbol$c('toStringTag');
	var test = {};
	test[TO_STRING_TAG$2] = 'z';
	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol$b = wellKnownSymbol$g;
	var TO_STRING_TAG$1 = wellKnownSymbol$b('toStringTag'); // ES3 wrong here

	var CORRECT_ARGUMENTS = classofRaw(function () {
	  return arguments;
	}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) {
	    /* empty */
	  }
	}; // getting tag from ES6+ `Object.prototype.toString`


	var classof$4 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
	  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag // builtinTag case
	  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
	  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$3 = classof$4; // `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring

	var objectToString$2 = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$3(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var redefine$4 = redefine$6.exports;
	var toString$3 = objectToString$2; // `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring

	if (!TO_STRING_TAG_SUPPORT) {
	  redefine$4(Object.prototype, 'toString', toString$3, {
	    unsafe: true
	  });
	}

	var global$8 = global$l;
	var nativePromiseConstructor = global$8.Promise;

	var redefine$3 = redefine$6.exports;

	var redefineAll$1 = function (target, src, options) {
	  for (var key in src) redefine$3(target, key, src[key], options);

	  return target;
	};

	var isObject$9 = isObject$f;

	var aPossiblePrototype$1 = function (it) {
	  if (!isObject$9(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  }

	  return it;
	};

	/* eslint-disable no-proto -- safe */
	var anObject$8 = anObject$d;
	var aPossiblePrototype = aPossiblePrototype$1; // `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe

	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;

	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) {
	    /* empty */
	  }

	  return function setPrototypeOf(O, proto) {
	    anObject$8(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var defineProperty$6 = objectDefineProperty.f;
	var has$3 = has$a;
	var wellKnownSymbol$a = wellKnownSymbol$g;
	var TO_STRING_TAG = wellKnownSymbol$a('toStringTag');

	var setToStringTag$2 = function (it, TAG, STATIC) {
	  if (it && !has$3(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty$6(it, TO_STRING_TAG, {
	      configurable: true,
	      value: TAG
	    });
	  }
	};

	var getBuiltIn$2 = getBuiltIn$6;
	var definePropertyModule$1 = objectDefineProperty;
	var wellKnownSymbol$9 = wellKnownSymbol$g;
	var DESCRIPTORS$5 = descriptors;
	var SPECIES$3 = wellKnownSymbol$9('species');

	var setSpecies$1 = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn$2(CONSTRUCTOR_NAME);
	  var defineProperty = definePropertyModule$1.f;

	  if (DESCRIPTORS$5 && Constructor && !Constructor[SPECIES$3]) {
	    defineProperty(Constructor, SPECIES$3, {
	      configurable: true,
	      get: function () {
	        return this;
	      }
	    });
	  }
	};

	var anInstance$1 = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  }

	  return it;
	};

	var iterators = {};

	var wellKnownSymbol$8 = wellKnownSymbol$g;
	var Iterators$1 = iterators;
	var ITERATOR$2 = wellKnownSymbol$8('iterator');
	var ArrayPrototype = Array.prototype; // check on default Array iterator

	var isArrayIteratorMethod$1 = function (it) {
	  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it);
	};

	var classof$2 = classof$4;
	var Iterators = iterators;
	var wellKnownSymbol$7 = wellKnownSymbol$g;
	var ITERATOR$1 = wellKnownSymbol$7('iterator');

	var getIteratorMethod$1 = function (it) {
	  if (it != undefined) return it[ITERATOR$1] || it['@@iterator'] || Iterators[classof$2(it)];
	};

	var anObject$7 = anObject$d;

	var iteratorClose$1 = function (iterator) {
	  var returnMethod = iterator['return'];

	  if (returnMethod !== undefined) {
	    return anObject$7(returnMethod.call(iterator)).value;
	  }
	};

	var anObject$6 = anObject$d;
	var isArrayIteratorMethod = isArrayIteratorMethod$1;
	var toLength$2 = toLength$6;
	var bind$2 = functionBindContext;
	var getIteratorMethod = getIteratorMethod$1;
	var iteratorClose = iteratorClose$1;

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate$1 = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = bind$2(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose(iterator);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject$6(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    }

	    return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength$2(iterable.length); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && result instanceof Result) return result;
	      }

	      return new Result(false);
	    }

	    iterator = iterFn.call(iterable);
	  }

	  next = iterator.next;

	  while (!(step = next.call(iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose(iterator);
	      throw error;
	    }

	    if (typeof result == 'object' && result && result instanceof Result) return result;
	  }

	  return new Result(false);
	};

	var wellKnownSymbol$6 = wellKnownSymbol$g;
	var ITERATOR = wellKnownSymbol$6('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return {
	        done: !!called++
	      };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };

	  iteratorWithReturn[ITERATOR] = function () {
	    return this;
	  }; // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing


	  Array.from(iteratorWithReturn, function () {
	    throw 2;
	  });
	} catch (error) {
	  /* empty */
	}

	var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;

	  try {
	    var object = {};

	    object[ITERATOR] = function () {
	      return {
	        next: function () {
	          return {
	            done: ITERATION_SUPPORT = true
	          };
	        }
	      };
	    };

	    exec(object);
	  } catch (error) {
	    /* empty */
	  }

	  return ITERATION_SUPPORT;
	};

	var anObject$5 = anObject$d;
	var aFunction$2 = aFunction$5;
	var wellKnownSymbol$5 = wellKnownSymbol$g;
	var SPECIES$2 = wellKnownSymbol$5('species'); // `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor

	var speciesConstructor$2 = function (O, defaultConstructor) {
	  var C = anObject$5(O).constructor;
	  var S;
	  return C === undefined || (S = anObject$5(C)[SPECIES$2]) == undefined ? defaultConstructor : aFunction$2(S);
	};

	var userAgent$1 = engineUserAgent;
	var engineIsIos = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent$1);

	var global$7 = global$l;
	var fails$4 = fails$d;
	var bind$1 = functionBindContext;
	var html = html$2;
	var createElement = documentCreateElement$1;
	var IS_IOS$1 = engineIsIos;
	var IS_NODE$2 = engineIsNode;
	var location = global$7.location;
	var set$1 = global$7.setImmediate;
	var clear = global$7.clearImmediate;
	var process$2 = global$7.process;
	var MessageChannel = global$7.MessageChannel;
	var Dispatch = global$7.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;

	var run = function (id) {
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function (event) {
	  run(event.data);
	};

	var post = function (id) {
	  // old engines have not location.origin
	  global$7.postMessage(id + '', location.protocol + '//' + location.host);
	}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


	if (!set$1 || !clear) {
	  set$1 = function setImmediate(fn) {
	    var args = [];
	    var i = 1;

	    while (arguments.length > i) args.push(arguments[i++]);

	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func -- spec requirement
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };

	    defer(counter);
	    return counter;
	  };

	  clear = function clearImmediate(id) {
	    delete queue[id];
	  }; // Node.js 0.8-


	  if (IS_NODE$2) {
	    defer = function (id) {
	      process$2.nextTick(runner(id));
	    }; // Sphere (JS game engine) Dispatch API

	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    }; // Browsers with MessageChannel, includes WebWorkers
	    // except iOS - https://github.com/zloirock/core-js/issues/624

	  } else if (MessageChannel && !IS_IOS$1) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = bind$1(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
	    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global$7.addEventListener && typeof postMessage == 'function' && !global$7.importScripts && location && location.protocol !== 'file:' && !fails$4(post)) {
	    defer = post;
	    global$7.addEventListener('message', listener, false); // IE8-
	  } else if (ONREADYSTATECHANGE in createElement('script')) {
	    defer = function (id) {
	      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    }; // Rest old browsers

	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task$1 = {
	  set: set$1,
	  clear: clear
	};

	var userAgent = engineUserAgent;
	var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

	var global$6 = global$l;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var macrotask = task$1.set;
	var IS_IOS = engineIsIos;
	var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
	var IS_NODE$1 = engineIsNode;
	var MutationObserver = global$6.MutationObserver || global$6.WebKitMutationObserver;
	var document$2 = global$6.document;
	var process$1 = global$6.process;
	var Promise$1 = global$6.Promise; // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`

	var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$6, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
	var flush, head, last, notify$1, toggle, node, promise, then; // modern engines have queueMicrotask method

	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();

	    while (head) {
	      fn = head.fn;
	      head = head.next;

	      try {
	        fn();
	      } catch (error) {
	        if (head) notify$1();else last = undefined;
	        throw error;
	      }
	    }

	    last = undefined;
	    if (parent) parent.enter();
	  }; // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898


	  if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
	    toggle = true;
	    node = document$2.createTextNode('');
	    new MutationObserver(flush).observe(node, {
	      characterData: true
	    });

	    notify$1 = function () {
	      node.data = toggle = !toggle;
	    }; // environments with maybe non-completely correct, but existent Promise

	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined); // workaround of WebKit ~ iOS Safari 10.1 bug

	    promise.constructor = Promise$1;
	    then = promise.then;

	    notify$1 = function () {
	      then.call(promise, flush);
	    }; // Node.js without promises

	  } else if (IS_NODE$1) {
	    notify$1 = function () {
	      process$1.nextTick(flush);
	    }; // for other environments - macrotask based on:
	    // - setImmediate
	    // - MessageChannel
	    // - window.postMessag
	    // - onreadystatechange
	    // - setTimeout

	  } else {
	    notify$1 = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global$6, flush);
	    };
	  }
	}

	var microtask$1 = queueMicrotask || function (fn) {
	  var task = {
	    fn: fn,
	    next: undefined
	  };
	  if (last) last.next = task;

	  if (!head) {
	    head = task;
	    notify$1();
	  }

	  last = task;
	};

	var newPromiseCapability$2 = {};

	var aFunction$1 = aFunction$5;

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$1(resolve);
	  this.reject = aFunction$1(reject);
	}; // 25.4.1.5 NewPromiseCapability(C)


	newPromiseCapability$2.f = function (C) {
	  return new PromiseCapability(C);
	};

	var anObject$4 = anObject$d;
	var isObject$8 = isObject$f;
	var newPromiseCapability$1 = newPromiseCapability$2;

	var promiseResolve$1 = function (C, x) {
	  anObject$4(C);
	  if (isObject$8(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability$1.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var global$5 = global$l;

	var hostReportErrors$1 = function (a, b) {
	  var console = global$5.console;

	  if (console && console.error) {
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform$1 = function (exec) {
	  try {
	    return {
	      error: false,
	      value: exec()
	    };
	  } catch (error) {
	    return {
	      error: true,
	      value: error
	    };
	  }
	};

	var engineIsBrowser = typeof window == 'object';

	var $$7 = _export;
	var global$4 = global$l;
	var getBuiltIn$1 = getBuiltIn$6;
	var NativePromise = nativePromiseConstructor;
	var redefine$2 = redefine$6.exports;
	var redefineAll = redefineAll$1;
	var setPrototypeOf = objectSetPrototypeOf;
	var setToStringTag$1 = setToStringTag$2;
	var setSpecies = setSpecies$1;
	var isObject$7 = isObject$f;
	var aFunction = aFunction$5;
	var anInstance = anInstance$1;
	var inspectSource = inspectSource$3;
	var iterate = iterate$1;
	var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
	var speciesConstructor$1 = speciesConstructor$2;
	var task = task$1.set;
	var microtask = microtask$1;
	var promiseResolve = promiseResolve$1;
	var hostReportErrors = hostReportErrors$1;
	var newPromiseCapabilityModule = newPromiseCapability$2;
	var perform = perform$1;
	var InternalStateModule$1 = internalState;
	var isForced = isForced_1;
	var wellKnownSymbol$4 = wellKnownSymbol$g;
	var IS_BROWSER = engineIsBrowser;
	var IS_NODE = engineIsNode;
	var V8_VERSION = engineV8Version;
	var SPECIES$1 = wellKnownSymbol$4('species');
	var PROMISE = 'Promise';
	var getInternalState$1 = InternalStateModule$1.get;
	var setInternalState$1 = InternalStateModule$1.set;
	var getInternalPromiseState = InternalStateModule$1.getterFor(PROMISE);
	var NativePromisePrototype = NativePromise && NativePromise.prototype;
	var PromiseConstructor = NativePromise;
	var PromiseConstructorPrototype = NativePromisePrototype;
	var TypeError$1 = global$4.TypeError;
	var document$1 = global$4.document;
	var process = global$4.process;
	var newPromiseCapability = newPromiseCapabilityModule.f;
	var newGenericPromiseCapability = newPromiseCapability;
	var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$4.dispatchEvent);
	var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var SUBCLASSING = false;
	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
	var FORCED = isForced(PROMISE, function () {
	  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor); // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	  // We can't detect it synchronously, so just check versions

	  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true; // We need Promise#finally in the pure version for preventing prototype pollution
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679

	  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false; // Detect correctness of subclassing with @@species support

	  var promise = new PromiseConstructor(function (resolve) {
	    resolve(1);
	  });

	  var FakePromise = function (exec) {
	    exec(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  };

	  var constructor = promise.constructor = {};
	  constructor[SPECIES$1] = FakePromise;
	  SUBCLASSING = promise.then(function () {
	    /* empty */
	  }) instanceof FakePromise;
	  if (!SUBCLASSING) return true; // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test

	  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
	});
	var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () {
	    /* empty */
	  });
	}); // helpers

	var isThenable = function (it) {
	  var then;
	  return isObject$7(it) && typeof (then = it.then) == 'function' ? then : false;
	};

	var notify = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  var chain = state.reactions;
	  microtask(function () {
	    var value = state.value;
	    var ok = state.state == FULFILLED;
	    var index = 0; // variable length - can't use forEach

	    while (chain.length > index) {
	      var reaction = chain[index++];
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;

	      try {
	        if (handler) {
	          if (!ok) {
	            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
	            state.rejection = HANDLED;
	          }

	          if (handler === true) result = value;else {
	            if (domain) domain.enter();
	            result = handler(value); // can throw

	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }

	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (error) {
	        if (domain && !exited) domain.exit();
	        reject(error);
	      }
	    }

	    state.reactions = [];
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;

	  if (DISPATCH_EVENT) {
	    event = document$1.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global$4.dispatchEvent(event);
	  } else event = {
	    promise: promise,
	    reason: reason
	  };

	  if (!NATIVE_REJECTION_EVENT && (handler = global$4['on' + name])) handler(event);else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  task.call(global$4, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;

	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (IS_NODE) {
	          process.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

	      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (state) {
	  task.call(global$4, function () {
	    var promise = state.facade;

	    if (IS_NODE) {
	      process.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function (fn, state, unwrap) {
	  return function (value) {
	    fn(state, value, unwrap);
	  };
	};

	var internalReject = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify(state, true);
	};

	var internalResolve = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;

	  try {
	    if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);

	    if (then) {
	      microtask(function () {
	        var wrapper = {
	          done: false
	        };

	        try {
	          then.call(value, bind(internalResolve, wrapper, state), bind(internalReject, wrapper, state));
	        } catch (error) {
	          internalReject(wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify(state, false);
	    }
	  } catch (error) {
	    internalReject({
	      done: false
	    }, error, state);
	  }
	}; // constructor polyfill


	if (FORCED) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction(executor);
	    Internal.call(this);
	    var state = getInternalState$1(this);

	    try {
	      executor(bind(internalResolve, state), bind(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };

	  PromiseConstructorPrototype = PromiseConstructor.prototype; // eslint-disable-next-line no-unused-vars -- required for `.length`

	  Internal = function Promise(executor) {
	    setInternalState$1(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: [],
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };

	  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.then
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability(speciesConstructor$1(this, PromiseConstructor));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = IS_NODE ? process.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING) notify(state, false);
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });

	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState$1(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, state);
	    this.reject = bind(internalReject, state);
	  };

	  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
	  };

	  if (typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
	    nativeThen = NativePromisePrototype.then;

	    if (!SUBCLASSING) {
	      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
	      redefine$2(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
	        var that = this;
	        return new PromiseConstructor(function (resolve, reject) {
	          nativeThen.call(that, resolve, reject);
	        }).then(onFulfilled, onRejected); // https://github.com/zloirock/core-js/issues/640
	      }, {
	        unsafe: true
	      }); // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`

	      redefine$2(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], {
	        unsafe: true
	      });
	    } // make `.constructor === Promise` work for native promise-based APIs


	    try {
	      delete NativePromisePrototype.constructor;
	    } catch (error) {}
	    /* empty */
	    // make `instanceof Promise` work for native promise-based APIs


	    if (setPrototypeOf) {
	      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
	    }
	  }
	}

	$$7({
	  global: true,
	  wrap: true,
	  forced: FORCED
	}, {
	  Promise: PromiseConstructor
	});
	setToStringTag$1(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);
	PromiseWrapper = getBuiltIn$1(PROMISE); // statics

	$$7({
	  target: PROMISE,
	  stat: true,
	  forced: FORCED
	}, {
	  // `Promise.reject` method
	  // https://tc39.es/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});
	$$7({
	  target: PROMISE,
	  stat: true,
	  forced: FORCED
	}, {
	  // `Promise.resolve` method
	  // https://tc39.es/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve(this, x);
	  }
	});
	$$7({
	  target: PROMISE,
	  stat: true,
	  forced: INCORRECT_ITERATION
	}, {
	  // `Promise.all` method
	  // https://tc39.es/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        $promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  // `Promise.race` method
	  // https://tc39.es/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction(C.resolve);
	      iterate(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var anObject$3 = anObject$d; // `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

	var regexpFlags$1 = function () {
	  var that = anObject$3(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var regexpStickyHelpers = {};

	var fails$3 = fails$d; // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
	// so we use an intermediate function.

	function RE(s, f) {
	  return RegExp(s, f);
	}

	regexpStickyHelpers.UNSUPPORTED_Y = fails$3(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});
	regexpStickyHelpers.BROKEN_CARET = fails$3(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

	/* eslint-disable regexp/no-useless-quantifier -- testing */


	var regexpFlags = regexpFlags$1;
	var stickyHelpers$1 = regexpStickyHelpers;
	var shared$1 = shared$5.exports;
	var nativeExec = RegExp.prototype.exec;
	var nativeReplace = shared$1('native-string-replace', String.prototype.replace);
	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	}();

	var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y || stickyHelpers$1.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = flags.replace('y', '');

	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }

	      strCopy = String(str).slice(re.lastIndex); // Support anchored sticky behavior.

	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      } // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.


	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }

	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
	    match = nativeExec.call(sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }

	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var regexpExec$3 = patchedExec;

	var $$6 = _export;
	var exec = regexpExec$3; // `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec

	$$6({
	  target: 'RegExp',
	  proto: true,
	  forced: /./.exec !== exec
	}, {
	  exec: exec
	});

	var redefine$1 = redefine$6.exports;
	var regexpExec$2 = regexpExec$3;
	var fails$2 = fails$d;
	var wellKnownSymbol$3 = wellKnownSymbol$g;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$7;
	var SPECIES = wellKnownSymbol$3('species');
	var RegExpPrototype = RegExp.prototype;
	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$2(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;

	  re.exec = function () {
	    var result = [];
	    result.groups = {
	      a: '7'
	    };
	    return result;
	  };

	  return ''.replace(re, '$<a>') !== '7';
	}); // IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0

	var REPLACE_KEEPS_$0 = function () {
	  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
	  return 'a'.replace(/./, '$0') === '$0';
	}();

	var REPLACE = wellKnownSymbol$3('replace'); // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string

	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }

	  return false;
	}(); // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper


	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$2(function () {
	  // eslint-disable-next-line regexp/no-empty-group -- required for testing
	  var re = /(?:)/;
	  var originalExec = re.exec;

	  re.exec = function () {
	    return originalExec.apply(this, arguments);
	  };

	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol$3(KEY);
	  var DELEGATES_TO_SYMBOL = !fails$2(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};

	    O[SYMBOL] = function () {
	      return 7;
	    };

	    return ''[KEY](O) != 7;
	  });
	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$2(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {}; // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.

	      re.constructor = {};

	      re.constructor[SPECIES] = function () {
	        return re;
	      };

	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () {
	      execCalled = true;
	      return null;
	    };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var $exec = regexp.exec;

	      if ($exec === regexpExec$2 || $exec === RegExpPrototype.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return {
	            done: true,
	            value: nativeRegExpMethod.call(regexp, str, arg2)
	          };
	        }

	        return {
	          done: true,
	          value: nativeMethod.call(str, regexp, arg2)
	        };
	      }

	      return {
	        done: false
	      };
	    }, {
	      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
	      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];
	    redefine$1(String.prototype, KEY, stringMethod);
	    redefine$1(RegExpPrototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	    ? function (string, arg) {
	      return regexMethod.call(string, this, arg);
	    } // 21.2.5.6 RegExp.prototype[@@match](string)
	    // 21.2.5.9 RegExp.prototype[@@search](string)
	    : function (string) {
	      return regexMethod.call(string, this);
	    });
	  }

	  if (sham) createNonEnumerableProperty$2(RegExpPrototype[SYMBOL], 'sham', true);
	};

	var toInteger = toInteger$3;
	var requireObjectCoercible$2 = requireObjectCoercible$5; // `String.prototype.{ codePointAt, at }` methods implementation

	var createMethod$1 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible$2($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$1(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$1(true)
	};

	var charAt = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex

	var advanceStringIndex$2 = function (S, index, unicode) {
	  return index + (unicode ? charAt(S, index).length : 1);
	};

	var classof$1 = classofRaw$1;
	var regexpExec$1 = regexpExec$3; // `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec

	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;

	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);

	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }

	    return result;
	  }

	  if (classof$1(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec$1.call(R, S);
	};

	var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
	var anObject$2 = anObject$d;
	var toLength$1 = toLength$6;
	var requireObjectCoercible$1 = requireObjectCoercible$5;
	var advanceStringIndex$1 = advanceStringIndex$2;
	var regExpExec = regexpExecAbstract; // @@match logic

	fixRegExpWellKnownSymbolLogic$1('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
	  return [// `String.prototype.match` method
	  // https://tc39.es/ecma262/#sec-string.prototype.match
	  function match(regexp) {
	    var O = requireObjectCoercible$1(this);
	    var matcher = regexp == undefined ? undefined : regexp[MATCH];
	    return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, // `RegExp.prototype[@@match]` method
	  // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
	  function (regexp) {
	    var res = maybeCallNative(nativeMatch, regexp, this);
	    if (res.done) return res.value;
	    var rx = anObject$2(regexp);
	    var S = String(this);
	    if (!rx.global) return regExpExec(rx, S);
	    var fullUnicode = rx.unicode;
	    rx.lastIndex = 0;
	    var A = [];
	    var n = 0;
	    var result;

	    while ((result = regExpExec(rx, S)) !== null) {
	      var matchStr = String(result[0]);
	      A[n] = matchStr;
	      if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
	      n++;
	    }

	    return n === 0 ? null : A;
	  }];
	});

	var isObject$6 = isObject$f;
	var classof = classofRaw$1;
	var wellKnownSymbol$2 = wellKnownSymbol$g;
	var MATCH = wellKnownSymbol$2('match'); // `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp

	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject$6(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
	};

	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var isRegExp = isRegexp;
	var anObject$1 = anObject$d;
	var requireObjectCoercible = requireObjectCoercible$5;
	var speciesConstructor = speciesConstructor$2;
	var advanceStringIndex = advanceStringIndex$2;
	var toLength = toLength$6;
	var callRegExpExec = regexpExecAbstract;
	var regexpExec = regexpExec$3;
	var stickyHelpers = regexpStickyHelpers;
	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
	var arrayPush = [].push;
	var min = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF; // @@split logic

	fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;

	  if ('abbc'.split(/(b)*/)[1] == 'c' || // eslint-disable-next-line regexp/no-empty-group -- required for testing
	  'test'.split(/(?:)/, -1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
	  '.'.split(/()()/).length > 1 || ''.split(/.?/).length) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string]; // If `separator` is not a regex, use native split

	      if (!isRegExp(separator)) {
	        return nativeSplit.call(string, separator, lim);
	      }

	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0; // Make `global` and avoid `lastIndex` issues by working with a copy

	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;

	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;

	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }

	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }

	      if (lastLastIndex === string.length) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));

	      return output.length > lim ? output.slice(0, lim) : output;
	    }; // Chakra, V8

	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [// `String.prototype.split` method
	  // https://tc39.es/ecma262/#sec-string.prototype.split
	  function split(separator, limit) {
	    var O = requireObjectCoercible(this);
	    var splitter = separator == undefined ? undefined : separator[SPLIT];
	    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
	  }, // `RegExp.prototype[@@split]` method
	  // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
	  //
	  // NOTE: This cannot be properly polyfilled in engines that don't support
	  // the 'y' flag.
	  function (regexp, limit) {
	    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	    if (res.done) return res.value;
	    var rx = anObject$1(regexp);
	    var S = String(this);
	    var C = speciesConstructor(rx, RegExp);
	    var unicodeMatching = rx.unicode;
	    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (UNSUPPORTED_Y ? 'g' : 'y'); // ^(? + rx + ) is needed, in combination with some S slicing, to
	    // simulate the 'y' flag.

	    var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
	    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	    if (lim === 0) return [];
	    if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
	    var p = 0;
	    var q = 0;
	    var A = [];

	    while (q < S.length) {
	      splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
	      var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S);
	      var e;

	      if (z === null || (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p) {
	        q = advanceStringIndex(S, q, unicodeMatching);
	      } else {
	        A.push(S.slice(p, q));
	        if (A.length === lim) return A;

	        for (var i = 1; i <= z.length - 1; i++) {
	          A.push(z[i]);
	          if (A.length === lim) return A;
	        }

	        q = p = e;
	      }
	    }

	    A.push(S.slice(p));
	    return A;
	  }];
	}, UNSUPPORTED_Y);

	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods

	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var global$3 = global$l;
	var DOMIterables = domIterables;
	var forEach = arrayForEach;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$7;

	for (var COLLECTION_NAME in DOMIterables) {
	  var Collection = global$3[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype; // some Chrome versions have non-configurable methods on DOMTokenList

	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
	    createNonEnumerableProperty$1(CollectionPrototype, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach;
	  }
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _construct(Parent, args, Class) {
	  if (_isNativeReflectConstruct()) {
	    _construct = Reflect.construct;
	  } else {
	    _construct = function _construct(Parent, args, Class) {
	      var a = [null];
	      a.push.apply(a, args);
	      var Constructor = Function.bind.apply(Parent, a);
	      var instance = new Constructor();
	      if (Class) _setPrototypeOf(instance, Class.prototype);
	      return instance;
	    };
	  }

	  return _construct.apply(null, arguments);
	}

	function _isNativeFunction(fn) {
	  return Function.toString.call(fn).indexOf("[native code]") !== -1;
	}

	function _wrapNativeSuper(Class) {
	  var _cache = typeof Map === "function" ? new Map() : undefined;

	  _wrapNativeSuper = function _wrapNativeSuper(Class) {
	    if (Class === null || !_isNativeFunction(Class)) return Class;

	    if (typeof Class !== "function") {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    if (typeof _cache !== "undefined") {
	      if (_cache.has(Class)) return _cache.get(Class);

	      _cache.set(Class, Wrapper);
	    }

	    function Wrapper() {
	      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
	    }

	    Wrapper.prototype = Object.create(Class.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    return _setPrototypeOf(Wrapper, Class);
	  };

	  return _wrapNativeSuper(Class);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _createSuper(Derived) {
	  return function () {
	    var Super = _getPrototypeOf(Derived),
	        result;

	    if (_isNativeReflectConstruct()) {
	      var NewTarget = _getPrototypeOf(this).constructor;

	      result = Reflect.construct(Super, arguments, NewTarget);
	    } else {
	      result = Super.apply(this, arguments);
	    }

	    return _possibleConstructorReturn(this, result);
	  };
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArrayLimit(arr, i) {
	  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(n);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

	  return arr2;
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	var uri_all = {exports: {}};

	/** @license URI.js v4.2.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */

	(function (module, exports) {
	  (function (global, factory) {
	    factory(exports) ;
	  })(commonjsGlobal, function (exports) {

	    function merge() {
	      for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
	        sets[_key] = arguments[_key];
	      }

	      if (sets.length > 1) {
	        sets[0] = sets[0].slice(0, -1);
	        var xl = sets.length - 1;

	        for (var x = 1; x < xl; ++x) {
	          sets[x] = sets[x].slice(1, -1);
	        }

	        sets[xl] = sets[xl].slice(1);
	        return sets.join('');
	      } else {
	        return sets[0];
	      }
	    }

	    function subexp(str) {
	      return "(?:" + str + ")";
	    }

	    function typeOf(o) {
	      return o === undefined ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
	    }

	    function toUpperCase(str) {
	      return str.toUpperCase();
	    }

	    function toArray(obj) {
	      return obj !== undefined && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
	    }

	    function assign(target, source) {
	      var obj = target;

	      if (source) {
	        for (var key in source) {
	          obj[key] = source[key];
	        }
	      }

	      return obj;
	    }

	    function buildExps(isIRI) {
	      var ALPHA$$ = "[A-Za-z]",
	          DIGIT$$ = "[0-9]",
	          HEXDIG$$ = merge(DIGIT$$, "[A-Fa-f]"),
	          PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)),
	          //expanded
	      GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]",
	          SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
	          RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$),
	          UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]",
	          //subset, excludes bidi control characters
	      IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]",
	          //subset
	      UNRESERVED$$ = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$);
	          subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*");
	          subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]")) + "*");
	          var DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$),
	          //relaxed parsing rules
	      IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$),
	          H16$ = subexp(HEXDIG$$ + "{1,4}"),
	          LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$),
	          IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$),
	          //                           6( h16 ":" ) ls32
	      IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$),
	          //                      "::" 5( h16 ":" ) ls32
	      IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$),
	          //[               h16 ] "::" 4( h16 ":" ) ls32
	      IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$),
	          //[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
	      IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$),
	          //[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
	      IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$),
	          //[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
	      IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$),
	          //[ *4( h16 ":" ) h16 ] "::"              ls32
	      IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$),
	          //[ *5( h16 ":" ) h16 ] "::"              h16
	      IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"),
	          //[ *6( h16 ":" ) h16 ] "::"
	      IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")),
	          ZONEID$ = subexp(subexp(UNRESERVED$$ + "|" + PCT_ENCODED$) + "+");
	          //RFC 6874, with relaxed parsing rules
	      subexp("[vV]" + HEXDIG$$ + "+\\." + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]") + "+");
	          //RFC 6874
	      subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$)) + "*");
	          var PCHAR$ = subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@]"));
	          subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\@]")) + "+");
	          subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*");
	      return {
	        NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
	        NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
	        NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
	        NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
	        NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
	        NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
	        NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
	        ESCAPE: new RegExp(merge("[^]", UNRESERVED$$, SUB_DELIMS$$), "g"),
	        UNRESERVED: new RegExp(UNRESERVED$$, "g"),
	        OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$, RESERVED$$), "g"),
	        PCT_ENCODED: new RegExp(PCT_ENCODED$, "g"),
	        IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
	        IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$") //RFC 6874, with relaxed parsing rules

	      };
	    }

	    var URI_PROTOCOL = buildExps(false);
	    var IRI_PROTOCOL = buildExps(true);

	    var slicedToArray = function () {
	      function sliceIterator(arr, i) {
	        var _arr = [];
	        var _n = true;
	        var _d = false;
	        var _e = undefined;

	        try {
	          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	            _arr.push(_s.value);

	            if (i && _arr.length === i) break;
	          }
	        } catch (err) {
	          _d = true;
	          _e = err;
	        } finally {
	          try {
	            if (!_n && _i["return"]) _i["return"]();
	          } finally {
	            if (_d) throw _e;
	          }
	        }

	        return _arr;
	      }

	      return function (arr, i) {
	        if (Array.isArray(arr)) {
	          return arr;
	        } else if (Symbol.iterator in Object(arr)) {
	          return sliceIterator(arr, i);
	        } else {
	          throw new TypeError("Invalid attempt to destructure non-iterable instance");
	        }
	      };
	    }();

	    var toConsumableArray = function (arr) {
	      if (Array.isArray(arr)) {
	        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	        return arr2;
	      } else {
	        return Array.from(arr);
	      }
	    };
	    /** Highest positive signed 32-bit float value */


	    var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

	    /** Bootstring parameters */

	    var base = 36;
	    var tMin = 1;
	    var tMax = 26;
	    var skew = 38;
	    var damp = 700;
	    var initialBias = 72;
	    var initialN = 128; // 0x80

	    var delimiter = '-'; // '\x2D'

	    /** Regular expressions */

	    var regexPunycode = /^xn--/;
	    var regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars

	    var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

	    /** Error messages */

	    var errors = {
	      'overflow': 'Overflow: input needs wider integers to process',
	      'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	      'invalid-input': 'Invalid input'
	    };
	    /** Convenience shortcuts */

	    var baseMinusTMin = base - tMin;
	    var floor = Math.floor;
	    var stringFromCharCode = String.fromCharCode;
	    /*--------------------------------------------------------------------------*/

	    /**
	     * A generic error utility function.
	     * @private
	     * @param {String} type The error type.
	     * @returns {Error} Throws a `RangeError` with the applicable error message.
	     */

	    function error$1(type) {
	      throw new RangeError(errors[type]);
	    }
	    /**
	     * A generic `Array#map` utility function.
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} callback The function that gets called for every array
	     * item.
	     * @returns {Array} A new array of values returned by the callback function.
	     */


	    function map(array, fn) {
	      var result = [];
	      var length = array.length;

	      while (length--) {
	        result[length] = fn(array[length]);
	      }

	      return result;
	    }
	    /**
	     * A simple `Array#map`-like wrapper to work with domain name strings or email
	     * addresses.
	     * @private
	     * @param {String} domain The domain name or email address.
	     * @param {Function} callback The function that gets called for every
	     * character.
	     * @returns {Array} A new string of characters returned by the callback
	     * function.
	     */


	    function mapDomain(string, fn) {
	      var parts = string.split('@');
	      var result = '';

	      if (parts.length > 1) {
	        // In email addresses, only the domain name should be punycoded. Leave
	        // the local part (i.e. everything up to `@`) intact.
	        result = parts[0] + '@';
	        string = parts[1];
	      } // Avoid `split(regex)` for IE8 compatibility. See #17.


	      string = string.replace(regexSeparators, '\x2E');
	      var labels = string.split('.');
	      var encoded = map(labels, fn).join('.');
	      return result + encoded;
	    }
	    /**
	     * Creates an array containing the numeric code points of each Unicode
	     * character in the string. While JavaScript uses UCS-2 internally,
	     * this function will convert a pair of surrogate halves (each of which
	     * UCS-2 exposes as separate characters) into a single code point,
	     * matching UTF-16.
	     * @see `punycode.ucs2.encode`
	     * @see <https://mathiasbynens.be/notes/javascript-encoding>
	     * @memberOf punycode.ucs2
	     * @name decode
	     * @param {String} string The Unicode input string (UCS-2).
	     * @returns {Array} The new array of code points.
	     */


	    function ucs2decode(string) {
	      var output = [];
	      var counter = 0;
	      var length = string.length;

	      while (counter < length) {
	        var value = string.charCodeAt(counter++);

	        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
	          // It's a high surrogate, and there is a next character.
	          var extra = string.charCodeAt(counter++);

	          if ((extra & 0xFC00) == 0xDC00) {
	            // Low surrogate.
	            output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
	          } else {
	            // It's an unmatched surrogate; only append this code unit, in case the
	            // next code unit is the high surrogate of a surrogate pair.
	            output.push(value);
	            counter--;
	          }
	        } else {
	          output.push(value);
	        }
	      }

	      return output;
	    }
	    /**
	     * Creates a string based on an array of numeric code points.
	     * @see `punycode.ucs2.decode`
	     * @memberOf punycode.ucs2
	     * @name encode
	     * @param {Array} codePoints The array of numeric code points.
	     * @returns {String} The new Unicode string (UCS-2).
	     */


	    var ucs2encode = function ucs2encode(array) {
	      return String.fromCodePoint.apply(String, toConsumableArray(array));
	    };
	    /**
	     * Converts a basic code point into a digit/integer.
	     * @see `digitToBasic()`
	     * @private
	     * @param {Number} codePoint The basic numeric code point value.
	     * @returns {Number} The numeric value of a basic code point (for use in
	     * representing integers) in the range `0` to `base - 1`, or `base` if
	     * the code point does not represent a value.
	     */


	    var basicToDigit = function basicToDigit(codePoint) {
	      if (codePoint - 0x30 < 0x0A) {
	        return codePoint - 0x16;
	      }

	      if (codePoint - 0x41 < 0x1A) {
	        return codePoint - 0x41;
	      }

	      if (codePoint - 0x61 < 0x1A) {
	        return codePoint - 0x61;
	      }

	      return base;
	    };
	    /**
	     * Converts a digit/integer into a basic code point.
	     * @see `basicToDigit()`
	     * @private
	     * @param {Number} digit The numeric value of a basic code point.
	     * @returns {Number} The basic code point whose value (when used for
	     * representing integers) is `digit`, which needs to be in the range
	     * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	     * used; else, the lowercase form is used. The behavior is undefined
	     * if `flag` is non-zero and `digit` has no uppercase form.
	     */


	    var digitToBasic = function digitToBasic(digit, flag) {
	      //  0..25 map to ASCII a..z or A..Z
	      // 26..35 map to ASCII 0..9
	      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	    };
	    /**
	     * Bias adaptation function as per section 3.4 of RFC 3492.
	     * https://tools.ietf.org/html/rfc3492#section-3.4
	     * @private
	     */


	    var adapt = function adapt(delta, numPoints, firstTime) {
	      var k = 0;
	      delta = firstTime ? floor(delta / damp) : delta >> 1;
	      delta += floor(delta / numPoints);

	      for (;
	      /* no initialization */
	      delta > baseMinusTMin * tMax >> 1; k += base) {
	        delta = floor(delta / baseMinusTMin);
	      }

	      return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	    };
	    /**
	     * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	     * symbols.
	     * @memberOf punycode
	     * @param {String} input The Punycode string of ASCII-only symbols.
	     * @returns {String} The resulting string of Unicode symbols.
	     */


	    var decode = function decode(input) {
	      // Don't use UCS-2.
	      var output = [];
	      var inputLength = input.length;
	      var i = 0;
	      var n = initialN;
	      var bias = initialBias; // Handle the basic code points: let `basic` be the number of input code
	      // points before the last delimiter, or `0` if there is none, then copy
	      // the first basic code points to the output.

	      var basic = input.lastIndexOf(delimiter);

	      if (basic < 0) {
	        basic = 0;
	      }

	      for (var j = 0; j < basic; ++j) {
	        // if it's not a basic code point
	        if (input.charCodeAt(j) >= 0x80) {
	          error$1('not-basic');
	        }

	        output.push(input.charCodeAt(j));
	      } // Main decoding loop: start just after the last delimiter if any basic code
	      // points were copied; start at the beginning otherwise.


	      for (var index = basic > 0 ? basic + 1 : 0; index < inputLength;)
	      /* no final expression */
	      {
	        // `index` is the index of the next character to be consumed.
	        // Decode a generalized variable-length integer into `delta`,
	        // which gets added to `i`. The overflow checking is easier
	        // if we increase `i` as we go, then subtract off its starting
	        // value at the end to obtain `delta`.
	        var oldi = i;

	        for (var w = 1, k = base;;
	        /* no condition */
	        k += base) {
	          if (index >= inputLength) {
	            error$1('invalid-input');
	          }

	          var digit = basicToDigit(input.charCodeAt(index++));

	          if (digit >= base || digit > floor((maxInt - i) / w)) {
	            error$1('overflow');
	          }

	          i += digit * w;
	          var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

	          if (digit < t) {
	            break;
	          }

	          var baseMinusT = base - t;

	          if (w > floor(maxInt / baseMinusT)) {
	            error$1('overflow');
	          }

	          w *= baseMinusT;
	        }

	        var out = output.length + 1;
	        bias = adapt(i - oldi, out, oldi == 0); // `i` was supposed to wrap around from `out` to `0`,
	        // incrementing `n` each time, so we'll fix that now:

	        if (floor(i / out) > maxInt - n) {
	          error$1('overflow');
	        }

	        n += floor(i / out);
	        i %= out; // Insert `n` at position `i` of the output.

	        output.splice(i++, 0, n);
	      }

	      return String.fromCodePoint.apply(String, output);
	    };
	    /**
	     * Converts a string of Unicode symbols (e.g. a domain name label) to a
	     * Punycode string of ASCII-only symbols.
	     * @memberOf punycode
	     * @param {String} input The string of Unicode symbols.
	     * @returns {String} The resulting Punycode string of ASCII-only symbols.
	     */


	    var encode = function encode(input) {
	      var output = []; // Convert the input in UCS-2 to an array of Unicode code points.

	      input = ucs2decode(input); // Cache the length.

	      var inputLength = input.length; // Initialize the state.

	      var n = initialN;
	      var delta = 0;
	      var bias = initialBias; // Handle the basic code points.

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _currentValue2 = _step.value;

	          if (_currentValue2 < 0x80) {
	            output.push(stringFromCharCode(_currentValue2));
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      var basicLength = output.length;
	      var handledCPCount = basicLength; // `handledCPCount` is the number of code points that have been handled;
	      // `basicLength` is the number of basic code points.
	      // Finish the basic string with a delimiter unless it's empty.

	      if (basicLength) {
	        output.push(delimiter);
	      } // Main encoding loop:


	      while (handledCPCount < inputLength) {
	        // All non-basic code points < n have been handled already. Find the next
	        // larger one:
	        var m = maxInt;
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var currentValue = _step2.value;

	            if (currentValue >= n && currentValue < m) {
	              m = currentValue;
	            }
	          } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
	          // but guard against overflow.

	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }

	        var handledCPCountPlusOne = handledCPCount + 1;

	        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
	          error$1('overflow');
	        }

	        delta += (m - n) * handledCPCountPlusOne;
	        n = m;
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;

	        try {
	          for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var _currentValue = _step3.value;

	            if (_currentValue < n && ++delta > maxInt) {
	              error$1('overflow');
	            }

	            if (_currentValue == n) {
	              // Represent delta as a generalized variable-length integer.
	              var q = delta;

	              for (var k = base;;
	              /* no condition */
	              k += base) {
	                var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

	                if (q < t) {
	                  break;
	                }

	                var qMinusT = q - t;
	                var baseMinusT = base - t;
	                output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
	                q = floor(qMinusT / baseMinusT);
	              }

	              output.push(stringFromCharCode(digitToBasic(q, 0)));
	              bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
	              delta = 0;
	              ++handledCPCount;
	            }
	          }
	        } catch (err) {
	          _didIteratorError3 = true;
	          _iteratorError3 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	              _iterator3.return();
	            }
	          } finally {
	            if (_didIteratorError3) {
	              throw _iteratorError3;
	            }
	          }
	        }

	        ++delta;
	        ++n;
	      }

	      return output.join('');
	    };
	    /**
	     * Converts a Punycode string representing a domain name or an email address
	     * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	     * it doesn't matter if you call it on a string that has already been
	     * converted to Unicode.
	     * @memberOf punycode
	     * @param {String} input The Punycoded domain name or email address to
	     * convert to Unicode.
	     * @returns {String} The Unicode representation of the given Punycode
	     * string.
	     */


	    var toUnicode = function toUnicode(input) {
	      return mapDomain(input, function (string) {
	        return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
	      });
	    };
	    /**
	     * Converts a Unicode string representing a domain name or an email address to
	     * Punycode. Only the non-ASCII parts of the domain name will be converted,
	     * i.e. it doesn't matter if you call it with a domain that's already in
	     * ASCII.
	     * @memberOf punycode
	     * @param {String} input The domain name or email address to convert, as a
	     * Unicode string.
	     * @returns {String} The Punycode representation of the given domain name or
	     * email address.
	     */


	    var toASCII = function toASCII(input) {
	      return mapDomain(input, function (string) {
	        return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
	      });
	    };
	    /*--------------------------------------------------------------------------*/

	    /** Define the public API */


	    var punycode = {
	      /**
	       * A string representing the current Punycode.js version number.
	       * @memberOf punycode
	       * @type String
	       */
	      'version': '2.1.0',

	      /**
	       * An object of methods to convert from JavaScript's internal character
	       * representation (UCS-2) to Unicode code points, and back.
	       * @see <https://mathiasbynens.be/notes/javascript-encoding>
	       * @memberOf punycode
	       * @type Object
	       */
	      'ucs2': {
	        'decode': ucs2decode,
	        'encode': ucs2encode
	      },
	      'decode': decode,
	      'encode': encode,
	      'toASCII': toASCII,
	      'toUnicode': toUnicode
	    };
	    /**
	     * URI.js
	     *
	     * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
	     * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
	     * @see http://github.com/garycourt/uri-js
	     */

	    /**
	     * Copyright 2011 Gary Court. All rights reserved.
	     *
	     * Redistribution and use in source and binary forms, with or without modification, are
	     * permitted provided that the following conditions are met:
	     *
	     *    1. Redistributions of source code must retain the above copyright notice, this list of
	     *       conditions and the following disclaimer.
	     *
	     *    2. Redistributions in binary form must reproduce the above copyright notice, this list
	     *       of conditions and the following disclaimer in the documentation and/or other materials
	     *       provided with the distribution.
	     *
	     * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
	     * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
	     * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
	     * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
	     * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
	     * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
	     * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	     * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
	     * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	     *
	     * The views and conclusions contained in the software and documentation are those of the
	     * authors and should not be interpreted as representing official policies, either expressed
	     * or implied, of Gary Court.
	     */

	    var SCHEMES = {};

	    function pctEncChar(chr) {
	      var c = chr.charCodeAt(0);
	      var e = void 0;
	      if (c < 16) e = "%0" + c.toString(16).toUpperCase();else if (c < 128) e = "%" + c.toString(16).toUpperCase();else if (c < 2048) e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();else e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
	      return e;
	    }

	    function pctDecChars(str) {
	      var newStr = "";
	      var i = 0;
	      var il = str.length;

	      while (i < il) {
	        var c = parseInt(str.substr(i + 1, 2), 16);

	        if (c < 128) {
	          newStr += String.fromCharCode(c);
	          i += 3;
	        } else if (c >= 194 && c < 224) {
	          if (il - i >= 6) {
	            var c2 = parseInt(str.substr(i + 4, 2), 16);
	            newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
	          } else {
	            newStr += str.substr(i, 6);
	          }

	          i += 6;
	        } else if (c >= 224) {
	          if (il - i >= 9) {
	            var _c = parseInt(str.substr(i + 4, 2), 16);

	            var c3 = parseInt(str.substr(i + 7, 2), 16);
	            newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
	          } else {
	            newStr += str.substr(i, 9);
	          }

	          i += 9;
	        } else {
	          newStr += str.substr(i, 3);
	          i += 3;
	        }
	      }

	      return newStr;
	    }

	    function _normalizeComponentEncoding(components, protocol) {
	      function decodeUnreserved(str) {
	        var decStr = pctDecChars(str);
	        return !decStr.match(protocol.UNRESERVED) ? str : decStr;
	      }

	      if (components.scheme) components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME, "");
	      if (components.userinfo !== undefined) components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
	      if (components.host !== undefined) components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
	      if (components.path !== undefined) components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
	      if (components.query !== undefined) components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
	      if (components.fragment !== undefined) components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
	      return components;
	    }

	    function _stripLeadingZeros(str) {
	      return str.replace(/^0*(.*)/, "$1") || "0";
	    }

	    function _normalizeIPv4(host, protocol) {
	      var matches = host.match(protocol.IPV4ADDRESS) || [];

	      var _matches = slicedToArray(matches, 2),
	          address = _matches[1];

	      if (address) {
	        return address.split(".").map(_stripLeadingZeros).join(".");
	      } else {
	        return host;
	      }
	    }

	    function _normalizeIPv6(host, protocol) {
	      var matches = host.match(protocol.IPV6ADDRESS) || [];

	      var _matches2 = slicedToArray(matches, 3),
	          address = _matches2[1],
	          zone = _matches2[2];

	      if (address) {
	        var _address$toLowerCase$ = address.toLowerCase().split('::').reverse(),
	            _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2),
	            last = _address$toLowerCase$2[0],
	            first = _address$toLowerCase$2[1];

	        var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
	        var lastFields = last.split(":").map(_stripLeadingZeros);
	        var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
	        var fieldCount = isLastFieldIPv4Address ? 7 : 8;
	        var lastFieldsStart = lastFields.length - fieldCount;
	        var fields = Array(fieldCount);

	        for (var x = 0; x < fieldCount; ++x) {
	          fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || '';
	        }

	        if (isLastFieldIPv4Address) {
	          fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
	        }

	        var allZeroFields = fields.reduce(function (acc, field, index) {
	          if (!field || field === "0") {
	            var lastLongest = acc[acc.length - 1];

	            if (lastLongest && lastLongest.index + lastLongest.length === index) {
	              lastLongest.length++;
	            } else {
	              acc.push({
	                index: index,
	                length: 1
	              });
	            }
	          }

	          return acc;
	        }, []);
	        var longestZeroFields = allZeroFields.sort(function (a, b) {
	          return b.length - a.length;
	        })[0];
	        var newHost = void 0;

	        if (longestZeroFields && longestZeroFields.length > 1) {
	          var newFirst = fields.slice(0, longestZeroFields.index);
	          var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
	          newHost = newFirst.join(":") + "::" + newLast.join(":");
	        } else {
	          newHost = fields.join(":");
	        }

	        if (zone) {
	          newHost += "%" + zone;
	        }

	        return newHost;
	      } else {
	        return host;
	      }
	    }

	    var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
	    var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;

	    function parse(uriString) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var components = {};
	      var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
	      if (options.reference === "suffix") uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
	      var matches = uriString.match(URI_PARSE);

	      if (matches) {
	        if (NO_MATCH_IS_UNDEFINED) {
	          //store each component
	          components.scheme = matches[1];
	          components.userinfo = matches[3];
	          components.host = matches[4];
	          components.port = parseInt(matches[5], 10);
	          components.path = matches[6] || "";
	          components.query = matches[7];
	          components.fragment = matches[8]; //fix port number

	          if (isNaN(components.port)) {
	            components.port = matches[5];
	          }
	        } else {
	          //IE FIX for improper RegExp matching
	          //store each component
	          components.scheme = matches[1] || undefined;
	          components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : undefined;
	          components.host = uriString.indexOf("//") !== -1 ? matches[4] : undefined;
	          components.port = parseInt(matches[5], 10);
	          components.path = matches[6] || "";
	          components.query = uriString.indexOf("?") !== -1 ? matches[7] : undefined;
	          components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : undefined; //fix port number

	          if (isNaN(components.port)) {
	            components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : undefined;
	          }
	        }

	        if (components.host) {
	          //normalize IP hosts
	          components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
	        } //determine reference type


	        if (components.scheme === undefined && components.userinfo === undefined && components.host === undefined && components.port === undefined && !components.path && components.query === undefined) {
	          components.reference = "same-document";
	        } else if (components.scheme === undefined) {
	          components.reference = "relative";
	        } else if (components.fragment === undefined) {
	          components.reference = "absolute";
	        } else {
	          components.reference = "uri";
	        } //check for reference errors


	        if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
	          components.error = components.error || "URI is not a " + options.reference + " reference.";
	        } //find scheme handler


	        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()]; //check if scheme can't handle IRIs

	        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
	          //if host component is a domain name
	          if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
	            //convert Unicode IDN -> ASCII IDN
	            try {
	              components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
	            } catch (e) {
	              components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
	            }
	          } //convert IRI -> URI


	          _normalizeComponentEncoding(components, URI_PROTOCOL);
	        } else {
	          //normalize encodings
	          _normalizeComponentEncoding(components, protocol);
	        } //perform scheme specific parsing


	        if (schemeHandler && schemeHandler.parse) {
	          schemeHandler.parse(components, options);
	        }
	      } else {
	        components.error = components.error || "URI can not be parsed.";
	      }

	      return components;
	    }

	    function _recomposeAuthority(components, options) {
	      var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
	      var uriTokens = [];

	      if (components.userinfo !== undefined) {
	        uriTokens.push(components.userinfo);
	        uriTokens.push("@");
	      }

	      if (components.host !== undefined) {
	        //normalize IP hosts, add brackets and escape zone separator for IPv6
	        uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function (_, $1, $2) {
	          return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
	        }));
	      }

	      if (typeof components.port === "number") {
	        uriTokens.push(":");
	        uriTokens.push(components.port.toString(10));
	      }

	      return uriTokens.length ? uriTokens.join("") : undefined;
	    }

	    var RDS1 = /^\.\.?\//;
	    var RDS2 = /^\/\.(\/|$)/;
	    var RDS3 = /^\/\.\.(\/|$)/;
	    var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;

	    function removeDotSegments(input) {
	      var output = [];

	      while (input.length) {
	        if (input.match(RDS1)) {
	          input = input.replace(RDS1, "");
	        } else if (input.match(RDS2)) {
	          input = input.replace(RDS2, "/");
	        } else if (input.match(RDS3)) {
	          input = input.replace(RDS3, "/");
	          output.pop();
	        } else if (input === "." || input === "..") {
	          input = "";
	        } else {
	          var im = input.match(RDS5);

	          if (im) {
	            var s = im[0];
	            input = input.slice(s.length);
	            output.push(s);
	          } else {
	            throw new Error("Unexpected dot segment condition");
	          }
	        }
	      }

	      return output.join("");
	    }

	    function serialize(components) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
	      var uriTokens = []; //find scheme handler

	      var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()]; //perform scheme specific serialization

	      if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);

	      if (components.host) {
	        //if host component is an IPv6 address
	        if (protocol.IPV6ADDRESS.test(components.host)) ; //TODO: normalize IPv6 address as per RFC 5952
	        //if host component is a domain name
	        else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
	            //convert IDN via punycode
	            try {
	              components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
	            } catch (e) {
	              components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
	            }
	          }
	      } //normalize encoding


	      _normalizeComponentEncoding(components, protocol);

	      if (options.reference !== "suffix" && components.scheme) {
	        uriTokens.push(components.scheme);
	        uriTokens.push(":");
	      }

	      var authority = _recomposeAuthority(components, options);

	      if (authority !== undefined) {
	        if (options.reference !== "suffix") {
	          uriTokens.push("//");
	        }

	        uriTokens.push(authority);

	        if (components.path && components.path.charAt(0) !== "/") {
	          uriTokens.push("/");
	        }
	      }

	      if (components.path !== undefined) {
	        var s = components.path;

	        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
	          s = removeDotSegments(s);
	        }

	        if (authority === undefined) {
	          s = s.replace(/^\/\//, "/%2F"); //don't allow the path to start with "//"
	        }

	        uriTokens.push(s);
	      }

	      if (components.query !== undefined) {
	        uriTokens.push("?");
	        uriTokens.push(components.query);
	      }

	      if (components.fragment !== undefined) {
	        uriTokens.push("#");
	        uriTokens.push(components.fragment);
	      }

	      return uriTokens.join(""); //merge tokens into a string
	    }

	    function resolveComponents(base, relative) {
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      var skipNormalization = arguments[3];
	      var target = {};

	      if (!skipNormalization) {
	        base = parse(serialize(base, options), options); //normalize base components

	        relative = parse(serialize(relative, options), options); //normalize relative components
	      }

	      options = options || {};

	      if (!options.tolerant && relative.scheme) {
	        target.scheme = relative.scheme; //target.authority = relative.authority;

	        target.userinfo = relative.userinfo;
	        target.host = relative.host;
	        target.port = relative.port;
	        target.path = removeDotSegments(relative.path || "");
	        target.query = relative.query;
	      } else {
	        if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
	          //target.authority = relative.authority;
	          target.userinfo = relative.userinfo;
	          target.host = relative.host;
	          target.port = relative.port;
	          target.path = removeDotSegments(relative.path || "");
	          target.query = relative.query;
	        } else {
	          if (!relative.path) {
	            target.path = base.path;

	            if (relative.query !== undefined) {
	              target.query = relative.query;
	            } else {
	              target.query = base.query;
	            }
	          } else {
	            if (relative.path.charAt(0) === "/") {
	              target.path = removeDotSegments(relative.path);
	            } else {
	              if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
	                target.path = "/" + relative.path;
	              } else if (!base.path) {
	                target.path = relative.path;
	              } else {
	                target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
	              }

	              target.path = removeDotSegments(target.path);
	            }

	            target.query = relative.query;
	          } //target.authority = base.authority;


	          target.userinfo = base.userinfo;
	          target.host = base.host;
	          target.port = base.port;
	        }

	        target.scheme = base.scheme;
	      }

	      target.fragment = relative.fragment;
	      return target;
	    }

	    function resolve(baseURI, relativeURI, options) {
	      var schemelessOptions = assign({
	        scheme: 'null'
	      }, options);
	      return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
	    }

	    function normalize(uri, options) {
	      if (typeof uri === "string") {
	        uri = serialize(parse(uri, options), options);
	      } else if (typeOf(uri) === "object") {
	        uri = parse(serialize(uri, options), options);
	      }

	      return uri;
	    }

	    function equal(uriA, uriB, options) {
	      if (typeof uriA === "string") {
	        uriA = serialize(parse(uriA, options), options);
	      } else if (typeOf(uriA) === "object") {
	        uriA = serialize(uriA, options);
	      }

	      if (typeof uriB === "string") {
	        uriB = serialize(parse(uriB, options), options);
	      } else if (typeOf(uriB) === "object") {
	        uriB = serialize(uriB, options);
	      }

	      return uriA === uriB;
	    }

	    function escapeComponent(str, options) {
	      return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
	    }

	    function unescapeComponent(str, options) {
	      return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
	    }

	    var handler = {
	      scheme: "http",
	      domainHost: true,
	      parse: function parse(components, options) {
	        //report missing host
	        if (!components.host) {
	          components.error = components.error || "HTTP URIs must have a host.";
	        }

	        return components;
	      },
	      serialize: function serialize(components, options) {
	        //normalize the default port
	        if (components.port === (String(components.scheme).toLowerCase() !== "https" ? 80 : 443) || components.port === "") {
	          components.port = undefined;
	        } //normalize the empty path


	        if (!components.path) {
	          components.path = "/";
	        } //NOTE: We do not parse query strings for HTTP URIs
	        //as WWW Form Url Encoded query strings are part of the HTML4+ spec,
	        //and not the HTTP spec.


	        return components;
	      }
	    };
	    var handler$1 = {
	      scheme: "https",
	      domainHost: handler.domainHost,
	      parse: handler.parse,
	      serialize: handler.serialize
	    };
	    var O = {};

	    var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + ("\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" ) + "]";
	    var HEXDIG$$ = "[0-9A-Fa-f]"; //case-insensitive

	    var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)); //expanded
	    //RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
	    //const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
	    //const WSP$$ = "[\\x20\\x09]";
	    //const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
	    //const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
	    //const VCHAR$$ = "[\\x21-\\x7E]";
	    //const WSP$$ = "[\\x20\\x09]";
	    //const OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
	    //const FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
	    //const QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
	    //const QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');

	    var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
	    var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
	    var VCHAR$$ = merge(QTEXT$$, "[\\\"\\\\]");
	    var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
	    var UNRESERVED = new RegExp(UNRESERVED$$, "g");
	    var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
	    var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
	    var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
	    var NOT_HFVALUE = NOT_HFNAME;

	    function decodeUnreserved(str) {
	      var decStr = pctDecChars(str);
	      return !decStr.match(UNRESERVED) ? str : decStr;
	    }

	    var handler$2 = {
	      scheme: "mailto",
	      parse: function parse$$1(components, options) {
	        var mailtoComponents = components;
	        var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
	        mailtoComponents.path = undefined;

	        if (mailtoComponents.query) {
	          var unknownHeaders = false;
	          var headers = {};
	          var hfields = mailtoComponents.query.split("&");

	          for (var x = 0, xl = hfields.length; x < xl; ++x) {
	            var hfield = hfields[x].split("=");

	            switch (hfield[0]) {
	              case "to":
	                var toAddrs = hfield[1].split(",");

	                for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
	                  to.push(toAddrs[_x]);
	                }

	                break;

	              case "subject":
	                mailtoComponents.subject = unescapeComponent(hfield[1], options);
	                break;

	              case "body":
	                mailtoComponents.body = unescapeComponent(hfield[1], options);
	                break;

	              default:
	                unknownHeaders = true;
	                headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
	                break;
	            }
	          }

	          if (unknownHeaders) mailtoComponents.headers = headers;
	        }

	        mailtoComponents.query = undefined;

	        for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
	          var addr = to[_x2].split("@");

	          addr[0] = unescapeComponent(addr[0]);

	          if (!options.unicodeSupport) {
	            //convert Unicode IDN -> ASCII IDN
	            try {
	              addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
	            } catch (e) {
	              mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
	            }
	          } else {
	            addr[1] = unescapeComponent(addr[1], options).toLowerCase();
	          }

	          to[_x2] = addr.join("@");
	        }

	        return mailtoComponents;
	      },
	      serialize: function serialize$$1(mailtoComponents, options) {
	        var components = mailtoComponents;
	        var to = toArray(mailtoComponents.to);

	        if (to) {
	          for (var x = 0, xl = to.length; x < xl; ++x) {
	            var toAddr = String(to[x]);
	            var atIdx = toAddr.lastIndexOf("@");
	            var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
	            var domain = toAddr.slice(atIdx + 1); //convert IDN via punycode

	            try {
	              domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
	            } catch (e) {
	              components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
	            }

	            to[x] = localPart + "@" + domain;
	          }

	          components.path = to.join(",");
	        }

	        var headers = mailtoComponents.headers = mailtoComponents.headers || {};
	        if (mailtoComponents.subject) headers["subject"] = mailtoComponents.subject;
	        if (mailtoComponents.body) headers["body"] = mailtoComponents.body;
	        var fields = [];

	        for (var name in headers) {
	          if (headers[name] !== O[name]) {
	            fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
	          }
	        }

	        if (fields.length) {
	          components.query = fields.join("&");
	        }

	        return components;
	      }
	    };
	    var URN_PARSE = /^([^\:]+)\:(.*)/; //RFC 2141

	    var handler$3 = {
	      scheme: "urn",
	      parse: function parse$$1(components, options) {
	        var matches = components.path && components.path.match(URN_PARSE);
	        var urnComponents = components;

	        if (matches) {
	          var scheme = options.scheme || urnComponents.scheme || "urn";
	          var nid = matches[1].toLowerCase();
	          var nss = matches[2];
	          var urnScheme = scheme + ":" + (options.nid || nid);
	          var schemeHandler = SCHEMES[urnScheme];
	          urnComponents.nid = nid;
	          urnComponents.nss = nss;
	          urnComponents.path = undefined;

	          if (schemeHandler) {
	            urnComponents = schemeHandler.parse(urnComponents, options);
	          }
	        } else {
	          urnComponents.error = urnComponents.error || "URN can not be parsed.";
	        }

	        return urnComponents;
	      },
	      serialize: function serialize$$1(urnComponents, options) {
	        var scheme = options.scheme || urnComponents.scheme || "urn";
	        var nid = urnComponents.nid;
	        var urnScheme = scheme + ":" + (options.nid || nid);
	        var schemeHandler = SCHEMES[urnScheme];

	        if (schemeHandler) {
	          urnComponents = schemeHandler.serialize(urnComponents, options);
	        }

	        var uriComponents = urnComponents;
	        var nss = urnComponents.nss;
	        uriComponents.path = (nid || options.nid) + ":" + nss;
	        return uriComponents;
	      }
	    };
	    var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/; //RFC 4122

	    var handler$4 = {
	      scheme: "urn:uuid",
	      parse: function parse(urnComponents, options) {
	        var uuidComponents = urnComponents;
	        uuidComponents.uuid = uuidComponents.nss;
	        uuidComponents.nss = undefined;

	        if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
	          uuidComponents.error = uuidComponents.error || "UUID is not valid.";
	        }

	        return uuidComponents;
	      },
	      serialize: function serialize(uuidComponents, options) {
	        var urnComponents = uuidComponents; //normalize UUID

	        urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
	        return urnComponents;
	      }
	    };
	    SCHEMES[handler.scheme] = handler;
	    SCHEMES[handler$1.scheme] = handler$1;
	    SCHEMES[handler$2.scheme] = handler$2;
	    SCHEMES[handler$3.scheme] = handler$3;
	    SCHEMES[handler$4.scheme] = handler$4;
	    exports.SCHEMES = SCHEMES;
	    exports.pctEncChar = pctEncChar;
	    exports.pctDecChars = pctDecChars;
	    exports.parse = parse;
	    exports.removeDotSegments = removeDotSegments;
	    exports.serialize = serialize;
	    exports.resolveComponents = resolveComponents;
	    exports.resolve = resolve;
	    exports.normalize = normalize;
	    exports.equal = equal;
	    exports.escapeComponent = escapeComponent;
	    exports.unescapeComponent = unescapeComponent;
	    Object.defineProperty(exports, '__esModule', {
	      value: true
	    });
	  });
	})(uri_all, uri_all.exports);

	var fastDeepEqual = function equal(a, b) {
	  if (a === b) return true;

	  if (a && b && typeof a == 'object' && typeof b == 'object') {
	    if (a.constructor !== b.constructor) return false;
	    var length, i, keys;

	    if (Array.isArray(a)) {
	      length = a.length;
	      if (length != b.length) return false;

	      for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;

	      return true;
	    }

	    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
	    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
	    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
	    keys = Object.keys(a);
	    length = keys.length;
	    if (length !== Object.keys(b).length) return false;

	    for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

	    for (i = length; i-- !== 0;) {
	      var key = keys[i];
	      if (!equal(a[key], b[key])) return false;
	    }

	    return true;
	  } // true if both NaN, false otherwise


	  return a !== a && b !== b;
	};

	// https://github.com/bestiejs/punycode.js - punycode.ucs2.decode


	var ucs2length$1 = function ucs2length(str) {
	  var length = 0,
	      len = str.length,
	      pos = 0,
	      value;

	  while (pos < len) {
	    length++;
	    value = str.charCodeAt(pos++);

	    if (value >= 0xD800 && value <= 0xDBFF && pos < len) {
	      // high surrogate, and there is a next character
	      value = str.charCodeAt(pos);
	      if ((value & 0xFC00) == 0xDC00) pos++; // low surrogate
	    }
	  }

	  return length;
	};

	var util$5 = {
	  copy: copy,
	  checkDataType: checkDataType,
	  checkDataTypes: checkDataTypes,
	  coerceToTypes: coerceToTypes,
	  toHash: toHash$1,
	  getProperty: getProperty,
	  escapeQuotes: escapeQuotes,
	  equal: fastDeepEqual,
	  ucs2length: ucs2length$1,
	  varOccurences: varOccurences,
	  varReplace: varReplace,
	  cleanUpCode: cleanUpCode,
	  finalCleanUpCode: finalCleanUpCode,
	  schemaHasRules: schemaHasRules,
	  schemaHasRulesExcept: schemaHasRulesExcept,
	  schemaUnknownRules: schemaUnknownRules,
	  toQuotedString: toQuotedString,
	  getPathExpr: getPathExpr,
	  getPath: getPath,
	  getData: getData,
	  unescapeFragment: unescapeFragment,
	  unescapeJsonPointer: unescapeJsonPointer,
	  escapeFragment: escapeFragment,
	  escapeJsonPointer: escapeJsonPointer
	};

	function copy(o, to) {
	  to = to || {};

	  for (var key in o) to[key] = o[key];

	  return to;
	}

	function checkDataType(dataType, data, negate) {
	  var EQUAL = negate ? ' !== ' : ' === ',
	      AND = negate ? ' || ' : ' && ',
	      OK = negate ? '!' : '',
	      NOT = negate ? '' : '!';

	  switch (dataType) {
	    case 'null':
	      return data + EQUAL + 'null';

	    case 'array':
	      return OK + 'Array.isArray(' + data + ')';

	    case 'object':
	      return '(' + OK + data + AND + 'typeof ' + data + EQUAL + '"object"' + AND + NOT + 'Array.isArray(' + data + '))';

	    case 'integer':
	      return '(typeof ' + data + EQUAL + '"number"' + AND + NOT + '(' + data + ' % 1)' + AND + data + EQUAL + data + ')';

	    default:
	      return 'typeof ' + data + EQUAL + '"' + dataType + '"';
	  }
	}

	function checkDataTypes(dataTypes, data) {
	  switch (dataTypes.length) {
	    case 1:
	      return checkDataType(dataTypes[0], data, true);

	    default:
	      var code = '';
	      var types = toHash$1(dataTypes);

	      if (types.array && types.object) {
	        code = types.null ? '(' : '(!' + data + ' || ';
	        code += 'typeof ' + data + ' !== "object")';
	        delete types.null;
	        delete types.array;
	        delete types.object;
	      }

	      if (types.number) delete types.integer;

	      for (var t in types) code += (code ? ' && ' : '') + checkDataType(t, data, true);

	      return code;
	  }
	}

	var COERCE_TO_TYPES = toHash$1(['string', 'number', 'integer', 'boolean', 'null']);

	function coerceToTypes(optionCoerceTypes, dataTypes) {
	  if (Array.isArray(dataTypes)) {
	    var types = [];

	    for (var i = 0; i < dataTypes.length; i++) {
	      var t = dataTypes[i];
	      if (COERCE_TO_TYPES[t]) types[types.length] = t;else if (optionCoerceTypes === 'array' && t === 'array') types[types.length] = t;
	    }

	    if (types.length) return types;
	  } else if (COERCE_TO_TYPES[dataTypes]) {
	    return [dataTypes];
	  } else if (optionCoerceTypes === 'array' && dataTypes === 'array') {
	    return ['array'];
	  }
	}

	function toHash$1(arr) {
	  var hash = {};

	  for (var i = 0; i < arr.length; i++) hash[arr[i]] = true;

	  return hash;
	}

	var IDENTIFIER$1 = /^[a-z$_][a-z$_0-9]*$/i;
	var SINGLE_QUOTE = /'|\\/g;

	function getProperty(key) {
	  return typeof key == 'number' ? '[' + key + ']' : IDENTIFIER$1.test(key) ? '.' + key : "['" + escapeQuotes(key) + "']";
	}

	function escapeQuotes(str) {
	  return str.replace(SINGLE_QUOTE, '\\$&').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\f/g, '\\f').replace(/\t/g, '\\t');
	}

	function varOccurences(str, dataVar) {
	  dataVar += '[^0-9]';
	  var matches = str.match(new RegExp(dataVar, 'g'));
	  return matches ? matches.length : 0;
	}

	function varReplace(str, dataVar, expr) {
	  dataVar += '([^0-9])';
	  expr = expr.replace(/\$/g, '$$$$');
	  return str.replace(new RegExp(dataVar, 'g'), expr + '$1');
	}

	var EMPTY_ELSE = /else\s*{\s*}/g,
	    EMPTY_IF_NO_ELSE = /if\s*\([^)]+\)\s*\{\s*\}(?!\s*else)/g,
	    EMPTY_IF_WITH_ELSE = /if\s*\(([^)]+)\)\s*\{\s*\}\s*else(?!\s*if)/g;

	function cleanUpCode(out) {
	  return out.replace(EMPTY_ELSE, '').replace(EMPTY_IF_NO_ELSE, '').replace(EMPTY_IF_WITH_ELSE, 'if (!($1))');
	}

	var ERRORS_REGEXP = /[^v.]errors/g,
	    REMOVE_ERRORS = /var errors = 0;|var vErrors = null;|validate.errors = vErrors;/g,
	    REMOVE_ERRORS_ASYNC = /var errors = 0;|var vErrors = null;/g,
	    RETURN_VALID = 'return errors === 0;',
	    RETURN_TRUE = 'validate.errors = null; return true;',
	    RETURN_ASYNC = /if \(errors === 0\) return data;\s*else throw new ValidationError\(vErrors\);/,
	    RETURN_DATA_ASYNC = 'return data;',
	    ROOTDATA_REGEXP = /[^A-Za-z_$]rootData[^A-Za-z0-9_$]/g,
	    REMOVE_ROOTDATA = /if \(rootData === undefined\) rootData = data;/;

	function finalCleanUpCode(out, async) {
	  var matches = out.match(ERRORS_REGEXP);

	  if (matches && matches.length == 2) {
	    out = async ? out.replace(REMOVE_ERRORS_ASYNC, '').replace(RETURN_ASYNC, RETURN_DATA_ASYNC) : out.replace(REMOVE_ERRORS, '').replace(RETURN_VALID, RETURN_TRUE);
	  }

	  matches = out.match(ROOTDATA_REGEXP);
	  if (!matches || matches.length !== 3) return out;
	  return out.replace(REMOVE_ROOTDATA, '');
	}

	function schemaHasRules(schema, rules) {
	  if (typeof schema == 'boolean') return !schema;

	  for (var key in schema) if (rules[key]) return true;
	}

	function schemaHasRulesExcept(schema, rules, exceptKeyword) {
	  if (typeof schema == 'boolean') return !schema && exceptKeyword != 'not';

	  for (var key in schema) if (key != exceptKeyword && rules[key]) return true;
	}

	function schemaUnknownRules(schema, rules) {
	  if (typeof schema == 'boolean') return;

	  for (var key in schema) if (!rules[key]) return key;
	}

	function toQuotedString(str) {
	  return '\'' + escapeQuotes(str) + '\'';
	}

	function getPathExpr(currentPath, expr, jsonPointers, isNumber) {
	  var path = jsonPointers // false by default
	  ? '\'/\' + ' + expr + (isNumber ? '' : '.replace(/~/g, \'~0\').replace(/\\//g, \'~1\')') : isNumber ? '\'[\' + ' + expr + ' + \']\'' : '\'[\\\'\' + ' + expr + ' + \'\\\']\'';
	  return joinPaths(currentPath, path);
	}

	function getPath(currentPath, prop, jsonPointers) {
	  var path = jsonPointers // false by default
	  ? toQuotedString('/' + escapeJsonPointer(prop)) : toQuotedString(getProperty(prop));
	  return joinPaths(currentPath, path);
	}

	var JSON_POINTER$1 = /^\/(?:[^~]|~0|~1)*$/;
	var RELATIVE_JSON_POINTER$1 = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;

	function getData($data, lvl, paths) {
	  var up, jsonPointer, data, matches;
	  if ($data === '') return 'rootData';

	  if ($data[0] == '/') {
	    if (!JSON_POINTER$1.test($data)) throw new Error('Invalid JSON-pointer: ' + $data);
	    jsonPointer = $data;
	    data = 'rootData';
	  } else {
	    matches = $data.match(RELATIVE_JSON_POINTER$1);
	    if (!matches) throw new Error('Invalid JSON-pointer: ' + $data);
	    up = +matches[1];
	    jsonPointer = matches[2];

	    if (jsonPointer == '#') {
	      if (up >= lvl) throw new Error('Cannot access property/index ' + up + ' levels up, current level is ' + lvl);
	      return paths[lvl - up];
	    }

	    if (up > lvl) throw new Error('Cannot access data ' + up + ' levels up, current level is ' + lvl);
	    data = 'data' + (lvl - up || '');
	    if (!jsonPointer) return data;
	  }

	  var expr = data;
	  var segments = jsonPointer.split('/');

	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i];

	    if (segment) {
	      data += getProperty(unescapeJsonPointer(segment));
	      expr += ' && ' + data;
	    }
	  }

	  return expr;
	}

	function joinPaths(a, b) {
	  if (a == '""') return b;
	  return (a + ' + ' + b).replace(/' \+ '/g, '');
	}

	function unescapeFragment(str) {
	  return unescapeJsonPointer(decodeURIComponent(str));
	}

	function escapeFragment(str) {
	  return encodeURIComponent(escapeJsonPointer(str));
	}

	function escapeJsonPointer(str) {
	  return str.replace(/~/g, '~0').replace(/\//g, '~1');
	}

	function unescapeJsonPointer(str) {
	  return str.replace(/~1/g, '/').replace(/~0/g, '~');
	}

	var util$4 = util$5;
	var schema_obj = SchemaObject$2;

	function SchemaObject$2(obj) {
	  util$4.copy(obj, this);
	}

	var jsonSchemaTraverse = {exports: {}};

	var traverse$1 = jsonSchemaTraverse.exports = function (schema, opts, cb) {
	  // Legacy support for v0.3.1 and earlier.
	  if (typeof opts == 'function') {
	    cb = opts;
	    opts = {};
	  }

	  cb = opts.cb || cb;
	  var pre = typeof cb == 'function' ? cb : cb.pre || function () {};

	  var post = cb.post || function () {};

	  _traverse(opts, pre, post, schema, '', schema);
	};

	traverse$1.keywords = {
	  additionalItems: true,
	  items: true,
	  contains: true,
	  additionalProperties: true,
	  propertyNames: true,
	  not: true
	};
	traverse$1.arrayKeywords = {
	  items: true,
	  allOf: true,
	  anyOf: true,
	  oneOf: true
	};
	traverse$1.propsKeywords = {
	  definitions: true,
	  properties: true,
	  patternProperties: true,
	  dependencies: true
	};
	traverse$1.skipKeywords = {
	  default: true,
	  enum: true,
	  const: true,
	  required: true,
	  maximum: true,
	  minimum: true,
	  exclusiveMaximum: true,
	  exclusiveMinimum: true,
	  multipleOf: true,
	  maxLength: true,
	  minLength: true,
	  pattern: true,
	  format: true,
	  maxItems: true,
	  minItems: true,
	  uniqueItems: true,
	  maxProperties: true,
	  minProperties: true
	};

	function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
	  if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
	    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);

	    for (var key in schema) {
	      var sch = schema[key];

	      if (Array.isArray(sch)) {
	        if (key in traverse$1.arrayKeywords) {
	          for (var i = 0; i < sch.length; i++) _traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
	        }
	      } else if (key in traverse$1.propsKeywords) {
	        if (sch && typeof sch == 'object') {
	          for (var prop in sch) _traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
	        }
	      } else if (key in traverse$1.keywords || opts.allKeys && !(key in traverse$1.skipKeywords)) {
	        _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
	      }
	    }

	    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
	  }
	}

	function escapeJsonPtr(str) {
	  return str.replace(/~/g, '~0').replace(/\//g, '~1');
	}

	var URI$1 = uri_all.exports,
	    equal$1 = fastDeepEqual,
	    util$3 = util$5,
	    SchemaObject$1 = schema_obj,
	    traverse = jsonSchemaTraverse.exports;
	var resolve_1 = resolve$3;
	resolve$3.normalizeId = normalizeId;
	resolve$3.fullPath = getFullPath;
	resolve$3.url = resolveUrl;
	resolve$3.ids = resolveIds;
	resolve$3.inlineRef = inlineRef;
	resolve$3.schema = resolveSchema;
	/**
	 * [resolve and compile the references ($ref)]
	 * @this   Ajv
	 * @param  {Function} compile reference to schema compilation funciton (localCompile)
	 * @param  {Object} root object with information about the root schema for the current schema
	 * @param  {String} ref reference to resolve
	 * @return {Object|Function} schema object (if the schema can be inlined) or validation function
	 */

	function resolve$3(compile, root, ref) {
	  /* jshint validthis: true */
	  var refVal = this._refs[ref];

	  if (typeof refVal == 'string') {
	    if (this._refs[refVal]) refVal = this._refs[refVal];else return resolve$3.call(this, compile, root, refVal);
	  }

	  refVal = refVal || this._schemas[ref];

	  if (refVal instanceof SchemaObject$1) {
	    return inlineRef(refVal.schema, this._opts.inlineRefs) ? refVal.schema : refVal.validate || this._compile(refVal);
	  }

	  var res = resolveSchema.call(this, root, ref);
	  var schema, v, baseId;

	  if (res) {
	    schema = res.schema;
	    root = res.root;
	    baseId = res.baseId;
	  }

	  if (schema instanceof SchemaObject$1) {
	    v = schema.validate || compile.call(this, schema.schema, root, undefined, baseId);
	  } else if (schema !== undefined) {
	    v = inlineRef(schema, this._opts.inlineRefs) ? schema : compile.call(this, schema, root, undefined, baseId);
	  }

	  return v;
	}
	/**
	 * Resolve schema, its root and baseId
	 * @this Ajv
	 * @param  {Object} root root object with properties schema, refVal, refs
	 * @param  {String} ref  reference to resolve
	 * @return {Object} object with properties schema, root, baseId
	 */


	function resolveSchema(root, ref) {
	  /* jshint validthis: true */
	  var p = URI$1.parse(ref),
	      refPath = _getFullPath(p),
	      baseId = getFullPath(this._getId(root.schema));

	  if (Object.keys(root.schema).length === 0 || refPath !== baseId) {
	    var id = normalizeId(refPath);
	    var refVal = this._refs[id];

	    if (typeof refVal == 'string') {
	      return resolveRecursive.call(this, root, refVal, p);
	    } else if (refVal instanceof SchemaObject$1) {
	      if (!refVal.validate) this._compile(refVal);
	      root = refVal;
	    } else {
	      refVal = this._schemas[id];

	      if (refVal instanceof SchemaObject$1) {
	        if (!refVal.validate) this._compile(refVal);
	        if (id == normalizeId(ref)) return {
	          schema: refVal,
	          root: root,
	          baseId: baseId
	        };
	        root = refVal;
	      } else {
	        return;
	      }
	    }

	    if (!root.schema) return;
	    baseId = getFullPath(this._getId(root.schema));
	  }

	  return getJsonPointer.call(this, p, baseId, root.schema, root);
	}
	/* @this Ajv */


	function resolveRecursive(root, ref, parsedRef) {
	  /* jshint validthis: true */
	  var res = resolveSchema.call(this, root, ref);

	  if (res) {
	    var schema = res.schema;
	    var baseId = res.baseId;
	    root = res.root;

	    var id = this._getId(schema);

	    if (id) baseId = resolveUrl(baseId, id);
	    return getJsonPointer.call(this, parsedRef, baseId, schema, root);
	  }
	}

	var PREVENT_SCOPE_CHANGE = util$3.toHash(['properties', 'patternProperties', 'enum', 'dependencies', 'definitions']);
	/* @this Ajv */

	function getJsonPointer(parsedRef, baseId, schema, root) {
	  /* jshint validthis: true */
	  parsedRef.fragment = parsedRef.fragment || '';
	  if (parsedRef.fragment.slice(0, 1) != '/') return;
	  var parts = parsedRef.fragment.split('/');

	  for (var i = 1; i < parts.length; i++) {
	    var part = parts[i];

	    if (part) {
	      part = util$3.unescapeFragment(part);
	      schema = schema[part];
	      if (schema === undefined) break;
	      var id;

	      if (!PREVENT_SCOPE_CHANGE[part]) {
	        id = this._getId(schema);
	        if (id) baseId = resolveUrl(baseId, id);

	        if (schema.$ref) {
	          var $ref = resolveUrl(baseId, schema.$ref);
	          var res = resolveSchema.call(this, root, $ref);

	          if (res) {
	            schema = res.schema;
	            root = res.root;
	            baseId = res.baseId;
	          }
	        }
	      }
	    }
	  }

	  if (schema !== undefined && schema !== root.schema) return {
	    schema: schema,
	    root: root,
	    baseId: baseId
	  };
	}

	var SIMPLE_INLINED = util$3.toHash(['type', 'format', 'pattern', 'maxLength', 'minLength', 'maxProperties', 'minProperties', 'maxItems', 'minItems', 'maximum', 'minimum', 'uniqueItems', 'multipleOf', 'required', 'enum']);

	function inlineRef(schema, limit) {
	  if (limit === false) return false;
	  if (limit === undefined || limit === true) return checkNoRef(schema);else if (limit) return countKeys(schema) <= limit;
	}

	function checkNoRef(schema) {
	  var item;

	  if (Array.isArray(schema)) {
	    for (var i = 0; i < schema.length; i++) {
	      item = schema[i];
	      if (typeof item == 'object' && !checkNoRef(item)) return false;
	    }
	  } else {
	    for (var key in schema) {
	      if (key == '$ref') return false;
	      item = schema[key];
	      if (typeof item == 'object' && !checkNoRef(item)) return false;
	    }
	  }

	  return true;
	}

	function countKeys(schema) {
	  var count = 0,
	      item;

	  if (Array.isArray(schema)) {
	    for (var i = 0; i < schema.length; i++) {
	      item = schema[i];
	      if (typeof item == 'object') count += countKeys(item);
	      if (count == Infinity) return Infinity;
	    }
	  } else {
	    for (var key in schema) {
	      if (key == '$ref') return Infinity;

	      if (SIMPLE_INLINED[key]) {
	        count++;
	      } else {
	        item = schema[key];
	        if (typeof item == 'object') count += countKeys(item) + 1;
	        if (count == Infinity) return Infinity;
	      }
	    }
	  }

	  return count;
	}

	function getFullPath(id, normalize) {
	  if (normalize !== false) id = normalizeId(id);
	  var p = URI$1.parse(id);
	  return _getFullPath(p);
	}

	function _getFullPath(p) {
	  return URI$1.serialize(p).split('#')[0] + '#';
	}

	var TRAILING_SLASH_HASH = /#\/?$/;

	function normalizeId(id) {
	  return id ? id.replace(TRAILING_SLASH_HASH, '') : '';
	}

	function resolveUrl(baseId, id) {
	  id = normalizeId(id);
	  return URI$1.resolve(baseId, id);
	}
	/* @this Ajv */


	function resolveIds(schema) {
	  var schemaId = normalizeId(this._getId(schema));
	  var baseIds = {
	    '': schemaId
	  };
	  var fullPaths = {
	    '': getFullPath(schemaId, false)
	  };
	  var localRefs = {};
	  var self = this;
	  traverse(schema, {
	    allKeys: true
	  }, function (sch, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
	    if (jsonPtr === '') return;

	    var id = self._getId(sch);

	    var baseId = baseIds[parentJsonPtr];
	    var fullPath = fullPaths[parentJsonPtr] + '/' + parentKeyword;
	    if (keyIndex !== undefined) fullPath += '/' + (typeof keyIndex == 'number' ? keyIndex : util$3.escapeFragment(keyIndex));

	    if (typeof id == 'string') {
	      id = baseId = normalizeId(baseId ? URI$1.resolve(baseId, id) : id);
	      var refVal = self._refs[id];
	      if (typeof refVal == 'string') refVal = self._refs[refVal];

	      if (refVal && refVal.schema) {
	        if (!equal$1(sch, refVal.schema)) throw new Error('id "' + id + '" resolves to more than one schema');
	      } else if (id != normalizeId(fullPath)) {
	        if (id[0] == '#') {
	          if (localRefs[id] && !equal$1(sch, localRefs[id])) throw new Error('id "' + id + '" resolves to more than one schema');
	          localRefs[id] = sch;
	        } else {
	          self._refs[id] = fullPath;
	        }
	      }
	    }

	    baseIds[jsonPtr] = baseId;
	    fullPaths[jsonPtr] = fullPath;
	  });
	  return localRefs;
	}

	var resolve$2 = resolve_1;
	var error_classes = {
	  Validation: errorSubclass(ValidationError$1),
	  MissingRef: errorSubclass(MissingRefError$1)
	};

	function ValidationError$1(errors) {
	  this.message = 'validation failed';
	  this.errors = errors;
	  this.ajv = this.validation = true;
	}

	MissingRefError$1.message = function (baseId, ref) {
	  return 'can\'t resolve reference ' + ref + ' from id ' + baseId;
	};

	function MissingRefError$1(baseId, ref, message) {
	  this.message = message || MissingRefError$1.message(baseId, ref);
	  this.missingRef = resolve$2.url(baseId, ref);
	  this.missingSchema = resolve$2.normalizeId(resolve$2.fullPath(this.missingRef));
	}

	function errorSubclass(Subclass) {
	  Subclass.prototype = Object.create(Error.prototype);
	  Subclass.prototype.constructor = Subclass;
	  return Subclass;
	}

	var fastJsonStableStringify = function (data, opts) {
	  if (!opts) opts = {};
	  if (typeof opts === 'function') opts = {
	    cmp: opts
	  };
	  var cycles = typeof opts.cycles === 'boolean' ? opts.cycles : false;

	  var cmp = opts.cmp && function (f) {
	    return function (node) {
	      return function (a, b) {
	        var aobj = {
	          key: a,
	          value: node[a]
	        };
	        var bobj = {
	          key: b,
	          value: node[b]
	        };
	        return f(aobj, bobj);
	      };
	    };
	  }(opts.cmp);

	  var seen = [];
	  return function stringify(node) {
	    if (node && node.toJSON && typeof node.toJSON === 'function') {
	      node = node.toJSON();
	    }

	    if (node === undefined) return;
	    if (typeof node == 'number') return isFinite(node) ? '' + node : 'null';
	    if (typeof node !== 'object') return JSON.stringify(node);
	    var i, out;

	    if (Array.isArray(node)) {
	      out = '[';

	      for (i = 0; i < node.length; i++) {
	        if (i) out += ',';
	        out += stringify(node[i]) || 'null';
	      }

	      return out + ']';
	    }

	    if (node === null) return 'null';

	    if (seen.indexOf(node) !== -1) {
	      if (cycles) return JSON.stringify('__cycle__');
	      throw new TypeError('Converting circular structure to JSON');
	    }

	    var seenIndex = seen.push(node) - 1;
	    var keys = Object.keys(node).sort(cmp && cmp(node));
	    out = '';

	    for (i = 0; i < keys.length; i++) {
	      var key = keys[i];
	      var value = stringify(node[key]);
	      if (!value) continue;
	      if (out) out += ',';
	      out += JSON.stringify(key) + ':' + value;
	    }

	    seen.splice(seenIndex, 1);
	    return '{' + out + '}';
	  }(data);
	};

	var validate$1 = function generate_validate(it, $keyword, $ruleType) {
	  var out = '';

	  var $async = it.schema.$async === true,
	      $refKeywords = it.util.schemaHasRulesExcept(it.schema, it.RULES.all, '$ref'),
	      $id = it.self._getId(it.schema);

	  if (it.opts.strictKeywords) {
	    var $unknownKwd = it.util.schemaUnknownRules(it.schema, it.RULES.keywords);

	    if ($unknownKwd) {
	      var $keywordsMsg = 'unknown keyword: ' + $unknownKwd;
	      if (it.opts.strictKeywords === 'log') it.logger.warn($keywordsMsg);else throw new Error($keywordsMsg);
	    }
	  }

	  if (it.isTop) {
	    out += ' var validate = ';

	    if ($async) {
	      it.async = true;
	      out += 'async ';
	    }

	    out += 'function(data, dataPath, parentData, parentDataProperty, rootData) { \'use strict\'; ';

	    if ($id && (it.opts.sourceCode || it.opts.processCode)) {
	      out += ' ' + ('/\*# sourceURL=' + $id + ' */') + ' ';
	    }
	  }

	  if (typeof it.schema == 'boolean' || !($refKeywords || it.schema.$ref)) {
	    var $keyword = 'false schema';
	    var $lvl = it.level;
	    var $dataLvl = it.dataLevel;
	    var $schema = it.schema[$keyword];
	    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	    var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	    var $breakOnError = !it.opts.allErrors;
	    var $errorKeyword;
	    var $data = 'data' + ($dataLvl || '');
	    var $valid = 'valid' + $lvl;

	    if (it.schema === false) {
	      if (it.isTop) {
	        $breakOnError = true;
	      } else {
	        out += ' var ' + $valid + ' = false; ';
	      }

	      var $$outStack = $$outStack || [];
	      $$outStack.push(out);
	      out = '';
	      /* istanbul ignore else */

	      if (it.createErrors !== false) {
	        out += ' { keyword: \'' + ($errorKeyword || 'false schema') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: {} ';

	        if (it.opts.messages !== false) {
	          out += ' , message: \'boolean schema is false\' ';
	        }

	        if (it.opts.verbose) {
	          out += ' , schema: false , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	        }

	        out += ' } ';
	      } else {
	        out += ' {} ';
	      }

	      var __err = out;
	      out = $$outStack.pop();

	      if (!it.compositeRule && $breakOnError) {
	        /* istanbul ignore if */
	        if (it.async) {
	          out += ' throw new ValidationError([' + __err + ']); ';
	        } else {
	          out += ' validate.errors = [' + __err + ']; return false; ';
	        }
	      } else {
	        out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	      }
	    } else {
	      if (it.isTop) {
	        if ($async) {
	          out += ' return data; ';
	        } else {
	          out += ' validate.errors = null; return true; ';
	        }
	      } else {
	        out += ' var ' + $valid + ' = true; ';
	      }
	    }

	    if (it.isTop) {
	      out += ' }; return validate; ';
	    }

	    return out;
	  }

	  if (it.isTop) {
	    var $top = it.isTop,
	        $lvl = it.level = 0,
	        $dataLvl = it.dataLevel = 0,
	        $data = 'data';
	    it.rootId = it.resolve.fullPath(it.self._getId(it.root.schema));
	    it.baseId = it.baseId || it.rootId;
	    delete it.isTop;
	    it.dataPathArr = [undefined];

	    if (it.schema.default !== undefined && it.opts.useDefaults && it.opts.strictDefaults) {
	      var $defaultMsg = 'default is ignored in the schema root';
	      if (it.opts.strictDefaults === 'log') it.logger.warn($defaultMsg);else throw new Error($defaultMsg);
	    }

	    out += ' var vErrors = null; ';
	    out += ' var errors = 0;     ';
	    out += ' if (rootData === undefined) rootData = data; ';
	  } else {
	    var $lvl = it.level,
	        $dataLvl = it.dataLevel,
	        $data = 'data' + ($dataLvl || '');
	    if ($id) it.baseId = it.resolve.url(it.baseId, $id);
	    if ($async && !it.async) throw new Error('async schema in sync schema');
	    out += ' var errs_' + $lvl + ' = errors;';
	  }

	  var $valid = 'valid' + $lvl,
	      $breakOnError = !it.opts.allErrors,
	      $closingBraces1 = '',
	      $closingBraces2 = '';
	  var $errorKeyword;
	  var $typeSchema = it.schema.type,
	      $typeIsArray = Array.isArray($typeSchema);

	  if ($typeSchema && it.opts.nullable && it.schema.nullable === true) {
	    if ($typeIsArray) {
	      if ($typeSchema.indexOf('null') == -1) $typeSchema = $typeSchema.concat('null');
	    } else if ($typeSchema != 'null') {
	      $typeSchema = [$typeSchema, 'null'];
	      $typeIsArray = true;
	    }
	  }

	  if ($typeIsArray && $typeSchema.length == 1) {
	    $typeSchema = $typeSchema[0];
	    $typeIsArray = false;
	  }

	  if (it.schema.$ref && $refKeywords) {
	    if (it.opts.extendRefs == 'fail') {
	      throw new Error('$ref: validation keywords used in schema at path "' + it.errSchemaPath + '" (see option extendRefs)');
	    } else if (it.opts.extendRefs !== true) {
	      $refKeywords = false;
	      it.logger.warn('$ref: keywords ignored in schema at path "' + it.errSchemaPath + '"');
	    }
	  }

	  if (it.schema.$comment && it.opts.$comment) {
	    out += ' ' + it.RULES.all.$comment.code(it, '$comment');
	  }

	  if ($typeSchema) {
	    if (it.opts.coerceTypes) {
	      var $coerceToTypes = it.util.coerceToTypes(it.opts.coerceTypes, $typeSchema);
	    }

	    var $rulesGroup = it.RULES.types[$typeSchema];

	    if ($coerceToTypes || $typeIsArray || $rulesGroup === true || $rulesGroup && !$shouldUseGroup($rulesGroup)) {
	      var $schemaPath = it.schemaPath + '.type',
	          $errSchemaPath = it.errSchemaPath + '/type';
	      var $schemaPath = it.schemaPath + '.type',
	          $errSchemaPath = it.errSchemaPath + '/type',
	          $method = $typeIsArray ? 'checkDataTypes' : 'checkDataType';
	      out += ' if (' + it.util[$method]($typeSchema, $data, true) + ') { ';

	      if ($coerceToTypes) {
	        var $dataType = 'dataType' + $lvl,
	            $coerced = 'coerced' + $lvl;
	        out += ' var ' + $dataType + ' = typeof ' + $data + '; ';

	        if (it.opts.coerceTypes == 'array') {
	          out += ' if (' + $dataType + ' == \'object\' && Array.isArray(' + $data + ')) ' + $dataType + ' = \'array\'; ';
	        }

	        out += ' var ' + $coerced + ' = undefined; ';
	        var $bracesCoercion = '';
	        var arr1 = $coerceToTypes;

	        if (arr1) {
	          var $type,
	              $i = -1,
	              l1 = arr1.length - 1;

	          while ($i < l1) {
	            $type = arr1[$i += 1];

	            if ($i) {
	              out += ' if (' + $coerced + ' === undefined) { ';
	              $bracesCoercion += '}';
	            }

	            if (it.opts.coerceTypes == 'array' && $type != 'array') {
	              out += ' if (' + $dataType + ' == \'array\' && ' + $data + '.length == 1) { ' + $coerced + ' = ' + $data + ' = ' + $data + '[0]; ' + $dataType + ' = typeof ' + $data + ';  } ';
	            }

	            if ($type == 'string') {
	              out += ' if (' + $dataType + ' == \'number\' || ' + $dataType + ' == \'boolean\') ' + $coerced + ' = \'\' + ' + $data + '; else if (' + $data + ' === null) ' + $coerced + ' = \'\'; ';
	            } else if ($type == 'number' || $type == 'integer') {
	              out += ' if (' + $dataType + ' == \'boolean\' || ' + $data + ' === null || (' + $dataType + ' == \'string\' && ' + $data + ' && ' + $data + ' == +' + $data + ' ';

	              if ($type == 'integer') {
	                out += ' && !(' + $data + ' % 1)';
	              }

	              out += ')) ' + $coerced + ' = +' + $data + '; ';
	            } else if ($type == 'boolean') {
	              out += ' if (' + $data + ' === \'false\' || ' + $data + ' === 0 || ' + $data + ' === null) ' + $coerced + ' = false; else if (' + $data + ' === \'true\' || ' + $data + ' === 1) ' + $coerced + ' = true; ';
	            } else if ($type == 'null') {
	              out += ' if (' + $data + ' === \'\' || ' + $data + ' === 0 || ' + $data + ' === false) ' + $coerced + ' = null; ';
	            } else if (it.opts.coerceTypes == 'array' && $type == 'array') {
	              out += ' if (' + $dataType + ' == \'string\' || ' + $dataType + ' == \'number\' || ' + $dataType + ' == \'boolean\' || ' + $data + ' == null) ' + $coerced + ' = [' + $data + ']; ';
	            }
	          }
	        }

	        out += ' ' + $bracesCoercion + ' if (' + $coerced + ' === undefined) {   ';
	        var $$outStack = $$outStack || [];
	        $$outStack.push(out);
	        out = '';
	        /* istanbul ignore else */

	        if (it.createErrors !== false) {
	          out += ' { keyword: \'' + ($errorKeyword || 'type') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { type: \'';

	          if ($typeIsArray) {
	            out += '' + $typeSchema.join(",");
	          } else {
	            out += '' + $typeSchema;
	          }

	          out += '\' } ';

	          if (it.opts.messages !== false) {
	            out += ' , message: \'should be ';

	            if ($typeIsArray) {
	              out += '' + $typeSchema.join(",");
	            } else {
	              out += '' + $typeSchema;
	            }

	            out += '\' ';
	          }

	          if (it.opts.verbose) {
	            out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	          }

	          out += ' } ';
	        } else {
	          out += ' {} ';
	        }

	        var __err = out;
	        out = $$outStack.pop();

	        if (!it.compositeRule && $breakOnError) {
	          /* istanbul ignore if */
	          if (it.async) {
	            out += ' throw new ValidationError([' + __err + ']); ';
	          } else {
	            out += ' validate.errors = [' + __err + ']; return false; ';
	          }
	        } else {
	          out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	        }

	        out += ' } else {  ';
	        var $parentData = $dataLvl ? 'data' + ($dataLvl - 1 || '') : 'parentData',
	            $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
	        out += ' ' + $data + ' = ' + $coerced + '; ';

	        if (!$dataLvl) {
	          out += 'if (' + $parentData + ' !== undefined)';
	        }

	        out += ' ' + $parentData + '[' + $parentDataProperty + '] = ' + $coerced + '; } ';
	      } else {
	        var $$outStack = $$outStack || [];
	        $$outStack.push(out);
	        out = '';
	        /* istanbul ignore else */

	        if (it.createErrors !== false) {
	          out += ' { keyword: \'' + ($errorKeyword || 'type') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { type: \'';

	          if ($typeIsArray) {
	            out += '' + $typeSchema.join(",");
	          } else {
	            out += '' + $typeSchema;
	          }

	          out += '\' } ';

	          if (it.opts.messages !== false) {
	            out += ' , message: \'should be ';

	            if ($typeIsArray) {
	              out += '' + $typeSchema.join(",");
	            } else {
	              out += '' + $typeSchema;
	            }

	            out += '\' ';
	          }

	          if (it.opts.verbose) {
	            out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	          }

	          out += ' } ';
	        } else {
	          out += ' {} ';
	        }

	        var __err = out;
	        out = $$outStack.pop();

	        if (!it.compositeRule && $breakOnError) {
	          /* istanbul ignore if */
	          if (it.async) {
	            out += ' throw new ValidationError([' + __err + ']); ';
	          } else {
	            out += ' validate.errors = [' + __err + ']; return false; ';
	          }
	        } else {
	          out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	        }
	      }

	      out += ' } ';
	    }
	  }

	  if (it.schema.$ref && !$refKeywords) {
	    out += ' ' + it.RULES.all.$ref.code(it, '$ref') + ' ';

	    if ($breakOnError) {
	      out += ' } if (errors === ';

	      if ($top) {
	        out += '0';
	      } else {
	        out += 'errs_' + $lvl;
	      }

	      out += ') { ';
	      $closingBraces2 += '}';
	    }
	  } else {
	    var arr2 = it.RULES;

	    if (arr2) {
	      var $rulesGroup,
	          i2 = -1,
	          l2 = arr2.length - 1;

	      while (i2 < l2) {
	        $rulesGroup = arr2[i2 += 1];

	        if ($shouldUseGroup($rulesGroup)) {
	          if ($rulesGroup.type) {
	            out += ' if (' + it.util.checkDataType($rulesGroup.type, $data) + ') { ';
	          }

	          if (it.opts.useDefaults) {
	            if ($rulesGroup.type == 'object' && it.schema.properties) {
	              var $schema = it.schema.properties,
	                  $schemaKeys = Object.keys($schema);
	              var arr3 = $schemaKeys;

	              if (arr3) {
	                var $propertyKey,
	                    i3 = -1,
	                    l3 = arr3.length - 1;

	                while (i3 < l3) {
	                  $propertyKey = arr3[i3 += 1];
	                  var $sch = $schema[$propertyKey];

	                  if ($sch.default !== undefined) {
	                    var $passData = $data + it.util.getProperty($propertyKey);

	                    if (it.compositeRule) {
	                      if (it.opts.strictDefaults) {
	                        var $defaultMsg = 'default is ignored for: ' + $passData;
	                        if (it.opts.strictDefaults === 'log') it.logger.warn($defaultMsg);else throw new Error($defaultMsg);
	                      }
	                    } else {
	                      out += ' if (' + $passData + ' === undefined ';

	                      if (it.opts.useDefaults == 'empty') {
	                        out += ' || ' + $passData + ' === null || ' + $passData + ' === \'\' ';
	                      }

	                      out += ' ) ' + $passData + ' = ';

	                      if (it.opts.useDefaults == 'shared') {
	                        out += ' ' + it.useDefault($sch.default) + ' ';
	                      } else {
	                        out += ' ' + JSON.stringify($sch.default) + ' ';
	                      }

	                      out += '; ';
	                    }
	                  }
	                }
	              }
	            } else if ($rulesGroup.type == 'array' && Array.isArray(it.schema.items)) {
	              var arr4 = it.schema.items;

	              if (arr4) {
	                var $sch,
	                    $i = -1,
	                    l4 = arr4.length - 1;

	                while ($i < l4) {
	                  $sch = arr4[$i += 1];

	                  if ($sch.default !== undefined) {
	                    var $passData = $data + '[' + $i + ']';

	                    if (it.compositeRule) {
	                      if (it.opts.strictDefaults) {
	                        var $defaultMsg = 'default is ignored for: ' + $passData;
	                        if (it.opts.strictDefaults === 'log') it.logger.warn($defaultMsg);else throw new Error($defaultMsg);
	                      }
	                    } else {
	                      out += ' if (' + $passData + ' === undefined ';

	                      if (it.opts.useDefaults == 'empty') {
	                        out += ' || ' + $passData + ' === null || ' + $passData + ' === \'\' ';
	                      }

	                      out += ' ) ' + $passData + ' = ';

	                      if (it.opts.useDefaults == 'shared') {
	                        out += ' ' + it.useDefault($sch.default) + ' ';
	                      } else {
	                        out += ' ' + JSON.stringify($sch.default) + ' ';
	                      }

	                      out += '; ';
	                    }
	                  }
	                }
	              }
	            }
	          }

	          var arr5 = $rulesGroup.rules;

	          if (arr5) {
	            var $rule,
	                i5 = -1,
	                l5 = arr5.length - 1;

	            while (i5 < l5) {
	              $rule = arr5[i5 += 1];

	              if ($shouldUseRule($rule)) {
	                var $code = $rule.code(it, $rule.keyword, $rulesGroup.type);

	                if ($code) {
	                  out += ' ' + $code + ' ';

	                  if ($breakOnError) {
	                    $closingBraces1 += '}';
	                  }
	                }
	              }
	            }
	          }

	          if ($breakOnError) {
	            out += ' ' + $closingBraces1 + ' ';
	            $closingBraces1 = '';
	          }

	          if ($rulesGroup.type) {
	            out += ' } ';

	            if ($typeSchema && $typeSchema === $rulesGroup.type && !$coerceToTypes) {
	              out += ' else { ';
	              var $schemaPath = it.schemaPath + '.type',
	                  $errSchemaPath = it.errSchemaPath + '/type';
	              var $$outStack = $$outStack || [];
	              $$outStack.push(out);
	              out = '';
	              /* istanbul ignore else */

	              if (it.createErrors !== false) {
	                out += ' { keyword: \'' + ($errorKeyword || 'type') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { type: \'';

	                if ($typeIsArray) {
	                  out += '' + $typeSchema.join(",");
	                } else {
	                  out += '' + $typeSchema;
	                }

	                out += '\' } ';

	                if (it.opts.messages !== false) {
	                  out += ' , message: \'should be ';

	                  if ($typeIsArray) {
	                    out += '' + $typeSchema.join(",");
	                  } else {
	                    out += '' + $typeSchema;
	                  }

	                  out += '\' ';
	                }

	                if (it.opts.verbose) {
	                  out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	                }

	                out += ' } ';
	              } else {
	                out += ' {} ';
	              }

	              var __err = out;
	              out = $$outStack.pop();

	              if (!it.compositeRule && $breakOnError) {
	                /* istanbul ignore if */
	                if (it.async) {
	                  out += ' throw new ValidationError([' + __err + ']); ';
	                } else {
	                  out += ' validate.errors = [' + __err + ']; return false; ';
	                }
	              } else {
	                out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	              }

	              out += ' } ';
	            }
	          }

	          if ($breakOnError) {
	            out += ' if (errors === ';

	            if ($top) {
	              out += '0';
	            } else {
	              out += 'errs_' + $lvl;
	            }

	            out += ') { ';
	            $closingBraces2 += '}';
	          }
	        }
	      }
	    }
	  }

	  if ($breakOnError) {
	    out += ' ' + $closingBraces2 + ' ';
	  }

	  if ($top) {
	    if ($async) {
	      out += ' if (errors === 0) return data;           ';
	      out += ' else throw new ValidationError(vErrors); ';
	    } else {
	      out += ' validate.errors = vErrors; ';
	      out += ' return errors === 0;       ';
	    }

	    out += ' }; return validate;';
	  } else {
	    out += ' var ' + $valid + ' = errors === errs_' + $lvl + ';';
	  }

	  out = it.util.cleanUpCode(out);

	  if ($top) {
	    out = it.util.finalCleanUpCode(out, $async);
	  }

	  function $shouldUseGroup($rulesGroup) {
	    var rules = $rulesGroup.rules;

	    for (var i = 0; i < rules.length; i++) if ($shouldUseRule(rules[i])) return true;
	  }

	  function $shouldUseRule($rule) {
	    return it.schema[$rule.keyword] !== undefined || $rule.implements && $ruleImplementsSomeKeyword($rule);
	  }

	  function $ruleImplementsSomeKeyword($rule) {
	    var impl = $rule.implements;

	    for (var i = 0; i < impl.length; i++) if (it.schema[impl[i]] !== undefined) return true;
	  }

	  return out;
	};

	var resolve$1 = resolve_1,
	    util$2 = util$5,
	    errorClasses$1 = error_classes,
	    stableStringify$1 = fastJsonStableStringify;
	var validateGenerator = validate$1;
	/**
	 * Functions below are used inside compiled validations function
	 */

	var ucs2length = util$2.ucs2length;
	var equal = fastDeepEqual; // this error is thrown by async schemas to return validation errors via exception

	var ValidationError = errorClasses$1.Validation;
	var compile_1 = compile$1;
	/**
	 * Compiles schema to validation function
	 * @this   Ajv
	 * @param  {Object} schema schema object
	 * @param  {Object} root object with information about the root schema for this schema
	 * @param  {Object} localRefs the hash of local references inside the schema (created by resolve.id), used for inline resolution
	 * @param  {String} baseId base ID for IDs in the schema
	 * @return {Function} validation function
	 */

	function compile$1(schema, root, localRefs, baseId) {
	  /* jshint validthis: true, evil: true */

	  /* eslint no-shadow: 0 */
	  var self = this,
	      opts = this._opts,
	      refVal = [undefined],
	      refs = {},
	      patterns = [],
	      patternsHash = {},
	      defaults = [],
	      defaultsHash = {},
	      customRules = [];
	  root = root || {
	    schema: schema,
	    refVal: refVal,
	    refs: refs
	  };
	  var c = checkCompiling.call(this, schema, root, baseId);
	  var compilation = this._compilations[c.index];
	  if (c.compiling) return compilation.callValidate = callValidate;
	  var formats = this._formats;
	  var RULES = this.RULES;

	  try {
	    var v = localCompile(schema, root, localRefs, baseId);
	    compilation.validate = v;
	    var cv = compilation.callValidate;

	    if (cv) {
	      cv.schema = v.schema;
	      cv.errors = null;
	      cv.refs = v.refs;
	      cv.refVal = v.refVal;
	      cv.root = v.root;
	      cv.$async = v.$async;
	      if (opts.sourceCode) cv.source = v.source;
	    }

	    return v;
	  } finally {
	    endCompiling.call(this, schema, root, baseId);
	  }
	  /* @this   {*} - custom context, see passContext option */


	  function callValidate() {
	    /* jshint validthis: true */
	    var validate = compilation.validate;
	    var result = validate.apply(this, arguments);
	    callValidate.errors = validate.errors;
	    return result;
	  }

	  function localCompile(_schema, _root, localRefs, baseId) {
	    var isRoot = !_root || _root && _root.schema == _schema;
	    if (_root.schema != root.schema) return compile$1.call(self, _schema, _root, localRefs, baseId);
	    var $async = _schema.$async === true;
	    var sourceCode = validateGenerator({
	      isTop: true,
	      schema: _schema,
	      isRoot: isRoot,
	      baseId: baseId,
	      root: _root,
	      schemaPath: '',
	      errSchemaPath: '#',
	      errorPath: '""',
	      MissingRefError: errorClasses$1.MissingRef,
	      RULES: RULES,
	      validate: validateGenerator,
	      util: util$2,
	      resolve: resolve$1,
	      resolveRef: resolveRef,
	      usePattern: usePattern,
	      useDefault: useDefault,
	      useCustomRule: useCustomRule,
	      opts: opts,
	      formats: formats,
	      logger: self.logger,
	      self: self
	    });
	    sourceCode = vars(refVal, refValCode) + vars(patterns, patternCode) + vars(defaults, defaultCode) + vars(customRules, customRuleCode$1) + sourceCode;
	    if (opts.processCode) sourceCode = opts.processCode(sourceCode); // console.log('\n\n\n *** \n', JSON.stringify(sourceCode));

	    var validate;

	    try {
	      var makeValidate = new Function('self', 'RULES', 'formats', 'root', 'refVal', 'defaults', 'customRules', 'equal', 'ucs2length', 'ValidationError', sourceCode);
	      validate = makeValidate(self, RULES, formats, root, refVal, defaults, customRules, equal, ucs2length, ValidationError);
	      refVal[0] = validate;
	    } catch (e) {
	      self.logger.error('Error compiling schema, function code:', sourceCode);
	      throw e;
	    }

	    validate.schema = _schema;
	    validate.errors = null;
	    validate.refs = refs;
	    validate.refVal = refVal;
	    validate.root = isRoot ? validate : _root;
	    if ($async) validate.$async = true;

	    if (opts.sourceCode === true) {
	      validate.source = {
	        code: sourceCode,
	        patterns: patterns,
	        defaults: defaults
	      };
	    }

	    return validate;
	  }

	  function resolveRef(baseId, ref, isRoot) {
	    ref = resolve$1.url(baseId, ref);
	    var refIndex = refs[ref];

	    var _refVal, refCode;

	    if (refIndex !== undefined) {
	      _refVal = refVal[refIndex];
	      refCode = 'refVal[' + refIndex + ']';
	      return resolvedRef(_refVal, refCode);
	    }

	    if (!isRoot && root.refs) {
	      var rootRefId = root.refs[ref];

	      if (rootRefId !== undefined) {
	        _refVal = root.refVal[rootRefId];
	        refCode = addLocalRef(ref, _refVal);
	        return resolvedRef(_refVal, refCode);
	      }
	    }

	    refCode = addLocalRef(ref);
	    var v = resolve$1.call(self, localCompile, root, ref);

	    if (v === undefined) {
	      var localSchema = localRefs && localRefs[ref];

	      if (localSchema) {
	        v = resolve$1.inlineRef(localSchema, opts.inlineRefs) ? localSchema : compile$1.call(self, localSchema, root, localRefs, baseId);
	      }
	    }

	    if (v === undefined) {
	      removeLocalRef(ref);
	    } else {
	      replaceLocalRef(ref, v);
	      return resolvedRef(v, refCode);
	    }
	  }

	  function addLocalRef(ref, v) {
	    var refId = refVal.length;
	    refVal[refId] = v;
	    refs[ref] = refId;
	    return 'refVal' + refId;
	  }

	  function removeLocalRef(ref) {
	    delete refs[ref];
	  }

	  function replaceLocalRef(ref, v) {
	    var refId = refs[ref];
	    refVal[refId] = v;
	  }

	  function resolvedRef(refVal, code) {
	    return typeof refVal == 'object' || typeof refVal == 'boolean' ? {
	      code: code,
	      schema: refVal,
	      inline: true
	    } : {
	      code: code,
	      $async: refVal && !!refVal.$async
	    };
	  }

	  function usePattern(regexStr) {
	    var index = patternsHash[regexStr];

	    if (index === undefined) {
	      index = patternsHash[regexStr] = patterns.length;
	      patterns[index] = regexStr;
	    }

	    return 'pattern' + index;
	  }

	  function useDefault(value) {
	    switch (typeof value) {
	      case 'boolean':
	      case 'number':
	        return '' + value;

	      case 'string':
	        return util$2.toQuotedString(value);

	      case 'object':
	        if (value === null) return 'null';
	        var valueStr = stableStringify$1(value);
	        var index = defaultsHash[valueStr];

	        if (index === undefined) {
	          index = defaultsHash[valueStr] = defaults.length;
	          defaults[index] = value;
	        }

	        return 'default' + index;
	    }
	  }

	  function useCustomRule(rule, schema, parentSchema, it) {
	    if (self._opts.validateSchema !== false) {
	      var deps = rule.definition.dependencies;
	      if (deps && !deps.every(function (keyword) {
	        return Object.prototype.hasOwnProperty.call(parentSchema, keyword);
	      })) throw new Error('parent schema must have all required keywords: ' + deps.join(','));
	      var validateSchema = rule.definition.validateSchema;

	      if (validateSchema) {
	        var valid = validateSchema(schema);

	        if (!valid) {
	          var message = 'keyword schema is invalid: ' + self.errorsText(validateSchema.errors);
	          if (self._opts.validateSchema == 'log') self.logger.error(message);else throw new Error(message);
	        }
	      }
	    }

	    var compile = rule.definition.compile,
	        inline = rule.definition.inline,
	        macro = rule.definition.macro;
	    var validate;

	    if (compile) {
	      validate = compile.call(self, schema, parentSchema, it);
	    } else if (macro) {
	      validate = macro.call(self, schema, parentSchema, it);
	      if (opts.validateSchema !== false) self.validateSchema(validate, true);
	    } else if (inline) {
	      validate = inline.call(self, it, rule.keyword, schema, parentSchema);
	    } else {
	      validate = rule.definition.validate;
	      if (!validate) return;
	    }

	    if (validate === undefined) throw new Error('custom keyword "' + rule.keyword + '"failed to compile');
	    var index = customRules.length;
	    customRules[index] = validate;
	    return {
	      code: 'customRule' + index,
	      validate: validate
	    };
	  }
	}
	/**
	 * Checks if the schema is currently compiled
	 * @this   Ajv
	 * @param  {Object} schema schema to compile
	 * @param  {Object} root root object
	 * @param  {String} baseId base schema ID
	 * @return {Object} object with properties "index" (compilation index) and "compiling" (boolean)
	 */


	function checkCompiling(schema, root, baseId) {
	  /* jshint validthis: true */
	  var index = compIndex.call(this, schema, root, baseId);
	  if (index >= 0) return {
	    index: index,
	    compiling: true
	  };
	  index = this._compilations.length;
	  this._compilations[index] = {
	    schema: schema,
	    root: root,
	    baseId: baseId
	  };
	  return {
	    index: index,
	    compiling: false
	  };
	}
	/**
	 * Removes the schema from the currently compiled list
	 * @this   Ajv
	 * @param  {Object} schema schema to compile
	 * @param  {Object} root root object
	 * @param  {String} baseId base schema ID
	 */


	function endCompiling(schema, root, baseId) {
	  /* jshint validthis: true */
	  var i = compIndex.call(this, schema, root, baseId);
	  if (i >= 0) this._compilations.splice(i, 1);
	}
	/**
	 * Index of schema compilation in the currently compiled list
	 * @this   Ajv
	 * @param  {Object} schema schema to compile
	 * @param  {Object} root root object
	 * @param  {String} baseId base schema ID
	 * @return {Integer} compilation index
	 */


	function compIndex(schema, root, baseId) {
	  /* jshint validthis: true */
	  for (var i = 0; i < this._compilations.length; i++) {
	    var c = this._compilations[i];
	    if (c.schema == schema && c.root == root && c.baseId == baseId) return i;
	  }

	  return -1;
	}

	function patternCode(i, patterns) {
	  return 'var pattern' + i + ' = new RegExp(' + util$2.toQuotedString(patterns[i]) + ');';
	}

	function defaultCode(i) {
	  return 'var default' + i + ' = defaults[' + i + '];';
	}

	function refValCode(i, refVal) {
	  return refVal[i] === undefined ? '' : 'var refVal' + i + ' = refVal[' + i + '];';
	}

	function customRuleCode$1(i) {
	  return 'var customRule' + i + ' = customRules[' + i + '];';
	}

	function vars(arr, statement) {
	  if (!arr.length) return '';
	  var code = '';

	  for (var i = 0; i < arr.length; i++) code += statement(i, arr);

	  return code;
	}

	var cache = {exports: {}};

	var Cache$1 = cache.exports = function Cache() {
	  this._cache = {};
	};

	Cache$1.prototype.put = function Cache_put(key, value) {
	  this._cache[key] = value;
	};

	Cache$1.prototype.get = function Cache_get(key) {
	  return this._cache[key];
	};

	Cache$1.prototype.del = function Cache_del(key) {
	  delete this._cache[key];
	};

	Cache$1.prototype.clear = function Cache_clear() {
	  this._cache = {};
	};

	var util$1 = util$5;
	var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
	var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
	var HOSTNAME = /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i;
	var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
	var URIREF = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i; // uri-template: https://tools.ietf.org/html/rfc6570

	var URITEMPLATE = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i; // For the source: https://gist.github.com/dperini/729294
	// For test cases: https://mathiasbynens.be/demo/url-regex
	// @todo Delete current URL in favour of the commented out URL rule when this issue is fixed https://github.com/eslint/eslint/issues/7983.
	// var URL = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)(?:\.(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;

	var URL = /^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i;
	var UUID = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
	var JSON_POINTER = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
	var JSON_POINTER_URI_FRAGMENT = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i;
	var RELATIVE_JSON_POINTER = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;
	var formats_1 = formats$1;

	function formats$1(mode) {
	  mode = mode == 'full' ? 'full' : 'fast';
	  return util$1.copy(formats$1[mode]);
	}

	formats$1.fast = {
	  // date: http://tools.ietf.org/html/rfc3339#section-5.6
	  date: /^\d\d\d\d-[0-1]\d-[0-3]\d$/,
	  // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
	  time: /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i,
	  'date-time': /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i,
	  // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
	  uri: /^(?:[a-z][a-z0-9+-.]*:)(?:\/?\/)?[^\s]*$/i,
	  'uri-reference': /^(?:(?:[a-z][a-z0-9+-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
	  'uri-template': URITEMPLATE,
	  url: URL,
	  // email (sources from jsen validator):
	  // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
	  // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'willful violation')
	  email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
	  hostname: HOSTNAME,
	  // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
	  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
	  // optimized http://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses
	  ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
	  regex: regex,
	  // uuid: http://tools.ietf.org/html/rfc4122
	  uuid: UUID,
	  // JSON-pointer: https://tools.ietf.org/html/rfc6901
	  // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
	  'json-pointer': JSON_POINTER,
	  'json-pointer-uri-fragment': JSON_POINTER_URI_FRAGMENT,
	  // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
	  'relative-json-pointer': RELATIVE_JSON_POINTER
	};
	formats$1.full = {
	  date: date,
	  time: time,
	  'date-time': date_time,
	  uri: uri,
	  'uri-reference': URIREF,
	  'uri-template': URITEMPLATE,
	  url: URL,
	  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
	  hostname: HOSTNAME,
	  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
	  ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
	  regex: regex,
	  uuid: UUID,
	  'json-pointer': JSON_POINTER,
	  'json-pointer-uri-fragment': JSON_POINTER_URI_FRAGMENT,
	  'relative-json-pointer': RELATIVE_JSON_POINTER
	};

	function isLeapYear(year) {
	  // https://tools.ietf.org/html/rfc3339#appendix-C
	  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	}

	function date(str) {
	  // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
	  var matches = str.match(DATE);
	  if (!matches) return false;
	  var year = +matches[1];
	  var month = +matches[2];
	  var day = +matches[3];
	  return month >= 1 && month <= 12 && day >= 1 && day <= (month == 2 && isLeapYear(year) ? 29 : DAYS[month]);
	}

	function time(str, full) {
	  var matches = str.match(TIME);
	  if (!matches) return false;
	  var hour = matches[1];
	  var minute = matches[2];
	  var second = matches[3];
	  var timeZone = matches[5];
	  return (hour <= 23 && minute <= 59 && second <= 59 || hour == 23 && minute == 59 && second == 60) && (!full || timeZone);
	}

	var DATE_TIME_SEPARATOR = /t|\s/i;

	function date_time(str) {
	  // http://tools.ietf.org/html/rfc3339#section-5.6
	  var dateTime = str.split(DATE_TIME_SEPARATOR);
	  return dateTime.length == 2 && date(dateTime[0]) && time(dateTime[1], true);
	}

	var NOT_URI_FRAGMENT = /\/|:/;

	function uri(str) {
	  // http://jmrware.com/articles/2009/uri_regexp/URI_regex.html + optional protocol + required "."
	  return NOT_URI_FRAGMENT.test(str) && URI.test(str);
	}

	var Z_ANCHOR = /[^\\]\\Z/;

	function regex(str) {
	  if (Z_ANCHOR.test(str)) return false;

	  try {
	    new RegExp(str);
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	var ref = function generate_ref(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $async, $refCode;

	  if ($schema == '#' || $schema == '#/') {
	    if (it.isRoot) {
	      $async = it.async;
	      $refCode = 'validate';
	    } else {
	      $async = it.root.schema.$async === true;
	      $refCode = 'root.refVal[0]';
	    }
	  } else {
	    var $refVal = it.resolveRef(it.baseId, $schema, it.isRoot);

	    if ($refVal === undefined) {
	      var $message = it.MissingRefError.message(it.baseId, $schema);

	      if (it.opts.missingRefs == 'fail') {
	        it.logger.error($message);
	        var $$outStack = $$outStack || [];
	        $$outStack.push(out);
	        out = '';
	        /* istanbul ignore else */

	        if (it.createErrors !== false) {
	          out += ' { keyword: \'' + '$ref' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { ref: \'' + it.util.escapeQuotes($schema) + '\' } ';

	          if (it.opts.messages !== false) {
	            out += ' , message: \'can\\\'t resolve reference ' + it.util.escapeQuotes($schema) + '\' ';
	          }

	          if (it.opts.verbose) {
	            out += ' , schema: ' + it.util.toQuotedString($schema) + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	          }

	          out += ' } ';
	        } else {
	          out += ' {} ';
	        }

	        var __err = out;
	        out = $$outStack.pop();

	        if (!it.compositeRule && $breakOnError) {
	          /* istanbul ignore if */
	          if (it.async) {
	            out += ' throw new ValidationError([' + __err + ']); ';
	          } else {
	            out += ' validate.errors = [' + __err + ']; return false; ';
	          }
	        } else {
	          out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	        }

	        if ($breakOnError) {
	          out += ' if (false) { ';
	        }
	      } else if (it.opts.missingRefs == 'ignore') {
	        it.logger.warn($message);

	        if ($breakOnError) {
	          out += ' if (true) { ';
	        }
	      } else {
	        throw new it.MissingRefError(it.baseId, $schema, $message);
	      }
	    } else if ($refVal.inline) {
	      var $it = it.util.copy(it);
	      $it.level++;
	      var $nextValid = 'valid' + $it.level;
	      $it.schema = $refVal.schema;
	      $it.schemaPath = '';
	      $it.errSchemaPath = $schema;
	      var $code = it.validate($it).replace(/validate\.schema/g, $refVal.code);
	      out += ' ' + $code + ' ';

	      if ($breakOnError) {
	        out += ' if (' + $nextValid + ') { ';
	      }
	    } else {
	      $async = $refVal.$async === true || it.async && $refVal.$async !== false;
	      $refCode = $refVal.code;
	    }
	  }

	  if ($refCode) {
	    var $$outStack = $$outStack || [];
	    $$outStack.push(out);
	    out = '';

	    if (it.opts.passContext) {
	      out += ' ' + $refCode + '.call(this, ';
	    } else {
	      out += ' ' + $refCode + '( ';
	    }

	    out += ' ' + $data + ', (dataPath || \'\')';

	    if (it.errorPath != '""') {
	      out += ' + ' + it.errorPath;
	    }

	    var $parentData = $dataLvl ? 'data' + ($dataLvl - 1 || '') : 'parentData',
	        $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
	    out += ' , ' + $parentData + ' , ' + $parentDataProperty + ', rootData)  ';
	    var __callValidate = out;
	    out = $$outStack.pop();

	    if ($async) {
	      if (!it.async) throw new Error('async schema referenced by sync schema');

	      if ($breakOnError) {
	        out += ' var ' + $valid + '; ';
	      }

	      out += ' try { await ' + __callValidate + '; ';

	      if ($breakOnError) {
	        out += ' ' + $valid + ' = true; ';
	      }

	      out += ' } catch (e) { if (!(e instanceof ValidationError)) throw e; if (vErrors === null) vErrors = e.errors; else vErrors = vErrors.concat(e.errors); errors = vErrors.length; ';

	      if ($breakOnError) {
	        out += ' ' + $valid + ' = false; ';
	      }

	      out += ' } ';

	      if ($breakOnError) {
	        out += ' if (' + $valid + ') { ';
	      }
	    } else {
	      out += ' if (!' + __callValidate + ') { if (vErrors === null) vErrors = ' + $refCode + '.errors; else vErrors = vErrors.concat(' + $refCode + '.errors); errors = vErrors.length; } ';

	      if ($breakOnError) {
	        out += ' else { ';
	      }
	    }
	  }

	  return out;
	};

	var allOf = function generate_allOf(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $it = it.util.copy(it);
	  var $closingBraces = '';
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  var $currentBaseId = $it.baseId,
	      $allSchemasEmpty = true;
	  var arr1 = $schema;

	  if (arr1) {
	    var $sch,
	        $i = -1,
	        l1 = arr1.length - 1;

	    while ($i < l1) {
	      $sch = arr1[$i += 1];

	      if (it.opts.strictKeywords ? typeof $sch == 'object' && Object.keys($sch).length > 0 : it.util.schemaHasRules($sch, it.RULES.all)) {
	        $allSchemasEmpty = false;
	        $it.schema = $sch;
	        $it.schemaPath = $schemaPath + '[' + $i + ']';
	        $it.errSchemaPath = $errSchemaPath + '/' + $i;
	        out += '  ' + it.validate($it) + ' ';
	        $it.baseId = $currentBaseId;

	        if ($breakOnError) {
	          out += ' if (' + $nextValid + ') { ';
	          $closingBraces += '}';
	        }
	      }
	    }
	  }

	  if ($breakOnError) {
	    if ($allSchemasEmpty) {
	      out += ' if (true) { ';
	    } else {
	      out += ' ' + $closingBraces.slice(0, -1) + ' ';
	    }
	  }

	  out = it.util.cleanUpCode(out);
	  return out;
	};

	var anyOf = function generate_anyOf(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  var $closingBraces = '';
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  var $noEmptySchema = $schema.every(function ($sch) {
	    return it.opts.strictKeywords ? typeof $sch == 'object' && Object.keys($sch).length > 0 : it.util.schemaHasRules($sch, it.RULES.all);
	  });

	  if ($noEmptySchema) {
	    var $currentBaseId = $it.baseId;
	    out += ' var ' + $errs + ' = errors; var ' + $valid + ' = false;  ';
	    var $wasComposite = it.compositeRule;
	    it.compositeRule = $it.compositeRule = true;
	    var arr1 = $schema;

	    if (arr1) {
	      var $sch,
	          $i = -1,
	          l1 = arr1.length - 1;

	      while ($i < l1) {
	        $sch = arr1[$i += 1];
	        $it.schema = $sch;
	        $it.schemaPath = $schemaPath + '[' + $i + ']';
	        $it.errSchemaPath = $errSchemaPath + '/' + $i;
	        out += '  ' + it.validate($it) + ' ';
	        $it.baseId = $currentBaseId;
	        out += ' ' + $valid + ' = ' + $valid + ' || ' + $nextValid + '; if (!' + $valid + ') { ';
	        $closingBraces += '}';
	      }
	    }

	    it.compositeRule = $it.compositeRule = $wasComposite;
	    out += ' ' + $closingBraces + ' if (!' + $valid + ') {   var err =   ';
	    /* istanbul ignore else */

	    if (it.createErrors !== false) {
	      out += ' { keyword: \'' + 'anyOf' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: {} ';

	      if (it.opts.messages !== false) {
	        out += ' , message: \'should match some schema in anyOf\' ';
	      }

	      if (it.opts.verbose) {
	        out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	      }

	      out += ' } ';
	    } else {
	      out += ' {} ';
	    }

	    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';

	    if (!it.compositeRule && $breakOnError) {
	      /* istanbul ignore if */
	      if (it.async) {
	        out += ' throw new ValidationError(vErrors); ';
	      } else {
	        out += ' validate.errors = vErrors; return false; ';
	      }
	    }

	    out += ' } else {  errors = ' + $errs + '; if (vErrors !== null) { if (' + $errs + ') vErrors.length = ' + $errs + '; else vErrors = null; } ';

	    if (it.opts.allErrors) {
	      out += ' } ';
	    }

	    out = it.util.cleanUpCode(out);
	  } else {
	    if ($breakOnError) {
	      out += ' if (true) { ';
	    }
	  }

	  return out;
	};

	var comment = function generate_comment(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $schema = it.schema[$keyword];
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  !it.opts.allErrors;
	  var $comment = it.util.toQuotedString($schema);

	  if (it.opts.$comment === true) {
	    out += ' console.log(' + $comment + ');';
	  } else if (typeof it.opts.$comment == 'function') {
	    out += ' self._opts.$comment(' + $comment + ', ' + it.util.toQuotedString($errSchemaPath) + ', validate.root.schema);';
	  }

	  return out;
	};

	var _const = function generate_const(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $isData = it.opts.$data && $schema && $schema.$data;

	  if ($isData) {
	    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
	  }

	  if (!$isData) {
	    out += ' var schema' + $lvl + ' = validate.schema' + $schemaPath + ';';
	  }

	  out += 'var ' + $valid + ' = equal(' + $data + ', schema' + $lvl + '); if (!' + $valid + ') {   ';
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = '';
	  /* istanbul ignore else */

	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + 'const' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { allowedValue: schema' + $lvl + ' } ';

	    if (it.opts.messages !== false) {
	      out += ' , message: \'should be equal to constant\' ';
	    }

	    if (it.opts.verbose) {
	      out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	    }

	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }

	  var __err = out;
	  out = $$outStack.pop();

	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + __err + ']); ';
	    } else {
	      out += ' validate.errors = [' + __err + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }

	  out += ' }';

	  if ($breakOnError) {
	    out += ' else { ';
	  }

	  return out;
	};

	var contains = function generate_contains(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  var $closingBraces = '';
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  var $idx = 'i' + $lvl,
	      $dataNxt = $it.dataLevel = it.dataLevel + 1,
	      $nextData = 'data' + $dataNxt,
	      $currentBaseId = it.baseId,
	      $nonEmptySchema = it.opts.strictKeywords ? typeof $schema == 'object' && Object.keys($schema).length > 0 : it.util.schemaHasRules($schema, it.RULES.all);
	  out += 'var ' + $errs + ' = errors;var ' + $valid + ';';

	  if ($nonEmptySchema) {
	    var $wasComposite = it.compositeRule;
	    it.compositeRule = $it.compositeRule = true;
	    $it.schema = $schema;
	    $it.schemaPath = $schemaPath;
	    $it.errSchemaPath = $errSchemaPath;
	    out += ' var ' + $nextValid + ' = false; for (var ' + $idx + ' = 0; ' + $idx + ' < ' + $data + '.length; ' + $idx + '++) { ';
	    $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
	    var $passData = $data + '[' + $idx + ']';
	    $it.dataPathArr[$dataNxt] = $idx;
	    var $code = it.validate($it);
	    $it.baseId = $currentBaseId;

	    if (it.util.varOccurences($code, $nextData) < 2) {
	      out += ' ' + it.util.varReplace($code, $nextData, $passData) + ' ';
	    } else {
	      out += ' var ' + $nextData + ' = ' + $passData + '; ' + $code + ' ';
	    }

	    out += ' if (' + $nextValid + ') break; }  ';
	    it.compositeRule = $it.compositeRule = $wasComposite;
	    out += ' ' + $closingBraces + ' if (!' + $nextValid + ') {';
	  } else {
	    out += ' if (' + $data + '.length == 0) {';
	  }

	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = '';
	  /* istanbul ignore else */

	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + 'contains' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: {} ';

	    if (it.opts.messages !== false) {
	      out += ' , message: \'should contain a valid item\' ';
	    }

	    if (it.opts.verbose) {
	      out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	    }

	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }

	  var __err = out;
	  out = $$outStack.pop();

	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + __err + ']); ';
	    } else {
	      out += ' validate.errors = [' + __err + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }

	  out += ' } else { ';

	  if ($nonEmptySchema) {
	    out += '  errors = ' + $errs + '; if (vErrors !== null) { if (' + $errs + ') vErrors.length = ' + $errs + '; else vErrors = null; } ';
	  }

	  if (it.opts.allErrors) {
	    out += ' } ';
	  }

	  out = it.util.cleanUpCode(out);
	  return out;
	};

	var dependencies = function generate_dependencies(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  var $closingBraces = '';
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  var $schemaDeps = {},
	      $propertyDeps = {},
	      $ownProperties = it.opts.ownProperties;

	  for ($property in $schema) {
	    var $sch = $schema[$property];
	    var $deps = Array.isArray($sch) ? $propertyDeps : $schemaDeps;
	    $deps[$property] = $sch;
	  }

	  out += 'var ' + $errs + ' = errors;';
	  var $currentErrorPath = it.errorPath;
	  out += 'var missing' + $lvl + ';';

	  for (var $property in $propertyDeps) {
	    $deps = $propertyDeps[$property];

	    if ($deps.length) {
	      out += ' if ( ' + $data + it.util.getProperty($property) + ' !== undefined ';

	      if ($ownProperties) {
	        out += ' && Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($property) + '\') ';
	      }

	      if ($breakOnError) {
	        out += ' && ( ';
	        var arr1 = $deps;

	        if (arr1) {
	          var $propertyKey,
	              $i = -1,
	              l1 = arr1.length - 1;

	          while ($i < l1) {
	            $propertyKey = arr1[$i += 1];

	            if ($i) {
	              out += ' || ';
	            }

	            var $prop = it.util.getProperty($propertyKey),
	                $useData = $data + $prop;
	            out += ' ( ( ' + $useData + ' === undefined ';

	            if ($ownProperties) {
	              out += ' || ! Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($propertyKey) + '\') ';
	            }

	            out += ') && (missing' + $lvl + ' = ' + it.util.toQuotedString(it.opts.jsonPointers ? $propertyKey : $prop) + ') ) ';
	          }
	        }

	        out += ')) {  ';
	        var $propertyPath = 'missing' + $lvl,
	            $missingProperty = '\' + ' + $propertyPath + ' + \'';

	        if (it.opts._errorDataPathProperty) {
	          it.errorPath = it.opts.jsonPointers ? it.util.getPathExpr($currentErrorPath, $propertyPath, true) : $currentErrorPath + ' + ' + $propertyPath;
	        }

	        var $$outStack = $$outStack || [];
	        $$outStack.push(out);
	        out = '';
	        /* istanbul ignore else */

	        if (it.createErrors !== false) {
	          out += ' { keyword: \'' + 'dependencies' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { property: \'' + it.util.escapeQuotes($property) + '\', missingProperty: \'' + $missingProperty + '\', depsCount: ' + $deps.length + ', deps: \'' + it.util.escapeQuotes($deps.length == 1 ? $deps[0] : $deps.join(", ")) + '\' } ';

	          if (it.opts.messages !== false) {
	            out += ' , message: \'should have ';

	            if ($deps.length == 1) {
	              out += 'property ' + it.util.escapeQuotes($deps[0]);
	            } else {
	              out += 'properties ' + it.util.escapeQuotes($deps.join(", "));
	            }

	            out += ' when property ' + it.util.escapeQuotes($property) + ' is present\' ';
	          }

	          if (it.opts.verbose) {
	            out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	          }

	          out += ' } ';
	        } else {
	          out += ' {} ';
	        }

	        var __err = out;
	        out = $$outStack.pop();

	        if (!it.compositeRule && $breakOnError) {
	          /* istanbul ignore if */
	          if (it.async) {
	            out += ' throw new ValidationError([' + __err + ']); ';
	          } else {
	            out += ' validate.errors = [' + __err + ']; return false; ';
	          }
	        } else {
	          out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	        }
	      } else {
	        out += ' ) { ';
	        var arr2 = $deps;

	        if (arr2) {
	          var $propertyKey,
	              i2 = -1,
	              l2 = arr2.length - 1;

	          while (i2 < l2) {
	            $propertyKey = arr2[i2 += 1];
	            var $prop = it.util.getProperty($propertyKey),
	                $missingProperty = it.util.escapeQuotes($propertyKey),
	                $useData = $data + $prop;

	            if (it.opts._errorDataPathProperty) {
	              it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
	            }

	            out += ' if ( ' + $useData + ' === undefined ';

	            if ($ownProperties) {
	              out += ' || ! Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($propertyKey) + '\') ';
	            }

	            out += ') {  var err =   ';
	            /* istanbul ignore else */

	            if (it.createErrors !== false) {
	              out += ' { keyword: \'' + 'dependencies' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { property: \'' + it.util.escapeQuotes($property) + '\', missingProperty: \'' + $missingProperty + '\', depsCount: ' + $deps.length + ', deps: \'' + it.util.escapeQuotes($deps.length == 1 ? $deps[0] : $deps.join(", ")) + '\' } ';

	              if (it.opts.messages !== false) {
	                out += ' , message: \'should have ';

	                if ($deps.length == 1) {
	                  out += 'property ' + it.util.escapeQuotes($deps[0]);
	                } else {
	                  out += 'properties ' + it.util.escapeQuotes($deps.join(", "));
	                }

	                out += ' when property ' + it.util.escapeQuotes($property) + ' is present\' ';
	              }

	              if (it.opts.verbose) {
	                out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	              }

	              out += ' } ';
	            } else {
	              out += ' {} ';
	            }

	            out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ';
	          }
	        }
	      }

	      out += ' }   ';

	      if ($breakOnError) {
	        $closingBraces += '}';
	        out += ' else { ';
	      }
	    }
	  }

	  it.errorPath = $currentErrorPath;
	  var $currentBaseId = $it.baseId;

	  for (var $property in $schemaDeps) {
	    var $sch = $schemaDeps[$property];

	    if (it.opts.strictKeywords ? typeof $sch == 'object' && Object.keys($sch).length > 0 : it.util.schemaHasRules($sch, it.RULES.all)) {
	      out += ' ' + $nextValid + ' = true; if ( ' + $data + it.util.getProperty($property) + ' !== undefined ';

	      if ($ownProperties) {
	        out += ' && Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($property) + '\') ';
	      }

	      out += ') { ';
	      $it.schema = $sch;
	      $it.schemaPath = $schemaPath + it.util.getProperty($property);
	      $it.errSchemaPath = $errSchemaPath + '/' + it.util.escapeFragment($property);
	      out += '  ' + it.validate($it) + ' ';
	      $it.baseId = $currentBaseId;
	      out += ' }  ';

	      if ($breakOnError) {
	        out += ' if (' + $nextValid + ') { ';
	        $closingBraces += '}';
	      }
	    }
	  }

	  if ($breakOnError) {
	    out += '   ' + $closingBraces + ' if (' + $errs + ' == errors) {';
	  }

	  out = it.util.cleanUpCode(out);
	  return out;
	};

	var _enum = function generate_enum(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $isData = it.opts.$data && $schema && $schema.$data;

	  if ($isData) {
	    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
	  }

	  var $i = 'i' + $lvl,
	      $vSchema = 'schema' + $lvl;

	  if (!$isData) {
	    out += ' var ' + $vSchema + ' = validate.schema' + $schemaPath + ';';
	  }

	  out += 'var ' + $valid + ';';

	  if ($isData) {
	    out += ' if (schema' + $lvl + ' === undefined) ' + $valid + ' = true; else if (!Array.isArray(schema' + $lvl + ')) ' + $valid + ' = false; else {';
	  }

	  out += '' + $valid + ' = false;for (var ' + $i + '=0; ' + $i + '<' + $vSchema + '.length; ' + $i + '++) if (equal(' + $data + ', ' + $vSchema + '[' + $i + '])) { ' + $valid + ' = true; break; }';

	  if ($isData) {
	    out += '  }  ';
	  }

	  out += ' if (!' + $valid + ') {   ';
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = '';
	  /* istanbul ignore else */

	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + 'enum' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { allowedValues: schema' + $lvl + ' } ';

	    if (it.opts.messages !== false) {
	      out += ' , message: \'should be equal to one of the allowed values\' ';
	    }

	    if (it.opts.verbose) {
	      out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	    }

	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }

	  var __err = out;
	  out = $$outStack.pop();

	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + __err + ']); ';
	    } else {
	      out += ' validate.errors = [' + __err + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }

	  out += ' }';

	  if ($breakOnError) {
	    out += ' else { ';
	  }

	  return out;
	};

	var format = function generate_format(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');

	  if (it.opts.format === false) {
	    if ($breakOnError) {
	      out += ' if (true) { ';
	    }

	    return out;
	  }

	  var $isData = it.opts.$data && $schema && $schema.$data,
	      $schemaValue;

	  if ($isData) {
	    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }

	  var $unknownFormats = it.opts.unknownFormats,
	      $allowUnknown = Array.isArray($unknownFormats);

	  if ($isData) {
	    var $format = 'format' + $lvl,
	        $isObject = 'isObject' + $lvl,
	        $formatType = 'formatType' + $lvl;
	    out += ' var ' + $format + ' = formats[' + $schemaValue + ']; var ' + $isObject + ' = typeof ' + $format + ' == \'object\' && !(' + $format + ' instanceof RegExp) && ' + $format + '.validate; var ' + $formatType + ' = ' + $isObject + ' && ' + $format + '.type || \'string\'; if (' + $isObject + ') { ';

	    if (it.async) {
	      out += ' var async' + $lvl + ' = ' + $format + '.async; ';
	    }

	    out += ' ' + $format + ' = ' + $format + '.validate; } if (  ';

	    if ($isData) {
	      out += ' (' + $schemaValue + ' !== undefined && typeof ' + $schemaValue + ' != \'string\') || ';
	    }

	    out += ' (';

	    if ($unknownFormats != 'ignore') {
	      out += ' (' + $schemaValue + ' && !' + $format + ' ';

	      if ($allowUnknown) {
	        out += ' && self._opts.unknownFormats.indexOf(' + $schemaValue + ') == -1 ';
	      }

	      out += ') || ';
	    }

	    out += ' (' + $format + ' && ' + $formatType + ' == \'' + $ruleType + '\' && !(typeof ' + $format + ' == \'function\' ? ';

	    if (it.async) {
	      out += ' (async' + $lvl + ' ? await ' + $format + '(' + $data + ') : ' + $format + '(' + $data + ')) ';
	    } else {
	      out += ' ' + $format + '(' + $data + ') ';
	    }

	    out += ' : ' + $format + '.test(' + $data + '))))) {';
	  } else {
	    var $format = it.formats[$schema];

	    if (!$format) {
	      if ($unknownFormats == 'ignore') {
	        it.logger.warn('unknown format "' + $schema + '" ignored in schema at path "' + it.errSchemaPath + '"');

	        if ($breakOnError) {
	          out += ' if (true) { ';
	        }

	        return out;
	      } else if ($allowUnknown && $unknownFormats.indexOf($schema) >= 0) {
	        if ($breakOnError) {
	          out += ' if (true) { ';
	        }

	        return out;
	      } else {
	        throw new Error('unknown format "' + $schema + '" is used in schema at path "' + it.errSchemaPath + '"');
	      }
	    }

	    var $isObject = typeof $format == 'object' && !($format instanceof RegExp) && $format.validate;
	    var $formatType = $isObject && $format.type || 'string';

	    if ($isObject) {
	      var $async = $format.async === true;
	      $format = $format.validate;
	    }

	    if ($formatType != $ruleType) {
	      if ($breakOnError) {
	        out += ' if (true) { ';
	      }

	      return out;
	    }

	    if ($async) {
	      if (!it.async) throw new Error('async format in sync schema');
	      var $formatRef = 'formats' + it.util.getProperty($schema) + '.validate';
	      out += ' if (!(await ' + $formatRef + '(' + $data + '))) { ';
	    } else {
	      out += ' if (! ';
	      var $formatRef = 'formats' + it.util.getProperty($schema);
	      if ($isObject) $formatRef += '.validate';

	      if (typeof $format == 'function') {
	        out += ' ' + $formatRef + '(' + $data + ') ';
	      } else {
	        out += ' ' + $formatRef + '.test(' + $data + ') ';
	      }

	      out += ') { ';
	    }
	  }

	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = '';
	  /* istanbul ignore else */

	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + 'format' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { format:  ';

	    if ($isData) {
	      out += '' + $schemaValue;
	    } else {
	      out += '' + it.util.toQuotedString($schema);
	    }

	    out += '  } ';

	    if (it.opts.messages !== false) {
	      out += ' , message: \'should match format "';

	      if ($isData) {
	        out += '\' + ' + $schemaValue + ' + \'';
	      } else {
	        out += '' + it.util.escapeQuotes($schema);
	      }

	      out += '"\' ';
	    }

	    if (it.opts.verbose) {
	      out += ' , schema:  ';

	      if ($isData) {
	        out += 'validate.schema' + $schemaPath;
	      } else {
	        out += '' + it.util.toQuotedString($schema);
	      }

	      out += '         , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	    }

	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }

	  var __err = out;
	  out = $$outStack.pop();

	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + __err + ']); ';
	    } else {
	      out += ' validate.errors = [' + __err + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }

	  out += ' } ';

	  if ($breakOnError) {
	    out += ' else { ';
	  }

	  return out;
	};

	var _if = function generate_if(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  var $thenSch = it.schema['then'],
	      $elseSch = it.schema['else'],
	      $thenPresent = $thenSch !== undefined && (it.opts.strictKeywords ? typeof $thenSch == 'object' && Object.keys($thenSch).length > 0 : it.util.schemaHasRules($thenSch, it.RULES.all)),
	      $elsePresent = $elseSch !== undefined && (it.opts.strictKeywords ? typeof $elseSch == 'object' && Object.keys($elseSch).length > 0 : it.util.schemaHasRules($elseSch, it.RULES.all)),
	      $currentBaseId = $it.baseId;

	  if ($thenPresent || $elsePresent) {
	    var $ifClause;
	    $it.createErrors = false;
	    $it.schema = $schema;
	    $it.schemaPath = $schemaPath;
	    $it.errSchemaPath = $errSchemaPath;
	    out += ' var ' + $errs + ' = errors; var ' + $valid + ' = true;  ';
	    var $wasComposite = it.compositeRule;
	    it.compositeRule = $it.compositeRule = true;
	    out += '  ' + it.validate($it) + ' ';
	    $it.baseId = $currentBaseId;
	    $it.createErrors = true;
	    out += '  errors = ' + $errs + '; if (vErrors !== null) { if (' + $errs + ') vErrors.length = ' + $errs + '; else vErrors = null; }  ';
	    it.compositeRule = $it.compositeRule = $wasComposite;

	    if ($thenPresent) {
	      out += ' if (' + $nextValid + ') {  ';
	      $it.schema = it.schema['then'];
	      $it.schemaPath = it.schemaPath + '.then';
	      $it.errSchemaPath = it.errSchemaPath + '/then';
	      out += '  ' + it.validate($it) + ' ';
	      $it.baseId = $currentBaseId;
	      out += ' ' + $valid + ' = ' + $nextValid + '; ';

	      if ($thenPresent && $elsePresent) {
	        $ifClause = 'ifClause' + $lvl;
	        out += ' var ' + $ifClause + ' = \'then\'; ';
	      } else {
	        $ifClause = '\'then\'';
	      }

	      out += ' } ';

	      if ($elsePresent) {
	        out += ' else { ';
	      }
	    } else {
	      out += ' if (!' + $nextValid + ') { ';
	    }

	    if ($elsePresent) {
	      $it.schema = it.schema['else'];
	      $it.schemaPath = it.schemaPath + '.else';
	      $it.errSchemaPath = it.errSchemaPath + '/else';
	      out += '  ' + it.validate($it) + ' ';
	      $it.baseId = $currentBaseId;
	      out += ' ' + $valid + ' = ' + $nextValid + '; ';

	      if ($thenPresent && $elsePresent) {
	        $ifClause = 'ifClause' + $lvl;
	        out += ' var ' + $ifClause + ' = \'else\'; ';
	      } else {
	        $ifClause = '\'else\'';
	      }

	      out += ' } ';
	    }

	    out += ' if (!' + $valid + ') {   var err =   ';
	    /* istanbul ignore else */

	    if (it.createErrors !== false) {
	      out += ' { keyword: \'' + 'if' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { failingKeyword: ' + $ifClause + ' } ';

	      if (it.opts.messages !== false) {
	        out += ' , message: \'should match "\' + ' + $ifClause + ' + \'" schema\' ';
	      }

	      if (it.opts.verbose) {
	        out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	      }

	      out += ' } ';
	    } else {
	      out += ' {} ';
	    }

	    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';

	    if (!it.compositeRule && $breakOnError) {
	      /* istanbul ignore if */
	      if (it.async) {
	        out += ' throw new ValidationError(vErrors); ';
	      } else {
	        out += ' validate.errors = vErrors; return false; ';
	      }
	    }

	    out += ' }   ';

	    if ($breakOnError) {
	      out += ' else { ';
	    }

	    out = it.util.cleanUpCode(out);
	  } else {
	    if ($breakOnError) {
	      out += ' if (true) { ';
	    }
	  }

	  return out;
	};

	var items = function generate_items(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  var $closingBraces = '';
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  var $idx = 'i' + $lvl,
	      $dataNxt = $it.dataLevel = it.dataLevel + 1,
	      $nextData = 'data' + $dataNxt,
	      $currentBaseId = it.baseId;
	  out += 'var ' + $errs + ' = errors;var ' + $valid + ';';

	  if (Array.isArray($schema)) {
	    var $additionalItems = it.schema.additionalItems;

	    if ($additionalItems === false) {
	      out += ' ' + $valid + ' = ' + $data + '.length <= ' + $schema.length + '; ';
	      var $currErrSchemaPath = $errSchemaPath;
	      $errSchemaPath = it.errSchemaPath + '/additionalItems';
	      out += '  if (!' + $valid + ') {   ';
	      var $$outStack = $$outStack || [];
	      $$outStack.push(out);
	      out = '';
	      /* istanbul ignore else */

	      if (it.createErrors !== false) {
	        out += ' { keyword: \'' + 'additionalItems' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { limit: ' + $schema.length + ' } ';

	        if (it.opts.messages !== false) {
	          out += ' , message: \'should NOT have more than ' + $schema.length + ' items\' ';
	        }

	        if (it.opts.verbose) {
	          out += ' , schema: false , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	        }

	        out += ' } ';
	      } else {
	        out += ' {} ';
	      }

	      var __err = out;
	      out = $$outStack.pop();

	      if (!it.compositeRule && $breakOnError) {
	        /* istanbul ignore if */
	        if (it.async) {
	          out += ' throw new ValidationError([' + __err + ']); ';
	        } else {
	          out += ' validate.errors = [' + __err + ']; return false; ';
	        }
	      } else {
	        out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	      }

	      out += ' } ';
	      $errSchemaPath = $currErrSchemaPath;

	      if ($breakOnError) {
	        $closingBraces += '}';
	        out += ' else { ';
	      }
	    }

	    var arr1 = $schema;

	    if (arr1) {
	      var $sch,
	          $i = -1,
	          l1 = arr1.length - 1;

	      while ($i < l1) {
	        $sch = arr1[$i += 1];

	        if (it.opts.strictKeywords ? typeof $sch == 'object' && Object.keys($sch).length > 0 : it.util.schemaHasRules($sch, it.RULES.all)) {
	          out += ' ' + $nextValid + ' = true; if (' + $data + '.length > ' + $i + ') { ';
	          var $passData = $data + '[' + $i + ']';
	          $it.schema = $sch;
	          $it.schemaPath = $schemaPath + '[' + $i + ']';
	          $it.errSchemaPath = $errSchemaPath + '/' + $i;
	          $it.errorPath = it.util.getPathExpr(it.errorPath, $i, it.opts.jsonPointers, true);
	          $it.dataPathArr[$dataNxt] = $i;
	          var $code = it.validate($it);
	          $it.baseId = $currentBaseId;

	          if (it.util.varOccurences($code, $nextData) < 2) {
	            out += ' ' + it.util.varReplace($code, $nextData, $passData) + ' ';
	          } else {
	            out += ' var ' + $nextData + ' = ' + $passData + '; ' + $code + ' ';
	          }

	          out += ' }  ';

	          if ($breakOnError) {
	            out += ' if (' + $nextValid + ') { ';
	            $closingBraces += '}';
	          }
	        }
	      }
	    }

	    if (typeof $additionalItems == 'object' && (it.opts.strictKeywords ? typeof $additionalItems == 'object' && Object.keys($additionalItems).length > 0 : it.util.schemaHasRules($additionalItems, it.RULES.all))) {
	      $it.schema = $additionalItems;
	      $it.schemaPath = it.schemaPath + '.additionalItems';
	      $it.errSchemaPath = it.errSchemaPath + '/additionalItems';
	      out += ' ' + $nextValid + ' = true; if (' + $data + '.length > ' + $schema.length + ') {  for (var ' + $idx + ' = ' + $schema.length + '; ' + $idx + ' < ' + $data + '.length; ' + $idx + '++) { ';
	      $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
	      var $passData = $data + '[' + $idx + ']';
	      $it.dataPathArr[$dataNxt] = $idx;
	      var $code = it.validate($it);
	      $it.baseId = $currentBaseId;

	      if (it.util.varOccurences($code, $nextData) < 2) {
	        out += ' ' + it.util.varReplace($code, $nextData, $passData) + ' ';
	      } else {
	        out += ' var ' + $nextData + ' = ' + $passData + '; ' + $code + ' ';
	      }

	      if ($breakOnError) {
	        out += ' if (!' + $nextValid + ') break; ';
	      }

	      out += ' } }  ';

	      if ($breakOnError) {
	        out += ' if (' + $nextValid + ') { ';
	        $closingBraces += '}';
	      }
	    }
	  } else if (it.opts.strictKeywords ? typeof $schema == 'object' && Object.keys($schema).length > 0 : it.util.schemaHasRules($schema, it.RULES.all)) {
	    $it.schema = $schema;
	    $it.schemaPath = $schemaPath;
	    $it.errSchemaPath = $errSchemaPath;
	    out += '  for (var ' + $idx + ' = ' + 0 + '; ' + $idx + ' < ' + $data + '.length; ' + $idx + '++) { ';
	    $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
	    var $passData = $data + '[' + $idx + ']';
	    $it.dataPathArr[$dataNxt] = $idx;
	    var $code = it.validate($it);
	    $it.baseId = $currentBaseId;

	    if (it.util.varOccurences($code, $nextData) < 2) {
	      out += ' ' + it.util.varReplace($code, $nextData, $passData) + ' ';
	    } else {
	      out += ' var ' + $nextData + ' = ' + $passData + '; ' + $code + ' ';
	    }

	    if ($breakOnError) {
	      out += ' if (!' + $nextValid + ') break; ';
	    }

	    out += ' }';
	  }

	  if ($breakOnError) {
	    out += ' ' + $closingBraces + ' if (' + $errs + ' == errors) {';
	  }

	  out = it.util.cleanUpCode(out);
	  return out;
	};

	var _limit = function generate__limit(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $errorKeyword;
	  var $data = 'data' + ($dataLvl || '');
	  var $isData = it.opts.$data && $schema && $schema.$data,
	      $schemaValue;

	  if ($isData) {
	    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }

	  var $isMax = $keyword == 'maximum',
	      $exclusiveKeyword = $isMax ? 'exclusiveMaximum' : 'exclusiveMinimum',
	      $schemaExcl = it.schema[$exclusiveKeyword],
	      $isDataExcl = it.opts.$data && $schemaExcl && $schemaExcl.$data,
	      $op = $isMax ? '<' : '>',
	      $notOp = $isMax ? '>' : '<',
	      $errorKeyword = undefined;

	  if ($isDataExcl) {
	    var $schemaValueExcl = it.util.getData($schemaExcl.$data, $dataLvl, it.dataPathArr),
	        $exclusive = 'exclusive' + $lvl,
	        $exclType = 'exclType' + $lvl,
	        $exclIsNumber = 'exclIsNumber' + $lvl,
	        $opExpr = 'op' + $lvl,
	        $opStr = '\' + ' + $opExpr + ' + \'';
	    out += ' var schemaExcl' + $lvl + ' = ' + $schemaValueExcl + '; ';
	    $schemaValueExcl = 'schemaExcl' + $lvl;
	    out += ' var ' + $exclusive + '; var ' + $exclType + ' = typeof ' + $schemaValueExcl + '; if (' + $exclType + ' != \'boolean\' && ' + $exclType + ' != \'undefined\' && ' + $exclType + ' != \'number\') { ';
	    var $errorKeyword = $exclusiveKeyword;
	    var $$outStack = $$outStack || [];
	    $$outStack.push(out);
	    out = '';
	    /* istanbul ignore else */

	    if (it.createErrors !== false) {
	      out += ' { keyword: \'' + ($errorKeyword || '_exclusiveLimit') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: {} ';

	      if (it.opts.messages !== false) {
	        out += ' , message: \'' + $exclusiveKeyword + ' should be boolean\' ';
	      }

	      if (it.opts.verbose) {
	        out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	      }

	      out += ' } ';
	    } else {
	      out += ' {} ';
	    }

	    var __err = out;
	    out = $$outStack.pop();

	    if (!it.compositeRule && $breakOnError) {
	      /* istanbul ignore if */
	      if (it.async) {
	        out += ' throw new ValidationError([' + __err + ']); ';
	      } else {
	        out += ' validate.errors = [' + __err + ']; return false; ';
	      }
	    } else {
	      out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	    }

	    out += ' } else if ( ';

	    if ($isData) {
	      out += ' (' + $schemaValue + ' !== undefined && typeof ' + $schemaValue + ' != \'number\') || ';
	    }

	    out += ' ' + $exclType + ' == \'number\' ? ( (' + $exclusive + ' = ' + $schemaValue + ' === undefined || ' + $schemaValueExcl + ' ' + $op + '= ' + $schemaValue + ') ? ' + $data + ' ' + $notOp + '= ' + $schemaValueExcl + ' : ' + $data + ' ' + $notOp + ' ' + $schemaValue + ' ) : ( (' + $exclusive + ' = ' + $schemaValueExcl + ' === true) ? ' + $data + ' ' + $notOp + '= ' + $schemaValue + ' : ' + $data + ' ' + $notOp + ' ' + $schemaValue + ' ) || ' + $data + ' !== ' + $data + ') { var op' + $lvl + ' = ' + $exclusive + ' ? \'' + $op + '\' : \'' + $op + '=\'; ';

	    if ($schema === undefined) {
	      $errorKeyword = $exclusiveKeyword;
	      $errSchemaPath = it.errSchemaPath + '/' + $exclusiveKeyword;
	      $schemaValue = $schemaValueExcl;
	      $isData = $isDataExcl;
	    }
	  } else {
	    var $exclIsNumber = typeof $schemaExcl == 'number',
	        $opStr = $op;

	    if ($exclIsNumber && $isData) {
	      var $opExpr = '\'' + $opStr + '\'';
	      out += ' if ( ';

	      if ($isData) {
	        out += ' (' + $schemaValue + ' !== undefined && typeof ' + $schemaValue + ' != \'number\') || ';
	      }

	      out += ' ( ' + $schemaValue + ' === undefined || ' + $schemaExcl + ' ' + $op + '= ' + $schemaValue + ' ? ' + $data + ' ' + $notOp + '= ' + $schemaExcl + ' : ' + $data + ' ' + $notOp + ' ' + $schemaValue + ' ) || ' + $data + ' !== ' + $data + ') { ';
	    } else {
	      if ($exclIsNumber && $schema === undefined) {
	        $exclusive = true;
	        $errorKeyword = $exclusiveKeyword;
	        $errSchemaPath = it.errSchemaPath + '/' + $exclusiveKeyword;
	        $schemaValue = $schemaExcl;
	        $notOp += '=';
	      } else {
	        if ($exclIsNumber) $schemaValue = Math[$isMax ? 'min' : 'max']($schemaExcl, $schema);

	        if ($schemaExcl === ($exclIsNumber ? $schemaValue : true)) {
	          $exclusive = true;
	          $errorKeyword = $exclusiveKeyword;
	          $errSchemaPath = it.errSchemaPath + '/' + $exclusiveKeyword;
	          $notOp += '=';
	        } else {
	          $exclusive = false;
	          $opStr += '=';
	        }
	      }

	      var $opExpr = '\'' + $opStr + '\'';
	      out += ' if ( ';

	      if ($isData) {
	        out += ' (' + $schemaValue + ' !== undefined && typeof ' + $schemaValue + ' != \'number\') || ';
	      }

	      out += ' ' + $data + ' ' + $notOp + ' ' + $schemaValue + ' || ' + $data + ' !== ' + $data + ') { ';
	    }
	  }

	  $errorKeyword = $errorKeyword || $keyword;
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = '';
	  /* istanbul ignore else */

	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + ($errorKeyword || '_limit') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { comparison: ' + $opExpr + ', limit: ' + $schemaValue + ', exclusive: ' + $exclusive + ' } ';

	    if (it.opts.messages !== false) {
	      out += ' , message: \'should be ' + $opStr + ' ';

	      if ($isData) {
	        out += '\' + ' + $schemaValue;
	      } else {
	        out += '' + $schemaValue + '\'';
	      }
	    }

	    if (it.opts.verbose) {
	      out += ' , schema:  ';

	      if ($isData) {
	        out += 'validate.schema' + $schemaPath;
	      } else {
	        out += '' + $schema;
	      }

	      out += '         , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	    }

	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }

	  var __err = out;
	  out = $$outStack.pop();

	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + __err + ']); ';
	    } else {
	      out += ' validate.errors = [' + __err + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }

	  out += ' } ';

	  if ($breakOnError) {
	    out += ' else { ';
	  }

	  return out;
	};

	var _limitItems = function generate__limitItems(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $errorKeyword;
	  var $data = 'data' + ($dataLvl || '');
	  var $isData = it.opts.$data && $schema && $schema.$data,
	      $schemaValue;

	  if ($isData) {
	    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }

	  var $op = $keyword == 'maxItems' ? '>' : '<';
	  out += 'if ( ';

	  if ($isData) {
	    out += ' (' + $schemaValue + ' !== undefined && typeof ' + $schemaValue + ' != \'number\') || ';
	  }

	  out += ' ' + $data + '.length ' + $op + ' ' + $schemaValue + ') { ';
	  var $errorKeyword = $keyword;
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = '';
	  /* istanbul ignore else */

	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + ($errorKeyword || '_limitItems') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { limit: ' + $schemaValue + ' } ';

	    if (it.opts.messages !== false) {
	      out += ' , message: \'should NOT have ';

	      if ($keyword == 'maxItems') {
	        out += 'more';
	      } else {
	        out += 'fewer';
	      }

	      out += ' than ';

	      if ($isData) {
	        out += '\' + ' + $schemaValue + ' + \'';
	      } else {
	        out += '' + $schema;
	      }

	      out += ' items\' ';
	    }

	    if (it.opts.verbose) {
	      out += ' , schema:  ';

	      if ($isData) {
	        out += 'validate.schema' + $schemaPath;
	      } else {
	        out += '' + $schema;
	      }

	      out += '         , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	    }

	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }

	  var __err = out;
	  out = $$outStack.pop();

	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + __err + ']); ';
	    } else {
	      out += ' validate.errors = [' + __err + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }

	  out += '} ';

	  if ($breakOnError) {
	    out += ' else { ';
	  }

	  return out;
	};

	var _limitLength = function generate__limitLength(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $errorKeyword;
	  var $data = 'data' + ($dataLvl || '');
	  var $isData = it.opts.$data && $schema && $schema.$data,
	      $schemaValue;

	  if ($isData) {
	    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }

	  var $op = $keyword == 'maxLength' ? '>' : '<';
	  out += 'if ( ';

	  if ($isData) {
	    out += ' (' + $schemaValue + ' !== undefined && typeof ' + $schemaValue + ' != \'number\') || ';
	  }

	  if (it.opts.unicode === false) {
	    out += ' ' + $data + '.length ';
	  } else {
	    out += ' ucs2length(' + $data + ') ';
	  }

	  out += ' ' + $op + ' ' + $schemaValue + ') { ';
	  var $errorKeyword = $keyword;
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = '';
	  /* istanbul ignore else */

	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + ($errorKeyword || '_limitLength') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { limit: ' + $schemaValue + ' } ';

	    if (it.opts.messages !== false) {
	      out += ' , message: \'should NOT be ';

	      if ($keyword == 'maxLength') {
	        out += 'longer';
	      } else {
	        out += 'shorter';
	      }

	      out += ' than ';

	      if ($isData) {
	        out += '\' + ' + $schemaValue + ' + \'';
	      } else {
	        out += '' + $schema;
	      }

	      out += ' characters\' ';
	    }

	    if (it.opts.verbose) {
	      out += ' , schema:  ';

	      if ($isData) {
	        out += 'validate.schema' + $schemaPath;
	      } else {
	        out += '' + $schema;
	      }

	      out += '         , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	    }

	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }

	  var __err = out;
	  out = $$outStack.pop();

	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + __err + ']); ';
	    } else {
	      out += ' validate.errors = [' + __err + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }

	  out += '} ';

	  if ($breakOnError) {
	    out += ' else { ';
	  }

	  return out;
	};

	var _limitProperties = function generate__limitProperties(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $errorKeyword;
	  var $data = 'data' + ($dataLvl || '');
	  var $isData = it.opts.$data && $schema && $schema.$data,
	      $schemaValue;

	  if ($isData) {
	    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }

	  var $op = $keyword == 'maxProperties' ? '>' : '<';
	  out += 'if ( ';

	  if ($isData) {
	    out += ' (' + $schemaValue + ' !== undefined && typeof ' + $schemaValue + ' != \'number\') || ';
	  }

	  out += ' Object.keys(' + $data + ').length ' + $op + ' ' + $schemaValue + ') { ';
	  var $errorKeyword = $keyword;
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = '';
	  /* istanbul ignore else */

	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + ($errorKeyword || '_limitProperties') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { limit: ' + $schemaValue + ' } ';

	    if (it.opts.messages !== false) {
	      out += ' , message: \'should NOT have ';

	      if ($keyword == 'maxProperties') {
	        out += 'more';
	      } else {
	        out += 'fewer';
	      }

	      out += ' than ';

	      if ($isData) {
	        out += '\' + ' + $schemaValue + ' + \'';
	      } else {
	        out += '' + $schema;
	      }

	      out += ' properties\' ';
	    }

	    if (it.opts.verbose) {
	      out += ' , schema:  ';

	      if ($isData) {
	        out += 'validate.schema' + $schemaPath;
	      } else {
	        out += '' + $schema;
	      }

	      out += '         , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	    }

	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }

	  var __err = out;
	  out = $$outStack.pop();

	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + __err + ']); ';
	    } else {
	      out += ' validate.errors = [' + __err + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }

	  out += '} ';

	  if ($breakOnError) {
	    out += ' else { ';
	  }

	  return out;
	};

	var multipleOf = function generate_multipleOf(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $isData = it.opts.$data && $schema && $schema.$data,
	      $schemaValue;

	  if ($isData) {
	    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }

	  out += 'var division' + $lvl + ';if (';

	  if ($isData) {
	    out += ' ' + $schemaValue + ' !== undefined && ( typeof ' + $schemaValue + ' != \'number\' || ';
	  }

	  out += ' (division' + $lvl + ' = ' + $data + ' / ' + $schemaValue + ', ';

	  if (it.opts.multipleOfPrecision) {
	    out += ' Math.abs(Math.round(division' + $lvl + ') - division' + $lvl + ') > 1e-' + it.opts.multipleOfPrecision + ' ';
	  } else {
	    out += ' division' + $lvl + ' !== parseInt(division' + $lvl + ') ';
	  }

	  out += ' ) ';

	  if ($isData) {
	    out += '  )  ';
	  }

	  out += ' ) {   ';
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = '';
	  /* istanbul ignore else */

	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + 'multipleOf' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { multipleOf: ' + $schemaValue + ' } ';

	    if (it.opts.messages !== false) {
	      out += ' , message: \'should be multiple of ';

	      if ($isData) {
	        out += '\' + ' + $schemaValue;
	      } else {
	        out += '' + $schemaValue + '\'';
	      }
	    }

	    if (it.opts.verbose) {
	      out += ' , schema:  ';

	      if ($isData) {
	        out += 'validate.schema' + $schemaPath;
	      } else {
	        out += '' + $schema;
	      }

	      out += '         , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	    }

	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }

	  var __err = out;
	  out = $$outStack.pop();

	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + __err + ']); ';
	    } else {
	      out += ' validate.errors = [' + __err + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }

	  out += '} ';

	  if ($breakOnError) {
	    out += ' else { ';
	  }

	  return out;
	};

	var not = function generate_not(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;

	  if (it.opts.strictKeywords ? typeof $schema == 'object' && Object.keys($schema).length > 0 : it.util.schemaHasRules($schema, it.RULES.all)) {
	    $it.schema = $schema;
	    $it.schemaPath = $schemaPath;
	    $it.errSchemaPath = $errSchemaPath;
	    out += ' var ' + $errs + ' = errors;  ';
	    var $wasComposite = it.compositeRule;
	    it.compositeRule = $it.compositeRule = true;
	    $it.createErrors = false;
	    var $allErrorsOption;

	    if ($it.opts.allErrors) {
	      $allErrorsOption = $it.opts.allErrors;
	      $it.opts.allErrors = false;
	    }

	    out += ' ' + it.validate($it) + ' ';
	    $it.createErrors = true;
	    if ($allErrorsOption) $it.opts.allErrors = $allErrorsOption;
	    it.compositeRule = $it.compositeRule = $wasComposite;
	    out += ' if (' + $nextValid + ') {   ';
	    var $$outStack = $$outStack || [];
	    $$outStack.push(out);
	    out = '';
	    /* istanbul ignore else */

	    if (it.createErrors !== false) {
	      out += ' { keyword: \'' + 'not' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: {} ';

	      if (it.opts.messages !== false) {
	        out += ' , message: \'should NOT be valid\' ';
	      }

	      if (it.opts.verbose) {
	        out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	      }

	      out += ' } ';
	    } else {
	      out += ' {} ';
	    }

	    var __err = out;
	    out = $$outStack.pop();

	    if (!it.compositeRule && $breakOnError) {
	      /* istanbul ignore if */
	      if (it.async) {
	        out += ' throw new ValidationError([' + __err + ']); ';
	      } else {
	        out += ' validate.errors = [' + __err + ']; return false; ';
	      }
	    } else {
	      out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	    }

	    out += ' } else {  errors = ' + $errs + '; if (vErrors !== null) { if (' + $errs + ') vErrors.length = ' + $errs + '; else vErrors = null; } ';

	    if (it.opts.allErrors) {
	      out += ' } ';
	    }
	  } else {
	    out += '  var err =   ';
	    /* istanbul ignore else */

	    if (it.createErrors !== false) {
	      out += ' { keyword: \'' + 'not' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: {} ';

	      if (it.opts.messages !== false) {
	        out += ' , message: \'should NOT be valid\' ';
	      }

	      if (it.opts.verbose) {
	        out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	      }

	      out += ' } ';
	    } else {
	      out += ' {} ';
	    }

	    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';

	    if ($breakOnError) {
	      out += ' if (false) { ';
	    }
	  }

	  return out;
	};

	var oneOf = function generate_oneOf(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  var $closingBraces = '';
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  var $currentBaseId = $it.baseId,
	      $prevValid = 'prevValid' + $lvl,
	      $passingSchemas = 'passingSchemas' + $lvl;
	  out += 'var ' + $errs + ' = errors , ' + $prevValid + ' = false , ' + $valid + ' = false , ' + $passingSchemas + ' = null; ';
	  var $wasComposite = it.compositeRule;
	  it.compositeRule = $it.compositeRule = true;
	  var arr1 = $schema;

	  if (arr1) {
	    var $sch,
	        $i = -1,
	        l1 = arr1.length - 1;

	    while ($i < l1) {
	      $sch = arr1[$i += 1];

	      if (it.opts.strictKeywords ? typeof $sch == 'object' && Object.keys($sch).length > 0 : it.util.schemaHasRules($sch, it.RULES.all)) {
	        $it.schema = $sch;
	        $it.schemaPath = $schemaPath + '[' + $i + ']';
	        $it.errSchemaPath = $errSchemaPath + '/' + $i;
	        out += '  ' + it.validate($it) + ' ';
	        $it.baseId = $currentBaseId;
	      } else {
	        out += ' var ' + $nextValid + ' = true; ';
	      }

	      if ($i) {
	        out += ' if (' + $nextValid + ' && ' + $prevValid + ') { ' + $valid + ' = false; ' + $passingSchemas + ' = [' + $passingSchemas + ', ' + $i + ']; } else { ';
	        $closingBraces += '}';
	      }

	      out += ' if (' + $nextValid + ') { ' + $valid + ' = ' + $prevValid + ' = true; ' + $passingSchemas + ' = ' + $i + '; }';
	    }
	  }

	  it.compositeRule = $it.compositeRule = $wasComposite;
	  out += '' + $closingBraces + 'if (!' + $valid + ') {   var err =   ';
	  /* istanbul ignore else */

	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + 'oneOf' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { passingSchemas: ' + $passingSchemas + ' } ';

	    if (it.opts.messages !== false) {
	      out += ' , message: \'should match exactly one schema in oneOf\' ';
	    }

	    if (it.opts.verbose) {
	      out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	    }

	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }

	  out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';

	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError(vErrors); ';
	    } else {
	      out += ' validate.errors = vErrors; return false; ';
	    }
	  }

	  out += '} else {  errors = ' + $errs + '; if (vErrors !== null) { if (' + $errs + ') vErrors.length = ' + $errs + '; else vErrors = null; }';

	  if (it.opts.allErrors) {
	    out += ' } ';
	  }

	  return out;
	};

	var pattern = function generate_pattern(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $isData = it.opts.$data && $schema && $schema.$data,
	      $schemaValue;

	  if ($isData) {
	    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }

	  var $regexp = $isData ? '(new RegExp(' + $schemaValue + '))' : it.usePattern($schema);
	  out += 'if ( ';

	  if ($isData) {
	    out += ' (' + $schemaValue + ' !== undefined && typeof ' + $schemaValue + ' != \'string\') || ';
	  }

	  out += ' !' + $regexp + '.test(' + $data + ') ) {   ';
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = '';
	  /* istanbul ignore else */

	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + 'pattern' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { pattern:  ';

	    if ($isData) {
	      out += '' + $schemaValue;
	    } else {
	      out += '' + it.util.toQuotedString($schema);
	    }

	    out += '  } ';

	    if (it.opts.messages !== false) {
	      out += ' , message: \'should match pattern "';

	      if ($isData) {
	        out += '\' + ' + $schemaValue + ' + \'';
	      } else {
	        out += '' + it.util.escapeQuotes($schema);
	      }

	      out += '"\' ';
	    }

	    if (it.opts.verbose) {
	      out += ' , schema:  ';

	      if ($isData) {
	        out += 'validate.schema' + $schemaPath;
	      } else {
	        out += '' + it.util.toQuotedString($schema);
	      }

	      out += '         , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	    }

	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }

	  var __err = out;
	  out = $$outStack.pop();

	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + __err + ']); ';
	    } else {
	      out += ' validate.errors = [' + __err + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }

	  out += '} ';

	  if ($breakOnError) {
	    out += ' else { ';
	  }

	  return out;
	};

	var properties$2 = function generate_properties(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  var $closingBraces = '';
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  var $key = 'key' + $lvl,
	      $idx = 'idx' + $lvl,
	      $dataNxt = $it.dataLevel = it.dataLevel + 1,
	      $nextData = 'data' + $dataNxt,
	      $dataProperties = 'dataProperties' + $lvl;
	  var $schemaKeys = Object.keys($schema || {}),
	      $pProperties = it.schema.patternProperties || {},
	      $pPropertyKeys = Object.keys($pProperties),
	      $aProperties = it.schema.additionalProperties,
	      $someProperties = $schemaKeys.length || $pPropertyKeys.length,
	      $noAdditional = $aProperties === false,
	      $additionalIsSchema = typeof $aProperties == 'object' && Object.keys($aProperties).length,
	      $removeAdditional = it.opts.removeAdditional,
	      $checkAdditional = $noAdditional || $additionalIsSchema || $removeAdditional,
	      $ownProperties = it.opts.ownProperties,
	      $currentBaseId = it.baseId;
	  var $required = it.schema.required;
	  if ($required && !(it.opts.$data && $required.$data) && $required.length < it.opts.loopRequired) var $requiredHash = it.util.toHash($required);
	  out += 'var ' + $errs + ' = errors;var ' + $nextValid + ' = true;';

	  if ($ownProperties) {
	    out += ' var ' + $dataProperties + ' = undefined;';
	  }

	  if ($checkAdditional) {
	    if ($ownProperties) {
	      out += ' ' + $dataProperties + ' = ' + $dataProperties + ' || Object.keys(' + $data + '); for (var ' + $idx + '=0; ' + $idx + '<' + $dataProperties + '.length; ' + $idx + '++) { var ' + $key + ' = ' + $dataProperties + '[' + $idx + ']; ';
	    } else {
	      out += ' for (var ' + $key + ' in ' + $data + ') { ';
	    }

	    if ($someProperties) {
	      out += ' var isAdditional' + $lvl + ' = !(false ';

	      if ($schemaKeys.length) {
	        if ($schemaKeys.length > 8) {
	          out += ' || validate.schema' + $schemaPath + '.hasOwnProperty(' + $key + ') ';
	        } else {
	          var arr1 = $schemaKeys;

	          if (arr1) {
	            var $propertyKey,
	                i1 = -1,
	                l1 = arr1.length - 1;

	            while (i1 < l1) {
	              $propertyKey = arr1[i1 += 1];
	              out += ' || ' + $key + ' == ' + it.util.toQuotedString($propertyKey) + ' ';
	            }
	          }
	        }
	      }

	      if ($pPropertyKeys.length) {
	        var arr2 = $pPropertyKeys;

	        if (arr2) {
	          var $pProperty,
	              $i = -1,
	              l2 = arr2.length - 1;

	          while ($i < l2) {
	            $pProperty = arr2[$i += 1];
	            out += ' || ' + it.usePattern($pProperty) + '.test(' + $key + ') ';
	          }
	        }
	      }

	      out += ' ); if (isAdditional' + $lvl + ') { ';
	    }

	    if ($removeAdditional == 'all') {
	      out += ' delete ' + $data + '[' + $key + ']; ';
	    } else {
	      var $currentErrorPath = it.errorPath;
	      var $additionalProperty = '\' + ' + $key + ' + \'';

	      if (it.opts._errorDataPathProperty) {
	        it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
	      }

	      if ($noAdditional) {
	        if ($removeAdditional) {
	          out += ' delete ' + $data + '[' + $key + ']; ';
	        } else {
	          out += ' ' + $nextValid + ' = false; ';
	          var $currErrSchemaPath = $errSchemaPath;
	          $errSchemaPath = it.errSchemaPath + '/additionalProperties';
	          var $$outStack = $$outStack || [];
	          $$outStack.push(out);
	          out = '';
	          /* istanbul ignore else */

	          if (it.createErrors !== false) {
	            out += ' { keyword: \'' + 'additionalProperties' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { additionalProperty: \'' + $additionalProperty + '\' } ';

	            if (it.opts.messages !== false) {
	              out += ' , message: \'';

	              if (it.opts._errorDataPathProperty) {
	                out += 'is an invalid additional property';
	              } else {
	                out += 'should NOT have additional properties';
	              }

	              out += '\' ';
	            }

	            if (it.opts.verbose) {
	              out += ' , schema: false , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	            }

	            out += ' } ';
	          } else {
	            out += ' {} ';
	          }

	          var __err = out;
	          out = $$outStack.pop();

	          if (!it.compositeRule && $breakOnError) {
	            /* istanbul ignore if */
	            if (it.async) {
	              out += ' throw new ValidationError([' + __err + ']); ';
	            } else {
	              out += ' validate.errors = [' + __err + ']; return false; ';
	            }
	          } else {
	            out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	          }

	          $errSchemaPath = $currErrSchemaPath;

	          if ($breakOnError) {
	            out += ' break; ';
	          }
	        }
	      } else if ($additionalIsSchema) {
	        if ($removeAdditional == 'failing') {
	          out += ' var ' + $errs + ' = errors;  ';
	          var $wasComposite = it.compositeRule;
	          it.compositeRule = $it.compositeRule = true;
	          $it.schema = $aProperties;
	          $it.schemaPath = it.schemaPath + '.additionalProperties';
	          $it.errSchemaPath = it.errSchemaPath + '/additionalProperties';
	          $it.errorPath = it.opts._errorDataPathProperty ? it.errorPath : it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
	          var $passData = $data + '[' + $key + ']';
	          $it.dataPathArr[$dataNxt] = $key;
	          var $code = it.validate($it);
	          $it.baseId = $currentBaseId;

	          if (it.util.varOccurences($code, $nextData) < 2) {
	            out += ' ' + it.util.varReplace($code, $nextData, $passData) + ' ';
	          } else {
	            out += ' var ' + $nextData + ' = ' + $passData + '; ' + $code + ' ';
	          }

	          out += ' if (!' + $nextValid + ') { errors = ' + $errs + '; if (validate.errors !== null) { if (errors) validate.errors.length = errors; else validate.errors = null; } delete ' + $data + '[' + $key + ']; }  ';
	          it.compositeRule = $it.compositeRule = $wasComposite;
	        } else {
	          $it.schema = $aProperties;
	          $it.schemaPath = it.schemaPath + '.additionalProperties';
	          $it.errSchemaPath = it.errSchemaPath + '/additionalProperties';
	          $it.errorPath = it.opts._errorDataPathProperty ? it.errorPath : it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
	          var $passData = $data + '[' + $key + ']';
	          $it.dataPathArr[$dataNxt] = $key;
	          var $code = it.validate($it);
	          $it.baseId = $currentBaseId;

	          if (it.util.varOccurences($code, $nextData) < 2) {
	            out += ' ' + it.util.varReplace($code, $nextData, $passData) + ' ';
	          } else {
	            out += ' var ' + $nextData + ' = ' + $passData + '; ' + $code + ' ';
	          }

	          if ($breakOnError) {
	            out += ' if (!' + $nextValid + ') break; ';
	          }
	        }
	      }

	      it.errorPath = $currentErrorPath;
	    }

	    if ($someProperties) {
	      out += ' } ';
	    }

	    out += ' }  ';

	    if ($breakOnError) {
	      out += ' if (' + $nextValid + ') { ';
	      $closingBraces += '}';
	    }
	  }

	  var $useDefaults = it.opts.useDefaults && !it.compositeRule;

	  if ($schemaKeys.length) {
	    var arr3 = $schemaKeys;

	    if (arr3) {
	      var $propertyKey,
	          i3 = -1,
	          l3 = arr3.length - 1;

	      while (i3 < l3) {
	        $propertyKey = arr3[i3 += 1];
	        var $sch = $schema[$propertyKey];

	        if (it.opts.strictKeywords ? typeof $sch == 'object' && Object.keys($sch).length > 0 : it.util.schemaHasRules($sch, it.RULES.all)) {
	          var $prop = it.util.getProperty($propertyKey),
	              $passData = $data + $prop,
	              $hasDefault = $useDefaults && $sch.default !== undefined;
	          $it.schema = $sch;
	          $it.schemaPath = $schemaPath + $prop;
	          $it.errSchemaPath = $errSchemaPath + '/' + it.util.escapeFragment($propertyKey);
	          $it.errorPath = it.util.getPath(it.errorPath, $propertyKey, it.opts.jsonPointers);
	          $it.dataPathArr[$dataNxt] = it.util.toQuotedString($propertyKey);
	          var $code = it.validate($it);
	          $it.baseId = $currentBaseId;

	          if (it.util.varOccurences($code, $nextData) < 2) {
	            $code = it.util.varReplace($code, $nextData, $passData);
	            var $useData = $passData;
	          } else {
	            var $useData = $nextData;
	            out += ' var ' + $nextData + ' = ' + $passData + '; ';
	          }

	          if ($hasDefault) {
	            out += ' ' + $code + ' ';
	          } else {
	            if ($requiredHash && $requiredHash[$propertyKey]) {
	              out += ' if ( ' + $useData + ' === undefined ';

	              if ($ownProperties) {
	                out += ' || ! Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($propertyKey) + '\') ';
	              }

	              out += ') { ' + $nextValid + ' = false; ';
	              var $currentErrorPath = it.errorPath,
	                  $currErrSchemaPath = $errSchemaPath,
	                  $missingProperty = it.util.escapeQuotes($propertyKey);

	              if (it.opts._errorDataPathProperty) {
	                it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
	              }

	              $errSchemaPath = it.errSchemaPath + '/required';
	              var $$outStack = $$outStack || [];
	              $$outStack.push(out);
	              out = '';
	              /* istanbul ignore else */

	              if (it.createErrors !== false) {
	                out += ' { keyword: \'' + 'required' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { missingProperty: \'' + $missingProperty + '\' } ';

	                if (it.opts.messages !== false) {
	                  out += ' , message: \'';

	                  if (it.opts._errorDataPathProperty) {
	                    out += 'is a required property';
	                  } else {
	                    out += 'should have required property \\\'' + $missingProperty + '\\\'';
	                  }

	                  out += '\' ';
	                }

	                if (it.opts.verbose) {
	                  out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	                }

	                out += ' } ';
	              } else {
	                out += ' {} ';
	              }

	              var __err = out;
	              out = $$outStack.pop();

	              if (!it.compositeRule && $breakOnError) {
	                /* istanbul ignore if */
	                if (it.async) {
	                  out += ' throw new ValidationError([' + __err + ']); ';
	                } else {
	                  out += ' validate.errors = [' + __err + ']; return false; ';
	                }
	              } else {
	                out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	              }

	              $errSchemaPath = $currErrSchemaPath;
	              it.errorPath = $currentErrorPath;
	              out += ' } else { ';
	            } else {
	              if ($breakOnError) {
	                out += ' if ( ' + $useData + ' === undefined ';

	                if ($ownProperties) {
	                  out += ' || ! Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($propertyKey) + '\') ';
	                }

	                out += ') { ' + $nextValid + ' = true; } else { ';
	              } else {
	                out += ' if (' + $useData + ' !== undefined ';

	                if ($ownProperties) {
	                  out += ' &&   Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($propertyKey) + '\') ';
	                }

	                out += ' ) { ';
	              }
	            }

	            out += ' ' + $code + ' } ';
	          }
	        }

	        if ($breakOnError) {
	          out += ' if (' + $nextValid + ') { ';
	          $closingBraces += '}';
	        }
	      }
	    }
	  }

	  if ($pPropertyKeys.length) {
	    var arr4 = $pPropertyKeys;

	    if (arr4) {
	      var $pProperty,
	          i4 = -1,
	          l4 = arr4.length - 1;

	      while (i4 < l4) {
	        $pProperty = arr4[i4 += 1];
	        var $sch = $pProperties[$pProperty];

	        if (it.opts.strictKeywords ? typeof $sch == 'object' && Object.keys($sch).length > 0 : it.util.schemaHasRules($sch, it.RULES.all)) {
	          $it.schema = $sch;
	          $it.schemaPath = it.schemaPath + '.patternProperties' + it.util.getProperty($pProperty);
	          $it.errSchemaPath = it.errSchemaPath + '/patternProperties/' + it.util.escapeFragment($pProperty);

	          if ($ownProperties) {
	            out += ' ' + $dataProperties + ' = ' + $dataProperties + ' || Object.keys(' + $data + '); for (var ' + $idx + '=0; ' + $idx + '<' + $dataProperties + '.length; ' + $idx + '++) { var ' + $key + ' = ' + $dataProperties + '[' + $idx + ']; ';
	          } else {
	            out += ' for (var ' + $key + ' in ' + $data + ') { ';
	          }

	          out += ' if (' + it.usePattern($pProperty) + '.test(' + $key + ')) { ';
	          $it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
	          var $passData = $data + '[' + $key + ']';
	          $it.dataPathArr[$dataNxt] = $key;
	          var $code = it.validate($it);
	          $it.baseId = $currentBaseId;

	          if (it.util.varOccurences($code, $nextData) < 2) {
	            out += ' ' + it.util.varReplace($code, $nextData, $passData) + ' ';
	          } else {
	            out += ' var ' + $nextData + ' = ' + $passData + '; ' + $code + ' ';
	          }

	          if ($breakOnError) {
	            out += ' if (!' + $nextValid + ') break; ';
	          }

	          out += ' } ';

	          if ($breakOnError) {
	            out += ' else ' + $nextValid + ' = true; ';
	          }

	          out += ' }  ';

	          if ($breakOnError) {
	            out += ' if (' + $nextValid + ') { ';
	            $closingBraces += '}';
	          }
	        }
	      }
	    }
	  }

	  if ($breakOnError) {
	    out += ' ' + $closingBraces + ' if (' + $errs + ' == errors) {';
	  }

	  out = it.util.cleanUpCode(out);
	  return out;
	};

	var propertyNames = function generate_propertyNames(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  var $closingBraces = '';
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  out += 'var ' + $errs + ' = errors;';

	  if (it.opts.strictKeywords ? typeof $schema == 'object' && Object.keys($schema).length > 0 : it.util.schemaHasRules($schema, it.RULES.all)) {
	    $it.schema = $schema;
	    $it.schemaPath = $schemaPath;
	    $it.errSchemaPath = $errSchemaPath;
	    var $key = 'key' + $lvl,
	        $idx = 'idx' + $lvl,
	        $i = 'i' + $lvl,
	        $invalidName = '\' + ' + $key + ' + \'',
	        $dataNxt = $it.dataLevel = it.dataLevel + 1,
	        $nextData = 'data' + $dataNxt,
	        $dataProperties = 'dataProperties' + $lvl,
	        $ownProperties = it.opts.ownProperties,
	        $currentBaseId = it.baseId;

	    if ($ownProperties) {
	      out += ' var ' + $dataProperties + ' = undefined; ';
	    }

	    if ($ownProperties) {
	      out += ' ' + $dataProperties + ' = ' + $dataProperties + ' || Object.keys(' + $data + '); for (var ' + $idx + '=0; ' + $idx + '<' + $dataProperties + '.length; ' + $idx + '++) { var ' + $key + ' = ' + $dataProperties + '[' + $idx + ']; ';
	    } else {
	      out += ' for (var ' + $key + ' in ' + $data + ') { ';
	    }

	    out += ' var startErrs' + $lvl + ' = errors; ';
	    var $passData = $key;
	    var $wasComposite = it.compositeRule;
	    it.compositeRule = $it.compositeRule = true;
	    var $code = it.validate($it);
	    $it.baseId = $currentBaseId;

	    if (it.util.varOccurences($code, $nextData) < 2) {
	      out += ' ' + it.util.varReplace($code, $nextData, $passData) + ' ';
	    } else {
	      out += ' var ' + $nextData + ' = ' + $passData + '; ' + $code + ' ';
	    }

	    it.compositeRule = $it.compositeRule = $wasComposite;
	    out += ' if (!' + $nextValid + ') { for (var ' + $i + '=startErrs' + $lvl + '; ' + $i + '<errors; ' + $i + '++) { vErrors[' + $i + '].propertyName = ' + $key + '; }   var err =   ';
	    /* istanbul ignore else */

	    if (it.createErrors !== false) {
	      out += ' { keyword: \'' + 'propertyNames' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { propertyName: \'' + $invalidName + '\' } ';

	      if (it.opts.messages !== false) {
	        out += ' , message: \'property name \\\'' + $invalidName + '\\\' is invalid\' ';
	      }

	      if (it.opts.verbose) {
	        out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	      }

	      out += ' } ';
	    } else {
	      out += ' {} ';
	    }

	    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';

	    if (!it.compositeRule && $breakOnError) {
	      /* istanbul ignore if */
	      if (it.async) {
	        out += ' throw new ValidationError(vErrors); ';
	      } else {
	        out += ' validate.errors = vErrors; return false; ';
	      }
	    }

	    if ($breakOnError) {
	      out += ' break; ';
	    }

	    out += ' } }';
	  }

	  if ($breakOnError) {
	    out += ' ' + $closingBraces + ' if (' + $errs + ' == errors) {';
	  }

	  out = it.util.cleanUpCode(out);
	  return out;
	};

	var required$1 = function generate_required(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $isData = it.opts.$data && $schema && $schema.$data;

	  if ($isData) {
	    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
	  }

	  var $vSchema = 'schema' + $lvl;

	  if (!$isData) {
	    if ($schema.length < it.opts.loopRequired && it.schema.properties && Object.keys(it.schema.properties).length) {
	      var $required = [];
	      var arr1 = $schema;

	      if (arr1) {
	        var $property,
	            i1 = -1,
	            l1 = arr1.length - 1;

	        while (i1 < l1) {
	          $property = arr1[i1 += 1];
	          var $propertySch = it.schema.properties[$property];

	          if (!($propertySch && (it.opts.strictKeywords ? typeof $propertySch == 'object' && Object.keys($propertySch).length > 0 : it.util.schemaHasRules($propertySch, it.RULES.all)))) {
	            $required[$required.length] = $property;
	          }
	        }
	      }
	    } else {
	      var $required = $schema;
	    }
	  }

	  if ($isData || $required.length) {
	    var $currentErrorPath = it.errorPath,
	        $loopRequired = $isData || $required.length >= it.opts.loopRequired,
	        $ownProperties = it.opts.ownProperties;

	    if ($breakOnError) {
	      out += ' var missing' + $lvl + '; ';

	      if ($loopRequired) {
	        if (!$isData) {
	          out += ' var ' + $vSchema + ' = validate.schema' + $schemaPath + '; ';
	        }

	        var $i = 'i' + $lvl,
	            $propertyPath = 'schema' + $lvl + '[' + $i + ']',
	            $missingProperty = '\' + ' + $propertyPath + ' + \'';

	        if (it.opts._errorDataPathProperty) {
	          it.errorPath = it.util.getPathExpr($currentErrorPath, $propertyPath, it.opts.jsonPointers);
	        }

	        out += ' var ' + $valid + ' = true; ';

	        if ($isData) {
	          out += ' if (schema' + $lvl + ' === undefined) ' + $valid + ' = true; else if (!Array.isArray(schema' + $lvl + ')) ' + $valid + ' = false; else {';
	        }

	        out += ' for (var ' + $i + ' = 0; ' + $i + ' < ' + $vSchema + '.length; ' + $i + '++) { ' + $valid + ' = ' + $data + '[' + $vSchema + '[' + $i + ']] !== undefined ';

	        if ($ownProperties) {
	          out += ' &&   Object.prototype.hasOwnProperty.call(' + $data + ', ' + $vSchema + '[' + $i + ']) ';
	        }

	        out += '; if (!' + $valid + ') break; } ';

	        if ($isData) {
	          out += '  }  ';
	        }

	        out += '  if (!' + $valid + ') {   ';
	        var $$outStack = $$outStack || [];
	        $$outStack.push(out);
	        out = '';
	        /* istanbul ignore else */

	        if (it.createErrors !== false) {
	          out += ' { keyword: \'' + 'required' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { missingProperty: \'' + $missingProperty + '\' } ';

	          if (it.opts.messages !== false) {
	            out += ' , message: \'';

	            if (it.opts._errorDataPathProperty) {
	              out += 'is a required property';
	            } else {
	              out += 'should have required property \\\'' + $missingProperty + '\\\'';
	            }

	            out += '\' ';
	          }

	          if (it.opts.verbose) {
	            out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	          }

	          out += ' } ';
	        } else {
	          out += ' {} ';
	        }

	        var __err = out;
	        out = $$outStack.pop();

	        if (!it.compositeRule && $breakOnError) {
	          /* istanbul ignore if */
	          if (it.async) {
	            out += ' throw new ValidationError([' + __err + ']); ';
	          } else {
	            out += ' validate.errors = [' + __err + ']; return false; ';
	          }
	        } else {
	          out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	        }

	        out += ' } else { ';
	      } else {
	        out += ' if ( ';
	        var arr2 = $required;

	        if (arr2) {
	          var $propertyKey,
	              $i = -1,
	              l2 = arr2.length - 1;

	          while ($i < l2) {
	            $propertyKey = arr2[$i += 1];

	            if ($i) {
	              out += ' || ';
	            }

	            var $prop = it.util.getProperty($propertyKey),
	                $useData = $data + $prop;
	            out += ' ( ( ' + $useData + ' === undefined ';

	            if ($ownProperties) {
	              out += ' || ! Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($propertyKey) + '\') ';
	            }

	            out += ') && (missing' + $lvl + ' = ' + it.util.toQuotedString(it.opts.jsonPointers ? $propertyKey : $prop) + ') ) ';
	          }
	        }

	        out += ') {  ';
	        var $propertyPath = 'missing' + $lvl,
	            $missingProperty = '\' + ' + $propertyPath + ' + \'';

	        if (it.opts._errorDataPathProperty) {
	          it.errorPath = it.opts.jsonPointers ? it.util.getPathExpr($currentErrorPath, $propertyPath, true) : $currentErrorPath + ' + ' + $propertyPath;
	        }

	        var $$outStack = $$outStack || [];
	        $$outStack.push(out);
	        out = '';
	        /* istanbul ignore else */

	        if (it.createErrors !== false) {
	          out += ' { keyword: \'' + 'required' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { missingProperty: \'' + $missingProperty + '\' } ';

	          if (it.opts.messages !== false) {
	            out += ' , message: \'';

	            if (it.opts._errorDataPathProperty) {
	              out += 'is a required property';
	            } else {
	              out += 'should have required property \\\'' + $missingProperty + '\\\'';
	            }

	            out += '\' ';
	          }

	          if (it.opts.verbose) {
	            out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	          }

	          out += ' } ';
	        } else {
	          out += ' {} ';
	        }

	        var __err = out;
	        out = $$outStack.pop();

	        if (!it.compositeRule && $breakOnError) {
	          /* istanbul ignore if */
	          if (it.async) {
	            out += ' throw new ValidationError([' + __err + ']); ';
	          } else {
	            out += ' validate.errors = [' + __err + ']; return false; ';
	          }
	        } else {
	          out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	        }

	        out += ' } else { ';
	      }
	    } else {
	      if ($loopRequired) {
	        if (!$isData) {
	          out += ' var ' + $vSchema + ' = validate.schema' + $schemaPath + '; ';
	        }

	        var $i = 'i' + $lvl,
	            $propertyPath = 'schema' + $lvl + '[' + $i + ']',
	            $missingProperty = '\' + ' + $propertyPath + ' + \'';

	        if (it.opts._errorDataPathProperty) {
	          it.errorPath = it.util.getPathExpr($currentErrorPath, $propertyPath, it.opts.jsonPointers);
	        }

	        if ($isData) {
	          out += ' if (' + $vSchema + ' && !Array.isArray(' + $vSchema + ')) {  var err =   ';
	          /* istanbul ignore else */

	          if (it.createErrors !== false) {
	            out += ' { keyword: \'' + 'required' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { missingProperty: \'' + $missingProperty + '\' } ';

	            if (it.opts.messages !== false) {
	              out += ' , message: \'';

	              if (it.opts._errorDataPathProperty) {
	                out += 'is a required property';
	              } else {
	                out += 'should have required property \\\'' + $missingProperty + '\\\'';
	              }

	              out += '\' ';
	            }

	            if (it.opts.verbose) {
	              out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	            }

	            out += ' } ';
	          } else {
	            out += ' {} ';
	          }

	          out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else if (' + $vSchema + ' !== undefined) { ';
	        }

	        out += ' for (var ' + $i + ' = 0; ' + $i + ' < ' + $vSchema + '.length; ' + $i + '++) { if (' + $data + '[' + $vSchema + '[' + $i + ']] === undefined ';

	        if ($ownProperties) {
	          out += ' || ! Object.prototype.hasOwnProperty.call(' + $data + ', ' + $vSchema + '[' + $i + ']) ';
	        }

	        out += ') {  var err =   ';
	        /* istanbul ignore else */

	        if (it.createErrors !== false) {
	          out += ' { keyword: \'' + 'required' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { missingProperty: \'' + $missingProperty + '\' } ';

	          if (it.opts.messages !== false) {
	            out += ' , message: \'';

	            if (it.opts._errorDataPathProperty) {
	              out += 'is a required property';
	            } else {
	              out += 'should have required property \\\'' + $missingProperty + '\\\'';
	            }

	            out += '\' ';
	          }

	          if (it.opts.verbose) {
	            out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	          }

	          out += ' } ';
	        } else {
	          out += ' {} ';
	        }

	        out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } } ';

	        if ($isData) {
	          out += '  }  ';
	        }
	      } else {
	        var arr3 = $required;

	        if (arr3) {
	          var $propertyKey,
	              i3 = -1,
	              l3 = arr3.length - 1;

	          while (i3 < l3) {
	            $propertyKey = arr3[i3 += 1];
	            var $prop = it.util.getProperty($propertyKey),
	                $missingProperty = it.util.escapeQuotes($propertyKey),
	                $useData = $data + $prop;

	            if (it.opts._errorDataPathProperty) {
	              it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
	            }

	            out += ' if ( ' + $useData + ' === undefined ';

	            if ($ownProperties) {
	              out += ' || ! Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($propertyKey) + '\') ';
	            }

	            out += ') {  var err =   ';
	            /* istanbul ignore else */

	            if (it.createErrors !== false) {
	              out += ' { keyword: \'' + 'required' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { missingProperty: \'' + $missingProperty + '\' } ';

	              if (it.opts.messages !== false) {
	                out += ' , message: \'';

	                if (it.opts._errorDataPathProperty) {
	                  out += 'is a required property';
	                } else {
	                  out += 'should have required property \\\'' + $missingProperty + '\\\'';
	                }

	                out += '\' ';
	              }

	              if (it.opts.verbose) {
	                out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	              }

	              out += ' } ';
	            } else {
	              out += ' {} ';
	            }

	            out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ';
	          }
	        }
	      }
	    }

	    it.errorPath = $currentErrorPath;
	  } else if ($breakOnError) {
	    out += ' if (true) {';
	  }

	  return out;
	};

	var uniqueItems = function generate_uniqueItems(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $isData = it.opts.$data && $schema && $schema.$data,
	      $schemaValue;

	  if ($isData) {
	    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }

	  if (($schema || $isData) && it.opts.uniqueItems !== false) {
	    if ($isData) {
	      out += ' var ' + $valid + '; if (' + $schemaValue + ' === false || ' + $schemaValue + ' === undefined) ' + $valid + ' = true; else if (typeof ' + $schemaValue + ' != \'boolean\') ' + $valid + ' = false; else { ';
	    }

	    out += ' var i = ' + $data + '.length , ' + $valid + ' = true , j; if (i > 1) { ';
	    var $itemType = it.schema.items && it.schema.items.type,
	        $typeIsArray = Array.isArray($itemType);

	    if (!$itemType || $itemType == 'object' || $itemType == 'array' || $typeIsArray && ($itemType.indexOf('object') >= 0 || $itemType.indexOf('array') >= 0)) {
	      out += ' outer: for (;i--;) { for (j = i; j--;) { if (equal(' + $data + '[i], ' + $data + '[j])) { ' + $valid + ' = false; break outer; } } } ';
	    } else {
	      out += ' var itemIndices = {}, item; for (;i--;) { var item = ' + $data + '[i]; ';
	      var $method = 'checkDataType' + ($typeIsArray ? 's' : '');
	      out += ' if (' + it.util[$method]($itemType, 'item', true) + ') continue; ';

	      if ($typeIsArray) {
	        out += ' if (typeof item == \'string\') item = \'"\' + item; ';
	      }

	      out += ' if (typeof itemIndices[item] == \'number\') { ' + $valid + ' = false; j = itemIndices[item]; break; } itemIndices[item] = i; } ';
	    }

	    out += ' } ';

	    if ($isData) {
	      out += '  }  ';
	    }

	    out += ' if (!' + $valid + ') {   ';
	    var $$outStack = $$outStack || [];
	    $$outStack.push(out);
	    out = '';
	    /* istanbul ignore else */

	    if (it.createErrors !== false) {
	      out += ' { keyword: \'' + 'uniqueItems' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { i: i, j: j } ';

	      if (it.opts.messages !== false) {
	        out += ' , message: \'should NOT have duplicate items (items ## \' + j + \' and \' + i + \' are identical)\' ';
	      }

	      if (it.opts.verbose) {
	        out += ' , schema:  ';

	        if ($isData) {
	          out += 'validate.schema' + $schemaPath;
	        } else {
	          out += '' + $schema;
	        }

	        out += '         , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	      }

	      out += ' } ';
	    } else {
	      out += ' {} ';
	    }

	    var __err = out;
	    out = $$outStack.pop();

	    if (!it.compositeRule && $breakOnError) {
	      /* istanbul ignore if */
	      if (it.async) {
	        out += ' throw new ValidationError([' + __err + ']); ';
	      } else {
	        out += ' validate.errors = [' + __err + ']; return false; ';
	      }
	    } else {
	      out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	    }

	    out += ' } ';

	    if ($breakOnError) {
	      out += ' else { ';
	    }
	  } else {
	    if ($breakOnError) {
	      out += ' if (true) { ';
	    }
	  }

	  return out;
	};

	var dotjs = {
	  '$ref': ref,
	  allOf: allOf,
	  anyOf: anyOf,
	  '$comment': comment,
	  const: _const,
	  contains: contains,
	  dependencies: dependencies,
	  'enum': _enum,
	  format: format,
	  'if': _if,
	  items: items,
	  maximum: _limit,
	  minimum: _limit,
	  maxItems: _limitItems,
	  minItems: _limitItems,
	  maxLength: _limitLength,
	  minLength: _limitLength,
	  maxProperties: _limitProperties,
	  minProperties: _limitProperties,
	  multipleOf: multipleOf,
	  not: not,
	  oneOf: oneOf,
	  pattern: pattern,
	  properties: properties$2,
	  propertyNames: propertyNames,
	  required: required$1,
	  uniqueItems: uniqueItems,
	  validate: validate$1
	};

	var ruleModules = dotjs,
	    toHash = util$5.toHash;

	var rules$1 = function rules() {
	  var RULES = [{
	    type: 'number',
	    rules: [{
	      'maximum': ['exclusiveMaximum']
	    }, {
	      'minimum': ['exclusiveMinimum']
	    }, 'multipleOf', 'format']
	  }, {
	    type: 'string',
	    rules: ['maxLength', 'minLength', 'pattern', 'format']
	  }, {
	    type: 'array',
	    rules: ['maxItems', 'minItems', 'items', 'contains', 'uniqueItems']
	  }, {
	    type: 'object',
	    rules: ['maxProperties', 'minProperties', 'required', 'dependencies', 'propertyNames', {
	      'properties': ['additionalProperties', 'patternProperties']
	    }]
	  }, {
	    rules: ['$ref', 'const', 'enum', 'not', 'anyOf', 'oneOf', 'allOf', 'if']
	  }];
	  var ALL = ['type', '$comment'];
	  var KEYWORDS = ['$schema', '$id', 'id', '$data', '$async', 'title', 'description', 'default', 'definitions', 'examples', 'readOnly', 'writeOnly', 'contentMediaType', 'contentEncoding', 'additionalItems', 'then', 'else'];
	  var TYPES = ['number', 'integer', 'string', 'array', 'object', 'boolean', 'null'];
	  RULES.all = toHash(ALL);
	  RULES.types = toHash(TYPES);
	  RULES.forEach(function (group) {
	    group.rules = group.rules.map(function (keyword) {
	      var implKeywords;

	      if (typeof keyword == 'object') {
	        var key = Object.keys(keyword)[0];
	        implKeywords = keyword[key];
	        keyword = key;
	        implKeywords.forEach(function (k) {
	          ALL.push(k);
	          RULES.all[k] = true;
	        });
	      }

	      ALL.push(keyword);
	      var rule = RULES.all[keyword] = {
	        keyword: keyword,
	        code: ruleModules[keyword],
	        implements: implKeywords
	      };
	      return rule;
	    });
	    RULES.all.$comment = {
	      keyword: '$comment',
	      code: ruleModules.$comment
	    };
	    if (group.type) RULES.types[group.type] = group;
	  });
	  RULES.keywords = toHash(ALL.concat(KEYWORDS));
	  RULES.custom = {};
	  return RULES;
	};

	var KEYWORDS = ['multipleOf', 'maximum', 'exclusiveMaximum', 'minimum', 'exclusiveMinimum', 'maxLength', 'minLength', 'pattern', 'additionalItems', 'maxItems', 'minItems', 'uniqueItems', 'maxProperties', 'minProperties', 'required', 'additionalProperties', 'enum', 'format', 'const'];

	var data = function (metaSchema, keywordsJsonPointers) {
	  for (var i = 0; i < keywordsJsonPointers.length; i++) {
	    metaSchema = JSON.parse(JSON.stringify(metaSchema));
	    var segments = keywordsJsonPointers[i].split('/');
	    var keywords = metaSchema;
	    var j;

	    for (j = 1; j < segments.length; j++) keywords = keywords[segments[j]];

	    for (j = 0; j < KEYWORDS.length; j++) {
	      var key = KEYWORDS[j];
	      var schema = keywords[key];

	      if (schema) {
	        keywords[key] = {
	          anyOf: [schema, {
	            $ref: 'https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/data.json#'
	          }]
	        };
	      }
	    }
	  }

	  return metaSchema;
	};

	var MissingRefError = error_classes.MissingRef;
	var async = compileAsync;
	/**
	 * Creates validating function for passed schema with asynchronous loading of missing schemas.
	 * `loadSchema` option should be a function that accepts schema uri and returns promise that resolves with the schema.
	 * @this  Ajv
	 * @param {Object}   schema schema object
	 * @param {Boolean}  meta optional true to compile meta-schema; this parameter can be skipped
	 * @param {Function} callback an optional node-style callback, it is called with 2 parameters: error (or null) and validating function.
	 * @return {Promise} promise that resolves with a validating function.
	 */

	function compileAsync(schema, meta, callback) {
	  /* eslint no-shadow: 0 */

	  /* global Promise */

	  /* jshint validthis: true */
	  var self = this;
	  if (typeof this._opts.loadSchema != 'function') throw new Error('options.loadSchema should be a function');

	  if (typeof meta == 'function') {
	    callback = meta;
	    meta = undefined;
	  }

	  var p = loadMetaSchemaOf(schema).then(function () {
	    var schemaObj = self._addSchema(schema, undefined, meta);

	    return schemaObj.validate || _compileAsync(schemaObj);
	  });

	  if (callback) {
	    p.then(function (v) {
	      callback(null, v);
	    }, callback);
	  }

	  return p;

	  function loadMetaSchemaOf(sch) {
	    var $schema = sch.$schema;
	    return $schema && !self.getSchema($schema) ? compileAsync.call(self, {
	      $ref: $schema
	    }, true) : Promise.resolve();
	  }

	  function _compileAsync(schemaObj) {
	    try {
	      return self._compile(schemaObj);
	    } catch (e) {
	      if (e instanceof MissingRefError) return loadMissingSchema(e);
	      throw e;
	    }

	    function loadMissingSchema(e) {
	      var ref = e.missingSchema;
	      if (added(ref)) throw new Error('Schema ' + ref + ' is loaded but ' + e.missingRef + ' cannot be resolved');
	      var schemaPromise = self._loadingSchemas[ref];

	      if (!schemaPromise) {
	        schemaPromise = self._loadingSchemas[ref] = self._opts.loadSchema(ref);
	        schemaPromise.then(removePromise, removePromise);
	      }

	      return schemaPromise.then(function (sch) {
	        if (!added(ref)) {
	          return loadMetaSchemaOf(sch).then(function () {
	            if (!added(ref)) self.addSchema(sch, ref, undefined, meta);
	          });
	        }
	      }).then(function () {
	        return _compileAsync(schemaObj);
	      });

	      function removePromise() {
	        delete self._loadingSchemas[ref];
	      }

	      function added(ref) {
	        return self._refs[ref] || self._schemas[ref];
	      }
	    }
	  }
	}

	var custom = function generate_custom(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $errorKeyword;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $errs = 'errs__' + $lvl;
	  var $isData = it.opts.$data && $schema && $schema.$data,
	      $schemaValue;

	  if ($isData) {
	    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }

	  var $rule = this,
	      $definition = 'definition' + $lvl,
	      $rDef = $rule.definition,
	      $closingBraces = '';
	  var $compile, $inline, $macro, $ruleValidate, $validateCode;

	  if ($isData && $rDef.$data) {
	    $validateCode = 'keywordValidate' + $lvl;
	    var $validateSchema = $rDef.validateSchema;
	    out += ' var ' + $definition + ' = RULES.custom[\'' + $keyword + '\'].definition; var ' + $validateCode + ' = ' + $definition + '.validate;';
	  } else {
	    $ruleValidate = it.useCustomRule($rule, $schema, it.schema, it);
	    if (!$ruleValidate) return;
	    $schemaValue = 'validate.schema' + $schemaPath;
	    $validateCode = $ruleValidate.code;
	    $compile = $rDef.compile;
	    $inline = $rDef.inline;
	    $macro = $rDef.macro;
	  }

	  var $ruleErrs = $validateCode + '.errors',
	      $i = 'i' + $lvl,
	      $ruleErr = 'ruleErr' + $lvl,
	      $asyncKeyword = $rDef.async;
	  if ($asyncKeyword && !it.async) throw new Error('async keyword in sync schema');

	  if (!($inline || $macro)) {
	    out += '' + $ruleErrs + ' = null;';
	  }

	  out += 'var ' + $errs + ' = errors;var ' + $valid + ';';

	  if ($isData && $rDef.$data) {
	    $closingBraces += '}';
	    out += ' if (' + $schemaValue + ' === undefined) { ' + $valid + ' = true; } else { ';

	    if ($validateSchema) {
	      $closingBraces += '}';
	      out += ' ' + $valid + ' = ' + $definition + '.validateSchema(' + $schemaValue + '); if (' + $valid + ') { ';
	    }
	  }

	  if ($inline) {
	    if ($rDef.statements) {
	      out += ' ' + $ruleValidate.validate + ' ';
	    } else {
	      out += ' ' + $valid + ' = ' + $ruleValidate.validate + '; ';
	    }
	  } else if ($macro) {
	    var $it = it.util.copy(it);
	    var $closingBraces = '';
	    $it.level++;
	    var $nextValid = 'valid' + $it.level;
	    $it.schema = $ruleValidate.validate;
	    $it.schemaPath = '';
	    var $wasComposite = it.compositeRule;
	    it.compositeRule = $it.compositeRule = true;
	    var $code = it.validate($it).replace(/validate\.schema/g, $validateCode);
	    it.compositeRule = $it.compositeRule = $wasComposite;
	    out += ' ' + $code;
	  } else {
	    var $$outStack = $$outStack || [];
	    $$outStack.push(out);
	    out = '';
	    out += '  ' + $validateCode + '.call( ';

	    if (it.opts.passContext) {
	      out += 'this';
	    } else {
	      out += 'self';
	    }

	    if ($compile || $rDef.schema === false) {
	      out += ' , ' + $data + ' ';
	    } else {
	      out += ' , ' + $schemaValue + ' , ' + $data + ' , validate.schema' + it.schemaPath + ' ';
	    }

	    out += ' , (dataPath || \'\')';

	    if (it.errorPath != '""') {
	      out += ' + ' + it.errorPath;
	    }

	    var $parentData = $dataLvl ? 'data' + ($dataLvl - 1 || '') : 'parentData',
	        $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
	    out += ' , ' + $parentData + ' , ' + $parentDataProperty + ' , rootData )  ';
	    var def_callRuleValidate = out;
	    out = $$outStack.pop();

	    if ($rDef.errors === false) {
	      out += ' ' + $valid + ' = ';

	      if ($asyncKeyword) {
	        out += 'await ';
	      }

	      out += '' + def_callRuleValidate + '; ';
	    } else {
	      if ($asyncKeyword) {
	        $ruleErrs = 'customErrors' + $lvl;
	        out += ' var ' + $ruleErrs + ' = null; try { ' + $valid + ' = await ' + def_callRuleValidate + '; } catch (e) { ' + $valid + ' = false; if (e instanceof ValidationError) ' + $ruleErrs + ' = e.errors; else throw e; } ';
	      } else {
	        out += ' ' + $ruleErrs + ' = null; ' + $valid + ' = ' + def_callRuleValidate + '; ';
	      }
	    }
	  }

	  if ($rDef.modifying) {
	    out += ' if (' + $parentData + ') ' + $data + ' = ' + $parentData + '[' + $parentDataProperty + '];';
	  }

	  out += '' + $closingBraces;

	  if ($rDef.valid) {
	    if ($breakOnError) {
	      out += ' if (true) { ';
	    }
	  } else {
	    out += ' if ( ';

	    if ($rDef.valid === undefined) {
	      out += ' !';

	      if ($macro) {
	        out += '' + $nextValid;
	      } else {
	        out += '' + $valid;
	      }
	    } else {
	      out += ' ' + !$rDef.valid + ' ';
	    }

	    out += ') { ';
	    $errorKeyword = $rule.keyword;
	    var $$outStack = $$outStack || [];
	    $$outStack.push(out);
	    out = '';
	    var $$outStack = $$outStack || [];
	    $$outStack.push(out);
	    out = '';
	    /* istanbul ignore else */

	    if (it.createErrors !== false) {
	      out += ' { keyword: \'' + ($errorKeyword || 'custom') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { keyword: \'' + $rule.keyword + '\' } ';

	      if (it.opts.messages !== false) {
	        out += ' , message: \'should pass "' + $rule.keyword + '" keyword validation\' ';
	      }

	      if (it.opts.verbose) {
	        out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	      }

	      out += ' } ';
	    } else {
	      out += ' {} ';
	    }

	    var __err = out;
	    out = $$outStack.pop();

	    if (!it.compositeRule && $breakOnError) {
	      /* istanbul ignore if */
	      if (it.async) {
	        out += ' throw new ValidationError([' + __err + ']); ';
	      } else {
	        out += ' validate.errors = [' + __err + ']; return false; ';
	      }
	    } else {
	      out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	    }

	    var def_customError = out;
	    out = $$outStack.pop();

	    if ($inline) {
	      if ($rDef.errors) {
	        if ($rDef.errors != 'full') {
	          out += '  for (var ' + $i + '=' + $errs + '; ' + $i + '<errors; ' + $i + '++) { var ' + $ruleErr + ' = vErrors[' + $i + ']; if (' + $ruleErr + '.dataPath === undefined) ' + $ruleErr + '.dataPath = (dataPath || \'\') + ' + it.errorPath + '; if (' + $ruleErr + '.schemaPath === undefined) { ' + $ruleErr + '.schemaPath = "' + $errSchemaPath + '"; } ';

	          if (it.opts.verbose) {
	            out += ' ' + $ruleErr + '.schema = ' + $schemaValue + '; ' + $ruleErr + '.data = ' + $data + '; ';
	          }

	          out += ' } ';
	        }
	      } else {
	        if ($rDef.errors === false) {
	          out += ' ' + def_customError + ' ';
	        } else {
	          out += ' if (' + $errs + ' == errors) { ' + def_customError + ' } else {  for (var ' + $i + '=' + $errs + '; ' + $i + '<errors; ' + $i + '++) { var ' + $ruleErr + ' = vErrors[' + $i + ']; if (' + $ruleErr + '.dataPath === undefined) ' + $ruleErr + '.dataPath = (dataPath || \'\') + ' + it.errorPath + '; if (' + $ruleErr + '.schemaPath === undefined) { ' + $ruleErr + '.schemaPath = "' + $errSchemaPath + '"; } ';

	          if (it.opts.verbose) {
	            out += ' ' + $ruleErr + '.schema = ' + $schemaValue + '; ' + $ruleErr + '.data = ' + $data + '; ';
	          }

	          out += ' } } ';
	        }
	      }
	    } else if ($macro) {
	      out += '   var err =   ';
	      /* istanbul ignore else */

	      if (it.createErrors !== false) {
	        out += ' { keyword: \'' + ($errorKeyword || 'custom') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { keyword: \'' + $rule.keyword + '\' } ';

	        if (it.opts.messages !== false) {
	          out += ' , message: \'should pass "' + $rule.keyword + '" keyword validation\' ';
	        }

	        if (it.opts.verbose) {
	          out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
	        }

	        out += ' } ';
	      } else {
	        out += ' {} ';
	      }

	      out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';

	      if (!it.compositeRule && $breakOnError) {
	        /* istanbul ignore if */
	        if (it.async) {
	          out += ' throw new ValidationError(vErrors); ';
	        } else {
	          out += ' validate.errors = vErrors; return false; ';
	        }
	      }
	    } else {
	      if ($rDef.errors === false) {
	        out += ' ' + def_customError + ' ';
	      } else {
	        out += ' if (Array.isArray(' + $ruleErrs + ')) { if (vErrors === null) vErrors = ' + $ruleErrs + '; else vErrors = vErrors.concat(' + $ruleErrs + '); errors = vErrors.length;  for (var ' + $i + '=' + $errs + '; ' + $i + '<errors; ' + $i + '++) { var ' + $ruleErr + ' = vErrors[' + $i + ']; if (' + $ruleErr + '.dataPath === undefined) ' + $ruleErr + '.dataPath = (dataPath || \'\') + ' + it.errorPath + ';  ' + $ruleErr + '.schemaPath = "' + $errSchemaPath + '";  ';

	        if (it.opts.verbose) {
	          out += ' ' + $ruleErr + '.schema = ' + $schemaValue + '; ' + $ruleErr + '.data = ' + $data + '; ';
	        }

	        out += ' } } else { ' + def_customError + ' } ';
	      }
	    }

	    out += ' } ';

	    if ($breakOnError) {
	      out += ' else { ';
	    }
	  }

	  return out;
	};

	var $schema$1 = "http://json-schema.org/draft-07/schema#";
	var $id$1 = "http://json-schema.org/draft-07/schema#";
	var title = "Core schema meta-schema";
	var definitions = {
		schemaArray: {
			type: "array",
			minItems: 1,
			items: {
				$ref: "#"
			}
		},
		nonNegativeInteger: {
			type: "integer",
			minimum: 0
		},
		nonNegativeIntegerDefault0: {
			allOf: [
				{
					$ref: "#/definitions/nonNegativeInteger"
				},
				{
					"default": 0
				}
			]
		},
		simpleTypes: {
			"enum": [
				"array",
				"boolean",
				"integer",
				"null",
				"number",
				"object",
				"string"
			]
		},
		stringArray: {
			type: "array",
			items: {
				type: "string"
			},
			uniqueItems: true,
			"default": [
			]
		}
	};
	var type$1 = [
		"object",
		"boolean"
	];
	var properties$1 = {
		$id: {
			type: "string",
			format: "uri-reference"
		},
		$schema: {
			type: "string",
			format: "uri"
		},
		$ref: {
			type: "string",
			format: "uri-reference"
		},
		$comment: {
			type: "string"
		},
		title: {
			type: "string"
		},
		description: {
			type: "string"
		},
		"default": true,
		readOnly: {
			type: "boolean",
			"default": false
		},
		examples: {
			type: "array",
			items: true
		},
		multipleOf: {
			type: "number",
			exclusiveMinimum: 0
		},
		maximum: {
			type: "number"
		},
		exclusiveMaximum: {
			type: "number"
		},
		minimum: {
			type: "number"
		},
		exclusiveMinimum: {
			type: "number"
		},
		maxLength: {
			$ref: "#/definitions/nonNegativeInteger"
		},
		minLength: {
			$ref: "#/definitions/nonNegativeIntegerDefault0"
		},
		pattern: {
			type: "string",
			format: "regex"
		},
		additionalItems: {
			$ref: "#"
		},
		items: {
			anyOf: [
				{
					$ref: "#"
				},
				{
					$ref: "#/definitions/schemaArray"
				}
			],
			"default": true
		},
		maxItems: {
			$ref: "#/definitions/nonNegativeInteger"
		},
		minItems: {
			$ref: "#/definitions/nonNegativeIntegerDefault0"
		},
		uniqueItems: {
			type: "boolean",
			"default": false
		},
		contains: {
			$ref: "#"
		},
		maxProperties: {
			$ref: "#/definitions/nonNegativeInteger"
		},
		minProperties: {
			$ref: "#/definitions/nonNegativeIntegerDefault0"
		},
		required: {
			$ref: "#/definitions/stringArray"
		},
		additionalProperties: {
			$ref: "#"
		},
		definitions: {
			type: "object",
			additionalProperties: {
				$ref: "#"
			},
			"default": {
			}
		},
		properties: {
			type: "object",
			additionalProperties: {
				$ref: "#"
			},
			"default": {
			}
		},
		patternProperties: {
			type: "object",
			additionalProperties: {
				$ref: "#"
			},
			propertyNames: {
				format: "regex"
			},
			"default": {
			}
		},
		dependencies: {
			type: "object",
			additionalProperties: {
				anyOf: [
					{
						$ref: "#"
					},
					{
						$ref: "#/definitions/stringArray"
					}
				]
			}
		},
		propertyNames: {
			$ref: "#"
		},
		"const": true,
		"enum": {
			type: "array",
			items: true,
			minItems: 1,
			uniqueItems: true
		},
		type: {
			anyOf: [
				{
					$ref: "#/definitions/simpleTypes"
				},
				{
					type: "array",
					items: {
						$ref: "#/definitions/simpleTypes"
					},
					minItems: 1,
					uniqueItems: true
				}
			]
		},
		format: {
			type: "string"
		},
		contentMediaType: {
			type: "string"
		},
		contentEncoding: {
			type: "string"
		},
		"if": {
			$ref: "#"
		},
		then: {
			$ref: "#"
		},
		"else": {
			$ref: "#"
		},
		allOf: {
			$ref: "#/definitions/schemaArray"
		},
		anyOf: {
			$ref: "#/definitions/schemaArray"
		},
		oneOf: {
			$ref: "#/definitions/schemaArray"
		},
		not: {
			$ref: "#"
		}
	};
	var require$$13 = {
		$schema: $schema$1,
		$id: $id$1,
		title: title,
		definitions: definitions,
		type: type$1,
		properties: properties$1,
		"default": true
	};

	var metaSchema = require$$13;
	var definition_schema = {
	  $id: 'https://github.com/epoberezkin/ajv/blob/master/lib/definition_schema.js',
	  definitions: {
	    simpleTypes: metaSchema.definitions.simpleTypes
	  },
	  type: 'object',
	  dependencies: {
	    schema: ['validate'],
	    $data: ['validate'],
	    statements: ['inline'],
	    valid: {
	      not: {
	        required: ['macro']
	      }
	    }
	  },
	  properties: {
	    type: metaSchema.properties.type,
	    schema: {
	      type: 'boolean'
	    },
	    statements: {
	      type: 'boolean'
	    },
	    dependencies: {
	      type: 'array',
	      items: {
	        type: 'string'
	      }
	    },
	    metaSchema: {
	      type: 'object'
	    },
	    modifying: {
	      type: 'boolean'
	    },
	    valid: {
	      type: 'boolean'
	    },
	    $data: {
	      type: 'boolean'
	    },
	    async: {
	      type: 'boolean'
	    },
	    errors: {
	      anyOf: [{
	        type: 'boolean'
	      }, {
	        const: 'full'
	      }]
	    }
	  }
	};

	var IDENTIFIER = /^[a-z_$][a-z0-9_$-]*$/i;
	var customRuleCode = custom;
	var definitionSchema = definition_schema;
	var keyword = {
	  add: addKeyword,
	  get: getKeyword,
	  remove: removeKeyword,
	  validate: validateKeyword
	};
	/**
	 * Define custom keyword
	 * @this  Ajv
	 * @param {String} keyword custom keyword, should be unique (including different from all standard, custom and macro keywords).
	 * @param {Object} definition keyword definition object with properties `type` (type(s) which the keyword applies to), `validate` or `compile`.
	 * @return {Ajv} this for method chaining
	 */

	function addKeyword(keyword, definition) {
	  /* jshint validthis: true */

	  /* eslint no-shadow: 0 */
	  var RULES = this.RULES;
	  if (RULES.keywords[keyword]) throw new Error('Keyword ' + keyword + ' is already defined');
	  if (!IDENTIFIER.test(keyword)) throw new Error('Keyword ' + keyword + ' is not a valid identifier');

	  if (definition) {
	    this.validateKeyword(definition, true);
	    var dataType = definition.type;

	    if (Array.isArray(dataType)) {
	      for (var i = 0; i < dataType.length; i++) _addRule(keyword, dataType[i], definition);
	    } else {
	      _addRule(keyword, dataType, definition);
	    }

	    var metaSchema = definition.metaSchema;

	    if (metaSchema) {
	      if (definition.$data && this._opts.$data) {
	        metaSchema = {
	          anyOf: [metaSchema, {
	            '$ref': 'https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/data.json#'
	          }]
	        };
	      }

	      definition.validateSchema = this.compile(metaSchema, true);
	    }
	  }

	  RULES.keywords[keyword] = RULES.all[keyword] = true;

	  function _addRule(keyword, dataType, definition) {
	    var ruleGroup;

	    for (var i = 0; i < RULES.length; i++) {
	      var rg = RULES[i];

	      if (rg.type == dataType) {
	        ruleGroup = rg;
	        break;
	      }
	    }

	    if (!ruleGroup) {
	      ruleGroup = {
	        type: dataType,
	        rules: []
	      };
	      RULES.push(ruleGroup);
	    }

	    var rule = {
	      keyword: keyword,
	      definition: definition,
	      custom: true,
	      code: customRuleCode,
	      implements: definition.implements
	    };
	    ruleGroup.rules.push(rule);
	    RULES.custom[keyword] = rule;
	  }

	  return this;
	}
	/**
	 * Get keyword
	 * @this  Ajv
	 * @param {String} keyword pre-defined or custom keyword.
	 * @return {Object|Boolean} custom keyword definition, `true` if it is a predefined keyword, `false` otherwise.
	 */


	function getKeyword(keyword) {
	  /* jshint validthis: true */
	  var rule = this.RULES.custom[keyword];
	  return rule ? rule.definition : this.RULES.keywords[keyword] || false;
	}
	/**
	 * Remove keyword
	 * @this  Ajv
	 * @param {String} keyword pre-defined or custom keyword.
	 * @return {Ajv} this for method chaining
	 */


	function removeKeyword(keyword) {
	  /* jshint validthis: true */
	  var RULES = this.RULES;
	  delete RULES.keywords[keyword];
	  delete RULES.all[keyword];
	  delete RULES.custom[keyword];

	  for (var i = 0; i < RULES.length; i++) {
	    var rules = RULES[i].rules;

	    for (var j = 0; j < rules.length; j++) {
	      if (rules[j].keyword == keyword) {
	        rules.splice(j, 1);
	        break;
	      }
	    }
	  }

	  return this;
	}
	/**
	 * Validate keyword definition
	 * @this  Ajv
	 * @param {Object} definition keyword definition object.
	 * @param {Boolean} throwError true to throw exception if definition is invalid
	 * @return {boolean} validation result
	 */


	function validateKeyword(definition, throwError) {
	  validateKeyword.errors = null;
	  var v = this._validateKeyword = this._validateKeyword || this.compile(definitionSchema, true);
	  if (v(definition)) return true;
	  validateKeyword.errors = v.errors;
	  if (throwError) throw new Error('custom keyword definition is invalid: ' + this.errorsText(v.errors));else return false;
	}

	var $schema = "http://json-schema.org/draft-07/schema#";
	var $id = "https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/data.json#";
	var description = "Meta-schema for $data reference (JSON Schema extension proposal)";
	var type = "object";
	var required = [
		"$data"
	];
	var properties = {
		$data: {
			type: "string",
			anyOf: [
				{
					format: "relative-json-pointer"
				},
				{
					format: "json-pointer"
				}
			]
		}
	};
	var additionalProperties = false;
	var require$$12 = {
		$schema: $schema,
		$id: $id,
		description: description,
		type: type,
		required: required,
		properties: properties,
		additionalProperties: additionalProperties
	};

	var compileSchema = compile_1,
	    resolve = resolve_1,
	    Cache = cache.exports,
	    SchemaObject = schema_obj,
	    stableStringify = fastJsonStableStringify,
	    formats = formats_1,
	    rules = rules$1,
	    $dataMetaSchema = data,
	    util = util$5;
	var ajv = Ajv;
	Ajv.prototype.validate = validate;
	Ajv.prototype.compile = compile;
	Ajv.prototype.addSchema = addSchema;
	Ajv.prototype.addMetaSchema = addMetaSchema;
	Ajv.prototype.validateSchema = validateSchema;
	Ajv.prototype.getSchema = getSchema;
	Ajv.prototype.removeSchema = removeSchema;
	Ajv.prototype.addFormat = addFormat;
	Ajv.prototype.errorsText = errorsText;
	Ajv.prototype._addSchema = _addSchema;
	Ajv.prototype._compile = _compile;
	Ajv.prototype.compileAsync = async;
	var customKeyword = keyword;
	Ajv.prototype.addKeyword = customKeyword.add;
	Ajv.prototype.getKeyword = customKeyword.get;
	Ajv.prototype.removeKeyword = customKeyword.remove;
	Ajv.prototype.validateKeyword = customKeyword.validate;
	var errorClasses = error_classes;
	Ajv.ValidationError = errorClasses.Validation;
	Ajv.MissingRefError = errorClasses.MissingRef;
	Ajv.$dataMetaSchema = $dataMetaSchema;
	var META_SCHEMA_ID = 'http://json-schema.org/draft-07/schema';
	var META_IGNORE_OPTIONS = ['removeAdditional', 'useDefaults', 'coerceTypes', 'strictDefaults'];
	var META_SUPPORT_DATA = ['/properties'];
	/**
	 * Creates validator instance.
	 * Usage: `Ajv(opts)`
	 * @param {Object} opts optional options
	 * @return {Object} ajv instance
	 */

	function Ajv(opts) {
	  if (!(this instanceof Ajv)) return new Ajv(opts);
	  opts = this._opts = util.copy(opts) || {};
	  setLogger(this);
	  this._schemas = {};
	  this._refs = {};
	  this._fragments = {};
	  this._formats = formats(opts.format);
	  this._cache = opts.cache || new Cache();
	  this._loadingSchemas = {};
	  this._compilations = [];
	  this.RULES = rules();
	  this._getId = chooseGetId(opts);
	  opts.loopRequired = opts.loopRequired || Infinity;
	  if (opts.errorDataPath == 'property') opts._errorDataPathProperty = true;
	  if (opts.serialize === undefined) opts.serialize = stableStringify;
	  this._metaOpts = getMetaSchemaOptions(this);
	  if (opts.formats) addInitialFormats(this);
	  if (opts.keywords) addInitialKeywords(this);
	  addDefaultMetaSchema(this);
	  if (typeof opts.meta == 'object') this.addMetaSchema(opts.meta);
	  if (opts.nullable) this.addKeyword('nullable', {
	    metaSchema: {
	      type: 'boolean'
	    }
	  });
	  addInitialSchemas(this);
	}
	/**
	 * Validate data using schema
	 * Schema will be compiled and cached (using serialized JSON as key. [fast-json-stable-stringify](https://github.com/epoberezkin/fast-json-stable-stringify) is used to serialize.
	 * @this   Ajv
	 * @param  {String|Object} schemaKeyRef key, ref or schema object
	 * @param  {Any} data to be validated
	 * @return {Boolean} validation result. Errors from the last validation will be available in `ajv.errors` (and also in compiled schema: `schema.errors`).
	 */


	function validate(schemaKeyRef, data) {
	  var v;

	  if (typeof schemaKeyRef == 'string') {
	    v = this.getSchema(schemaKeyRef);
	    if (!v) throw new Error('no schema with key or ref "' + schemaKeyRef + '"');
	  } else {
	    var schemaObj = this._addSchema(schemaKeyRef);

	    v = schemaObj.validate || this._compile(schemaObj);
	  }

	  var valid = v(data);
	  if (v.$async !== true) this.errors = v.errors;
	  return valid;
	}
	/**
	 * Create validating function for passed schema.
	 * @this   Ajv
	 * @param  {Object} schema schema object
	 * @param  {Boolean} _meta true if schema is a meta-schema. Used internally to compile meta schemas of custom keywords.
	 * @return {Function} validating function
	 */


	function compile(schema, _meta) {
	  var schemaObj = this._addSchema(schema, undefined, _meta);

	  return schemaObj.validate || this._compile(schemaObj);
	}
	/**
	 * Adds schema to the instance.
	 * @this   Ajv
	 * @param {Object|Array} schema schema or array of schemas. If array is passed, `key` and other parameters will be ignored.
	 * @param {String} key Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
	 * @param {Boolean} _skipValidation true to skip schema validation. Used internally, option validateSchema should be used instead.
	 * @param {Boolean} _meta true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
	 * @return {Ajv} this for method chaining
	 */


	function addSchema(schema, key, _skipValidation, _meta) {
	  if (Array.isArray(schema)) {
	    for (var i = 0; i < schema.length; i++) this.addSchema(schema[i], undefined, _skipValidation, _meta);

	    return this;
	  }

	  var id = this._getId(schema);

	  if (id !== undefined && typeof id != 'string') throw new Error('schema id must be string');
	  key = resolve.normalizeId(key || id);
	  checkUnique(this, key);
	  this._schemas[key] = this._addSchema(schema, _skipValidation, _meta, true);
	  return this;
	}
	/**
	 * Add schema that will be used to validate other schemas
	 * options in META_IGNORE_OPTIONS are alway set to false
	 * @this   Ajv
	 * @param {Object} schema schema object
	 * @param {String} key optional schema key
	 * @param {Boolean} skipValidation true to skip schema validation, can be used to override validateSchema option for meta-schema
	 * @return {Ajv} this for method chaining
	 */


	function addMetaSchema(schema, key, skipValidation) {
	  this.addSchema(schema, key, skipValidation, true);
	  return this;
	}
	/**
	 * Validate schema
	 * @this   Ajv
	 * @param {Object} schema schema to validate
	 * @param {Boolean} throwOrLogError pass true to throw (or log) an error if invalid
	 * @return {Boolean} true if schema is valid
	 */


	function validateSchema(schema, throwOrLogError) {
	  var $schema = schema.$schema;
	  if ($schema !== undefined && typeof $schema != 'string') throw new Error('$schema must be a string');
	  $schema = $schema || this._opts.defaultMeta || defaultMeta(this);

	  if (!$schema) {
	    this.logger.warn('meta-schema not available');
	    this.errors = null;
	    return true;
	  }

	  var valid = this.validate($schema, schema);

	  if (!valid && throwOrLogError) {
	    var message = 'schema is invalid: ' + this.errorsText();
	    if (this._opts.validateSchema == 'log') this.logger.error(message);else throw new Error(message);
	  }

	  return valid;
	}

	function defaultMeta(self) {
	  var meta = self._opts.meta;
	  self._opts.defaultMeta = typeof meta == 'object' ? self._getId(meta) || meta : self.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined;
	  return self._opts.defaultMeta;
	}
	/**
	 * Get compiled schema from the instance by `key` or `ref`.
	 * @this   Ajv
	 * @param  {String} keyRef `key` that was passed to `addSchema` or full schema reference (`schema.id` or resolved id).
	 * @return {Function} schema validating function (with property `schema`).
	 */


	function getSchema(keyRef) {
	  var schemaObj = _getSchemaObj(this, keyRef);

	  switch (typeof schemaObj) {
	    case 'object':
	      return schemaObj.validate || this._compile(schemaObj);

	    case 'string':
	      return this.getSchema(schemaObj);

	    case 'undefined':
	      return _getSchemaFragment(this, keyRef);
	  }
	}

	function _getSchemaFragment(self, ref) {
	  var res = resolve.schema.call(self, {
	    schema: {}
	  }, ref);

	  if (res) {
	    var schema = res.schema,
	        root = res.root,
	        baseId = res.baseId;
	    var v = compileSchema.call(self, schema, root, undefined, baseId);
	    self._fragments[ref] = new SchemaObject({
	      ref: ref,
	      fragment: true,
	      schema: schema,
	      root: root,
	      baseId: baseId,
	      validate: v
	    });
	    return v;
	  }
	}

	function _getSchemaObj(self, keyRef) {
	  keyRef = resolve.normalizeId(keyRef);
	  return self._schemas[keyRef] || self._refs[keyRef] || self._fragments[keyRef];
	}
	/**
	 * Remove cached schema(s).
	 * If no parameter is passed all schemas but meta-schemas are removed.
	 * If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
	 * Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
	 * @this   Ajv
	 * @param  {String|Object|RegExp} schemaKeyRef key, ref, pattern to match key/ref or schema object
	 * @return {Ajv} this for method chaining
	 */


	function removeSchema(schemaKeyRef) {
	  if (schemaKeyRef instanceof RegExp) {
	    _removeAllSchemas(this, this._schemas, schemaKeyRef);

	    _removeAllSchemas(this, this._refs, schemaKeyRef);

	    return this;
	  }

	  switch (typeof schemaKeyRef) {
	    case 'undefined':
	      _removeAllSchemas(this, this._schemas);

	      _removeAllSchemas(this, this._refs);

	      this._cache.clear();

	      return this;

	    case 'string':
	      var schemaObj = _getSchemaObj(this, schemaKeyRef);

	      if (schemaObj) this._cache.del(schemaObj.cacheKey);
	      delete this._schemas[schemaKeyRef];
	      delete this._refs[schemaKeyRef];
	      return this;

	    case 'object':
	      var serialize = this._opts.serialize;
	      var cacheKey = serialize ? serialize(schemaKeyRef) : schemaKeyRef;

	      this._cache.del(cacheKey);

	      var id = this._getId(schemaKeyRef);

	      if (id) {
	        id = resolve.normalizeId(id);
	        delete this._schemas[id];
	        delete this._refs[id];
	      }

	  }

	  return this;
	}

	function _removeAllSchemas(self, schemas, regex) {
	  for (var keyRef in schemas) {
	    var schemaObj = schemas[keyRef];

	    if (!schemaObj.meta && (!regex || regex.test(keyRef))) {
	      self._cache.del(schemaObj.cacheKey);

	      delete schemas[keyRef];
	    }
	  }
	}
	/* @this   Ajv */


	function _addSchema(schema, skipValidation, meta, shouldAddSchema) {
	  if (typeof schema != 'object' && typeof schema != 'boolean') throw new Error('schema should be object or boolean');
	  var serialize = this._opts.serialize;
	  var cacheKey = serialize ? serialize(schema) : schema;

	  var cached = this._cache.get(cacheKey);

	  if (cached) return cached;
	  shouldAddSchema = shouldAddSchema || this._opts.addUsedSchema !== false;
	  var id = resolve.normalizeId(this._getId(schema));
	  if (id && shouldAddSchema) checkUnique(this, id);
	  var willValidate = this._opts.validateSchema !== false && !skipValidation;
	  var recursiveMeta;
	  if (willValidate && !(recursiveMeta = id && id == resolve.normalizeId(schema.$schema))) this.validateSchema(schema, true);
	  var localRefs = resolve.ids.call(this, schema);
	  var schemaObj = new SchemaObject({
	    id: id,
	    schema: schema,
	    localRefs: localRefs,
	    cacheKey: cacheKey,
	    meta: meta
	  });
	  if (id[0] != '#' && shouldAddSchema) this._refs[id] = schemaObj;

	  this._cache.put(cacheKey, schemaObj);

	  if (willValidate && recursiveMeta) this.validateSchema(schema, true);
	  return schemaObj;
	}
	/* @this   Ajv */


	function _compile(schemaObj, root) {
	  if (schemaObj.compiling) {
	    schemaObj.validate = callValidate;
	    callValidate.schema = schemaObj.schema;
	    callValidate.errors = null;
	    callValidate.root = root ? root : callValidate;
	    if (schemaObj.schema.$async === true) callValidate.$async = true;
	    return callValidate;
	  }

	  schemaObj.compiling = true;
	  var currentOpts;

	  if (schemaObj.meta) {
	    currentOpts = this._opts;
	    this._opts = this._metaOpts;
	  }

	  var v;

	  try {
	    v = compileSchema.call(this, schemaObj.schema, root, schemaObj.localRefs);
	  } catch (e) {
	    delete schemaObj.validate;
	    throw e;
	  } finally {
	    schemaObj.compiling = false;
	    if (schemaObj.meta) this._opts = currentOpts;
	  }

	  schemaObj.validate = v;
	  schemaObj.refs = v.refs;
	  schemaObj.refVal = v.refVal;
	  schemaObj.root = v.root;
	  return v;
	  /* @this   {*} - custom context, see passContext option */

	  function callValidate() {
	    /* jshint validthis: true */
	    var _validate = schemaObj.validate;

	    var result = _validate.apply(this, arguments);

	    callValidate.errors = _validate.errors;
	    return result;
	  }
	}

	function chooseGetId(opts) {
	  switch (opts.schemaId) {
	    case 'auto':
	      return _get$IdOrId;

	    case 'id':
	      return _getId;

	    default:
	      return _get$Id;
	  }
	}
	/* @this   Ajv */


	function _getId(schema) {
	  if (schema.$id) this.logger.warn('schema $id ignored', schema.$id);
	  return schema.id;
	}
	/* @this   Ajv */


	function _get$Id(schema) {
	  if (schema.id) this.logger.warn('schema id ignored', schema.id);
	  return schema.$id;
	}

	function _get$IdOrId(schema) {
	  if (schema.$id && schema.id && schema.$id != schema.id) throw new Error('schema $id is different from id');
	  return schema.$id || schema.id;
	}
	/**
	 * Convert array of error message objects to string
	 * @this   Ajv
	 * @param  {Array<Object>} errors optional array of validation errors, if not passed errors from the instance are used.
	 * @param  {Object} options optional options with properties `separator` and `dataVar`.
	 * @return {String} human readable string with all errors descriptions
	 */


	function errorsText(errors, options) {
	  errors = errors || this.errors;
	  if (!errors) return 'No errors';
	  options = options || {};
	  var separator = options.separator === undefined ? ', ' : options.separator;
	  var dataVar = options.dataVar === undefined ? 'data' : options.dataVar;
	  var text = '';

	  for (var i = 0; i < errors.length; i++) {
	    var e = errors[i];
	    if (e) text += dataVar + e.dataPath + ' ' + e.message + separator;
	  }

	  return text.slice(0, -separator.length);
	}
	/**
	 * Add custom format
	 * @this   Ajv
	 * @param {String} name format name
	 * @param {String|RegExp|Function} format string is converted to RegExp; function should return boolean (true when valid)
	 * @return {Ajv} this for method chaining
	 */


	function addFormat(name, format) {
	  if (typeof format == 'string') format = new RegExp(format);
	  this._formats[name] = format;
	  return this;
	}

	function addDefaultMetaSchema(self) {
	  var $dataSchema;

	  if (self._opts.$data) {
	    $dataSchema = require$$12;
	    self.addMetaSchema($dataSchema, $dataSchema.$id, true);
	  }

	  if (self._opts.meta === false) return;
	  var metaSchema = require$$13;
	  if (self._opts.$data) metaSchema = $dataMetaSchema(metaSchema, META_SUPPORT_DATA);
	  self.addMetaSchema(metaSchema, META_SCHEMA_ID, true);
	  self._refs['http://json-schema.org/schema'] = META_SCHEMA_ID;
	}

	function addInitialSchemas(self) {
	  var optsSchemas = self._opts.schemas;
	  if (!optsSchemas) return;
	  if (Array.isArray(optsSchemas)) self.addSchema(optsSchemas);else for (var key in optsSchemas) self.addSchema(optsSchemas[key], key);
	}

	function addInitialFormats(self) {
	  for (var name in self._opts.formats) {
	    var format = self._opts.formats[name];
	    self.addFormat(name, format);
	  }
	}

	function addInitialKeywords(self) {
	  for (var name in self._opts.keywords) {
	    var keyword = self._opts.keywords[name];
	    self.addKeyword(name, keyword);
	  }
	}

	function checkUnique(self, id) {
	  if (self._schemas[id] || self._refs[id]) throw new Error('schema with key or id "' + id + '" already exists');
	}

	function getMetaSchemaOptions(self) {
	  var metaOpts = util.copy(self._opts);

	  for (var i = 0; i < META_IGNORE_OPTIONS.length; i++) delete metaOpts[META_IGNORE_OPTIONS[i]];

	  return metaOpts;
	}

	function setLogger(self) {
	  var logger = self._opts.logger;

	  if (logger === false) {
	    self.logger = {
	      log: noop,
	      warn: noop,
	      error: noop
	    };
	  } else {
	    if (logger === undefined) logger = console;
	    if (!(typeof logger == 'object' && logger.log && logger.warn && logger.error)) throw new Error('logger must implement log, warn and error methods');
	    self.logger = logger;
	  }
	}

	function noop() {}

	/** Detect free variable `global` from Node.js. */
	var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
	var _freeGlobal = freeGlobal$1;

	var freeGlobal = _freeGlobal;
	/** Detect free variable `self`. */

	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	/** Used as a reference to the global object. */

	var root$3 = freeGlobal || freeSelf || Function('return this')();
	var _root = root$3;

	var root$2 = _root;
	/** Built-in value references. */

	var Symbol$4 = root$2.Symbol;
	var _Symbol = Symbol$4;

	var Symbol$3 = _Symbol;
	/** Used for built-in method references. */

	var objectProto$5 = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var nativeObjectToString$1 = objectProto$5.toString;
	/** Built-in value references. */

	var symToStringTag$1 = Symbol$3 ? Symbol$3.toStringTag : undefined;
	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */

	function getRawTag$1(value) {
	  var isOwn = hasOwnProperty$4.call(value, symToStringTag$1),
	      tag = value[symToStringTag$1];

	  try {
	    value[symToStringTag$1] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString$1.call(value);

	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag$1] = tag;
	    } else {
	      delete value[symToStringTag$1];
	    }
	  }

	  return result;
	}

	var _getRawTag = getRawTag$1;

	/** Used for built-in method references. */
	var objectProto$4 = Object.prototype;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var nativeObjectToString = objectProto$4.toString;
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */

	function objectToString$1(value) {
	  return nativeObjectToString.call(value);
	}

	var _objectToString = objectToString$1;

	var Symbol$2 = _Symbol,
	    getRawTag = _getRawTag,
	    objectToString = _objectToString;
	/** `Object#toString` result references. */

	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';
	/** Built-in value references. */

	var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;
	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */

	function baseGetTag$2(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }

	  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
	}

	var _baseGetTag = baseGetTag$2;

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */

	function isObject$5(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	var isObject_1 = isObject$5;

	var baseGetTag$1 = _baseGetTag,
	    isObject$4 = isObject_1;
	/** `Object#toString` result references. */

	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */

	function isFunction$1(value) {
	  if (!isObject$4(value)) {
	    return false;
	  } // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.


	  var tag = baseGetTag$1(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	var isFunction_1 = isFunction$1;

	var root$1 = _root;
	/** Used to detect overreaching core-js shims. */

	var coreJsData$1 = root$1['__core-js_shared__'];
	var _coreJsData = coreJsData$1;

	var coreJsData = _coreJsData;
	/** Used to detect methods masquerading as native. */

	var maskSrcKey = function () {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? 'Symbol(src)_1.' + uid : '';
	}();
	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */


	function isMasked$1(func) {
	  return !!maskSrcKey && maskSrcKey in func;
	}

	var _isMasked = isMasked$1;

	/** Used for built-in method references. */
	var funcProto$1 = Function.prototype;
	/** Used to resolve the decompiled source of functions. */

	var funcToString$1 = funcProto$1.toString;
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */

	function toSource$1(func) {
	  if (func != null) {
	    try {
	      return funcToString$1.call(func);
	    } catch (e) {}

	    try {
	      return func + '';
	    } catch (e) {}
	  }

	  return '';
	}

	var _toSource = toSource$1;

	var isFunction = isFunction_1,
	    isMasked = _isMasked,
	    isObject$3 = isObject_1,
	    toSource = _toSource;
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */

	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	/** Used to detect host constructors (Safari). */

	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	/** Used for built-in method references. */

	var funcProto = Function.prototype,
	    objectProto$3 = Object.prototype;
	/** Used to resolve the decompiled source of functions. */

	var funcToString = funcProto.toString;
	/** Used to check objects for own properties. */

	var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
	/** Used to detect if a method is native. */

	var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty$3).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */

	function baseIsNative$1(value) {
	  if (!isObject$3(value) || isMasked(value)) {
	    return false;
	  }

	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	var _baseIsNative = baseIsNative$1;

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */

	function getValue$1(object, key) {
	  return object == null ? undefined : object[key];
	}

	var _getValue = getValue$1;

	var baseIsNative = _baseIsNative,
	    getValue = _getValue;
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */

	function getNative$3(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	var _getNative = getNative$3;

	var getNative$2 = _getNative;

	var defineProperty$5 = function () {
	  try {
	    var func = getNative$2(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}();

	var _defineProperty = defineProperty$5;

	var defineProperty$4 = _defineProperty;
	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */

	function baseAssignValue$1(object, key, value) {
	  if (key == '__proto__' && defineProperty$4) {
	    defineProperty$4(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	var _baseAssignValue = baseAssignValue$1;

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */

	function eq$2(value, other) {
	  return value === other || value !== value && other !== other;
	}

	var eq_1 = eq$2;

	var baseAssignValue = _baseAssignValue,
	    eq$1 = eq_1;
	/** Used for built-in method references. */

	var objectProto$2 = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */

	function assignValue$1(object, key, value) {
	  var objValue = object[key];

	  if (!(hasOwnProperty$2.call(object, key) && eq$1(objValue, value)) || value === undefined && !(key in object)) {
	    baseAssignValue(object, key, value);
	  }
	}

	var _assignValue = assignValue$1;

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray$4 = Array.isArray;
	var isArray_1 = isArray$4;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */

	function isObjectLike$1(value) {
	  return value != null && typeof value == 'object';
	}

	var isObjectLike_1 = isObjectLike$1;

	var baseGetTag = _baseGetTag,
	    isObjectLike = isObjectLike_1;
	/** `Object#toString` result references. */

	var symbolTag = '[object Symbol]';
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */

	function isSymbol$4(value) {
	  return typeof value == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
	}

	var isSymbol_1 = isSymbol$4;

	var isArray$3 = isArray_1,
	    isSymbol$3 = isSymbol_1;
	/** Used to match property names within property paths. */

	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */

	function isKey$1(value, object) {
	  if (isArray$3(value)) {
	    return false;
	  }

	  var type = typeof value;

	  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol$3(value)) {
	    return true;
	  }

	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
	}

	var _isKey = isKey$1;

	var getNative$1 = _getNative;
	/* Built-in method references that are verified to be native. */

	var nativeCreate$4 = getNative$1(Object, 'create');
	var _nativeCreate = nativeCreate$4;

	var nativeCreate$3 = _nativeCreate;
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */

	function hashClear$1() {
	  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
	  this.size = 0;
	}

	var _hashClear = hashClear$1;

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */

	function hashDelete$1(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	var _hashDelete = hashDelete$1;

	var nativeCreate$2 = _nativeCreate;
	/** Used to stand-in for `undefined` hash values. */

	var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
	/** Used for built-in method references. */

	var objectProto$1 = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */

	function hashGet$1(key) {
	  var data = this.__data__;

	  if (nativeCreate$2) {
	    var result = data[key];
	    return result === HASH_UNDEFINED$1 ? undefined : result;
	  }

	  return hasOwnProperty$1.call(data, key) ? data[key] : undefined;
	}

	var _hashGet = hashGet$1;

	var nativeCreate$1 = _nativeCreate;
	/** Used for built-in method references. */

	var objectProto = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty = objectProto.hasOwnProperty;
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */

	function hashHas$1(key) {
	  var data = this.__data__;
	  return nativeCreate$1 ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	var _hashHas = hashHas$1;

	var nativeCreate = _nativeCreate;
	/** Used to stand-in for `undefined` hash values. */

	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */

	function hashSet$1(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
	  return this;
	}

	var _hashSet = hashSet$1;

	var hashClear = _hashClear,
	    hashDelete = _hashDelete,
	    hashGet = _hashGet,
	    hashHas = _hashHas,
	    hashSet = _hashSet;
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */

	function Hash$1(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	  this.clear();

	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	} // Add methods to `Hash`.


	Hash$1.prototype.clear = hashClear;
	Hash$1.prototype['delete'] = hashDelete;
	Hash$1.prototype.get = hashGet;
	Hash$1.prototype.has = hashHas;
	Hash$1.prototype.set = hashSet;
	var _Hash = Hash$1;

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */

	function listCacheClear$1() {
	  this.__data__ = [];
	  this.size = 0;
	}

	var _listCacheClear = listCacheClear$1;

	var eq = eq_1;
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */

	function assocIndexOf$4(array, key) {
	  var length = array.length;

	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }

	  return -1;
	}

	var _assocIndexOf = assocIndexOf$4;

	var assocIndexOf$3 = _assocIndexOf;
	/** Used for built-in method references. */

	var arrayProto = Array.prototype;
	/** Built-in value references. */

	var splice = arrayProto.splice;
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */

	function listCacheDelete$1(key) {
	  var data = this.__data__,
	      index = assocIndexOf$3(data, key);

	  if (index < 0) {
	    return false;
	  }

	  var lastIndex = data.length - 1;

	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }

	  --this.size;
	  return true;
	}

	var _listCacheDelete = listCacheDelete$1;

	var assocIndexOf$2 = _assocIndexOf;
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */

	function listCacheGet$1(key) {
	  var data = this.__data__,
	      index = assocIndexOf$2(data, key);
	  return index < 0 ? undefined : data[index][1];
	}

	var _listCacheGet = listCacheGet$1;

	var assocIndexOf$1 = _assocIndexOf;
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */

	function listCacheHas$1(key) {
	  return assocIndexOf$1(this.__data__, key) > -1;
	}

	var _listCacheHas = listCacheHas$1;

	var assocIndexOf = _assocIndexOf;
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */

	function listCacheSet$1(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }

	  return this;
	}

	var _listCacheSet = listCacheSet$1;

	var listCacheClear = _listCacheClear,
	    listCacheDelete = _listCacheDelete,
	    listCacheGet = _listCacheGet,
	    listCacheHas = _listCacheHas,
	    listCacheSet = _listCacheSet;
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */

	function ListCache$1(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	  this.clear();

	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	} // Add methods to `ListCache`.


	ListCache$1.prototype.clear = listCacheClear;
	ListCache$1.prototype['delete'] = listCacheDelete;
	ListCache$1.prototype.get = listCacheGet;
	ListCache$1.prototype.has = listCacheHas;
	ListCache$1.prototype.set = listCacheSet;
	var _ListCache = ListCache$1;

	var getNative = _getNative,
	    root = _root;
	/* Built-in method references that are verified to be native. */

	var Map$2 = getNative(root, 'Map');
	var _Map = Map$2;

	var Hash = _Hash,
	    ListCache = _ListCache,
	    Map$1 = _Map;
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */

	function mapCacheClear$1() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash(),
	    'map': new (Map$1 || ListCache)(),
	    'string': new Hash()
	  };
	}

	var _mapCacheClear = mapCacheClear$1;

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */

	function isKeyable$1(value) {
	  var type = typeof value;
	  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
	}

	var _isKeyable = isKeyable$1;

	var isKeyable = _isKeyable;
	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */

	function getMapData$4(map, key) {
	  var data = map.__data__;
	  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
	}

	var _getMapData = getMapData$4;

	var getMapData$3 = _getMapData;
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */

	function mapCacheDelete$1(key) {
	  var result = getMapData$3(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	var _mapCacheDelete = mapCacheDelete$1;

	var getMapData$2 = _getMapData;
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */

	function mapCacheGet$1(key) {
	  return getMapData$2(this, key).get(key);
	}

	var _mapCacheGet = mapCacheGet$1;

	var getMapData$1 = _getMapData;
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */

	function mapCacheHas$1(key) {
	  return getMapData$1(this, key).has(key);
	}

	var _mapCacheHas = mapCacheHas$1;

	var getMapData = _getMapData;
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */

	function mapCacheSet$1(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;
	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	var _mapCacheSet = mapCacheSet$1;

	var mapCacheClear = _mapCacheClear,
	    mapCacheDelete = _mapCacheDelete,
	    mapCacheGet = _mapCacheGet,
	    mapCacheHas = _mapCacheHas,
	    mapCacheSet = _mapCacheSet;
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */

	function MapCache$1(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	  this.clear();

	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	} // Add methods to `MapCache`.


	MapCache$1.prototype.clear = mapCacheClear;
	MapCache$1.prototype['delete'] = mapCacheDelete;
	MapCache$1.prototype.get = mapCacheGet;
	MapCache$1.prototype.has = mapCacheHas;
	MapCache$1.prototype.set = mapCacheSet;
	var _MapCache = MapCache$1;

	var MapCache = _MapCache;
	/** Error message constants. */

	var FUNC_ERROR_TEXT = 'Expected a function';
	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */

	function memoize$1(func, resolver) {
	  if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }

	  var memoized = function () {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }

	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };

	  memoized.cache = new (memoize$1.Cache || MapCache)();
	  return memoized;
	} // Expose `MapCache`.


	memoize$1.Cache = MapCache;
	var memoize_1 = memoize$1;

	var memoize = memoize_1;
	/** Used as the maximum memoize cache size. */

	var MAX_MEMOIZE_SIZE = 500;
	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */

	function memoizeCapped$1(func) {
	  var result = memoize(func, function (key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }

	    return key;
	  });
	  var cache = result.cache;
	  return result;
	}

	var _memoizeCapped = memoizeCapped$1;

	var memoizeCapped = _memoizeCapped;
	/** Used to match property names within property paths. */

	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
	/** Used to match backslashes in property paths. */

	var reEscapeChar = /\\(\\)?/g;
	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */

	var stringToPath$1 = memoizeCapped(function (string) {
	  var result = [];

	  if (string.charCodeAt(0) === 46
	  /* . */
	  ) {
	      result.push('');
	    }

	  string.replace(rePropName, function (match, number, quote, subString) {
	    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
	  });
	  return result;
	});
	var _stringToPath = stringToPath$1;

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */

	function arrayMap$1(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }

	  return result;
	}

	var _arrayMap = arrayMap$1;

	var Symbol$1 = _Symbol,
	    arrayMap = _arrayMap,
	    isArray$2 = isArray_1,
	    isSymbol$2 = isSymbol_1;
	/** Used as references for various `Number` constants. */

	var INFINITY$1 = 1 / 0;
	/** Used to convert symbols to primitives and strings. */

	var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
	    symbolToString$1 = symbolProto ? symbolProto.toString : undefined;
	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */

	function baseToString$1(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }

	  if (isArray$2(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString$1) + '';
	  }

	  if (isSymbol$2(value)) {
	    return symbolToString$1 ? symbolToString$1.call(value) : '';
	  }

	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
	}

	var _baseToString = baseToString$1;

	var baseToString = _baseToString;
	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */

	function toString$2(value) {
	  return value == null ? '' : baseToString(value);
	}

	var toString_1 = toString$2;

	var isArray$1 = isArray_1,
	    isKey = _isKey,
	    stringToPath = _stringToPath,
	    toString$1 = toString_1;
	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {Array} Returns the cast property path array.
	 */

	function castPath$1(value, object) {
	  if (isArray$1(value)) {
	    return value;
	  }

	  return isKey(value, object) ? [value] : stringToPath(toString$1(value));
	}

	var _castPath = castPath$1;

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	/** Used to detect unsigned integer values. */

	var reIsUint = /^(?:0|[1-9]\d*)$/;
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */

	function isIndex$1(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	}

	var _isIndex = isIndex$1;

	var isSymbol$1 = isSymbol_1;
	/** Used as references for various `Number` constants. */

	var INFINITY = 1 / 0;
	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */

	function toKey$1(value) {
	  if (typeof value == 'string' || isSymbol$1(value)) {
	    return value;
	  }

	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}

	var _toKey = toKey$1;

	var assignValue = _assignValue,
	    castPath = _castPath,
	    isIndex = _isIndex,
	    isObject$2 = isObject_1,
	    toKey = _toKey;
	/**
	 * The base implementation of `_.set`.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The path of the property to set.
	 * @param {*} value The value to set.
	 * @param {Function} [customizer] The function to customize path creation.
	 * @returns {Object} Returns `object`.
	 */

	function baseSet$1(object, path, value, customizer) {
	  if (!isObject$2(object)) {
	    return object;
	  }

	  path = castPath(path, object);
	  var index = -1,
	      length = path.length,
	      lastIndex = length - 1,
	      nested = object;

	  while (nested != null && ++index < length) {
	    var key = toKey(path[index]),
	        newValue = value;

	    if (index != lastIndex) {
	      var objValue = nested[key];
	      newValue = customizer ? customizer(objValue, key, nested) : undefined;

	      if (newValue === undefined) {
	        newValue = isObject$2(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
	      }
	    }

	    assignValue(nested, key, newValue);
	    nested = nested[key];
	  }

	  return object;
	}

	var _baseSet = baseSet$1;

	var baseSet = _baseSet;
	/**
	 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
	 * it's created. Arrays are created for missing index properties while objects
	 * are created for all other missing properties. Use `_.setWith` to customize
	 * `path` creation.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The path of the property to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.set(object, 'a[0].b.c', 4);
	 * console.log(object.a[0].b.c);
	 * // => 4
	 *
	 * _.set(object, ['x', '0', 'y', 'z'], 5);
	 * console.log(object.x[0].y.z);
	 * // => 5
	 */

	function set(object, path, value) {
	  return object == null ? object : baseSet(object, path, value);
	}

	var set_1 = set;

	var template$7 = document.createElement('template');
	template$7.innerHTML = "\n<div class=\"form-group\">\n    <label></label>\n    <input type=\"text\" class=\"form-control\">\n    <small class=\"form-text text-muted\"></small>\n    <div class=\"invalid-feedback\"></div>\n</div>\n";
	var SchemaFormField = /*#__PURE__*/function (_HTMLElement) {
	  _inherits(SchemaFormField, _HTMLElement);

	  var _super = _createSuper(SchemaFormField);

	  function SchemaFormField() {
	    _classCallCheck(this, SchemaFormField);

	    return _super.apply(this, arguments);
	  }

	  _createClass(SchemaFormField, [{
	    key: "connectedCallback",
	    value: function connectedCallback() {
	      var node = document.importNode(template$7.content, true);
	      this.appendChild(node);
	      this.inputElement = this.querySelector('input');
	      this.inputElement.addEventListener('input', this.onInput.bind(this));
	    }
	  }, {
	    key: "onInput",
	    value: function onInput() {
	      this.querySelector('.invalid-feedback').innerHTML = '';
	      this.inputElement.classList.remove('is-invalid');
	      this.value = this.inputElement.value;
	    }
	  }, {
	    key: "attributeChangedCallback",
	    value: function attributeChangedCallback() {
	      if (this.querySelector('label') && this.title) this.querySelector('label').innerHTML = this.title;
	      if (this.querySelector('small') && this.help) this.querySelector('small').innerHTML = this.help;
	      if (this.querySelector('input') && this.type) this.querySelector('input').setAttribute('type', this.type);
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this._value;
	    },
	    set: function set(value) {
	      this._value = value;
	    }
	  }, {
	    key: "title",
	    get: function get() {
	      return this.getAttribute('title');
	    },
	    set: function set(value) {
	      this.setAttribute('title', value);
	    }
	  }, {
	    key: "help",
	    get: function get() {
	      return this.getAttribute('help');
	    },
	    set: function set(value) {
	      this.setAttribute('help', value);
	    }
	  }, {
	    key: "type",
	    get: function get() {
	      return this.getAttribute('type');
	    },
	    set: function set(value) {
	      this.setAttribute('type', value);
	    }
	  }, {
	    key: "key",
	    get: function get() {
	      return this._key;
	    },
	    set: function set(value) {
	      this._key = value;

	      if (this.key) {
	        if (this.querySelector('label')) this.querySelector('label').setAttribute('for', this.key);
	        if (this.querySelector('input')) this.querySelector('input').id = this.key;
	      }
	    }
	  }, {
	    key: "error",
	    get: function get() {
	      return this._error;
	    },
	    set: function set(value) {
	      this._error = value;
	      this.inputElement.classList.add('is-invalid');

	      if (this.error.keyword == 'required') {
	        this.querySelector('.invalid-feedback').innerHTML = 'required';
	      } else {
	        this.querySelector('.invalid-feedback').innerHTML = this.error.message;
	      }
	    }
	  }], [{
	    key: "observedAttributes",
	    get: function get() {
	      return ['title', 'help', 'type'];
	    }
	  }]);

	  return SchemaFormField;
	}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
	if (!window.customElements.get('schema-form-field')) window.customElements.define('schema-form-field', SchemaFormField);

	var template$6 = document.createElement('template');
	template$6.innerHTML = "\n<div class=\"form-group\">\n    <label></label>\n    <textarea class=\"form-control\"></textarea>\n    <small class=\"form-text text-muted\"></small>\n    <div class=\"invalid-feedback\"></div>\n</div>\n";
	var SchemaFormTextArea = /*#__PURE__*/function (_SchemaFormField) {
	  _inherits(SchemaFormTextArea, _SchemaFormField);

	  var _super = _createSuper(SchemaFormTextArea);

	  function SchemaFormTextArea() {
	    _classCallCheck(this, SchemaFormTextArea);

	    return _super.apply(this, arguments);
	  }

	  _createClass(SchemaFormTextArea, [{
	    key: "connectedCallback",
	    value: function connectedCallback() {
	      var node = document.importNode(template$6.content, true);
	      this.appendChild(node);
	      this.textareaElement = this.querySelector('textarea');
	      this.textareaElement.addEventListener('input', this.onInput.bind(this));
	      this.inputElement = this.textareaElement;
	    }
	  }, {
	    key: "key",
	    get: function get() {
	      return this._key;
	    },
	    set: function set(value) {
	      this._key = value;

	      if (this.key) {
	        this.querySelector('label').setAttribute('for', this.key);
	        this.textareaElement.id = this.key;
	      }
	    }
	  }]);

	  return SchemaFormTextArea;
	}(SchemaFormField);
	window.customElements.define('schema-form-textarea', SchemaFormTextArea);

	var DESCRIPTORS$4 = descriptors;
	var defineProperty$3 = objectDefineProperty.f;
	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name'; // Function instances `.name` property
	// https://tc39.es/ecma262/#sec-function-instances-name

	if (DESCRIPTORS$4 && !(NAME in FunctionPrototype)) {
	  defineProperty$3(FunctionPrototype, NAME, {
	    configurable: true,
	    get: function () {
	      try {
	        return FunctionPrototypeToString.call(this).match(nameRE)[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	var template$5 = document.createElement('template');
	template$5.innerHTML = "\n<div class=\"form-group\">\n    <label></label>\n    <select type=\"text\" class=\"form-control\"></select>\n    <small class=\"form-text text-muted\"></small>\n    <div class=\"invalid-feedback\"></div>\n</div>\n";
	var SchemaFormSelectField = /*#__PURE__*/function (_SchemaFormField) {
	  _inherits(SchemaFormSelectField, _SchemaFormField);

	  var _super = _createSuper(SchemaFormSelectField);

	  function SchemaFormSelectField() {
	    _classCallCheck(this, SchemaFormSelectField);

	    return _super.apply(this, arguments);
	  }

	  _createClass(SchemaFormSelectField, [{
	    key: "connectedCallback",
	    value: function connectedCallback() {
	      var node = document.importNode(template$5.content, true);
	      this.appendChild(node);
	      this.selectElement = this.querySelector('select');
	      this.selectElement.addEventListener('change', this.onChange.bind(this));
	    }
	  }, {
	    key: "onChange",
	    value: function onChange(event) {
	      this.value = event.target.value;
	    }
	  }, {
	    key: "options",
	    get: function get() {
	      return this._options;
	    },
	    set: function set(value) {
	      var _this = this;

	      this._options = value;

	      if (this.options && this.options.forEach) {
	        this.options.forEach(function (map) {
	          var option = document.createElement('option');
	          option.innerHTML = map.name;
	          option.setAttribute('value', map.value);

	          _this.selectElement.appendChild(option);
	        });
	      }
	    }
	  }]);

	  return SchemaFormSelectField;
	}(SchemaFormField);
	window.customElements.define('schema-form-select-field', SchemaFormSelectField);

	var template$4 = document.createElement('template');
	template$4.innerHTML = "\n<div class=\"form-group\">\n    <label></label>\n    <small class=\"form-text text-muted\"></small>\n    <div class=\"invalid-feedback\"></div>\n</div>\n";
	var checkboxTemplate = document.createElement('template');
	checkboxTemplate.innerHTML = "\n<div class=\"checkbox\">\n    <label>\n        <input type=\"checkbox\">\n        <span></span>\n    </label>\n</div>\n";

	var SchemaFormCheckboxes = /*#__PURE__*/function (_SchemaFormField) {
	  _inherits(SchemaFormCheckboxes, _SchemaFormField);

	  var _super = _createSuper(SchemaFormCheckboxes);

	  function SchemaFormCheckboxes() {
	    _classCallCheck(this, SchemaFormCheckboxes);

	    return _super.apply(this, arguments);
	  }

	  _createClass(SchemaFormCheckboxes, [{
	    key: "connectedCallback",
	    value: function connectedCallback() {
	      var node = document.importNode(template$4.content, true);
	      this.appendChild(node);
	    }
	  }, {
	    key: "onChange",
	    value: function onChange() {
	      var inputs = this.querySelectorAll('input');
	      this.value = [];

	      for (var i = 0; i < inputs.length; i++) {
	        if (inputs[i].checked) this.value.push(inputs[i].value);
	      }
	    }
	  }, {
	    key: "options",
	    get: function get() {
	      return this._options;
	    },
	    set: function set(value) {
	      var _this = this;

	      this._options = value;

	      if (this.options) {
	        var previous = this.querySelector('label');
	        this.options.forEach(function (map) {
	          var checkbox = document.importNode(checkboxTemplate.content, true);
	          checkbox.name = _this.key;
	          checkbox.querySelector('span').innerHTML = map.name;
	          var input = checkbox.querySelector('input');
	          input.setAttribute('name', _this.key);
	          input.setAttribute('value', map.value);
	          input.addEventListener('change', _this.onChange.bind(_this));
	          previous.after(checkbox);
	          previous = previous.nextElementSibling;
	        });
	      }
	    }
	  }]);

	  return SchemaFormCheckboxes;
	}(SchemaFormField);

	window.customElements.define('schema-form-checkboxes', SchemaFormCheckboxes);

	var template$3 = document.createElement('template');
	template$3.innerHTML = "\n<div class=\"form-group\">\n    <label></label>\n    <small class=\"form-text text-muted\"></small>\n    <div class=\"invalid-feedback\"></div>\n</div>\n";
	var radioTemplate = document.createElement('template');
	radioTemplate.innerHTML = "\n<div class=\"radio\">\n    <label>\n        <input type=\"radio\">\n        <span></span>\n    </label>\n</div>\n";

	var SchemaFormRadios = /*#__PURE__*/function (_SchemaFormField) {
	  _inherits(SchemaFormRadios, _SchemaFormField);

	  var _super = _createSuper(SchemaFormRadios);

	  function SchemaFormRadios() {
	    _classCallCheck(this, SchemaFormRadios);

	    return _super.apply(this, arguments);
	  }

	  _createClass(SchemaFormRadios, [{
	    key: "connectedCallback",
	    value: function connectedCallback() {
	      var node = document.importNode(template$3.content, true);
	      this.appendChild(node);
	    }
	  }, {
	    key: "onChange",
	    value: function onChange(event) {
	      this.value = event.target.value;
	    }
	  }, {
	    key: "options",
	    get: function get() {
	      return this._options;
	    },
	    set: function set(value) {
	      var _this = this;

	      this._options = value;

	      if (this.options) {
	        var previous = this.querySelector('label');
	        this.options.forEach(function (map) {
	          var radio = document.importNode(radioTemplate.content, true);
	          radio.querySelector('span').innerHTML = map.name;
	          var input = radio.querySelector('input');
	          input.setAttribute('name', _this.key);
	          input.setAttribute('value', map.value);
	          input.addEventListener('change', _this.onChange.bind(_this));
	          previous.after(radio);
	          previous = previous.nextElementSibling;
	        });
	      }
	    }
	  }]);

	  return SchemaFormRadios;
	}(SchemaFormField);

	window.customElements.define('schema-form-radios', SchemaFormRadios);

	var SchemaFormHelp = /*#__PURE__*/function (_SchemaFormField) {
	  _inherits(SchemaFormHelp, _SchemaFormField);

	  var _super = _createSuper(SchemaFormHelp);

	  function SchemaFormHelp() {
	    _classCallCheck(this, SchemaFormHelp);

	    return _super.apply(this, arguments);
	  }

	  _createClass(SchemaFormHelp, [{
	    key: "connectedCallback",
	    value: function connectedCallback() {
	      var node = document.createElement('div');
	      this.appendChild(node);
	    }
	  }]);

	  return SchemaFormHelp;
	}(SchemaFormField);
	window.customElements.define('schema-form-help', SchemaFormHelp);

	var template$2 = document.createElement('template');
	template$2.innerHTML = "\n<button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n";
	var SchemaFormSubmit = /*#__PURE__*/function (_HTMLElement) {
	  _inherits(SchemaFormSubmit, _HTMLElement);

	  var _super = _createSuper(SchemaFormSubmit);

	  function SchemaFormSubmit() {
	    _classCallCheck(this, SchemaFormSubmit);

	    return _super.apply(this, arguments);
	  }

	  _createClass(SchemaFormSubmit, [{
	    key: "connectedCallback",
	    value: function connectedCallback() {
	      var node = document.importNode(template$2.content, true);
	      this.appendChild(node);
	    }
	  }]);

	  return SchemaFormSubmit;
	}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
	window.customElements.define('schema-form-submit', SchemaFormSubmit);

	var template$1 = document.createElement('template');
	template$1.innerHTML = "\n<fieldset class=\"form-group\">\n    <legend></legend>\n</fieldset>\n";

	var SchemaFormFieldset = /*#__PURE__*/function (_SchemaFormField) {
	  _inherits(SchemaFormFieldset, _SchemaFormField);

	  var _super = _createSuper(SchemaFormFieldset);

	  function SchemaFormFieldset() {
	    _classCallCheck(this, SchemaFormFieldset);

	    return _super.apply(this, arguments);
	  }

	  _createClass(SchemaFormFieldset, [{
	    key: "connectedCallback",
	    value: function connectedCallback() {
	      var node = document.importNode(template$1.content, true);
	      this.appendChild(node);
	    }
	  }, {
	    key: "onChange",
	    value: function onChange(event) {
	      this.value = event.target.value;
	    }
	  }, {
	    key: "attributeChangedCallback",
	    value: function attributeChangedCallback() {
	      if (this.querySelector('legend') && this.title) this.querySelector('legend').innerHTML = this.title;
	    }
	  }]);

	  return SchemaFormFieldset;
	}(SchemaFormField);

	window.customElements.define('schema-form-fieldset', SchemaFormFieldset);

	var objectGetOwnPropertyNamesExternal = {};

	/* eslint-disable es/no-object-getownpropertynames -- safe */
	var toIndexedObject$3 = toIndexedObject$7;
	var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var toString = {}.toString;
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return $getOwnPropertyNames$1(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


	objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : $getOwnPropertyNames$1(toIndexedObject$3(it));
	};

	var wellKnownSymbolWrapped = {};

	var wellKnownSymbol$1 = wellKnownSymbol$g;
	wellKnownSymbolWrapped.f = wellKnownSymbol$1;

	var path = path$2;
	var has$2 = has$a;
	var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
	var defineProperty$2 = objectDefineProperty.f;

	var defineWellKnownSymbol$1 = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has$2(Symbol, NAME)) defineProperty$2(Symbol, NAME, {
	    value: wrappedWellKnownSymbolModule$1.f(NAME)
	  });
	};

	var $$5 = _export;
	var global$2 = global$l;
	var getBuiltIn = getBuiltIn$6;
	var DESCRIPTORS$3 = descriptors;
	var NATIVE_SYMBOL = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;
	var fails$1 = fails$d;
	var has$1 = has$a;
	var isArray = isArray$6;
	var isObject$1 = isObject$f;
	var anObject = anObject$d;
	var toObject$1 = toObject$6;
	var toIndexedObject$2 = toIndexedObject$7;
	var toPrimitive = toPrimitive$3;
	var createPropertyDescriptor = createPropertyDescriptor$3;
	var nativeObjectCreate = objectCreate;
	var objectKeys$2 = objectKeys$4;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule = objectDefineProperty;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var createNonEnumerableProperty = createNonEnumerableProperty$7;
	var redefine = redefine$6.exports;
	var shared = shared$5.exports;
	var sharedKey = sharedKey$3;
	var hiddenKeys = hiddenKeys$5;
	var uid = uid$3;
	var wellKnownSymbol = wellKnownSymbol$g;
	var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
	var defineWellKnownSymbol = defineWellKnownSymbol$1;
	var setToStringTag = setToStringTag$2;
	var InternalStateModule = internalState;
	var $forEach = arrayIteration.forEach;
	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(SYMBOL);
	var ObjectPrototype = Object[PROTOTYPE];
	var $Symbol = global$2.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	var nativeDefineProperty = definePropertyModule.f;
	var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = propertyIsEnumerableModule$1.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore = shared('wks');
	var QObject = global$2.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

	var setSymbolDescriptor = DESCRIPTORS$3 && fails$1(function () {
	  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
	    get: function () {
	      return nativeDefineProperty(this, 'a', {
	        value: 7
	      }).a;
	    }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty(O, P, Attributes);

	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!DESCRIPTORS$3) symbol.description = description;
	  return symbol;
	};

	var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);

	  if (has$1(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has$1(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has$1(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = nativeObjectCreate(Attributes, {
	        enumerable: createPropertyDescriptor(0, false)
	      });
	    }

	    return setSymbolDescriptor(O, key, Attributes);
	  }

	  return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject$2(Properties);
	  var keys = objectKeys$2(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!DESCRIPTORS$3 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable.call(this, P);
	  if (this === ObjectPrototype && has$1(AllSymbols, P) && !has$1(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has$1(this, P) || !has$1(AllSymbols, P) || has$1(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject$2(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype && has$1(AllSymbols, key) && !has$1(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor(it, key);

	  if (descriptor && has$1(AllSymbols, key) && !(has$1(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }

	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject$2(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!has$1(AllSymbols, key) && !has$1(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$2(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (has$1(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$1(ObjectPrototype, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	}; // `Symbol` constructor
	// https://tc39.es/ecma262/#sec-symbol-constructor


	if (!NATIVE_SYMBOL) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);

	    var setter = function (value) {
	      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
	      if (has$1(this, HIDDEN) && has$1(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };

	    if (DESCRIPTORS$3 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
	      configurable: true,
	      set: setter
	    });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return getInternalState(this).tag;
	  });
	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });
	  propertyIsEnumerableModule$1.f = $propertyIsEnumerable;
	  definePropertyModule.f = $defineProperty;
	  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
	  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  getOwnPropertySymbolsModule$1.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbolModule.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };

	  if (DESCRIPTORS$3) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });

	    {
	      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, {
	        unsafe: true
	      });
	    }
	  }
	}

	$$5({
	  global: true,
	  wrap: true,
	  forced: !NATIVE_SYMBOL,
	  sham: !NATIVE_SYMBOL
	}, {
	  Symbol: $Symbol
	});
	$forEach(objectKeys$2(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol(name);
	});
	$$5({
	  target: SYMBOL,
	  stat: true,
	  forced: !NATIVE_SYMBOL
	}, {
	  // `Symbol.for` method
	  // https://tc39.es/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has$1(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.es/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has$1(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () {
	    USE_SETTER = true;
	  },
	  useSimple: function () {
	    USE_SETTER = false;
	  }
	});
	$$5({
	  target: 'Object',
	  stat: true,
	  forced: !NATIVE_SYMBOL,
	  sham: !DESCRIPTORS$3
	}, {
	  // `Object.create` method
	  // https://tc39.es/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.es/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.es/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});
	$$5({
	  target: 'Object',
	  stat: true,
	  forced: !NATIVE_SYMBOL
	}, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443

	$$5({
	  target: 'Object',
	  stat: true,
	  forced: fails$1(function () {
	    getOwnPropertySymbolsModule$1.f(1);
	  })
	}, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return getOwnPropertySymbolsModule$1.f(toObject$1(it));
	  }
	}); // `JSON.stringify` method behavior with symbols
	// https://tc39.es/ecma262/#sec-json.stringify

	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$1(function () {
	    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

	    return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
	    || $stringify({
	      a: symbol
	    }) != '{}' // V8 throws on boxed symbols
	    || $stringify(Object(symbol)) != '{}';
	  });
	  $$5({
	    target: 'JSON',
	    stat: true,
	    forced: FORCED_JSON_STRINGIFY
	  }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;

	      while (arguments.length > index) args.push(arguments[index++]);

	      $replacer = replacer;
	      if (!isObject$1(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	} // `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive


	if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	} // `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag


	setToStringTag($Symbol, SYMBOL);
	hiddenKeys[HIDDEN] = true;

	var $$4 = _export;
	var DESCRIPTORS$2 = descriptors;
	var global$1 = global$l;
	var has = has$a;
	var isObject = isObject$f;
	var defineProperty$1 = objectDefineProperty.f;
	var copyConstructorProperties = copyConstructorProperties$2;
	var NativeSymbol = global$1.Symbol;

	if (DESCRIPTORS$2 && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) || // Safari 12 bug
	NativeSymbol().description !== undefined)) {
	  var EmptyStringDescriptionStore = {}; // wrap Symbol constructor for correct work with undefined description

	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var result = this instanceof SymbolWrapper ? new NativeSymbol(description) // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	    : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };

	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
	  symbolPrototype.constructor = SymbolWrapper;
	  var symbolToString = symbolPrototype.toString;
	  var native = String(NativeSymbol('test')) == 'Symbol(test)';
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  defineProperty$1(symbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = isObject(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });
	  $$4({
	    global: true,
	    forced: true
	  }, {
	    Symbol: SymbolWrapper
	  });
	}

	var $$3 = _export;
	var $filter = arrayIteration.filter;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$2;
	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter'); // `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species

	$$3({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT
	}, {
	  filter: function filter(callbackfn
	  /* , thisArg */
	  ) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $$2 = _export;
	var IndexedObject$1 = indexedObject;
	var toIndexedObject$1 = toIndexedObject$7;
	var arrayMethodIsStrict = arrayMethodIsStrict$4;
	var nativeJoin = [].join;
	var ES3_STRINGS = IndexedObject$1 != Object;
	var STRICT_METHOD = arrayMethodIsStrict('join', ','); // `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join

	$$2({
	  target: 'Array',
	  proto: true,
	  forced: ES3_STRINGS || !STRICT_METHOD
	}, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject$1(this), separator === undefined ? ',' : separator);
	  }
	});

	var DESCRIPTORS$1 = descriptors;
	var fails = fails$d;
	var objectKeys$1 = objectKeys$4;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var toObject = toObject$6;
	var IndexedObject = indexedObject; // eslint-disable-next-line es/no-object-assign -- safe

	var $assign = Object.assign; // eslint-disable-next-line es/no-object-defineproperty -- required for testing

	var defineProperty = Object.defineProperty; // `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign

	var objectAssign = !$assign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS$1 && $assign({
	    b: 1
	  }, $assign(defineProperty({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), {
	    b: 2
	  })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

	  var A = {};
	  var B = {}; // eslint-disable-next-line es/no-symbol -- safe

	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) {
	    B[chr] = chr;
	  });
	  return $assign({}, A)[symbol] != 7 || objectKeys$1($assign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule.f;

	  while (argumentsLength > index) {
	    var S = IndexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys$1(S).concat(getOwnPropertySymbols(S)) : objectKeys$1(S);
	    var length = keys.length;
	    var j = 0;
	    var key;

	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS$1 || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  }

	  return T;
	} : $assign;

	var $$1 = _export;
	var assign = objectAssign; // `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	// eslint-disable-next-line es/no-object-assign -- required for testing

	$$1({
	  target: 'Object',
	  stat: true,
	  forced: Object.assign !== assign
	}, {
	  assign: assign
	});

	var DESCRIPTORS = descriptors;
	var objectKeys = objectKeys$4;
	var toIndexedObject = toIndexedObject$7;
	var propertyIsEnumerable = objectPropertyIsEnumerable.f; // `Object.{ entries, values }` methods implementation

	var createMethod = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject(it);
	    var keys = objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;

	    while (length > i) {
	      key = keys[i++];

	      if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
	        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }

	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.es/ecma262/#sec-object.entries
	  entries: createMethod(true),
	  // `Object.values` method
	  // https://tc39.es/ecma262/#sec-object.values
	  values: createMethod(false)
	};

	var $ = _export;
	var $entries = objectToArray.entries; // `Object.entries` method
	// https://tc39.es/ecma262/#sec-object.entries

	$({
	  target: 'Object',
	  stat: true
	}, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
	});

	function parseSchema(schema) {
	  switch (schema.type) {
	    case 'object':
	      return parseObject(schema.properties);
	  }
	}

	function parseObject(properties) {
	  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	  return Object.entries(properties).reduce(function (form, _ref) {
	    var _ref2 = _slicedToArray(_ref, 2),
	        key = _ref2[0],
	        property = _ref2[1];

	    var namespacedKey = namespace ? [namespace, key].join('.') : key;
	    form.push(parseObjectProperties(namespacedKey, property));
	    return form;
	  }, []);
	}

	function parseObjectProperties(key, properties) {
	  var formItem = Object.assign({}, {
	    key: key
	  }, properties);

	  if (properties.enum || properties.titleMap) {
	    formItem.type = 'select';
	  } else if (hasOneOfConst(properties)) {
	    formItem.type = 'select';
	    formItem.options = oneOfToTitleMap(properties.oneOf);
	  } else if (properties.type == 'array' && properties.items.enum) {
	    formItem.type = 'checkboxes';
	  } else if (properties.type == 'object' && properties.properties) {
	    formItem.type = 'fieldset';
	    formItem.items = parseObject(properties.properties, key);
	    delete formItem.properties;
	  } else {
	    var mappedType = schemaToFormType[properties.type];
	    if (mappedType) formItem.type = mappedType;
	  }

	  formItem.title = formItem.title || key;
	  return formItem;
	}

	function hasOneOfConst(properties) {
	  return properties.oneOf && properties.oneOf.filter(function (oneOf) {
	    return oneOf.const;
	  }).length > 0;
	}

	function oneOfToTitleMap(oneOf) {
	  return oneOf.map(function (item) {
	    return {
	      value: item.const,
	      name: item.description || item.const
	    };
	  });
	}

	var schemaToFormType = {
	  string: 'text',
	  object: 'fieldset'
	};
	function parseForm(form, schema) {
	  if (form.length == 1 && form[0] == '*') {
	    return parseSchema(schema);
	  } else {
	    return form.reduce(function (formItems, formItem) {
	      return handleFormItem(formItems, formItem, schema);
	    }, []);
	  }
	}

	function findSchemaProperties(key, schema) {
	  return key.split('.').reduce(function (schema, namespace) {
	    return schema.properties[namespace];
	  }, schema);
	}

	function handleFormItem(form, formItem, schema) {
	  if (typeof formItem == 'string') {
	    var schemaProperties = findSchemaProperties(formItem, schema);

	    if (schemaProperties) {
	      formItem = parseObjectProperties(formItem, schemaProperties);
	    }
	  } else {
	    if (formItem.key) {
	      var _schemaProperties = findSchemaProperties(formItem.key, schema);

	      if (_schemaProperties) {
	        formItem = mergeFormSchemaProperties(formItem, _schemaProperties);
	      }
	    }
	  }

	  switch (formItem.type) {
	    case 'section':
	      formItem.items = formItem.items.reduce(function (sectionForm, sectionFormItem) {
	        return handleFormItem(sectionForm, sectionFormItem, schema);
	      }, []);
	      break;

	    case 'fieldset':
	      formItem.items = formItem.items.reduce(function (sectionForm, sectionFormItem) {
	        return handleFormItem(sectionForm, sectionFormItem, schema);
	      }, []);
	      break;
	  }

	  form.push(formItem);
	  return form;
	}

	function mergeFormSchemaProperties(formProperties, schemaProperties) {
	  return Object.assign({}, parseObjectProperties(formProperties.key, schemaProperties), formProperties);
	}

	var template = document.createElement('template');
	template.innerHTML = "\n<form></form>\n";
	var SchemaForm = /*#__PURE__*/function (_HTMLElement) {
	  _inherits(SchemaForm, _HTMLElement);

	  var _super = _createSuper(SchemaForm);

	  function SchemaForm() {
	    var _this;

	    _classCallCheck(this, SchemaForm);

	    _this = _super.call(this);
	    _this.elementMap = {
	      'textarea': 'schema-form-textarea',
	      'text': 'schema-form-field',
	      'number': 'schema-form-field',
	      'checkboxes': 'schema-form-checkboxes',
	      'select': 'schema-form-select-field',
	      'radios': 'schema-form-radios',
	      'help': 'schema-form-help',
	      'fieldset': 'schema-form-fieldset'
	    };
	    _this.fields = [];
	    return _this;
	  }

	  _createClass(SchemaForm, [{
	    key: "mapElement",
	    value: function mapElement(type, element) {
	      this.elementMap[type] = element;
	    }
	  }, {
	    key: "connectedCallback",
	    value: function connectedCallback() {
	      var _this2 = this;

	      var node = document.importNode(template.content, true);
	      this.appendChild(node);
	      this.formElement = this.querySelector('form');
	      this.formElement.addEventListener('submit', this.onSubmit.bind(this));
	      this.formElement.addEventListener('change', this.onChange.bind(this));

	      if (this.hasAttribute('schema')) {
	        fetch(this.getAttribute('schema')).then(function (response) {
	          return response.json();
	        }).then(function (data) {
	          var keys = Object.keys(data.properties);
	          keys.forEach(function (key) {
	            var properties = data.properties[key];

	            _this2.addField(properties);
	          });
	        });
	      }
	    }
	  }, {
	    key: "enumToTitleMap",
	    value: function enumToTitleMap(fieldEnum) {
	      return fieldEnum.map(function (key) {
	        return {
	          name: key,
	          value: key
	        };
	      });
	    }
	  }, {
	    key: "addField",
	    value: function addField(properties) {
	      var after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	      var element = this.elementMap[properties.type];
	      var formField = document.createElement(element);

	      if (after) {
	        var field = this.fields.find(function (field) {
	          return field.key == after;
	        });
	        field.after(formField);
	      } else if (parent) {
	        parent.appendChild(formField);
	      } else {
	        this.formElement.appendChild(formField);
	      }

	      formField.key = properties.key;
	      formField.setAttribute('title', properties.title);
	      if (properties.help) formField.setAttribute('help', properties.help);
	      formField.setAttribute('type', properties.type);

	      if (properties.titleMap) {
	        formField.options = properties.titleMap;
	      } else if (properties.enum) {
	        formField.options = this.enumToTitleMap(properties.enum);
	      } else if (properties.items && properties.items.enum) {
	        formField.options = this.enumToTitleMap(properties.items.enum);
	      } else if (properties.options) {
	        formField.options = properties.options;
	      }

	      if (properties.htmlClass) formField.htmlClass = properties.htmlClass;
	      if (properties.helpvalue) formField.innerHTML = properties.helpvalue;

	      if (properties.type == 'fieldset') {
	        this.buildFormSection(properties.items, formField, properties.key);
	      }

	      this.fields.push(formField);
	    }
	  }, {
	    key: "addSection",
	    value: function addSection(properties) {
	      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	      var div = document.createElement('div');

	      if (properties.htmlClass) {
	        properties.htmlClass.split(' ').forEach(function (className) {
	          div.classList.add(className);
	        });
	      }

	      if (parent) {
	        parent.appendChild(div);
	      } else {
	        this.formElement.appendChild(div);
	      }

	      this.buildFormSection(properties.items, div);
	    }
	  }, {
	    key: "clearForm",
	    value: function clearForm() {
	      this.fields = [];
	      this.formElement.innerHTML = '';
	    }
	  }, {
	    key: "buildFormSection",
	    value: function buildFormSection(form, element) {
	      var _this3 = this;

	      form.forEach(function (formItem) {
	        if (formItem) {
	          switch (formItem.type) {
	            case 'section':
	              _this3.addSection(formItem, element);

	              break;

	            case 'submit':
	              _this3.addSubmit(formItem, element);

	              break;

	            default:
	              _this3.addField(formItem, null, element);

	          }
	        }
	      });
	    }
	  }, {
	    key: "buildForm",
	    value: function buildForm() {
	      if (this.form) {
	        this.buildFormSection(parseForm(this.form, this.schema), this.formElement);
	      } else {
	        this.buildFormSection(parseSchema(this.schema), this.formElement);
	        this.addSubmit({}, this.formElement);
	        if (this.schema.dependencies) this.checkDependencies();
	      }
	    }
	  }, {
	    key: "addSubmit",
	    value: function addSubmit(properties, element) {
	      var submit = document.createElement('schema-form-submit');
	      element.appendChild(submit);

	      if (properties) {
	        var button = submit.querySelector('button');
	        if (properties.title) button.innerHTML = properties.title;
	        if (properties.style) button.classList.add(properties.style);
	      }
	    }
	  }, {
	    key: "onSubmit",
	    value: function onSubmit(event) {
	      event.preventDefault();
	      var ajv$1 = new ajv();
	      var valid = ajv$1.validate(this.schema, this.model);

	      if (!valid) {
	        ajv$1.errors.forEach(this.addError.bind(this));
	      }
	    }
	  }, {
	    key: "addError",
	    value: function addError(error) {
	      var key;

	      if (error.keyword == 'required') {
	        key = error.params.missingProperty;
	      } else {
	        key = error.dataPath.match(/\.(.*)/)[1];
	      }

	      this.fields.forEach(function (element) {
	        if (element.key == key) {
	          element.error = error;
	        }
	      });
	    }
	  }, {
	    key: "onChange",
	    value: function onChange() {
	      if (this.schema.dependencies) this.checkDependencies();
	    }
	  }, {
	    key: "checkDependencies",
	    value: function checkDependencies() {
	      var _this4 = this;

	      var dependencies = Object.keys(this.schema.dependencies);
	      dependencies.forEach(function (key) {
	        if (_this4.model[key] && _this4.model[key] != '') {
	          var dependency = _this4.schema.dependencies[key];

	          _this4.addDependencies(key, dependency);
	        }
	      });
	    }
	  }, {
	    key: "addDependencies",
	    value: function addDependencies(key, dependency) {
	      var _this5 = this;

	      Object.keys(dependency.properties).forEach(function (newKey) {
	        if (!_this5.fields.some(function (field) {
	          return field.key == newKey;
	        })) {
	          _this5.addField(dependency.properties[newKey], key);
	        }
	      });
	    }
	  }, {
	    key: "schema",
	    get: function get() {
	      return this._schema;
	    },
	    set: function set(value) {
	      this._schema = value;
	      this.clearForm();
	      this.buildForm();
	    }
	  }, {
	    key: "form",
	    get: function get() {
	      return this._form;
	    },
	    set: function set(value) {
	      this._form = value;
	      this.clearForm();
	      this.buildForm();
	    }
	  }, {
	    key: "model",
	    get: function get() {
	      return this.fields.reduce(function (model, field) {
	        if (field.value && field.value != '') {
	          set_1(model, field.key, field.value);
	        }

	        return model;
	      }, {});
	    }
	  }]);

	  return SchemaForm;
	}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
	window.customElements.define('schema-form', SchemaForm);

	exports.SchemaForm = SchemaForm;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

}({}));
