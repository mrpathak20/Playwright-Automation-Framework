import { test, expect } from '../fixtures/apiFixture.js';

import { FakerUtility } from '../utils/FakerUtility.js';

test('API 1 - Get All Products List', async ({ api }) => {

    // Step 1: Send GET request to the API
  const response = await api.get('/api/productsList');

    // Step 2: Validate HTTP status code
    expect(response.status()).toBe(200);

    // Step 3: Read the response body as JSON
    const responseBody = await response.json();

    // Step 4: Validate the API response structure
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.products).toBeInstanceOf(Array);
    expect(responseBody.products.length).toBeGreaterThan(0);

    // Step 5: Validate the first product
    
    const firstProduct = responseBody.products[0];

    // Validate the first product's actual values
    expect(firstProduct.id).toBe(1);
    expect(firstProduct.name).toBe('Blue Top');
    expect(firstProduct.price).toBe('Rs. 500');
    expect(firstProduct.brand).toBe('Polo');

    // Validate nested category data
    expect(firstProduct.category.usertype.usertype).toBe('Women');
    expect(firstProduct.category.category).toBe('Tops');


    // Step 6: Print useful response details
    console.log('HTTP Status:', response.status());
    console.log('API Response Code:', responseBody.responseCode);
    console.log('Total Products:', responseBody.products.length);
    console.log('First Product:', firstProduct);

});


test('API 5 - Search Product with valid parameter', async ({ api }) => {

    // Step 1: Send POST request with search keyword
    const response = await api.post('/api/searchProduct', {

            form: {
                search_product: 'top'
            }
        }
    );

    // Step 2: Validate HTTP status
    expect(response.status()).toBe(200);

    // Step 3: Read JSON response
    const responseBody = await response.json();

    // Step 4: Validate application response
    expect(responseBody.responseCode).toBe(200);

    // Step 5: Validate product list
    expect(responseBody.products).toBeInstanceOf(Array);
    expect(responseBody.products.length).toBeGreaterThan(0);

    // Step 6: Validate each returned product
    for (const product of responseBody.products) {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('brand');
    }

    console.log('Search keyword: top');
    console.log('HTTP Status:', response.status());
    console.log('Products returned:', responseBody.products.length);

});


test('API 6 - Search Product without required parameter', async ({ api }) => {

    // Step 1: Send POST request without search_product
    const response = await api.post('/api/searchProduct', {
        form: {
            // Missing search_product parameter
        }
    });

    // Step 2: Read response body
    const responseBody = await response.json();

    // Step 3: Validate HTTP response
    expect(response.status()).toBe(200);

    // Step 4: Validate application-level error code
    expect(responseBody.responseCode).toBe(400);

    // Step 5: Validate the error message
    expect(responseBody.message).toBe(
        'Bad request, search_product parameter is missing in POST request.'
    );

    console.log('HTTP Status:', response.status());
    console.log('Application Error Code:', responseBody.responseCode);
    console.log('Error Message:', responseBody.message);

});


test('API 2 - POST Products List with unsupported method', async ({ api }) => {
    const response = await api.post('/api/productsList');

    const responseBody = await response.json();

    console.log('HTTP Status:', response.status());
    console.log('Application Response Code:', responseBody.responseCode);
    console.log('Message:', responseBody.message);

    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe(
        'This request method is not supported.'
    );
});


test('API 3 - Get All Brands List', async ({ api }) => {
    const response = await api.get('/api/brandsList');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.brands).toBeInstanceOf(Array);
    expect(responseBody.brands.length).toBeGreaterThan(0);

    const firstBrand = responseBody.brands[0];

    expect(firstBrand).toHaveProperty('id');
    expect(firstBrand).toHaveProperty('brand');

    console.log('HTTP Status:', response.status());
    console.log('API Response Code:', responseBody.responseCode);
    console.log('Total Brands:', responseBody.brands.length);
    console.log('First Brand:', firstBrand);
});

test('API 4 - PUT Brands List with unsupported method', async ({ api }) => {
    const response = await api.put('/api/brandsList');

    const responseBody = await response.json();

    console.log('HTTP Status:', response.status());
    console.log('Application Response Code:', responseBody.responseCode);
    console.log('Message:', responseBody.message);

    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe(
        'This request method is not supported.'
    );
});


