import * as Yup from "yup";
import { isValidPhoneNumber } from 'libphonenumber-js';
export const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string().typeError("Middle Name must be a string"),
    lastName: Yup.string().required("Last Name is required"),
    age: Yup.number()
      .required("Age is required")
      .min(20, "Age must be greater than 20")
      .max(40, "Age must be less than 30"),
    // phone: Yup.string().test(
    //   "is-phone-valid",
    //   "Phone number is required",
    //   (value) => Boolean(value && value.length > 3)
    // ),
    phone: Yup.string()
      .required("Phone number is required")
      .test("is-phone-valid", "Phone number is invalid", (value) => {
        return value ? isValidPhoneNumber(value) : false;
      }),
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
  });

  export type FormInputTypes = Yup.InferType<typeof validationSchema>;

  // Yup.object() : This creates a Yup schema object.
  // we’re telling Yup : I’m validating an object with multiple fields.
  // .shape({ ... })
  // The shape() method is used to define the structure of that object. You pass it an object with each key being a field name, and each value being a rule/schema.
  // Yup.string() : Expects a string value
  // firstName is the name of the field that needs to be validated [<Controller name="firstName" ... />]