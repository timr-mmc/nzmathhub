# Accordion Examples - Implementation Standard

## Overview

**Accordion-style worked examples are the default format for all mathematical examples across NZ Math Hub.**

This document serves as the reference standard for implementing worked examples throughout the site.

## Why Accordion Format?

After testing multiple display methods (scroll-reveal, show-next-step, tabbed, static), the accordion method was selected as default because:

1. **Student Control**: Students decide when to reveal each step (active learning)
2. **Flexible Navigation**: Can jump to any step, compare steps side-by-side
3. **Engagement**: Interactive clicking maintains focus better than passive scrolling
4. **Universal Compatibility**: Works on all devices, prints correctly, accessible
5. **Visual Feedback**: Clear indication of opened steps, completion status
6. **No Forced Pacing**: Unlike sequential methods, students aren't confined to linear progression

## Implementation Status

### ✅ Fully Implemented
- **Year 13 - 3.6 Differentiation** (all 10 lessons, 34 examples)
  - Lesson 1: Power Rule (4 examples)
  - Lesson 2: Product & Quotient Rules (4 examples)
  - Lesson 3: Chain Rule (4 examples)
  - Lesson 4: Combined Techniques (3 examples)
  - Lesson 5: Tangents & Normals (4 examples)
  - Lesson 6: Stationary Points (3 examples)
  - Lesson 7: Points of Inflection (4 examples)
  - Lesson 8: Related Rates (4 examples)
  - Lesson 9: Optimisation (3 examples)
  - Lesson 10: Advanced Applications (4 examples)

### 📋 To Be Implemented
- Year 11 content
- Year 12 content
- Other Year 13 standards
- Year 9-10 strands

## Standard HTML Template

```html
<div class="accordion-example">
    <h3>Example [Number]: [Descriptive Title]</h3>
    
    <!-- Question Box -->
    <div class="example-question">
        <strong>Question:</strong> [Problem statement with $LaTeX$ if needed]
    </div>
    
    <!-- Step 1 -->
    <div class="accordion-step">
        <div class="accordion-header" onclick="toggleAccordion(this)">
            <span class="step-label">Step 1: [Action Description]</span>
            <span class="accordion-toggle">▼</span>
        </div>
        <div class="accordion-content">
            <div class="step-math">
                $$[LaTeX Equation]$$
            </div>
            <div class="step-explanation">
                [Optional explanatory text]
            </div>
        </div>
    </div>
    
    <!-- Step 2, 3, etc. (repeat structure) -->
    
    <!-- Final Answer Step -->
    <div class="accordion-step">
        <div class="accordion-header" onclick="toggleAccordion(this)">
            <span class="step-label"><strong>✓ Answer</strong></span>
            <span class="accordion-toggle">▼</span>
        </div>
        <div class="accordion-content">
            <div class="step-math">
                $$[Final Answer]$$
            </div>
        </div>
    </div>
</div>
```

## Required Files

### 1. CSS Stylesheet (in `<head>`)
```html
<link rel="stylesheet" href="../../scroll-reveal.css">
```

### 2. JavaScript Function (in `<script>` section)
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

## CSS Classes Reference

| Class Name | Purpose | Appearance |
|------------|---------|------------|
| `.accordion-example` | Container for entire example | Yellow/blue/teal background, padding, rounded, left border |
| `.example-question` | Question display box | White background, bordered, prominent |
| `.accordion-step` | Individual step container | Border, margin, rounded corners |
| `.accordion-header` | Clickable step header | Flex layout, grey background, hover effect |
| `.accordion-header.active` | Opened step header | Yellow background, bottom border |
| `.step-label` | Step description text | Bold, primary color |
| `.accordion-toggle` | Arrow indicator | Rotates 180° when open |
| `.accordion-content` | Hidden step content | Expands with transition, hidden by default |
| `.accordion-content.open` | Revealed step content | Max-height: 1000px, padding |
| `.accordion-step.completed` | Previously opened step | Green background on header |
| `.step-math` | Mathematical notation | Block display, margin |
| `.step-explanation` | Explanatory text | Grey color, smaller text |

## Best Practices

### Step Labels
✅ **DO**: Use clear, actionable descriptions
- "Step 1: Apply the power rule"
- "Step 2: Simplify the coefficients"
- "Step 3: Evaluate at x = 2"

❌ **DON'T**: Use vague or minimal labels
- "Step 1"
- "Next"
- "Calculation"

