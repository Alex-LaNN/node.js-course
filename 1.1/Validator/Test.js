const Validator = require("./Validator");

// Test function.
function runTests() {
  // Information entered by the first user.
  const user0 = new Validator(
    "fi@seconDpart.end",
    "+38 (099) 567 8901",
    "C00l_Pass"
  );

  // Information entered by the second user.
  const user1 = new Validator(
    "first-part@.se=cond%p.art.end",
    "+12 099 5 6 7-8 9  01",
    //    "SupperPas1"
    "upper_as1"
  );

  // Information entered by a third user.
  const user2 = new Validator(
    "firSt.part@se=cond%part.r",
    "(09-9) 567-890-1",
    //    "Next_SuperPass0"
    "NEXT_SUPERPASSO0"
  );

  // Information entered by the fourth user.
  const user3 = new Validator("1+@’.Y", "--  (099) 567 890-1", "BigPassword0");

  // Information entered by the fifth user.
  const user4 = new Validator(
    "f@secondart.end",
    "+38 (099) 567 8901 0",
    "Cool_pass"
  );

  // Information entered by the sixth user.
  const user5 = new Validator(
    "first-part@.se=cond@part.end",
    "+38 099 a0000012",
    "C00l"
  );

  // Information entered by the seventh user.
  const user6 = new Validator(
    "-firstpart@.se=cOnd%.enddeded",
    "+38 (0989) 567 8901",
    "_passNext"
  );

  // Information entered by the eighth user.
  const user7 = new Validator(
    "firs_tpart@.se.en",
    "+48 (0989) 567 8901",
    "not_valid4"
  );

  // Create a new instance of the 'Validator' class.
  const validator = new Validator();

  // Creation of a shared database.
  validator.addData(user0);
  validator.addData(user1);
  validator.addData(user2);
  validator.addData(user3);
  validator.addData(user4);
  validator.addData(user5);
  validator.addData(user6);
  validator.addData(user7);

  // Database processing.
  for (let i = 0; i < validator.dataLists.length; i++) {
    // Receiving all data entered by a specific user for verification.
    const dataListValue = validator.dataLists[i];
    // The result of checking the correctness of the form of the 'Email' entered by the user.
    const resultValidateEmail = validator.validateEmail(
      dataListValue.getEmail()
    );
    // The result of checking the correctness of the form entered by the user 'Password'.
    const resultValidatePassword = validator.validatePassword(
      dataListValue.getPassword()
    );
    // The result of checking the correctness of the view entered by the user 'Phone'.
    const resultValidatePhone = validator.validatePhone(
      dataListValue.getPhone()
    );
    // Generation and output to the console of all information obtained during testing.
    getResultForConsole(
      resultValidateEmail,
      i,
      dataListValue,
      resultValidatePassword,
      resultValidatePhone
    );
  }

  // Generation and output to the console of all information obtained during testing.
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
        `User${i} Password введен корректно   : ${dataListValue.getPassword()}`
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
