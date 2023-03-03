export default class PasswordVisibilityToogler {
  static tooglePasswordVisibility(
    fieldName: string,
    visibilityStatus: boolean
  ) {
    if (fieldName === 'password') {
      let registerPasswordsVisibility = visibilityStatus;
      return !registerPasswordsVisibility;
    }
    if (fieldName === 'confirmPassword') {
      let confirmPasswordsVisibility = visibilityStatus;
      return !confirmPasswordsVisibility;
    }
    if (fieldName === 'loginPassword') {
      let loginPasswordVisibility = visibilityStatus;
      return !loginPasswordVisibility;
    }
    if (fieldName === 'newPassword') {
      let resetPasswordVisibility = visibilityStatus;
      return !resetPasswordVisibility;
    }
    if (fieldName === 'confirmNewPassword') {
      let resetNewPasswordVisibility = visibilityStatus;
      return !resetNewPasswordVisibility;
    } else return false;
  }
}
