# Slate Design System

## Overview

Slate is a modern, minimal design system built for bouldering gym management tools. The design emphasizes clarity, speed, and professionalism while maintaining an approachable, contemporary feel. This guide provides platform-agnostic design specifications that can be implemented across web, mobile (Flutter), native applications, and other platforms.

## Brand Principles

### Design Philosophy

- **Minimal & Clean**: Remove visual noise, focus on content and functionality
- **High Contrast**: Ensure excellent readability in all lighting conditions (gym environments)
- **Speed & Efficiency**: Interactions should feel instant and responsive
- **Professionalism with Warmth**: Business-grade tools with an approachable personality
- **Adaptive**: Seamlessly support both light and dark modes

## Color System

### Primary Colors

#### Light Mode

- **Background Primary**: #FFFFFF (Pure White)
- **Background Secondary**: #FAFAFA (Off-White)
- **Text Primary**: #000000 (Pure Black)
- **Text Secondary**: #52525B (Zinc 600)
- **Text Tertiary**: #A1A1AA (Zinc 400)

#### Dark Mode

- **Background Primary**: #000000 (Pure Black)
- **Background Secondary**: #18181B (Zinc 900)
- **Text Primary**: #FFFFFF (Pure White)
- **Text Secondary**: #A1A1AA (Zinc 400)
- **Text Tertiary**: #52525B (Zinc 600)

### Neutral Scale (Zinc/Gray)

- **50**: #FAFAFA - Lightest backgrounds (light mode)
- **100**: #F4F4F5 - Subtle backgrounds
- **200**: #E4E4E7 - Borders (light mode)
- **300**: #D4D4D8 - Disabled states
- **400**: #A1A1AA - Muted text
- **500**: #71717A - Mid-tone text
- **600**: #52525B - Secondary text
- **700**: #3F3F46 - Strong text
- **800**: #27272A - Borders (dark mode)
- **900**: #18181B - Backgrounds (dark mode)
- **950**: #09090B - Deepest dark

### Accent Colors

#### Primary Accent (Black/White Inversion)

- **Light Mode Button**: Black text on white, or white text on black
- **Dark Mode Button**: White text on black, or black text on white
- **Purpose**: Primary actions, key highlights

#### Semantic Colors

- **Success/Positive**: #22C55E (Green 500)
  - Used for: Confirmations, checkmarks, positive states
- **Warning**: #EAB308 (Yellow 500)
  - Used for: Alerts, cautions, pending states
- **Error/Negative**: #EF4444 (Red 500)
  - Used for: Errors, destructive actions, alerts
- **Info**: #3B82F6 (Blue 500)
  - Used for: Information, links, neutral highlights

## Typography

### Font Family

- **Primary Font**: Inter
- **Fallback**: System UI fonts (San Francisco on iOS, Roboto on Android, system-ui)
- **Weight**: 400 (Regular), 600 (Semi-Bold), 800 (Extra Bold)

### Type Scale

#### Display/Hero Text

- **Size**: 96-128px (mobile: 48-64px)
- **Weight**: 800 (Extra Bold)
- **Line Height**: 1.1 (110%)
- **Letter Spacing**: -2.5% (Tighter)
- **Usage**: Large hero headlines, landing page headers

#### Heading 1

- **Size**: 48-72px (mobile: 32-40px)
- **Weight**: 800 (Extra Bold)
- **Line Height**: 1.1 (110%)
- **Letter Spacing**: -2.5% (Tighter)
- **Usage**: Page titles, main section headings

#### Heading 2

- **Size**: 36-48px (mobile: 28-32px)
- **Weight**: 800 (Extra Bold)
- **Line Height**: 1.2 (120%)
- **Letter Spacing**: -2.5% (Tighter)
- **Usage**: Secondary headings, feature titles

#### Heading 3

- **Size**: 24-30px (mobile: 20-24px)
- **Weight**: 700 (Bold)
- **Line Height**: 1.3 (130%)
- **Letter Spacing**: -1% (Slightly Tighter)
- **Usage**: Subsection headings, card titles

#### Heading 4

- **Size**: 18-20px (mobile: 16-18px)
- **Weight**: 700 (Bold)
- **Line Height**: 1.4 (140%)
- **Letter Spacing**: Normal
- **Usage**: Component titles, list headings

#### Body Large

- **Size**: 18-20px
- **Weight**: 400 (Regular)
- **Line Height**: 1.6 (160%)
- **Usage**: Featured body text, intros

#### Body Regular

