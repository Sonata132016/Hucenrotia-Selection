// ============================================
// QUIZ ENGINE
// ============================================
(function() {
  'use strict';

  // --- State ---
  let questions = [];
  let currentIndex = 0;
  let sessionXP = 0;
  let correctCount = 0;
  let selectedAnswer = null;
  let answered = false;
  let course = '';
  let filledWord = null;

  // --- DOM refs ---
  const progressFill   = document.getElementById('progressFill');
  const questionLabel  = document.getElementById('questionLabel');
  const questionText   = document.getElementById('questionText');
  const imageWrap      = document.getElementById('imageWrap');
  const questionImg    = document.getElementById('questionImg');
  const imgCaption     = document.getElementById('imgCaption');
  const optionsArea    = document.getElementById('optionsArea');
  const btnCheck       = document.getElementById('btnCheck');
  const feedbackBar    = document.getElementById('feedbackBar');
  const feedbackTitle  = document.getElementById('feedbackTitle');
  const feedbackExplain= document.getElementById('feedbackExplain');
  const btnContinue    = document.getElementById('btnContinue');
  const scoreCounterEl = document.getElementById('scoreCounter');
  const xpCounterEl    = document.getElementById('xpCounter');
  const xpPopup        = document.getElementById('xpPopup');
  const modal          = document.getElementById('modal');
  const modalOverlay   = document.getElementById('modalOverlay');

  // --- Init ---
  function init() {
    const state = App.getState();
    course = state.currentCourse || 'himloco';
    const pool = QUESTIONS[course] || [];
    // Shuffle and take all 25 questions
    questions = shuffle([...pool]);

    updateXPDisplay();
    updateScoreDisplay();
    loadQuestion();

    document.getElementById('btnClose').addEventListener('click', () => {
      modalOverlay.classList.add('open');
    });
    document.getElementById('modalCancel').addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });
    document.getElementById('modalQuit').addEventListener('click', () => {
      window.location.href = 'index.html';
    });
    btnCheck.addEventListener('click', handleCheckOrContinue);
    btnContinue.addEventListener('click', handleCheckOrContinue);
  }

  // --- Shuffle util ---
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // --- Progress bar ---
  function updateProgress() {
    const pct = (currentIndex / questions.length) * 100;
    progressFill.style.width = pct + '%';
  }

  function updateScoreDisplay() {
    if(scoreCounterEl) scoreCounterEl.innerHTML = '💯 ' + correctCount;
  }

  // --- XP ---
  function updateXPDisplay() {
    xpCounterEl.innerHTML = '⚡ ' + sessionXP + ' XP';
  }

  function showXPGain(amount) {
    xpPopup.textContent = '+' + amount + ' XP!';
    xpPopup.classList.add('show');
    xpPopup.classList.remove('hide');
    setTimeout(() => {
      xpPopup.classList.add('hide');
      xpPopup.classList.remove('show');
    }, 1200);
  }

  // --- Load Question ---
  function loadQuestion() {
    if (currentIndex >= questions.length) {
      finishQuiz();
      return;
    }

    answered = false;
    selectedAnswer = null;
    filledWord = null;
    btnCheck.className = 'btn-check idle';
    btnCheck.textContent = 'CHECK';
    feedbackBar.className = 'feedback-bar';

    const q = questions[currentIndex];
    updateProgress();

    questionLabel.innerHTML = `<span class="qc-dot"></span> Question ${currentIndex + 1} of ${questions.length}`;
    questionText.textContent = q.question;

    // Image
    if (q.image) {
      imageWrap.style.display = 'block';
      questionImg.src = q.image;
      questionImg.alt = q.caption || 'Research paper figure';
      imgCaption.textContent = q.caption || '';
    } else {
      imageWrap.style.display = 'none';
    }

    // Render by type
    optionsArea.innerHTML = '';
    if (q.type === 'mcq' || q.type === 'image') renderMCQ(q);
    else if (q.type === 'truefalse') renderTF(q);
    else if (q.type === 'fillblank') renderFillBlank(q);

    // Animate in
    optionsArea.style.opacity = '0';
    optionsArea.style.transform = 'translateY(16px)';
    requestAnimationFrame(() => {
      optionsArea.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      optionsArea.style.opacity = '1';
      optionsArea.style.transform = 'translateY(0)';
    });
  }

  // --- MCQ ---
  function renderMCQ(q) {
    const grid = document.createElement('div');
    grid.className = 'options-grid' + (q.options.some(o => o.length > 40) ? ' single-col' : '');
    const keys = ['A','B','C','D'];
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.id = 'opt_' + i;
      btn.innerHTML = `<span class="option-key">${keys[i]}</span><span class="option-text">${opt}</span>`;
      btn.addEventListener('click', () => selectMCQ(i, btn, grid, q));
      grid.appendChild(btn);
    });
    optionsArea.appendChild(grid);
  }

  function selectMCQ(idx, btn, grid, q) {
    if (answered) return;
    // Deselect all
    grid.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedAnswer = idx;
    btnCheck.className = 'btn-check ready';
    btnCheck.textContent = 'CHECK';
    btnCheck._type = 'mcq';
    btnCheck._q = q;
    btnCheck._grid = grid;
  }

  // --- True/False ---
  function renderTF(q) {
    const grid = document.createElement('div');
    grid.className = 'tf-grid';

    const trueBtn = document.createElement('button');
    trueBtn.className = 'tf-btn true-btn';
    trueBtn.innerHTML = '<span class="tf-icon">✅</span>TRUE';
    trueBtn.addEventListener('click', () => selectTF(true, trueBtn, falseBtn, q));

    const falseBtn = document.createElement('button');
    falseBtn.className = 'tf-btn false-btn';
    falseBtn.innerHTML = '<span class="tf-icon">❌</span>FALSE';
    falseBtn.addEventListener('click', () => selectTF(false, trueBtn, falseBtn, q));

    grid.appendChild(trueBtn);
    grid.appendChild(falseBtn);
    optionsArea.appendChild(grid);
  }

  function selectTF(val, trueBtn, falseBtn, q) {
    if (answered) return;
    trueBtn.classList.remove('selected');
    falseBtn.classList.remove('selected');
    if (val) trueBtn.classList.add('selected');
    else falseBtn.classList.add('selected');
    selectedAnswer = val;
    btnCheck.className = 'btn-check ready';
    btnCheck.textContent = 'CHECK';
    btnCheck._type = 'tf';
    btnCheck._q = q;
    btnCheck._trueBtn = trueBtn;
    btnCheck._falseBtn = falseBtn;
  }

  // --- Fill Blank ---
  function renderFillBlank(q) {
    const sentence = q.question;
    // Replace everything after the colon for display; show blank
    const parts = sentence.split('___');
    const sentEl = document.createElement('div');
    sentEl.className = 'fillblank-sentence';

    const blankSlot = document.createElement('span');
    blankSlot.className = 'blank-slot';
    blankSlot.id = 'blankSlot';
    blankSlot.textContent = '⬜ tap a word below';
    blankSlot.addEventListener('click', () => {
      if (answered) return;
      // Clear the slot
      if (filledWord) {
        blankSlot.textContent = '⬜ tap a word below';
        blankSlot.classList.remove('filled');
        // Re-enable chip
        const chip = optionsArea.querySelector(`[data-word="${filledWord}"]`);
        if (chip) chip.classList.remove('used');
        filledWord = null;
        btnCheck.className = 'btn-check idle';
      }
    });

    sentEl.appendChild(document.createTextNode(parts[0] || ''));
    sentEl.appendChild(blankSlot);
    if (parts[1]) sentEl.appendChild(document.createTextNode(parts[1]));
    optionsArea.appendChild(sentEl);

    // Word bank
    const bank = document.createElement('div');
    bank.className = 'word-bank';
    const shuffledWords = shuffle([...q.wordBank]);
    shuffledWords.forEach(word => {
      const chip = document.createElement('button');
      chip.className = 'word-chip';
      chip.textContent = word;
      chip.dataset.word = word;
      chip.addEventListener('click', () => {
        if (answered) return;
        if (chip.classList.contains('used')) return;
        // Deselect previous
        if (filledWord) {
          const prev = bank.querySelector(`[data-word="${filledWord}"]`);
          if (prev) prev.classList.remove('used');
        }
        chip.classList.add('used');
        filledWord = word;
        blankSlot.textContent = word;
        blankSlot.classList.add('filled');
        btnCheck.className = 'btn-check ready';
        btnCheck._type = 'fillblank';
        btnCheck._q = q;
        btnCheck._slot = blankSlot;
      });
      bank.appendChild(chip);
    });
    optionsArea.appendChild(bank);
  }

  // --- Check / Continue ---
  function handleCheckOrContinue() {
    if (!answered) {
      checkAnswer();
    } else {
      nextQuestion();
    }
  }

  function checkAnswer() {
    if (selectedAnswer === null && filledWord === null) return;
    const q = questions[currentIndex];
    let isCorrect = false;

    if (q.type === 'mcq' || q.type === 'image') {
      isCorrect = selectedAnswer === q.answer;
      const grid = optionsArea.querySelector('.options-grid');
      grid.querySelectorAll('.option-btn').forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.answer) btn.classList.add('correct');
        else if (i === selectedAnswer && !isCorrect) btn.classList.add('wrong');
      });
    } else if (q.type === 'truefalse') {
      isCorrect = selectedAnswer === q.answer;
      const trueBtn  = optionsArea.querySelector('.true-btn');
      const falseBtn = optionsArea.querySelector('.false-btn');
      trueBtn.disabled  = true;
      falseBtn.disabled = true;
      if (q.answer === true)  { trueBtn.classList.add('correct'); if (!isCorrect) falseBtn.classList.add('wrong'); }
      else                    { falseBtn.classList.add('correct'); if (!isCorrect) trueBtn.classList.add('wrong'); }
    } else if (q.type === 'fillblank') {
      isCorrect = filledWord && filledWord.toLowerCase() === q.answer.toLowerCase();
      const slot = document.getElementById('blankSlot');
      slot.classList.add(isCorrect ? 'correct' : 'wrong');
      optionsArea.querySelectorAll('.word-chip').forEach(c => c.disabled = true);
    }

    answered = true;

    if (isCorrect) {
      correctCount++;
      const xpGain = (q.type === 'image') ? App.XP_PER_IMAGE_CORRECT : App.XP_PER_CORRECT;
      sessionXP += xpGain;
      App.addXP(xpGain);
      updateXPDisplay();
      updateScoreDisplay();
      showXPGain(xpGain);
      showFeedback(true, q.explanation);
    } else {
      showFeedback(false, q.explanation);
    }
  }

  function showFeedback(correct, explanation) {
    feedbackBar.className = 'feedback-bar show ' + (correct ? 'correct-bar' : 'wrong-bar');
    feedbackTitle.textContent = correct ? '🎉 Correct!' : '😬 Not quite...';
    feedbackExplain.textContent = explanation;
    btnCheck.className = 'btn-check ' + (correct ? 'continue-correct' : 'continue-wrong');
    btnCheck.textContent = 'CONTINUE →';
  }

  function nextQuestion() {
    feedbackBar.className = 'feedback-bar';
    currentIndex++;
    loadQuestion();
  }

  async function finishQuiz() {
    await saveProgress(true);
    window.location.href = 'results.html';
  }

  async function saveProgress(completed) {
    const elapsed = Math.round((Date.now() - (App.getState().quizStartTime || Date.now())) / 1000);
    const resultObj = {
      course,
      correct: correctCount,
      total: questions.length,
      xp: sessionXP,
      elapsed,
      completed
    };
    
    App.setState({ lastResult: resultObj });
    
    if (completed) {
      await App.saveUserResult(course, resultObj);
      const prev = App.getCourseProgress(course);
      App.setCourseProgress(course, {
        completed: true,
        bestScore: Math.max(prev.bestScore || 0, Math.round((correctCount / questions.length) * 100)),
        attempts: (prev.attempts || 0) + 1
      });
    }
  }

  // Boot
  document.addEventListener('DOMContentLoaded', init);
})();
