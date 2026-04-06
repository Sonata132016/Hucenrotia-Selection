# Hucenrotia Selection — TEEP Internship Quiz Website

An interactive, Duolingo-inspired quiz website for the **TEEP (Taiwan Experience Education Program) Internship** selection process.

## 📚 Content Coverage

This website includes **50 quiz questions** from two landmark AI robotics research papers:

| Course | Paper | Conference | Questions |
|--------|-------|------------|-----------|
| **HIMLoco** | Hybrid Internal Model: Learning Agile Legged Locomotion with Simulated Robot Response | ICLR 2024 | 25 (incl. 5 image Q&A) |
| **NaVILA** | NaVILA: Legged Robot Vision-Language-Action Model for Navigation | RSS 2025 | 25 (incl. 5 image Q&A) |

## 🎮 Features

- 🟢 **Duolingo-style UI** with dark theme, green XP system, and animated feedback
- ❤️ **3 Lives system** — lose a heart for each wrong answer
- ⚡ **XP rewards** — earn 10 XP per correct answer, 15 XP for image questions
- 📊 **Progress tracking** via localStorage (persists between sessions)
- 🎉 **Confetti celebration** for scores ≥ 70%
- 🖼️ **Image-based questions** using actual figures from the papers
- 📱 **Fully responsive** — works on mobile and desktop

## 🗂️ File Structure

```
/
├── index.html          ← Home / Course selection page
├── quiz.html           ← Quiz engine (shared for both topics)
├── results.html        ← End-of-quiz results & XP screen
├── css/
│   └── style.css       ← Full design system
├── js/
│   ├── app.js          ← State management & XP system
│   ├── quiz.js         ← Quiz engine logic
│   └── questions.js    ← All 50 questions (HIMLoco + NaVILA)
├── assets/
│   ├── himloco/        ← Paper figures for HIMLoco questions
│   │   ├── overview.jpeg
│   │   ├── imc.jpeg
│   │   ├── teaser.jpeg
│   │   └── demo.jpeg
│   └── navila/         ← Paper figures for NaVILA questions
│       ├── method.png
│       └── logo.png
└── README.md
```

## 🚀 Running Locally

Simply open `index.html` in any modern web browser — no build step required!

```bash
# Or use a local server (recommended for proper image loading):
npx serve .
# Then visit http://localhost:3000
```

## 🌐 GitHub Pages Deployment

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Select source: **Deploy from branch → main → / (root)**
4. Your site will be live at: `https://sonata132016.github.io/Hucenrotia-Selection/`

## 📖 Paper References

- **HIMLoco**: Long, J. et al. (2024). *Hybrid Internal Model: Learning Agile Legged Locomotion with Simulated Robot Response*. ICLR 2024. [arXiv:2312.11460](https://arxiv.org/abs/2312.11460)
- **NaVILA**: Cheng, A. et al. (2025). *NaVILA: Legged Robot Vision-Language-Action Model for Navigation*. RSS 2025. [arXiv:2412.04453](https://arxiv.org/abs/2412.04453)

## 🏫 About

Built for the **Hucenrotia Selection** — TEEP (Taiwan Experience Education Program) Internship 2025.
