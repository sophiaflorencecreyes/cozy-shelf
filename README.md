# React + Vite
# Cozy Shelf

A small book website built with React, Vite, Tailwind CSS, and React Router.

## Features

- Search books by title or author
- Filter by genre (a book can have several genres)
- Sort by title, year, or rating
- Save books to a reading list that is remembered after a refresh
- About page

## Class diagrams

### Component structure

```mermaid
classDiagram
    App *-- Navbar
    App *-- Home
    App *-- About
    Home *-- Hero
    Home *-- Filters
    Home *-- SortSelect
    Home *-- Shelf
    Home *-- ReadingList
    Shelf *-- BookCard
    BookCard ..> Book : uses
```

### Class details

```mermaid
classDiagram
    class App {
        -Array~number~ saved
        +setSaved(ids)
        +saveToStorage()
    }
    class Home {
        -string genre
        -string search
        -string sort
        +toggleSave(id)
        +getVisibleBooks() Array~Book~
    }
    class BookCard {
        -Book book
        -boolean isSaved
        +onToggle(id)
    }
    class Book {
        <<data object>>
        -number id
        -string title
        -string author
        -number published
        -Array~string~ genres
        -number rating
        -string color
        -string cover
        -string desc
    }
    App "1" *-- "1" Home
    Home "1" *-- "0..*" BookCard
    BookCard ..> Book : uses
```