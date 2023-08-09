// Коллекция методов для валидации полей ввода данных и получение различной информации о некорректно введенных данных.
class Validator {
  constructor(email, phone, password) {
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.dataList = [];
    this.dataLists = [];
    this.results = [];
  }

  //
  getEmail() {
    return this.email;
  }

  //
  getPhone() {
    return this.phone;
  }

  //
  getPassword() {
    return this.password;
  }

  //
  addData(dataList) {
    return this.dataLists.push(dataList);
  }

  //
  addResults(
    userId,
    resultValidateEmail,
    resultValidatePassword,
    resultValidatePhone
  ) {
    return this.results.push(
      this.userId = userId,
      this.resultValidateEmail = resultValidateEmail,
      this.resultValidatePassword = resultValidatePassword,
      this.resultValidatePhone = resultValidatePhone
    );
  }

  //
  validateEmail(email) {
    // const test = /^(\w[a-z0-9]{2, 20})@([\w-.!$%&`*+/=?^]{1, 15})\.(a-z){1, 3}$/gi;

    // Проверка на корректность вводимого email-адреса.
    const regexp =
      /^[a-zA-Z0-9][a-zA-Z0-9.+-]{1,19}@[a-zA-Z0-9.!$%&*+/=?^_-]{1,15}\.[a-zA-Z]{1,3}$/g;

    return regexp.test(email);

    // const regexp =
    //   /^ ... $/;
    //    return regexp.test(email);
  }

  // Проверка на корректность вводимого номера телефона.
  validatePhone(phone) {
    // Проверка максимального количества введенных символов в строке (телефоне).
    if (phone.length > 25) {
      return false;
    }

    // Проверка корректности номера телефона.
    const regexp = /^...$/;
    return regexp.test(phone);
  }

  // Проверка на корректность устанавливаемого значения пароля.
  validatePassword() { }
  
  // Вывод имени пользователя 'userId' и некорректно введенные им поля данных.
  getIncorrectlyEnteredData() {

  }

}

module.exports = Validator;