test('API 11 - Create User Account', async ({ api }) => {

    // Step 1: Generate test data using FakerUtility
    const uniqueId = FakerUtility.getUUID().replaceAll('-', '').slice(0, 8);
    const email = `pwtest_${uniqueId}_${FakerUtility.getEmail()}`;
    const password = `Test@${uniqueId}9`;
    const firstName = FakerUtility.getFirstName();
    const lastName = FakerUtility.getLastName();

    // Step 2: Prepare complete customer details
    const userDetails = {
        name: `${firstName} ${lastName}`,
        email,
        password,
        title: 'Mr',
        birth_date: '10',
        birth_month: '5',
        birth_year: '1996',
        firstname: firstName,
        lastname: lastName,
        company: 'QA Practice',
        address1: FakerUtility.getIndianStreet(),
        address2: 'Test Area',
        country: 'India',
        zipcode: FakerUtility.getPinCode(),
        state: FakerUtility.getState(),
        city: FakerUtility.getCity(),
        mobile_number: FakerUtility.getIndianMobile()
    };

    // Step 3: Print all customer details before sending the request
    console.log('\n========== CUSTOMER TEST DATA ==========');
    console.log(JSON.stringify(userDetails, null, 4));
    console.log('========================================\n');

    // Step 4: Create account
    const response = await api.post('/api/createAccount', {
        form: userDetails
    });

    // Step 5: Read response
    const responseBody = await response.json();

    // Step 6: Validate HTTP status
    expect(response.status()).toBe(200);

    // Step 7: Validate API response
    expect(responseBody.responseCode).toBe(201);
    expect(responseBody.message).toBe('User created!');

    // Step 8: Keep credentials available in test annotations
    test.info().annotations.push({
        type: 'test-account-email',
        description: email
    });

    // Step 9: Print API response summary
    console.log('========== API RESPONSE ==========');
    console.log('HTTP Status:', response.status());
    console.log('API Response Code:', responseBody.responseCode);
    console.log('API Message:', responseBody.message);
    console.log('Created Account:', email);
    console.log('==================================\n');
});

test('API 12 - Create and Delete User Account', async ({ api }) => {

    // Step 1: Generate unique test credentials
    const uniqueId = FakerUtility.getUUID().replaceAll('-', '').slice(0, 8);
    const firstName = FakerUtility.getFirstName();
    const lastName = FakerUtility.getLastName();

    const email = `pwtest_${uniqueId}_${FakerUtility.getUUID().slice(0, 8)}@gmail.com`;
    const password = `Test@${uniqueId}9`;

    // Step 2: Prepare account data
    const userDetails = {
        name: `${firstName} ${lastName}`,
        email,
        password,
        title: 'Mr',
        birth_date: '10',
        birth_month: '5',
        birth_year: '1996',
        firstname: firstName,
        lastname: lastName,
        company: 'QA Practice',
        address1: FakerUtility.getIndianStreet(),
        address2: 'Test Area',
        country: 'India',
        zipcode: FakerUtility.getPinCode(),
        state: FakerUtility.getState(),
        city: FakerUtility.getCity(),
        mobile_number: FakerUtility.getIndianMobile()
    };

    // Step 3: API 11 - Create account
    const createResponse = await api.post('/api/createAccount', {
        form: userDetails
    });

    const createBody = await createResponse.json();

    expect(createResponse.status()).toBe(200);
    expect(createBody.responseCode).toBe(201);
    expect(createBody.message).toBe('User created!');

    console.log('API 11: Account created successfully');

    // Step 4: API 12 - Delete the same account
    const deleteResponse = await api.delete('/api/deleteAccount', {
        form: {
            email,
            password
        }
    });

    const deleteBody = await deleteResponse.json();

    expect(deleteResponse.status()).toBe(200);
    expect(deleteBody.responseCode).toBe(200);
    expect(deleteBody.message).toBe('Account deleted!');

    console.log('API 12: Account deleted successfully');
});


