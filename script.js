// ===== Typing effect for love letter =====
const loveLetterElement = document.getElementById("loveLetter");

// You can tweak this message if you want:
const loveLetterText = `
This is my little Christmas surprise for you.
A place with some of our memories and a reminder of how much I love you. ❤️
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

// ===== Scroll to playlist from hero button =====
const goToPlaylistBtn = document.getElementById("goToPlaylist");
if (goToPlaylistBtn) {
  goToPlaylistBtn.addEventListener("click", () => {
    const playlistSection = document.getElementById("playlist");
    if (playlistSection) {
      playlistSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

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

// ===== Lightbox for timeline photos =====
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

// All images with class "photo-thumb" will open in the lightbox
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
// Replace these with your own questions / answers if you want
const quizQuestions = [
  {
    question: "Where did we go on our first date?",
    options: [
      "Firestone Grill",
      "Haha Sushi in SLO",
      "Thai restaurant downtown",
      "Some random coffee shop"
    ],
    correctIndex: 1
  },
  {
    question: "Where did I officially ask you to be my girlfriend?",
    options: [
      "In my car",
      "At the beach",
      "In my bed at Cooper",
      "At a restaurant"
    ],
    correctIndex: 2
  },
  {
    question: "Where was our first big trip together?",
    options: [
      "Barcelona",
      "Sayulita, Mexico",
      "Lake Tahoe",
      "Sea Ranch"
    ],
    correctIndex: 1
  },
  {
    question: "Which town did we go to for Christmas lights?",
    options: [
      "Cambria",
      "Paso Robles",
      "San Diego",
      "Santa Cruz"
    ],
    correctIndex: 0
  }
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

const whoAnswers = {
  "sleep-in": {
    me: "I think I win the 'sleeping in the latest' award 😴",
    you: "Okay, maybe you sleep in more... but you look extra cute doing it."
  },
  "steal-fries": {
    me: "I absolutely steal your fries. No regrets 🍟",
    you: "You definitely steal mine, and I secretly love it."
  },
  "plan-dates": {
    me: "I like to think I'm behind some of our surprise plans 😉",
    you: "You! Your date ideas are always my favorite ones."
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

      const answerKey = btn.getAttribute("data-answer");
      const answerText =
        whoAnswers[questionId] && whoAnswers[questionId][answerKey]
          ? whoAnswers[questionId][answerKey]
          : "";
      resultP.textContent = answerText;
    });
  });
});

// ===== Relationship Map (Leaflet) =====
if (typeof L !== "undefined") {
  const mapElement = document.getElementById("map");
  if (mapElement) {
    const map = L.map("map").setView([36.5, -120.5], 5); // Rough center of CA

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    // Approximate coordinates + a representative photo for each place
    const places = [
      {
        name: "San Luis Obispo, CA",
        coords: [35.2828, -120.6596],
        memories: [
          "First met you",
          "First date at Haha Sushi – Sept 19, 2023",
          "First Halloween together",
          "St. Fratty's",
          "Shabang (2024 & 2025)",
          "Many, many more memories"
        ],
        image: "images/first_shabang.jpeg"
      },
      {
        name: "Los Osos, CA",
        coords: [35.311, -120.832],
        memories: [
          "First time meeting your family and carving pumpkins",
          "Lots of dinners from your mom and hanging out with Isla"
        ],
        image: "images/first_fam.jpeg"
      },
      {
        name: "Cambria, CA",
        coords: [35.5641, -121.0807],
        memories: [
          "Cambria Christmas lights date",
          "Valentine's dinner at Robin's"
        ],
        image: "images/lights.jpeg"
      },
      {
        name: "Marin, CA",
        coords: [38.0, -122.7],
        memories: [
          "Your first time in Marin & SF",
          "Marin County Fair & July 4th",
          "New Year's with my hometown friends"
        ],
        image: "images/marin_fair.jpeg"
      },
    {
        name: "Sea Ranch, CA",
        coords: [38.68093, -123.42967],
        memories: [
          "Sea Ranch cabin trips & birthdays",
        ],
        image: "images/sea_ranch.jpeg"
      },
      {
        name: "San Francisco, CA",
        coords: [37.7749, -122.4194],
        memories: [
          "Light installations & big SF dates",
          "Crawloween for your 21st",
          "Just walking the city together"
        ],
        image: "images/sf_1.jpeg"
      },
      {
        name: "Paso Robles, CA",
        coords: [35.626, -120.691],
        memories: [
          "First big goodbye before summer",
          "Paso fair & seeing you at your fair"
        ],
        image: "images/paso_fair.jpeg"
      },
      {
        name: "Santa Barbara / Isla Vista, CA",
        coords: [34.4133, -119.859],
        memories: [
          "Moving you into UCSB",
          "Deltopia, date party",
          "Our 2-year anniversary",
          "Exploring SB together"
        ],
        image: "images/date_party.jpeg"
      },
      {
        name: "Lake Tahoe, CA",
        coords: [38.9404, -119.977],
        memories: [
          "Trips with both of our families",
          "Skiing and jumping in the lake!"
        ],
        image: "images/tahoe_fams.jpeg"
      },
      {
        name: "Monterey & Santa Cruz, CA",
        coords: [36.6, -121.9],
        memories: [
          "Our Monterey & Santa Cruz trip",
          "First Taco Bell Cantina on the beach"
        ],
        image: "images/monterey.jpeg"
      },
      {
        name: "Sayulita, Mexico",
        coords: [20.8688, -105.4419],
        memories: [
          "Our first big trip together",
        ],
        image: "images/mexico_1.jpeg"
      },
      {
        name: "Barcelona, Spain",
        coords: [41.3851, 2.1734],
        memories: [
          "Exploring Barcelona together",
          "Part of our big Europe trip"
        ],
        image: "images/spain_1.jpeg"
      },
      {
        name: "London & England",
        coords: [51.5074, -0.1278],
        memories: [
          "London bars!",
          "Visiting your family across England"
        ],
        image: "images/england_1.jpeg"
      },
      {
        name: "Los Angeles, CA",
        coords: [34.0522, -118.2437],
        memories: [
          "Your 20th birthday trip",
          "Kaytranada concert",
          "Tame Impala show"
        ],
        image: "images/LA.jpeg"
      },
      {
        name: "San Diego, CA",
        coords: [32.7157, -117.1611],
        memories: [
          "San Diego trip you gifted me",
          "Reigniting the spark"
        ],
        image: "images/san_diego.jpeg"
      }
    ];

    places.forEach((place) => {
      const imgHtml = place.image
        ? `<br><img src="${place.image}" style="width:100%;max-width:200px;margin-top:4px;border-radius:8px;">`
        : "";
      const popupHtml = `
        <strong>${place.name}</strong><br>
        ${place.memories.join("<br>")}
        ${imgHtml}
      `;
      L.marker(place.coords).addTo(map).bindPopup(popupHtml);
    });
  }
}