import React, { ChangeEventHandler, FocusEventHandler } from "react";

interface FileInputProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange, onBlur, name }, ref) => {
    return (
      <input
        type="file"
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        accept="image/gif, image/jpeg, image/png"
        multiple
      />
    );
  }
);

export default FileInput;