- **Size**: 14-16px
- **Weight**: 400 (Regular)
- **Line Height**: 1.5 (150%)
- **Usage**: Standard body text, descriptions

#### Body Small

- **Size**: 12-14px
- **Weight**: 400 (Regular)
- **Line Height**: 1.4 (140%)
- **Usage**: Captions, helper text, fine print

#### Label/Mono

- **Size**: 10-12px
- **Weight**: 400 (Regular)
- **Line Height**: 1.2 (120%)
- **Letter Spacing**: 30% (Wide)
- **Transform**: Uppercase
- **Usage**: Labels, tags, metadata

## Spacing System

Use a consistent 4px base unit for all spacing. Implement spacing using multiples of this base:

### Spacing Scale

- **0**: 0px
- **1**: 4px - Tight inline spacing
- **2**: 8px - Small gaps, icon spacing
- **3**: 12px - Compact spacing
- **4**: 16px - Standard element spacing
- **6**: 24px - Medium spacing, component gaps
- **8**: 32px - Large spacing, section gaps
- **12**: 48px - Extra large spacing, major sections
- **16**: 64px - Huge spacing, page sections
- **24**: 96px - Major section breaks
- **32**: 128px - Full page spacing

### Layout Guidelines

- **Container Max Width**: 1280px (for content sections)
- **Content Max Width**: 768px (for reading content)
- **Mobile Padding**: 16px (sides)
- **Desktop Padding**: 24-48px (sides)
- **Vertical Section Padding**: 96-128px (mobile: 48-64px)

## Border & Corner Radius

### Border Width

- **Thin**: 1px - Standard borders, dividers
- **Medium**: 2px - Active states, focus rings, emphasized borders
- **Thick**: 4px - Strong visual separation

### Corner Radius

- **None**: 0px - Cards, containers (Slate uses mostly sharp corners)
- **Small**: 4px - Buttons, small elements
- **Medium**: 8px - Form inputs, small cards
- **Large**: 16px - Large cards, modals
- **X-Large**: 24px - Feature cards, special containers
- **Full**: 9999px - Pills, circular buttons

## Shadows & Elevation

Slate uses minimal shadows, preferring borders and high contrast instead:

### Shadow Levels

#### None
- Default state (no shadow)

#### Subtle
- Use for slight hover elevation
- **Blur**: 8px, **Offset Y**: 2px
- **Color**: Black 5% opacity (light), White 5% opacity (dark)

#### Medium
- Use for dropdowns, popovers
- **Blur**: 16px, **Offset Y**: 4px
- **Color**: Black 10% opacity (light), White 10% opacity (dark)

#### Large
- Use for modals, dialogs
- **Blur**: 32px, **Offset Y**: 8px
- **Color**: Black 20% opacity (light), White 20% opacity (dark)

## Component Patterns

### Buttons

#### Primary Button

- **Background**: Black (light mode), White (dark mode)
- **Text**: White (light mode), Black (dark mode)
- **Padding**: 16px horizontal, 12px vertical (medium)
- **Corner Radius**: 4px
- **Font Weight**: 700 (Bold)
- **Font Size**: 14px
- **Text Transform**: Uppercase
- **Letter Spacing**: 2px (Wide)
- **Hover**: 90% opacity, slight scale (1.05x)
- **Active**: 95% scale
- **Disabled**: 40% opacity

#### Secondary Button

- **Background**: Transparent
- **Border**: 2px solid Gray-200 (light), Gray-800 (dark)
- **Text**: Black (light mode), White (dark mode)
- **Padding**: 16px horizontal, 12px vertical
- **Corner Radius**: 4px
- **Font Weight**: 700 (Bold)
- **Font Size**: 14px
- **Text Transform**: Uppercase
- **Letter Spacing**: 2px (Wide)
- **Hover**: Border becomes Black (light) or White (dark), background subtle fill
- **Active**: 95% scale
- **Disabled**: 40% opacity

#### Text Button

- **Background**: Transparent
- **Text**: Gray-600 (light), Gray-400 (dark)
- **Padding**: 8px horizontal, 8px vertical
- **Font Weight**: 600 (Semi-Bold)
- **Font Size**: 14px
- **Hover**: Text becomes Black (light) or White (dark)
- **Active**: 90% opacity

### Form Inputs

#### Text Input

- **Background**: Gray-50 (light mode), Gray-900 (dark mode)
- **Border**: 1px solid Gray-200 (light), Gray-800 (dark)
- **Padding**: 12px horizontal, 10px vertical
- **Corner Radius**: 8px
- **Font Size**: 14px
- **Placeholder**: Gray-400
- **Focus**: Border becomes Black (light) or White (dark), 2px width

