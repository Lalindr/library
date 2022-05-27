const logicElements = {
    bookArray: [],
}
const domElements = {
    plus: document.querySelector('.plus'),
    form: document.querySelector('.form'),
    card: document.querySelector('.card'),
    mainContainer: document.querySelector('.main-container'),
    bookCardArray: []
}
const formElements = {
    form: document.querySelector('form'),
    title: document.querySelector('#title'),
    author: document.querySelector('#author'),
    pages: document.querySelector('#pages'),
    yes: document.querySelector('input[value="read"]'),
    addBook: document.querySelector('.addBook'),
    cancel: document.querySelector('.close')
}
domElements.plus.addEventListener('click', plusListener);
function plusListener(){
    domElements.form.style.display = 'block';
}
    const Book = {
        title: '',
        author: '',
        pages: 0,
        read: false,
        init: function(title, author, pages, read){
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        }
    }
    formElements.cancel.addEventListener('click', cancelListener);
    function cancelListener(){
        domElements.form.style.display = 'none';
        reset();
    }
    formElements.form.addEventListener('submit', BookListener);
function BookListener(){
    const newBook = Object.create(Book);
    newBook.init(title.value, author.value, pages.value,formElements.yes.checked);
    logicElements.bookArray.push(newBook);
    displayBooks();
    reset();
}
function displayBooks(){
    mainContainerClear();
   logicElements.bookArray.forEach(function(book){
       const bookCard = domElements.card.cloneNode(true);
       bookCard.dataset.index = `${logicElements.bookArray.indexOf(book)}`;
       populateCard(createCard(bookCard), book);
       bookCard.style.display = 'block';
       domElements.mainContainer.appendChild(bookCard);
   })
    
}
function mainContainerClear(){
    const dataDivs = document.querySelectorAll('div[data-index]');
    dataDivs.forEach(div => div.remove());
}
function reset(){
    const inputs = document.querySelectorAll('input');
    inputs.forEach( function(input) {
        input.value = '';
        input.checked = false;
    });
    domElements.form.style.display = 'none';
}
function createCard(bookCard){
    const cardElements = {
        title: bookCard.querySelector('.title'),
        author: bookCard.querySelector('.author'),
        pages: bookCard.querySelector('.pages'),
        read: bookCard.querySelector('.read'),
        cancel: bookCard.querySelector('.close')
    }
    return cardElements;
}
function populateCard(cardElements, bookObj){
    cardElements.title.textContent = bookObj.title;
    cardElements.author.textContent = bookObj.author;
    cardElements.pages.textContent = bookObj.pages;
    cardElements.read.textContent = readStatus(bookObj.read);
    cardElements.read.addEventListener('click', readListener);
    cardElements.cancel.addEventListener('click',cardCancelListener);

}
function cardCancelListener(e){
    logicElements.bookArray.splice(e.composedPath()[1].dataset.index, 1);
    e.composedPath()[1].remove();
}
function readStatus(statement){
    if(statement){
        return "Read";
    }else{
        return "Unread";
    }
}
function readListener(e){
    let read = logicElements.bookArray[e.composedPath()[1].dataset.index].read;
    if(read){
        logicElements.bookArray[e.composedPath()[1].dataset.index].read = false;
    }else{
        logicElements.bookArray[e.composedPath()[1].dataset.index].read = true;
    }
    e.target.textContent = readStatus(read);
}
    