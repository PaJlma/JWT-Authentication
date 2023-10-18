import { FC, InputHTMLAttributes, ReactElement, ReactNode } from "react";
import { FieldErrors, LiteralUnion, UseFormRegisterReturn } from "react-hook-form";

import styles from "./Input.module.scss";

interface IValidationError {
  reason: "disabled" | "max" | "maxLength" | "min" | "minLength" | "pattern" | "required" | "value" | "onChange" | "onBlur" | "validate" | "setValueAs" | "shouldUnregister" | "deps" | "valueAsNumber" | "valueAsDate";
  message: string;
}

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement | ReactNode;
  errors?: FieldErrors;
  register?: UseFormRegisterReturn;
  validationErrors?: IValidationError[];
}

const Input: FC<IInput> = ({ 
  icon, 
  errors, 
  register, 
  validationErrors,
  ...attrs 
}) => {
  return (
    <div 
      className={`${styles.body} 
      ${ register && errors && errors[register.name]?.type && styles.error }`}
    >
      <input {...register} {...attrs} />
      
      { icon }

      {
        register && errors &&
        <div className={styles["validation-error"]}>
          {
            validationErrors?.find(error => error.reason === errors[register.name]?.type)?.message ?? ""
          }
        </div>
      }
    </div>
  );
}

export default Input;