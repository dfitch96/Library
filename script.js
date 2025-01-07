

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
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const pageCount = document.querySelector("#page-count").value;
        const isRead = document.querySelector("#is-read").checked;

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

function createBookDiv(property, i){

    let textDiv = document.createElement("div");
    if(property !== 'isRead'){
        textDiv.textContent = `${property.charAt(0).toUpperCase() + property.slice(1)}: ${myLibrary[i][property]}`;
    } else if(myLibrary[i][property] === true){
        textDiv.textContent = "Read"
    } else{
        textDiv.textContent = "Not Read";
    }
    return textDiv;

}

function displayBooks(){

    const booksContainer = document.querySelector(".books");
    for(let i = 0; i < myLibrary.length; i++){
        
        const newBook = document.createElement("div");
        newBook.setAttribute("class", "book");

        for(const property in myLibrary[i]){

            if(myLibrary[i].hasOwnProperty(property) && typeof myLibrary[i][property] !== "function"){

                let textDiv = createBookDiv(property, i);
                newBook.appendChild(textDiv);
            }
        }
        
        booksContainer.appendChild(newBook);
    }
}


addBookToLibrary("J.R.R Tolkien", "The Hobbit", 295, true);
addBookToLibrary("J.R.R Tolkien", "The Fellowship of the Ring", 395, true);
addBookToLibrary("J.R.R Tolkien", "The Two Towers", 395, true);


for(let i = 0; i < myLibrary.length; i++){
    console.log(myLibrary[i].info());
}


displayBooks();