import { Link } from 'react-router'

const features = [
  { icon: '/icons/search.png', title: 'Search', text: 'Find any book by title or author.' },
  { icon: '/icons/genre.png', title: 'Genres', text: 'Filter the shelf by genre. Books can belong to several.' },
  { icon: '/icons/sorting.png', title: 'Sorting', text: 'Order books by title, year, or rating.' },
  { icon: '/icons/reading-list.png', title: 'Reading list', text: 'Save books and keep them after a refresh.' },
]

const tools = ['React', 'Vite', 'Tailwind CSS', 'React Router']

function About() {
  return (
    <main className="w-full px-[5vw] py-16 text-center">
      <h1 className="mb-4 text-4xl font-bold text-brown md:text-5xl">About Cozy Shelf</h1>
      <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted">
        Cozy Shelf is a small book website for browsing, searching,
        filtering, sorting, and saving books to a reading
        list that is remembered the next time you visit.
      </p>

      <h2 className="mb-6 text-3xl font-bold text-brown">Features</h2>
      <div className="mx-auto mb-12 grid max-w-4xl grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl bg-[#fffaf0] p-6 shadow-lg">
            <img
              src={f.icon}
              alt={f.title}
              className="mx-auto mb-3 h-14 w-14 object-contain"
            />
            <h3 className="mb-1 text-lg font-bold text-brown">{f.title}</h3>
            <p className="text-sm text-muted">{f.text}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-3xl font-bold text-brown">Built with</h2>
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {tools.map((t) => (
          <span key={t} className="rounded-full bg-brown px-4 py-1.5 font-bold text-paper">
            {t}
          </span>
        ))}
      </div>

      <p className="mb-8 italic text-muted">Made by Sophia Florence C. Reyes ♡ </p>

      <Link
        to="/"
        className="inline-block rounded-full bg-brown px-6 py-2.5 font-bold text-paper hover:bg-brown-dark"
      >
        ← Back to the shelf
      </Link>
    </main>
  )
}

export default About