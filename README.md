- ```nvm use 22.14.0```


<hr>

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
* What is ```endAdornment ?```
* endAdornment is used to place an element inside the input field, at the end (right side).
* You can use it to add icons, text, buttons, etc., that appear inside the input
* **Common use cases:**
* Currency symbols
* Suffix text (@gmail.com, .com)
* Password visibility toggle icons
* What is ```InputAdornment ?```
* It’s a Material UI component that wraps any element (text, icon, etc.) you want to place inside the input as an adornment.

<hr>

```
<LocalizationProvider dateAdapter={AdapterDayjs}>
    <DesktopDatePicker
      label="Date of Birth"
      value={dob}
      format="DD/MM/YYYY"
      onChange={(newDate) => {
        console.log("newDate",newDate)
        setDob(newDate);
        const age = calculateAge(newDate);
        setValue("age", age);
      }}
      disableFuture
      minDate={dayjs('1995-01-31')}
      openTo="day" 
      views={['year','month','day',]} 
    />
</LocalizationProvider>
```

* ```LocalizationProvider``` : Think of it like a "provider" that tells MUI how to format, parse, and localize dates.
* ithout this, the date pickers won't work correctly because MUI wouldn't know how to handle your date format, locale, and adapter.
* ```dateAdapter``` is a prop of LocalizationProvider. It tells MUI which date library to use.
* ```AdapterDayjs``` is the adapter that connects Day.js to MUI pickers.
* ```setValue("age", age);``` It updates the value of the form field called "age" in your form state.
* minDate expects a Day.js object,not a string
* ```openTo``` when the field is clicked first we get an option to select day
* ``` views={['year','month','day',]} ``` this is the flow in which selection is made avaialable to us
---
```
export const userSearch = (searchQuery: string) => {
  const params: Record<string, any> = { q: searchQuery };

  if (searchQuery.trim() === "") {
    params.limit = 10;
  }

  return axiosClient.get(endPoints.USER_SEARCH, {
    // "params":params, >> below is the shorhand 
    params
  });
};

```
* ```Record<string, any>``` : An object where the keys are all of type string
* The values can be anything (i.e., any)

---
```
Info about styled compoennet :

const Main = styled("main", {shouldForwardProp: (prop) => prop !== "open"})
<
{
  open?: boolean;
  drawerWidth?: number;
}
>

(({ theme, open, drawerWidth  }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));
```
---
```
Eg of how a styled component is used

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
  drawerWidth?: number;
}>(({ theme, open, drawerWidth  }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));
```
```
# theme is a deafult prop available to us 
# Its the  MUI theme object

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

# ({ theme })  the paranthesis is required in arrow function if we are destructuring on the fly
# else we can use like 

const DrawerHeader = styled("div")( props => ({
  display: "flex",
  alignItems: "center",
  padding: props.theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...props.theme.mixins.toolbar,
  justifyContent: "flex-end",
}));


```
---
```
const StyledComponentName = styled("div",{})<props>(() => ());
# props : all the props that we are passing to the StyledComponentName when we use them
const prop = {
  open?: boolean;
  drawerWidth?: number;
}
# The second parameter in styled("div",{}) is an optional config

const StyledComponentName = styled("div",{})<props>(() => ({
  display: "flex",
}));
```

```
() => ()
This is an arrow function that takes an object as a parameter and returns another object.
so we use paranthesis
else we can write like
() => {
  return {
    flexGrow: 1,
  }
}

eg :

const DrawerHeader = styled("div")(({ theme }) => 
  {
    return{
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    }
  }
  );

```
---
```
const StyledComponentName = styled("div",{})<props>(() => ());
The outer () wraps the arrow function 

```
---
* In React, useNavigate() from react-router-dom can only be used inside components, not in utility files or API files. 
* So when you want to navigate programmatically from outside React components (like from an API error handler or utility function), you need a workaround.
* Refer ```navigationHelper.ts NavigationRegistrar.tsx and App.tsx```
* **NavigationRegistrar.tsx :** 
  * It runs once on mount, gets navigate() from React Router via useNavigate(), and stores it globally via setNavigator().

---