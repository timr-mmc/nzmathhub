/* ===================================
   Interactive Components JavaScript
   Drag-and-drop, quizzes, graphing
   =================================== */

// ============================================
// 1. DRAG AND DROP MATCHING
// ============================================

class DragDropMatching {
    constructor(containerId, items, onComplete) {
        this.container = document.getElementById(containerId);
        this.items = items; // [{id: 1, term: "x²", match: "Quadratic"}]
        this.onComplete = onComplete;
        this.matched = [];
        this.init();
    }

    init() {
        const html = `
            <div class="drag-drop-container">
                <div class="terms-column">
                    <h4>Terms</h4>
                    ${this.items.map(item => `
                        <div class="draggable-item" draggable="true" data-id="${item.id}">
                            ${item.term}
                        </div>
                    `).join('')}
                </div>
                <div class="matches-column">
                    <h4>Matches</h4>
                    ${this.items.map(item => `
                        <div class="drop-zone" data-match="${item.match}">
                            <span class="match-label">${item.match}</span>
                            <div class="drop-area"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="drag-drop-feedback"></div>
        `;
        
        this.container.innerHTML = html;
        this.attachEventListeners();
    }

    attachEventListeners() {
        const draggables = this.container.querySelectorAll('.draggable-item');
        const dropZones = this.container.querySelectorAll('.drop-area');

        draggables.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.id);
                e.target.classList.add('dragging');
            });

            item.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });

        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                const itemId = e.dataTransfer.getData('text/plain');
                const item = this.items.find(i => i.id == itemId);
                const matchLabel = zone.parentElement.dataset.match;

                if (item.match === matchLabel) {
                    const draggedItem = this.container.querySelector(`[data-id="${itemId}"]`);
                    zone.appendChild(draggedItem);
                    draggedItem.classList.add('matched');
                    draggedItem.draggable = false;
                    this.matched.push(itemId);
                    
                    if (this.matched.length === this.items.length) {
                        this.showSuccess();
                    }
                } else {
                    this.showError();
                }
            });
        });
    }

    showSuccess() {
        const feedback = this.container.querySelector('.drag-drop-feedback');
        feedback.innerHTML = '<div class="success-message">✓ Perfect! All matched correctly!</div>';
        feedback.style.display = 'block';
        if (this.onComplete) this.onComplete();
    }

    showError() {
        const feedback = this.container.querySelector('.drag-drop-feedback');
        feedback.innerHTML = '<div class="error-message">Try again - that doesn\'t match!</div>';
        feedback.style.display = 'block';
        setTimeout(() => feedback.style.display = 'none', 2000);
    }
}

// ============================================
// 2. MULTIPLE CHOICE QUIZ
// ============================================

class MultipleChoiceQuiz {
    constructor(containerId, questions) {
        this.container = document.getElementById(containerId);
        this.questions = questions; // [{question: "", options: [], correct: 0, explanation: ""}]
        this.currentQuestion = 0;
        this.score = 0;
        this.answered = false;
        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const q = this.questions[this.currentQuestion];
        const html = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <span class="quiz-progress">Question ${this.currentQuestion + 1} of ${this.questions.length}</span>
                    <span class="quiz-score">Score: ${this.score}/${this.currentQuestion}</span>
                </div>
                
                <div class="quiz-question">
                    <h4>${q.question}</h4>
                </div>
                
                <div class="quiz-options">
                    ${q.options.map((opt, i) => `
                        <button class="quiz-option" data-index="${i}" ${this.answered ? 'disabled' : ''}>
                            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                            <span class="option-text">${opt}</span>
                        </button>
                    `).join('')}
                </div>
                
                <div class="quiz-feedback" style="display: none;"></div>
                
                <div class="quiz-controls">
                    ${this.currentQuestion < this.questions.length - 1 ? 
                        '<button class="quiz-next" style="display: none;">Next Question →</button>' : 
                        '<button class="quiz-finish" style="display: none;">Finish Quiz</button>'}
                </div>
            </div>
        `;
        
        this.container.innerHTML = html;
        this.attachQuizListeners();
    }

