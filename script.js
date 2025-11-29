// ===== Typing effect for love letter =====
const loveLetterElement = document.getElementById("loveLetter");

// Replace this with your own little love note:
const loveLetterText = `
This is my little Christmas surprise for you.
A place with some of our memories, a few silly games,
and a reminder of how much you mean to me. ❤️
`.trim();

let letterIndex = 0;
function typeLoveLetter() {
  if (!loveLetterElement) return;
  if (letterIndex <= loveLetterText.length) {
    loveLetterElement.textContent = loveLetterText.slice(0, letterIndex);
    letterIndex++;
    setTimeout(typeLoveLetter, 40);
  }
}
typeLoveLetter();

// ===== Smooth scroll from "Start Our Story" button =====
document.getElementById("startStoryButton").addEventListener("click", () => {
  const timelineSection = document.getElementById("timeline");
  timelineSection.scrollIntoView({ behavior: "smooth" });
});

// ===== Days together counter =====
// Relationship start date: October 7, 2023 (month index is 0-based, so 9 = October)
const relationshipStart = new Date(2023, 9, 7);
const today = new Date();
const diffTime = today - relationshipStart;
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
const daysSpan = document.getElementById("daysTogether");
if (daysSpan) {
  daysSpan.textContent = diffDays;
}

// ===== Background song controls =====
const ourSongEmbed = document.getElementById("ourSongEmbed");
const toggleSongBtn = document.getElementById("toggleSong");
let isSongVisible = false;

toggleSongBtn.addEventListener("click", () => {
  if (!ourSongEmbed) return;
  isSongVisible = !isSongVisible;
  if (isSongVisible) {
    ourSongEmbed.classList.remove("hidden");
    toggleSongBtn.textContent = "Hide our song ♫";
  } else {
    ourSongEmbed.classList.add("hidden");
    toggleSongBtn.textContent = "Play our song ♫";
  }
});

// ===== Lightbox for photo gallery =====
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".photo-thumb").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightbox.classList.remove("hidden");
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add("hidden");
  }
});

// ===== Trivia Quiz =====
// Fill in with your own questions + options + correctIndex
const quizQuestions = [
  {
    question: "Where did we go on our first date?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctIndex: 1
  },
  {
    question: "What is our go-to comfort food?",
    options: ["Pizza", "Sushi", "Tacos", "Pasta"],
    correctIndex: 0
  },
  {
    question: "Which show did we binge together first?",
    options: ["Show 1", "Show 2", "Show 3", "Show 4"],
    correctIndex: 2
  }
  // Add more questions if you like
];

const quizContainer = document.getElementById("quizContainer");

function renderQuiz() {
  quizQuestions.forEach((q, idx) => {
    const qDiv = document.createElement("div");
    qDiv.className = "quiz-question";

    const title = document.createElement("h3");
    title.textContent = `${idx + 1}. ${q.question}`;
    qDiv.appendChild(title);

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "quiz-options";

    q.options.forEach((opt, optIdx) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${idx}`;
      input.value = optIdx;

      label.appendChild(input);
      label.appendChild(document.createTextNode(" " + opt));
      optionsDiv.appendChild(label);
    });

    qDiv.appendChild(optionsDiv);
    quizContainer.appendChild(qDiv);
  });
}

renderQuiz();

document.getElementById("submitQuiz").addEventListener("click", () => {
  let score = 0;
  quizQuestions.forEach((q, idx) => {
    const selected = document.querySelector(
      `input[name="question-${idx}"]:checked`
    );
    if (selected && Number(selected.value) === q.correctIndex) {
      score += 1;
    }
  });

  const result = document.getElementById("quizResult");
  if (score === quizQuestions.length) {
    result.textContent = `You got ${score}/${quizQuestions.length}! Perfect score — you know us so well 🥹❤️`;
  } else {
    result.textContent = `You got ${score}/${quizQuestions.length} — still amazing, and now we have an excuse to relive more memories together 💕`;
  }
});

// ===== Who's More Likely =====
const whoCards = document.querySelectorAll(".who-card");

// Customize these answers to match your relationship
const whoAnswers = {
  "sleep-in": {
    me: "Honestly... I think I win the 'sleeping in' award 😴",
    you: "Okay, maybe you sleep in more... but you look very cute doing it."
  },
  "steal-fries": {
    me: "I 100% steal your fries. No regrets 🍟",
    you: "You definitely steal mine. I pretend to be mad but I love it."
  },
  "plan-dates": {
    me: "I like to think I'm the secret mastermind behind our dates 😉",
    you: "You! Your ideas are always my favorite ones."
  }
};

whoCards.forEach((card) => {
  const questionId = card.getAttribute("data-question-id");
  const buttons = card.querySelectorAll(".who-btn");
  const resultP = card.querySelector(".who-result");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const answerKey = btn.getAttribute("data-answer"); // "me" or "you"
      const answerText =
        whoAnswers[questionId] && whoAnswers[questionId][answerKey]
          ? whoAnswers[questionId][answerKey]
          : "";
      resultP.textContent = answerText;
    });
  });
});

// ===== Open When... messages =====
const openWhenMessages = {
  sad: `Hey love 💙

If you're feeling sad right now, I wish I could give you a hug through the screen.
I hope you remember how strong you are and how much I believe in you.
I'm always on your team, no matter what.

Take a deep breath, put on a song you love, and remember that I love you so much.`,
  "cant-sleep": `Can't sleep again? 🌙

If I were there, I'd probably be stealing your blanket and talking too much.
Since I'm not, just know I'm thinking of you and wishing you the coziest night's rest.

Close your eyes, think about one favorite memory we share, and fall asleep smiling.`,
  "miss-me": `Missing me? I'm definitely missing you too 🤍

Even when we're not in the same place, you're in my thoughts all the time.
Look around you — there's probably something nearby that reminds you of us.

I can't wait for our next hug, our next adventure, and our next quiet moment together.`
};

const openCards = document.querySelectorAll(".open-card");
const openWhenBox = document.getElementById("openWhenMessage");
const openWhenText = document.getElementById("openWhenText");
const closeOpenWhen = document.getElementById("closeOpenWhen");

openCards.forEach((card) => {
  card.addEventListener("click", () => {
    const id = card.getAttribute("data-message-id");
    openWhenText.textContent = openWhenMessages[id] || "";
    openWhenBox.classList.remove("hidden");
    openWhenBox.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

closeOpenWhen.addEventListener("click", () => {
  openWhenBox.classList.add("hidden");
});
