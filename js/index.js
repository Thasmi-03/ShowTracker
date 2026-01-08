document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById("card-align");
  const searchInput = document.getElementById("enter-text");
  const genreBtns = document.querySelectorAll(".genre-btn");
  const alphaBtns = document.querySelectorAll(".alpha-btn");

  // Default Shows Data
  const defaultShows = [
    {
      name: "Game of Thrones",
      genre: "Drama,Adventure",
      episodes: 84,
      image: "./asset/game.jpeg",
      rating: 9.5,
      schedule: "Sunday 9:00 PM on HBO",
      description: "Seven noble famlies fight for control of the mythical land of westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the fartherst north. Amidst the war, a neglected military order of misfits, the Night's watch, is all that stands between the realms of men and the icy horrors beyond."
    },
    { name: "Breaking Bad", genre: "Crime,Drama", episodes: 79, image: "./asset/bad.jpg", rating: 9.5, schedule: "Sunday 9:00 PM on AMC", description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future." },
    { name: "Dexter", genre: "Crime,Thriller", episodes: 125, image: "./asset/dexter.jpg", rating: 8.7, schedule: "Sunday 9:00 PM on Showtime", description: "By day, mild-mannered Dexter is a blood-spatter analyst for the Miami police. But at night, he is a serial killer who only targets other murderers." },
    { name: "How I Met Your Mother", genre: "Comedy", episodes: 219, image: "./asset/mother.jpeg", rating: 8.3, schedule: "Monday 8:00 PM on CBS", description: "A father recounts to his children - through a series of flashbacks - the journey he and his four best friends took leading up to him meeting their mother." },
    { name: "Kadhaipoma", genre: "Drama", episodes: 12, image: "./asset/kathaippoma.jpeg" },
    { name: "Kalluri Saalai", genre: "Mini-Series", episodes: 10, image: "./asset/kalluri.jpeg" },
    { name: "Train to Busan", genre: "Horror", episodes: "01", image: "./asset/train.jpeg" },
    { name: "Manathili Ninraval", genre: "Romance", episodes: "02", image: "./asset/manathili.jpeg" },
    { name: "Radsasan", genre: "Thriller", episodes: 123, image: "./asset/radsasan.jpeg" },
    { name: "M.S. Dhoni: The Untold Story", genre: "Sport", episodes: 16, image: "./asset/ms.png" },
    { name: "Hello", genre: "Romance", episodes: 21, image: "./asset/hello.png" },
    { name: "Minmini", genre: "Children,Family,Animation,Adventure", episodes: "01", image: "./asset/minmini.png" }
  ];

  // Load user shows from localStorage
  const userShows = JSON.parse(localStorage.getItem("tvShows")) || [];

  // Combine all shows
  let allShows = [...defaultShows, ...userShows];

  // Function to render shows
  function renderShows(showsToRender) {
    cardContainer.innerHTML = ""; // Clear existing

    if (showsToRender.length === 0) {
      cardContainer.innerHTML = '<p class="text-center text-muted">No shows found.</p>';
      return;
    }

    const group = document.createElement("div");
    group.className = "card-group-custom"; // Changed class for grid layout

    showsToRender.forEach(show => {
      const card = document.createElement("div");
      card.className = "card show-card";
      card.innerHTML = `
        <div class="card-img-wrapper">
            <img src="${show.image}" class="card-img-top" alt="${show.name}" onerror="this.src='https://via.placeholder.com/300x400?text=No+Image'">
            <div class="card-overlay">
                <button class="btn btn-primary btn-sm view-details-btn">View Details</button>
            </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <div class="card-meta">
            <span class="badge bg-secondary mb-2">${show.genre.split(',')[0]}</span>
            <small class="text-muted">${show.episodes} Eps</small>
          </div>
        </div>
      `;

      // Click event for the whole card or button
      card.addEventListener("click", () => handleCardClick(show));
      group.appendChild(card);
    });

    cardContainer.appendChild(group);
  }

  function handleCardClick(show) {
    localStorage.setItem("selectedShow", JSON.stringify(show));
    window.location.href = "details.html";
  }

  // Initial Render
  renderShows(allShows);

  // Search Functionality
  searchInput.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredShows = allShows.filter(show =>
      show.name.toLowerCase().includes(searchText)
    );
    renderShows(filteredShows);
  });

  // Genre Filter
  genreBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active class from all
      genreBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const genre = btn.getAttribute("data-genre");
      if (genre === "All") {
        renderShows(allShows);
      } else {
        const filteredShows = allShows.filter(show =>
          show.genre.split(',').map(g => g.trim()).includes(genre)
        );
        renderShows(filteredShows);
      }
    });
  });

  // Alphabet Filter
  alphaBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all
      alphaBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const letter = btn.textContent.trim();
      const filteredShows = allShows.filter(show =>
        show.name.charAt(0).toUpperCase() === letter
      );
      renderShows(filteredShows);
    });
  });
});
