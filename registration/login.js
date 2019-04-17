var mydiv = document.querySelector("#ins-button");
var atag = document.createElement("a");

atag.setAttribute("href", "../instruction.html");
atag.innerHTML = "<button id=\"next-button\" class=\"fadeIn sixth\">proceed to instructions..</button><br>";

document.querySelector("#login").addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    var credential = firebase.auth.EmailAuthProvider.credential(
        email,
        password
    );
    var auth = firebase.auth();
    var currentUser = auth.currentUser;
    var errorCode = 1;
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(alert("logged in, proceed to instructions"))
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert(errorMessage);
        })
        .then(res => {
            console.log(res);
            if (res) {
                mydiv.appendChild(atag);
            }
        });
    firebase.auth().onAuthStateChanged(function(user) {
        window.user = user;
        if (user) {
        } else {
        }
        // Step 1:
        //  If no user, sign in anonymously with firebase.auth().signInAnonymously()
        //  If there is a user, log out out user details for debugging purposes.
    });

    // Step 2
    //  Get a credential with firebase.auth.emailAuthProvider.credential(emailInput.value, passwordInput.value)
    //  If there is no current user, log in with auth.signInWithCredential(credential)
    //  If there is a current user an it's anonymous, atttempt to link the new user with firebase.auth().currentUser.link(credential)
    //  The user link will fail if the user has already been created, so catch the error and sign in.
});
