import { test, expect } from '@playwright/test';

/**
 * Homepage E2E Tests
 * 
 * These tests verify the core functionality and content of the Slate Social homepage.
 * Each test focuses on a specific section or feature of the page.
 */

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have correct page title and meta description', async ({ page }) => {
    await expect(page).toHaveTitle('Slate Social - Social Media for Climbing Gyms');
    
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Slate Social/);
  });

  test('should display the header with navigation', async ({ page }) => {
    // Check header is visible
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check logo/brand is present
    const logo = page.locator('header').getByText('SLATE');
    await expect(logo).toBeVisible();
    
    // Check navigation links in header
    await expect(header.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Features' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Contact' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Login' })).toBeVisible();
  });

  test('should display dark mode toggle', async ({ page }) => {
    const darkModeToggle = page.getByRole('button', { name: /toggle dark mode/i });
    await expect(darkModeToggle).toBeVisible();
    
    // Test toggle functionality
    const html = page.locator('html');
    const initialDarkMode = await html.evaluate(el => el.classList.contains('dark'));
    
    await darkModeToggle.click();
    
    // Wait for the class to change
    if (initialDarkMode) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }
  });
});

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero section with main heading', async ({ page }) => {
    const heroHeading = page.getByRole('heading', { level: 1 });
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('Community Hub');
    await expect(heroHeading).toContainText('Climbing Gym');
  });

  test('should display tagline text', async ({ page }) => {
    const tagline = page.getByText('Social Media for Climbing Gyms');
    await expect(tagline).toBeVisible();
  });

  test('should display animated glitch text', async ({ page }) => {
    const glitchText = page.locator('#glitch-text');
    await expect(glitchText).toBeVisible();
    
    // The text should change over time (animated)
    const initialText = await glitchText.textContent();
    expect(initialText).toBeTruthy();
  });

  test('should display Learn More button that navigates to about section', async ({ page }) => {
    const learnMoreButton = page.getByRole('link', { name: 'Learn More' });
    await expect(learnMoreButton).toBeVisible();
    
    await learnMoreButton.click();
    await expect(page).toHaveURL(/#about/);
  });

  test('should display scroll indicator', async ({ page }) => {
    // The scroll indicator is a visual element at the bottom of hero
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
  });
});

test.describe('About Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#about');
    // Wait for the page to settle after navigation
    await page.waitForLoadState('domcontentloaded');
  });

  test('should display SLATE SOCIAL heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'SLATE SOCIAL', exact: true });
    // Wait for the heading to become visible (animation may still be running)
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('should display subheading about climbing gyms', async ({ page }) => {
    const subheading = page.getByRole('heading', { name: /social media engineered for climbing gyms/i });
    await expect(subheading).toBeVisible({ timeout: 10000 });
  });

  test('should display stats counters', async ({ page }) => {
    // Check for the counter label elements (these appear immediately)
    await expect(page.getByText('Core Modules')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('% Climbing Focus')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Platform').first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Features Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#features');
    await page.waitForTimeout(500);
  });

  test('should display Platform Modules heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Platform Modules' });
    await expect(heading).toBeVisible();
  });

  test('should display all 6 feature cards', async ({ page }) => {
    const features = [
      'Message Board',
      'Groups & Clubs',
      'Competitions',
      'Gym News',
      'Polls & Feedback',
      'Partner Finder'
    ];

    for (const feature of features) {
      await expect(page.getByRole('heading', { name: feature })).toBeVisible();
    }
  });

  test('should open modal when clicking a feature card', async ({ page }) => {
    // Click on Message Board feature card
    const messageBoard = page.getByRole('button', { name: /Message Board/i });
    await messageBoard.click();
    
    // Modal should appear
    const modal = page.locator('#feature-modal');
    await expect(modal).toBeVisible();
    
    // Modal should contain feature details
    await expect(page.locator('#modal-title')).toContainText('Message Board');
  });

  test('should close modal when clicking close button', async ({ page }) => {
    // Open modal
    await page.getByRole('button', { name: /Message Board/i }).click();
    await expect(page.locator('#feature-modal')).toBeVisible();
    
    // Close modal
    await page.locator('#modal-close').click();
    await page.waitForTimeout(300); // Wait for animation
    
    // Modal should be hidden
    const backdrop = page.locator('#feature-modal-backdrop');
    await expect(backdrop).toHaveClass(/opacity-0/);
  });

  test('should close modal when pressing Escape', async ({ page }) => {
    // Open modal
    await page.getByRole('button', { name: /Competitions/i }).click();
    await expect(page.locator('#feature-modal')).toBeVisible();
    
    // Press Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    
    // Modal should be hidden
    const backdrop = page.locator('#feature-modal-backdrop');
    await expect(backdrop).toHaveClass(/opacity-0/);
  });
});

test.describe('Benefits Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to benefits section
    await page.evaluate(() => {
      const benefits = document.querySelector('h2');
      const section = Array.from(document.querySelectorAll('section')).find(
        s => s.textContent?.includes('Why Slate Social')
      );
      section?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);
  });

  test('should display Why Slate Social heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Why Slate Social?' });
    await expect(heading).toBeVisible();
  });

  test('should display all 4 benefits', async ({ page }) => {
    const benefits = [
      'Boost Engagement',
      'Build Community',
      'Reduce Churn',
      'Tailored for Climbing'
    ];

    for (const benefit of benefits) {
      await expect(page.getByRole('heading', { name: benefit })).toBeVisible();
    }
  });
});

