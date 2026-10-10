
require('dotenv').config({
  path: 'config/environment/uat.env'
});

const { test, expect } = require('@playwright/test');
const {
  encryptData,
  decryptData
} = require('../utils/encryptionUtil');

test('should encrypt and decrypt test data', async () => {
  const originalPassword = 'DemoPassword@123';

  const encryptedPassword = encryptData(originalPassword);

  expect(encryptedPassword).not.toBe(originalPassword);
  expect(decryptData(encryptedPassword)).toBe(originalPassword);

  console.log('Encryption and decryption verified.');
});