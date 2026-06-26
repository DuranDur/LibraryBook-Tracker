// Book Class
class Book {
  #id;
  constructor(title, author, genre, year, imagepath) {
    this.#id = Math.random().toString(36).slice(2, 9);
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.year = year;
    this.imagepath = imagepath;
    this.isRead = false;
  }

  getId() {
    return this.#id;
  }

  toggleRead() {
    this.isRead = !this.isRead;
  }

  getDetails() {
    return `${this.title} by ${this.author} (${this.year}) — Genre: ${this.genre} — Read: ${this.isRead}`;
  }
}

class EBook extends Book {
  constructor(title, author, genre, year, imagePath, fileFormat, fileSizeMB) {
    super(title, author, genre, year, imagePath);
    this.fileFormat = fileFormat;
    this.fileSizeMB = fileSizeMB;
  }

  getDetails() {
    return `${super.getDetails()} — Format: ${this.fileFormat} — Size: ${this.fileSizeMB}MB`;
  }
}

class AudioBook extends Book {
  constructor(title, author, genre, year, imagePath, narrator, durationHrs) {
    super(title, author, genre, year, imagePath);
    this.narrator = narrator;
    this.durationHrs = durationHrs;
  }

  getDetails() {
    return `${super.getDetails()} — Narrator: ${this.narrator} — Duration: ${this.durationHrs}hrs`;
  }
}

// Library Class
class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.getId() !== id);
  }

  filterByGenre(genre) {
    return this.books.filter(
      (book) => book.genre.toLowerCase() === genre.toLowerCase(),
    );
  }

  getStats() {
    const total = this.books.length;
    const read = this.books.filter((book) => book.isRead).length;
    const completion = total === 0 ? 0 : Math.round((read / total) * 100);

    const genreCount = {};
    this.books.forEach((book) => {
      genreCount[book.genre] = (genreCount[book.genre] || 0) + 1;
    });
    const favoriteGenre =
      Object.keys(genreCount).sort(
        (a, b) => genreCount[b] - genreCount[a],
      )[0] || "N/A";

    return { total, read, completion, favoriteGenre };
  }
}

const library = new Library();

library.addBook(
  new EBook(
    "The Art of War",
    "Sun Tzu",
    "Philosophy",
    -500,
    "71Ow6MUOx2L.jpg",
    "EPUB",
    1.2,
  ),
);
library.addBook(
  new AudioBook(
    "Rich Dad Poor Dad",
    "Robert Kiyosaki",
    "Personal Finance",
    1997,
    "Rich dad Poor dad.jpg",
    "Tim Wheeler",
    6.0,
  ),
);
library.addBook(
  new EBook(
    "48 Laws of Power",
    "Robert Greene",
    "Self Improvement",
    1998,
    "48 laws of power.webp",
    "EPUB",
    2.5,
  ),
);
library.addBook(
  new AudioBook(
    "Atomic Habits",
    "James Clear",
    "Self Improvement",
    2018,
    "Atomic habits.jpg",
    "John Smith",
    5.5,
  ),
);
library.addBook(
  new EBook(
    "Think and Grow Rich",
    "Napoleon Hill",
    "Motivation",
    1937,
    "Think and grow rich.jpeg",
    "EPUB",
    1.8,
  ),
);
library.addBook(
  new AudioBook(
    "Meditations",
    "Marcus Aurelius",
    "Philosophy",
    180,
    "meditations.jpg",
    "Duncan Steen",
    6.5,
  ),
);

// Render the books on the page

function renderBooks(books = library.books) {
  const grid = document.querySelector(".books-grid");
  grid.innerHTML = "";

  books.forEach((book) => {
    const type =
      book instanceof AudioBook
        ? "audiobook"
        : book instanceof EBook
          ? "ebook"
          : "book";

    const typeLabel =
      book instanceof AudioBook
        ? "Audiobook"
        : book instanceof EBook
          ? "eBook"
          : "Book";

    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.getId();

    card.innerHTML = `
            <div class="card-top">
                <span class="badge">${book.genre}</span>
                <span class="badge ${type}">${typeLabel}</span>
                <button class="delete-btn">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
            <img src="${book.imagepath.startsWith("http") ? book.imagepath : "./assets/" + book.imagepath}" alt="${book.title}">
            <div class="card-bottom">
                <p class="book-title">${book.title}</p>
                <p class="book-author">${book.author}</p>
                <label class="mark-read">
                    <input type="checkbox" ${book.isRead ? "checked" : ""}>
                    Mark as Read
                </label>
            </div>
        `;

    card.querySelector(".delete-btn").addEventListener("click", () => {
      library.removeBook(book.getId());
      renderBooks();
      renderStats();
    });

    card.querySelector(".mark-read input").addEventListener("change", () => {
      book.toggleRead();
      renderBooks();
      renderStats();
    });

    grid.appendChild(card);
  });
}

function renderStats() {
  const { total, read, completion, favoriteGenre } = library.getStats();
  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-read").textContent = read;
  document.getElementById("stat-genre").textContent = favoriteGenre;
  document.getElementById("stat-completion").textContent = `${completion}%`;
}

renderBooks();
renderStats();

document.querySelector(".search-bar input").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = library.books.filter(
    (book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query),
  );
  renderBooks(filtered);
});

// Show/hide extra fields based on type
document.getElementById("input-type").addEventListener("change", (e) => {
    document.getElementById("ebook-fields").style.display =
        e.target.value === "ebook" ? "flex" : "none";
    document.getElementById("audiobook-fields").style.display =
        e.target.value === "audiobook" ? "flex" : "none";
});

// Add book button
// Show/hide extra fields based on type
document.getElementById("input-type").addEventListener("change", (e) => {
    document.getElementById("ebook-fields").style.display =
        e.target.value === "ebook" ? "flex" : "none";
    document.getElementById("audiobook-fields").style.display =
        e.target.value === "audiobook" ? "flex" : "none";
});

// Add book button
document.getElementById("add-book-btn").addEventListener("click", () => {
    const title = document.getElementById("input-title").value.trim();
    const author = document.getElementById("input-author").value.trim();
    const genre = document.getElementById("input-genre").value.trim();
    const year = parseInt(document.getElementById("input-year").value);
    const type = document.getElementById("input-type").value;
    const imagepath = document.getElementById("input-image").value.trim();

    if (!title || !author || !genre || !year) return;

    let book;

    if (type === "ebook") {
        const fileFormat = document.getElementById("input-format").value.trim();
        const fileSizeMB = parseFloat(document.getElementById("input-size").value);
        book = new EBook(title, author, genre, year, imagepath, fileFormat, fileSizeMB);
    } else if (type === "audiobook") {
        const narrator = document.getElementById("input-narrator").value.trim();
        const durationHrs = parseFloat(document.getElementById("input-duration").value);
        book = new AudioBook(title, author, genre, year, imagepath, narrator, durationHrs);
    } else {
        book = new Book(title, author, genre, year, imagepath);
    }

    library.addBook(book);
    renderBooks();
    renderStats();

    // Clear the form
    document.getElementById("input-title").value = "";
    document.getElementById("input-author").value = "";
    document.getElementById("input-genre").value = "";
    document.getElementById("input-year").value = "";
    document.getElementById("input-image").value = "";
    document.getElementById("input-format").value = "";
    document.getElementById("input-size").value = "";
    document.getElementById("input-narrator").value = "";
    document.getElementById("input-duration").value = "";
    document.getElementById("input-type").value = "book";
    document.getElementById("ebook-fields").style.display = "none";
    document.getElementById("audiobook-fields").style.display = "none";
});