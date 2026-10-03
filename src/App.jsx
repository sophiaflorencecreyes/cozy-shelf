import { useState } from 'react'
import './App.css'

const books = [
  { id: 1, title: 'Pride and Prejudice', author: 'Jane Austen', published: 1813, genres: ['Romance', 'Classic'], rating: 5, color: '#b45f6b', cover: '/covers/pride-and-prejudice.jpg', desc: 'Manners, misjudgments, and a very slow-burn love story.' },
  { id: 2, title: 'Frankenstein', author: 'Mary Shelley', published: 1818, genres: ['Horror', 'Sci-Fi', 'Classic'], rating: 4, color: '#3f5f4a', cover: '/covers/frankenstein.jpg', desc: 'A scientist creates life, then flees from what he made.' },
  { id: 3, title: 'The Hobbit', author: 'J.R.R. Tolkien', published: 1937, genres: ['Fantasy', 'Adventure'], rating: 5, color: '#8a5a2b', cover: '/covers/the-hobbit.jpg', desc: 'A homebody hobbit is swept into a dragon-sized adventure.' },
  { id: 4, title: 'The Secret History', author: 'Donna Tartt', published: 1992, genres: ['Fiction', 'Mystery', 'Classic', 'Dark Academia'], rating: 5, color: '#c58b3a', cover: '/covers/the-secret-history.jpg', desc: 'A group of classics students become entangled in a web of secrets and murder.' },
  { id: 5, title: 'Dracula', author: 'Bram Stoker', published: 1897, genres: ['Horror', 'Classic'], rating: 4, color: '#6e1f2b', cover: '/covers/dracula.jpg', desc: 'A chilling tale told through letters and diary entries.' },
  { id: 6, title: 'Little Women', author: 'Louisa May Alcott', published: 1868, genres: ['Classic', 'Romance'], rating: 5, color: '#5f7a8a', cover: '/covers/little-women.jpg', desc: 'Four sisters grow up, dream big, and stick together.' },
  { id: 7, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: 1925, genres: ['Classic', 'Fiction'], rating: 4, color: '#3b3f6e', cover: '/covers/the-great-gatsby.jpg', desc: 'A tale of wealth, love, and the American Dream.' },
  { id: 8, title: 'Alice\'s Adventures in Wonderland', author: 'Lewis Carroll', published: 1865, genres: ['Fantasy', 'Classic'], rating: 4, color: '#4f8a8b', cover: '/covers/alice-in-wonderland.jpg', desc: 'A curious girl tumbles down a rabbit hole into nonsense.' },
]

const genres = ['All', 'Fantasy', 'Sci-Fi', 'Romance', 'Horror', 'Classic', 'Adventure', 'Fiction', 'Mystery', 'Dark Academia']

function Navbar({ savedCount }) {
  return (
    <nav className="navbar">
      <h2 className="logo">Cozy Shelf</h2>
      <ul className="nav-links">
        <li><a href="#shelf">Books</a></li>
        <li><a href="#list">Reading List ({savedCount})</a></li>
      </ul>
    </nav>
  )
}

function Hero({ search, onSearch }) {
  return (
    <header className="hero">
      <h1>Find your next favorite book!</h1>
      <p>Browse, search, and save stories for any time of day</p>
      <input
        className="search"
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
    </header>
  )
}

function Filters({ active, onSelect }) {
  return (
    <div className="filters">
      {genres.map((g) => (
        <button
          key={g}
          className={g === active ? 'filter active' : 'filter'}
          onClick={() => onSelect(g)}
        >
          {g}
        </button>
      ))}
    </div>
  )
}

function BookCard({ book, isSaved, onToggle }) {
  const stars = '★'.repeat(book.rating) + '☆'.repeat(5 - book.rating)

  return (
    <article className="book">
      <div className="cover" style={{ background: book.color }}>
        <span className="cover-title">{book.title}</span>
        <span className="cover-author">{book.author}</span>
      </div>
      <img
        className="cover-img"
        src={book.cover}
        alt={`Cover of ${book.title}`}
        onError={(e) => (e.target.style.display = 'none')}
      />
      <div className="book-info">
        <p className="published">Published: {book.published}</p>
        <div className="tags">
          {book.genres.map((g) => (
            <span key={g} className="genre-tag">{g}</span>
          ))}
        </div>
        <p className="stars">{stars}</p>
        <p className="desc">{book.desc}</p>
        <button
          className={isSaved ? 'save-btn saved' : 'save-btn'}
          onClick={() => onToggle(book.id)}
        >
          {isSaved ? '✓ Saved' : '+ Save to list'}
        </button>
      </div>
    </article>
  )
}

function Shelf({ books, saved, onToggle }) {
  if (books.length === 0) {
    return <p className="empty">No books found. Try another search 🔍</p>
  }

  return (
    <div className="grid">
      {books.map((b) => (
        <BookCard
          key={b.id}
          book={b}
          isSaved={saved.includes(b.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}

function ReadingList({ savedBooks }) {
  return (
    <section id="list" className="section list-section">
      <h2>My Reading List</h2>
      {savedBooks.length === 0 ? (
        <p className="empty">Nothing here yet. Save a book above!</p>
      ) : (
        <ul className="list">
          {savedBooks.map((b) => (
            <li key={b.id}>
              <span className="dot" style={{ background: b.color }}></span>
              <strong>{b.title}</strong> <em>by {b.author}</em>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function App() {
  const [genre, setGenre] = useState('All')
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState([])

  const toggleSave = (id) => {
    setSaved(
      saved.includes(id) ? saved.filter((s) => s !== id) : [...saved, id]
    )
  }

  const visibleBooks = books.filter((b) => {
    const matchGenre = genre === 'All' || b.genres.includes(genre)
    const matchSearch = (b.title + ' ' + b.author)
      .toLowerCase()
      .includes(search.toLowerCase())
    return matchGenre && matchSearch
  })

  const savedBooks = books.filter((b) => saved.includes(b.id))

  return (
    <div className="app">
      <Navbar savedCount={saved.length} />
      <Hero search={search} onSearch={setSearch} />
      <section id="shelf" className="section">
        <h2>The Shelf</h2>
        <Filters active={genre} onSelect={setGenre} />
        <Shelf books={visibleBooks} saved={saved} onToggle={toggleSave} />
      </section>
      <ReadingList savedBooks={savedBooks} />
      <footer className="footer">
        "Books are a uniquely portable magic" - Stephen King
      </footer>
    </div>
  )
}

export default App