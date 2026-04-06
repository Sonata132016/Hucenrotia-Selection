// ============================================
// APP STATE — Shared between pages
// ============================================
const App = {
  XP_PER_CORRECT: 10,
  XP_PER_IMAGE_CORRECT: 15,

  getState() {
    return JSON.parse(localStorage.getItem('hucenrotia_state') || '{}');
  },

  setState(updates) {
    const s = this.getState();
    Object.assign(s, updates);
    localStorage.setItem('hucenrotia_state', JSON.stringify(s));
  },

  getCourseProgress(course) {
    const s = this.getState();
    return (s.progress && s.progress[course]) || { completed: false, bestScore: 0, attempts: 0 };
  },

  setCourseProgress(course, data) {
    const s = this.getState();
    if (!s.progress) s.progress = {};
    s.progress[course] = { ...(s.progress[course] || {}), ...data };
    localStorage.setItem('hucenrotia_state', JSON.stringify(s));
  },

  getTotalXP() {
    return this.getState().totalXP || 0;
  },

  addXP(amount) {
    const s = this.getState();
    s.totalXP = (s.totalXP || 0) + amount;
    localStorage.setItem('hucenrotia_state', JSON.stringify(s));
    return s.totalXP;
  },

  startQuiz(course) {
    this.setState({ currentCourse: course, quizStartTime: Date.now() });
    window.location.href = 'quiz.html';
  },

  formatXP(xp) {
    return xp >= 1000 ? (xp / 1000).toFixed(1) + 'k' : xp;
  }
};

// Update all XP displays on page
function updateXPDisplays() {
  document.querySelectorAll('.xp-display').forEach(el => {
    el.textContent = '⚡ ' + App.formatXP(App.getTotalXP()) + ' XP';
  });
}

// Confetti effect for results page
function launchConfetti(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#58CC02','#FFD900','#1CB0F6','#FF9600','#CE82FF','#FF4B4B'];

  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 12 + 6,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.2,
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 4 + 2,
      alpha: 1
    });
  }

  let frame;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.rotV;
      if (p.y > canvas.height) p.alpha -= 0.05;
      ctx.save();
      ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (pieces.some(p => p.alpha > 0)) frame = requestAnimationFrame(draw);
  }
  draw();
  setTimeout(() => { cancelAnimationFrame(frame); ctx.clearRect(0,0,canvas.width,canvas.height); }, 5000);
}
