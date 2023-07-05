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

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElemnt.value);
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  //appにテンプレートフォームをアタッチ
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prInput = new ProjectInput();
