const fs = require("fs/promises");
const path = require('path');
// const { v4: uuidv4 } = require('uuid');

const booksPath = path.join(__dirname, 'books.json')

const getAll = async () => {
  const result = await fs.readFile(booksPath);
  return JSON.parse(result);
}

const getBookById = async (bookId) => {
  const books = await getAll();
	console.log(books);
  const result = books.find(item => item.id == bookId);
	console.log(result);
  return result || null
}

const removeBook = async (bookId) => {
  const books = await getAll();
  const index = books.findIndex(item => item.id == bookId)
  if (index === -1) {
    return null
  }
  const [result] = books.splice(index, 1);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return result;
}

const addBook = async (data) => {
  const books = await getAll();
  const newBook = {
    // id: uuidv4(),
    id: String(books.length + 1),
    ...data
  }
  const allBooks = JSON.stringify([...books, newBook], null, 2);
  await fs.writeFile(booksPath, allBooks);
  return newBook;
}

const updateBook = async (bookId, data) => {
  const books = await getAll();
  const index = books.findIndex(item => item.id == bookId);
	if (index === -1){
		return null;
	}
	books[index] = {id, ...data};
	
  // if (title) {
  //   book.title = title
  // }

	//TODO: update all props

  await fs.writeFile(booksPath, JSON.stringify(books, null, 2))
  return 	books[index];
}

module.exports = {
  getAll,
  getBookById,
  removeBook,
  addBook,
  updateBook,
}