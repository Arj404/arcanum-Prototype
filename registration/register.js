document.querySelector("#register").addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    var name = document.querySelector("#name").value;
    var rollno = document.querySelector("#rollno").value;
    var credential = firebase.auth.EmailAuthProvider.credential(
        email,
        password
    );
    console.log("script working");
    dbUsers = firebase.database().ref("users");
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(error);
            alert(errorMessage);
        })
        .then(res => {
            if (res) {
                user = firebase.auth().currentUser;
                // here you can use either the returned user object or       firebase.auth().currentUser. I will use the returned user object
                if (user) {
                    data = {
                        displayName: name,
                        rollNumber: rollno,
                        uid: user.uid
                    };
                    dbUsers.push(data);
                    user.updateProfile({
                        displayName: name
                    }).then(
                        alert("Succesful, go to login now.") // perform any other operation
                    );
                }
            }
        });
});
