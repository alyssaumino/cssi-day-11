let googleUser = null;

window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            //this code runs if the user is logged in
            console.log("logged in as", user.displayName);
            googleUser = user;
            document.querySelector("#greeting").innerHTML += ", " + googleUser.displayName + "?";
        }
        else {
            //this code runs if the user is not logged in
            console.log("not logged in");
        }
    })

    const createNoteButton = document.querySelector("#createNoteButton");
    createNoteButton.addEventListener("click", () => {
        const noteTitle = document.querySelector("#noteTitle").value;
        const noteText = document.querySelector("#noteText").value;
        const timestamp = new Date();
        console.log(noteTitle, noteText, timestamp);

        //write these values to the database
        firebase.database().ref(`/users/${googleUser.uid}`).push({
            title: noteTitle,
            text: noteText,
            created: timestamp
        }).then(() => {
            console.log("database write successful");
            document.querySelector("#noteTitle").value = "";
            document.querySelector("#noteText").value = "";
        })
        .catch(error => {
            console.log("error writing new note:", error);
        })
    })
}