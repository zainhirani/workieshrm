import { ChangeEvent } from "react";
import { FormikErrors, FormikTouched } from "formik";

interface RegisterInputProps {
  firstName?: string;
  lastName?: string;
  nickName?: string;
  gender?: string;
  email?: string;
  rfuID?: string;
  program?: string;
  graduation?: string;
  birthPlace?: string;
  userName?: string;
  password?: string;
  confirmPassword?: string;
  dob?: string;
  pharmacy?: string;
  partTime?: boolean;
  bioChemistry?: boolean;
  maths?: string;
  learn?: string;
  sequence?: string;
  study?: string;
  played?: string;
  volunteer?: boolean;
  hobbies?: string;
  currentPassword?: string;
}

export interface RegisterProps {
  values: RegisterInputProps;
  touched: FormikTouched<RegisterInputProps>;
  errors: FormikErrors<RegisterInputProps>;
  handleBlur: (e: ChangeEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  disable: boolean;
}
