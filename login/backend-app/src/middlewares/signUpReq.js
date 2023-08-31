function Validator(req, res, next) {
  let error = {};
  const { name, email, password } = req.body;
  const email_pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const password_pattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (name === "") {
    error.name = "Name is required";
  }

  if (email === "") {
    error.email = "Email is required";
  } else if (!email_pattern.test(email)) {
    error.email = "Email didn't match";
  }

  if (password === "") {
    error.password = "password is required";
  } else if (!password_pattern.test(password)) {
    error.password = "password didn't match";
  }

  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }
  next();
}

module.exports = Validator;
