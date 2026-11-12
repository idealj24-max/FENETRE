
"use strict";

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-button, .create-button");

function showPage(pageId) {
  pages.forEach(page => {
    page.classList.toggle("active", page.id === pageId);
  });

  navButtons.forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === pageId
    );
  });

  window.scrollTo(0, 0);
}

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

// Système de likes
document.addEventListener("click", event => {
  const button = event.target.closest(".like-button");
  if (!button) return;

  const liked = button.classList.toggle("liked");
  const count = Number(button.dataset.count || 0);
  const newCount = Math.max(0, count + (liked ? 1 : -1));

  button.dataset.count = newCount;
  button.innerHTML = `${liked ? "♥" : "♡"}<small>${newCount}</small>`;
});

// Sélection d'une vidéo
const videoInput = document.getElementById("videoInput");
const videoPreview = document.getElementById("videoPreview");
const uploadMessage = document.getElementById("uploadMessage");

let selectedVideo = null;
let previewUrl = null;

videoInput.addEventListener("change", () => {
  const file = videoInput.files[0];

  if (!file) return;

  if (!file.type.startsWith("video/")) {
    uploadMessage.textContent = "Choisis un fichier vidéo valide.";
    return;
  }

  if (file.size > 100 * 1024 * 1024) {
    uploadMessage.textContent = "La vidéo dépasse la limite de 100 Mo.";
    return;
  }

  selectedVideo = file;

  if (previewUrl) URL.revokeObjectURL(previewUrl);

  previewUrl = URL.createObjectURL(file);
  videoPreview.src = previewUrl;
  videoPreview.hidden = false;

  uploadMessage.textContent =
    "Vidéo sélectionnée : " + file.name;
});

// Publication locale de démonstration
document.getElementById("publishButton")
  .addEventListener("click", () => {
    const caption = document.getElementById("videoCaption").value.trim();

    if (!selectedVideo) {
      uploadMessage.textContent =
        "Sélectionne d'abord une vidéo.";
      return;
    }

    uploadMessage.textContent =
      "Aperçu prêt. La publication publique nécessite le serveur FENÊTRE.";

    console.log("Vidéo sélectionnée :", selectedVideo.name);
    console.log("Légende :", caption);
  });

// Navigation LIVE
document.getElementById("startLiveButton")
  .addEventListener("click", () => {
    alert(
      "Le système de diffusion LIVE sera connecté dans une prochaine version."
    );
  });

// Onglets du fil
document.querySelectorAll(".feed-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".feed-tab").forEach(item => {
      item.classList.remove("active");
    });

    tab.classList.add("active");

    const type = tab.dataset.feed;

    if (type === "live") {
      showPage("livePage");
    } else if (type === "following") {
      alert("Le fil des abonnements sera connecté au serveur.");
    } else {
      showPage("feedPage");
    }
  });
});

// Recherche et messagerie
document.getElementById("searchButton")
  .addEventListener("click", () => {
    const query = prompt("Que souhaites-tu rechercher sur FENÊTRE ?");
    if (query && query.trim()) {
      alert("La recherche serveur sera bientôt disponible : " + query);
    }
  });

document.getElementById("inboxButton")
  .addEventListener("click", () => {
    showPage("inboxPage");
  });

// Actions vidéo
document.addEventListener("click", event => {
  if (event.target.closest(".comment-button")) {
    alert("Le système de commentaires sera connecté au serveur.");
  }

  if (event.target.closest(".share-button")) {
    if (navigator.share) {
      navigator.share({
        title: "FENÊTRE",
        text: "Découvre FENÊTRE !"
      }).catch(() => {});
    } else {
      alert("Le partage sera disponible sur ton appareil.");
    }
  }

  if (event.target.closest(".more-button")) {
    alert("Plus d'options seront bientôt disponibles.");
  }
});

console.log("FENÊTRE v1.0 - Interface initialisée.");
