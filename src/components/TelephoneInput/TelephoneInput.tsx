import { MuiTelInput } from "mui-tel-input";
import { FC } from "react";


type TelephoneInputProps = {
  value: string ;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
}

const TelephoneInput : FC<TelephoneInputProps>= ({ value, onChange, error, helperText }) => {
  return (
    <MuiTelInput
      value={value}
      onChange={onChange}
      defaultCountry="IN"
      forceCallingCode
      error={error}
      helperText={helperText}
    />
  );
};

export default TelephoneInput;
