"use strict";
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        this.attach();
    }
    //appにテンプレートフォームをアタッチ
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
const prInput = new ProjectInput();
