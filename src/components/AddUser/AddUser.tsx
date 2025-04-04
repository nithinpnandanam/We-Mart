import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { FC } from "react";
import { AddUserProps } from "./AddUser.types";
import { InputAdornment } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import TelephoneInput from "../TelephoneInput/TelephoneInput";
import { isValidPhoneNumber } from 'libphonenumber-js';

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { InferType } from 'yup';

import "./AddUser.css";

import { useState } from "react";

import dayjs, { Dayjs } from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Yup.object() : This creates a Yup schema object.
// we’re telling Yup : I’m validating an object with multiple fields.
// .shape({ ... })
// The shape() method is used to define the structure of that object. You pass it an object with each key being a field name, and each value being a rule/schema.
// Yup.string() : Expects a string value
// firstName is the name of the field that needs to be validated [<Controller name="firstName" ... />]

// const validationSchema = Yup.object().shape({
//   firstName: Yup.string().required("First Name is required"),
//   lastName: Yup.string().required("Last Name is required"),
//   middleName:Yup.string().required("Last Name is required"),
//   age: Yup.number()
//     .required("Age is required")
//     .min(20, "Age must be greater than 20")
//     .max(40, "Age must be less than 30"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   username: Yup.string().required("Username is required"),
//   phone:Yup.string().test("is-complete", "Phone number is required", (value:string|undefined) => {
//     return Boolean(value && value.length > 3);

//   })

// });

const validationSchema = Yup.object({
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


type FormInputTypes = InferType<typeof validationSchema>;

const AddUser: FC<AddUserProps> = ({ handleClose, open }) => {
  const [dob, setDob] = useState<Dayjs | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputTypes>({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      age: undefined,
      phone: "",
      email: "",
      username: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmitForm: SubmitHandler<FormInputTypes> = (data) => {
    console.log("onSubmitForm", data);
  };

  // calculating the age
  const calculateAge = (dob: any | null) => {
    console.log("dob", dob.month());
    if (!dob) return 0;
    const today = dayjs();
    let age = today.year() - dob.year();

    // Check if birthday has not occurred yet this year
    if (
      today.month() < dob.month() ||
      (today.month() === dob.month() && today.date() < dob.date())
    ) {
      age--;
    }
    return age;
  };

  return (
    <Box className="add-user-container">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <Box sx={style} className="user-details-container">
              <Typography id="transition-modal-title" variant="h4">
                Add New User
              </Typography>
              <div className="user-details">
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="First Name"
                        variant="outlined"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                      />
                    );
                  }}
                />
                <Controller
                  name="middleName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Middle Name"
                      variant="outlined"
                      error={!!errors.middleName}
                      helperText={errors.middleName?.message}
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      variant="outlined"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </div>
              <div className="user-details">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Date of Birth"
                    value={dob}
                    format="DD/MM/YYYY"
                    onChange={(newDate) => {
                      console.log("newDate", newDate);
                      setDob(newDate);
                      const age = calculateAge(newDate);
                      setValue("age", age);
                    }}
                    disableFuture
                    minDate={dayjs("1995-01-31")}
                    openTo="day"
                    views={["year", "month", "day"]}
                  />
                </LocalizationProvider>

                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Age"
                      variant="outlined"
                      type="number"
                      error={!!errors.age}
                      helperText={errors.age?.message}
                      disabled
                      // slotProps={{
                      //   input: {
                      //     readOnly: true
                      //   },
                      // }}
                      slotProps={{
                        inputLabel: {
                          shrink: Boolean(field.value), 
                        },
                      }}
                    />
                  )}
                />
                 {/* if shrink is true : label moves up  */}
                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState }) =>{
                    console.log(field,fieldState)
                    return (
                      <TelephoneInput
                        value={field.value??''}
                        onChange={field.onChange}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )
                  } }
                />
              </div>
              <div className="user-details">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => {
                    const handleEmailChange = (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const value = e.target.value.replace(/@gmail\.com$/, "");
                      field.onChange(`${value}@gmail.com`);
                    };
                    // This field object contains everything necessary to connect your input (e.g., TextField) to the form state — and one of the key properties is: field.onChange
                    // This is a function that:
                    // updates the form state when the input value changes.
                    // it's automatically wired into the form's validation and state tracking.
                    // Usage of value in Textfield Visually shows only the first part of the email

                    return (
                      <TextField
                        {...field}
                        value={field.value?.replace(/@gmail\.com$/, "") || ""}
                        onChange={handleEmailChange}
                        label="Email"
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position="end">
                                @gmail.com
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    );
                  }}
                />
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Username"
                      variant="outlined"
                      error={!!errors.username}
                      helperText={errors.username?.message}
                    />
                  )}
                />
              </div>
              <Button
                color="secondary"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
              >
                Save
              </Button>
            </Box>
          </form>
        </Fade>
      </Modal>
    </Box>
  );
};

export default AddUser;
