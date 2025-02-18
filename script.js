

class Book{

    constructor(author, title, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
    
    info = function() {
        let bookInfo = this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ';

        if(this.isRead){
            return bookInfo + 'is read';
        } else{
            return bookInfo + 'is not read';
        }
    }
}

class Library{

    #myLibrary = [];
    
    addBookToLibrary(author, title, pages, isRead){

        let newBook = new Book(author, title, pages, isRead);
        this.#myLibrary.push(newBook);
    
        console.log("Book Added " + newBook.info());
    }

    toggleRead(index){
        this.#myLibrary[index].isRead = !this.#myLibrary[index].isRead;
    }


    removeIndexFromLibrary(index){
        this.#myLibrary.splice(index, 1);
    }
    
    getLibrary(){
        return this.#myLibrary;
    }

    getLength(){
        return this.#myLibrary.length;
    }

    getIndex(i){
        return this.#myLibrary[i];
    }

}


const ScreenController = (function(library){

    const addButton = document.querySelector("#add-button");
    const dialog = document.querySelector("dialog");
    const form = dialog.querySelector("form");
    const dialogCloseButton = form.querySelector(".close-button");
    const dialogAddButton = form.querySelector(".add-button");
    const booksContainer = document.querySelector(".books");


    function displayBooks(){

        for(let i = 0; i < library.getLength(); i++){
            
            let newBook = createBookCard(i);
            booksContainer.appendChild(newBook);
    
        }
    }

    function createBookCard(i){

        const newBook = document.createElement("div");
        newBook.setAttribute("class", "book");
        newBook.setAttribute("data-index-number", i);
        const book = library.getIndex(i);
        for(const property in book){
    
            if(book.hasOwnProperty(property) && typeof book[property] !== "function"){
                
                console.log("Creating boook div");
                let textDiv = createBookDiv(property, book);
                newBook.appendChild(textDiv);
            }
        }
    
        const readButton = createReadButton();
        newBook.appendChild(readButton);
    
        const deleteButton = createDeleteButton();
        newBook.appendChild(deleteButton);
        return newBook;
    }

    function createBookDiv(property, book){

        let textDiv = document.createElement("div");
        if(property === 'author'){
            let h3 = document.createElement("h4");
            h3.textContent = `By ${book[property]}`;
            textDiv.appendChild(h3);
        } else if (property === 'title'){
            let h2 = document.createElement("h2");
            h2.textContent = `${book[property]}`;
            textDiv.appendChild(h2);
        } else if(property === 'pages'){
            textDiv.textContent = `${property.charAt(0).toUpperCase() + property.slice(1)}: ${book[property]}`;
        
        } else if(book[property] === true){
            textDiv.textContent = "Status: Read"
        } else{
            textDiv.textContent = "Status: Not Read";
        }
        return textDiv;
    
    }
    
    
    function clearBooks(){
        let booksContainer = document.querySelector(".books");
        while(booksContainer.hasChildNodes()){
            booksContainer.removeChild(booksContainer.firstChild);
        }
    }

    function createButton(buttonType){
        const newButton = document.createElement("button");
        newButton.textContent = buttonType;
        newButton.setAttribute("class", "book-button");
        return newButton;
    }
    

    function createReadButton(){
        const newButton = createButton("Toggle Status");
        newButton.addEventListener("click", (e) => {
        
            let index = getIndexNumber(e);
            library.toggleRead(index);
            clearBooks();
            displayBooks();
        });
    
        return newButton;
    }

    function createDeleteButton(){

        const newButton = createButton("Delete");
        newButton.addEventListener("click", (e) => {
        
            let index = getIndexNumber(e);
            library.removeIndexFromLibrary(index);
            clearBooks();
            displayBooks();
        });
    
        return newButton;
    }

    function getIndexNumber(e){
        let parent = e.target.parentElement;
        if(parent){
            return parent.dataset.indexNumber;
        }
    }


    /* EVENT LISTENERS */
    window.addEventListener("load", () => {
        library.addBookToLibrary("J.R.R Tolkien", "The Hobbit", 295, true);
        library.addBookToLibrary("J.R.R Tolkien", "The Fellowship of the Ring", 390, true);
        library.addBookToLibrary("J.R.R Tolkien", "The Two Towers", 426, true);
        library.addBookToLibrary("Fyodor Dostoevsky", "Crime and Punishment", 472, true);
        library.addBookToLibrary("Fyodor Dostoevsky", "The Brothers Karamazov", 864, false);
        displayBooks();
    })
    
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
    
            library.addBookToLibrary(author, title, pageCount, isRead);
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
    

})(new Library());