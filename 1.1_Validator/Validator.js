// A collection of methods for validating data entry fields and getting various information about the results of this validation.
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

  // Returns the Email.
  getEmail() {
    return this.email;
  }

  // Returns the Phone.
  getPhone() {
    return this.phone;
  }

  // Returns the Password.
  getPassword() {
    return this.password;
  }

  // A record of all data fields entered by the user.
  addData(dataList) {
    return this.dataLists.push(dataList);
  }

  // Record according to the unique user identifier of the received validation results of all user-entered data fields.
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

  // Check for the correctness of the string with the entered 'email'.
  validateEmail(email) {
    // Regular expression used for character-by-character validation of the string being checked.
    const regexp =
      /^[a-z0-9][a-z0-9.+-]{1,19}@[a-z0-9.!$%&*+/=?^_-]{1,15}\.[a-z]{1,3}$/iu;
    return regexp.test(email);
  }

  // Check for the correctness of the string with the entered phone number.
  validatePhone(phone) {
    // Check the maximum number of entered characters in a string 'phone'.
    if (phone.length > 25) {
      return false;
    } else {
      // Select only numbers from a string.
      const cleanedPhone = phone.replace(/[^\d]/g, "");
      const numberSize = cleanedPhone.length;
      // Quantitative-numerical preliminary check of the correctness of the phone number entered by the user.
      if (numberSize !== 12 && numberSize !== 10) return false;
    }
    // Regular expression used for character-by-character validation of the string being checked.
    const regexp = /^(\+\d\d)?[\s-]*\(?\d{3}[\s-]*\)?([\s-]*\d){7}$/u;
    return regexp.test(phone);
  }

  // Checking for correctness of the string containing the 'password' value.
  validatePassword(password) {
    // Regular expression used for character-by-character validation of the string being checked.
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_]{8,}$/;
    return regexp.test(password);
  }
}

module.exports = Validator;
