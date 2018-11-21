
{
    
let title = "";  
let note = ""; 
let editedIndex;
let editedTitle;
let editedNote;
let storeArr = [];
let storeArrLen;
let savedNotes = JSON.parse(localStorage.getItem('myNotes'));

if (savedNotes !== null) {
    storeArr = savedNotes;
    renderList();
}

document.getElementById('filterInput').addEventListener("keyup", filterList);
document.getElementById('title').addEventListener("keyup", titleInput);
document.getElementById('note').addEventListener("keyup", noteInput);
document.getElementById('submitnote').addEventListener("click", addnote);
document.getElementById('saveBtn').addEventListener("click", saveAllNotes);
document.getElementById('delBtn').addEventListener("click", deleteAllNotes);
document.getElementById('cross').addEventListener("click", closeModal);
document.getElementById('titleEdit').addEventListener("input", editTitleInput);
document.getElementById('noteEdit').addEventListener("input", editNoteInput);
document.getElementById('saveEdit').addEventListener("click", saveEdit);



function titleInput() {
    title = document.getElementById('title').value;
}


function noteInput() {
    note = document.getElementById('note').value;
}


function addnote() {
    console.log(title);
    console.log(note);

    let noteObj = {
        title: title,
        note: note
    }

    storeArr.push(noteObj);

     document.getElementById('title').value = ""
     document.getElementById('note').value = ""
     title = "";
     note = "";


     renderList();

}


function renderList() {

    storeArrLen = storeArr.length;
    let x = "";

        for (i in storeArr) {
            x += "<div class='note'" + "id='note" + i + "'"  + ">" +
             "<h3>" + storeArr[i].title + "</h3>" +
              "<p>" + storeArr[i].note + "</p>" + 
              "<button id='editBtn' onClick='editNote(" + i + ")'>edit</button>" +
              "<button id='delBtn' onClick='removeNote(" + i + ")'>delete</button>" +

              "</div>";

        }

        document.getElementById("notelist").innerHTML = x;

}



function editNote(i) { 
    console.log(i);
    console.log('triggered');

    document.getElementById('id01').style.display='block';

    let eleId = 'note' + i;
    editedIndex = i;

   

     editedTitle = storeArr[i].title;
     editedNote = storeArr[i].note;

   
    document.getElementById('titleEdit').value = editedTitle;
    document.getElementById('noteEdit').value = editedNote;

}


function closeModal() {
    document.getElementById('id01').style.display='none';
}


function editTitleInput() {

    editedTitle = document.getElementById('titleEdit').value;

}

function editNoteInput() {
    editedNote =  document.getElementById('noteEdit').value;
}


function saveEdit() {

    let editedObj = {
        title: editedTitle,
        note: editedNote
    }

    storeArr[editedIndex] = editedObj;
    document.getElementById('id01').style.display='none'

    localStorage.setItem("myNotes", JSON.stringify(storeArr));
    renderList();

}

function removeNote(i){

    let delItem = i;

    storeArr.splice(delItem, 1);

    localStorage.setItem("myNotes", JSON.stringify(storeArr));

    renderList();

}


function filterList() {

    let filterInput = document.getElementById('filterInput').value.toUpperCase();
    let notelist = document.getElementById('notelist');
    let note = notelist.getElementsByClassName('note');

    for (i = 0; i < note.length; i++) {
       
        let itemNote = note[i].getElementsByTagName("h3")[0];
        let itemTitle = note[i].getElementsByTagName("p")[0];
        if (itemTitle || itemNote) {
          if (itemTitle.innerHTML.toUpperCase().indexOf(filterInput) > -1 || itemNote.innerHTML.toUpperCase().indexOf(filterInput) > -1) {
            note[i].style.display = "";
          } else {
            note[i].style.display = "none";
          }
        } 
      }
}


function saveAllNotes() {

    if(storeArrLen > 0) {

    localStorage.setItem("myNotes", JSON.stringify(storeArr));

    document.getElementById('storemsg').innerHTML = "Saved!"
    }

}

function deleteAllNotes() {

    if(storeArrLen > 0) {

    localStorage.clear();

    document.getElementById('storemsg').innerHTML = "All Deleted!"

    document.getElementById("notelist").innerHTML = "";

    }

}



}

