"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
class ProjectState {
    constructor() {
        this.listeners = [];
        this.projects = [];
    }
    //シングルトン
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addProject(title, description, manday) {
        const newProject = new Project(Math.random().toString(), title, description, manday, ProjectStatus.Active);
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
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
            isValid && validatableInput.value.length >= validatableInput.maxLength;
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
//デコレータ
function autobind(target, methosName, descriptor) {
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
//"project-list"
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateElement = document.getElementById("project-list");
        this.hostElement = document.getElementById("app");
        this.assignedProjects = [];
        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects) => {
            //enumフィルタリング
            const relevantProjects = projects.filter((prj) => {
                if (this.type === "active") {
                    return prj.status === ProjectStatus.Active;
                }
                prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = "";
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement("li");
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type === "active" ? "実行中" : "完了";
    }
    //appにテンプレートフォームをアタッチ
    attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
}
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        this.element.id = "user-input";
        this.titleInputElemnt = this.element.querySelector("#title");
        this.descriptionInputElemnt = this.element.querySelector("#description");
        this.mandayInputElemnt = this.element.querySelector("#manday");
        this.configure();
        this.attach();
    }
    //ユーザーの入力受け取り
    getUserInput() {
        const enteredTitle = this.titleInputElemnt.value;
        const enteredDescription = this.descriptionInputElemnt.value;
        const enteredManday = this.mandayInputElemnt.value;
        //バリデーション
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
        if (!validate(titleValidatable) &&
            !validate(descriptionValidatable) &&
            !validate(mandayValidatable)) {
            alert("入力間違い");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredManday];
        }
    }
    //フォームクリア
    clearInputs() {
        this.titleInputElemnt.value = "";
        this.descriptionInputElemnt.value = "";
        this.mandayInputElemnt.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.getUserInput();
        //jsでタプルの判定は出来ないため配列かどうかを確かめる
        if (Array.isArray(userInput)) {
            const [title, desc, manday] = userInput;
            projectState.addProject(title, desc, manday);
        }
        this.clearInputs();
    }
    //submitボタンにイベントハンドラ追加
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    //appにテンプレートフォームをアタッチ
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const prInput = new ProjectInput();
const activePrList = new ProjectList("active");
const finishedPrList = new ProjectList("finished");
