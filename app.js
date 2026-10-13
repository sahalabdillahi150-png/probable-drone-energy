document.addEventListener("DOMContentLoaded", () => {
  // Smooth contact form handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Message envoyé';
      submitButton.disabled = true;
      submitButton.style.opacity = '0.8';

      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        contactForm.reset();
      }, 1800);
    });
  }

  // VR scene interaction
  const cube = document.getElementById('interactiveCube');
  const led = document.getElementById('ledVirtual');
  const enterBtn = document.getElementById('enter-vr-btn');

  if (cube && led) {
    cube.addEventListener('click', () => {
      led.setAttribute('color', '#ff8c00');
      led.setAttribute('radius', '0.26');
    });
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      const scene = document.getElementById('vr-scene');
      if (scene) {
        scene.enterVR();
      }
    });
  }

  // Quiz logic
  const quizChoices = document.querySelectorAll('.quiz-choice');
  const scoreDisplay = document.getElementById('score-display');
  let score = 0;
  let questionIndex = 0;

  const quizStates = [
    { correct: 'Bleu', chosen: '' },
    { correct: 'Rouge', chosen: '' },
    { correct: 'Vert', chosen: '' }
  ];

  if (quizChoices.length) {
    quizChoices.forEach((button) => {
      button.addEventListener('click', () => {
        const isCorrect = button.dataset.answer === 'true';

        if (isCorrect) {
          score += 1;
          button.classList.add('correct');
        } else {
          button.classList.add('incorrect');
          const correctAnswer = document.querySelector('.quiz-choice.correct');
          if (correctAnswer) {
            correctAnswer.classList.add('correct');
          }
        }

        scoreDisplay.textContent = `${score} / 3`;

        quizChoices.forEach((choice) => {
          choice.disabled = true;
          choice.style.opacity = '0.8';
        });

        setTimeout(() => {
          questionIndex += 1;
          if (questionIndex < 3) {
            const nextQuestion = document.querySelector('.quiz-header p');
            if (nextQuestion) {
              nextQuestion.textContent = 'Question ' + (questionIndex + 1) + ' / 3 : Quelle couleur est la LED ?';
            }
            quizChoices.forEach((choice) => {
              choice.disabled = false;
              choice.classList.remove('correct', 'incorrect');
              choice.style.opacity = '1';
            });
          } else {
            const quizHeader = document.querySelector('.quiz-header');
            const quizOptions = document.querySelector('.quiz-options');
            if (quizHeader && quizOptions) {
              quizHeader.innerHTML = '<h3>Quiz terminé</h3><p>Merci pour votre participation !</p>';
              quizOptions.innerHTML = '<p style="color: #0057b8; font-weight: 700; margin: 0;">Final score : ' + score + ' / 3</p>';
            }
          }
        }, 1000);
      });
    });
  }

  // Chart.js dashboard
  const lineCtx = document.getElementById('lineChart');
  if (lineCtx) {
    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin'],
        datasets: [{
          label: 'Progression',
          data: [20, 35, 44, 58, 72, 86],
          borderColor: '#0057B8',
          backgroundColor: 'rgba(0, 87, 184, 0.12)',
          tension: 0.35,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: false }
        }
      }
    });
  }

  const barCtx = document.getElementById('barChart');
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'],
        datasets: [{
          label: 'Participation',
          data: [12, 18, 22, 30, 26, 35],
          backgroundColor: ['#0057B8', '#00A86B', '#FF8C00', '#0057B8', '#00A86B', '#FF8C00']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });
  }

  const doughnutCtx = document.getElementById('doughnutChart');
  if (doughnutCtx) {
    new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Certifiés', 'En cours', 'Non démarré'],
        datasets: [{
          data: [45, 35, 20],
          backgroundColor: ['#0057B8', '#00A86B', '#FF8C00']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%'
      }
    });
  }
});
