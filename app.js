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

const openModal_button = document.querySelector('.open-modal');
const closeModal_button = document.querySelector('.close-modal');
const overlay_div = document.querySelector('.overlay');
const alertOverlay_div = document.querySelector('.alert-overlay');
const modal_div = document.querySelector('.modal');
const alert_div = document.querySelector('.duplicate-alert');
const closeAlert_button = document.querySelector('.duplicate-alert > button');
const inputForm_form = document.querySelector('.modal-body');

const title_input = document.getElementById('title');
const author_input = document.getElementById('author');
const totalPages_input = document.getElementById('page-number');
const readStatus_input = document.getElementById('read-status');
const submitForm_button = document.querySelector('.submit');
const saveEdit_button = document.querySelector('.save');
const clearForm_button = document.querySelector('.modal-body > button[type="reset"]');
const container_div = document.querySelector('.container');


openModal_button.onclick = () => toggleModalVisibility();
closeModal_button.onclick = () => toggleModalVisibility();
overlay_div.onclick = () => toggleModalVisibility();
alertOverlay_div.onclick = () => toggleModalVisibility();
closeAlert_button.onclick = () => toggleModalVisibility();

function Book() {
    this.title = title_input.value;
    this.author = author_input.value;
    this.pages = totalPages_input.value;
    this.read = readStatus_input.checked;
}

function Library() {
    this.books = [];
}

let myLibrary = new Library();

function toggleModalVisibility() {
    if (alert_div.classList.contains('active')) {
        alert_div.classList.remove('active');
        alertOverlay_div.classList.remove('active');
    }
    else {
        modal_div.classList.remove('edit');
        modal_div.querySelector('.add-title').classList.remove('hidden');
        modal_div.querySelector('.edit-title').classList.remove('active');
        submitForm_button.classList.remove('hidden');
        saveEdit_button.classList.remove('active');

        inputForm_form.reset();
        modal_div.classList.toggle('active');
        overlay_div.classList.toggle('active');
    }
}

function alertDuplicate() {
    alert_div.classList.add('active');
    alertOverlay_div.classList.add('active');
}

let checkForDuplicates = book => {
    return myLibrary.books.some(arrayBook => arrayBook.title.toLowerCase() === book.title.toLowerCase());       
}

document.addEventListener('DOMContentLoaded', () => {    
    submitForm_button.addEventListener('click', e => {    
        e.preventDefault(); //stop form from submitting   
        myLibrary.addBook(new Book);       
    })    
});

Library.prototype.addBook = function(book) {
    if (!checkForDuplicates(book)) {
        this.books.push(book);
        inputForm_form.reset();
        this.updateLibrary();
    } else {
        alertDuplicate();
    }
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
        const editButton = document.createElement('button');

        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', i);
        container_div.append(bookCard);

        rmButton.textContent = 'Remove Book';
        rmButton.classList.add('rm-btn');
        rmButton.setAttribute('data-index', i);

        editButton.textContent = 'Edit Book';
        editButton.classList.add('edit-btn');
        editButton.setAttribute('data-index', i);


        for (let prop in this.books[i]) {                    
            const item = document.createElement('p');           
            item.textContent += this.books[i][prop];            
            bookCard.append(item);            
        }        
        bookCard.append(rmButton);
        bookCard.append(editButton);
        rmButton.addEventListener('click', e => this.removeBook(e));  
        editButton.addEventListener('click', e => this.editBook(e));     
    }      
}

//update the data-index of the book-card divs and(!) and the remove and edit buttons
Library.prototype.updateIndex = function() {
    const nodeList = container_div.childNodes;
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].setAttribute('data-index', i);
        nodeList[i].querySelector('.rm-btn').setAttribute('data-index', i);
        nodeList[i].querySelector('.edit-btn').setAttribute('data-index', i);
    }
}

Library.prototype.editBook = function(e) {
    let index = e.target.dataset.index;
    title_input.value = this.books[index].title;
    author_input.value = this.books[index].author;
    totalPages_input.value = this.books[index].pages;
    readStatus_input.checked = this.books[index].read;
    toggleEditVisibility();
    toggleEditClasses()
    saveEdit_button.onclick = e => saveEdit(index,e);
}


function toggleEditClasses() {
    modal_div.classList.toggle('edit');
    modal_div.querySelector('.add-title').classList.toggle('hidden');
    modal_div.querySelector('.edit-title').classList.toggle('active');
    submitForm_button.classList.toggle('hidden');
    saveEdit_button.classList.toggle('active');
}

function saveEdit(index,e) {  
    e.preventDefault(); //stop form from submitting   
    const editedBook = new Book();
    let isDuplicate = false;
    for (let i = 0; i < myLibrary.books.length; i++) {
        if (myLibrary.books[i].title.toLowerCase() === editedBook.title.toLowerCase() && i != index) {
            alertDuplicate();
            isDuplicate = true;
        } 
    }        
    if (isDuplicate === false) {
        myLibrary.books[index] = editedBook;          
        myLibrary.updateLibrary();         
        toggleEditClasses()         
        toggleEditVisibility();   
    } else {
        return
    }
}

function toggleEditVisibility() {
    modal_div.classList.toggle('active');
    overlay_div.classList.toggle('active');
}


