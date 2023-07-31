/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/base-component.ts":
/*!******************************************!*\
  !*** ./src/components/base-component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component)
/* harmony export */ });
// Component Class
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
    }
}


/***/ }),

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectInput: () => (/* binding */ ProjectInput)
/* harmony export */ });
/* harmony import */ var _components_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/base-component */ "./src/components/base-component.ts");
/* harmony import */ var _util_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/validation */ "./src/util/validation.ts");
/* harmony import */ var _decoraters_autobind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decoraters/autobind */ "./src/decoraters/autobind.ts");
/* harmony import */ var _state_project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project */ "./src/state/project.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// ProjectInput Class
class ProjectInput extends _components_base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.mandayInputElement = this.element.querySelector("#manday");
        this.configure();
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent() { }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredManday = this.mandayInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const mandayValidatable = {
            value: +enteredManday,
            required: true,
            min: 1,
            max: 1000,
        };
        if (!_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(titleValidatable) ||
            !_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(descriptionValidatable) ||
            !_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(mandayValidatable)) {
            alert("入力値が正しくありません。再度お試しください。");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredManday];
        }
    }
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.mandayInputElement.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, manday] = userInput;
            _state_project__WEBPACK_IMPORTED_MODULE_3__.projectState.addProject(title, desc, manday);
            this.clearInputs();
        }
    }
}
__decorate([
    _decoraters_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectInput.prototype, "submitHandler", null);


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectItem: () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _components_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decoraters_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decoraters/autobind */ "./src/decoraters/autobind.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// ProjectItem Class
class ProjectItem extends _components_base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    get manday() {
        if (this.project.manday < 20) {
            return this.project.manday.toString() + "人日";
        }
        else {
            return (this.project.manday / 20).toString() + "人月";
        }
    }
    constructor(hostId, project) {
        super("single-project", hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(_) {
        console.log("Drag終了");
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.manday;
        this.element.querySelector("p").textContent = this.project.description;
    }
}
__decorate([
    _decoraters_autobind__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectItem.prototype, "dragStartHandler", null);


/***/ }),

/***/ "./src/components/project-list.ts":
/*!****************************************!*\
  !*** ./src/components/project-list.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectList: () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _components_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/base-component */ "./src/components/base-component.ts");
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");
/* harmony import */ var _decoraters_autobind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decoraters/autobind */ "./src/decoraters/autobind.ts");
/* harmony import */ var _state_project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project */ "./src/state/project.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-item */ "./src/components/project-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// ProjectList Class
class ProjectList extends _components_base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector("ul");
            listEl.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData("text/plain");
        _state_project__WEBPACK_IMPORTED_MODULE_3__.projectState.moveProject(prjId, this.type === "active" ? _models_project__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.Active : _models_project__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.Finished);
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("drop", this.dropHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        _state_project__WEBPACK_IMPORTED_MODULE_3__.projectState.addListener((projects) => {
            const relevantProjects = projects.filter((prj) => {
                if (this.type === "active") {
                    return prj.status === _models_project__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.Active;
                }
                return prj.status === _models_project__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type === "active" ? "実行中プロジェクト" : "完了プロジェクト";
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = "";
        for (const prjItem of this.assignedProjects) {
            new _project_item__WEBPACK_IMPORTED_MODULE_4__.ProjectItem(listEl.id, prjItem);
        }
    }
}
__decorate([
    _decoraters_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decoraters_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decoraters_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/decoraters/autobind.ts":
/*!************************************!*\
  !*** ./src/decoraters/autobind.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   autobind: () => (/* binding */ autobind)
/* harmony export */ });
// autobind decorator
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}


/***/ }),

/***/ "./src/models/project.ts":
/*!*******************************!*\
  !*** ./src/models/project.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project),
/* harmony export */   ProjectStatus: () => (/* binding */ ProjectStatus)
/* harmony export */ });
// Project Type
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, manday, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.manday = manday;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/state/project.ts":
/*!******************************!*\
  !*** ./src/state/project.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectState: () => (/* binding */ ProjectState),
/* harmony export */   projectState: () => (/* binding */ projectState)
/* harmony export */ });
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");

class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, manday) {
        const newProject = new _models_project__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random().toString(), title, description, manday, _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((prj) => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();


/***/ }),

/***/ "./src/util/validation.ts":
/*!********************************!*\
  !*** ./src/util/validation.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validate: () => (/* binding */ validate)
/* harmony export */ });
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-list */ "./src/components/project-list.ts");


