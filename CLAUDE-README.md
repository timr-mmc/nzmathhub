# NZ Math Hub - Claude Development Guide

## 📋 Overview
This document provides comprehensive instructions for building and maintaining the NZ Math Hub website. Follow these guidelines to ensure consistency, educational effectiveness, and optimal user experience.

---

## 🎨 Style & Layout Standards

### Color Scheme (High Contrast for Accessibility)
```css
--text-primary: #000000         /* Pure black - main text */
--text-secondary: #1a1a1a       /* Very dark gray - secondary text */
--primary-accent: #006666       /* Dark teal - links, highlights */
--secondary-accent: #0066cc     /* Dark blue - interactive elements */
--success-color: #006600        /* Dark green - positive feedback */
--warning-color: #cc5500        /* Dark orange - warnings */
--background-white: #ffffff     /* White background */
--background-light: #f7fafc     /* Light gray background */
--background-medium: #edf2f7    /* Medium gray background */
```

**Rationale**: WCAG AAA compliant (7:1+ contrast ratio) for maximum readability, especially for students with visual processing difficulties.

### Typography
- **Primary Font**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Heading Font**: 'Segoe UI', Arial, sans-serif
- **Line Height**: 1.6 for body text (improves readability)
- **Font Sizes**:
  - Body: 16px base
  - H2: 2rem
  - H3: 1.5rem
  - H4: 1.2rem

### Mathematical Notation
- **Library**: KaTeX 0.16.9 (NOT MathJax)
- **CDN**: jsDelivr with integrity checks
- **Delimiters**: `$...$` for inline, `$$...$$` for display
- **Implementation**:
```html
<head>
    <!-- KaTeX CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV" crossorigin="anonymous">
</head>
<body>
    <!-- Content -->
    
    <!-- KaTeX Scripts -->
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js" integrity="sha384-XjKyOOlGwcjNTAIQHIpgOno0Hl1YQqzUOEleOLALmuqehneUG+vnGctmUb0ZY0l8" crossorigin="anonymous"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" integrity="sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05" crossorigin="anonymous"
        onload="renderMathInElement(document.body, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}]});"></script>
</body>
```

**CRITICAL**: Never place HTML tags inside LaTeX delimiters:
- ❌ WRONG: `$x^<span>2</span>$`
- ✅ CORRECT: `$x^{2}$`

### Page Structure
Every lesson page must include:
1. **Page Header** - Title and subtitle
2. **Breadcrumb Navigation** - Home > Year > Section > Lesson
3. **Sticky Navigation Bar** - Quick links to sections
4. **Content Sections** - Main learning content
5. **Navigation Buttons** - Previous/Next lesson
6. **Footer** - Copyright and attribution

---

## 🇳🇿 New Zealand Curriculum Alignment

### Curriculum Levels
- **Year 9**: Level 4-5
- **Year 10**: Level 5
- **Year 11**: Level 6 (NCEA Level 1)
- **Year 12**: Level 7 (NCEA Level 2)
- **Year 13**: Level 8 (NCEA Level 3)

### Content Organization
Structure content by Achievement Objectives (AO):
- **Number**: Operations, ratios, fractions
- **Algebra**: Patterns, equations, graphs
- **Geometry**: Shapes, transformations, trigonometry
- **Measurement**: Area, volume, units
- **Statistics**: Data collection, probability, inference

### Learning Progressions
- Build from concrete to abstract
- Connect to real-world NZ contexts (rugby scores, kiwifruit exports, etc.)
- Support multiple solution strategies
- Include NCEA-style assessment practice

---

## 🧠 Cognitive Load Reduction Strategies

### Worked Examples First
**Pattern**: Show → Explain → Practice
```html
<div class="worked-example">
    <h3>Example 1: [Clear Title]</h3>
    <p><strong>Problem:</strong> [Question]</p>
    
    <div class="step">
        <span class="step-number">1</span>
        <strong>First step:</strong> [Explanation]
    </div>
    <!-- More steps -->
</div>
```

### Minimal Change Problems
Present practice problems that change **one variable at a time**:
```html
<div class="practice-section">
    <h3>Set 1: Same form, different powers</h3>
    <p><em>Notice: Only the <span class="highlight-change">power</span> changes</em></p>
    
    <div class="problem">
        <div class="problem-label">a) Differentiate: $x^3$</div>
        <!-- Answer reveal -->
    </div>
    
    <div class="problem">
        <div class="problem-label">b) Differentiate: $x^{4}$</div>
        <!-- Answer reveal -->
    </div>
</div>
```

### Progressive Complexity
Order content from:
1. **Basic** - Single concept, no complications
2. **Intermediate** - Two concepts combined
3. **Advanced** - Multiple concepts, real-world application
4. **Mastery** - Open-ended problems

### Spacing & White Space
- **Margins**: Minimum 20px between sections
- **Padding**: 20-25px inside content boxes
- **Max Width**: 1200px for main content (optimal reading width)

