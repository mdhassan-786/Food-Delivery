const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Inside login");
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(400).send("User does not exist");
  }
  const isPasswordMatchingFromDb = await bcrypt.compare(
    password,
    user.password
  );

  if (isPasswordMatchingFromDb) {
    const token = jwt.sign({ userId: user._id }, "randomesecret");

    return res.status(200).json({
      token: token,
      user: user,
    });
  }
  return res.status(401).send("Incorrect login credentials");
};

const signupUser = async (req, res) => {
  const { name, email, password, cnf_password } = req.body;

  if (password !== cnf_password) {
    return res.status(400).send("The password don't match");
  }

  if (password.length < 8) {
    return res.status(400).send("Create a stronger password");
  }

  const userExists = await UserModel.findOne({ email: email });

  if (!userExists) {
    //create a user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    const token = jwt.sign({ userId: savedUser._id }, "randomesecret");

    return res.status(200).json({
      token: token,
      user: savedUser,
    });
  } else {
    return res.status(400).send("User already exists");
  }

  res.send("Sign up successful");
};

module.exports = {
  signupUser,
  loginUser,
};
