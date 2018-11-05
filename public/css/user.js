/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 318);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(32);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(319);


/***/ }),

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(320);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(10)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./user.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./user.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 32:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 320:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Ubuntu:300,400,500,700);", ""]);

// module
exports.push([module.i, "/* [Master Stylesheet v-1.0.0] */\n/* :: 1.0 Import Web Fonts */\n/* :: 2.0 Import All CSS */\n/* :: 3.0 Common/Base CSS */\n* {\n  margin: 0;\n  padding: 0; }\n\nbody {\n  font-family: \"Poppins\", sans-serif;\n  font-size: 14px;\n  background-color: #ffffff;\n  margin-top: 85px; }\n  @media only screen and (max-width: 767px) {\n    body {\n      margin-top: 80px; } }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  color: #000000;\n  line-height: 1.3;\n  font-weight: 700;\n  font-family: \"Ubuntu\", sans-serif; }\n\np {\n  color: #787878;\n  font-size: 14px;\n  line-height: 2;\n  font-weight: 400; }\n\na {\n  -webkit-transition: all 500ms ease 0s;\n  transition: all 500ms ease 0s;\n  text-decoration: none;\n  outline: 0 solid transparent;\n  color: #000000;\n  font-weight: 600;\n  font-size: 12px; }\n  a:hover, a:focus {\n    -webkit-transition: all 500ms ease 0s;\n    transition: all 500ms ease 0s;\n    text-decoration: none;\n    outline: 0 solid transparent;\n    color: #000000;\n    font-weight: 600;\n    font-size: 12px; }\n\nul,\nol {\n  margin: 0; }\n  ul li,\n  ol li {\n    list-style: none; }\n\nimg {\n  height: auto;\n  max-width: 100%; }\n\n/* Spacing */\n.mt-15 {\n  margin-top: 15px !important; }\n\n.mt-30 {\n  margin-top: 30px !important; }\n\n.mt-50 {\n  margin-top: 50px !important; }\n\n.mt-70 {\n  margin-top: 70px !important; }\n\n.mt-100 {\n  margin-top: 100px !important; }\n\n.mb-15 {\n  margin-bottom: 15px !important; }\n\n.mb-30 {\n  margin-bottom: 30px !important; }\n\n.mb-50 {\n  margin-bottom: 50px !important; }\n\n.mb-70 {\n  margin-bottom: 70px !important; }\n\n.mb-100 {\n  margin-bottom: 100px !important; }\n\n.ml-15 {\n  margin-left: 15px !important; }\n\n.ml-30 {\n  margin-left: 30px !important; }\n\n.ml-50 {\n  margin-left: 50px !important; }\n\n.mr-15 {\n  margin-right: 15px !important; }\n\n.mr-30 {\n  margin-right: 30px !important; }\n\n.mr-50 {\n  margin-right: 50px !important; }\n\n/* Height */\n.height-400 {\n  height: 400px !important; }\n\n.height-500 {\n  height: 500px !important; }\n\n.height-600 {\n  height: 600px !important; }\n\n.height-700 {\n  height: 700px !important; }\n\n.height-800 {\n  height: 800px !important; }\n\n/* Section Padding */\n.section-padding-80 {\n  padding-top: 80px;\n  padding-bottom: 80px; }\n\n.section-padding-80-0 {\n  padding-top: 80px;\n  padding-bottom: 0; }\n\n.section-padding-0-80 {\n  padding-top: 0;\n  padding-bottom: 80px; }\n\n/* Section Heading */\n.section-heading {\n  margin-bottom: 50px;\n  position: relative;\n  z-index: 1; }\n  .section-heading h2 {\n    font-size: 30px;\n    margin-bottom: 0;\n    text-transform: capitalize;\n    font-weight: 600; }\n  .section-heading.text-left {\n    text-align: left !important; }\n\n/* Miscellaneous */\n.bg-img {\n  background-position: center center;\n  background-size: cover;\n  background-repeat: no-repeat; }\n\n.bg-white {\n  background-color: #ffffff !important; }\n\n.bg-dark {\n  background-color: #000000 !important; }\n\n.bg-transparent {\n  background-color: transparent !important; }\n\n.font-bold {\n  font-weight: 700; }\n\n.font-light {\n  font-weight: 300; }\n\n.bg-overlay,\n.bg-overlay-white {\n  position: relative;\n  z-index: 2;\n  background-position: center center;\n  background-size: cover; }\n  .bg-overlay:hover,\n  .bg-overlay-white:hover {\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    content: \"\"; }\n\n.bg-overlay:hover {\n  background-color: rgba(0, 0, 0, 0.5); }\n\n.bg-overlay-white:hover {\n  background-color: rgba(255, 255, 255, 0.9); }\n\n/* ScrollUp */\n#scrollUp {\n  background-color: #ff084e;\n  border-radius: 0;\n  bottom: 60px;\n  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);\n  color: #ffffff;\n  font-size: 24px;\n  height: 40px;\n  line-height: 40px;\n  right: 60px;\n  text-align: center;\n  width: 40px; }\n  @media only screen and (max-width: 767px) {\n    #scrollUp {\n      bottom: 30px;\n      right: 30px; } }\n\n/* Essence Button */\n.essence-btn {\n  display: inline-block !important;\n  min-width: 170px !important;\n  height: 50px !important;\n  color: #ffffff !important;\n  border: none !important;\n  border-radius: 0 !important;\n  padding: 0 40px !important;\n  text-transform: uppercase !important;\n  font-size: 12px !important;\n  line-height: 50px !important;\n  background-color: #0315ff !important;\n  letter-spacing: 1.5px !important;\n  font-weight: 600 !important; }\n  .essence-btn:hover, .essence-btn:focus {\n    color: #ffffff;\n    background-color: #dc0345; }\n\n/* :: 4.0 Header Area CSS */\n.header_area {\n  position: fixed;\n  z-index: 900;\n  top: 0;\n  left: 0;\n  width: 100%;\n  border-bottom: 1px solid #ebebeb;\n  -webkit-transition-duration: 500ms;\n  transition-duration: 500ms; }\n  @media only screen and (max-width: 767px) {\n    .header_area .classy-nav-container {\n      -ms-flex-wrap: wrap;\n      flex-wrap: wrap; } }\n  @media only screen and (max-width: 767px) {\n    .header_area .classy-nav-container .classy-navbar-toggler {\n      margin-left: auto;\n      margin-right: 15px; } }\n  .header_area .classy-navbar,\n  .header_area .header-meta {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n    min-width: 50%;\n    width: 50%; }\n    @media only screen and (max-width: 767px) {\n      .header_area .classy-navbar,\n      .header_area .header-meta {\n        -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n        flex: 0 0 100%;\n        min-width: 100%;\n        width: 100%; } }\n  .header_area .classy-navbar {\n    height: 85px;\n    padding: 5px 0 5px 5%; }\n    @media only screen and (max-width: 767px) {\n      .header_area .classy-navbar {\n        height: 40px;\n        border-bottom: 1px solid #ebebeb; } }\n  .header_area .header-meta {\n    height: 85px;\n    position: relative;\n    z-index: 1; }\n    @media only screen and (max-width: 767px) {\n      .header_area .header-meta {\n        height: 40px; } }\n  .header_area .classynav ul li a {\n    font-size: 16px;\n    color: #787878; }\n    .header_area .classynav ul li a:hover {\n      color: #000000; }\n  .header_area .classynav ul li .megamenu li a,\n  .header_area .classynav ul li .dropdown li a {\n    font-size: 14px;\n    color: #787878; }\n    .header_area .classynav ul li .megamenu li a:hover,\n    .header_area .classynav ul li .dropdown li a:hover {\n      color: #000000; }\n  .header_area .search-area form {\n    position: relative;\n    z-index: 1;\n    height: 85px;\n    border-left: 1px solid #ebebeb; }\n    @media only screen and (max-width: 767px) {\n      .header_area .search-area form {\n        height: 40px;\n        border-left: none; } }\n    .header_area .search-area form input {\n      border: none;\n      background-color: #ffffff;\n      width: 200px;\n      height: 85px;\n      padding: 0 15px 0 60px;\n      color: #787878;\n      font-size: 14px;\n      font-weight: 500;\n      -webkit-transition-duration: 500ms;\n      transition-duration: 500ms; }\n      @media only screen and (max-width: 767px) {\n        .header_area .search-area form input {\n          width: 170px;\n          height: 40px;\n          padding: 0 10px 0 30px; } }\n      .header_area .search-area form input:focus {\n        outline: none !important;\n        width: 350px; }\n        @media only screen and (min-width: 768px) and (max-width: 991px) {\n          .header_area .search-area form input:focus {\n            width: 300px; } }\n        @media only screen and (max-width: 767px) {\n          .header_area .search-area form input:focus {\n            width: 170px; } }\n        @media only screen and (min-width: 480px) and (max-width: 767px) {\n          .header_area .search-area form input:focus {\n            width: 270px; } }\n        @media only screen and (min-width: 576px) and (max-width: 767px) {\n          .header_area .search-area form input:focus {\n            width: 300px; } }\n    .header_area .search-area form button {\n      position: absolute;\n      z-index: 10;\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n      transform: translateY(-50%);\n      left: 30px;\n      background-color: transparent;\n      border: none;\n      color: #787878;\n      font-size: 14px; }\n      @media only screen and (max-width: 767px) {\n        .header_area .search-area form button {\n          left: 10px;\n          height: 40px; } }\n  .header_area .favourite-area a,\n  .header_area .user-login-info a,\n  .header_area .cart-area a {\n    position: relative;\n    z-index: 1;\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 90px;\n    flex: 0 0 90px;\n    width: 90px;\n    display: block;\n    text-align: center;\n    border-left: 1px solid #ebebeb;\n    height: 100%;\n    line-height: 80px; }\n    @media only screen and (max-width: 767px) {\n      .header_area .favourite-area a,\n      .header_area .user-login-info a,\n      .header_area .cart-area a {\n        -webkit-box-flex: 0;\n        -ms-flex: 0 0 50px;\n        flex: 0 0 50px;\n        width: 50px;\n        line-height: 40px; } }\n    .header_area .favourite-area a img,\n    .header_area .user-login-info a img,\n    .header_area .cart-area a img {\n      max-width: 20px; }\n    .header_area .favourite-area a span,\n    .header_area .user-login-info a span,\n    .header_area .cart-area a span {\n      font-family: \"Ubuntu\", sans-serif;\n      font-size: 18px;\n      color: #0315ff;\n      font-weight: 700;\n      position: absolute;\n      top: -10px; }\n      @media only screen and (max-width: 767px) {\n        .header_area .favourite-area a span,\n        .header_area .user-login-info a span,\n        .header_area .cart-area a span {\n          font-size: 14px; } }\n  .header_area.sticky {\n    position: fixed;\n    z-index: 900;\n    top: 0;\n    left: 0;\n    width: 100%;\n    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.15); }\n\n.cart-bg-overlay.cart-bg-overlay-on {\n  -webkit-transition-duration: 1000ms;\n  transition-duration: 1000ms;\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.4);\n  z-index: 1050; }\n\n/* Cart Area CSS */\n.right-side-cart-area {\n  position: fixed;\n  width: 670px;\n  height: 100%;\n  top: 0;\n  right: -800px;\n  background-color: #ffffff;\n  z-index: 1100;\n  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);\n  -webkit-transition-duration: 800ms;\n  transition-duration: 800ms; }\n  @media only screen and (min-width: 768px) and (max-width: 991px) {\n    .right-side-cart-area {\n      width: 500px;\n      right: -600px; } }\n  @media only screen and (max-width: 767px) {\n    .right-side-cart-area {\n      width: 270px;\n      right: -400px; } }\n  @media only screen and (min-width: 576px) and (max-width: 767px) {\n    .right-side-cart-area {\n      width: 400px;\n      right: -550px; } }\n  .right-side-cart-area.cart-on {\n    right: 0; }\n  .right-side-cart-area .cart-button a {\n    position: absolute;\n    top: 0;\n    right: 100%;\n    z-index: 100;\n    width: 90px;\n    display: block;\n    text-align: center;\n    border-left: 1px solid #ebebeb;\n    height: 85px;\n    line-height: 80px;\n    background-color: #f5f7f9; }\n    @media only screen and (max-width: 767px) {\n      .right-side-cart-area .cart-button a {\n        width: 50px;\n        height: 50px;\n        line-height: 50px; } }\n    .right-side-cart-area .cart-button a img {\n      max-width: 20px; }\n    .right-side-cart-area .cart-button a span {\n      font-family: \"Ubuntu\", sans-serif;\n      font-size: 18px;\n      color: #0315ff;\n      font-weight: 700;\n      position: absolute;\n      top: -10px; }\n  .right-side-cart-area .cart-content {\n    position: relative;\n    z-index: 1;\n    width: 100%;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    height: 100%; }\n    .right-side-cart-area .cart-content .cart-list {\n      position: relative;\n      z-index: 10;\n      -webkit-box-flex: 0;\n      -ms-flex: 0 0 190px;\n      flex: 0 0 190px;\n      width: 190px; }\n      @media only screen and (max-width: 767px) {\n        .right-side-cart-area .cart-content .cart-list {\n          -webkit-box-flex: 0;\n          -ms-flex: 0 0 100px;\n          flex: 0 0 100px;\n          width: 100px; } }\n      @media only screen and (min-width: 576px) and (max-width: 767px) {\n        .right-side-cart-area .cart-content .cart-list {\n          -webkit-box-flex: 0;\n          -ms-flex: 0 0 150px;\n          flex: 0 0 150px;\n          width: 150px; } }\n      .right-side-cart-area .cart-content .cart-list .single-cart-item {\n        position: relative;\n        z-index: 1;\n        -webkit-transition-duration: 500ms;\n        transition-duration: 500ms; }\n        .right-side-cart-area .cart-content .cart-list .single-cart-item .product-image {\n          position: relative;\n          z-index: 1;\n          display: block; }\n          .right-side-cart-area .cart-content .cart-list .single-cart-item .product-image .cart-item-desc {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background-color: rgba(0, 0, 0, 0.6);\n            padding: 50px 15px 15px;\n            -webkit-transition-duration: 500ms;\n            transition-duration: 500ms; }\n            @media only screen and (max-width: 767px) {\n              .right-side-cart-area .cart-content .cart-list .single-cart-item .product-image .cart-item-desc {\n                padding: 5px; } }\n            @media only screen and (min-width: 576px) and (max-width: 767px) {\n              .right-side-cart-area .cart-content .cart-list .single-cart-item .product-image .cart-item-desc {\n                padding: 30px 20px; } }\n            .right-side-cart-area .cart-content .cart-list .single-cart-item .product-image .cart-item-desc .product-remove {\n              position: absolute;\n              top: 15px;\n              right: 15px;\n              color: #ffffff;\n              font-size: 12px;\n              padding: 5px; }\n              @media only screen and (max-width: 767px) {\n                .right-side-cart-area .cart-content .cart-list .single-cart-item .product-image .cart-item-desc .product-remove {\n                  top: 5px;\n                  right: 5px; } }\n            .right-side-cart-area .cart-content .cart-list .single-cart-item .product-image .cart-item-desc .badge {\n              display: block;\n              font-weight: 600;\n              font-size: 10px;\n              color: rgba(255, 255, 255, 0.5);\n              text-transform: uppercase;\n              margin-bottom: 5px;\n              text-align: left;\n              padding: 0; }\n            .right-side-cart-area .cart-content .cart-list .single-cart-item .product-image .cart-item-desc h6 {\n              font-size: 12px;\n              color: #ffffff;\n              text-transform: capitalize;\n              margin-bottom: 30px; }\n              @media only screen and (max-width: 767px) {\n                .right-side-cart-area .cart-content .cart-list .single-cart-item .product-image .cart-item-desc h6 {\n                  margin-bottom: 10px; } }\n            .right-side-cart-area .cart-content .cart-list .single-cart-item .product-image .cart-item-desc .size,\n            .right-side-cart-area .cart-content .cart-list .single-cart-item .product-image .cart-item-desc .color {\n              display: block;\n              font-weight: 600;\n              font-size: 10px;\n              color: rgba(255, 255, 255, 0.5);\n              text-transform: uppercase;\n              margin-bottom: 5px;\n              line-height: 1; }\n            .right-side-cart-area .cart-content .cart-list .single-cart-item .product-image .cart-item-desc .price {\n              font-family: \"Ubuntu\", sans-serif;\n              font-size: 16px;\n              font-weight: 700;\n              margin-bottom: 0;\n              margin-top: 30px;\n              color: #ffffff; }\n              @media only screen and (max-width: 767px) {\n                .right-side-cart-area .cart-content .cart-list .single-cart-item .product-image .cart-item-desc .price {\n                  margin-top: 10px;\n                  font-size: 12px; } }\n        .right-side-cart-area .cart-content .cart-list .single-cart-item:hover .product-image .cart-item-desc {\n          background-color: rgba(0, 0, 0, 0.8); }\n    .right-side-cart-area .cart-content .cart-amount-summary {\n      padding: 100px 10%;\n      position: relative;\n      z-index: 10;\n      -webkit-box-flex: 0;\n      -ms-flex: 0 0 calc(100% - 190px);\n      flex: 0 0 calc(100% - 190px);\n      width: calc(100% - 190px); }\n      @media only screen and (max-width: 767px) {\n        .right-side-cart-area .cart-content .cart-amount-summary {\n          -webkit-box-flex: 0;\n          -ms-flex: 0 0 calc(100% - 100px);\n          flex: 0 0 calc(100% - 100px);\n          width: calc(100% - 100px);\n          padding: 50px 15px; } }\n      @media only screen and (min-width: 576px) and (max-width: 767px) {\n        .right-side-cart-area .cart-content .cart-amount-summary {\n          -webkit-box-flex: 0;\n          -ms-flex: 0 0 calc(100% - 150px);\n          flex: 0 0 calc(100% - 150px);\n          width: calc(100% - 150px);\n          padding: 50px 30px; } }\n      .right-side-cart-area .cart-content .cart-amount-summary h2 {\n        font-size: 30px;\n        margin-bottom: 100px; }\n        @media only screen and (max-width: 767px) {\n          .right-side-cart-area .cart-content .cart-amount-summary h2 {\n            font-size: 24px;\n            margin-bottom: 30px; } }\n        @media only screen and (max-width: 767px) {\n          .right-side-cart-area .cart-content .cart-amount-summary h2 {\n            font-size: 30px;\n            margin-bottom: 50px; } }\n      .right-side-cart-area .cart-content .cart-amount-summary .summary-table li {\n        margin-bottom: 20px;\n        color: #000000;\n        font-size: 14px;\n        letter-spacing: 0.75px;\n        text-transform: uppercase;\n        font-weight: 600;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n        justify-content: space-between; }\n        @media only screen and (max-width: 767px) {\n          .right-side-cart-area .cart-content .cart-amount-summary .summary-table li {\n            font-size: 12px;\n            margin-bottom: 10px; } }\n        @media only screen and (min-width: 576px) and (max-width: 767px) {\n          .right-side-cart-area .cart-content .cart-amount-summary .summary-table li {\n            font-size: 14px;\n            margin-bottom: 15px; } }\n        .right-side-cart-area .cart-content .cart-amount-summary .summary-table li span:last-child {\n          font-weight: 700;\n          font-family: \"Ubuntu\", sans-serif; }\n      @media only screen and (max-width: 767px) {\n        .right-side-cart-area .cart-content .cart-amount-summary .essence-btn {\n          min-width: 140px;\n          width: 140px;\n          padding: 0 15px; } }\n\n/* :: 5.0 Welcome Area CSS */\n.welcome_area {\n  position: relative;\n  z-index: 1;\n  width: 100%;\n  height: 600px; }\n  @media only screen and (min-width: 768px) and (max-width: 991px) {\n    .welcome_area {\n      height: 450px; } }\n  @media only screen and (max-width: 767px) {\n    .welcome_area {\n      height: 350px; } }\n  .welcome_area .hero-content h6 {\n    font-size: 18px;\n    color: #787878;\n    margin-bottom: 10px; }\n  .welcome_area .hero-content h2 {\n    font-size: 60px;\n    color: #000000;\n    margin-bottom: 50px; }\n    @media only screen and (min-width: 768px) and (max-width: 991px) {\n      .welcome_area .hero-content h2 {\n        font-size: 48px; } }\n    @media only screen and (max-width: 767px) {\n      .welcome_area .hero-content h2 {\n        font-size: 30px; } }\n\n/* :: 6.0 Top Catagory Area CSS */\n.single_catagory_area {\n  position: relative;\n  z-index: 1;\n  width: 100%;\n  height: 240px;\n  -webkit-transition-duration: 500ms;\n  transition-duration: 500ms; }\n  @media only screen and (min-width: 768px) and (max-width: 991px) {\n    .single_catagory_area {\n      height: 180px; } }\n  @media only screen and (max-width: 767px) {\n    .single_catagory_area {\n      height: 180px; } }\n  @media only screen and (min-width: 576px) and (max-width: 767px) {\n    .single_catagory_area {\n      margin-bottom: 30px; } }\n  .single_catagory_area:after {\n    -webkit-transition-duration: 500ms;\n    transition-duration: 500ms;\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    background-color: rgba(255, 255, 255, 0.6);\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: -10; }\n  .single_catagory_area .catagory-content a {\n    display: block;\n    font-size: 30px;\n    font-weight: 700;\n    color: #000000;\n    letter-spacing: 1px;\n    text-transform: uppercase; }\n    @media only screen and (min-width: 768px) and (max-width: 991px) {\n      .single_catagory_area .catagory-content a {\n        font-size: 20px; } }\n    @media only screen and (max-width: 767px) {\n      .single_catagory_area .catagory-content a {\n        font-size: 18px; } }\n  .single_catagory_area:hover .catagory-content a {\n    color: #0315ff; }\n\n/* :: 7.0 CTA Area CSS */\n.cta-area {\n  position: relative;\n  z-index: 1; }\n  .cta-area .cta-content {\n    width: 100%;\n    height: 550px; }\n    @media only screen and (max-width: 767px) {\n      .cta-area .cta-content {\n        height: 400px; } }\n    .cta-area .cta-content h6 {\n      font-size: 24px;\n      color: #dc0345;\n      margin-bottom: 10px; }\n    .cta-area .cta-content h2 {\n      font-size: 60px;\n      color: #000000;\n      margin-bottom: 50px; }\n      @media only screen and (min-width: 768px) and (max-width: 991px) {\n        .cta-area .cta-content h2 {\n          font-size: 48px; } }\n      @media only screen and (max-width: 767px) {\n        .cta-area .cta-content h2 {\n          font-size: 30px; } }\n    .cta-area .cta-content .cta--text {\n      padding-right: 150px; }\n      @media only screen and (min-width: 768px) and (max-width: 991px) {\n        .cta-area .cta-content .cta--text {\n          padding-right: 50px; } }\n      @media only screen and (max-width: 767px) {\n        .cta-area .cta-content .cta--text {\n          padding-right: 0; } }\n\n/* :: 8.0 Popular Products Area CSS */\n.single-product-wrapper {\n  position: relative;\n  z-index: 1;\n  margin-bottom: 50px;\n  overflow: hidden;\n  background-color: #ffffff; }\n  .single-product-wrapper .product-img {\n    position: relative;\n    z-index: 1;\n    overflow: hidden; }\n    .single-product-wrapper .product-img img {\n      width: 100%;\n      -webkit-transition-duration: 500ms;\n      transition-duration: 500ms; }\n    .single-product-wrapper .product-img .hover-img {\n      -webkit-transition-duration: 500ms;\n      transition-duration: 500ms;\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      z-index: 10;\n      opacity: 0;\n      visibility: hidden; }\n    .single-product-wrapper .product-img .product-badge {\n      height: 25px;\n      background-color: #000000;\n      color: #ffffff;\n      font-family: \"Ubuntu\", sans-serif;\n      font-weight: 700;\n      font-size: 12px;\n      padding: 0 10px;\n      display: inline-block;\n      line-height: 25px;\n      position: absolute;\n      top: 20px;\n      left: 20px;\n      z-index: 10; }\n      .single-product-wrapper .product-img .product-badge.offer-badge {\n        background-color: #dc0345; }\n      .single-product-wrapper .product-img .product-badge.new-badge {\n        background-color: #0315ff; }\n    .single-product-wrapper .product-img .product-favourite a {\n      position: absolute;\n      height: 25px;\n      width: 45px;\n      font-size: 14px;\n      color: #ccc;\n      top: 20px;\n      right: 20px;\n      z-index: 10;\n      line-height: 25px;\n      background-color: #ffffff;\n      box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);\n      text-align: center;\n      opacity: 0;\n      visibility: hidden; }\n      .single-product-wrapper .product-img .product-favourite a.active {\n        opacity: 1;\n        visibility: visible; }\n  .single-product-wrapper .product-description {\n    position: relative;\n    z-index: 1;\n    padding-top: 25px; }\n    .single-product-wrapper .product-description span {\n      font-size: 10px;\n      text-transform: uppercase;\n      color: #787878;\n      margin-bottom: 15px;\n      letter-spacing: 0.75px;\n      font-weight: 600; }\n    .single-product-wrapper .product-description h6 {\n      color: #222222;\n      margin-bottom: 5px; }\n    .single-product-wrapper .product-description p {\n      margin-bottom: 0;\n      font-size: 14px;\n      font-family: \"Ubuntu\", sans-serif;\n      font-weight: 700;\n      color: #000000; }\n      .single-product-wrapper .product-description p span {\n        font-size: 14px;\n        font-family: \"Ubuntu\", sans-serif;\n        font-weight: 700;\n        color: #aaaaaa;\n        margin-right: 10px;\n        text-decoration: line-through; }\n    .single-product-wrapper .product-description .hover-content {\n      position: absolute;\n      width: calc(100% - 40px);\n      top: -70px;\n      left: 20px;\n      right: 20px;\n      opacity: 0;\n      visibility: hidden;\n      -webkit-transition-duration: 500ms;\n      transition-duration: 500ms; }\n      .single-product-wrapper .product-description .hover-content .essence-btn {\n        width: 100%; }\n  .single-product-wrapper .favme {\n    cursor: pointer;\n    color: #ccc; }\n    .single-product-wrapper .favme.active {\n      color: #dc0345 !important; }\n    .single-product-wrapper .favme.is_animating {\n      animation: favme-anime .5s; }\n  .single-product-wrapper:hover .product-img .hover-img {\n    opacity: 1;\n    visibility: visible; }\n  .single-product-wrapper:hover .product-img .product-favourite a {\n    opacity: 1;\n    visibility: visible; }\n  .single-product-wrapper:hover .hover-content {\n    opacity: 1;\n    visibility: visible; }\n\n@keyframes favme-anime {\n  0% {\n    opacity: 1;\n    font-size: 14px;\n    -webkit-text-stroke-color: transparent; }\n  25% {\n    opacity: .6;\n    color: #ffffff;\n    font-size: 15px;\n    -webkit-text-stroke-width: 1px;\n    -webkit-text-stroke-color: #dc0345; }\n  75% {\n    opacity: .6;\n    color: #ffffff;\n    font-size: 15px;\n    -webkit-text-stroke-width: 1px;\n    -webkit-text-stroke-color: #dc0345; }\n  100% {\n    opacity: 1;\n    font-size: 14px;\n    -webkit-text-stroke-color: transparent; } }\n\n.pagination {\n  position: relative;\n  z-index: 1; }\n  .pagination .page-item .page-link {\n    width: 40px;\n    height: 40px;\n    border: 1px solid #ebebeb;\n    font-size: 12px;\n    font-weight: 600;\n    line-height: 38px;\n    padding: 0;\n    text-align: center;\n    color: #787878; }\n    .pagination .page-item .page-link:hover, .pagination .page-item .page-link:focus {\n      color: #0315ff;\n      box-shadow: none; }\n  .pagination .page-item:first-child {\n    margin-right: 15px; }\n    .pagination .page-item:first-child .page-link {\n      margin-left: 0;\n      border-top-left-radius: 0;\n      border-bottom-left-radius: 0; }\n  .pagination .page-item:last-child {\n    margin-left: 15px; }\n    .pagination .page-item:last-child .page-link {\n      margin-left: 0;\n      border-top-right-radius: 0;\n      border-bottom-right-radius: 0; }\n\n/* :: 9.0 Brands Area CSS */\n.brands-area {\n  position: relative;\n  z-index: 1;\n  background-color: #f5f7f9;\n  padding: 100px 5%; }\n  @media only screen and (max-width: 767px) {\n    .brands-area {\n      -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n      padding: 100px 5% 70px; } }\n  @media only screen and (max-width: 767px) {\n    .brands-area .single-brands-logo {\n      -webkit-box-flex: 0;\n      -ms-flex: 0 0 33.33333%;\n      flex: 0 0 33.33333%;\n      width: 33.33333%;\n      max-width: 33.33333%; } }\n  .brands-area .single-brands-logo img {\n    max-width: 120px; }\n    @media only screen and (min-width: 768px) and (max-width: 991px) {\n      .brands-area .single-brands-logo img {\n        max-width: 90px; } }\n    @media only screen and (max-width: 767px) {\n      .brands-area .single-brands-logo img {\n        max-width: 80px;\n        margin-bottom: 30px; } }\n\n/* :: 10.0 Single Product Details Area CSS */\n.single_product_details_area {\n  position: relative;\n  z-index: 100;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap; }\n  .single_product_details_area .single_product_thumb,\n  .single_product_details_area .single_product_desc {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n    max-width: 50%;\n    width: 50%;\n    position: relative;\n    z-index: 1; }\n    @media only screen and (max-width: 767px) {\n      .single_product_details_area .single_product_thumb,\n      .single_product_details_area .single_product_desc {\n        -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n        flex: 0 0 100%;\n        max-width: 100%;\n        width: 100%; } }\n  .single_product_details_area .product_thumbnail_slides {\n    position: relative;\n    z-index: 1; }\n    .single_product_details_area .product_thumbnail_slides .owl-prev,\n    .single_product_details_area .product_thumbnail_slides .owl-next {\n      -webkit-transition-duration: 500ms;\n      transition-duration: 500ms;\n      position: absolute;\n      top: 50%;\n      z-index: 20;\n      left: 30px;\n      width: 40px;\n      height: 40px;\n      margin-top: -20px;\n      padding: 5px;\n      opacity: 0.4; }\n      .single_product_details_area .product_thumbnail_slides .owl-prev:hover,\n      .single_product_details_area .product_thumbnail_slides .owl-next:hover {\n        opacity: 1; }\n    .single_product_details_area .product_thumbnail_slides .owl-next {\n      left: auto;\n      right: 30px; }\n  .single_product_details_area .single_product_desc {\n    position: relative;\n    z-index: 1;\n    padding: 50px 5%; }\n    @media only screen and (min-width: 992px) and (max-width: 1199px) {\n      .single_product_details_area .single_product_desc {\n        padding: 30px 4%; } }\n    @media only screen and (min-width: 768px) and (max-width: 991px) {\n      .single_product_details_area .single_product_desc {\n        padding: 30px 3%; } }\n    .single_product_details_area .single_product_desc span {\n      font-size: 14px;\n      text-transform: uppercase;\n      font-weight: 600;\n      color: #787878;\n      margin-bottom: 10px;\n      display: block; }\n    .single_product_details_area .single_product_desc a > h2 {\n      font-size: 30px;\n      display: block;\n      margin-bottom: 10px; }\n      @media only screen and (min-width: 992px) and (max-width: 1199px) {\n        .single_product_details_area .single_product_desc a > h2 {\n          font-size: 24px; } }\n      @media only screen and (min-width: 768px) and (max-width: 991px) {\n        .single_product_details_area .single_product_desc a > h2 {\n          font-size: 20px; } }\n    .single_product_details_area .single_product_desc .product-price {\n      margin-bottom: 0;\n      font-family: \"Ubuntu\", sans-serif;\n      font-size: 24px;\n      color: #dc0345;\n      font-weight: 700; }\n      @media only screen and (min-width: 768px) and (max-width: 991px) {\n        .single_product_details_area .single_product_desc .product-price {\n          font-size: 20px; } }\n      .single_product_details_area .single_product_desc .product-price span {\n        display: inline-block;\n        font-family: \"Ubuntu\", sans-serif;\n        font-size: 24px;\n        color: #787878;\n        font-weight: 700;\n        text-decoration: line-through;\n        margin-right: 15px; }\n    .single_product_details_area .single_product_desc .product-desc {\n      font-size: 16px; }\n      @media only screen and (min-width: 768px) and (max-width: 991px) {\n        .single_product_details_area .single_product_desc .product-desc {\n          font-size: 14px; } }\n    .single_product_details_area .single_product_desc .nice-select {\n      position: relative;\n      z-index: 100;\n      border: 1px solid #ebebeb;\n      border-radius: 0;\n      font-size: 14px;\n      font-weight: 500;\n      height: 60px;\n      line-height: 60;\n      margin: 0;\n      text-transform: uppercase;\n      width: 220px; }\n      .single_product_details_area .single_product_desc .nice-select .current {\n        line-height: 60px; }\n      .single_product_details_area .single_product_desc .nice-select .list {\n        background-color: #f6f6f6;\n        border-radius: 0;\n        border: none;\n        width: 100%; }\n        .single_product_details_area .single_product_desc .nice-select .list .option.selected {\n          color: #0315ff; }\n    .single_product_details_area .single_product_desc .cart-fav-box .favme {\n      cursor: pointer;\n      color: #ccc;\n      font-size: 24px; }\n      .single_product_details_area .single_product_desc .cart-fav-box .favme.active {\n        color: #dc0345 !important; }\n\n/* :: 11.0 Footer Area CSS */\n.footer_area {\n  position: relative;\n  z-index: 1;\n  background-color: #252525;\n  padding: 70px 0 60px; }\n  .footer_area .single_widget_area .footer_menu ul {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n    .footer_area .single_widget_area .footer_menu ul li a {\n      font-size: 16px;\n      color: rgba(255, 255, 255, 0.6);\n      display: block;\n      font-weight: 400;\n      font-family: \"Ubuntu\", sans-serif;\n      padding: 0 10px;\n      text-transform: capitalize; }\n      .footer_area .single_widget_area .footer_menu ul li a:hover, .footer_area .single_widget_area .footer_menu ul li a:focus {\n        color: #ffffff; }\n  .footer_area .single_widget_area .footer_widget_menu {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap; }\n    .footer_area .single_widget_area .footer_widget_menu li {\n      -webkit-box-flex: 0;\n      -ms-flex: 0 0 50%;\n      flex: 0 0 50%;\n      width: 50%; }\n      .footer_area .single_widget_area .footer_widget_menu li a {\n        display: block;\n        font-size: 12px;\n        color: rgba(255, 255, 255, 0.6);\n        display: block;\n        font-weight: 400;\n        margin-bottom: 10px; }\n        .footer_area .single_widget_area .footer_widget_menu li a:hover, .footer_area .single_widget_area .footer_widget_menu li a:focus {\n          color: #ffffff; }\n  .footer_area .single_widget_area .footer_heading h6 {\n    color: #ffffff;\n    font-size: 12px;\n    text-transform: uppercase;\n    margin-bottom: 0; }\n  .footer_area .single_widget_area .subscribtion_form form {\n    position: relative;\n    z-index: 1;\n    width: 270px; }\n    @media only screen and (max-width: 767px) {\n      .footer_area .single_widget_area .subscribtion_form form {\n        margin-bottom: 50px; } }\n    .footer_area .single_widget_area .subscribtion_form form input {\n      width: 100%;\n      border: none;\n      border-bottom: 2px solid rgba(255, 255, 255, 0.6);\n      color: rgba(255, 255, 255, 0.6);\n      font-size: 12px;\n      height: 35px;\n      background-color: transparent; }\n      .footer_area .single_widget_area .subscribtion_form form input:focus {\n        border-bottom-color: #ffffff;\n        color: #ffffff; }\n    .footer_area .single_widget_area .subscribtion_form form button {\n      width: 30px;\n      height: 35px;\n      border: none;\n      background-color: transparent;\n      color: rgba(255, 255, 255, 0.6);\n      position: absolute;\n      top: 0;\n      right: 0;\n      text-align: center;\n      z-index: 10; }\n  .footer_area .single_widget_area .footer_social_area a {\n    color: #ffffff;\n    display: inline-block;\n    padding: 0 10px;\n    font-size: 16px; }\n\n/* :: 12.0 Breadcumb Area CSS */\n.breadcumb_area {\n  position: relative;\n  z-index: 1;\n  width: 100%;\n  height: 140px; }\n  .breadcumb_area:after {\n    background-color: rgba(255, 255, 255, 0.9);\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    left: 0;\n    top: 0;\n    z-index: -5;\n    content: ''; }\n  .breadcumb_area .page-title h2 {\n    font-size: 30px;\n    text-transform: uppercase;\n    font-weight: 700;\n    font-family: \"Ubuntu\", sans-serif;\n    letter-spacing: 1px;\n    margin-bottom: 0; }\n  .breadcumb_area.breadcumb-style-two {\n    width: 100%;\n    height: 390px; }\n    @media only screen and (min-width: 768px) and (max-width: 991px) {\n      .breadcumb_area.breadcumb-style-two {\n        height: 300px; } }\n    @media only screen and (max-width: 767px) {\n      .breadcumb_area.breadcumb-style-two {\n        height: 250px; } }\n    .breadcumb_area.breadcumb-style-two .page-title h2 {\n      font-size: 72px;\n      text-transform: uppercase;\n      font-weight: 700;\n      font-family: \"Ubuntu\", sans-serif;\n      letter-spacing: 1px;\n      margin-bottom: 0;\n      color: #0315ff; }\n      @media only screen and (min-width: 768px) and (max-width: 991px) {\n        .breadcumb_area.breadcumb-style-two .page-title h2 {\n          font-size: 48px; } }\n      @media only screen and (max-width: 767px) {\n        .breadcumb_area.breadcumb-style-two .page-title h2 {\n          font-size: 30px; } }\n\n/* :: 13.0 Product Sidebar Area CSS */\n.widget {\n  position: relative;\n  z-index: 1; }\n  .widget .widget-title {\n    font-size: 18px;\n    text-transform: capitalize;\n    font-weight: 600; }\n  .widget .widget-title2 {\n    text-transform: uppercase;\n    font-size: 12px;\n    margin-bottom: 15px;\n    display: block;\n    margin-bottom: 0;\n    color: #000000;\n    font-weight: 600; }\n  .widget .catagories-menu li > a {\n    text-transform: uppercase;\n    font-size: 12px;\n    margin-bottom: 15px;\n    display: block; }\n  .widget .catagories-menu .sub-menu {\n    margin-left: 15px;\n    margin-bottom: 15px; }\n    .widget .catagories-menu .sub-menu li > a {\n      text-transform: capitalize;\n      font-size: 14px;\n      margin-bottom: 5px;\n      display: block;\n      font-weight: 300;\n      color: #787878; }\n      .widget .catagories-menu .sub-menu li > a:hover {\n        color: #0315ff; }\n  .widget.price .ui-slider-handle {\n    background-color: #000000;\n    border: none;\n    border-radius: 0;\n    top: -6px;\n    width: 4px;\n    height: 15px;\n    margin: 0; }\n  .widget.price .ui-slider-range.ui-corner-all.ui-widget-header {\n    background-color: #0315ff; }\n  .widget.price .ui-slider-horizontal {\n    height: 5px; }\n  .widget.price .range-price {\n    font-size: 12px;\n    font-weight: 600;\n    margin-top: 15px;\n    text-transform: uppercase; }\n  .widget.color .widget-desc ul {\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap; }\n    .widget.color .widget-desc ul li {\n      -webkit-box-flex: 0;\n      -ms-flex: 0 0 20%;\n      flex: 0 0 20%;\n      width: 20%;\n      margin-bottom: 15px; }\n      .widget.color .widget-desc ul li a {\n        width: 30px;\n        height: 30px;\n        display: block;\n        background-color: #ffffff;\n        position: relative;\n        z-index: 1;\n        box-shadow: 0 0 3px rgba(0, 0, 0, 0.15); }\n        .widget.color .widget-desc ul li a.color1 {\n          background-color: #ffffff; }\n        .widget.color .widget-desc ul li a.color2 {\n          background-color: #969696; }\n        .widget.color .widget-desc ul li a.color3 {\n          background-color: #030303; }\n        .widget.color .widget-desc ul li a.color4 {\n          background-color: #0315ff; }\n        .widget.color .widget-desc ul li a.color5 {\n          background-color: #dc0647; }\n        .widget.color .widget-desc ul li a.color6 {\n          background-color: #fff56a; }\n        .widget.color .widget-desc ul li a.color7 {\n          background-color: #f26e51; }\n        .widget.color .widget-desc ul li a.color8 {\n          background-color: #9a8777; }\n        .widget.color .widget-desc ul li a.color9 {\n          background-color: #5b862a; }\n        .widget.color .widget-desc ul li a.color10 {\n          background-color: #8662a9; }\n  .widget.brands ul li {\n    display: block; }\n    .widget.brands ul li a {\n      display: block;\n      margin-bottom: 5px;\n      font-size: 14px;\n      color: #787878;\n      font-weight: 300;\n      text-transform: capitalize; }\n      .widget.brands ul li a:hover {\n        color: #0315ff; }\n\n.product-topbar {\n  position: relative;\n  z-index: 100;\n  margin-bottom: 40px; }\n  .product-topbar .total-products p {\n    margin-bottom: 0;\n    font-size: 12px;\n    font-weight: 600;\n    color: #000000;\n    text-transform: uppercase;\n    letter-spacing: 0.75px; }\n    .product-topbar .total-products p span {\n      color: #0315ff; }\n  .product-topbar .product-sorting p {\n    margin-bottom: 0;\n    font-size: 12px;\n    font-weight: 600;\n    color: #000000;\n    text-transform: uppercase;\n    letter-spacing: 0.75px;\n    margin-right: 15px; }\n  .product-topbar .product-sorting form select {\n    background-color: transparent;\n    border: none; }\n    .product-topbar .product-sorting form select option {\n      font-size: 12px;\n      font-weight: 600;\n      color: #000000;\n      text-transform: uppercase;\n      letter-spacing: 0.75px; }\n  .product-topbar .nice-select {\n    border: none;\n    font-size: 14px;\n    font-weight: 500;\n    height: auto;\n    line-height: 1.5;\n    padding-left: 0;\n    margin: 0;\n    text-transform: uppercase; }\n    .product-topbar .nice-select .list {\n      background-color: #f6f6f6;\n      border-radius: 0;\n      border: none; }\n      .product-topbar .nice-select .list .option.selected {\n        color: #0315ff; }\n\n/* :: 14.0 Checkout Area CSS */\n.checkout_details_area form label {\n  font-size: 12px;\n  text-transform: uppercase;\n  font-weight: 600; }\n  .checkout_details_area form label span {\n    color: #0315ff; }\n\n.checkout_details_area form .form-control {\n  height: 42px;\n  border: 1px solid #ebebeb;\n  background-color: transparent;\n  border-radius: 0; }\n\n.checkout_details_area form .nice-select {\n  border-radius: 0;\n  border: 1px solid #ebebeb; }\n  .checkout_details_area form .nice-select .list {\n    width: 100%;\n    border-radius: 0; }\n\n.order-details-confirmation {\n  width: 100%;\n  border: 2px solid #ebebeb;\n  padding: 40px; }\n  @media only screen and (max-width: 767px) {\n    .order-details-confirmation {\n      margin-top: 100px;\n      padding: 20px; } }\n  .order-details-confirmation .order-details-form li {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    -ms-grid-row-align: center;\n    align-items: center;\n    -webkit-box-pack: justify;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    margin-bottom: 0;\n    font-size: 12px;\n    text-transform: uppercase;\n    padding: 20px 0;\n    border-bottom: 2px solid #ebebeb;\n    font-weight: 600; }\n  .order-details-confirmation .card-header h6 a {\n    display: block;\n    font-size: 14px;\n    text-transform: uppercase; }\n    .order-details-confirmation .card-header h6 a i {\n      color: #9f9f9f; }\n  .order-details-confirmation .card {\n    border: none; }\n  .order-details-confirmation .card-header {\n    background-color: transparent;\n    border-bottom: none; }\n  .order-details-confirmation .card-body p {\n    font-size: 12px;\n    line-height: 2;\n    color: #9f9f9f; }\n\n/* :: 15.0 Blog Area CSS */\n.blog-wrapper {\n  position: relative;\n  z-index: 1; }\n  .blog-wrapper .single-blog-area {\n    position: relative;\n    z-index: 1;\n    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);\n    -webkit-transition-duration: 500ms;\n    transition-duration: 500ms;\n    overflow: hidden; }\n    .blog-wrapper .single-blog-area img {\n      width: 100%;\n      -webkit-transition-duration: 500ms;\n      transition-duration: 500ms; }\n    .blog-wrapper .single-blog-area .post-title {\n      -webkit-transition-duration: 500ms;\n      transition-duration: 500ms;\n      background-color: #ffffff;\n      padding: 20px 40px;\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      width: 85%;\n      height: auto;\n      z-index: 10; }\n      @media only screen and (max-width: 767px) {\n        .blog-wrapper .single-blog-area .post-title {\n          padding: 20px; } }\n      .blog-wrapper .single-blog-area .post-title a {\n        display: block;\n        font-size: 18px;\n        font-weight: 600;\n        line-height: 1.5; }\n        @media only screen and (max-width: 767px) {\n          .blog-wrapper .single-blog-area .post-title a {\n            font-size: 14px; } }\n        @media only screen and (min-width: 576px) and (max-width: 767px) {\n          .blog-wrapper .single-blog-area .post-title a {\n            font-size: 18px; } }\n    .blog-wrapper .single-blog-area .hover-content {\n      -webkit-transition-duration: 500ms;\n      transition-duration: 500ms;\n      background-color: #ffffff;\n      background-color: #ffffff;\n      padding: 20px 40px;\n      position: absolute;\n      width: 85%;\n      height: 100%;\n      z-index: 100;\n      top: 0;\n      left: 0;\n      opacity: 0;\n      visibility: hidden; }\n      @media only screen and (min-width: 992px) and (max-width: 1199px) {\n        .blog-wrapper .single-blog-area .hover-content {\n          padding: 20px; } }\n      @media only screen and (max-width: 767px) {\n        .blog-wrapper .single-blog-area .hover-content {\n          padding: 20px; } }\n      .blog-wrapper .single-blog-area .hover-content .hover-post-title a {\n        display: block;\n        font-size: 18px;\n        font-weight: 600;\n        line-height: 1.5;\n        margin-bottom: 20px; }\n        @media only screen and (min-width: 992px) and (max-width: 1199px) {\n          .blog-wrapper .single-blog-area .hover-content .hover-post-title a {\n            font-size: 16px;\n            margin-bottom: 10px; } }\n        @media only screen and (max-width: 767px) {\n          .blog-wrapper .single-blog-area .hover-content .hover-post-title a {\n            font-size: 14px;\n            margin-bottom: 10px; } }\n        @media only screen and (min-width: 576px) and (max-width: 767px) {\n          .blog-wrapper .single-blog-area .hover-content .hover-post-title a {\n            font-size: 18px;\n            margin-bottom: 20px; } }\n        .blog-wrapper .single-blog-area .hover-content .hover-post-title a:hover {\n          color: #0315ff; }\n      @media only screen and (max-width: 767px) {\n        .blog-wrapper .single-blog-area .hover-content p {\n          display: none; } }\n      @media only screen and (min-width: 480px) and (max-width: 767px) {\n        .blog-wrapper .single-blog-area .hover-content p {\n          display: block;\n          font-size: 14px;\n          line-height: 1.7; } }\n      .blog-wrapper .single-blog-area .hover-content > a {\n        display: block;\n        font-size: 12px;\n        font-weight: 600;\n        margin-bottom: 0;\n        color: #0315ff;\n        letter-spacing: 1.5px;\n        text-transform: uppercase;\n        margin-top: 50px; }\n        @media only screen and (min-width: 992px) and (max-width: 1199px) {\n          .blog-wrapper .single-blog-area .hover-content > a {\n            margin-top: 15px; } }\n        @media only screen and (max-width: 767px) {\n          .blog-wrapper .single-blog-area .hover-content > a {\n            margin-top: 30px; } }\n    .blog-wrapper .single-blog-area:hover .hover-content, .blog-wrapper .single-blog-area:focus .hover-content {\n      opacity: 1;\n      visibility: visible; }\n    .blog-wrapper .single-blog-area:hover img, .blog-wrapper .single-blog-area:focus img {\n      -webkit-transform: scale(1.1);\n      transform: scale(1.1); }\n\n.single-blog-wrapper {\n  position: relative;\n  z-index: 1; }\n  .single-blog-wrapper .single-blog-content-wrapper {\n    position: relative;\n    z-index: 1;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap; }\n    .single-blog-wrapper .single-blog-content-wrapper .single-blog--text {\n      -webkit-box-flex: 0;\n      -ms-flex: 0 0 75%;\n      flex: 0 0 75%;\n      max-width: 75%;\n      width: 75%;\n      padding: 70px 7%; }\n      @media only screen and (min-width: 992px) and (max-width: 1199px) {\n        .single-blog-wrapper .single-blog-content-wrapper .single-blog--text {\n          -webkit-box-flex: 0;\n          -ms-flex: 0 0 65%;\n          flex: 0 0 65%;\n          max-width: 65%;\n          width: 65%; } }\n      @media only screen and (min-width: 768px) and (max-width: 991px) {\n        .single-blog-wrapper .single-blog-content-wrapper .single-blog--text {\n          -webkit-box-flex: 0;\n          -ms-flex: 0 0 60%;\n          flex: 0 0 60%;\n          max-width: 60%;\n          width: 60%; } }\n      @media only screen and (max-width: 767px) {\n        .single-blog-wrapper .single-blog-content-wrapper .single-blog--text {\n          -webkit-box-flex: 0;\n          -ms-flex: 0 0 100%;\n          flex: 0 0 100%;\n          max-width: 100%;\n          width: 100%; } }\n      .single-blog-wrapper .single-blog-content-wrapper .single-blog--text h2 {\n        font-size: 30px;\n        line-height: 1.5;\n        margin-bottom: 50px; }\n        @media only screen and (min-width: 992px) and (max-width: 1199px) {\n          .single-blog-wrapper .single-blog-content-wrapper .single-blog--text h2 {\n            font-size: 24px;\n            margin-bottom: 30px; } }\n        @media only screen and (min-width: 768px) and (max-width: 991px) {\n          .single-blog-wrapper .single-blog-content-wrapper .single-blog--text h2 {\n            font-size: 20px;\n            margin-bottom: 20px; } }\n        @media only screen and (max-width: 767px) {\n          .single-blog-wrapper .single-blog-content-wrapper .single-blog--text h2 {\n            font-size: 18px;\n            margin-bottom: 20px; } }\n        @media only screen and (min-width: 576px) and (max-width: 767px) {\n          .single-blog-wrapper .single-blog-content-wrapper .single-blog--text h2 {\n            font-size: 24px; } }\n      .single-blog-wrapper .single-blog-content-wrapper .single-blog--text p {\n        font-size: 18px;\n        font-weight: 300;\n        margin-bottom: 50px; }\n        @media only screen and (min-width: 768px) and (max-width: 991px) {\n          .single-blog-wrapper .single-blog-content-wrapper .single-blog--text p {\n            font-size: 16px; } }\n        @media only screen and (max-width: 767px) {\n          .single-blog-wrapper .single-blog-content-wrapper .single-blog--text p {\n            font-size: 14px; } }\n      .single-blog-wrapper .single-blog-content-wrapper .single-blog--text blockquote {\n        margin-bottom: 50px; }\n        .single-blog-wrapper .single-blog-content-wrapper .single-blog--text blockquote h6 {\n          font-size: 18px;\n          line-height: 2;\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex; }\n          .single-blog-wrapper .single-blog-content-wrapper .single-blog--text blockquote h6 i {\n            margin-right: 30px;\n            font-size: 30px;\n            color: #0315ff; }\n        .single-blog-wrapper .single-blog-content-wrapper .single-blog--text blockquote span {\n          margin-left: 60px;\n          font-size: 16px;\n          font-weight: 600;\n          color: rgba(0, 0, 0, 0.6); }\n    .single-blog-wrapper .single-blog-content-wrapper .related-blog-post {\n      -webkit-box-flex: 0;\n      -ms-flex: 0 0 25%;\n      flex: 0 0 25%;\n      max-width: 25%;\n      width: 25%; }\n      @media only screen and (min-width: 992px) and (max-width: 1199px) {\n        .single-blog-wrapper .single-blog-content-wrapper .related-blog-post {\n          -webkit-box-flex: 0;\n          -ms-flex: 0 0 35%;\n          flex: 0 0 35%;\n          max-width: 35%;\n          width: 35%; } }\n      @media only screen and (min-width: 768px) and (max-width: 991px) {\n        .single-blog-wrapper .single-blog-content-wrapper .related-blog-post {\n          -webkit-box-flex: 0;\n          -ms-flex: 0 0 40%;\n          flex: 0 0 40%;\n          max-width: 40%;\n          width: 40%; } }\n      @media only screen and (max-width: 767px) {\n        .single-blog-wrapper .single-blog-content-wrapper .related-blog-post {\n          -webkit-box-flex: 0;\n          -ms-flex: 0 0 100%;\n          flex: 0 0 100%;\n          max-width: 100%;\n          width: 100%; } }\n      .single-blog-wrapper .single-blog-content-wrapper .related-blog-post .single-related-blog-post {\n        position: relative;\n        z-index: 1;\n        overflow: hidden;\n        -webkit-transition-duration: 500ms;\n        transition-duration: 500ms; }\n        .single-blog-wrapper .single-blog-content-wrapper .related-blog-post .single-related-blog-post img {\n          width: 100%;\n          -webkit-transition-duration: 500ms;\n          transition-duration: 500ms; }\n        .single-blog-wrapper .single-blog-content-wrapper .related-blog-post .single-related-blog-post a {\n          display: block;\n          position: absolute;\n          width: 100%;\n          height: 100%;\n          top: 0;\n          left: 0;\n          background-color: rgba(0, 0, 0, 0.6);\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-align: center;\n          -ms-flex-align: center;\n          -ms-grid-row-align: center;\n          align-items: center;\n          -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n          justify-content: space-between;\n          padding: 5px 50px; }\n          .single-blog-wrapper .single-blog-content-wrapper .related-blog-post .single-related-blog-post a h5 {\n            color: #ffffff;\n            text-align: center;\n            font-size: 18px;\n            margin-bottom: 0;\n            line-height: 1.5; }\n        .single-blog-wrapper .single-blog-content-wrapper .related-blog-post .single-related-blog-post:hover img, .single-blog-wrapper .single-blog-content-wrapper .related-blog-post .single-related-blog-post:focus img {\n          -webkit-transform: scale(1.2);\n          transform: scale(1.2); }\n\n/* :: 16.0 Regular Page Area CSS */\n.regular-page-content-wrapper {\n  position: relative;\n  z-index: 1; }\n  .regular-page-content-wrapper .regular-page-text h2 {\n    font-size: 30px;\n    line-height: 1.5;\n    margin-bottom: 50px; }\n  .regular-page-content-wrapper .regular-page-text p {\n    font-size: 18px;\n    font-weight: 300;\n    margin-bottom: 50px; }\n  .regular-page-content-wrapper .regular-page-text blockquote {\n    margin-bottom: 50px; }\n    .regular-page-content-wrapper .regular-page-text blockquote h6 {\n      font-size: 18px;\n      line-height: 2;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      .regular-page-content-wrapper .regular-page-text blockquote h6 i {\n        margin-right: 30px;\n        font-size: 30px;\n        color: #0315ff; }\n    .regular-page-content-wrapper .regular-page-text blockquote span {\n      margin-left: 60px;\n      font-size: 16px;\n      font-weight: 600;\n      color: rgba(0, 0, 0, 0.6); }\n\n/* :: 17.0 Contact Area CSS */\n.contact-area {\n  position: relative;\n  z-index: 1;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap; }\n  .contact-area .google-map {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 60%;\n    flex: 0 0 60%;\n    max-width: 60%;\n    width: 60%; }\n    @media only screen and (min-width: 768px) and (max-width: 991px) {\n      .contact-area .google-map {\n        -webkit-box-flex: 0;\n        -ms-flex: 0 0 55%;\n        flex: 0 0 55%;\n        max-width: 55%;\n        width: 55%; } }\n    @media only screen and (max-width: 767px) {\n      .contact-area .google-map {\n        -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n        flex: 0 0 100%;\n        max-width: 100%;\n        width: 100%; } }\n    .contact-area .google-map #googleMap {\n      width: 100%;\n      height: 685px; }\n      @media only screen and (max-width: 767px) {\n        .contact-area .google-map #googleMap {\n          height: 400px; } }\n  .contact-area .contact-info {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 40%;\n    flex: 0 0 40%;\n    max-width: 40%;\n    width: 40%;\n    padding: 50px 5%; }\n    @media only screen and (min-width: 768px) and (max-width: 991px) {\n      .contact-area .contact-info {\n        -webkit-box-flex: 0;\n        -ms-flex: 0 0 45%;\n        flex: 0 0 45%;\n        max-width: 45%;\n        width: 45%;\n        padding: 50px 3%; } }\n    @media only screen and (max-width: 767px) {\n      .contact-area .contact-info {\n        -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n        flex: 0 0 100%;\n        max-width: 100%;\n        width: 100%;\n        padding: 50px 5%; } }\n    .contact-area .contact-info h2 {\n      font-size: 30px;\n      margin-bottom: 20px; }\n    .contact-area .contact-info p {\n      font-size: 16px;\n      font-weight: 300; }\n    .contact-area .contact-info .contact-address p {\n      font-size: 12px;\n      font-weight: 600;\n      margin-bottom: 10px; }\n      .contact-area .contact-info .contact-address p span {\n        font-weight: 600;\n        color: #000000;\n        width: 100px;\n        display: inline-block;\n        text-transform: uppercase; }\n      .contact-area .contact-info .contact-address p:last-child {\n        margin-top: 100px; }\n        .contact-area .contact-info .contact-address p:last-child a {\n          font-size: 14px;\n          font-weight: 300; }\n          .contact-area .contact-info .contact-address p:last-child a:hover {\n            color: #0315ff; }\n\n/* ##### The End ##### */\n", ""]);

// exports


/***/ }),

/***/ 5:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ })

/******/ });