### Mathematical Content
✅ **DO**: 
- Each equation on separate line (no run-on equals)
- Use `step-math` for all mathematical expressions
- Use `step-explanation` for commentary

```html
<div class="step-math">
    $$x^2 = 4$$
</div>
<div class="step-math">
    $$x = \pm 2$$
</div>
```

❌ **DON'T**: Run equations together
```html
<div class="step-math">
    $$x^2 = 4 = x = \pm 2$$  <!-- Confusing! -->
</div>
```

### Example Titles
- Use descriptive titles that indicate complexity or technique
- Examples: "Basic Quadratic", "Using Quadratic Formula", "Product Rule with Chain Rule"

### Step Count
- Typical: 3-6 steps
- For complex problems: Up to 8-10 steps
- For simple demonstrations: 2-3 steps
- Always include final "✓ Answer" step

### Final Answer
Always mark the final step prominently:
```html
<span class="step-label"><strong>✓ Answer</strong></span>
```

## Accessibility

- **Keyboard**: Accordion headers are keyboard-accessible (onclick works with Enter key)
- **Screen Readers**: Use semantic HTML, clear step labels
- **Print**: All steps automatically revealed when printing (@media print rules)
- **Mobile**: Touch-friendly hit areas, works on all screen sizes

## Visual States

1. **Initial State**: All steps closed, grey headers
2. **Hover State**: Header background lightens
3. **Active State**: Open step has yellow background, downward arrow rotates up
4. **Completed State**: Previously opened steps have green tint (optional)

## Color Scheme

The accordion examples use context-appropriate colors:
- **Default (yellow)**: `#fff9e6` background, `#cc8800` border
- **Professional (blue)**: Used for formal sections
- **Visual hierarchy**: Question box white, steps alternate subtle shading

## Print Behavior

Defined in `@media print` section of `scroll-reveal.css`:
```css
@media print {
    .accordion-content {
        max-height: none !important;
        padding: 1rem !important;
    }
    /* All steps automatically expanded */
}
```

## Alternative Methods

While accordion is the default, other methods documented in [SCROLL-REVEAL-GUIDE.md](SCROLL-REVEAL-GUIDE.md) include:
1. Scroll-triggered reveal
2. Show-next-step button
3. Tabbed interface
4. Side-by-side comparison
5. Hover-reveal
6. Video-style scrubber
7. With checkboxes
8. Collapsed/expandable
9. Sticky navigation
10. Static (traditional)

Use alternatives only when pedagogically appropriate (e.g., tutorial videos → scrubber, quick reference → static).

## Migration Guide

### Converting from Static Format

**Old Format (with step numbers):**
```html
<div class="worked-example">
    <h3>Example 1: Title</h3>
    <div class="step">
        <span class="step-number">1</span>
        <strong>Description:</strong> content
    </div>
</div>
```

**New Format (accordion):**
```html
<div class="accordion-example">
    <h3>Example 1: Title</h3>
    <div class="accordion-step">
        <div class="accordion-header" onclick="toggleAccordion(this)">
            <span class="step-label">Step 1: Description</span>
            <span class="accordion-toggle">▼</span>
        </div>
        <div class="accordion-content">
            <div class="step-math">content</div>
        </div>
    </div>
</div>
```

### Checklist for New Pages
- [ ] Include `scroll-reveal.css` in head
- [ ] Add `toggleAccordion()` function in script section
- [ ] Use `.accordion-example` container
- [ ] Start with `.example-question` box
- [ ] Each step is `.accordion-step` with header + content
- [ ] Final step labeled as "✓ Answer"
- [ ] Math in `step-math`, explanations in `step-explanation`
- [ ] Test dark mode compatibility
- [ ] Verify print layout
- [ ] Check mobile responsiveness

## Examples in Production

See any lesson in [year13/3.6/](year13/3.6/) for live examples:
- [lesson1.html](year13/3.6/lesson1.html) - Simple power rule applications
- [lesson6.html](year13/3.6/lesson6.html) - Complex stationary points
- [lesson10.html](year13/3.6/lesson10.html) - Advanced multi-step problems

## Support

For questions or issues with accordion implementation:
1. Check [FEATURES-GUIDE.md](FEATURES-GUIDE.md) for complete feature documentation
2. Review [SCROLL-REVEAL-GUIDE.md](SCROLL-REVEAL-GUIDE.md) for alternative display methods
3. Examine existing implementations in year13/3.6/ lessons

---

**Last Updated**: March 11, 2026  
**Status**: Production Standard ✅  
**Coverage**: Year 13, Standard 3.6 (100% implemented)
