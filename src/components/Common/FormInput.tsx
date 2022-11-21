import { useState } from "react";
import { TextField } from "@mui/material";

const FormInput = (props: any) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <>
      <TextField
        key={props.id}
        fullWidth
        variant="outlined"
        size="medium"
        helperText={props.helperText}
        inputProps={{
          required: true,
          name: props.name,
          type: props.type,
          pattern: props.pattern,
          placeholder: props.placeholder,
          focused: `${focused}`,
        }}
        onBlur={handleFocus}
        onChange={(e) => props.onChange(e)}
      />
    </>
  );
};

export default FormInput;
