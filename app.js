const addBox = document.querySelector('.add-box');
const popupBox = document.querySelector('.popup-box');
const popupTitle = popupBox.querySelector('header p');
const closeIcon = popupBox.querySelector('header i');
const titleTag = popupBox.querySelector('input');
const descTag = popupBox.querySelector('textarea');
const addBtn = popupBox.querySelector('button');

const months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const notes = JSON.parse(localStorage.getItem('notes') || '[]');

let isUpdate = false;
let updateID;

addBox.addEventListener('click', ()=>{
    titleTag.focus();
    popupBox.classList.add('show');
})

closeIcon.addEventListener('click', ()=>{
    titleTag.value = '';
    descTag.value = '';
    addBtn.innerText = 'Add Note';
    popupTitle.innerText = 'Add a new Note';
    popupBox.classList.remove('show');
    isUpdate=false;
})

function showNotes(){
    document.querySelectorAll('.note')
    .forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `
        <li class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                    <i onclick= 'showMenu(this)' class="fa-solid fa-ellipsis"></i>
                    <ul class="menu">
                        <li onclick= "updateNote(${index}, '${note.title}', '${note.description}')"><i class="fa-solid fa-pen"></i>Edit</li>

                        <li onclick='deleteNote(${index})'><i class="fa-solid fa-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </li>
    `;
    addBox.insertAdjacentHTML('afterend', liTag)
    });
}

showNotes()

function showMenu(elem){
    elem.parentElement.classList.add('show');
    document.addEventListener('click', e =>{
        if(e.target.tagName != 'I' || e.target != elem){
            elem.parentElement.classList.remove('show');
        }
    })
}

function deleteNote(noteId){
    let confirmDel = confirm('Are you sure you want to delete this note?');
    if(!confirmDel)return;
    notes.splice(noteId, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc){
    isUpdate = true;
    updateID = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = 'update Note';
    popupTitle.innerText = 'update a Note';
    console.log(noteId, title , desc)
}

addBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let noteTitle = titleTag.value;
    let noteDesc = descTag.value;

    if(noteTitle || noteDesc){
        let dateObj = new Date();
        let month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date:`${month} ${day}, ${year}`
        }
        if(!isUpdate){
            notes.push(noteInfo);
        }else{
            isUpdate = false;
            notes[updateID] = noteInfo;
        }
        localStorage.setItem('notes', JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
})























