new _components_project_input__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList("active");
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList("finished");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0JBQWtCO0FBQ0gsTUFBZSxTQUFTO0lBUXJDLFlBQ0UsVUFBa0IsRUFDbEIsYUFBcUIsRUFDckIsYUFBc0IsRUFDdEIsWUFBcUI7UUFFckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUM1QyxVQUFVLENBQ2EsQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFPLENBQUM7UUFFaEUsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FDdEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQzVCLElBQUksQ0FDTCxDQUFDO1FBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsaUJBQXNCLENBQUM7UUFDbkQsSUFBSSxZQUFZLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDO1NBQ2hDO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBS08sTUFBTSxDQUFDLGlCQUEwQjtRQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUNwQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQzlDLElBQUksQ0FBQyxPQUFPLENBQ2IsQ0FBQztJQUNKLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDb0Q7QUFDSjtBQUNDO0FBQ0Y7QUFFaEQscUJBQXFCO0FBQ2QsTUFBTSxZQUFhLFNBQVEsa0VBQTBDO0lBSzFFO1FBQ0UsS0FBSyxDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FDakQsUUFBUSxDQUNXLENBQUM7UUFDdEIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUN2RCxjQUFjLENBQ0ssQ0FBQztRQUN0QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQ2xELFNBQVMsQ0FDVSxDQUFDO1FBRXRCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsYUFBYSxLQUFJLENBQUM7SUFFVixlQUFlO1FBQ3JCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7UUFDbEQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDO1FBQzlELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7UUFFcEQsTUFBTSxnQkFBZ0IsR0FBMkI7WUFDL0MsS0FBSyxFQUFFLFlBQVk7WUFDbkIsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDO1FBQ0YsTUFBTSxzQkFBc0IsR0FBMkI7WUFDckQsS0FBSyxFQUFFLGtCQUFrQjtZQUN6QixRQUFRLEVBQUUsSUFBSTtZQUNkLFNBQVMsRUFBRSxDQUFDO1NBQ2IsQ0FBQztRQUNGLE1BQU0saUJBQWlCLEdBQTJCO1lBQ2hELEtBQUssRUFBRSxDQUFDLGFBQWE7WUFDckIsUUFBUSxFQUFFLElBQUk7WUFDZCxHQUFHLEVBQUUsQ0FBQztZQUNOLEdBQUcsRUFBRSxJQUFJO1NBQ1YsQ0FBQztRQUNGLElBQ0UsQ0FBQyxzREFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQztZQUN0QyxDQUFDLHNEQUFtQixDQUFDLHNCQUFzQixDQUFDO1lBQzVDLENBQUMsc0RBQW1CLENBQUMsaUJBQWlCLENBQUMsRUFDdkM7WUFDQSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUNqQyxPQUFPO1NBQ1I7YUFBTTtZQUNMLE9BQU8sQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMzRDtJQUNILENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFHTyxhQUFhLENBQUMsS0FBWTtRQUNoQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM1QixNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUM7WUFDeEMsd0RBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDO0NBQ0Y7QUFUUztJQURQLDBEQUFRO2lEQVNSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hGa0Q7QUFHSDtBQUVsRCxvQkFBb0I7QUFDYixNQUFNLFdBQ1gsU0FBUSxrRUFBMEM7SUFLbEQsSUFBSSxNQUFNO1FBQ1IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDOUM7YUFBTTtZQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDckQ7SUFDSCxDQUFDO0lBRUQsWUFBWSxNQUFjLEVBQUUsT0FBZ0I7UUFDMUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBRXZCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUdELGdCQUFnQixDQUFDLEtBQWdCO1FBQy9CLEtBQUssQ0FBQyxZQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNELEtBQUssQ0FBQyxZQUFhLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztJQUM3QyxDQUFDO0lBRUQsY0FBYyxDQUFDLENBQVk7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNuRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFDMUUsQ0FBQztDQUNGO0FBbkJDO0lBREMsMERBQVE7bURBSVI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENrRDtBQUNNO0FBRVQ7QUFDRjtBQUNIO0FBRTdDLG9CQUFvQjtBQUNiLE1BQU0sV0FDWCxTQUFRLGtFQUFzQztJQUs5QyxZQUFvQixJQUEyQjtRQUM3QyxLQUFLLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxDQUFDO1FBRHRDLFNBQUksR0FBSixJQUFJLENBQXVCO1FBRTdDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBR0QsZUFBZSxDQUFDLEtBQWdCO1FBQzlCLElBQUksS0FBSyxDQUFDLFlBQVksSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxZQUFZLEVBQUU7WUFDdEUsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBRSxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUdELFdBQVcsQ0FBQyxLQUFnQjtRQUMxQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsWUFBYSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4RCx3REFBWSxDQUFDLFdBQVcsQ0FDdEIsS0FBSyxFQUNMLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQywwREFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsMERBQWEsQ0FBQyxRQUFRLENBQ3ZFLENBQUM7SUFDSixDQUFDO0lBR0QsZ0JBQWdCLENBQUMsQ0FBWTtRQUMzQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUUsQ0FBQztRQUNqRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFbEUsd0RBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFtQixFQUFFLEVBQUU7WUFDL0MsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQy9DLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQzFCLE9BQU8sR0FBRyxDQUFDLE1BQU0sS0FBSywwREFBYSxDQUFDLE1BQU0sQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxHQUFHLENBQUMsTUFBTSxLQUFLLDBEQUFhLENBQUMsUUFBUSxDQUFDO1lBQy9DLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1lBQ3pDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxhQUFhO1FBQ1gsTUFBTSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQztRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUUsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBRSxDQUFDLFdBQVc7WUFDM0MsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO0lBQ3RELENBQUM7SUFFTyxjQUFjO1FBQ3BCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQ3BDLEdBQUcsSUFBSSxDQUFDLElBQUksZ0JBQWdCLENBQ1IsQ0FBQztRQUN2QixNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUN0QixLQUFLLE1BQU0sT0FBTyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUMzQyxJQUFJLHNEQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7Q0FDRjtBQXhEQztJQURDLDBEQUFRO2tEQU9SO0FBR0Q7SUFEQywwREFBUTs4Q0FPUjtBQUdEO0lBREMsMERBQVE7bURBSVI7Ozs7Ozs7Ozs7Ozs7OztBQzVDSCxxQkFBcUI7QUFDZCxTQUFTLFFBQVEsQ0FBQyxDQUFNLEVBQUUsRUFBVSxFQUFFLFVBQThCO0lBQ3pFLE1BQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDeEMsTUFBTSxhQUFhLEdBQXVCO1FBQ3hDLFlBQVksRUFBRSxJQUFJO1FBQ2xCLEdBQUc7WUFDRCxNQUFNLE9BQU8sR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUM7S0FDRixDQUFDO0lBQ0YsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ1hELGVBQWU7QUFDZixJQUFZLGFBR1g7QUFIRCxXQUFZLGFBQWE7SUFDdkIscURBQU07SUFDTix5REFBUTtBQUNWLENBQUMsRUFIVyxhQUFhLEtBQWIsYUFBYSxRQUd4QjtBQUVNLE1BQU0sT0FBTztJQUNsQixZQUNTLEVBQVUsRUFDVixLQUFhLEVBQ2IsV0FBbUIsRUFDbkIsTUFBYyxFQUNkLE1BQXFCO1FBSnJCLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDVixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQWU7SUFDM0IsQ0FBQztDQUNMOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2QwRDtBQU8zRCxNQUFNLEtBQUs7SUFBWDtRQUNZLGNBQVMsR0FBa0IsRUFBRSxDQUFDO0lBSzFDLENBQUM7SUFIQyxXQUFXLENBQUMsVUFBdUI7UUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNGO0FBRU0sTUFBTSxZQUFhLFNBQVEsS0FBYztJQUk5QztRQUNFLEtBQUssRUFBRSxDQUFDO1FBSkYsYUFBUSxHQUFjLEVBQUUsQ0FBQztJQUtqQyxDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQVc7UUFDaEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFhLEVBQUUsV0FBbUIsRUFBRSxNQUFjO1FBQzNELE1BQU0sVUFBVSxHQUFHLElBQUksb0RBQU8sQ0FDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUN4QixLQUFLLEVBQ0wsV0FBVyxFQUNYLE1BQU0sRUFDTiwwREFBYSxDQUFDLE1BQU0sQ0FDckIsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsV0FBVyxDQUFDLFNBQWlCLEVBQUUsU0FBd0I7UUFDckQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUFDLENBQUM7UUFDbEUsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDM0MsT0FBTyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7WUFDM0IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVPLGVBQWU7UUFDckIsS0FBSyxNQUFNLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3ZDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDbkM7SUFDSCxDQUFDO0NBQ0Y7QUFFTSxNQUFNLFlBQVksR0FBRyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2hEaEQsU0FBUyxRQUFRLENBQUMsZ0JBQTZCO0lBQ3BELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztJQUNuQixJQUFJLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtRQUM3QixPQUFPLEdBQUcsT0FBTyxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0tBQzVFO0lBQ0QsSUFDRSxnQkFBZ0IsQ0FBQyxTQUFTLElBQUksSUFBSTtRQUNsQyxPQUFPLGdCQUFnQixDQUFDLEtBQUssS0FBSyxRQUFRLEVBQzFDO1FBQ0EsT0FBTztZQUNMLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztLQUMxRTtJQUNELElBQ0UsZ0JBQWdCLENBQUMsU0FBUyxJQUFJLElBQUk7UUFDbEMsT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUMxQztRQUNBLE9BQU87WUFDTCxPQUFPLElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7S0FDMUU7SUFDRCxJQUNFLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxJQUFJO1FBQzVCLE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFDMUM7UUFDQSxPQUFPLEdBQUcsT0FBTyxJQUFJLGdCQUFnQixDQUFDLEtBQUssSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7S0FDckU7SUFDRCxJQUNFLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxJQUFJO1FBQzVCLE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFDMUM7UUFDQSxPQUFPLEdBQUcsT0FBTyxJQUFJLGdCQUFnQixDQUFDLEtBQUssSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7S0FDckU7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDOzs7Ozs7O1VDMUNEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjBEO0FBQ0Y7QUFFeEQsSUFBSSxtRUFBWSxFQUFFLENBQUM7QUFDbkIsSUFBSSxpRUFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLElBQUksaUVBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3R5cGVzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pdGVtLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWxpc3QudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC8uL3NyYy9kZWNvcmF0ZXJzL2F1dG9iaW5kLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQvLi9zcmMvbW9kZWxzL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC8uL3NyYy9zdGF0ZS9wcm9qZWN0LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQvLi9zcmMvdXRpbC92YWxpZGF0aW9uLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3R5cGVzY3JpcHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb21wb25lbnQgQ2xhc3NcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudDxcbiAgVCBleHRlbmRzIEhUTUxFbGVtZW50LFxuICBVIGV4dGVuZHMgSFRNTEVsZW1lbnRcbj4ge1xuICB0ZW1wbGF0ZUVsZW1lbnQ6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIGhvc3RFbGVtZW50OiBUO1xuICBlbGVtZW50OiBVO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHRlbXBsYXRlSWQ6IHN0cmluZyxcbiAgICBob3N0RWxlbWVudElkOiBzdHJpbmcsXG4gICAgaW5zZXJ0QXRTdGFydDogYm9vbGVhbixcbiAgICBuZXdFbGVtZW50SWQ/OiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIHRlbXBsYXRlSWRcbiAgICApISBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgIHRoaXMuaG9zdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChob3N0RWxlbWVudElkKSEgYXMgVDtcblxuICAgIGNvbnN0IGltcG9ydGVkTm9kZSA9IGRvY3VtZW50LmltcG9ydE5vZGUoXG4gICAgICB0aGlzLnRlbXBsYXRlRWxlbWVudC5jb250ZW50LFxuICAgICAgdHJ1ZVxuICAgICk7XG4gICAgdGhpcy5lbGVtZW50ID0gaW1wb3J0ZWROb2RlLmZpcnN0RWxlbWVudENoaWxkIGFzIFU7XG4gICAgaWYgKG5ld0VsZW1lbnRJZCkge1xuICAgICAgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElkO1xuICAgIH1cblxuICAgIHRoaXMuYXR0YWNoKGluc2VydEF0U3RhcnQpO1xuICB9XG5cbiAgYWJzdHJhY3QgY29uZmlndXJlKCk6IHZvaWQ7XG4gIGFic3RyYWN0IHJlbmRlckNvbnRlbnQoKTogdm9pZDtcblxuICBwcml2YXRlIGF0dGFjaChpbnNlcnRBdEJlZ2lubmluZzogYm9vbGVhbikge1xuICAgIHRoaXMuaG9zdEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgICAgaW5zZXJ0QXRCZWdpbm5pbmcgPyBcImFmdGVyYmVnaW5cIiA6IFwiYmVmb3JlZW5kXCIsXG4gICAgICB0aGlzLmVsZW1lbnRcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuLi9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50XCI7XG5pbXBvcnQgKiBhcyBWYWxpZGF0aW9uIGZyb20gXCIuLi91dGlsL3ZhbGlkYXRpb25cIjtcbmltcG9ydCB7IGF1dG9iaW5kIH0gZnJvbSBcIi4uL2RlY29yYXRlcnMvYXV0b2JpbmRcIjtcbmltcG9ydCB7IHByb2plY3RTdGF0ZSB9IGZyb20gXCIuLi9zdGF0ZS9wcm9qZWN0XCI7XG5cbi8vIFByb2plY3RJbnB1dCBDbGFzc1xuZXhwb3J0IGNsYXNzIFByb2plY3RJbnB1dCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEZvcm1FbGVtZW50PiB7XG4gIHRpdGxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuICBkZXNjcmlwdGlvbklucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcbiAgbWFuZGF5SW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFwicHJvamVjdC1pbnB1dFwiLCBcImFwcFwiLCB0cnVlLCBcInVzZXItaW5wdXRcIik7XG5cbiAgICB0aGlzLnRpdGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIiN0aXRsZVwiXG4gICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiI2Rlc2NyaXB0aW9uXCJcbiAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdGhpcy5tYW5kYXlJbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiI21hbmRheVwiXG4gICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgdGhpcy5jb25maWd1cmUoKTtcbiAgfVxuXG4gIGNvbmZpZ3VyZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLnN1Ym1pdEhhbmRsZXIpO1xuICB9XG5cbiAgcmVuZGVyQ29udGVudCgpIHt9XG5cbiAgcHJpdmF0ZSBnYXRoZXJVc2VySW5wdXQoKTogW3N0cmluZywgc3RyaW5nLCBudW1iZXJdIHwgdm9pZCB7XG4gICAgY29uc3QgZW50ZXJlZFRpdGxlID0gdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZTtcbiAgICBjb25zdCBlbnRlcmVkRGVzY3JpcHRpb24gPSB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50LnZhbHVlO1xuICAgIGNvbnN0IGVudGVyZWRNYW5kYXkgPSB0aGlzLm1hbmRheUlucHV0RWxlbWVudC52YWx1ZTtcblxuICAgIGNvbnN0IHRpdGxlVmFsaWRhdGFibGU6IFZhbGlkYXRpb24uVmFsaWRhdGFibGUgPSB7XG4gICAgICB2YWx1ZTogZW50ZXJlZFRpdGxlLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfTtcbiAgICBjb25zdCBkZXNjcmlwdGlvblZhbGlkYXRhYmxlOiBWYWxpZGF0aW9uLlZhbGlkYXRhYmxlID0ge1xuICAgICAgdmFsdWU6IGVudGVyZWREZXNjcmlwdGlvbixcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgbWluTGVuZ3RoOiA1LFxuICAgIH07XG4gICAgY29uc3QgbWFuZGF5VmFsaWRhdGFibGU6IFZhbGlkYXRpb24uVmFsaWRhdGFibGUgPSB7XG4gICAgICB2YWx1ZTogK2VudGVyZWRNYW5kYXksXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIG1pbjogMSxcbiAgICAgIG1heDogMTAwMCxcbiAgICB9O1xuICAgIGlmIChcbiAgICAgICFWYWxpZGF0aW9uLnZhbGlkYXRlKHRpdGxlVmFsaWRhdGFibGUpIHx8XG4gICAgICAhVmFsaWRhdGlvbi52YWxpZGF0ZShkZXNjcmlwdGlvblZhbGlkYXRhYmxlKSB8fFxuICAgICAgIVZhbGlkYXRpb24udmFsaWRhdGUobWFuZGF5VmFsaWRhdGFibGUpXG4gICAgKSB7XG4gICAgICBhbGVydChcIuWFpeWKm+WApOOBjOato+OBl+OBj+OBguOCiuOBvuOBm+OCk+OAguWGjeW6puOBiuippuOBl+OBj+OBoOOBleOBhOOAglwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtlbnRlcmVkVGl0bGUsIGVudGVyZWREZXNjcmlwdGlvbiwgK2VudGVyZWRNYW5kYXldO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJJbnB1dHMoKSB7XG4gICAgdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gICAgdGhpcy5tYW5kYXlJbnB1dEVsZW1lbnQudmFsdWUgPSBcIlwiO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIHByaXZhdGUgc3VibWl0SGFuZGxlcihldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHVzZXJJbnB1dCA9IHRoaXMuZ2F0aGVyVXNlcklucHV0KCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodXNlcklucHV0KSkge1xuICAgICAgY29uc3QgW3RpdGxlLCBkZXNjLCBtYW5kYXldID0gdXNlcklucHV0O1xuICAgICAgcHJvamVjdFN0YXRlLmFkZFByb2plY3QodGl0bGUsIGRlc2MsIG1hbmRheSk7XG4gICAgICB0aGlzLmNsZWFySW5wdXRzKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuLi9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4uL21vZGVscy9wcm9qZWN0XCI7XG5pbXBvcnQgeyBEcmFnZ2FibGUgfSBmcm9tIFwiLi4vbW9kZWxzL2RyYWctZHJvcFwiO1xuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdGVycy9hdXRvYmluZFwiO1xuXG4vLyBQcm9qZWN0SXRlbSBDbGFzc1xuZXhwb3J0IGNsYXNzIFByb2plY3RJdGVtXG4gIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxVTGlzdEVsZW1lbnQsIEhUTUxMSUVsZW1lbnQ+XG4gIGltcGxlbWVudHMgRHJhZ2dhYmxlXG57XG4gIHByaXZhdGUgcHJvamVjdDogUHJvamVjdDtcblxuICBnZXQgbWFuZGF5KCkge1xuICAgIGlmICh0aGlzLnByb2plY3QubWFuZGF5IDwgMjApIHtcbiAgICAgIHJldHVybiB0aGlzLnByb2plY3QubWFuZGF5LnRvU3RyaW5nKCkgKyBcIuS6uuaXpVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKHRoaXMucHJvamVjdC5tYW5kYXkgLyAyMCkudG9TdHJpbmcoKSArIFwi5Lq65pyIXCI7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoaG9zdElkOiBzdHJpbmcsIHByb2plY3Q6IFByb2plY3QpIHtcbiAgICBzdXBlcihcInNpbmdsZS1wcm9qZWN0XCIsIGhvc3RJZCwgZmFsc2UsIHByb2plY3QuaWQpO1xuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG5cbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIGRyYWdTdGFydEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgdGhpcy5wcm9qZWN0LmlkKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLmVmZmVjdEFsbG93ZWQgPSBcIm1vdmVcIjtcbiAgfVxuXG4gIGRyYWdFbmRIYW5kbGVyKF86IERyYWdFdmVudCkge1xuICAgIGNvbnNvbGUubG9nKFwiRHJhZ+e1guS6hlwiKTtcbiAgfVxuXG4gIGNvbmZpZ3VyZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCB0aGlzLmRyYWdTdGFydEhhbmRsZXIpO1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCB0aGlzLmRyYWdFbmRIYW5kbGVyKTtcbiAgfVxuXG4gIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QudGl0bGU7XG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKSEudGV4dENvbnRlbnQgPSB0aGlzLm1hbmRheTtcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInBcIikhLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LmRlc2NyaXB0aW9uO1xuICB9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuLi9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzIH0gZnJvbSBcIi4uL21vZGVscy9wcm9qZWN0XCI7XG5pbXBvcnQgeyBEcmFnVGFyZ2V0IH0gZnJvbSBcIi4uL21vZGVscy9kcmFnLWRyb3BcIjtcbmltcG9ydCB7IGF1dG9iaW5kIH0gZnJvbSBcIi4uL2RlY29yYXRlcnMvYXV0b2JpbmRcIjtcbmltcG9ydCB7IHByb2plY3RTdGF0ZSB9IGZyb20gXCIuLi9zdGF0ZS9wcm9qZWN0XCI7XG5pbXBvcnQgeyBQcm9qZWN0SXRlbSB9IGZyb20gXCIuL3Byb2plY3QtaXRlbVwiO1xuXG4vLyBQcm9qZWN0TGlzdCBDbGFzc1xuZXhwb3J0IGNsYXNzIFByb2plY3RMaXN0XG4gIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD5cbiAgaW1wbGVtZW50cyBEcmFnVGFyZ2V0XG57XG4gIGFzc2lnbmVkUHJvamVjdHM6IFByb2plY3RbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6IFwiYWN0aXZlXCIgfCBcImZpbmlzaGVkXCIpIHtcbiAgICBzdXBlcihcInByb2plY3QtbGlzdFwiLCBcImFwcFwiLCBmYWxzZSwgYCR7dHlwZX0tcHJvamVjdHNgKTtcbiAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSBbXTtcblxuICAgIHRoaXMuY29uZmlndXJlKCk7XG4gICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgZHJhZ092ZXJIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyICYmIGV2ZW50LmRhdGFUcmFuc2Zlci50eXBlc1swXSA9PT0gXCJ0ZXh0L3BsYWluXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpITtcbiAgICAgIGxpc3RFbC5jbGFzc0xpc3QuYWRkKFwiZHJvcHBhYmxlXCIpO1xuICAgIH1cbiAgfVxuXG4gIEBhdXRvYmluZFxuICBkcm9wSGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgY29uc3QgcHJqSWQgPSBldmVudC5kYXRhVHJhbnNmZXIhLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpO1xuICAgIHByb2plY3RTdGF0ZS5tb3ZlUHJvamVjdChcbiAgICAgIHByaklkLFxuICAgICAgdGhpcy50eXBlID09PSBcImFjdGl2ZVwiID8gUHJvamVjdFN0YXR1cy5BY3RpdmUgOiBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkXG4gICAgKTtcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBkcmFnTGVhdmVIYW5kbGVyKF86IERyYWdFdmVudCkge1xuICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidWxcIikhO1xuICAgIGxpc3RFbC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJvcHBhYmxlXCIpO1xuICB9XG5cbiAgY29uZmlndXJlKCkge1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgdGhpcy5kcmFnT3ZlckhhbmRsZXIpO1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCB0aGlzLmRyb3BIYW5kbGVyKTtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCB0aGlzLmRyYWdMZWF2ZUhhbmRsZXIpO1xuXG4gICAgcHJvamVjdFN0YXRlLmFkZExpc3RlbmVyKChwcm9qZWN0czogUHJvamVjdFtdKSA9PiB7XG4gICAgICBjb25zdCByZWxldmFudFByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKChwcmopID0+IHtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gXCJhY3RpdmVcIikge1xuICAgICAgICAgIHJldHVybiBwcmouc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkFjdGl2ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJqLnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5GaW5pc2hlZDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gcmVsZXZhbnRQcm9qZWN0cztcbiAgICAgIHRoaXMucmVuZGVyUHJvamVjdHMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgY29uc3QgbGlzdElkID0gYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YDtcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpIS5pZCA9IGxpc3RJZDtcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgyXCIpIS50ZXh0Q29udGVudCA9XG4gICAgICB0aGlzLnR5cGUgPT09IFwiYWN0aXZlXCIgPyBcIuWun+ihjOS4reODl+ODreOCuOOCp+OCr+ODiFwiIDogXCLlrozkuobjg5fjg63jgrjjgqfjgq/jg4hcIjtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyUHJvamVjdHMoKSB7XG4gICAgY29uc3QgbGlzdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICBgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgXG4gICAgKSEgYXMgSFRNTFVMaXN0RWxlbWVudDtcbiAgICBsaXN0RWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBmb3IgKGNvbnN0IHByakl0ZW0gb2YgdGhpcy5hc3NpZ25lZFByb2plY3RzKSB7XG4gICAgICBuZXcgUHJvamVjdEl0ZW0obGlzdEVsLmlkLCBwcmpJdGVtKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIGF1dG9iaW5kIGRlY29yYXRvclxuZXhwb3J0IGZ1bmN0aW9uIGF1dG9iaW5kKF86IGFueSwgXzI6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gIGNvbnN0IG9yaWdpbmFsTWV0aG9kID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgY29uc3QgYWRqRGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQoKSB7XG4gICAgICBjb25zdCBib3VuZEZuID0gb3JpZ2luYWxNZXRob2QuYmluZCh0aGlzKTtcbiAgICAgIHJldHVybiBib3VuZEZuO1xuICAgIH0sXG4gIH07XG4gIHJldHVybiBhZGpEZXNjcmlwdG9yO1xufVxuIiwiLy8gUHJvamVjdCBUeXBlXG5leHBvcnQgZW51bSBQcm9qZWN0U3RhdHVzIHtcbiAgQWN0aXZlLFxuICBGaW5pc2hlZCxcbn1cblxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyxcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyxcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgICBwdWJsaWMgbWFuZGF5OiBudW1iZXIsXG4gICAgcHVibGljIHN0YXR1czogUHJvamVjdFN0YXR1c1xuICApIHt9XG59XG4iLCJpbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzIH0gZnJvbSBcIi4uL21vZGVscy9wcm9qZWN0XCI7XG5cbi8v44OV44Kh44Kk44Or5aSW44Gn5L2/44GG44KC44Gu44Gg44GR44KSZXhwb3J044GZ44KLXG5cbi8vIFByb2plY3QgU3RhdGUgTWFuYWdlbWVudFxudHlwZSBMaXN0ZW5lcjxUPiA9IChpdGVtczogVFtdKSA9PiB2b2lkO1xuXG5jbGFzcyBTdGF0ZTxUPiB7XG4gIHByb3RlY3RlZCBsaXN0ZW5lcnM6IExpc3RlbmVyPFQ+W10gPSBbXTtcblxuICBhZGRMaXN0ZW5lcihsaXN0ZW5lckZuOiBMaXN0ZW5lcjxUPikge1xuICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXJGbik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb2plY3RTdGF0ZSBleHRlbmRzIFN0YXRlPFByb2plY3Q+IHtcbiAgcHJpdmF0ZSBwcm9qZWN0czogUHJvamVjdFtdID0gW107XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBQcm9qZWN0U3RhdGU7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGUoKTtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIGFkZFByb2plY3QodGl0bGU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgbWFuZGF5OiBudW1iZXIpIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoXG4gICAgICBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCksXG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgbWFuZGF5LFxuICAgICAgUHJvamVjdFN0YXR1cy5BY3RpdmVcbiAgICApO1xuICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcbiAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xuICB9XG5cbiAgbW92ZVByb2plY3QocHJvamVjdElkOiBzdHJpbmcsIG5ld1N0YXR1czogUHJvamVjdFN0YXR1cykge1xuICAgIGNvbnN0IHByb2plY3QgPSB0aGlzLnByb2plY3RzLmZpbmQoKHByaikgPT4gcHJqLmlkID09PSBwcm9qZWN0SWQpO1xuICAgIGlmIChwcm9qZWN0ICYmIHByb2plY3Quc3RhdHVzICE9PSBuZXdTdGF0dXMpIHtcbiAgICAgIHByb2plY3Quc3RhdHVzID0gbmV3U3RhdHVzO1xuICAgICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUxpc3RlbmVycygpIHtcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyRm4gb2YgdGhpcy5saXN0ZW5lcnMpIHtcbiAgICAgIGxpc3RlbmVyRm4odGhpcy5wcm9qZWN0cy5zbGljZSgpKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHByb2plY3RTdGF0ZSA9IFByb2plY3RTdGF0ZS5nZXRJbnN0YW5jZSgpO1xuIiwiLy8gVmFsaWRhdGlvblxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0YWJsZSB7XG4gIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcbiAgbWluTGVuZ3RoPzogbnVtYmVyO1xuICBtYXhMZW5ndGg/OiBudW1iZXI7XG4gIG1pbj86IG51bWJlcjtcbiAgbWF4PzogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGUodmFsaWRhdGFibGVJbnB1dDogVmFsaWRhdGFibGUpIHtcbiAgbGV0IGlzVmFsaWQgPSB0cnVlO1xuICBpZiAodmFsaWRhdGFibGVJbnB1dC5yZXF1aXJlZCkge1xuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoICE9PSAwO1xuICB9XG4gIGlmIChcbiAgICB2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbmd0aCAhPSBudWxsICYmXG4gICAgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09IFwic3RyaW5nXCJcbiAgKSB7XG4gICAgaXNWYWxpZCA9XG4gICAgICBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUubGVuZ3RoID49IHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ3RoO1xuICB9XG4gIGlmIChcbiAgICB2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aCAhPSBudWxsICYmXG4gICAgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09IFwic3RyaW5nXCJcbiAgKSB7XG4gICAgaXNWYWxpZCA9XG4gICAgICBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUubGVuZ3RoIDw9IHZhbGlkYXRhYmxlSW5wdXQubWF4TGVuZ3RoO1xuICB9XG4gIGlmIChcbiAgICB2YWxpZGF0YWJsZUlucHV0Lm1pbiAhPSBudWxsICYmXG4gICAgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09IFwibnVtYmVyXCJcbiAgKSB7XG4gICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA+PSB2YWxpZGF0YWJsZUlucHV0Lm1pbjtcbiAgfVxuICBpZiAoXG4gICAgdmFsaWRhdGFibGVJbnB1dC5tYXggIT0gbnVsbCAmJlxuICAgIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSBcIm51bWJlclwiXG4gICkge1xuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPD0gdmFsaWRhdGFibGVJbnB1dC5tYXg7XG4gIH1cbiAgcmV0dXJuIGlzVmFsaWQ7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFByb2plY3RJbnB1dCB9IGZyb20gXCIuL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dFwiO1xuaW1wb3J0IHsgUHJvamVjdExpc3QgfSBmcm9tIFwiLi9jb21wb25lbnRzL3Byb2plY3QtbGlzdFwiO1xuXG5uZXcgUHJvamVjdElucHV0KCk7XG5uZXcgUHJvamVjdExpc3QoXCJhY3RpdmVcIik7XG5uZXcgUHJvamVjdExpc3QoXCJmaW5pc2hlZFwiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==