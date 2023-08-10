const Validator = require("./Validator");

// Класс тестирования.
function runTests() {
  // Вод информации первым пользователем.
  const user0 = new Validator(
    "fi@seconDpart.end",
    "+38 (099) 567 8901",
    "C00l_Pass"
  );

  // Вод информации вторым пользователем.
  const user1 = new Validator(
    "first-part@.se=cond%p.art.end",
    "+12 099 5 6 7-8 9  01",
    "SupperPas1"
  );

  // Вод информации третьим пользователем.
  const user2 = new Validator(
    "firSt.part@se=cond%part.r",
    "(09-9) 567-890-1",
    "Next_SuperPass0"
  );

  // Вод информации четвертым пользователем.
  const user3 = new Validator("1+@’.Y", "--  (099) 567 890-1", "BigPassword0");

  // Вод информации пятым пользователем.
  const user4 = new Validator(
    "f@secondart.end",
    "+38 (099) 567 8901 0",
    "Cool_pass"
  );

  // Вод информации шестым пользователем.
  const user5 = new Validator(
    "first-part@.se=cond@part.end",
    "+38 099 a0000012",
    "C00l"
  );

  // Вод информации седьмым пользователем.
  const user6 = new Validator(
    "-firstpart@.se=cOnd%.enddeded",
    "+38 (0989) 567 8901",
    "_passNext"
  );

  // Вод информации восьмым пользователем.
  const user7 = new Validator(
    "firs_tpart@.se.en",
    "+48 (0989) 567 8901",
    "not_valid4"
  );

  // Create a new instance of the 'Validator' class.
  const validator = new Validator();

  // Создание базы данных.
  validator.addData(user0);
  validator.addData(user1);
  validator.addData(user2);
  validator.addData(user3);
  validator.addData(user4);
  validator.addData(user5);
  validator.addData(user6);
  validator.addData(user7);

  // Обработка базы данных.
  for (let i = 0; i < validator.dataLists.length; i++) {
    // Получение всех данных для проверки, введенных определенным пользователем.
    const dataListValue = validator.dataLists[i];
    // Результат проверки корректности введенного пользователем 'Email'.
    const resultValidateEmail = validator.validateEmail(
      dataListValue.getEmail()
    );
    // Результат проверки корректности введенного пользователем 'Password'.
    const resultValidatePassword = validator.validatePassword(
      dataListValue.getPassword()
    );
    // Результат проверки корректности введенного пользователем 'Phone'.
    const resultValidatePhone = validator.validatePhone(
      dataListValue.getPhone()
    );
    // Генерация и вывод на консоль всей информации, получаемой при тестировании.
    getResultForConsole(
      resultValidateEmail,
      i,
      dataListValue,
      resultValidatePassword,
      resultValidatePhone
    );
  }

  // Генерация и вывод на консоль всей информации, получаемой при тестировании.
  function getResultForConsole(
    resultValidateEmail,
    i,
    dataListValue,
    resultValidatePassword,
    resultValidatePhone
  ) {
    if (!resultValidateEmail) {
      console.log(
        `User${i} Некорректно введен Email    : ${dataListValue.getEmail()}`
      );
    } else
      console.log(
        `User${i} Email введен корректно      : ${dataListValue.getEmail()}`
      );
    if (!resultValidatePassword) {
      console.log(
        `User${i} Некорректно введен Password : ${dataListValue.getPassword()}`
      );
    } else
      console.log(
        `User${i} Password введен корректно : ${dataListValue.getPassword()}`
      );
    if (!resultValidatePhone) {
      console.log(
        `User${i} Некорректно введен Phone    : ${dataListValue.getPhone()}`
      );
    } else
      console.log(
        `User${i} Phone введен корректно      : ${dataListValue.getPhone()}`
      );
  }
}

runTests();
