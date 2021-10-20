const container_div = document.querySelector('.container');
const addBook_button = document.querySelector('.add-book');
const inputForm_form = document.querySelector('form');
const title_input = document.getElementById('title');
const author_input = document.getElementById('author');
const totalPages_input = document.getElementById('page-number');
const readStatus_input = document.getElementById('read-status');
const submitForm_button = document.querySelector('button[type="submit"]');
let rmButton = '';

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
//you can submit a book without filling all fields! the required attribute doesn't work 
//because we prevented the normal submit. also, the evenListener triggers on a click, not   
//on a submit

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
    inputForm_form.reset();
    myLibrary.push(currentBook);
    appendToContainer(currentBook);
}

function appendToContainer(currentBook) {
    const bookCard = document.createElement('div');
    rmButton = document.createElement('button');
    rmButton.classList.add('rm-btn');
    rmButton.textContent = 'Remove';
    bookCard.setAttribute('data-index', (myLibrary.length -1));
    bookCard.classList.add('book-card');
    container_div.append(bookCard);
    for (let prop in currentBook) {
        const item = document.createElement('p');
        item.textContent += currentBook[prop];
        bookCard.append(item);
    }
    bookCard.append(rmButton);
}

//append all books in array to container:
//
// function appendToContainer() {
//     for(let i = 0; i < myLibrary.length; i++) {
//         const bookCard = document.createElement('div');
//         const rmButton = document.createElement('button');
//         rmButton.classList.add('rm-btn');
//         rmButton.textContent = 'Remove';
//         bookCard.setAttribute('data-index', (myLibrary.length -1));
//         bookCard.classList.add('book-card');
//         container_div.append(bookCard);
//         for (let prop in myLibrary[i]) {
//             const item = document.createElement('p');
//             item.textContent += myLibrary[i][prop];
//             bookCard.append(item);
//         }
//         bookCard.append(rmButton);
//     }
// }
