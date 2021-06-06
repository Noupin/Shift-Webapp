export const videoTypes = ['mp4', 'webm', 'ogg']

export const validMediaFileExtesnions = ['png', 'jpg', 'jpeg', 'gif', 'heic', 'mp4', 'm4a', 'mov']
export const defaultShiftTitle = "New Shift"

export const pageTitleTemplate = (title: string) => `${title} - Shift`;

export const pageTitles = {
  'infernce': pageTitleTemplate("Inference"),
  'load': pageTitleTemplate("Load"),
  'train': pageTitleTemplate("Train"),
  'advancedTrain': pageTitleTemplate("Advanced Train"),
  'forgotPassword': pageTitleTemplate("Forgot Password"),
  'login': pageTitleTemplate("Login"),
  'register': pageTitleTemplate("Register"),
  'user': (username: string) => pageTitleTemplate(`${username}`),
  'shift': (username: string, title: string) => pageTitleTemplate(`${username}: ${title}`),
  'home': pageTitleTemplate("Home"),
  '': "Shift"
}
