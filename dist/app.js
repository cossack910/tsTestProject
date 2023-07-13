"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    gatherUserInput() {
        const entererdTitle = this.titleInputElemnt.value;
        const entererdDescription = this.descriptionInputElemnt.value;
        const entererdMandayInput = this.mandayInputElemnt.value;
        //バリデーション
        if (entererdTitle.trim().length == 0 ||
            entererdDescription.trim().length == 0 ||
            entererdMandayInput.trim().length == 0) {
            alert("入力間違い");
            return;
        }
        else {
            return [entererdTitle, entererdDescription, +entererdMandayInput];
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
        const userInput = this.gatherUserInput();
        //jsでタプルの判定は出来ないため配列かどうかを確かめる
        if (Array.isArray(userInput)) {
            const [title, desc, manday] = userInput;
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
