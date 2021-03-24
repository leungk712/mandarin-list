import { extend } from "vee-validate";
import {
  confirmed,
  email,
  length,
  min,
  regex,
  required
} from "vee-validate/dist/rules";

extend("confirmed", {
  ...confirmed,
  message: "The password and confirmation password do not match"
});

extend("email", {
  ...email,
  message: "This must be a valid email"
});

extend("length", {
  ...length,
  message: "This field must be {length} characters"
});

extend("min", {
  ...min,
  message: "This field must be a minimum of {length} characters"
});

extend("passwordValidation", {
  ...regex,
  message:
    "Password must have minimum eight characters, at least one letter, one number, and one special character"
});

extend("required", {
  ...required,
  message: "This field is required"
});
