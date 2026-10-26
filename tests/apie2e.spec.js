
import { test, expect } from '@playwright/test';
import { FakerUtility } from '../utils/FakerUtility.js';

test('API E2E - Create Customer and Place Order', async ({ request }) => {

    // Step 1: Generate unique customer details
    const uniqueId = FakerUtility.getUUID()
        .replaceAll('-', '')
        .slice(0, 8);

    const customer = {
        firstName: FakerUtility.getFirstName(),
        lastName: FakerUtility.getLastName(),
        age: 25,
        username: `pwtest_${uniqueId}`,
        password: `Test@${uniqueId}9`
    };

    console.log('\n========== CUSTOMER DETAILS ==========');
    console.log(JSON.stringify(customer, null, 2));

    // Step 2: Create customer
    const createResponse = await request.post(
        'https://dummyjson.com/users/add',
        { data: customer }
    );

    expect(createResponse.status()).toBe(201);

    const createdCustomer = await createResponse.json();

    expect(createdCustomer.id).toBeTruthy();
    expect(createdCustomer.firstName).toBe(customer.firstName);
    expect(createdCustomer.lastName).toBe(customer.lastName);

    console.log('\nCustomer created successfully');
    console.log('Customer ID:', createdCustomer.id);

    // Step 3: Prepare products and quantities
    const orderPayload = {
        userId: 1,
        products: [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 1 }
        ]
    };

    console.log('\n========== ORDER REQUEST ==========');
    console.log(JSON.stringify(orderPayload, null, 2));

    // Step 4: Create simulated cart
const orderResponse = await request.post(
    'https://dummyjson.com/carts/add',
    {
        data: orderPayload,
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

// Log the real API response before asserting
const responseText = await orderResponse.text();

console.log('Cart API URL:', 'https://dummyjson.com/carts/add');
console.log('Cart API Status:', orderResponse.status());
console.log('Cart API Response:', responseText);

expect(
    orderResponse.status(),
    `Cart API failed: ${responseText}`
).toBe(201);

const order = JSON.parse(responseText);
    // Step 5: Validate cart/order response
    expect(order.id).toBeTruthy();
   expect(order.userId).toBe(1);
    expect(order.products).toHaveLength(2);
    expect(order.totalProducts).toBe(2);
    expect(order.totalQuantity).toBe(3);
    expect(order.total).toBeGreaterThan(0);

    console.log('\n========== ORDER RESPONSE ==========');
    console.log(JSON.stringify(order, null, 2));

    // Step 6: Final E2E validation
    expect(order.userId).toBe(1);

    console.log('\nE2E journey completed successfully!');
    console.log('Customer ID:', createdCustomer.id);
    console.log('Cart ID:', order.id);
    console.log('Total quantity:', order.totalQuantity);
    console.log('Total amount:', order.total);
});