### Visual Hierarchy
- Use consistent heading levels (H2 → H3 → H4)
- Box similar content types (examples, tips, warnings)
- Color-code by function:
  - Blue boxes: Information/concept introduction
  - Green boxes: Tips and helpful hints
  - Orange boxes: Warnings and common mistakes
  - Light gray: Practice problems

---

## 📱 Fixed-Height Slides (When Appropriate)

### When to Use Slides
- **Concept Introduction**: Show definition/rule without distraction
- **Step-by-Step Walkthrough**: One step per slide
- **Comparisons**: Side-by-side concepts
- **Quick Reference**: Formula sheets, key points

### Slide Implementation
```html
<div class="slideshow-container">
    <div class="slideshow-header">
        <h3>Concept Name</h3>
        <div class="slide-counter">Slide <span id="current-slide">1</span> of <span id="total-slides">5</span></div>
    </div>
    
    <div class="slide-content">
        <div class="slide active" style="min-height: 400px;">
            <!-- Fixed height content -->
            <h4>Slide Title</h4>
            <p>Content that fits without scrolling</p>
        </div>
        
        <div class="slide" style="min-height: 400px;">
            <!-- Next slide -->
        </div>
    </div>
    
    <div class="slide-controls">
        <button class="slide-btn" onclick="changeSlide(-1)">← Previous</button>
        <button class="slide-btn" onclick="changeSlide(1)">Next →</button>
    </div>
</div>
```

### Slide Best Practices
- **Height**: 400-600px (fits on most screens without scrolling)
- **Content**: 3-5 key points maximum per slide
- **Text**: Large, readable font (18px+)
- **Progression**: Clear "Previous/Next" buttons
- **Indicator**: Show current slide number (e.g., "3 of 7")

### When NOT to Use Slides
- Long explanations requiring scrolling
- Extended worked examples (use scrollable sections)
- Practice problem sets
- Full lesson content (use scrollable page format)

---

## 🎯 Interactive Elements

### Show/Hide Answer Pattern
```html
<div class="problem">
    <div class="problem-label">Question text with $math$</div>
    <button class="show-answer-btn" onclick="toggleAnswer(this)">Show Answer</button>
    <div class="answer-reveal" style="display: none;">
        Answer with explanation and $math$
    </div>
</div>

<script>
function toggleAnswer(button) {
    const answerDiv = button.nextElementSibling;
    if (answerDiv.style.display === 'none' || answerDiv.style.display === '') {
        answerDiv.style.display = 'block';
        button.textContent = 'Hide Answer';
        button.style.background = '#000';
        if (typeof renderMathInElement !== 'undefined') {
            renderMathInElement(answerDiv, {
                delimiters: [{left: '$$', right: '$$', display: true}, 
                            {left: '$', right: '$', display: false}]
            });
        }
    } else {
        answerDiv.style.display = 'none';
        button.textContent = 'Show Answer';
        button.style.background = '';
    }
}
</script>
```

### Progress Indicators
Show students where they are in the learning sequence:
```html
<div class="navigation-buttons">
    <a href="lesson1.html" class="nav-btn nav-btn-secondary">← Previous: Topic Name</a>
    <a href="lesson3.html" class="nav-btn nav-btn-primary">Next: Topic Name →</a>
</div>
```

---

## 📚 Content Types & Templates

### 1. Lesson Pages
**Structure**:
- Learning objectives (3-5 bullet points)
- Concept introduction (definition, explanation)
- Worked examples (2-4 examples)
- Practice problems (grouped by difficulty)
- Key points summary
- Navigation to next/previous

### 2. Investigation Pages
**Structure**:
- Hook/scenario
- Guiding questions
- Data/materials
- Step-by-step exploration
- Reflection questions
- Extension activities

### 3. Practice Pages
**Structure**:
- Quick reference guide
- Problem sets by topic
- Mixed review problems
- Immediate feedback on answers
- Links to relevant lessons

### 4. Index/Overview Pages
**Structure**:
- Course overview
- Visual lesson grid
- Progress indicators (optional)
- Clear descriptions of each lesson
- Learning pathway guidance

---

## ♿ Accessibility Requirements

### WCAG AAA Compliance
- **Contrast**: Minimum 7:1 for normal text, 4.5:1 for large text
- **Font Size**: Minimum 16px base, no text smaller than 14px
- **Link Text**: Descriptive (not "click here")
- **Alt Text**: All images require meaningful descriptions
- **Keyboard Navigation**: All interactive elements must be keyboard accessible

### Mobile Responsiveness
- **Breakpoints**: 768px (tablet), 480px (mobile)
- **Touch Targets**: Minimum 44x44px for buttons
- **Grid Layout**: Use `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
- **Images**: Responsive with `max-width: 100%`

### Screen Reader Friendly
- Use semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`)
- Add ARIA labels where needed
- Ensure logical heading hierarchy
- Provide skip-to-content links

---

## 🚀 Performance Optimization

### Loading Speed
- **KaTeX**: Use defer attribute on scripts
- **Images**: Compress and use appropriate formats (WebP preferred)
- **CSS**: Inline critical CSS, defer non-critical
- **JavaScript**: Load scripts at end of body or use defer/async

