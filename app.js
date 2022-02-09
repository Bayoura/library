class Book {
    constructor() {
        this.title = title_input.value;
        this.author = author_input.value;
        this.pages = totalPages_input.value;
        this.read = readStatus_input.checked;
        this.rating = rating_input.value;
    }
    
    deleteLibrary() {
        if (myLibrary.length === 0) {
            alert('Your library is already empty!');
        } else if (confirm('Are you sure you want to delete your whole library?') == true) {
            container_div.innerHTML = '';
            myLibrary = [];
            localStorage.clear();
            this.updateLibrary(saveLocal());
        }
    }

    checkForDuplicates = book => {
        return myLibrary.some(arrayBook => arrayBook.title.toLowerCase() === book.title.toLowerCase());       
    }
    
    alertDuplicate() {
        alert_div.classList.add('active');
        alertOverlay_div.classList.add('active');
    }
    
    addBook(book) {
        if (!this.checkForDuplicates(book)) {
            myLibrary.push(book);
            inputForm_form.reset();
            this.updateLibrary(saveLocal());
            this.toggleModalVisibility();
        } else {
            this.alertDuplicate();
        }
    }
    
    updateLibrary(books) {
        container_div.innerHTML = '';
        for(let i = 0; i < books.length; i++) {
            const bookCard = document.createElement('div');
            const textContainer = document.createElement('div');
            const buttonContainer = document.createElement('div');
            const rmButton = document.createElement('button');
            const editButton = document.createElement('button');
    
            bookCard.classList.add('book-card');
            container_div.append(bookCard);
    
            textContainer.classList.add('book-card-text');
            bookCard.append(textContainer);
            buttonContainer.classList.add('book-card-buttons');
    
            rmButton.textContent = 'Remove Book';
            rmButton.classList.add('rm-btn');
            rmButton.setAttribute('data-index', i);
    
            editButton.textContent = 'Edit Book';
            editButton.classList.add('edit-btn');
            editButton.setAttribute('data-index', i);
    
            for (let prop in books[i]) {                    
                const item = document.createElement('p');    
                if (prop === 'read' && books[i][prop] === true) item.textContent += prop[0].toUpperCase() + prop.slice(1) + ': Yes';      
                else if (prop === 'read' && books[i][prop] === false) item.textContent += prop[0].toUpperCase() + prop.slice(1) + ': Not yet';            
                else {
                    item.textContent += prop[0].toUpperCase() + prop.slice(1) + ': ' + books[i][prop];            
                }
                textContainer.append(item);            
            }        
            bookCard.append(buttonContainer);
            buttonContainer.append(editButton);
            buttonContainer.append(rmButton);
            rmButton.addEventListener('click', e => this.removeBook(e));  
            editButton.addEventListener('click', e => this.editBook(e));     
        }      
    }
    
    //the data-index that is used here is the one of the remove button
    //after the splice you could also just call updateLibrary() and wouldn't even need updateIndex()
    removeBook(e) {
        let index = e.target.dataset.index;
        myLibrary.splice(index, 1);
        container_div.removeChild(container_div.childNodes[index]);
        this.updateIndex();
        saveLocal();
    }
    
    updateIndex() {
        const nodeList = container_div.childNodes;
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].querySelector('.rm-btn').setAttribute('data-index', i);
            nodeList[i].querySelector('.edit-btn').setAttribute('data-index', i);
        }
    }
    
    editBook(e) {
        let index = e.target.dataset.index;
        title_input.value = myLibrary[index].title;
        author_input.value = myLibrary[index].author;
        totalPages_input.value = myLibrary[index].pages;
        readStatus_input.checked = myLibrary[index].read;
        rating_input.value = myLibrary[index].rating;
        this.toggleEditFormVisibility();
        this.toggleEditClasses()
        saveEdit_button.onclick = e => this.saveEdit(index,e);
    }
    
    toggleEditFormVisibility() {
        modal_div.classList.toggle('active');
        overlay_div.classList.toggle('active');
    }
    
    toggleEditClasses() {
        modal_div.classList.toggle('edit');
        modal_div.querySelector('.add-title').classList.toggle('hidden');
        modal_div.querySelector('.edit-title').classList.toggle('active');
        submitForm_button.classList.toggle('hidden');
        saveEdit_button.classList.toggle('active');
    }
    
    saveEdit(index,e) {          
        e.preventDefault(); //stop form from submitting           
        let checkStatus = inputForm_form.checkValidity();            
        inputForm_form.reportValidity();          
        if (checkStatus) {                   
            const editedBook = new Book();                
            let isDuplicate = false;             
            for (let i = 0; i < myLibrary.length; i++) {                 
                //it's only a duplicate if the user changes the book title to another book already existing in the library                   
                if (myLibrary[i].title.toLowerCase() === editedBook.title.toLowerCase() && i != index) {                       
                    this.alertDuplicate();                        
                    isDuplicate = true;                    
                }                
            }                        
            if (isDuplicate === false) {                    
                myLibrary[index] = editedBook;                              
                this.updateLibrary(saveLocal());                             
                this.toggleEditClasses()                             
                this.toggleEditFormVisibility();                   
            }             
        }        
    }
}

const stickyHeader_div = document.querySelector('.top-buttons');
const container_div = document.querySelector('.container');
const openModal_button = document.querySelector('.open-modal');
const closeModal_button = document.querySelector('.close-modal');
const overlay_div = document.querySelector('.overlay');
const alertOverlay_div = document.querySelector('.alert-overlay');
const modal_div = document.querySelector('.modal');
const alert_div = document.querySelector('.duplicate-alert');
const closeAlert_button = document.querySelector('.duplicate-alert > button');
const inputForm_form = document.querySelector('.modal-body');
const delete_button = document.querySelector('.delete-library');

const title_input = document.getElementById('title');
const author_input = document.getElementById('author');
const totalPages_input = document.getElementById('page-number');
const readStatus_input = document.getElementById('read-status');
const rating_input = document.getElementById('rating');
const submitForm_button = document.querySelector('.submit-btn');
const saveEdit_button = document.querySelector('.save-btn');

const book = new Book();
let myLibrary = [];


// sticky header
let headerOffset = stickyHeader_div.offsetTop; 
window.onscroll = () => stickyHeader();

function stickyHeader() {
    if (window.pageYOffset > headerOffset) {
        stickyHeader_div.classList.add('sticky');
    } else {
        stickyHeader_div.classList.remove('sticky');
    }
}

// modal
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

// event listeners
delete_button.onclick = () => book.deleteLibrary();
openModal_button.onclick = () => book.toggleModalVisibility();
closeModal_button.onclick = () => book.toggleModalVisibility();
overlay_div.onclick = () => book.toggleModalVisibility();
alertOverlay_div.onclick = () => book.toggleModalVisibility();
closeAlert_button.onclick = () => book.toggleModalVisibility();

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleModalVisibility();
});

document.addEventListener('DOMContentLoaded', () => {    
    submitForm_button.addEventListener('click', e => {    
        e.preventDefault(); //stop form from submitting   

        //check if required fields are filled out
        let checkStatus = inputForm_form.checkValidity();
        inputForm_form.reportValidity();
        if (checkStatus) {
            book.addBook(new Book);      
        }
    })    
});


//Local Storage

if(!localStorage.getItem('library')) {   
    myLibrary = [];
} else {    
    myLibrary = JSON.parse(localStorage.getItem('library')); 
    book.updateLibrary(myLibrary);
} 

function saveLocal() {
    localStorage.setItem('library', JSON.stringify(myLibrary)); 
    let books = JSON.parse(localStorage.getItem('library')); 
    return books;
}