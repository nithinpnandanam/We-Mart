import "./AddUser.css";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { FC } from "react";
import { AddUserProps } from "./AddUser.types";
import { InputAdornment, inputBaseClasses } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import TelephoneInput from "../TelephoneInput/TelephoneInput";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string().required("Middle Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  age: Yup.number()
    .required("Age is required")
    .min(21, "Age must be greater than 20")
    .max(29, "Age must be less than 30"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string().required("Username is required"),
});

interface IFormInput {
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  email: string;
  username: string;
}

const AddUser: FC<AddUserProps> = ({ handleClose, open }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      age: undefined,
      email: "",
      username: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("onSubmit", data);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={style} className="user-details-container">
              <Typography id="transition-modal-title" variant="h4">
                Add New User
              </Typography>
              <div className="user-details">
                <Controller
                  name="firstName"
                  control={control}
                  render={( {field} ) => {
                    console.log("field",field)
                    return (
                      <TextField
                        {...field}
                        label="First Name"
                        variant="outlined"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                      />
                    )
                  }
                    }
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
                    />
                  )}
                />
                <TelephoneInput />
              </div>
              <div className="user-details">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">@gmail.com</InputAdornment>
                        ),
                      }}
                    />
                  )}
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


