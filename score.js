firebase.auth().onAuthStateChanged(function(user) {
    window.user = user;
    // Step 1:
    //  If no user, sign in anonymously with firebase.auth().signInAnonymously()
    //  If there is a user, log out out user details for debugging purposes.
    if (user) {
        console.log("hi");
        // var date = newdate();
        // console.log("ubmission" + submission);
        // console.log("correct ans =" + correctAns);

        db = firebase.database().ref("responses");
        var flag = 0;

        db.once("value", res => {
            // console.log(res.key);
            // console.log(res.val());
            // console.log(res.val().questionNumber);
            var score = 0;
            // console.log(res.val().uid, question);
            res.forEach(element => {
                question = element.val().questionNumber;
                if (element.val().uid === user.uid) {
                    switch (question) {
                        case 1:
                            score = 10;
                            break;
                        case 2:
                            score = 20;
                            break;
                        case 3:
                            score = 30;
                            break;
                        case 4:
                            score = 50;
                            break;
                        case 5:
                            score = 70;
                            break;
                        case 6:
                            score = 90;
                            break;
                        case 7:
                            score = 120;
                            break;
                        case 8:
                            score = 150;
                            break;
                        case 9:
                            score = 180;
                            break;
                    }
                }
            });
            console.log(user.displayName);
            dataScore = {
                score: score,
                uid: user.uid,
                name: user.displayName
            };
            ref = firebase.database().ref("scores");
            // ref.once("value", function(snap) {
            //     if (!snap.hasChild(user.uid)) {
            //         console.log("yay");
            //         // ref.push(dataScore);
            //     } else {
            //         console.log("lol");
            //     }
            // });
            ref.orderByChild("uid")
                .equalTo(user.uid)

                .once("value", res => {
                    if (res.val() === null) {
                        ref.push(dataScore);
                    }
                    // console.log(res.val().score);
                    if (res.exists()) {
                        // console.log("yep");
                        // console.log(res.val());

                        ref.orderByChild("uid").on("child_added", resp => {
                            key = resp.key;
                            // console.log(key);
                            // console.log(resp.val().uid);
                            if (resp.val().uid === user.uid) {
                                dbTemp = firebase
                                    .database()
                                    .ref("scores/" + key);
                                dbTemp.update(dataScore);
                            }
                        });
                        // console.log("updated score");
                    }
                });
            // scoreDb.orderByChild("uid").on("child_added", res => {
            //     key = res.key;
            //     flag = 0;
            //     dbTemp = firebase.database().ref("scores/" + key);
            //     dbTemp.on("value", resp => {
            //         // console.log(key);
            //         if (resp.val().uid === user.uid) {
            //             dbTemp.update(dataScore);
            //             console.log("updated score");
            //             flag = 1;
            //         }
            //     });
            //     dbTemp2 = scoreDb.child(`${key}`);
            //     dbTemp2.on("value", function(e) {
            //         console.log(e.val());
            //         console.log(e.key);
            //         if (e.key) {
            //             console.log("exists");
            //         } else {
            //             console.log("doesnt");
            //         }
            //     });

            // console.log(res.val());
            // });

            // ref.push(dataScore);
            // console.log(score);
        });
    } else {
        alert("Sign in");
    }
});