#### Select/Dropdown

- Same styling as Text Input
- Include down arrow icon (16px) on right with 12px padding

#### Checkbox/Radio

- **Size**: 20px × 20px
- **Border**: 2px solid Gray-300 (light), Gray-700 (dark)
- **Corner Radius**: 4px (checkbox), 50% (radio)
- **Checked Background**: Black (light), White (dark)
- **Checkmark**: White (light), Black (dark), size 12px

#### Toggle/Switch

- **Width**: 44px, **Height**: 24px
- **Background Off**: Gray-300 (light), Gray-700 (dark)
- **Background On**: Black (light), White (dark)
- **Thumb**: White (light), Black (dark), 20px diameter
- **Corner Radius**: Full (pill shape)

### Cards

#### Standard Card

- **Background**: White (light), Black (dark)
- **Border**: 1px solid Gray-200 (light), Gray-800 (dark)
- **Corner Radius**: 8px
- **Padding**: 24px
- **Hover**: Border becomes darker/lighter, subtle scale (1.02x)

#### Feature Card

- **Background**: White (light), Black (dark)
- **Border**: 1px solid Gray-200 (light), Gray-800 (dark)
- **Corner Radius**: 16px
- **Padding**: 32px
- **Hover**: Border becomes Black (light) or White (dark)

#### List Item

- **Background**: Transparent
- **Border Bottom**: 1px solid Gray-200 (light), Gray-800 (dark)
- **Padding**: 16px
- **Hover**: Background Gray-50 (light), Gray-900 (dark)

### Navigation

#### Header/AppBar

- **Height**: 64px
- **Background**: White 80% opacity with blur (light), Black 80% opacity with blur (dark)
- **Border Bottom**: 1px solid Gray-200 (light), Gray-800 (dark)
- **Position**: Fixed at top
- **Logo Size**: 20-24px height
- **Nav Link Spacing**: 32px between items
- **Nav Link Size**: 14px
- **Nav Link Weight**: 600 (Semi-Bold)

#### Navigation Link

- **Default**: Gray-600 (light), Gray-400 (dark)
- **Hover**: Black (light), White (dark)
- **Active**: Black (light), White (dark) with underline (2px)

### Modals & Dialogs

#### Modal Container

- **Background**: White (light), Gray-900 (dark)
- **Border**: 1px solid Gray-200 (light), Gray-800 (dark)
- **Corner Radius**: 16px
- **Padding**: 32px
- **Max Width**: 500px
- **Shadow**: Large shadow
- **Backdrop**: Black 60% opacity with blur effect

#### Modal Animation

- **Enter**: Scale from 0.95 to 1.0, Opacity 0 to 1, Duration 300ms
- **Exit**: Scale from 1.0 to 0.95, Opacity 1 to 0, Duration 200ms

## Animations & Transitions

### Timing

- **Fast**: 150ms - Micro-interactions (hover, active states)
- **Normal**: 300ms - Standard transitions (modal open, fade in)
- **Slow**: 500ms - Deliberate animations (page transitions, number animations)

### Easing Functions

- **Standard**: Ease-out cubic (0.25, 0.46, 0.45, 0.94) - Most common use
- **Emphasis**: Ease-out quart (0.165, 0.84, 0.44, 1) - Snappier feel
- **Smooth**: Ease-in-out (0.42, 0, 0.58, 1) - Gentle start and end

### Common Animations

#### Fade In

- **Opacity**: 0 to 1
- **Transform**: Translate Y 20px to 0
- **Duration**: 300ms
- **Easing**: Ease-out

#### Button Hover

- **Scale**: 1.0 to 1.05
- **Opacity**: 100% to 90%
- **Duration**: 150ms
- **Easing**: Ease-out

#### Button Active/Press

- **Scale**: 1.0 to 0.95
- **Duration**: 100ms
- **Easing**: Ease-out

#### Dropdown/Modal Open

- **Opacity**: 0 to 1
- **Scale**: 0.95 to 1.0
- **Duration**: 300ms
- **Easing**: Ease-out quart

## Iconography

### Icon System

- **Style**: Outline/Stroke style (2px stroke weight)
- **Library Recommendation**: Lucide Icons, Feather Icons, or similar minimal icon sets
- **Sizes**:
  - Small: 16px
  - Medium: 20px
  - Large: 24px
  - XL: 32px
