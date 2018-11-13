

var title = "";  
var note = ""; 

var editedIndex;
var editedTitle;
var editedNote;

var storeArr = [];

var storeArrLen;

var stickynoteObj;

var savedNotes = JSON.parse(localStorage.getItem('myNotes'));

if (savedNotes !== null){

    storeArr = savedNotes;
    renderList();

}



function titleInput(){
    title = document.getElementById('title').value;
}


function noteInput(){
    note = document.getElementById('note').value;
}



function addnote(){
    console.log(title);
    console.log(note);

    var noteObj = {
        title: title,
        note: note
    }

    storeArr.push(noteObj);

    // console.log(storeArr);

     document.getElementById('title').value = ""
     document.getElementById('note').value = ""
     title = "";
     note = "";

   

     renderList();


}





function renderList(){


    storeArrLen = storeArr.length;
    var x = "";



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



function editNote(i){
    console.log(i);
    console.log('triggered');

    document.getElementById('id01').style.display='block';

    var eleId = 'note' + i;
    editedIndex = i;

   

     editedTitle = storeArr[i].title;
     editedNote = storeArr[i].note;

   
    document.getElementById('titleEdit').value = editedTitle;
    document.getElementById('noteEdit').value = editedNote;




}

function editTitleInput(){

    editedTitle = document.getElementById('titleEdit').value;

}

function editNoteInput(){
    editedNote =  document.getElementById('noteEdit').value;
}


function saveEdit() {

    var editedObj = {
        title: editedTitle,
        note: editedNote
    }

    storeArr[editedIndex] = editedObj;
    document.getElementById('id01').style.display='none'

    localStorage.setItem("myNotes", JSON.stringify(storeArr));
    renderList();


}

function removeNote(i){

    var delItem = i;

    storeArr.splice(delItem, 1);

    localStorage.setItem("myNotes", JSON.stringify(storeArr));


    renderList();


}


function filterList(){

    var filterInput = document.getElementById('filterInput').value.toUpperCase();

    var notelist = document.getElementById('notelist');
    var note = notelist.getElementsByClassName('note');

    for (i = 0; i < note.length; i++) {
       
        var itemNote = note[i].getElementsByTagName("h3")[0];
        var itemTitle = note[i].getElementsByTagName("p")[0];
        if (itemTitle || itemNote) {
          if (itemTitle.innerHTML.toUpperCase().indexOf(filterInput) > -1 || itemNote.innerHTML.toUpperCase().indexOf(filterInput) > -1) {
            note[i].style.display = "";
          } else {
            note[i].style.display = "none";
          }
        } 
      }

}


function saveAllNotes(){

    if(storeArrLen > 0) {

    localStorage.setItem("myNotes", JSON.stringify(storeArr));

    document.getElementById('storemsg').innerHTML = "Saved!"
    }

}

function deleteAllNotes(){

    if(storeArrLen > 0) {

    localStorage.clear();

    document.getElementById('storemsg').innerHTML = "All Deleted!"

    document.getElementById("notelist").innerHTML = "";

    }


}





