// VALIDATES INPUT FIELDS ON THE FORM
// ERROR MESSAGES ARE DISPLAYED IF FIELDS ARE LEFT EMPTY
// FIELD VALUES ARE READ FROM THE INPUT FIELDS IN THE HTML DOCUMENT

let validateForm = () => {
    const author = document.getElementById("author").value;
    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const reviews = document.getElementById("reviews").value;

    // FIELD VALIDATION FOR AUTHOR INPUT

    if (author === "") {
        alert("Please enter an Author")
        return false;
    }

    // FIELD VALIDATION FOR TITLE INPUT

    if (title === "") {
        alert("Please enter a Title")
        return false;
    }

    // FIELD VALIDATION FOR GENRE INPUT

    if (genre === "") {
        alert("Please enter a Genre")
        return false;
    }

    // FIELD VALIDATION FOR REVIEW INPUT

    if (reviews === "") {
        alert("Please enter a Review")
        return false;
    }

    return true;
}

// FUNCTION TO DISPLAY ALL DATA IN THE SESSION STORAGE - DISPLAYED IN TABLE VIEW
// DATA IS READ FROM THE SESSION STORAGE

let showData = () => {
    let bookList;
    if (sessionStorage.getItem("bookList") == null) {
        bookList = []
    }
    else {
        bookList = JSON.parse(sessionStorage.getItem("bookList"));
    }

    let html = "";

    // BOOK INFORMATION IN TABLE

    bookList.forEach(function (element, index) {
        html += "<tr>"
        html += "<td>" + element.author + "</td>";
        html += "<td>" + element.title + "</td>";
        html += "<td>" + element.genre + "</td>";
        html += "<td>" + element.reviews + "</td>";

        // EDIT AND DELETE BUTTONS AND FUCTIONS FOR EDITING AND DELETING BOOK ITEMS

        html +=
            '<td><button onclick="deleteData(' + index +
            ')" class="btn btn-danger">Delete</button><button onclick = "updateBook(' + index +
            ')" class="btn btn-warning m-2">Edit</button></td>'
        html += "</tr>"
    })
    document.querySelector("#crudTable tbody").innerHTML = html;
}
// ALL BOOK INFO IS LOADED ON PAGE LOAD

document.onload = showData();

// FUNCTION TO ADD BOOK INFORMATION

let addBook = () => {

    // IF ALL FORM INPUT FIELDS ARE VALIDATED ONCE INPUT HAS BEEN READ

    if (validateForm() === true) {
        const author = document.getElementById("author").value;
        const title = document.getElementById("title").value;
        const genre = document.getElementById("genre").value;
        const reviews = document.getElementById("reviews").value;

        // IF SESSION STORAGE IS EMPTY, NEW BOOK INTO ENTERED IS STORED IN SESSION STORAGE

        let bookList;
        if (sessionStorage.getItem("bookList") == null) {
            bookList = [];
        }
        else {
            bookList = JSON.parse(sessionStorage.getItem("bookList"));
        }

        // NEW BOOK INFORMATION IS PUSHED / STORED IN THE BOOKLIST ARRAY

        bookList.push({
            author: author,
            title: title,
            genre: genre,
            reviews: reviews
        });

        // BOOK DATA IS STORED IN SESSION STORAGE

        sessionStorage.setItem("bookList", JSON.stringify(bookList))
        showData();
        document.getElementById("author").value = ""
        document.getElementById("title").value = ""
        document.getElementById("genre").value = ""
        document.getElementById("reviews").value = ""

    }
}

// FUNCTION TO DELETE BOOK ITEM

let deleteData = (index) => {

    let bookList;
    if (sessionStorage.getItem("bookList") == null) {
        bookList = []
    }
    else {
        bookList = JSON.parse(sessionStorage.getItem("bookList"));
    }

    // DATA IS CONVERTED TO A STRING VALUES

    bookList.splice(index, 1);
    sessionStorage.setItem("bookList", JSON.stringify(bookList));
    showData();

}

// FUNCTION TO CHANGE / UPDATE DATA OF A BOOK

let updateBook = (index) => {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";
    let bookList;
    if (sessionStorage.getItem("bookList") == null) {
        bookList = []
    }
    else {
        bookList = JSON.parse(sessionStorage.getItem("bookList"));
    }

    // OLD INFORMATION IS RETRIEVED FROM SESSION STORAGE PLACED INTO INPUT FIELDS
    // THIS OLD DATA CAN BE CHANGED AND UPDATED

    document.getElementById("author").value = bookList[index].author;
    document.getElementById("title").value = bookList[index].title;
    document.getElementById("genre").value = bookList[index].genre;
    document.getElementById("reviews").value = bookList[index].reviews;


    // BOOK INFO IS UPDATED AND THE LATEST INFO OVERWRITES OLD DATA

    document.querySelector("#Update").onclick = function () {
        if (validateForm() === true) {
            bookList[index].author = document.getElementById("author").value;
            bookList[index].title = document.getElementById("title").value;
            bookList[index].genre = document.getElementById("genre").value;
            bookList[index].reviews = document.getElementById("reviews").value;

            sessionStorage.setItem("bookList", JSON.stringify(bookList))

            // LASTEST DATA IS NOW DISPLAYED

            showData();

            // ALL INPUT FIELDS ARE CLEARED AND EMPTY FOR NEW DATA TO BE ENTERED FOR NEW BOOKS TO BE ADDED

            document.getElementById("author").value = "";
            document.getElementById("title").value = "";
            document.getElementById("genre").value = "";
            document.getElementById("reviews").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }

}