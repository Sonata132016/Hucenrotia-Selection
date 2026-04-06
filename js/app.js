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

  startQuiz(course, userName, userEmail) {
    this.setState({ 
      currentCourse: course, 
      quizStartTime: Date.now(),
      currentUser: { name: userName, email: userEmail }
    });
    window.location.href = 'quiz.html';
  },

  hasTakenQuiz(email, course) {
    const s = this.getState();
    if (!s.leaderboards || !s.leaderboards[course]) return false;
    return s.leaderboards[course].some(u => u.email.toLowerCase() === email.toLowerCase());
  },

  saveUserResult(course, resultData) {
    const s = this.getState();
    const user = s.currentUser;
    if (!user) return;
    
    if (!s.leaderboards) s.leaderboards = {};
    if (!s.leaderboards[course]) s.leaderboards[course] = [];
    
    const existing = s.leaderboards[course].find(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (!existing) {
      s.leaderboards[course].push({
        name: user.name,
        email: user.email,
        score: resultData.correct,
        total: resultData.total,
        xp: resultData.xp,
        date: new Date().toISOString()
      });
      localStorage.setItem('hucenrotia_state', JSON.stringify(s));
    }
  },

  getLeaderboard(course) {
    const s = this.getState();
    if (!s.leaderboards || !s.leaderboards[course]) return [];
    return s.leaderboards[course].sort((a, b) => b.score - a.score || b.xp - a.xp);
  },

  getGlobalLeaderboard() {
    const s = this.getState();
    const map = {};
    if (s.leaderboards) {
      Object.keys(s.leaderboards).forEach(course => {
        s.leaderboards[course].forEach(u => {
          const email = u.email.toLowerCase();
          if (!map[email]) map[email] = { name: u.name, email: u.email, score: 0, total: 0, xp: 0, courses: 0 };
          map[email].score += u.score;
          map[email].total += u.total;
          map[email].xp += u.xp;
          map[email].courses += 1;
        });
      });
    }
    return Object.values(map).sort((a, b) => b.score - a.score || b.xp - a.xp);
  },

  formatXP(xp) {
    return xp >= 1000 ? (xp / 1000).toFixed(1) + 'k' : xp;
  },

  clearAllData() {
    if (confirm("Are you sure you want to completely reset all candidate attempts and leaderboard history? This cannot be undone.")) {
      localStorage.removeItem('hucenrotia_state');
      window.location.reload();
    }
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
