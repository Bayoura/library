// const container_div = document.querySelector('.container');
// const addBook_button = document.querySelector('.add-book');
// const inputForm_form = document.querySelector('form');
// const title_input = document.getElementById('title');
// const author_input = document.getElementById('author');
// const totalPages_input = document.getElementById('page-number');
// const readStatus_input = document.getElementById('read-status');
// const submitForm_button = document.querySelector('button[type="submit"]');

// let myLibrary = [
//     {
//     title: 'The Hobbit',
//     author: 'J.R.R. Tolkien',
//     pages: 295,
//     read: true
// },
// {
//     title: 'Harry Potter and ...',
//     author: 'J.K. Rowling',
//     pages: 458,
//     read: true
// }
// ];

// addBook_button.onclick = () => showForm();

// function showForm() {
//     inputForm_form.classList.toggle('show-onclick');
// }

// //DOMContentLoaded just makes sure the page is loaded before we try to run things
// document.addEventListener('DOMContentLoaded', () => {
//     submitForm_button.addEventListener('click', e => addBookToLibrary(e));
// })
// //you can submit a book without filling all fields! the required attribute doesn't work 
// //because we prevented the normal submit. also, the evenListener triggers on a click, not   
// //on a submit

// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }

// function addBookToLibrary(e) {
//     e.preventDefault(); //stop form from submitting
//     let title = title_input.value;
//     let author = author_input.value;
//     let pages = totalPages_input.value;
//     let read = readStatus_input.checked;
//     let currentBook = new Book(title,author,pages,read);
//     inputForm_form.reset();
//     myLibrary.push(currentBook);
//     appendToContainer(currentBook);
// }

// // function appendToContainer(currentBook) {
// //     const bookCard = document.createElement('div');
// //     const rmButton = document.createElement('button');
// //     rmButton.classList.add('rm-btn');
// //     rmButton.textContent = 'Remove';
// //     bookCard.setAttribute('data-index', (myLibrary.length -1));
// //     bookCard.classList.add('book-card');
// //     container_div.append(bookCard);
// //     for (let prop in currentBook) {
// //         const item = document.createElement('p');
// //         item.textContent += currentBook[prop];
// //         bookCard.append(item);
// //     }
// //     bookCard.append(rmButton);
// // }

// //append all books in array to container:
// //

// function appendToContainer() {
//         const bookCard = document.createElement('div');
//         const rmButton = document.createElement('button');
//         rmButton.classList.add('rm-btn');
//         rmButton.textContent = 'Remove';
//         bookCard.setAttribute('data-index', (myLibrary.length -1));
//         bookCard.classList.add('book-card');
//         container_div.append(bookCard);
//         bookCard.append(rmButton);
//         rmButton.onclick = () => removeBook();
//     }

//     function removeBook() {
//         console.log('remove, please? :(');
//     }

// // function appendToContainer() {
// //     for(let i = 0; i < myLibrary.length; i++) {
// //         const bookCard = document.createElement('div');
// //         const rmButton = document.createElement('button');
// //         rmButton.classList.add('rm-btn');
// //         rmButton.textContent = 'Remove';
// //         bookCard.setAttribute('data-index', (myLibrary.length -1));
// //         bookCard.classList.add('book-card');
// //         container_div.append(bookCard);
// //         for (let prop in myLibrary[i]) {
// //             const item = document.createElement('p');
// //             item.textContent += myLibrary[i][prop];
// //             bookCard.append(item);
// //         }
// //         bookCard.append(rmButton);
// //     }
// //     const rmBtnList_button = document.querySelectorAll('.rm-btn');
// //     rmBtnList_button.forEach(rmButton => rmButton.addEventListener('click', console.log('hi')));
// // }

const container_div = document.querySelector('.container');
const addBook_button = document.querySelector('.add-book');
const inputForm_form = document.querySelector('form');
const title_input = document.getElementById('title');
const author_input = document.getElementById('author');
const totalPages_input = document.getElementById('page-number');
const readStatus_input = document.getElementById('read-status');
const submitForm_button = document.querySelector('button[type="submit"]');
const clearForm_button = document.querySelector('button[type="reset"]');
const closeForm_button = document.querySelector('.close-form');

let myLibrary = new Library();

addBook_button.onclick = () => toggleFormVisibility();
closeForm_button.onclick = () => toggleFormVisibility();

function toggleFormVisibility() {
    inputForm_form.classList.toggle('show-onclick');
}

function Book() {
    this.title = title_input.value;
    this.author = author_input.value;
    this.pages = totalPages_input.value;
    this.read = readStatus_input.checked;
}

document.addEventListener('DOMContentLoaded', () => {    
    submitForm_button.addEventListener('click', e => {    
        e.preventDefault(); //stop form from submitting   
        myLibrary.addBook(new Book);       
    })    
});

    
// function addBook(e) {
//     e.preventDefault(); //stop form from submitting
//     myLibrary.books.push(new Book);
//     inputForm_form.reset();
// }

// submitForm_button.onclick = () => {
//     const newBook = new Book();
//     myLibrary.addBook(newBook);
// }

Library.prototype.addBook = function(book) {
    if (!checkForDuplicates(book)) {
        this.books.push(book);
        inputForm_form.reset();
        this.updateLibrary();
    } else {
        alert('You seem to already have this book in your library.');
    }
}


let checkForDuplicates = book => {
        return myLibrary.books.some(arrayBook => arrayBook.title.toLowerCase() === book.title.toLowerCase());       
}

function Library() {
    this.books = [];
}

//the data-index that is used here is the one of the remove button, not(!) the one of the book-card div!!
//after the splice you could also just call updateLibrary() and wouldn't even need updateIndex()
Library.prototype.removeBook = function(e) {
    let index = e.target.dataset.index;
    this.books.splice(index, 1);
    container_div.removeChild(container_div.childNodes[index]);
    this.updateIndex();
}

Library.prototype.updateLibrary = function() {
    container_div.innerHTML = '';
    for(let i = 0; i < this.books.length; i++) {
        const bookCard = document.createElement('div');
        const rmButton = document.createElement('button');

        rmButton.textContent = 'Remove Book';
        rmButton.classList.add('rm-btn');
        rmButton.setAttribute('data-index', i);

        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', i);
        container_div.append(bookCard);

        for (let prop in this.books[i]) {                    
            const item = document.createElement('p');           
            item.textContent += this.books[i][prop];            
            bookCard.append(item);            
        }        
        bookCard.append(rmButton);
        rmButton.addEventListener('click', e => this.removeBook(e));       
    }      
}

//update the data-index of the book-card divs and(!) and the remove buttons
Library.prototype.updateIndex = function() {
    const nodeList = container_div.childNodes;
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].setAttribute('data-index', i);
        nodeList[i].querySelector('.rm-btn').setAttribute('data-index', i);
    }
}

