

const myLibrary = [];

const addButton = document.querySelector("#add-button");
const dialog = document.querySelector("dialog");
const form = dialog.querySelector("form");
const dialogCloseButton = form.querySelector(".close-button");
const dialogAddButton = form.querySelector(".add-button");


addButton.addEventListener("click", () => {
    dialog.showModal();
});

dialog.addEventListener("close", (e) =>{
    console.log(dialog.returnValue);

    if(dialog.returnValue === 'add'){
        const title = form.querySelector("#title").value;
        const author = form.querySelector("#author").value;
        const pageCount = form.querySelector("#page-count").value;
        const isRead = form.querySelector("#is-read").checked;

        addBookToLibrary(author, title, pageCount, isRead);
        clearBooks();
        displayBooks();
    }

    form.reset();
})

dialogAddButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close(dialogAddButton.value);
})

dialogCloseButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close(dialogCloseButton.value);
});

function Book(author, title, pages, isRead){

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function() {
        let bookInfo = this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ';

        if(this.isRead){
            return bookInfo + 'is read';
        } else{
            return bookInfo + 'is not read';
        }
    }
}


function addBookToLibrary(author, title, pages, isRead){

    let newBook = new Book(author, title, pages, isRead);
    myLibrary.push(newBook);

    console.log("Book Added " + newBook.info());
}

function clearBooks(){
    let booksContainer = document.querySelector(".books");
    while(booksContainer.hasChildNodes()){
        booksContainer.removeChild(booksContainer.firstChild);
    }
}



function createBookCard(i){

    const newBook = document.createElement("div");
    newBook.setAttribute("class", "book");
    newBook.setAttribute("data-index-number", i);
    for(const property in myLibrary[i]){

        if(myLibrary[i].hasOwnProperty(property) && typeof myLibrary[i][property] !== "function"){

            let textDiv = createBookDiv(property, i);
            newBook.appendChild(textDiv);
        }
    }

    const readButton = createReadButton();
    newBook.appendChild(readButton);

    const deleteButton = createDeleteButton();
    newBook.appendChild(deleteButton);
    return newBook;
}

function createBookDiv(property, i){

    let textDiv = document.createElement("div");
    
    if(property !== 'isRead' && property !== 'title'){

        textDiv.textContent = `${property.charAt(0).toUpperCase() + property.slice(1)}: ${myLibrary[i][property]}`;

    } else if (property !== 'isRead' && property === 'title'){
        let h1 = document.createElement("h2");
        h1.textContent = `${myLibrary[i][property]}`;
        textDiv.appendChild(h1);
    } else if(myLibrary[i][property] === true){
        textDiv.textContent = "Status: Read"
    } else{
        textDiv.textContent = "Status: Not Read";
    }
    return textDiv;

}


function createDeleteButton(){

    const newButton = createButton("Delete");
    newButton.addEventListener("click", (e) => {
    
        let index = getIndexNumber(e);
        removeIndexFromLibrary(index);
        clearBooks();
        displayBooks();
    });

    return newButton;
}

function createReadButton(){
    const newButton = createButton("Toggle Status");
    newButton.addEventListener("click", (e) => {
    
        let index = getIndexNumber(e);
        myLibrary[index].isRead = !myLibrary[index].isRead;
        clearBooks();
        displayBooks();
    });

    return newButton;
}

function removeIndexFromLibrary(index){
    myLibrary.splice(index, 1);
}


function getIndexNumber(e){
    let parent = e.target.parentElement;
    if(parent){
        return parent.dataset.indexNumber;
    }
}

function createButton(buttonType){
    const newButton = document.createElement("button");
    newButton.textContent = buttonType;
    newButton.setAttribute("class", "book-button");
    return newButton;
}


function displayBooks(){

    const booksContainer = document.querySelector(".books");
    for(let i = 0; i < myLibrary.length; i++){
        
        let newBook = createBookCard(i);
        booksContainer.appendChild(newBook);

    }
}


addBookToLibrary("J.R.R Tolkien", "The Hobbit", 295, true);
addBookToLibrary("J.R.R Tolkien", "The Fellowship of the Ring", 390, true);
addBookToLibrary("J.R.R Tolkien", "The Two Towers", 426, true);
addBookToLibrary("Fyodor Dostoevsky", "Crime and Punishment", 472, true);
addBookToLibrary("Fyodor Dostoevsky", "The Brothers Karamazov", 864, false);


displayBooks();