// Initialize Firebase
// Add your Firebase configuration here

// FirebaseUI configuration
var uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
};

// Initialize the FirebaseUI widget
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);

// Listen for auth state changes
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in
        // Show dashboard and hide login section
        document.getElementById('dashboard-section').classList.remove('d-none');
        document.getElementById('login-section').classList.add('d-none');

        // Display user's name in the dashboard
        document.getElementById('student-name').textContent = 'Welcome, ' + user.displayName + '!';

        // Fetch student's score from Firebase Realtime Database and display in score panel
        var scoreRef = firebase.database().ref('users/' + user.uid + '/score');
        scoreRef.on('value', function (snapshot) {
            document.getElementById('score-panel').textContent = 'Your Score: ' + snapshot.val();
        });

        // Show contact section
        document.getElementById('contact-section').classList.remove('d-none');

    } else {
        // User is signed out
        // Hide dashboard and show login section
        document.getElementById('dashboard-section').classList.add('d-none');
        document.getElementById('login-section').classList.remove('d-none');

        // Hide contact section
        document.getElementById('contact-section').classList.add('d-none');
    }
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    // Get form input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;


    // Add contact form data to Firebase Realtime Database
    var contactRef = firebase.database().ref('contact');
    contactRef.push({
        name: name,
        email: email,
        message: message
    });
});