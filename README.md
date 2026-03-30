# 🎬 SETFLIX

A modern **Netflix-inspired streaming web app** built using **HTML, CSS & Vanilla JavaScript**.  
This project simulates a movie streaming platform with real-time data powered by the **TMDB API**.

- [Website direct link](https://codeswith-adi.github.io/SetFlix-website/)

---------------------------------------------------------------------------------------------------
## 🦸 Auther

**Aditya Kumar Pandey**  
**Diploma in CSE (1st Year Student)**  
Learning: Python, Programming and Web development 🚀
---------------------------------------------------------------------------------------------------

## ✨ Features

- 🔐 **Login Page** — Glassmorphism-style login UI
- 🎥 **Trending Movies** — Weekly trending movies fetched live from TMDB
- 🦸 **Marvel Movies** — Full Marvel Cinematic Universe catalog
- 🎞️ **Bollywood Movies** — Hindi-language movies section
- 🌎 **Hollywood Movies** — English-language US movies section
- 🈺 **Anime Movies** — Japanese animated movie section
- 🌟 **Top Bollywood Actors** — Popular actor profile cards
- 🔍 **Live Search** — Real-time search with dropdown suggestions
- ▶️ **Trailer Popup** — Watch YouTube trailers in an animated modal
- 📱 **Responsive Design** — Works across Mobile, Tablet, and Desktop

---

## 🚀 Features In Detail

### 🔐 Login Page
- Glassmorphism card UI with a frosted background
- Username and password input fields
- Redirects to the Home page on login

### 🎬 Movie Categories
Movies are dynamically fetched from the **TMDB API** and displayed as scrollable card rows:

| Category | Source |
|---|---|
| Trending Movies | TMDB Weekly Trending |
| Marvel Movies | TMDB — Marvel Studios (Company ID: 420) |
| Bollywood Movies | TMDB — Hindi Language (`hi`) |
| Hollywood Movies | TMDB — English Language (`en`) + US Region |
| Anime Movies | TMDB — Japanese Language (`ja`) + Animation Genre |

Each movie card displays:
- 🖼️ Movie Poster
- 🎬 Movie Title
- 📅 Release Year
- ▶️ Play button overlay on hover

### 🔍 Live Search with Suggestions
- Type at least 2 characters to trigger live suggestions
- Dropdown shows top 5 matching movie titles in real-time
- Press **Enter** or click the **Search button** to view full results
- Smooth scroll to search results section

### ▶️ Trailer Modal
- Click any movie card to fetch its official trailer
- Trailer plays in an animated popup modal via YouTube embed (`autoplay=1`)
- Close by clicking the **✕** button or clicking outside the modal
- Graceful fallback alert if trailer is not available

### 🌟 Top Actors Section
- Fetches top 20 popular Bollywood actors from TMDB
- Displays profile picture and name in a card layout

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling, glassmorphism, animations |
| Vanilla JavaScript | Logic, API calls, DOM manipulation |
| [TMDB API](https://www.themoviedb.org/documentation/api) | Movie data, actor data, trailers |
| [Font Awesome](https://fontawesome.com/) | Search icon |
| YouTube Embed | Trailer playback |

---

## 📁 Project Structure

```
SETFLIX/
│
├── index.html          # Login page
│
└── Home/
    ├── home.html       # Main streaming homepage
    ├── script.js       # All JS logic (API calls, search, trailer modal)
    └── style.css       # Styling for the home page
```

---

## ⚙️ Setup & Usage

### 1. Clone the repository

```bash
git clone https://github.com/codesWith-Adi/SetFlix-website
cd setflix
```

### 2. Get a TMDB API Key

- Sign up at [https://www.themoviedb.org/](https://www.themoviedb.org/)
- Go to **Settings → API** and generate a free API key

### 3. Add your API Key

Open `Home/script.js` and replace the existing key:

```js
const apiKey = "YOUR_TMDB_API_KEY_HERE";
```

### 4. Open in Browser

Simply open `index.html` in your browser — no build tools or server required.

```bash
# Or use Live Server in VS Code for best experience
```

> ✅ No npm, no frameworks, no installation needed — just open index.html

---

## 📸 Screenshots

| Login Page | Home Page |
|---|---|
| Glassmorphism login card | Navbar + Hero section |
| | Movie category rows |
| | Trailer modal popup |

---

## 🔑 API Reference

This project uses the [TMDB (The Movie Database) API](https://developer.themoviedb.org/docs).

| Endpoint | Purpose |
|---|---|
| `/trending/movie/week` | Fetch weekly trending movies |
| `/discover/movie` | Fetch movies by language, region, company |
| `/search/movie` | Search movies by query |
| `/movie/{id}/videos` | Fetch trailer videos for a movie |
| `/discover/person` | Fetch popular actors |

---

## 📌 Notes

- The login page does **not** validate credentials — it redirects directly to the home page. Backend authentication can be added for a production version.
- The TMDB API key in this project is for **development/demo use only**. Always store API keys securely using environment variables in production.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [TMDB](https://www.themoviedb.org/) for the free movie database API
- [Font Awesome](https://fontawesome.com/) for icons
- [YouTube](https://www.youtube.com/) for trailer embeds

---

> *"Unlimited Movies, Shows & Entertainment"* — SETFLIX © 2026
