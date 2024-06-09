// Firebase configurations

export const NEXT_PUBLIC_FIREBASE_API_KEY =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
// export const LOG_ANALYTICS = true;
export const NEXT_PUBLIC_FIREBASE_PROJECT_ID =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
export const NEXT_PUBLIC_FIREBASE_MESSAGING_ID =
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID;
export const NEXT_PUBLIC_FIREBASE_APP_ID =
  process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
export const NEXT_PUBLIC_MODE_ENV =
  process.env.NEXT_PUBLIC_MODE_ENV === "development";

export const AUTH_LOGIN_URL = process.env.NEXT_PUBLIC_AUTH_LOGIN_URL;
export const AUTH_SIGNUP_URL = "/register";
export const AUTH_VERIFY_URL = "/verification";

export const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const Success = {
  backgroundColor: "#34c38f2e",
  color: "#34c38f",
};
export const Error = {
  backgroundColor: "#f46a6a2e",
  color: "#f46a6a",
};

export const Warning = {
  backgroundColor: "#f1b44c2e",
  color: "#f1b44c",
};
export const LOGO = "/logo.svg";
export const UPLOAD = "/upload-img.svg";


export const map: any = {
  active: {
    text: 'Active',
    style: Success
  },
  archived: {
    text: 'Archived',
    style: Warning
  },
  disabled: {
    text: 'Disabled',
    style: Error
  }
};