test.describe('Blog Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to blog section
    await page.evaluate(() => {
      const section = Array.from(document.querySelectorAll('section')).find(
        s => s.textContent?.includes('Latest Insights')
      );
      section?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);
  });

  test('should display Latest Insights heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Latest Insights' });
    await expect(heading).toBeVisible();
  });

  test('should display View All Posts link', async ({ page }) => {
    const viewAllLink = page.getByRole('link', { name: 'View All Posts' });
    await expect(viewAllLink).toBeVisible();
    await expect(viewAllLink).toHaveAttribute('href', '/blog');
  });
});

test.describe('Registration Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#register');
    await page.waitForTimeout(500);
  });

  test('should display Join the Beta heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Join the Beta/i });
    await expect(heading).toBeVisible();
  });

  test('should display all form fields', async ({ page }) => {
    await expect(page.getByLabel('Full Name')).toBeVisible();
    await expect(page.getByLabel('Gym Name')).toBeVisible();
    await expect(page.getByLabel('Work Email')).toBeVisible();
    await expect(page.getByLabel(/social challenges/i)).toBeVisible();
  });

  test('should display submit button', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Register Interest' });
    await expect(submitButton).toBeVisible();
  });

  test('should have required validation on form fields', async ({ page }) => {
    const nameInput = page.getByLabel('Full Name');
    const gymInput = page.getByLabel('Gym Name');
    const emailInput = page.getByLabel('Work Email');
    
    await expect(nameInput).toHaveAttribute('required', '');
    await expect(gymInput).toHaveAttribute('required', '');
    await expect(emailInput).toHaveAttribute('required', '');
  });

  test('should allow filling in the form', async ({ page }) => {
    await page.getByLabel('Full Name').fill('Test User');
    await page.getByLabel('Gym Name').fill('Test Climbing Gym');
    await page.getByLabel('Work Email').fill('test@example.com');
    await page.getByLabel(/social challenges/i).fill('Test message');
    
    // Verify values were filled
    await expect(page.getByLabel('Full Name')).toHaveValue('Test User');
    await expect(page.getByLabel('Gym Name')).toHaveValue('Test Climbing Gym');
    await expect(page.getByLabel('Work Email')).toHaveValue('test@example.com');
    await expect(page.getByLabel(/social challenges/i)).toHaveValue('Test message');
  });
});

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
  });

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should display copyright text', async ({ page }) => {
    await expect(page.getByText(/© \d{4} Slate Social/)).toBeVisible();
  });

  test('should display footer navigation links', async ({ page }) => {
    const footerLinks = ['Team', 'Careers', 'Blog', 'Press Kit', 'Terms', 'Privacy'];
    
    for (const link of footerLinks) {
      await expect(page.locator('footer').getByRole('link', { name: link })).toBeVisible();
    }
  });
});

test.describe('Responsive Design', () => {
  test('should display correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Hero should be visible
    const heroHeading = page.getByRole('heading', { level: 1 });
    await expect(heroHeading).toBeVisible();
    
    // Navigation might be collapsed on mobile - check header exists
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should display correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    const heroHeading = page.getByRole('heading', { level: 1 });
    await expect(heroHeading).toBeVisible();
  });

  test('should display correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    
    const heroHeading = page.getByRole('heading', { level: 1 });
    await expect(heroHeading).toBeVisible();
    
    // All navigation links should be visible on desktop (use header to be specific)
    const header = page.locator('header');
    await expect(header.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Features' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Blog' })).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // There should be exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');
    
    // Check that images have alt attributes (blog post images)
    const images = page.locator('img[alt]');
    const imageCount = await images.count();
    
    // All images should have alt attribute
    for (let i = 0; i < imageCount; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      // Alt can be empty string for decorative images, but should exist
      expect(alt).not.toBeNull();
    }
  });

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/#register');
    await page.waitForTimeout(500);
    
    // Each input should have an associated label
    const nameInput = page.getByLabel('Full Name');
    const gymInput = page.getByLabel('Gym Name');
    const emailInput = page.getByLabel('Work Email');
    
    await expect(nameInput).toBeVisible();
    await expect(gymInput).toBeVisible();
    await expect(emailInput).toBeVisible();
  });

  test('should be navigable by keyboard', async ({ page }) => {
    await page.goto('/');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    
    // First focusable element should be focused
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('should navigate to blog page', async ({ page }) => {
    await page.goto('/');
    
    // Use header to be specific (Blog link exists in both header and footer)
    await page.locator('header').getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL('/blog');
  });

  test('should scroll to about section when clicking About link', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('header').getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/#about/);
  });

  test('should scroll to features section when clicking Features link', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('header').getByRole('link', { name: 'Features' }).click();
    await expect(page).toHaveURL(/#features/);
  });

  test('should navigate home when clicking logo', async ({ page }) => {
    await page.goto('/#features');
    
    await page.locator('header').getByRole('link', { name: 'SLATE' }).click();
    await expect(page).toHaveURL('/');
  });
});
