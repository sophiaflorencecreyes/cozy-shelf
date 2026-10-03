import { useState } from 'react'

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
    <nav className="sticky top-0 z-10 flex w-full flex-col items-center justify-between gap-2 bg-brown px-[5vw] py-4 text-paper shadow-md sm:flex-row">
      <h2 className="text-2xl font-bold">Cozy Shelf</h2>
      <ul className="flex list-none gap-6">
        <li><a href="#shelf" className="font-bold hover:text-gold">Books</a></li>
        <li><a href="#list" className="font-bold hover:text-gold">Reading List ({savedCount})</a></li>
      </ul>
    </nav>
  )
}

function Hero({ search, onSearch }) {
  return (
    <header className="w-full bg-linear-to-b from-brown-dark to-brown px-5 py-24 text-center text-paper">
      <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">Find your next favorite book!</h1>
      <p className="mb-8 text-xl italic">Browse, search, and save stories for any time of day</p>
      <input
        className="w-11/12 max-w-lg rounded-full border-[3px] border-gold bg-paper px-6 py-3.5 text-base text-ink outline-none"
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
    <div className="mb-10 flex flex-wrap justify-center gap-2.5">
      {genres.map((g) => (
        <button
          key={g}
          className={`cursor-pointer rounded-full border-2 border-brown px-5 py-2 font-bold transition ${
            g === active ? 'bg-brown text-paper' : 'bg-transparent text-brown hover:bg-paper-dark'
          }`}
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
    <article className="overflow-hidden rounded-l-md rounded-r-2xl border-l-8 border-black/35 bg-[#fffaf0] text-left shadow-xl transition-transform duration-200 hover:-translate-y-2 hover:-rotate-1">
      <div
        className="flex min-h-[90px] flex-col justify-between gap-2 p-4 text-white"
        style={{ background: book.color }}
      >
        <span className="text-xl font-bold leading-tight">{book.title}</span>
        <span className="text-sm italic opacity-90">{book.author}</span>
      </div>
      <img
        className="block h-[220px] w-full object-contain p-3"
        src={book.cover}
        alt={`Cover of ${book.title}`}
        onError={(e) => (e.target.style.display = 'none')}
      />
      <div className="p-4">
        <p className="mb-2.5 text-sm italic text-muted">Published: {book.published}</p>
        <div className="flex flex-wrap gap-1.5">
          {book.genres.map((g) => (
            <span key={g} className="inline-block rounded-full bg-paper-dark px-3 py-0.5 text-xs font-bold text-brown">
              {g}
            </span>
          ))}
        </div>
        <p className="my-2 text-lg text-gold">{stars}</p>
        <p className="mb-3.5 text-[0.92rem] leading-normal text-muted">{book.desc}</p>
        <button
          className={`w-full cursor-pointer rounded-lg border-2 border-brown p-2.5 font-bold transition ${
            isSaved ? 'bg-brown text-paper' : 'bg-transparent text-brown hover:bg-paper-dark'
          }`}
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
    return <p className="italic text-muted">No books found. Try another search 🔍</p>
  }

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-8">
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
    <section id="list" className="w-full bg-paper-dark px-[5vw] py-16 text-center">
      <h2 className="mb-6 text-4xl font-bold text-brown">My Reading List</h2>
      {savedBooks.length === 0 ? (
        <p className="italic text-muted">Nothing here yet. Save a book above!</p>
      ) : (
        <ul className="mx-auto max-w-xl list-none text-left">
          {savedBooks.map((b) => (
            <li key={b.id} className="flex items-center gap-3 border-b border-dashed border-muted py-3">
              <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ background: b.color }}></span>
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
    <div className="min-h-screen w-full bg-paper font-serif text-ink">
      <Navbar savedCount={saved.length} />
      <Hero search={search} onSearch={setSearch} />
      <section id="shelf" className="w-full px-[5vw] py-16 text-center">
        <h2 className="mb-6 text-4xl font-bold text-brown">The Shelf</h2>
        <Filters active={genre} onSelect={setGenre} />
        <Shelf books={visibleBooks} saved={saved} onToggle={toggleSave} />
      </section>
      <ReadingList savedBooks={savedBooks} />
      <footer className="w-full bg-brown px-5 py-8 text-center italic text-paper">
        "Books are a uniquely portable magic" - Stephen King
      </footer>
    </div>
  )
}

export default App