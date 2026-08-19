import { test } from '@playwright/test';
import { Actions } from '../fixtures/actionFixture.js';
import { Assertion } from '../utils/assertionUtil.js';
import { ENV } from '../config/environment.js';
const { allure } = require('allure-playwright');
const fs = require('fs');

const SCREENSHOT_DIR = './screenshots/TodoMVC';

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

test('TC-ADD-TODO-01 - user can add a new todo item and it is displayed correctly', async ({ page }) => {
  const actions = new Actions();
  const todoText = `AI Todo ${Date.now()}`;

  const todoInput = page.getByPlaceholder('What needs to be done?');
  const todoTitle = page.getByTestId('todo-title').filter({ hasText: todoText });
  const todoItem = page.getByRole('listitem').filter({
    has: page.getByTestId('todo-title').filter({ hasText: todoText })
  });

  await allure.step('Navigate to the configured TodoMVC app', async () => {
    await page.goto(ENV.baseUrl);
    await actions.waitForPageReady(page);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/01_home.png`, fullPage: true });
  });

  await allure.step('Add a unique todo item', async () => {
    await actions.smartFill(todoInput, todoText);
    await todoInput.press('Enter');
  });

  await allure.step('Verify the created todo is visible and correct', async () => {
    await Assertion.assertVisible(todoItem);
    await Assertion.assertText(todoTitle, todoText);
    await Assertion.assertCount(
      page.getByRole('listitem').filter({ has: page.getByTestId('todo-title') }),
      1
    );
    await page.screenshot({ path: `${SCREENSHOT_DIR}/02_todo_added.png`, fullPage: true });
  });
});
