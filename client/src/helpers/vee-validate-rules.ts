import { extend } from "vee-validate";
import { confirmed, email, length, min, regex, required } from "vee-validate/dist/rules";

extend("confirmed", {
    ...confirmed,
    message: "this is not confirmed yo"
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
    message: "This password must be at least 8 characters, include a number, and a special character"
});

extend("required", {
    ...required,
    message: "This field is required"
})