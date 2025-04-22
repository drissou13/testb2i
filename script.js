const questions = [
  {
    question: "Quel est un mot de passe sécurisé ?",
    answers: [
      { text: "123456", correct: false },
      { text: "bonjour", correct: false },
      { text: "P@ssw0rd2024!", correct: true }
    ]
  },
  {
    question: "Que dois-tu faire si tu reçois un mail suspect ?",
    answers: [
      { text: "L'ouvrir tout de suite", correct: false },
      { text: "Le supprimer ou demander à l’expéditeur", correct: true },
      { text: "Le transférer à tes amis", correct: false }
    ]
  },
  {
    question: "Quel outil permet de protéger ton ordinateur ?",
    answers: [
      { text: "Un antivirus", correct: true },
      { text: "Un lecteur PDF", correct: false },
      { text: "Un casque audio", correct: false }
    ]
  },
  {
    question: "Quelle information ne dois-tu pas partager en ligne ?",
    answers: [
      { text: "Ton film préféré", correct: false },
      { text: "Ton adresse personnelle", correct: true },
      { text: "Ton plat préféré", correct: false }
    ]
  },
  {
    question: "Un fichier .jpg est :",
    answers: [
      { text: "Un fichier image", correct: true },
      { text: "Un document texte", correct: false },
      { text: "Un fichier audio", correct: false }
    ]
  },
  {
    question: "Comment éviter de pirater ton compte ?",
    answers: [
      { text: "Donner ton mot de passe à un ami", correct: false },
      { text: "Utiliser un mot de passe fort", correct: true },
      { text: "Utiliser toujours le même mot de passe", correct: false }
    ]
  },
  {
    question: "À quoi sert la barre d’adresse d’un navigateur ?",
    answers: [
      { text: "Chercher un site dans un moteur de recherche", correct: false },
      { text: "Saisir directement une adresse web", correct: true },
      { text: "Afficher des vidéos", correct: false }
    ]
  },
  {
    question: "Un moteur de recherche sert à :",
    answers: [
      { text: "Envoyer des e-mails", correct: false },
      { text: "Trouver des sites web", correct: true },
      { text: "Imprimer une page", correct: false }
    ]
  },
  {
    question: "Que signifie 'https' ?",
    answers: [
      { text: "Site non sécurisé", correct: false },
      { text: "HyperText Transfer Protocol Secure", correct: true },
      { text: "Historique temporaire partagé", correct: false }
    ]
  },
  {
    question: "Une pièce jointe peut contenir :",
    answers: [
      { text: "Une vidéo", correct: true },
      { text: "Uniquement du texte", correct: false },
      { text: "Uniquement des photos", correct: false }
    ]
  },
  {
    question: "Citer un exemple de danger sur Internet.",
    answers: [
      { text: "Le piratage", correct: true },
      { text: "Les devoirs", correct: false },
      { text: "Regarder un film", correct: false }
    ]
  },
  {
    question: "Ton nom complet doit-il apparaître sur les forums publics ?",
    answers: [
      { text: "Oui, c’est obligatoire", correct: false },
      { text: "Non, il vaut mieux un pseudo", correct: true },
      { text: "Seulement si tu veux", correct: false }
    ]
  },
  {
    question: "Qu’est-ce qu’un navigateur ?",
    answers: [
      { text: "Un logiciel pour surfer sur le web", correct: true },
      { text: "Un moteur de recherche", correct: false },
      { text: "Un antivirus", correct: false }
    ]
  },
  {
    question: "Peux-tu copier une image d’un site pour ton blog ?",
    answers: [
      { text: "Oui, sans problème", correct: false },
      { text: "Seulement avec l’autorisation", correct: true },
      { text: "Si elle est jolie", correct: false }
    ]
  },
  {
    question: "Tu as été victime de cyberharcèlement, que fais-tu ?",
    answers: [
      { text: "Je garde ça pour moi", correct: false },
      { text: "J’en parle à un adulte", correct: true },
      { text: "Je réponds avec des insultes", correct: false }
    ]
  }
];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let userName = "";

const welcomeBox = document.getElementById("welcome-box");
const quizBox = document.getElementById("quiz-box");
const scoreBox = document.getElementById("score-box");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const feedbackEl = document.getElementById("feedback");
const timerEl = document.getElementById("timer");
const questionNumberEl = document.getElementById("question-number");
const finalScoreEl = document.getElementById("final-score");
const nameResultEl = document.getElementById("name-result");
const diplomaNameEl = document.getElementById("diploma-name");

function startQuiz() {
  const input = document.getElementById("username");
  if (input.value.trim() === "") {
    alert("Entre ton prénom !");
    return;
  }
  userName = input.value.trim();
  welcomeBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  showQuestion();
}

function startTimer() {
  timeLeft = 30;
  timerEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      feedbackEl.textContent = "⏰ Temps écoulé !";
      nextBtn.disabled = false;
      disableAnswers();
    }
  }, 1000);
}

function showQuestion() {
  clearInterval(timer);
  feedbackEl.textContent = "";
  nextBtn.disabled = true;
  startTimer();

  const question = questions[currentIndex];
  questionEl.textContent = question.question;
  questionNumberEl.textContent = currentIndex + 1;
  answersEl.innerHTML = "";

  question.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.onclick = () => selectAnswer(answer.correct, btn);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(correct, btn) {
  clearInterval(timer);
  disableAnswers();

  if (correct) {
    feedbackEl.textContent = "✅ Bonne réponse !";
    score++;
  } else {
    feedbackEl.textContent = "❌ Mauvaise réponse";
  }
  nextBtn.disabled = false;
}

function disableAnswers() {
  const buttons = answersEl.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  quizBox.classList.add("hidden");
  scoreBox.classList.remove("hidden");
  finalScoreEl.textContent = score;
  nameResultEl.textContent = userName;
  diplomaNameEl.textContent = userName;
}

function restart() {
  currentIndex = 0;
  score = 0;
  scoreBox.classList.add("hidden");
  welcomeBox.classList.remove("hidden");
}