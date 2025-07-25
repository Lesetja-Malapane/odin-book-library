const myLibrary = [];
const cards = document.querySelector('.cards');

class Book {

    constructor(title, author, pages, read, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }

    get bookTitle() { return this.title; }
    get bookAuthor() { return this.author; }
    get numberOfPages() { return this.pages; }
    get readConfirmation() { return this.read; }
    get identity() { return this.id; }
    
    set bookTitle(newTitle) { this.title = newTitle; }
    set bookAuthor(newAuthor) { this.author = newAuthor; }
    set numberOfPages(newPages) { this.pages = newPages; }
    set readConfirmation(confirm) { this.read = confirm; }
    set identity(newIdentity) { this.id = newIdentity; }
}

// function Book(title, author, pages, read) {
//     // the constructor...
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     if (read === true) {
//         this.read = "Read."
//     } else {
//         this.read = "Unread."
//     }
//     this.id = crypto.randomUUID();
// }

function addBookToLibrary(...args) {
    // take params, create a book then store it in the array
    let book = new Book(args[0], args[1], args[2], args[3], crypto.randomUUID())
    myLibrary.push(book)
}

function displayBooks() {
    cards.innerHTML = ""; // Clear previous cards
    myLibrary.forEach(element => {
        console.table(element);
        let card = document.createElement('div');
        card.className = 'card';

        let title = document.createElement('h1');
        title.textContent = element.title;
        let author = document.createElement('h3');
        author.textContent = element.author;
        let pages = document.createElement('p');
        pages.textContent = `Pages: ${element.pages}.`; // Fix: show pages, not author
        // let read = document.createElement('p');
        // read.textContent = element.read;

        let readButton = document.createElement("button");
        readButton.id = "rdbtn";
        readButton.textContent = element.read ? "Read" : "Unread";
        readButton.addEventListener("click", () => {
            readButton.textContent = readButton.textContent === "Read" ? "Unread" : "Read";
        })

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readButton);

        cards.appendChild(card);
    });
}

let createNewBookBtn = document.getElementById("createNewBook")

createNewBookBtn.addEventListener('click', () => {
    // creates a form
    let myForm = document.createElement("form");
    myForm.id = "bookForm"

    let title = document.createElement('input');
    title.type = 'text';
    title.placeholder = "Book Title"
    title.name = 'title';
    title.id = 'title';

    let author = document.createElement('input');
    author.placeholder = "Book Author"
    author.type = 'text';
    author.name = 'author';
    author.id = 'author';

    let pages = document.createElement('input');
    pages.placeholder = "Enter Number of pages."
    pages.type = 'number';
    pages.name = 'pages';
    pages.id = 'pages';

    let readLabel = document.createElement('label');
    readLabel.htmlFor = 'read';
    readLabel.textContent = 'Have you read this book?';

    let read = document.createElement('input');
    read.type = 'checkbox';
    read.name = 'read';
    read.id = 'read';

    let submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Add Book';

    submit.addEventListener('click', ()=> {
        // Prevent default form submission
        event.preventDefault();

        // Get values from form inputs
        const bookTitle = title.value;
        const bookAuthor = author.value;
        const bookPages = parseInt(pages.value, 10);
        const bookRead = read.checked;

        // Add book to library
        addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);

        // Optionally, remove the form after submission
        myForm.remove();

        // Display updated books
        displayBooks();
    })

    myForm.appendChild(title);
    myForm.appendChild(author);
    myForm.appendChild(pages);
    myForm.appendChild(readLabel); // Add label before checkbox
    myForm.appendChild(read);
    myForm.appendChild(submit);

    document.body.appendChild(myForm);
} )

console.table(myLibrary)
displayBooks()