    attachQuizListeners() {
        const options = this.container.querySelectorAll('.quiz-option');
        
        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                if (this.answered) return;
                
                const selectedIndex = parseInt(e.currentTarget.dataset.index);
                this.checkAnswer(selectedIndex, e.currentTarget);
            });
        });

        const nextBtn = this.container.querySelector('.quiz-next');
        const finishBtn = this.container.querySelector('.quiz-finish');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentQuestion++;
                this.answered = false;
                this.render();
            });
        }
        
        if (finishBtn) {
            finishBtn.addEventListener('click', () => {
                this.showResults();
            });
        }
    }

    checkAnswer(selectedIndex, button) {
        this.answered = true;
        const q = this.questions[this.currentQuestion];
        const feedback = this.container.querySelector('.quiz-feedback');
        const options = this.container.querySelectorAll('.quiz-option');
        
        options.forEach((opt, i) => {
            opt.disabled = true;
            if (i === q.correct) {
                opt.classList.add('correct');
            }
        });

        if (selectedIndex === q.correct) {
            this.score++;
            button.classList.add('selected-correct');
            feedback.innerHTML = `<div class="correct-feedback">✓ Correct! ${q.explanation}</div>`;
        } else {
            button.classList.add('selected-incorrect');
            feedback.innerHTML = `<div class="incorrect-feedback">✗ Not quite. ${q.explanation}</div>`;
        }
        
        feedback.style.display = 'block';
        
        const nextBtn = this.container.querySelector('.quiz-next, .quiz-finish');
        if (nextBtn) nextBtn.style.display = 'block';
        
        // Update score display
        this.container.querySelector('.quiz-score').textContent = 
            `Score: ${this.score}/${this.currentQuestion + 1}`;
    }

    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        let message = '';
        
        if (percentage === 100) message = '🎉 Perfect! You got every question right!';
        else if (percentage >= 80) message = '👍 Excellent work! Well done!';
        else if (percentage >= 60) message = '✓ Good effort! Review the missed questions.';
        else message = '📚 Keep practicing! Review the lessons and try again.';
        
        const html = `
            <div class="quiz-results">
                <h3>Quiz Complete!</h3>
                <div class="result-score">
                    <div class="score-circle">
                        <span class="score-number">${percentage}%</span>
                    </div>
                    <p>You scored ${this.score} out of ${this.questions.length}</p>
                </div>
                <p class="result-message">${message}</p>
                <button class="quiz-retry" onclick="location.reload()">Try Again</button>
            </div>
        `;
        
        this.container.innerHTML = html;
    }
}

// ============================================
// 3. SIMPLE GRAPHING TOOL
// ============================================

class SimpleGrapher {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = options.width || 600;
        this.height = options.height || 400;
        this.xMin = options.xMin || -10;
        this.xMax = options.xMax || 10;
        this.yMin = options.yMin || -10;
        this.yMax = options.yMax || 10;
        
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        this.init();
    }

    init() {
        this.drawGrid();
        this.drawAxes();
    }

    screenX(x) {
        return ((x - this.xMin) / (this.xMax - this.xMin)) * this.width;
    }

    screenY(y) {
        return this.height - ((y - this.yMin) / (this.yMax - this.yMin)) * this.height;
    }

    drawGrid() {
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.lineWidth = 0.5;

        // Vertical lines
        for (let x = Math.ceil(this.xMin); x <= this.xMax; x++) {
            const screenXVal = this.screenX(x);
            this.ctx.beginPath();
            this.ctx.moveTo(screenXVal, 0);
            this.ctx.lineTo(screenXVal, this.height);
            this.ctx.stroke();
        }

        // Horizontal lines
        for (let y = Math.ceil(this.yMin); y <= this.yMax; y++) {
            const screenYVal = this.screenY(y);
            this.ctx.beginPath();
            this.ctx.moveTo(0, screenYVal);
            this.ctx.lineTo(this.width, screenYVal);
            this.ctx.stroke();
        }
    }

    drawAxes() {
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;

        // X-axis
        const yAxisScreen = this.screenY(0);
        this.ctx.beginPath();
        this.ctx.moveTo(0, yAxisScreen);
        this.ctx.lineTo(this.width, yAxisScreen);
        this.ctx.stroke();

        // Y-axis
        const xAxisScreen = this.screenX(0);
        this.ctx.beginPath();
        this.ctx.moveTo(xAxisScreen, 0);
        this.ctx.lineTo(xAxisScreen, this.height);
        this.ctx.stroke();
    }

    plotFunction(func, color = '#0066cc') {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();

        let started = false;
        for (let screenX = 0; screenX <= this.width; screenX++) {
            const x = this.xMin + (screenX / this.width) * (this.xMax - this.xMin);
            const y = func(x);
            
            if (isFinite(y) && y >= this.yMin && y <= this.yMax) {
                const screenYVal = this.screenY(y);
                if (!started) {
                    this.ctx.moveTo(screenX, screenYVal);
                    started = true;
                } else {
                    this.ctx.lineTo(screenX, screenYVal);
                }
            } else {
                started = false;
            }
        }
        
        this.ctx.stroke();
    }

    plotPoints(points, color = '#cc0000') {
        this.ctx.fillStyle = color;
        points.forEach(([x, y]) => {
            const screenXVal = this.screenX(x);
            const screenYVal = this.screenY(y);
            this.ctx.beginPath();
            this.ctx.arc(screenXVal, screenYVal, 4, 0, 2 * Math.PI);
            this.ctx.fill();
        });
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.init();
    }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Don't trigger if user is typing in input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                navigateToPrevious();
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateToNext();
                break;
            case ' ':
                e.preventDefault();
                toggleFirstAnswer();
                break;
            case 'd':
            case 'D':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    toggleDarkMode();
                }
                break;
        }
    });
}

function navigateToPrevious() {
    const prevBtn = document.querySelector('.nav-btn-secondary, .navigation-buttons a:first-child');
    if (prevBtn) prevBtn.click();
}

function navigateToNext() {
    const nextBtn = document.querySelector('.nav-btn-primary, .navigation-buttons a:last-child');
    if (nextBtn) nextBtn.click();
}

function toggleFirstAnswer() {
    const firstBtn = document.querySelector('.show-answer-btn');
    if (firstBtn) firstBtn.click();
}

// Initialize shortcuts on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKeyboardShortcuts);
} else {
    initKeyboardShortcuts();
}
