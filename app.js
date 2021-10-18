const container_div = document.querySelector('.container');
const addBook_button = document.querySelector('.add-book');

addBook_button.onclick = () => addBookToLibrary();

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

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Book.prototype.info = function() {
//     return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`    
// };

function addBookToLibrary() {
    let title = prompt('what title');
    let author = prompt('what author');
    let pages = prompt('how many pages');
    let read = prompt('did you read');
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
