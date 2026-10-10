
import { test } from '@playwright/test';
import { encryptData } from '../utils/encryptionUtil.js';

test('Generate encrypted test data', async () => {
  const testPAN = 'ABCDE1299H';
  const testAadhaar = '123457865432';

  console.log('Encrypted PAN:', encryptData(testPAN));
  console.log('Encrypted Aadhaar:', encryptData(testAadhaar));
});