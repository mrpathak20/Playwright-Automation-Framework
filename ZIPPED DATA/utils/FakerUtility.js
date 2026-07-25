import { faker } from '@faker-js/faker';
// Locale alignment for India-specific data
faker.locale = 'en_IND';
export class FakerUtility {
  // ------------------- Name -------------------
  static getFullName() {
    return faker.person.fullName();
  }
  static getFirstName() {
    return faker.person.firstName();
  }
  static getLastName() {
    return faker.person.lastName();
  }
  // ------------------- Email -------------------
  static getEmail() {
    return faker.internet.email();
  }
  static getSafeEmail() {
    return faker.internet.exampleEmail();
  }
  // ------------------- Indian Mobile -------------------
  static getIndianMobile() {
    const firstDigit = faker.number.int({ min: 6, max: 9 });
    const remainingDigits = faker.string.numeric(9);
    return `${firstDigit}${remainingDigits}`;
  }
  // ------------------- Aadhaar -------------------
  static getAadhaarNumber() {
    return faker.string.numeric(12);
  }
  // ------------------- Passport -------------------
  static getIndianPassport() {
    const letters = faker.string.alpha({ length: 2, casing: 'upper' });
    const digits = faker.string.numeric(7);
    return `${letters}${digits}`;
  }
  // ------------------- Address -------------------
  static getIndianStreet() {
    return faker.location.street();
  }
  static getFullAddress() {
    return faker.location.streetAddress(true);
  }
  static getCity() {
    return faker.location.city();
  }
  static getState() {
    return faker.location.state();
  }
  static getPinCode() {
    return faker.string.numeric(6); // Indian PIN
  }
  // ------------------- Personal Details -------------------
  static getBloodGroup() {
    const groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    return faker.helpers.arrayElement(groups);
  }
  static getHeightCm() {
    return faker.number.int({ min: 150, max: 190 });
  }
  static getWeightKg() {
    return faker.number.int({ min: 45, max: 95 });
  }
  static getAnnualIncome() {
    const income = faker.number.int({ min: 200000, max: 2500000 });
    return `₹${income}`;
  }
  // ------------------- Job -------------------
  static getJobTitle() {
    return faker.person.jobTitle();
  }
  // ------------------- Misc -------------------
  static getUUID() {
    return faker.string.uuid();
  }
  static getRandomWord() {
    return faker.lorem.word();
  }
  static getSentence() {
    return faker.lorem.sentence();
  }
  static getBoolean() {
    return faker.datatype.boolean();
  }

  static generatePAN() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
 
  // Helper to get random character
  const randomChar = (source) =>
    source.charAt(Math.floor(Math.random() * source.length));
 
  // First 3 letters can be any alphabet
  let pan = "";
  for (let i = 0; i < 3; i++) {
    pan += randomChar(letters);
  }
 
  // 4th character – PAN holder type (P = Individual, common case)
  pan += "P";
 
  // 5th character – surname initial or any letter
  pan += randomChar(letters);
 
  // Next 4 digits
  for (let i = 0; i < 4; i++) {
    pan += randomChar(digits);
  }
 
  // Last character – alphabetic check character
  pan += randomChar(letters);
 
  return pan;
}

}
