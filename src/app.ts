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
    if (
      entererdTitle.trim().length == 0 ||
      entererdDescription.trim().length == 0 ||
      entererdMandayInput.trim().length == 0
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
