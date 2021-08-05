//First Party Imports
import { IFrontEndSettings } from "./Interfaces/FrontEndSettings";
import { User } from "./Swagger";


export const videoTypes = ['mp4', 'webm', 'ogg']
export const imageTypes = ['png', 'jpg', 'jpeg', 'heic']
export const validMediaFileExtesnions = ['png', 'jpg', 'jpeg', 'gif', 'heic', 'mp4', 'm4a', 'mov']

export const defaultShiftTitle = ""

export const pageTitleTemplate = (title: string) => `${title} - Shift`;
export const pageTitles = {
  'inference': pageTitleTemplate("Inference"),
  'load': pageTitleTemplate("Load"),
  'train': pageTitleTemplate("Train"),
  'advancedTrain': pageTitleTemplate("Advanced Train"),
  'changePassword': pageTitleTemplate("Change Password"),
  'forgotPassword': pageTitleTemplate("Forgot Password"),
  'resetPassword': pageTitleTemplate("Reset Password"),
  'login': pageTitleTemplate("Login"),
  'register': pageTitleTemplate("Register"),
  'user': (username: string) => pageTitleTemplate(`${username}`),
  'shift': (username: string, title: string) => pageTitleTemplate(`${username}: ${title}`),
  'home': pageTitleTemplate("Home"),
  'confirmEmail': pageTitleTemplate('Confirm Email'),
  'resendConfirmEmail': pageTitleTemplate('Resend Confirmation Email'),
  'verifyEmailChange': pageTitleTemplate('Verify Email Change'),
  'confirmEmailChange': pageTitleTemplate('Confirm Email Change'),
  'subscription': pageTitleTemplate('Subscription'),
  '': "Shift"
}

export const TRAIN_STATUS_INTERVAL = 1000;

export const CATEGORIES_TO_GET = -1;
export const CATEGORIES_TO_REMOVE = ["Featured"]


export const DEFAULT_USER: User = {username: "", email: ""}

export const DEFUALT_FRONT_END_SETTINGS: IFrontEndSettings = {
  usePTM: true, 
  trainingShift: false, 
  trainView: 'basic', 
  darkMode: false, 
  uiStyle: 'neumorphic'
}

export const API_BASE_URL = 'http://192.168.1.52'
