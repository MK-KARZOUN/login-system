function Validation(values) {
  let error = {};
  const email_pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const password_pattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (values.email === "") {
    error.email = "Name should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email didn't match";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "password didn't match";
  } else {
    error.password = "";
  }
  return error;
}

export default Validation;