- **Color**: Inherit from parent text color
- **Padding**: Minimum 8px clearance from other elements

### Icon Usage

- Always align icons with adjacent text baseline when inline
- Use icons to support text, not replace it (except for well-known actions)
- Maintain consistent icon sizing within a component

## Grid & Layout

### Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: > 1440px

### Grid System

- **Columns**: 12 column grid
- **Gutter**: 24px (mobile: 16px)
- **Margin**: 48px (mobile: 16px)

### Layout Patterns

- **Single Column**: Full-width content (mobile, reading content)
- **Two Column**: 2:1 or 1:1 ratio for content and sidebar
- **Three Column**: Feature grids, card layouts
- **Four Column**: Dense content grids (collapse to 2 on tablet, 1 on mobile)

## Accessibility

### Color Contrast

- Text on backgrounds must meet WCAG AA standards:
  - **Normal text**: 4.5:1 minimum contrast ratio
  - **Large text (18px+)**: 3:1 minimum contrast ratio
- Primary text (black on white, white on black) exceeds AAA standards

### Touch Targets

- **Minimum touch target size**: 44px × 44px
- **Spacing between touch targets**: Minimum 8px

### Focus States

- All interactive elements must have visible focus indicators
- **Focus ring**: 2px solid Black (light) or White (dark)
- **Focus ring offset**: 2px from element

### Motion

- Respect user's motion preferences
- Provide option to reduce or disable animations
- Essential animations should be subtle and quick

## Special Effects

### Background Grid Pattern

- **Pattern**: Dashed grid lines
- **Spacing**: 60px × 60px
- **Line Width**: 1px
- **Dash Pattern**: 4px dash, 6px gap
- **Color**: Gray-900 (light mode) or Gray-100 (dark mode)
- **Opacity**: 15% (light mode), 20% (dark mode)
- **Usage**: Hero backgrounds, empty states

### Animated Grid Beams

- **Animation**: Vertical lines falling from top to bottom
- **Duration**: 5-10 seconds per beam
- **Width**: 1px
- **Height**: 400px
- **Color**: Gradient from transparent to Gray-900 (light) or Gray-100 (dark)
- **Stagger**: Random delays 0-5 seconds
- **Usage**: Hero sections, loading states

### Glass Morphism (Frosted Glass)

- **Background**: White or Black with 80% opacity
- **Backdrop Filter**: Blur 12px
- **Border**: 1px solid with subtle opacity
- **Usage**: Fixed headers, overlays, floating elements

### Text Effects

#### Skewed Highlight Box

- **Background**: Black (light mode), White (dark mode)
- **Transform**: Skew X by -6 degrees
- **Padding**: 8px horizontal, 4px vertical
- **Text Color**: White (light mode), Black (dark mode)
- **Usage**: Emphasizing key words in headlines

#### Glitch/Scramble Text

- **Effect**: Letters randomly scramble using special characters
- **Characters**: !<>-_\\/[]{}—=+*^?#________
- **Duration**: 15-30 frames total
- **Usage**: Loading states, dynamic content changes

## Brand Voice & Messaging

### Tone

- **Professional but approachable**: Business-grade without being corporate
- **Clear and direct**: No jargon, simple language
- **Confident**: Strong, decisive statements
- **Supportive**: Helpful and empowering

### Writing Style

- Use sentence case for most headings (not title case)
- Keep button text short and action-oriented (2-3 words max)
- Use active voice
- Avoid exclamation marks unless celebrating user success

### Example Copy

- **Button**: "Learn More", "Get Started", "View Pricing"
- **Headlines**: "The Operating System for your Climbing Gym"
- **Descriptions**: Brief, benefit-focused statements (10-15 words)

## Implementation Notes

### For Web

- Use CSS variables for colors to support theme switching
- Implement prefers-color-scheme media query
- Use CSS Grid and Flexbox for layouts
- Consider using Tailwind CSS with custom configuration

### For Flutter/Mobile

- Use Theme and ThemeData for consistent styling
- Implement platform-specific adaptations (Material on Android, Cupertino on iOS)
- Consider device pixel ratios for sizing
- Use AnimatedContainer and Hero widgets for transitions

### For Other Platforms

- Maintain spacing ratios even if base unit changes
- Adapt touch targets for platform (mouse vs touch)
- Use platform-native fonts as fallbacks
- Test color contrast in platform's light/dark modes

## Version History

**Version 1.0** - Initial release (January 2026)
- Core color system (light/dark)
- Typography scale
- Component patterns
- Animation guidelines
- Brand principles
