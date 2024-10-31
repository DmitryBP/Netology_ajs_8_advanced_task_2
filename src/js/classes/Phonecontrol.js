export default class Phonecontrol {
  static phoneClear(phoneNumber){
    const regExp = /[\W]/gm;
    const clearPhoneNumber = phoneNumber.replace(/^8/, '7').replace(regExp, '')
    return '+' + clearPhoneNumber;
  }
}