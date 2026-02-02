# Playwright Testing Guide

This guide explains how to write and run end-to-end (E2E) tests for the Slate Social landing page using Playwright.

## Overview

We use [Playwright](https://playwright.dev/) for E2E testing. Playwright enables reliable testing across modern browsers with a simple, powerful API.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install dependencies (Playwright is included in devDependencies)
npm install

# Install Playwright browsers
npx playwright install chromium
```

## Running Tests

### Run all tests

```bash
npm run test:e2e
```

### Run tests with UI mode (interactive)

```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see the browser)

```bash
npm run test:e2e:headed
```

### Run a specific test file

```bash
npx playwright test e2e/homepage.spec.ts
```

### Run tests matching a specific name

```bash
npx playwright test -g "Hero Section"
```

## Project Structure

```
e2e/
├── homepage.spec.ts    # Homepage tests
└── (future test files)

playwright.config.ts    # Playwright configuration
docs/
└── TESTING.md         # This file
```

## Writing Tests

### Test Organization

Tests are organized using `test.describe()` blocks for grouping related tests:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Section Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup that runs before each test
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Test implementation
  });
});
```

### Common Patterns

#### Finding Elements

```typescript
// By role (preferred - accessible)
page.getByRole('button', { name: 'Submit' });
page.getByRole('heading', { name: 'Welcome' });
page.getByRole('link', { name: 'About' });

// By label (for form inputs)
page.getByLabel('Email');

// By text
page.getByText('Hello World');

// By test ID (when other methods don't work)
page.getByTestId('submit-button');

// By CSS selector (last resort)
page.locator('.my-class');
page.locator('#my-id');
```

#### Assertions

```typescript
// Visibility
await expect(element).toBeVisible();
await expect(element).toBeHidden();

// Text content
await expect(element).toHaveText('exact text');
await expect(element).toContainText('partial text');

// URL
await expect(page).toHaveURL('/path');
await expect(page).toHaveURL(/pattern/);

// Attributes
await expect(element).toHaveAttribute('href', '/link');

// Form values
await expect(input).toHaveValue('value');

// CSS classes
await expect(element).toHaveClass(/my-class/);
```

#### Interactions

```typescript
// Click
await element.click();

// Type/Fill
await input.fill('text');

// Keyboard
await page.keyboard.press('Enter');
await page.keyboard.press('Escape');

// Scroll
await page.evaluate(() => window.scrollTo(0, 1000));

// Wait
await page.waitForTimeout(500); // Use sparingly
await page.waitForSelector('.loaded');
```

### Test Best Practices

1. **Use semantic selectors**: Prefer `getByRole`, `getByLabel`, and `getByText` over CSS selectors. This makes tests more resilient and encourages accessible markup.

2. **One assertion per concept**: Each test should verify one specific behavior. Use multiple assertions only when they test the same concept.

3. **Use `beforeEach` for setup**: Common navigation and setup should go in `beforeEach`.

4. **Avoid hard-coded waits**: Use Playwright's auto-waiting or explicit wait conditions instead of `waitForTimeout`.

5. **Test user flows**: Focus on what users actually do, not implementation details.

6. **Keep tests independent**: Each test should be able to run in isolation.

### Example Test

```typescript
test.describe('Registration Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#register');
  });

  test('should display validation errors for empty required fields', async ({ page }) => {
    // Try to submit empty form
    await page.getByRole('button', { name: 'Register Interest' }).click();
    
    // Form should not submit (HTML5 validation)
    const nameInput = page.getByLabel('Full Name');
    await expect(nameInput).toBeVisible();
    
    // Check that we're still on the same page
    await expect(page).toHaveURL(/#register/);
  });

  test('should allow successful form submission', async ({ page }) => {
    // Fill out the form
    await page.getByLabel('Full Name').fill('John Doe');
    await page.getByLabel('Gym Name').fill('Mountain Climbing');
    await page.getByLabel('Work Email').fill('john@mountain.com');
    
    // Submit
    await page.getByRole('button', { name: 'Register Interest' }).click();
    
    // Note: Full submission test requires mocking Supabase
  });
});
```

## Configuration

The Playwright configuration is in `playwright.config.ts`:

- **testDir**: Tests are in the `e2e/` directory
- **baseURL**: Tests run against `http://localhost:4173`
- **webServer**: Automatically builds and starts the preview server
- **browser**: Tests run in Chromium by default

### Adding More Browsers

To test in multiple browsers, modify `playwright.config.ts`:

```typescript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
],
```

## CI Integration

Tests can be run in CI by adding to your workflow:

```yaml
- name: Install Playwright
  run: npx playwright install --with-deps chromium

- name: Run E2E Tests
  run: npm run test:e2e
```

## Debugging

### View test report

```bash
npx playwright show-report
```

### Debug mode

```bash
npx playwright test --debug
```

### Trace viewer

When tests fail, Playwright saves traces. View them with:

```bash
npx playwright show-trace trace.zip
```

## Test Categories

Our tests cover:

1. **Homepage**: Core page elements and structure
2. **Hero Section**: Main heading, tagline, CTA buttons
3. **About Section**: SLATE SOCIAL branding, stats counters
4. **Features Section**: Feature cards, modal interactions
5. **Benefits Section**: Why Slate Social content
6. **Blog Section**: Latest posts, navigation
7. **Registration Form**: Form fields, validation
8. **Footer**: Links and copyright
9. **Responsive Design**: Mobile, tablet, desktop viewports
10. **Accessibility**: Heading hierarchy, labels, keyboard nav
11. **Navigation**: Internal links, anchor links

## Adding New Tests

When adding new features or pages:

1. Create a new test file in `e2e/` (e.g., `e2e/new-page.spec.ts`)
2. Follow the existing patterns for organization
3. Focus on user-visible behavior
4. Run tests locally before committing
5. Ensure tests pass in CI

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Locator Guide](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)
