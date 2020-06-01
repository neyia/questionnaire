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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const question = document.getElementById('question');\nconst choices = Array.from(document.getElementsByClassName('choice-text'));\nconst progressText = document.getElementById('statusText');\nconst progressBarFull = document.getElementById('progressBarFull');\nconst scoreText = document.getElementById('score');\nconst loader = document.querySelector('.loader');\nconst game = document.getElementById('game');\n\nlet currentQuestion = {};\nlet acceptingAnswers = false;\nlet score = 0;\nlet questionCounter = 0;\nlet availableQuestions = [];\n\nlet questions = [];\n\nfetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')\n    .then(res => {\n        return res.json();\n    })\n    .then(loadedQuestions => {\n        questions = loadedQuestions.results.map(loadedQuestion => {\n            const formattedQuestion = {\n                question: loadedQuestion.question\n            };\n            const answerChoices = [...loadedQuestion.incorrect_answers];\n\n            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;\n\n            answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);\n            answerChoices.forEach((choice, index) => {\n                formattedQuestion['choice' + (index + 1)] = choice;\n            });\n\n            return formattedQuestion;\n        });\n\n        startGame();\n    })\n    .catch(err => {\n        console.log(err);\n    });\n\n//constants\nconst CORRECT_BONUS = 10;\nconst MAX_QUESTIONS = 3;\n\n\nstartGame = () => {\n    questionCounter = 0;\n    score = 0;\n    availableQuestions = [...questions];\n    getNewQuestion();\n    scoreText.innerText = 0;\n\n    game.classList.remove('hidden');\n    loader.classList.add('hidden');\n};\n\ngetNewQuestion = () => {\n    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {\n        localStorage.setItem('mostRecentScore', score);\n\n        return window.location.assign('end.html');\n    }\n    questionCounter++;\n    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;\n\n    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;\n\n    const questionIndex = Math.floor(Math.random() * availableQuestions.length);\n    currentQuestion = availableQuestions[questionIndex];\n    question.innerText = currentQuestion.question;\n\n    choices.forEach(choice => {\n        const number = choice.dataset['number'];\n        choice.innerText = currentQuestion['choice' + number];\n    });\n\n    availableQuestions.splice(questionIndex, 1);\n    acceptingAnswers = true;\n};\n\nchoices.forEach(choice => {\n    choice.addEventListener('click', element => {\n        element.preventDefault();\n\n        if (!acceptingAnswers) {\n            return;\n        }\n        acceptingAnswers = false;\n        const selectedChoice = element.target;\n        const selectedAnswer = parseInt(selectedChoice.dataset['number']);\n        let classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';\n\n        if (classToApply === 'correct') {\n            incrementScore(CORRECT_BONUS);\n        }\n\n        selectedChoice.parentElement.classList.add(classToApply);\n\n        setTimeout(() => {\n            selectedChoice.parentElement.classList.remove(classToApply);\n            getNewQuestion();\n        }, 1000);\n    });\n});\n\nincrementScore = num => {\n    score += num;\n    scoreText.innerText = score;\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZ2FtZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9nYW1lLmpzPzdkZTAiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcXVlc3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncXVlc3Rpb24nKTtcbmNvbnN0IGNob2ljZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Nob2ljZS10ZXh0JykpO1xuY29uc3QgcHJvZ3Jlc3NUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXR1c1RleHQnKTtcbmNvbnN0IHByb2dyZXNzQmFyRnVsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzc0JhckZ1bGwnKTtcbmNvbnN0IHNjb3JlVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZScpO1xuY29uc3QgbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRlcicpO1xuY29uc3QgZ2FtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJyk7XG5cbmxldCBjdXJyZW50UXVlc3Rpb24gPSB7fTtcbmxldCBhY2NlcHRpbmdBbnN3ZXJzID0gZmFsc2U7XG5sZXQgc2NvcmUgPSAwO1xubGV0IHF1ZXN0aW9uQ291bnRlciA9IDA7XG5sZXQgYXZhaWxhYmxlUXVlc3Rpb25zID0gW107XG5cbmxldCBxdWVzdGlvbnMgPSBbXTtcblxuZmV0Y2goJ2h0dHBzOi8vb3BlbnRkYi5jb20vYXBpLnBocD9hbW91bnQ9MTAmY2F0ZWdvcnk9MTgmZGlmZmljdWx0eT1lYXN5JnR5cGU9bXVsdGlwbGUnKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0pXG4gICAgLnRoZW4obG9hZGVkUXVlc3Rpb25zID0+IHtcbiAgICAgICAgcXVlc3Rpb25zID0gbG9hZGVkUXVlc3Rpb25zLnJlc3VsdHMubWFwKGxvYWRlZFF1ZXN0aW9uID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFF1ZXN0aW9uID0ge1xuICAgICAgICAgICAgICAgIHF1ZXN0aW9uOiBsb2FkZWRRdWVzdGlvbi5xdWVzdGlvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGFuc3dlckNob2ljZXMgPSBbLi4ubG9hZGVkUXVlc3Rpb24uaW5jb3JyZWN0X2Fuc3dlcnNdO1xuXG4gICAgICAgICAgICBmb3JtYXR0ZWRRdWVzdGlvbi5hbnN3ZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKSArIDE7XG5cbiAgICAgICAgICAgIGFuc3dlckNob2ljZXMuc3BsaWNlKGZvcm1hdHRlZFF1ZXN0aW9uLmFuc3dlciAtIDEsIDAsIGxvYWRlZFF1ZXN0aW9uLmNvcnJlY3RfYW5zd2VyKTtcbiAgICAgICAgICAgIGFuc3dlckNob2ljZXMuZm9yRWFjaCgoY2hvaWNlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFF1ZXN0aW9uWydjaG9pY2UnICsgKGluZGV4ICsgMSldID0gY2hvaWNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZWRRdWVzdGlvbjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3RhcnRHYW1lKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcblxuLy9jb25zdGFudHNcbmNvbnN0IENPUlJFQ1RfQk9OVVMgPSAxMDtcbmNvbnN0IE1BWF9RVUVTVElPTlMgPSAzO1xuXG5cbnN0YXJ0R2FtZSA9ICgpID0+IHtcbiAgICBxdWVzdGlvbkNvdW50ZXIgPSAwO1xuICAgIHNjb3JlID0gMDtcbiAgICBhdmFpbGFibGVRdWVzdGlvbnMgPSBbLi4ucXVlc3Rpb25zXTtcbiAgICBnZXROZXdRdWVzdGlvbigpO1xuICAgIHNjb3JlVGV4dC5pbm5lclRleHQgPSAwO1xuXG4gICAgZ2FtZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICBsb2FkZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG59O1xuXG5nZXROZXdRdWVzdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoYXZhaWxhYmxlUXVlc3Rpb25zLmxlbmd0aCA9PT0gMCB8fCBxdWVzdGlvbkNvdW50ZXIgPj0gTUFYX1FVRVNUSU9OUykge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbW9zdFJlY2VudFNjb3JlJywgc2NvcmUpO1xuXG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uYXNzaWduKCdlbmQuaHRtbCcpO1xuICAgIH1cbiAgICBxdWVzdGlvbkNvdW50ZXIrKztcbiAgICBwcm9ncmVzc1RleHQuaW5uZXJUZXh0ID0gYFF1ZXN0aW9uICR7cXVlc3Rpb25Db3VudGVyfS8ke01BWF9RVUVTVElPTlN9YDtcblxuICAgIHByb2dyZXNzQmFyRnVsbC5zdHlsZS53aWR0aCA9IGAkeyhxdWVzdGlvbkNvdW50ZXIgLyBNQVhfUVVFU1RJT05TKSAqIDEwMH0lYDtcblxuICAgIGNvbnN0IHF1ZXN0aW9uSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhdmFpbGFibGVRdWVzdGlvbnMubGVuZ3RoKTtcbiAgICBjdXJyZW50UXVlc3Rpb24gPSBhdmFpbGFibGVRdWVzdGlvbnNbcXVlc3Rpb25JbmRleF07XG4gICAgcXVlc3Rpb24uaW5uZXJUZXh0ID0gY3VycmVudFF1ZXN0aW9uLnF1ZXN0aW9uO1xuXG4gICAgY2hvaWNlcy5mb3JFYWNoKGNob2ljZSA9PiB7XG4gICAgICAgIGNvbnN0IG51bWJlciA9IGNob2ljZS5kYXRhc2V0WydudW1iZXInXTtcbiAgICAgICAgY2hvaWNlLmlubmVyVGV4dCA9IGN1cnJlbnRRdWVzdGlvblsnY2hvaWNlJyArIG51bWJlcl07XG4gICAgfSk7XG5cbiAgICBhdmFpbGFibGVRdWVzdGlvbnMuc3BsaWNlKHF1ZXN0aW9uSW5kZXgsIDEpO1xuICAgIGFjY2VwdGluZ0Fuc3dlcnMgPSB0cnVlO1xufTtcblxuY2hvaWNlcy5mb3JFYWNoKGNob2ljZSA9PiB7XG4gICAgY2hvaWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZWxlbWVudCA9PiB7XG4gICAgICAgIGVsZW1lbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoIWFjY2VwdGluZ0Fuc3dlcnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhY2NlcHRpbmdBbnN3ZXJzID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQ2hvaWNlID0gZWxlbWVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQW5zd2VyID0gcGFyc2VJbnQoc2VsZWN0ZWRDaG9pY2UuZGF0YXNldFsnbnVtYmVyJ10pO1xuICAgICAgICBsZXQgY2xhc3NUb0FwcGx5ID0gc2VsZWN0ZWRBbnN3ZXIgPT09IGN1cnJlbnRRdWVzdGlvbi5hbnN3ZXIgPyAnY29ycmVjdCcgOiAnaW5jb3JyZWN0JztcblxuICAgICAgICBpZiAoY2xhc3NUb0FwcGx5ID09PSAnY29ycmVjdCcpIHtcbiAgICAgICAgICAgIGluY3JlbWVudFNjb3JlKENPUlJFQ1RfQk9OVVMpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZWN0ZWRDaG9pY2UucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzVG9BcHBseSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzZWxlY3RlZENob2ljZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NUb0FwcGx5KTtcbiAgICAgICAgICAgIGdldE5ld1F1ZXN0aW9uKCk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH0pO1xufSk7XG5cbmluY3JlbWVudFNjb3JlID0gbnVtID0+IHtcbiAgICBzY29yZSArPSBudW07XG4gICAgc2NvcmVUZXh0LmlubmVyVGV4dCA9IHNjb3JlO1xufTtcblxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/game.js\n");

/***/ })

/******/ });