### Caching Strategy
- Static assets should be cacheable
- Use CDNs for libraries (jsDelivr for KaTeX)
- Include integrity checks for security

---

## 🔍 Quality Checklist

Before considering a page complete, verify:

### Content
- [ ] Aligned with NZ Curriculum achievement objectives
- [ ] Clear learning objectives stated
- [ ] Worked examples provided before practice
- [ ] Minimal change problems included
- [ ] Progressive difficulty (easy → hard)
- [ ] NZ-relevant contexts used

### Style & Accessibility
- [ ] High contrast colors used (black/dark gray text on white)
- [ ] KaTeX 0.16.9 implemented correctly
- [ ] No HTML tags inside `$...$` delimiters
- [ ] All interactive elements keyboard accessible
- [ ] Mobile responsive layout tested
- [ ] Consistent heading hierarchy

### User Experience
- [ ] Clear navigation (previous/next lesson)
- [ ] Breadcrumb trail present
- [ ] Show/hide answers work correctly
- [ ] Math renders on answer reveal
- [ ] Fixed-height slides don't overflow
- [ ] Loading time under 3 seconds

### Technical
- [ ] No console errors
- [ ] All links work
- [ ] Forms validate properly
- [ ] Scripts use defer attribute
- [ ] Integrity checks on CDN resources

---

## 💡 Additional Best Practices

### Error Prevention
- Provide immediate feedback on practice problems
- Show common mistakes with corrections
- Include "Why?" explanations for rules
- Offer multiple approaches to problems

### Student Engagement
- Use real-world NZ contexts (sports, nature, culture)
- Include interactive elements (clickable reveals, drag-drop)
- Vary activity types (reading, practice, investigation)
- Provide challenge extensions for advanced students

### Teacher Support
- Include answer keys (hidden by default)
- Suggest classroom activities
- Link to curriculum documents
- Provide printable worksheets

### Maintenance
- Keep dependencies updated (KaTeX version)
- Document any custom scripts
- Use consistent naming conventions
- Comment complex code sections

---

## 📝 File Organization Standards

### Directory Structure
```
year[X]/
  [section.subsection]/
    index.html              # Overview page
    lesson1.html            # Individual lessons
    lesson2.html
    investigation.html      # Optional investigation
    practice.html          # Optional practice page
```

### File Naming
- Lowercase with hyphens: `comparison-lesson1.html`
- Descriptive: `relationship-investigation.html`
- Consistent numbering: `lesson1.html`, `lesson2.html`

### Asset Organization
- Global CSS: `/styles.css`
- Images: `/images/` or `/year[X]/images/`
- Scripts: Inline or `/scripts/` for reusable functions

---

## 🎓 Pedagogical Principles

### Cognitive Load Theory
1. **Intrinsic Load**: Start with simplest form of concept
2. **Extraneous Load**: Remove decorative elements, focus on learning
3. **Germane Load**: Use schemas, patterns, worked examples

### Spaced Repetition
- Revisit concepts across multiple lessons
- Include review problems from previous topics
- Suggest spaced practice schedules

### Metacognition
- Include reflection questions
- "What did you learn?" prompts
- Self-assessment opportunities
- Strategy awareness (when to use which method)

### Active Learning
- Minimal passive reading
- Frequent practice opportunities
- Immediate feedback
- Think-pair-share prompts for classroom use

---

## 📞 Quick Reference Commands

When asked to create content:

1. **"Create a lesson on [topic]"**
   - Use lesson page structure
   - Include worked examples → practice progression
   - Add minimal change problems
   - Ensure NZ curriculum alignment

2. **"Add practice problems"**
   - Group by difficulty (Set 1, Set 2, Set 3)
   - Use minimal change approach
   - Include show/hide answer buttons
   - Ensure KaTeX renders in answers

3. **"Make it more accessible"**
   - Check contrast ratios
   - Increase font sizes if needed
   - Add descriptive link text
   - Verify keyboard navigation

4. **"Reduce cognitive load"**
   - Break into smaller chunks
   - Add more worked examples
   - Simplify language
   - Remove decorative elements

5. **"Update to match style"**
   - Apply high-contrast colors
   - Use KaTeX 0.16.9
   - Add consistent headers/footers
   - Match typography standards

---

## 🔗 External Resources

- **NZ Curriculum**: [nzcurriculum.tki.org.nz](https://nzcurriculum.tki.org.nz/)
- **NCEA Standards**: [nzqa.govt.nz](https://www.nzqa.govt.nz/)
- **KaTeX Documentation**: [katex.org](https://katex.org/)
- **WCAG Guidelines**: [w3.org/WAI/WCAG21/quickref/](https://www.w3.org/WAI/WCAG21/quickref/)
- **Cognitive Load Theory**: Sweller, J. (2011) - Core research

---

**Last Updated**: March 11, 2026
**Version**: 1.0
**Deployment**: Netlify + GitHub
