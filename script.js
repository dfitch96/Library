

const myLibrary = [];

function Book(author, title, pages, isRead){

    this.author = author;
    this.title = title;
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

}


function displayBooks(){

    let booksContainer = document.querySelector(".books");

    for(let i = 0; i < myLibrary.length; i++){

        let newBook = document.createElement("div");
        newBook.setAttribute("class", "book");

        for(const property in myLibrary[i]){
            if(myLibrary[i].hasOwnProperty(property) && typeof myLibrary[i][property] !== "function"){
                let textDiv = document.createElement("div");
                textDiv.textContent = `${property}: ${myLibrary[i][property]}`;
                newBook.appendChild(textDiv);
            }
        }
        
        booksContainer.appendChild(newBook);
    }


}


addBookToLibrary("J.R.R Tolkien", "The Hobbit", 295, true);
addBookToLibrary("J.R.R Tolkien", "The Followship of the Ring", 395, true);
addBookToLibrary("J.R.R Tolkien", "The Two Towers", 395, true);

for(let i = 0; i < myLibrary.length; i++){
    console.log(myLibrary[i].info());
}


displayBooks();