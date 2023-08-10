// Коллекция методов для валидации полей ввода данных и получение различной информации о некорректно введенных данных.
class Validator {
  constructor(email, phone, password) {
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.dataList = [];
    this.dataLists = [];
    this.ValidateEnteredParametersOfUser = [];
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
  addResult(
    userId,
    resultValidateEmail,
    resultValidatePassword,
    resultValidatePhone
  ) {
    return this.ValidateEnteredParametersOfUser.push(
      (this.userId = userId),
      (this.resultValidateEmail = resultValidateEmail),
      (this.resultValidatePassword = resultValidatePassword),
      (this.resultValidatePhone = resultValidatePhone)
    );
  }

  //
  addResults(ValidateEnteredParametersOfUser) {
    return this.results.push(ValidateEnteredParametersOfUser);
  }

  //
  validateEmail(email) {
    // Проверка на корректность вводимого email-адреса.
    const regexp =
      /^[a-z0-9][a-z0-9.+-]{1,19}@[a-z0-9.!$%&*+/=?^_-]{1,15}\.[a-z]{1,3}$/iu;
    return regexp.test(email);
  }

  // Проверка на корректность вводимого номера телефона.
  validatePhone(phone) {
    // Проверка максимального количества введенных символов в строке (телефоне).
    if (phone.length > 25) {
      return false;
    } else {
      // Выбрать из строки только цифры.
      const cleanedPhone = phone.replace(/[^\d]/g, "");
      const numberSize = cleanedPhone.length;
      // Количественно-численная проверка корректности введенного пользователем номера телефона.
      if (numberSize !== 12 && numberSize !== 10) return false;
    }
    // Посимвольная проверка корректности номера телефона.
    const regexp = /^(\+\d\d)?[\s-]*\(?\d{3}[\s-]*\)?([\s-]*\d){7}$/u;
    return regexp.test(phone);
  }

  // Проверка на корректность устанавливаемого значения пароля.
  validatePassword() {}

  // Вывод имени пользователя 'userId' и некорректно введенные им поля данных.
  getIncorrectlyEnteredData() {}
}

module.exports = Validator;
