- 22.14.0
- how to use fonts
- fix issues with @ imports
- Where Should You Use ```<FormControl>``` ?
- Whenever you use input fields (like`<Select>`, `<TextField>`, `<Checkbox>`, etc.)
- When you need form validation with MUI components.
- To group related inputs with labels

```
  <Select
  labelId="demo*simple*select*label"
  id="demo*simple*select"
  value={sortBy}
  label="Sort"
  onChange={handleChange}
  MenuProps={{
    sx: {
      "& .MuiPaper*root": {
        borderRadius: "10px",
        left: "4px !important"
      }
    }
  }}
>
```

<hr>

- & refers to the parent.So we use it for correct scoping
- When applying styles inside a component, & ensures they only affect the specific instance, not globally.

<hr>

```
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
```

- Controller component from react-hook-form, which is used to connect controlled UI components (like MUI's TextField) with the form management system of react-hook-form
  `control={control}`
- It's responsible for registering inputs, managing their state, and handling validation in react-hook-form.
- error >> gives a boolean check
- helperText >> prop used for showing the message

```
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>
```

- `errors.lastName` is undefined if there is no error
- `!!undefined` → `false`
- Displays the red error outline when there's a validation error

<hr>

```
const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: yupResolver(validationSchema),
});
```

- The yupResolver connects Yup to react-hook-form.
- If validation fails, react-hook-form stores the errors in the errors object.

```
errors = {
  lastName: {
    type: "required",
    message: "Last Name is required",
  },
  ...
}
```

<hr>

```
<TextField
  {...field}
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
    inputLabel:{
      sx: {
        color: 'blue',
        fontSize: '1.2rem'
      }
    }
  }}
/>

```
* What is ***endAdornment***?
* endAdornment is used to place an element inside the input field, at the end (right side).
* You can use it to add icons, text, buttons, etc., that appear inside the input
**Common use cases:**
* Currency symbols
* Suffix text (@gmail.com, .com)
* Password visibility toggle icons
* What is ***InputAdornment**?
* It’s a Material UI component that wraps any element (text, icon, etc.) you want to place inside the input as an adornment.

<hr>
