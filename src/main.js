const url1 = "https://api.thecatapi.com/v1/images/search?limit=10";

function getImages() {
  fetch(url1)
    .then((response) => response.json())
    .then((data) => {
      const firstImageUrl = data[0].url;

      const section = document.getElementById("section-image");
      section.style.backgroundImage = `url('${firstImageUrl}')`;

      console.log(firstImageUrl);
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
}
/*display the cards*/
function getCards() {
  fetch(url1)
    .then((response) => response.json())
    .then((data) => {
      const catContainer = document.getElementById("cats");

      data.slice(0, 3).forEach((cat) => {
        const catImage = cat.url;

        const catImageContainer = document.createElement("div");
        catImageContainer.classList.add("cat-container");

        const catImageCard = document.createElement("img");
        catImageCard.src = catImage;
        catImageCard.classList.add("brown-cat");

        const catTextContent = document.createElement("p");
        catTextContent.textContent =
          " Adopt this adorable feline friend and let the endless cuddles and playful antics begin.";
        catImageCard.classList.add("card-content");

        catImageContainer.appendChild(catTextContent);

        catImageContainer.appendChild(catImageCard);

        catContainer.appendChild(catImageContainer);
        console.log(catContainer);
      });
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
}

function handleFormSubmission() {
  const form = document.getElementById("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");

    const valueOne = usernameInput.value;
    const valueTwo = emailInput.value;

    form.reset();

    const urlTwo = "http://localhost:3000/cats";
    fetch(urlTwo, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: valueOne, email: valueTwo }),
    })
      .then((response) => response.json())
      .then((data) => console.log("data", data));
  });
}

function setupDonationButton() {
  let donationAmount = 0;

  function updateDonationText() {
    const button = document.querySelector(".adopt");
    button.textContent = `DONATIONS: ${donationAmount}$`;
  }

  function incrementDonation() {
    donationAmount += 10;
    updateDonationText();
  }

  const adoptButton = document.querySelector(".adopt");
  adoptButton.addEventListener("click", incrementDonation);

  updateDonationText();
}
function navbarScroll() {
  const homeLink = document.querySelector(".home-link");
  homeLink.addEventListener("click", scroller.bind(null, "home-section"));

  const availableLink = document.querySelector(".available-link");
  availableLink.addEventListener("click", scroller.bind(null, "categories"));

  const registerLink = document.querySelector(".register-link");
  registerLink.addEventListener("click", scroller.bind(null, "contactUs"));

  const reviewsLink = document.querySelector(".reviews-link");
  reviewsLink.addEventListener("click", scroller.bind(null, "review-section"));
}

function scroller(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  getImages();
  getCards();
  handleFormSubmission();
  setupDonationButton();
  navbarScroll();
});
