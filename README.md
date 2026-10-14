# Library Book Tracker

A personal library app for tracking what you own and what you've read — across physical books, ebooks, and audiobooks. Browse your collection as a card grid, mark books as read, search your shelves, and watch your reading stats update in real time.

📚 **Live demo:** https://durandur.github.io/LibraryBook-Tracker/

## Features

- **Three book formats** — physical books, ebooks (with file format + size), and audiobooks (with narrator + duration), modeled with class inheritance
- **Add and delete books** — a form that adapts its fields to the format you pick (ebook fields appear for ebooks, narrator/duration for audiobooks)
- **Mark as read** — one checkbox per book flips its read status and updates the stats
- **Reading stats dashboard** — total books, books read, completion percentage, and your favorite genre (most-collected)
- **Live search** — filters by title, author, or genre as you type
- **Cover images** — each book card shows its cover, from local `assets/` or a URL
- **Genre badges** — every card is labeled with its genre and format
- **Pre-seeded library** — ships with 6 real books (The Art of War, Rich Dad Poor Dad, 48 Laws of Power, Atomic Habits, Think and Grow Rich, Meditations) so the app is alive on first load

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Language | JavaScript (ES6+) — classes, private fields, template literals |
| Markup   | HTML5                               |
| Styling  | CSS3 (card grid layout)             |
| Icons    | Bootstrap Icons                     |
| Fonts    | Google Fonts                         |
| Hosting  | GitHub Pages                        |

No backend, no build step, no dependencies to install.

## Project Structure

```
LibraryBook-Tracker/
├── index.html   # Page structure — search bar, stats dashboard, add-book form, book grid
├── index.css    # All styling — cards, badges, dashboard, form layout
├── index.js     # All logic — Book class hierarchy, Library, rendering, event handlers
├── assets/      # Book cover images (jpg/webp)
└── README.md
```

## How It Works

### The class hierarchy (`index.js`)

A `Book` base class holds the shared fields — title, author, genre, year, cover image path — plus a private `#id` (random string) and an `isRead` flag with `toggleRead()`. Two subclasses extend it:

- **`EBook`** adds `fileFormat` (e.g. EPUB) and `fileSizeMB`
- **`AudioBook`** adds `narrator` and `durationHrs`

Each overrides `getDetails()` to append its own fields to the base description — a textbook use of inheritance and polymorphism.

### The `Library` class

The in-memory collection with four operations:

- `addBook()` / `removeBook(id)` — mutation by private id
- `filterByGenre(genre)` — case-insensitive genre filter
- `getStats()` — computes total books, books read, completion percentage, and favorite genre (the genre with the most books)

### Rendering

`renderBooks()` rebuilds the card grid from the current book list — each card shows genre and format badges, the cover, title/author, a delete button, and a "Mark as Read" checkbox. `renderStats()` refreshes the four dashboard numbers. Every mutation (add, delete, toggle read, search) re-renders from the `Library` state, so the UI can't drift out of sync.

The add-book form reads its inputs, instantiates the right subclass based on the selected format, and clears itself after adding.

## Running It Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/DuranDur/LibraryBook-Tracker.git
   ```
2. Open `index.html` in your browser — or serve the folder to avoid file-protocol quirks:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```

## Notes

- The library is seeded in code and held in memory — books you add during a session reset when the page reloads. Persistent storage (e.g. `localStorage`) is a natural next step.
- Cover images live in `assets/`; the card renderer also accepts full `http(s)` URLs in the image field.
