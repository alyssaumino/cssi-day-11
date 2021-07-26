const signInButton = document.querySelector(".button");
signInButton.addEventListener("click", () => {
    console.log("clicked");

    //login authorization: create a popup that asks you to choose which account to sign in with
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user;

        console.log("login success", user);
        window.location = "writeNote.html";
    })
    .catch(error => {
        console.log("login failed", error);
    })
})