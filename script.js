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
const startStoryButton = document.getElementById("startStoryButton");
if (startStoryButton) {
  startStoryButton.addEventListener("click", () => {
    const timelineSection = document.getElementById("timeline");
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

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
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = img.src;
    lightbox.classList.remove("hidden");
    document.body.classList.add("no-scroll"); // prevent background scroll
  });
});

if (lightboxClose && lightbox) {
  lightboxClose.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  });

  lightbox.addEventListener("click", (e) => {
    // click outside the image closes it
    if (e.target === lightbox) {
      lightbox.classList.add("hidden");
      document.body.classList.remove("no-scroll");
    }
  });
}

// ===== 20 Things I Love About You (Flip Card) =====

// First 3 from what you wrote, rest are placeholders for you to fill in.
const loveCards = [
  {
    title: "1. Who you are",
    text: "I love how funny and outgoing you are, it is the first thing that caught my eye when I met you."
  },
  {
    title: "2. How kind you are",
    text: "You are the sweetest person I have ever met, more caring than anyone."
  },
  {
    title: "3. How smart you are",
    text: "You are so smart and ambitious."
  },
  {
    title: "4.",
    text: "I'll fill this in with another thing I love about you."
  },
  {
    title: "5.",
    text: "I'll fill this in with another thing I love about you."
  },
  {
    title: "6.",
    text: "I'll fill this in with another thing I love about you."
  },
  {
    title: "7.",
    text: "I'll fill this in with another thing I love about you."
  },
  {
    title: "8.",
    text: "I'll fill this in with another thing I love about you."
  },
  {
    title: "9.",
    text: "I'll fill this in with another thing I love about you."
  },
  {
    title: "10.",
    text: "I'll fill this in with another thing I love about you."
  },
  {
    title: "11.",
    text: "I'll fill this in with another thing I love about you."
  },
  {
    title: "12.",
    text: "I'll fill this in with another thing I love about you."
  },
  {
    title: "13.",
    text: "I'll fill this in with another thing I love about you."
  },
  {
    title: "14.",
    text: "I'll fill this in with another thing I love about you."
  },
  {
    title: "15.",
    text: "I'll fill this in with another thing I love about you."
  },
  {
    title: "16.",
    text: "I'll fill this in with another thing I love about you."
  },
  {
    title: "17.",
    text: "I'll fill this in with another thing I love about you."
  },
  {
    title: "18.",
    text: "I'll fill this in with another thing I love about you."
  },
  {
    title: "19.",
    text: "I'll fill this in with another thing I love about you."
  },
  {
    title: "20.",
    text: "I'll fill this in with another thing I love about you."
  }
];

const loveCard = document.getElementById("loveCard");
const loveCardInner = loveCard ? loveCard.querySelector(".love-card-inner") : null;
const loveCardTitleFront = document.getElementById("loveCardTitleFront");
const loveCardTitleBack = document.getElementById("loveCardTitleBack");
const loveCardText = document.getElementById("loveCardText");
const loveCardCounter = document.getElementById("loveCardCounter");
const prevLoveCardBtn = document.getElementById("prevLoveCard");
const nextLoveCardBtn = document.getElementById("nextLoveCard");

let currentLoveIndex = 0;

function renderLoveCard() {
  if (!loveCardTitleFront || !loveCardTitleBack || !loveCardText) return;

  const card = loveCards[currentLoveIndex];
  loveCardTitleFront.textContent = card.title;
  loveCardTitleBack.textContent = card.title;
  loveCardText.textContent = card.text;

  if (loveCardCounter) {
    loveCardCounter.textContent = `${currentLoveIndex + 1} / ${loveCards.length}`;
  }

  // Reset flip state whenever we change cards
  if (loveCard) {
    loveCard.classList.remove("is-flipped");
  }

  if (prevLoveCardBtn) {
    prevLoveCardBtn.disabled = currentLoveIndex === 0;
  }
  if (nextLoveCardBtn) {
    nextLoveCardBtn.disabled = currentLoveIndex === loveCards.length - 1;
  }
}

// Flip on click (front/back)
if (loveCard && loveCardInner) {
  loveCard.addEventListener("click", () => {
    loveCard.classList.toggle("is-flipped");
  });
}

// Prev / Next controls
if (prevLoveCardBtn && nextLoveCardBtn) {
  prevLoveCardBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // don't flip the card on button click
    if (currentLoveIndex > 0) {
      currentLoveIndex--;
      renderLoveCard();
    }
  });

  nextLoveCardBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // don't flip the card on button click
    if (currentLoveIndex < loveCards.length - 1) {
      currentLoveIndex++;
      renderLoveCard();
    }
  });

  // Initial render
  renderLoveCard();
}

// ===== Time-Locked Messages ("Open in the Future") =====

// Edit these dates and messages however you want.
// Format for unlockDate: "YYYY-MM-DD"
const timeMessages = [
  {
    title: "For us on our 3rd anniversary",
    unlockDate: "2026-10-07",
    message: "I'll fill this in with a letter to us on our 3rd anniversary. ❤️"
  },
  {
    title: "For a random rainy day",
    unlockDate: "2026-02-15",
    message: "A little note for you to open on some rainy cozy day together."
  },
  {
    title: "For us in 5 years",
    unlockDate: "2030-01-01",
    message: "Future us, I hope we’re still being silly, traveling, and choosing each other every day."
  }
];

const timeCapsuleContainer = document.getElementById("timeCapsuleContainer");

function renderTimeCapsules() {
  if (!timeCapsuleContainer) return;

  const now = new Date();

  timeMessages.forEach((msg) => {
    const unlockDate = new Date(msg.unlockDate);
    const unlocked = now >= unlockDate;

    const card = document.createElement("div");
    card.className = "timecapsule-card";

    const titleEl = document.createElement("h3");
    titleEl.textContent = msg.title;
    card.appendChild(titleEl);

    const dateEl = document.createElement("p");
    dateEl.className = "timecapsule-date";
    dateEl.textContent = `Unlocks on ${unlockDate.toLocaleDateString()}`;
    card.appendChild(dateEl);

    const bodyEl = document.createElement("p");
    bodyEl.className = "timecapsule-body";

    if (unlocked) {
      bodyEl.textContent = msg.message;
    } else {
      bodyEl.textContent = "This one is locked for future us. Come back when it's time ✨";
    }
    card.appendChild(bodyEl);

    if (!unlocked) {
      const noteEl = document.createElement("p");
      noteEl.className = "timecapsule-locked-note";
      noteEl.textContent =
        "No peeking early (yes, I know you technically could change the date 😜).";
      card.appendChild(noteEl);
    }

    timeCapsuleContainer.appendChild(card);
  });
}

renderTimeCapsules();

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
          "Sea Ranch cabin trips & birthdays"
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
          "Our first big trip together"
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
