export interface UpdateUserData {
  fullName?: string;
  email?: string;
  isEmailVerified?: boolean;
  phoneNumber?: string;
  isPhoneNumberVerified?: boolean;
  isTwoStepVerificationEnabled?: boolean;
  isAgreedToTerms?: boolean;
  isRegistrationFinished?: boolean;
  password?: string;
  description?: string;
  dateOfBirth?: Date;
  location?: string;
}
