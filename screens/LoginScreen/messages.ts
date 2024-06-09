/*
 * LoginScreen Messages
 *
 * This contains all the text for the LoginScreen
 */

import { defineMessages } from "react-intl";

export const scope = "app.screens.LoginScreen";

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: "Welcome to Workies 👋🏻",
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: "Please sign-in to your account and start the adventure",
  },
  emailLabel: {
    id: `${scope}.emailLabel`,
    defaultMessage: "Email",
  },
  passwordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: "Password",
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: "Enter your Email",
  },
  passwordPlaceholder: {
    id: `${scope}.passwordPlaceholder`,
    defaultMessage: "Enter your Password",
  },
  rememberLabel: {
    id: `${scope}.rememberLabel`,
    defaultMessage: "Remember me",
  },

  forgot: {
    id: `${scope}.forgot`,
    defaultMessage: "Forgot Password?",
  },

  signIn: {
    id: `${scope}.signIn`,
    defaultMessage: "Login",
  },

  textSignUp: {
    id: `${scope}.textSignUp`,
    defaultMessage: "New on our platform?",
  },

  signUp: {
    id: `${scope}.signUp`,
    defaultMessage: "Create an Account",
  },
  companyName: {
    id: `${scope}.companyName`,
    defaultMessage: "Workies",
  },
});
