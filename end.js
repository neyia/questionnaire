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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/end.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/end.js":
/*!********************!*\
  !*** ./src/end.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const username = document.getElementById('username');\nconst saveScoreBtn = document.getElementById('saveScoreBtn');\nconst finalScore = document.getElementById('finalScore');\nconst mostRecentScore = localStorage.getItem('mostRecentScore');\n\nconst highScores = JSON.parse(localStorage.getItem('highScores')) || [];\nconst MAX_HIGH_SCORE = 5;\n\nfinalScore.innerText = mostRecentScore;\n\nusername.addEventListener('keyup', () => {\n    saveScoreBtn.disabled = !username.value;\n});\n\n\nsaveHighScore = (event) => {\n    event.preventDefault();\n\n    const score = {\n        score: mostRecentScore,\n        name: username.value\n    };\n\n    highScores.push(score);\n\n    highScores.sort((a, b) => b.score - a.score);\n    highScores.splice(MAX_HIGH_SCORE);\n    localStorage.setItem('highScores', JSON.stringify(highScores));\n    window.location.assign('index.html');\n\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZW5kLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2VuZC5qcz82ZTZiIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHVzZXJuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJyk7XG5jb25zdCBzYXZlU2NvcmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZVNjb3JlQnRuJyk7XG5jb25zdCBmaW5hbFNjb3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbmFsU2NvcmUnKTtcbmNvbnN0IG1vc3RSZWNlbnRTY29yZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtb3N0UmVjZW50U2NvcmUnKTtcblxuY29uc3QgaGlnaFNjb3JlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hpZ2hTY29yZXMnKSkgfHwgW107XG5jb25zdCBNQVhfSElHSF9TQ09SRSA9IDU7XG5cbmZpbmFsU2NvcmUuaW5uZXJUZXh0ID0gbW9zdFJlY2VudFNjb3JlO1xuXG51c2VybmFtZS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcbiAgICBzYXZlU2NvcmVCdG4uZGlzYWJsZWQgPSAhdXNlcm5hbWUudmFsdWU7XG59KTtcblxuXG5zYXZlSGlnaFNjb3JlID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IHNjb3JlID0ge1xuICAgICAgICBzY29yZTogbW9zdFJlY2VudFNjb3JlLFxuICAgICAgICBuYW1lOiB1c2VybmFtZS52YWx1ZVxuICAgIH07XG5cbiAgICBoaWdoU2NvcmVzLnB1c2goc2NvcmUpO1xuXG4gICAgaGlnaFNjb3Jlcy5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XG4gICAgaGlnaFNjb3Jlcy5zcGxpY2UoTUFYX0hJR0hfU0NPUkUpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaWdoU2NvcmVzJywgSlNPTi5zdHJpbmdpZnkoaGlnaFNjb3JlcykpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oJ2luZGV4Lmh0bWwnKTtcblxufTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/end.js\n");

/***/ })

/******/ });