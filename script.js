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

    // ===== 20 Things I Love About You (Simple Flip Card) =====

    const loveCards = [
    {
        title: "1. Who you are",
        text: "I love how funny and outgoing you are, it is the first thing that caught my eye when I met you."
    },
    {
        title: "2. How kind you are",
        text: "You are the sweetest person I have ever met, more caring than anyone. I love how you always think of others."
    },
    {
        title: "3. How smart you are",
        text: "You are so smart and ambitious. I have no doubts you are going to do amazing things"
    },
    {
        title: "4. How you show up for me",
        text: "I love how you always support me, through school, work, and stress. You always make me feel that I am not alone."
    },
    {
        title: "5. How you love your family",
        text: "I love the way you care for your family and how they love you back. I cannot wait to start a family with you."
    },
    {
        title: "6. How safe you make me feel",
        text: "I love how comfortable I am with you. You make me feel safe to tell you anything and I feel you truly understand me."
    },
    {
        title: "7. Little everyday things",
        text: "I love doing the little things with you. Like lying in bed together cuddligns or going to get groceries together. I can't wait to live together!"
    },
    {
        title: "8. How excited you get",
        text: "I love how excited you get for surprise and little things. Always makes me so excited."
    },
    {
        title: "9. How you love me",
        text: "I love how you make me feel loved and chosen every day. You make me feel so special."
    },
    {
        title: "10. Our future",
        text: "I love that when I think of my future, it includes you in it."
    },
    {
        title: "11. You push me to be better",
        text: "I love how you push me to be more outgoing and social and just be the best version of myself."
    },
    {
        title: "12. How cute you are",
        text: "You are the cutest little girl in the world and I love taking care of you."
    },
    {
        title: "13. The way you look at me",
        text: "I love the way you look at me no matter where we are."
    },
    {
        title: "14. The things that annoy me",
        text: "I love everything about you, even when I yell at you for picking, because all of it makes you who you are."
    },
    {
        title: "15. Your honesty",
        text: "I love that you tell me everything, and that I always know I can trust you."
    },
    {
        title: "16. How thoughtful you are",
        text: "I love that you notice all the little things."
    },
    {
        title: "17. How beautiful you are",
        text: "You are the most gorgeous girl in the world, inside and out."
    },
    {
        title: "18. How easy you are to talk to",
        text: "I love nothing more than our late night talks together."
    },
    {
        title: "19. Your cuddles",
        text: "I love how safe I feel in your arms"
    },
    {
        title: "20. Your kisses",
        text: "I love nothing more in life than kissing you Alyssa."
    }
    ];

    const loveCardEl = document.getElementById("loveCard");
    const loveCardTitleEl = document.getElementById("loveCardTitle");
    const loveCardHintEl = document.getElementById("loveCardHint");
    const loveCardBodyEl = document.getElementById("loveCardBody");
    const loveCardCounterEl = document.getElementById("loveCardCounter");
    const prevLoveCardBtn = document.getElementById("prevLoveCard");
    const nextLoveCardBtn = document.getElementById("nextLoveCard");

    let currentLoveIndex = 0;
    let showingBack = false;

    function renderLoveCard() {
    if (!loveCardTitleEl || !loveCardHintEl || !loveCardBodyEl) return;

    const item = loveCards[currentLoveIndex];
    loveCardTitleEl.textContent = item.title;
    loveCardHintEl.textContent = "Click to flip 💌";
    loveCardBodyEl.textContent = item.text;

    // start each card on the front
    showingBack = false;
    loveCardHintEl.classList.remove("hidden");
    loveCardBodyEl.classList.add("hidden");
    loveCardEl.classList.remove("is-flipped");

    if (loveCardCounterEl) {
        loveCardCounterEl.textContent = `${currentLoveIndex + 1} / ${loveCards.length}`;
    }

    if (prevLoveCardBtn) prevLoveCardBtn.disabled = currentLoveIndex === 0;
    if (nextLoveCardBtn) nextLoveCardBtn.disabled = currentLoveIndex === loveCards.length - 1;
    }

    // click card to flip front/back
    if (loveCardEl) {
    loveCardEl.addEventListener("click", () => {
        showingBack = !showingBack;
        if (showingBack) {
        loveCardHintEl.classList.add("hidden");
        loveCardBodyEl.classList.remove("hidden");
        loveCardEl.classList.add("is-flipped");
        } else {
        loveCardHintEl.classList.remove("hidden");
        loveCardBodyEl.classList.add("hidden");
        loveCardEl.classList.remove("is-flipped");
        }
    });
    }

    // prev/next buttons
    if (prevLoveCardBtn) {
    prevLoveCardBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // don't trigger flip
        if (currentLoveIndex > 0) {
        currentLoveIndex--;
        renderLoveCard();
        }
    });
    }

    if (nextLoveCardBtn) {
    nextLoveCardBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // don't trigger flip
        if (currentLoveIndex < loveCards.length - 1) {
        currentLoveIndex++;
        renderLoveCard();
        }
    });
    }

    // initial render
    renderLoveCard();

// ===== Time-Locked Messages ("Open in the Future") =====

// Edit these dates and messages however you want.
// Format for unlockDate: "YYYY-MM-DD"
const timeMessages = [
  {
    title: "For us on our 3rd anniversary",
    unlockDate: "2026-10-07",
    message: "Happy 3 years my love ❤️. If you're reading this we have officially made it to 3 years! I hope we better be living together. \
    No matter where it is we are living I am sure I am the happiest person alive to be with you. I'm so proud of you and how much you have grown. \
    Thank you for being my person and my best friend. I love you so much Alyssa. No matter what happens in life I will always choose you."
  },
  {
    title: "For a random rainy day",
    unlockDate: "2026-02-15",
    message: "Hi baby, I just wanted to write you a little note for a rainy day. \
    I hope you are having a cozy day inside with me with lots of cuddles (hopefully we aren't too busy). \
    Text me a little note when you've read this, I love you so much ❤️. I hope you know you will always be my sunshine. \
    I'm glad we can still find happiness in rainy days together. \
    I LOVE YOUUUUUU!!!!"
  },
  {
    title: "For us in 5 years",
    unlockDate: "2030-01-01",
    message: "I hope you remembered to open this letter! If you did, that means we have made it to 7 years together! \
    I hope we are living our best lives together, wherever that may be. I hope we have made many memories since I wrote this letter. \
    I hope that we have continued to grow together and love each other more every day. \
    No matter what happens in life I will always choose you. I love you so much Alyssa. I have no clue where we will be in 5 years. Maybe we've moved cities, maybe we have new friends, maybe new jobs. I know you will make me the proudest husband in the world (and soon to be father??). Forever and always, Dillon"
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
        "No peeking early.";
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
