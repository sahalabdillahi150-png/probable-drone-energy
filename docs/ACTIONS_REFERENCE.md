# Interactive Actions Reference – DEMI VR PCB

Complete reference guide for all interactive features and how they work.

---

## 📋 Table of Contents

1. [Contact Form](#contact-form)
2. [VR Scene Interactions](#vr-scene-interactions)
3. [Quiz System](#quiz-system)
4. [Charts & Dashboard](#charts--dashboard)
5. [Navigation & Scroll](#navigation--scroll)

---

## 📧 Contact Form

### Location
Section: "Contact" (bottom of page)

### Functionality
- User fills name, email, organization, message
- Form validates required fields
- On submit:
  - Shows "Message envoyé" (Message sent)
  - Button is disabled briefly
  - Form resets after 1.8 seconds

### Code
```javascript
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.textContent = "Message envoyé";
    submitButton.disabled = true;
    setTimeout(() => {
      submitButton.textContent = "Envoyer";
      submitButton.disabled = false;
      contactForm.reset();
    }, 1800);
  });
}
```

### Customize
```javascript
// Change success message
submitButton.textContent = "✓ Message reçu!";

// Change delay (in milliseconds)
setTimeout(() => { ... }, 3000); // 3 seconds instead of 1.8

// Add email validation
const email = contactForm.querySelector('input[type="email"]').value;
if (!email.includes("@")) { alert("Email invalid"); return; }
```

---

## 🎮 VR Scene Interactions

### 1. Interactive Cube

**Location**: Demo VR section

**Current Behavior**:
- Cube rotates continuously
- Clicking the cube changes LED color

**HTML**:
```html
<a-box
  id="interactiveCube"
  position="0 1 -3"
  color="#00A86B"
  animation="property: rotation; to: 0 360 0; loop: true; dur: 4000"
></a-box>
```

**JavaScript**:
```javascript
const cube = document.getElementById("interactiveCube");
if (cube) {
  cube.addEventListener("click", () => {
    const led = document.getElementById("ledVirtual");
    led.setAttribute("color", "#ff8c00");
    led.setAttribute("radius", "0.26");
  });
}
```

**Customize**:
```javascript
// Change rotation speed
animation="dur: 2000"  // Faster (2 seconds)

// Change rotation direction
animation="to: 0 -360 0"  // Rotate opposite way

// Change cube color
color="#FF0000"  // Red

// Change click action
cube.addEventListener("click", () => {
  console.log("Cube was clicked!");
  // Add your custom action
});
```

---

### 2. Virtual LED

**Location**: Demo VR section (left side of cube)

**Current Behavior**:
- Orange sphere (LED)
- Changes color/size when cube is clicked
- Can be activated by interaction

**HTML**:
```html
<a-entity position="-1.5 0.8 -3.2">
  <a-sphere radius="0.2" color="#FF8C00" id="ledVirtual"></a-sphere>
</a-entity>
```

**Customize**:
```javascript
// Make LED glow
led.setAttribute("material", "emissive: #FF8C00; emissiveIntensity: 1");

// Add animation
led.setAttribute("animation", "property: scale; to: 1.5 1.5 1.5; loop: true; dur: 500");

// Change color on activation
led.setAttribute("color", "#00FF00");  // Green
led.setAttribute("color", "#0057B8");  // Blue

// Increase brightness
led.setAttribute("radius", "0.5");  // Larger LED
```

---

### 3. Information Panel

**Location**: Demo VR section (right side)

**Current Display**:
- Blue panel with white text
- Shows: "Panneau d'information"
- Shows: "LED active • Niveau 2"

**HTML**:
```html
<a-entity position="2 1.2 -3.2">
  <a-box width="2" height="1.2" depth="0.1" color="#0057B8" opacity="0.8"></a-box>
  <a-text value="Panneau d'information\nLED active • Niveau 2" ...></a-text>
</a-entity>
```

**Customize**:
```html
<!-- Update panel text -->
<a-text value="CUSTOM TEXT\nLine 2"></a-text>

<!-- Change panel color -->
<a-box color="#FF8C00"></a-box>  <!-- Orange -->

<!-- Add interactivity to panel -->
<a-box id="infoPanel" ...></a-box>
```

```javascript
// Make panel interactive
const panel = document.getElementById("infoPanel");
panel.addEventListener("click", () => {
  console.log("Panel clicked!");
});
```

---

### 4. Enter VR Button

**Location**: Demo VR section

**Current Behavior**:
- Button triggers VR full-screen mode
- Works on Meta Quest Browser
- On desktop, switches to fullscreen view

**HTML**:
```html
<button class="btn btn-primary" id="enter-vr-btn">Entrer en VR</button>
```

**JavaScript**:
```javascript
const enterBtn = document.getElementById("enter-vr-btn");
if (enterBtn) {
  enterBtn.addEventListener("click", () => {
    const scene = document.getElementById("vr-scene");
    if (scene && typeof scene.enterVR === "function") {
      scene.enterVR();
    }
  });
}
```

**Customize**:
```javascript
// Change button text
enterBtn.textContent = "🥽 Démarrer l'expérience VR";

// Add loading indicator
enterBtn.addEventListener("click", () => {
  enterBtn.textContent = "Chargement...";
  // Then enable VR
});

// Add analytics tracking
enterBtn.addEventListener("click", () => {
  console.log("User entered VR at:", new Date());
  // Send to analytics service
});
```

---

## 🎯 Quiz System

### Location
Section: "Quiz VR"

### Current Behavior

**Question**: "Quelle couleur est la LED ?"

**Answers**: 
- Rouge (Red) – Incorrect
- Bleu (Blue) – Correct ✓
- Vert (Green) – Incorrect

**Scoring**:
- Displays: "Score : X / 3"
- 3 total questions
- Immediate feedback on each answer

### HTML
```html
<div class="quiz-card">
  <div class="quiz-header">
    <h3>Question 1 / 3</h3>
    <p>Quelle couleur est la LED ?</p>
  </div>
  <div class="quiz-options">
    <button class="quiz-choice" data-answer="false">Rouge</button>
    <button class="quiz-choice correct" data-answer="true">Bleu</button>
    <button class="quiz-choice" data-answer="false">Vert</button>
  </div>
  <div class="quiz-result">
    <span>Score : </span>
    <strong id="score-display">0 / 3</strong>
  </div>
</div>
```

### JavaScript Logic

```javascript
let score = 0;
let questionIndex = 0;

// On answer click
isCorrect ? score += 1 : score += 0;

// Display feedback
scoreDisplay.textContent = `${score} / 3`;

// Move to next question after 1 second
if (questionIndex < 3) {
  // Show next question
} else {
  // Show final score
  quizHeader.innerHTML = "<h3>Quiz terminé</h3>";
}
```

### Customize Quiz

**Change questions**:
```javascript
const questions = [
  {
    text: "Quelle est la tension d'une LED rouge?",
    answers: [
      { text: "1.8V", correct: true },
      { text: "3.3V", correct: false },
      { text: "5V", correct: false }
    ]
  },
  // Add more questions...
];
```

**Change scoring**:
```javascript
if (isCorrect) {
  score += 2;  // 2 points per question instead of 1
}
```

**Add quiz categories**:
```javascript
const quizzes = {
  electronics: [/* Electronics questions */],
  programming: [/* Programming questions */],
  vr: [/* VR questions */]
};
```

**Add difficulty levels**:
```javascript
const difficulty = {
  easy: { points: 1, time: 10 },
  medium: { points: 2, time: 7 },
  hard: { points: 3, time: 5 }
};
```

---

## 📊 Charts & Dashboard

### Location
Section: "Tableau de bord"

### 1. Line Chart (Progression)

**Current Data**:
- Shows 6 months of progress
- Data: [20, 35, 44, 58, 72, 86]
- Blue line with light blue fill

**JavaScript**:
```javascript
new Chart(document.getElementById("lineChart"), {
  type: "line",
  data: {
    labels: ["Jan", "Fév", "Mars", "Avr", "Mai", "Juin"],
    datasets: [{
      label: "Progression",
      data: [20, 35, 44, 58, 72, 86],
      borderColor: "#0057B8",
      backgroundColor: "rgba(0, 87, 184, 0.12)",
      tension: 0.35,
      fill: true,
    }]
  },
  options: { responsive: true, maintainAspectRatio: false }
});
```

**Customize**:
```javascript
// Update data
data: [10, 20, 30, 40, 50, 60],

// Add more months
labels: ["Jan", "Fév", "Mars", "Avr", "Mai", "Juin", "Juil"],
data: [20, 35, 44, 58, 72, 86, 95],

// Change line color
borderColor: "#00A86B",  // Green

// Make line thicker
borderWidth: 3,

// Change animation speed
animation: { duration: 2000 }
```

### 2. Bar Chart (Participation)

**Current Data**:
- 6 levels (L1-L6)
- Data: [12, 18, 22, 30, 26, 35]
- Color-coded bars

**Customize**:
```javascript
// Update data
data: [5, 10, 15, 20, 25, 30],

// Add more categories
labels: ["L1", "L2", "L3", "L4", "L5", "L6", "L7"],

// Change bar colors
backgroundColor: ["#0057B8", "#00A86B", "#FF8C00", "#0057B8", "#00A86B", "#FF8C00", "#FF0000"],

// Make bars 3D effect
backgroundColor: "rgba(0, 87, 184, 0.8)"
```

### 3. Doughnut Chart (Certifications)

**Current Data**:
- Certifiés: 45
- En cours: 35
- Non démarré: 20

**Customize**:
```javascript
// Update percentages
data: [50, 30, 20],

// Change colors
backgroundColor: ["#00A86B", "#FF8C00", "#0057B8"],

// Make doughnut thicker/thinner
cutout: "70%",  // Thinner ring
cutout: "30%",  // Thicker ring

// Add labels on segments
plugins: {
  legend: { position: "bottom" }
}
```

---

## 🔗 Navigation & Scroll

### Sticky Header
```javascript
// Header stays at top when scrolling
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
}
```

### Smooth Scrolling
```javascript
// When you click a link, page smoothly scrolls to section
html { scroll-behavior: smooth; }

// Click: <a href="#approche">Approche</a>
// Jumps to: <section id="approche">
```

### Customize Navigation
```html
<!-- Add new nav link -->
<a href="#new-section">New Section</a>

<!-- Create matching section -->
<section id="new-section">
  <!-- Content -->
</section>
```

---

## 🔧 Debugging Interactive Features

### Check Browser Console
```javascript
// Open: F12 or Cmd+Option+I
// Tab: Console

// Common errors:
// "Cannot read property 'addEventListener' of null"
// → Element ID doesn't match

// "material is not a function"
// → A-Frame not loaded

// "TypeError: score is not defined"
// → Variable declared in wrong scope
```

### Test Interactivity
```javascript
// In console, manually trigger actions
document.getElementById("enter-vr-btn").click();
document.getElementById("interactiveCube").click();
document.getElementById("contactForm").submit();
```

### Add Logging
```javascript
// Add to app.js for debugging
console.log("Quiz started");
console.log("Score:", score);
console.log("VR scene loaded:", typeof scene);
```

---

## 📱 Mobile/VR Specific

### Meta Quest Gaze Interaction
```html
<!-- VR users gaze at object, then click controller -->
<a-box id="gazeable" geometry="primitive: box" material="color: #0057B8"></a-box>
```

### Touch Interaction (Mobile)
```javascript
// Works on touch devices
document.addEventListener("touchstart", (e) => {
  console.log("Touch detected");
});
```

### Responsive to Screen Size
```javascript
// Adapt UI based on device
if (window.innerWidth < 768) {
  // Mobile layout
} else {
  // Desktop layout
}
```

---

## 🎯 Summary Table

| Feature | Location | Code File | How to Customize |
|---------|----------|-----------|------------------|
| Contact Form | Bottom | app.js | Change success message |
| VR Cube | Demo VR | index.html + app.js | Change color, rotation |
| LED Virtual | Demo VR | index.html + app.js | Change size, glow |
| Info Panel | Demo VR | index.html | Change text, color |
| Enter VR Button | Demo VR | app.js | Change text, add tracking |
| Quiz | Section 6 | app.js | Add questions, change scoring |
| Line Chart | Dashboard | app.js | Update data, colors |
| Bar Chart | Dashboard | app.js | Change categories |
| Doughnut Chart | Dashboard | app.js | Update percentages |
| Navigation | Header | index.html | Add links |

---

**Need help?** Check [VR_DEVELOPER_GUIDE.md](./VR_DEVELOPER_GUIDE.md) for more details.

**Last Updated**: 2026-10-07