test('API 13 - Update User Account', async ({ api }) => {
    const uniqueId = FakerUtility.getUUID().slice(0, 8);
    const email = `pwupdate_${uniqueId}@gmail.com`;
    const password = `Test@${uniqueId}9`;

    const userDetails = {
        name: FakerUtility.getFullName(),
        email,
        password,
        title: 'Mr',
        birth_date: '10',
        birth_month: '5',
        birth_year: '1998',
        firstname: FakerUtility.getFirstName(),
        lastname: FakerUtility.getLastName(),
        company: 'Test Company',
        address1: FakerUtility.getIndianStreet(),
        address2: 'Test Area',
        country: 'India',
        zipcode: FakerUtility.getPinCode(),
        state: FakerUtility.getState(),
        city: FakerUtility.getCity(),
        mobile_number: FakerUtility.getIndianMobile()
    };

    // Step 1: Create an account before updating it
    const createResponse = await api.post('/api/createAccount', {
        form: userDetails
    });

    const createBody = await createResponse.json();

    expect(createBody.responseCode).toBe(201);
    expect(createBody.message).toBe('User created!');

    // Step 2: Prepare updated account details
    const updatedDetails = {
        ...userDetails,
        name: `Updated_${uniqueId}`,
        firstname: 'UpdatedFirst',
        lastname: 'UpdatedLast',
        company: 'Updated Test Company'
    };

    // Step 3: Update the account
    const updateResponse = await api.put('/api/updateAccount', {
        form: updatedDetails
    });

    const updateBody = await updateResponse.json();

    console.log('HTTP Status:', updateResponse.status());
    console.log('API Response Code:', updateBody.responseCode);
    console.log('API Message:', updateBody.message);

    expect(updateResponse.status()).toBe(200);
    expect(updateBody.responseCode).toBe(200);
    expect(updateBody.message).toBe('User updated!');

    // Step 4: Clean up the test account
    const deleteResponse = await api.delete('/api/deleteAccount', {
        form: { email, password }
    });

    const deleteBody = await deleteResponse.json();

    expect(deleteBody.responseCode).toBe(200);
    expect(deleteBody.message).toBe('Account deleted!');
});

test('API 14 - Get User Account Detail by Email', async ({ api }) => {
    const uniqueId = FakerUtility.getUUID().slice(0, 8);
    const email = `pwdetails_${uniqueId}@gmail.com`;
    const password = `Test@${uniqueId}9`;

    const userDetails = {
        name: FakerUtility.getFullName(),
        email,
        password,
        title: 'Mr',
        birth_date: '10',
        birth_month: '5',
        birth_year: '1998',
        firstname: FakerUtility.getFirstName(),
        lastname: FakerUtility.getLastName(),
        company: 'Test Company',
        address1: FakerUtility.getIndianStreet(),
        address2: 'Test Area',
        country: 'India',
        zipcode: FakerUtility.getPinCode(),
        state: FakerUtility.getState(),
        city: FakerUtility.getCity(),
        mobile_number: FakerUtility.getIndianMobile()
    };

    // Step 1: Create an account to retrieve
    const createResponse = await api.post('/api/createAccount', {
        form: userDetails
    });

    const createBody = await createResponse.json();

    expect(createBody.responseCode).toBe(201);
    expect(createBody.message).toBe('User created!');

    // Step 2: Retrieve account details using the email query parameter
    const response = await api.get('/api/getUserDetailByEmail', {
        params: { email }
    });

    const responseBody = await response.json();

    console.log('HTTP Status:', response.status());
    console.log('API Response Code:', responseBody.responseCode);
    console.log('User Details:', responseBody.user);

    // Step 3: Validate the response
    expect(response.status()).toBe(200);
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.user).toBeTruthy();
    expect(responseBody.user.email).toBe(email);
    expect(responseBody.user.name).toBe(userDetails.name);

    // Step 4: Clean up the test account
    const deleteResponse = await api.delete('/api/deleteAccount', {
        form: { email, password }
    });

    const deleteBody = await deleteResponse.json();

    expect(deleteBody.responseCode).toBe(200);
    expect(deleteBody.message).toBe('Account deleted!');
});
