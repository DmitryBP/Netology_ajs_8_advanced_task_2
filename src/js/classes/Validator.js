export default class Validator {
  static validateUsername(name){
    return /^([a-zA-Z]+[\w_-]{0,3}[a-zA-Z_-]*)*[^0-9-\W_]$/.test(name)
  }
}