/*
 * RegisterScreen Messages
 *
 * This contains all the text for the RegisterScreen
 */

import { defineMessages } from "react-intl";

export const scope = "app.screens.RegisterScreen";

export default defineMessages({
  stepOneTitle: {
    id: `${scope}.stepOneTitle`,
    defaultMessage: "Organization Details",
  },
  stepTwoTitle: {
    id: `${scope}.stepTwoTitle`,
    defaultMessage: "Create an Employee",
  },
  stepThreeTitle: {
    id: `${scope}.stepThreeTitle`,
    defaultMessage: "Employee Documents",
  },
  //First Step Messages
  description: {
    id: `${scope}.description`,
    defaultMessage: "Will you please fill out the form?",
  },
  organizationNameLabel: {
    id: `${scope}.organizationNameLabel`,
    defaultMessage: "Organization Name",
  },
  displayNameLabel: {
    id: `${scope}.displayNameLabel`,
    defaultMessage: "Display Name",
  },
  noOfEmployeesLabel: {
    id: `${scope}.noOfEmployeesLabel`,
    defaultMessage: "No. of Employees",
  },
  logoLabel: {
    id: `${scope}.logoLabel`,
    defaultMessage: "Upload Logo",
  },
  themeColorLabel: {
    id: `${scope}.themeColorLabel`,
    defaultMessage: "Theme to be followed",
  },
  nameLabel: {
    id: `${scope}.nameLabel`,
    defaultMessage: "Name",
  },
  mobileLabel: {
    id: `${scope}.mobileLabel`,
    defaultMessage: "Mobile No.",
  },
  cnicLabel: {
    id: `${scope}.cnicLabel`,
    defaultMessage: "CNIC No.",
  },
  dobLabel: {
    id: `${scope}.dobLabel`,
    defaultMessage: "DOB",
  },
  dojLabel: {
    id: `${scope}.dojLabel`,
    defaultMessage: "Joining Date",
  },
  maritalLabel: {
    id: `${scope}.maritalLabel`,
    defaultMessage: "Marital Status",
  },
  nationLabel: {
    id: `${scope}.nationLabel`,
    defaultMessage: "Nationality",
  },
  designationLabel: {
    id: `${scope}.designationLabel`,
    defaultMessage: "Designation",
  },
  profileLabel: {
    id: `${scope}.profileLabel`,
    defaultMessage: "Upload Image",
  },
  managerLabel: {
    id: `${scope}.managerLabel`,
    defaultMessage: "Reporting Authorities",
  },
  residentialAddressLabel: {
    id: `${scope}.residentialAddressLabel`,
    defaultMessage: "Address (Residential)",
  },
  permanentAddressLabel: {
    id: `${scope}.permanentAddressLabel`,
    defaultMessage: "Address (Permanent)",
  },
  cityLabel: {
    id: `${scope}.cityLabel`,
    defaultMessage: "City",
  },
  emailLabel: {
    id: `${scope}.emailLabel`,
    defaultMessage: "Email Address",
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: "Enter email address",
  },
  passwordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: "Password",
  },
  zipLabel: {
    id: `${scope}.zipLabel`,
    defaultMessage: "ZIP Code",
  },
  documentNameLabel: {
    id: `${scope}.documentNameLabel`,
    defaultMessage: "Document Name",
  },
  documentFileLabel: {
    id: `${scope}.documentFileLabel`,
    defaultMessage: "Upload Document",
  },
  contractLetterLabel: {
    id: `${scope}.contractLetterLabel`,
    defaultMessage: "Contract Letter",
  },
  offerLetterLabel: {
    id: `${scope}.offerLetterLabel`,
    defaultMessage: "State/Province",
  },
  medicalCertificateLabel: {
    id: `${scope}.medicalCertificateLabel`,
    defaultMessage: "Medical Certificate",
  },
  organizationNamePlaceholder: {
    id: `${scope}.firstNamePlaceholder`,
    defaultMessage: "Enter your organization name",
  },
  displayNamePlaceholder: {
    id: `${scope}.lastNamePlaceholder`,
    defaultMessage: "Enter name you want to display",
  },
  noOfEmployeesPlaceholder: {
    id: `${scope}.noOfEmployeesPlaceholder`,
    defaultMessage: "Enter no. of employees",
  },
  rfuPlaceholder: {
    id: `${scope}.rfuPlaceholder`,
    defaultMessage: "Pick Secondary Theme Color",
  },
  namePlaceholder: {
    id: `${scope}.namePlaceholder`,
    defaultMessage: "Enter your name",
  },
  mobilePlaceholder: {
    id: `${scope}.mobilePlaceholder`,
    defaultMessage: "Enter your mobile number",
  },
  cnicPlaceholder: {
    id: `${scope}.cnicPlaceholder`,
    defaultMessage: "Enter your CNIC number",
  },
  dobPlaceholder: {
    id: `${scope}.dobPlaceholder`,
    defaultMessage: "Enter your date of birth",
  },
  dojPlaceholder: {
    id: `${scope}.dojPlaceholder`,
    defaultMessage: "Enter date of joining",
  },
  maritalPlaceholder: {
    id: `${scope}.maritalPlaceholder`,
    defaultMessage: "Please select your marital status",
  },
  nationPlaceholder: {
    id: `${scope}.nationalityPlaceholder`,
    defaultMessage: "Enter your nationality",
  },
  designationPlaceholder: {
    id: `${scope}.designationPlaceholder`,
    defaultMessage: "Enter Designation",
  },
  imagePlaceholder: {
    id: `${scope}.imagePlaceholder`,
    defaultMessage: "Upload Image",
  },
  reportingPlaceholder: {
    id: `${scope}.reportingPlaceholder`,
    defaultMessage: "Enter employee name",
  },
  residentialAddressPlaceholder: {
    id: `${scope}.residentialAddressPlaceholder`,
    defaultMessage: "Enter your residential address",
  },
  permanentAddressPlaceholder: {
    id: `${scope}.permanentAddressPlaceholder`,
    defaultMessage: "Enter your permanent address",
  },
  cityPlaceholder: {
    id: `${scope}.cityPlaceholder`,
    defaultMessage: "Enter your city",
  },
  countryPlaceholder: {
    id: `${scope}.countryPlaceholder`,
    defaultMessage: "Enter your country",
  },
  passwordlaceholder: {
    id: `${scope}.passwordlaceholder`,
    defaultMessage: "Enter password",
  },
  zipPlaceholder: {
    id: `${scope}.zipPlaceholder`,
    defaultMessage: "Enter ZIP Code",
  },
  documentNamePlaceholder: {
    id: `${scope}.documentNamePlaceholder`,
    defaultMessage: "Enter Document Name",
  },
  signUp: {
    id: `${scope}.signUp`,
    defaultMessage: "Next",
  },
  nextStepText: {
    id: `${scope}.nextStepText`,
    defaultMessage: "Step 1/2. Next step",
  },
  nextStep: {
    id: `${scope}.nextStep`,
    defaultMessage: "Profile",
  },
  lastStep: {
    id: `${scope}.lastStep`,
    defaultMessage: "Save & Proceed to Dashboard",
  },
  textSignIn: {
    id: `${scope}.textSignIn`,
    defaultMessage: "Already have an account?",
  },

  signIn: {
    id: `${scope}.signIn`,
    defaultMessage: "Sign In",
  },

  //Second Step Messages
  // dobLabel: {
  //   id: `${scope}.dobLabel`,
  //   defaultMessage: "Date of Birth",
  // },
  pharmacyLabel: {
    id: `${scope}.pharmacyLabel`,
    defaultMessage: "Years of Pharmacy Technician Experience (0-50)",
  },
  partTimeLabel: {
    id: `${scope}.partTimeLabel`,
    defaultMessage: "Are you working part time?",
  },
  bioLabel: {
    id: `${scope}.bioLabel`,
    defaultMessage: "Have you taken a Biochemistry class before?",
  },
  mathLabel: {
    id: `${scope}.mathLabel`,
    defaultMessage: "My math skills are",
  },
  learnLabel: {
    id: `${scope}.learnLabel`,
    defaultMessage: "I prefer to learn about",
  },
  sequenceLabel: {
    id: `${scope}.sequenceLabel`,
    defaultMessage: "My preferred learning sequence is",
  },
  studyLabel: {
    id: `${scope}.studyLabel`,
    defaultMessage: "I prefer to study",
  },
  playLabel: {
    id: `${scope}.playLabel`,
    defaultMessage: "In high school I played",
  },
  volunteerLabel: {
    id: `${scope}.volunteerLabel`,
    defaultMessage: "In the last year, did you volunteer more than 40 hours",
  },
  hobbiesLabel: {
    id: `${scope}.hobbiesLabel`,
    defaultMessage: "Hobbies",
  },
  // dobPlaceholder: {
  //   id: `${scope}.dobPlaceholder`,
  //   defaultMessage: "YYYY MM DD",
  // },
  pharmacyPlaceholder: {
    id: `${scope}.pharmacyPlaceholder`,
    defaultMessage: "Enter no. of years here",
  },
  hobbiesPlaceholder: {
    id: `${scope}.hobbiesPlaceholder`,
    defaultMessage: "Enter your hobbies",
  },
  profile: {
    id: `${scope}.profile`,
    defaultMessage: "Save & Continue",
  },
  prev: {
    id: `${scope}.prev`,
    defaultMessage: "Previous",
  },
  finalStepText: {
    id: `${scope}.nextStepText`,
    defaultMessage: "Finish & Proceed to Dashboard",
  },

  successMessage: {
    id: `${scope}.successMessage`,
    defaultMessage: "Signed Up Successfully!",
  },
  profileSuccessMessage: {
    id: `${scope}.profileSuccessMessage`,
    defaultMessage: "Profile Created Successfully!",
  },
});
