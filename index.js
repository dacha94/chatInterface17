//предыдущая попытка 
// let commets = [];
// loadComments();

// document.getElementById('comment-add').onclick = function(){
//     event.preventDefault();
//     let commentName = document.getElementById('comment-name');
//     let commentBody = document.getElementById('comment-body');

//     let comment = {
//         name : commentName.value,
//         body : commentName.value,
//         time : Math.floor(Date.now()/1000) //возможно надо будет добавить floor
//     }
//     commentName.value = '';
//     commentBody.value = '';
//     comment.push(comment);
//     saveComments(); // для сохранения в локалстор
//     showComments(); // показ комментов 

// }

// function saveComments(){
//     localStorage.setItem('comments', JSON.stringify(commets)); // закинули в локал
// }

// function loadComments(){
//     if (localStorage.getItem('comments')) comment = JSON.parse(localStorage.getItem('comments'));
//     showComments();
// }

// function showComments(){
//     let commentField = document.getElementById('comment-field');
//     let out = '';
//     comments.forEach(function(item){
//         out += `<p class="text-center small"><en>${timeConverter(item.time)}</em></p>`;
//         out += `<p class="alert alert-primary">${item.name}</p>`;
//         out += `<p class="alert alert-success">${item.body}</p>`;
//     });
// }
// function timeConverter(UNIX_timestamp){
//     let a = new Date(UNIX_timestamp * 1000);
//     let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     let year = a.getFullYear();
//     let month = months[a.getMonth()];
//     let date = a.getDate();
//     let hour = a.getHours();
//     let min = a.getMinutes();
//     let sec = a.getSeconds();
//     let time= date + '' + month + '' + hour + ':' + min + ':' + sec;
//     return time;
// }

// let arrStor = []

// document.getElementById('button').onclick = (e) =>{

//     e.preventDefault()
//     //собираем введенные в форму значения
//     const author = document.getElementById("author").value;
//     const comment = document.getElementById("comment").value;

//     let date = new Date();

//     //Форматироание даты
//     date = `${new Intl.DateTimeFormat('ru-RU', {day:'2-digit', month:'2-digit'}).format(date)} в ${new Intl.DateTimeFormat('ru-RU', {hour:'2-digit', minute:'2-digit'}).format(date)}`;

//     if(author && comment){
//         // Генерация окошка 
//         const newCard = generateCard(author, date, comment)
//         document.querySelector('#chat').appendChild(newCard)

//         //Добавляем в локал
//         addElementToLocalStorage(author, date, comment)

//         //Очищаем коммент
//         document.getElementById("comment").value = '';
//         }
//     };

// // локал
// getArrFromLocalStorage = () =>{

// let collection = JSON.parse(localStorage.getItem("chatMsgsCollection"));

//     if(collection){
//         arrStor = collection;

//     const lastItem = collection[collection.length - 1];
//     const lastAuthor = lastItem[0];

//     document.getElementById("author").value = lastAuthor;
//     }
// }

// setArrToLocalStorage = () =>{
//     localStorage.setItem("chatMsgsCollection", JSON.stringify(arrStor));
// }

// addElementToLocalStorage = (author, date, comment) => {
//     arrStor.push([author, date, comment])
//     setArrToLocalStorage()
// }

// //получение коллекции при загрузке странички 
// document.addEventListener("DOMContentLoaded",function(){
//     getComments()
// })

// function getComments() {
//     // список всех комментариев
//     getArrFromLocalStorage()
        
//     //     function showComments () {
//     //         let chatic = document.getElementById('chat');
//     //         let out = ''; 
//     //         comments.forEach(function(item){
//     //             out += `<div class="text-center small">${timeConverter(item.time)}</p>`;
//     //             out += `<div class="alert alert-primary">${item.author}</div>`;
//     //             out += `<div class="alert alert-primary">${item.comment}</div>`;
//     // }}

// document.addEventListener("DOMContentLoaded", function (){
//     getArrFromLocalStorage();
// })}

let arrStor  = []

document.getElementById('button').onclick = (e) =>{

    e.preventDefault()

    const author = document.getElementById("author").value;
    const comment = document.getElementById("comment").value;
    const photo = document.getElementById('photo').src;

    let date = new Date();

    // формат даты 
    date = `${new Intl.DateTimeFormat('ru-RU', {day:'2-digit', month:'2-digit'}).format(date)} в ${new Intl.DateTimeFormat('ru-RU', {hour:'2-digit', minute:'2-digit'}).format(date)}`;

    if(author && photo && comment){
        // добавляем фото
        const newFoto = generateCard(author, date, photo, comment)
        document.querySelector('#chat').appendChild(newFoto)

        // добавляем в стор
        addElementToLocalStorage(author, date, photo, comment)
        document.getElementById("comment").value = '';
        }
    };

// сообщение на форуме и оконце
const generateCard = (author, date, photo, comment) =>{

    let card = document.createElement('div')
    card.classList.add("card");

    let card__image = document.createElement('img')
    card__image.classList.add("card__image");
    card__image.src = photo

    let card__main = document.createElement('div')
    card__main.classList.add("card__main")

    let card__info = document.createElement('div')
    card__info.classList.add("card__info")

    let card__title = document.createElement('h1')
    card__title.classList.add("card__title")
    card__title.innerText = author

    let card__date = document.createElement('div')
    card__date.classList.add("card__date")
    card__date.innerText = date

    let card__text = document.createElement('p')
    card__text.classList.add("card__text")
    card__text.innerText = comment

    let card__del = document.createElement('button')
    card__del.classList.add("card__del");
    card__del.innerHTML="delite"

    card.appendChild(card__image)
    card.appendChild(card__main)

    card__main.appendChild(card__info)
    card__main.appendChild(card__text)
    card__main.appendChild(card__del)

    card__info.appendChild(card__title)
    card__info.appendChild(card__date)

    return card
}

// вставка авы 
document.getElementById('photo').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (function (file) {
        return function (e) {
            const r = e.target;
            const photo = r.result

            document.getElementById('photo').src = photo
        };
    })(file);

    reader.readAsDataURL(file);
})

// локал стор
getArrFromLocalStorage = () =>{

let collection = JSON.parse(localStorage.getItem("chatInterfaceMsgsCollection"));

    if(collection){
        arrStor = collection;

    const lastItem = collection[collection.length - 1];
    const lastAuthor = lastItem[0];
    const lastPhoto = lastItem[2];

    document.getElementById("author").value = lastAuthor;
    document.getElementById('photo').src = lastPhoto;
    }
}

setArrToLocalStorage = () =>{
    localStorage.setItem("chaInterfacetMsgsCollection", JSON.stringify(arrStor));
}

addElementToLocalStorage = (author, date, photo, comment) => {
    arrStor.push([author, date, photo, comment])
    setArrToLocalStorage()
}

document.addEventListener("DOMContentLoaded",function(){
    getComments()
})

// комменты 
function getComments() {
    getArrFromLocalStorage()

    for( let i = 0; i < arrStor.length; i++){
        const newFoto = generateCard(arrStor[i][0],arrStor[i][1], arrStor[i][2], arrStor[i][3] )
        document.querySelector('#chat').appendChild(newFoto)
    }
}

document.addEventListener("DOMContentLoaded", function (){
    getArrFromLocalStorage();
})
