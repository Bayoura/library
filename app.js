const container_div = document.querySelector('.container');
const addBook_button = document.querySelector('.add-book');
const inputForm_form = document.querySelector('form');
const title_input = document.getElementById('title');
const author_input = document.getElementById('author');
const totalPages_input = document.getElementById('page-number');
const readStatus_input = document.getElementById('read-status');
const submitForm_button = document.querySelector('button[type="submit"]');

let myLibrary = [
    {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    pages: 295,
    read: true
},
{
    title: 'Harry Potter and ...',
    author: 'J.K. Rowling',
    pages: 458,
    read: true
}
];

addBook_button.onclick = () => showForm();

function showForm() {
    inputForm_form.classList.toggle('show-onclick');
}

//DOMContentLoaded just makes sure the page is loaded before we try to run things
document.addEventListener('DOMContentLoaded', () => {
    submitForm_button.addEventListener('click', e => addBookToLibrary(e));
})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(e) {
    e.preventDefault(); //stop form from submitting
    let title = title_input.value;
    let author = author_input.value;
    let pages = totalPages_input.value;
    let read = readStatus_input.checked;
    let currentBook = new Book(title,author,pages,read);
    myLibrary.push(currentBook);
    appendToContainer(currentBook);
}

function appendToContainer(currentBook) {
    const book = document.createElement('div');
    container_div.append(book);
        for (let prop in currentBook) {
            book.textContent += currentBook[prop];
        }
}

//append all books in array to container:
//
// function appendToContainer() {
//     for(let i = 0; i < myLibrary.length; i++) {
//         const book = document.createElement('div');
//         container_div.append(book);
//         for (let prop in myLibrary[i]) {
//             book.textContent += myLibrary[i][prop];
//         }
//     }
// }
