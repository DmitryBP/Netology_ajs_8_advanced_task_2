/* 
Map
Легенда
Вы решили упорядочить работу с ошибками в своём приложении, а именно ввести цетрализованно числовой код ошибки и её описание.
И при генерации любых ошибок в коде приложения брать их из централизованного хранилища.

Описание
Создайте свой класс ErrorRepository внутри которого храните Map,
в котором ключ - это код ошибки (число), а значение - текстовое описание (человекочитаемое).

Реализуйте метод translate(code), позволяющий по коду получить текст ошибки,
а в случае отсутствия подобного кода возвращать строку 'Unknown error'.

Не забудьте написать unit-тесты, которые обеспечивают 100% покрытие функций и классов, которые вы тестируете. 
*/

export default class ErrorRepository {
    constructor() {
        this.errorList = new Map;
        this.errorList.set(101, 'Некая ошибка 101')
        this.errorList.set(102, 'Некая ошибка 102')
    }

    translate(code) {
        if(this.errorList.get(code) !== undefined){
            return this.errorList.get(code)
        } else {
            throw new Error('Unknown error')
        }
    }
}

let errorRepository = new ErrorRepository;

console.log(errorRepository.translate(101))
console.log(errorRepository.translate(102))
// console.log(errorRepository.translate(103)) // throw new Error('Unknown error')

