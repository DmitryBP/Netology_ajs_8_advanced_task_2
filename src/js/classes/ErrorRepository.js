export default class ErrorRepository {
  constructor() {
    this.errorsMap = new Map();
  }

  addError(code, text) {
    if (typeof code !== "number") {
      throw new Error("Ключ должен быть числом");
    }
    if (typeof text !== "string") {
      throw new Error("Значение должно быть строкой");
    }
    this.errorsMap.set(code, text);
  }

  translate(code) {
    return this.errorsMap.has(code)
      ? this.errorsMap.get(code)
      : "Unknown error";
  }
}
