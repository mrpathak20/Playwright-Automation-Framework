
require('dotenv').config({
  path: 'config/enviroment/uat.env'
});

const { encryptData } = require('../utils/encryptionUtil');

// Dummy values for testing only
const encryptedPAN = encryptData('ABCDE1299H');
const encryptedAadhaar = encryptData('123457865432');

console.log('Copy these values into the corresponding Excel cells:');
console.log('PAN:', encryptedPAN);
console.log('Aadhaar:', encryptedAadhaar);