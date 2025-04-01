import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";

const TelephoneInput = () => {
    const [value, setValue] = useState<string>('')

  const handleChange = (newValue:string) => {
    setValue(newValue);
  };

  return <MuiTelInput value={value} onChange={handleChange} defaultCountry="IN"/>;
};

export default TelephoneInput;
