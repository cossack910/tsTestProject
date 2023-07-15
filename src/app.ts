//Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable): boolean {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }

  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }

  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.maxLength;
  }

  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }

  return isValid;
}

//デコレータ
function autobind(
  target: any,
  methosName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
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
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importNode = document.importNode(this.templateElement.content, true);
    this.element = importNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    this.attach();
    this.renderContent();
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type === "active" ? "実行中" : "完了";
  }

  //appにテンプレートフォームをアタッチ
  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElemnt: HTMLInputElement;
  descriptionInputElemnt: HTMLInputElement;
  mandayInputElemnt: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importNode = document.importNode(this.templateElement.content, true);
    this.element = importNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInputElemnt = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElemnt = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.mandayInputElemnt = this.element.querySelector(
      "#manday"
    )! as HTMLInputElement;
    this.configure();
    this.attach();
  }

  //ユーザーの入力受け取り
  private gatherUserInput(): [string, string, number] | void {
    const entererdTitle = this.titleInputElemnt.value;
    const entererdDescription = this.descriptionInputElemnt.value;
    const entererdMandayInput = this.mandayInputElemnt.value;
    //バリデーション
    const titleValidatable: Validatable = {
      value: entererdTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: entererdDescription,
      required: true,
      minLength: 5,
    };
    const mandayValidatable: Validatable = {
      value: +entererdMandayInput,
      required: true,
      min: 1,
      max: 1000,
    };
    if (
      !validate(titleValidatable) &&
      !validate(descriptionValidatable) &&
      !validate(mandayValidatable)
    ) {
      alert("入力間違い");
      return;
    } else {
      return [entererdTitle, entererdDescription, +entererdMandayInput];
    }
  }

  //フォームクリア
  private clearInputs(): void {
    this.titleInputElemnt.value = "";
    this.descriptionInputElemnt.value = "";
    this.mandayInputElemnt.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    //jsでタプルの判定は出来ないため配列かどうかを確かめる
    if (Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
    }
    this.clearInputs();
  }

  //submitボタンにイベントハンドラ追加
  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  //appにテンプレートフォームをアタッチ
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prInput = new ProjectInput();
const activePrList = new ProjectList("active");
const finishedPrList = new ProjectList("finished");
