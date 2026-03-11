# NZ Math Hub - New Features Guide

## Table of Contents
1. [Accordion Worked Examples](#accordion-worked-examples) ⭐ **DEFAULT METHOD**
2. [Interactive Components](#interactive-components)
3. [Dark Mode](#dark-mode)
4. [Print Worksheets](#print-worksheets)
5. [Keyboard Shortcuts](#keyboard-shortcuts)
6. [Lesson Templates](#lesson-templates)
7. [Implementation Examples](#implementation-examples)

---

## Accordion Worked Examples

### Overview
**The accordion method is the default format for all worked examples** across the NZ Math Hub. This interactive approach allows students to:
- Work through problems at their own pace
- Reveal steps progressively for better comprehension
- Jump to any step for quick reference
- Maintain engagement through interactivity

### Benefits
- ✅ **Student-Centered**: Students control when to reveal each step
- ✅ **Active Learning**: Click interaction keeps students engaged
- ✅ **Flexible Review**: Open/close any step for comparison
- ✅ **Print-Friendly**: All steps automatically shown when printing
- ✅ **Mobile-Optimized**: Works perfectly on all devices

### Files Required
- `scroll-reveal.css` - Contains accordion styling and other example display methods

### Implementation

#### HTML Structure
```html
<div class="accordion-example">
    <h3>Example 1: Your Title</h3>
    
    <div class="example-question">
        <strong>Question:</strong> Find the derivative of $f(x) = x^3$
    </div>
    
    <div class="accordion-step">
        <div class="accordion-header" onclick="toggleAccordion(this)">
            <span class="step-label">Step 1: Apply the power rule</span>
            <span class="accordion-toggle">▼</span>
        </div>
        <div class="accordion-content">
            <div class="step-math">
                $$f'(x) = 3x^2$$
            </div>
            <div class="step-explanation">
                Multiply by the power (3) and reduce power by 1
            </div>
        </div>
    </div>
    
    <div class="accordion-step">
        <div class="accordion-header" onclick="toggleAccordion(this)">
            <span class="step-label"><strong>✓ Answer</strong></span>
            <span class="accordion-toggle">▼</span>
        </div>
        <div class="accordion-content">
            <div class="step-math">
                $$f'(x) = 3x^2$$
            </div>
        </div>
    </div>
</div>
```

#### CSS Link (in `<head>`)
```html
<link rel="stylesheet" href="../../scroll-reveal.css">
```

#### JavaScript Function
```javascript
function toggleAccordion(header) {
    const step = header.parentElement;
    const content = header.nextElementSibling;
    const isOpen = header.classList.contains('active');
    
    // Toggle this accordion
    header.classList.toggle('active');
    content.classList.toggle('open');
    
    // Mark as completed when opened
    if (!isOpen) {
        step.classList.add('completed');
    }
    
    // Re-render math in opened content
    if (content.classList.contains('open') && typeof renderMathInElement !== 'undefined') {
        renderMathInElement(content, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false}
            ],
            throwOnError: false
        });
    }
}
```

### CSS Classes Reference

| Class | Purpose |
|-------|---------|
| `.accordion-example` | Container for entire example (yellow/blue/teal background) |
| `.example-question` | Question box at top (bordered, white background) |
| `.accordion-step` | Individual collapsible step container |
| `.accordion-header` | Clickable header (hover effect, cursor pointer) |
| `.step-label` | Text label for step description |
| `.accordion-toggle` | Arrow indicator (▼ rotates when open) |
| `.accordion-content` | Hidden content (expands on click) |
| `.step-math` | Mathematical notation container |
| `.step-explanation` | Explanatory text with grey color |

### Styling

The accordion appears in three color schemes based on container class:
- **Yellow** (`accordion-example`): Default warm tone
- **Blue** (sequential examples): Cool professional
- **Teal** (scroll examples): Original scroll-reveal styling

Steps show visual feedback:
- **Hover**: Light grey background
- **Active/Open**: Yellow highlight with bottom border
- **Completed**: Green background when previously opened

### Best Practices

1. **Clear Step Labels**: Use concise, actionable descriptions
   - ✅ "Step 1: Apply the power rule"
   - ❌ "Step 1"

2. **Progressive Complexity**: Order steps from simple to complex

3. **Final Answer**: Use last step with checkmark and bold
   ```html
   <span class="step-label"><strong>✓ Answer</strong></span>
   ```

4. **Math Formatting**: 
   - Use `.step-math` for equations
   - Use `.step-explanation` for explanatory text
   - Each equation on separate line (no run-on equals)

5. **Mobile Consideration**: Keep steps concise for small screens

### When to Use Alternatives

While accordion is default, consider alternatives for:
- **Simple 1-2 step examples**: Use inline static format
- **Tutorial videos**: Use video-style scrubber (see SCROLL-REVEAL-GUIDE.md)
- **Practice worksheets**: Keep using show/hide answer buttons

---

## Interactive Components

### Overview
Three powerful interactive components have been added to enhance student engagement:
- **Drag-and-Drop Matching** - Match terms to definitions
- **Multiple Choice Quizzes** - Interactive self-assessment
- **Graphing Tool** - Live function plotting

### Files Added
- `interactive.js` - JavaScript classes for all components
- `interactive.css` - Styling for interactive elements

### How to Use Interactive Components

#### 1. Drag-and-Drop Matching

**Include in your HTML:**
```html
<div id="matching-activity"></div>
```

**Initialize with JavaScript:**
```javascript
const matchingItems = [
    {id: 1, term: "x²", match: "Quadratic term"},
    {id: 2, term: "2x", match: "Linear term"},
    {id: 3, term: "5", match: "Constant term"}
];

new DragDropMatching('matching-activity', matchingItems, () => {
    console.log('All matched correctly!');
});
```

**Features:**
- Visual feedback for correct/incorrect matches
- Prevents dragging after correct match
- Success message when all matched
- Responsive design for mobile

#### 2. Multiple Choice Quiz

**Include in your HTML:**
```html
<div id="quiz-container"></div>
```

**Initialize with JavaScript:**
```javascript
const questions = [
    {
        question: "What is the derivative of x²?",
        options: ["x", "2x", "2", "x²"],
        correct: 1, // Index: 0=A, 1=B, 2=C, 3=D
        explanation: "Using the power rule: d/dx(x²) = 2x"
    },
    // Add more questions...
];

new MultipleChoiceQuiz('quiz-container', questions);
```

**Features:**
- Question progress tracker
- Live score display
- Color-coded feedback (green=correct, red=incorrect)
- Detailed explanations after each answer
- Final results screen with percentage
- "Try Again" button to restart

#### 3. Simple Graphing Tool

**Include in your HTML:**
```html
<canvas id="graph-canvas"></canvas>
```

**Initialize with JavaScript:**
```javascript
const grapher = new SimpleGrapher('graph-canvas', {
    width: 600,
    height: 400,
    xMin: -10,
    xMax: 10,
    yMin: -10,
    yMax: 10
});

// Plot a function
grapher.plotFunction((x) => x * x, '#0066cc');

// Plot points
grapher.plotPoints([[1, 1], [2, 4], [3, 9]], '#cc0000');

// Clear and redraw
grapher.clear();
```

**Features:**
- Automatic grid and axes
- Plot any JavaScript function
- Plot discrete points
- Customizable colors and ranges
- Clear/reset functionality

---

## Dark Mode

### Overview
High-contrast dark mode reduces eye strain and is ideal for low-light environments while maintaining WCAG accessibility standards.

### Files Added
- `dark-mode.css` - Complete dark theme

### How to Use

**Automatic inclusion:**
Dark mode is automatically available on all pages that include `dark-mode.css`.

**Toggle methods:**
1. Click the floating button (bottom-left corner)
2. Press `Ctrl+D` keyboard shortcut
3. Preference is saved in localStorage

**Color Scheme:**
```css
/* Dark Mode Colors */
--text-primary: #e0e0e0;
--text-secondary: #b0b0b0;
--background-primary: #1a1a1a;
--background-secondary: #2d2d2d;
--primary-accent: #00b3b3;
```

**Customization:**
Edit `dark-mode.css` to adjust colors. All components automatically adapt to dark mode.

---

## Print Worksheets

### Overview
Generate print-ready worksheets with customizable answer visibility.

### Files Added
- `print.css` - Print-optimized styles

### Features

**On-Screen Print Options:**
- Toggle answer visibility before printing
- Student information header (name, date, class)
- Professional formatting

**Print Optimizations:**
- A4 page size with 2cm margins
- Black and white conversion
- Hides navigation, buttons, and interactive elements
- Shows all answers by default (unless toggled off)
- Page break management

**How to Use:**
1. Click the "Print Worksheet" button (top-right)
2. Check "Hide answers when printing" if desired
3. Use browser print dialog (Ctrl+P)

**Customization:**
Edit `print.css` to adjust:
- Page margins
- Font sizes
- Answer visibility defaults
- Page break behavior

---

## Keyboard Shortcuts

### Overview
Navigate lessons efficiently with keyboard shortcuts.

### Available Shortcuts

| Shortcut | Action |
|----------|--------|
| `←` Left Arrow | Previous lesson |
| `→` Right Arrow | Next lesson |
| `Space` | Toggle first answer |
| `Ctrl+D` | Toggle dark mode |

### Implementation
Keyboard shortcuts are automatically active on all pages that include `interactive.js`.

**How it works:**
- Shortcuts disabled when typing in input/textarea
- Visual hint panel in bottom-right corner
- Works with existing navigation buttons

**Customization:**
Edit the `initKeyboardShortcuts()` function in `interactive.js` to add or modify shortcuts.

---

## Lesson Templates

### Overview
Four ready-to-use templates for consistent lesson creation.

### Templates Provided

#### 1. **Standard Lesson Template** (`lesson-template.html`)
Complete lesson with:
- Learning outcomes section
- Teaching slides (fixed-height)
- Worked examples (minimal change progression)
- Practice problems (4 sets with difficulty scaling)
- Full navigation and interactive features

**Best for:** Regular teaching lessons with worked examples and practice

#### 2. **Investigation Template** (`investigation-template.html`)
Student-led inquiry with:
- Introduction and learning intentions
- Guided exploration activities
- Data collection tables
- Pattern recognition prompts
- Conjecture formation
- Investigation questions with guidance
- Extension activities

**Best for:** Discovery learning, mathematical thinking, problem-solving

#### 3. **Interactive Lesson Template** (`interactive-lesson-template.html`)
Hands-on activities including:
- Drag-and-drop matching
- Interactive graphing
- Multiple choice quiz
- Additional practice problems
- Complete setup code

**Best for:** Engaging lessons with active learning components

#### 4. **Practice Worksheet Template** (`practice-template.html`)
Focused practice with:
- Instructions and tips
- 3-4 skill sets (basic → advanced)
- Challenge problems
- Self-assessment checklist
- Print-friendly formatting
- Answer toggle options

**Best for:** Homework, in-class practice, review sessions

### How to Use Templates

1. **Choose appropriate template** from `/templates/` folder
2. **Copy template** to desired location (e.g., `year13/3.6/lesson4.html`)
3. **Search and replace** placeholders (marked with `[BRACKETS]`):
   - `[LESSON TITLE]` → Your lesson title
   - `[Year X]` → Year 9/10/11/12/13
   - `[Topic Name]` → Topic/section name
   - `[expression]` → Mathematical content
4. **Update navigation paths** (`../../` may need adjustment)
5. **Fill in content** following existing examples
6. **Test** all interactive features

---

## Implementation Examples

### Example 1: Adding a Quiz to an Existing Lesson

**Step 1:** Add CSS and JS links in `<head>`:
```html
<link rel="stylesheet" href="../../interactive.css">
<script defer src="../../interactive.js"></script>
```

**Step 2:** Add container div:
```html
<section id="quiz" class="content-section">
    <h2 class="section-title">Check Your Understanding</h2>
    <div id="quiz-container"></div>
</section>
```

**Step 3:** Initialize quiz in your script:
```javascript
document.addEventListener("DOMContentLoaded", function() {
    const questions = [
        {
            question: "Differentiate y = 3x² + 2x",
            options: ["6x + 2", "3x + 2", "6x²", "3x² + 2"],
            correct: 0,
            explanation: "Using power rule: dy/dx = 6x + 2"
        }
    ];
    new MultipleChoiceQuiz('quiz-container', questions);
});
```

### Example 2: Adding Dark Mode to Existing Pages

**Step 1:** Add dark mode CSS:
```html
<link rel="stylesheet" href="../../dark-mode.css">
```

**Step 2:** Add toggle button before `</body>`:
```html
<button class="dark-mode-toggle" onclick="toggleDarkMode()"></button>
```

**Step 3:** Add toggle function:
```javascript
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
```

**Done!** Dark mode now works with keyboard shortcut and button.

### Example 3: Making a Page Print-Friendly

**Step 1:** Add print CSS:
```html
<link rel="stylesheet" href="../../print.css">
```

**Step 2:** Add print options (optional):
```html
<div class="print-options no-print">
    <label>
        <input type="checkbox" id="hide-answers" onchange="togglePrintAnswers()">
        Hide answers when printing
    </label>
    <button onclick="window.print()">Print</button>
</div>
```

**Step 3:** Add toggle function:
```javascript
function togglePrintAnswers() {
    const hideAnswers = document.getElementById('hide-answers').checked;
    document.body.classList.toggle('hide-answers-print', hideAnswers);
}
```

**Step 4:** Mark elements to hide in print with `no-print` class:
```html
<button class="show-answer-btn no-print">Show Answer</button>
```

### Example 4: Adding a Graphing Tool

**Step 1:** Include interactive files:
```html
<link rel="stylesheet" href="../../interactive.css">
<script defer src="../../interactive.js"></script>
```

**Step 2:** Add graph container:
```html
<div class="graph-container">
    <canvas id="main-graph" class="graph-canvas"></canvas>
    <div class="graph-controls">
        <button onclick="plotLinear()">Linear</button>
        <button onclick="plotQuadratic()">Quadratic</button>
        <button onclick="clearGraph()">Clear</button>
    </div>
</div>
```

**Step 3:** Initialize and create plot functions:
```javascript
let grapher;

document.addEventListener("DOMContentLoaded", function() {
    grapher = new SimpleGrapher('main-graph', {
        xMin: -10, xMax: 10,
        yMin: -10, yMax: 10
    });
});

function plotLinear() {
    grapher.clear();
    grapher.plotFunction((x) => 2*x + 3, '#0066cc');
}

function plotQuadratic() {
    grapher.clear();
    grapher.plotFunction((x) => x*x - 4, '#cc0000');
}

function clearGraph() {
    grapher.clear();
}
```

---

## Best Practices

### General Guidelines

1. **Consistency:** Use templates to maintain consistent structure
2. **Accessibility:** All features maintain WCAG AAA standards
3. **Progressive Enhancement:** Pages work without JavaScript (graceful degradation)
4. **Mobile-First:** All components responsive on mobile devices
5. **Minimal Change:** Follow cognitive load reduction in practice problems

### Interactive Components

- **Don't overuse:** 1-2 interactive elements per lesson maximum
- **Provide alternatives:** Always include traditional questions too
- **Test thoroughly:** Check all functions work before publishing
- **Clear instructions:** Explain how to use each interactive feature

### Dark Mode

- **Test contrast:** Ensure text remains readable in both modes
- **Avoid pure colors:** Use accessible teal (#00b3b3) not pure cyan
- **Images:** Ensure images/graphs display well in dark mode

### Print Style

- **Test actual printing:** Don't rely on print preview alone
- **Check page breaks:** Ensure problems don't split across pages
- **Answer keys:** Provide option to hide/show answers
- **Minimal ink:** Use efficient layouts to save printing costs

### Templates

- **Update all placeholders:** Search for `[BRACKETS]` to find all
- **Maintain structure:** Keep sections even if content is brief
- **Navigation:** Test all links work correctly
- **KaTeX:** Check all math renders properly

---

## Troubleshooting

### Interactive Components Not Working

**Problem:** Drag-drop or quiz doesn't appear
**Solution:** 
- Check `interactive.js` is loaded
- Look for JavaScript errors in browser console
- Ensure initialization code runs after DOM loads

### Dark Mode Not Saving

**Problem:** Dark mode resets on page reload
**Solution:**
- Check localStorage is enabled in browser
- Verify toggle function includes localStorage.setItem()

### Print Layout Issues

**Problem:** Elements printing incorrectly
**Solution:**
- Add `no-print` class to hide elements
- Check `@media print` rules in print.css
- Test in actual print preview (Ctrl+P)

### Math Not Rendering

**Problem:** KaTeX formulas show as code
**Solution:**
- Verify KaTeX scripts load before rendering
- Check delimiters: use `$...$` or `$$...$$`
- No HTML tags inside math delimiters

### Keyboard Shortcuts Not Working

**Problem:** Keys don't trigger actions
**Solution:**
- Ensure interactive.js is loaded
- Check if cursor is in text input (shortcuts disabled there)
- Verify buttons exist on page for navigation

---

## Quick Reference

### Required Files for Full Features

```html
<head>
    <!-- Core styles -->
    <link rel="stylesheet" href="../../styles.css">
    
    <!-- Feature styles -->
    <link rel="stylesheet" href="../../interactive.css">
    <link rel="stylesheet" href="../../dark-mode.css">
    <link rel="stylesheet" href="../../print.css">
    
    <!-- KaTeX -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
    
    <!-- Interactive components and keyboard shortcuts -->
    <script defer src="../../interactive.js"></script>
</head>
```

### Minimal Working Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Lesson - NZ Math Hub</title>
    <link rel="stylesheet" href="../../styles.css">
    <link rel="stylesheet" href="../../dark-mode.css">
    <link rel="stylesheet" href="../../print.css">
</head>
<body>
    <header class="page-header">
        <h1>Lesson Title</h1>
    </header>
    
    <section class="content-section">
        <h2 class="section-title">Content</h2>
        <p>Your content here...</p>
    </section>
    
    <footer>
        <p>&copy; 2026 NZ Math Hub</p>
    </footer>
    
    <button class="dark-mode-toggle" onclick="toggleDarkMode()"></button>
    
    <script>
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        }
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    </script>
</body>
</html>
```

---

## Future Enhancements

Potential additions for future development:

1. **Progress Tracking** - Save student progress in localStorage
2. **Collaborative Features** - Share solutions with classmates
3. **Adaptive Practice** - Adjust difficulty based on performance
4. **Video Integration** - Embed instructional videos
5. **Accessibility Tools** - Text-to-speech, dyslexia-friendly fonts
6. **Mobile App** - Progressive Web App (PWA) version
7. **Analytics Dashboard** - Teacher view of student engagement

---

## Support

For questions or issues with these features:
1. Check this guide thoroughly
2. Review template examples
3. Test in multiple browsers
4. Consult existing working pages (year13/3.6/lesson1-10.html)

**Remember:** All features are designed to enhance learning while maintaining accessibility and simplicity.
