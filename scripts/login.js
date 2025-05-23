// African countries 
const africanCountries = [
    "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", 
    "Cabo Verde", "Cameroon", "Central African Republic", "Chad", 
    "Comoros", "Congo", "Côte d'Ivoire", "Djibouti", "Democratic Republic of the Congo", 
    "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", 
    "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", 
    "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", 
    "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", 
    "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", 
    "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", 
    "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", 
    "Tunisia", "Uganda", "Zambia", "Zimbabwe"
];

document.addEventListener('DOMContentLoaded', function() {
    //  nationality dropdown
    const nationalitySelect = document.getElementById('nationality');
    africanCountries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        nationalitySelect.appendChild(option);
    });

    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        alert('Login functionality will be included soon sorry for any inconvenience🙌😂.'); //to be removed
    });

    document.getElementById('signupForm').addEventListener('submit', function(e) {
        // Check password strength before submission
        const strength = checkPasswordStrength();
        if (strength === "Weak") {
            e.preventDefault();
            alert("Please choose a stronger password (at least 8 characters, with uppercase, lowercase, number, and special character).");
            document.getElementById('signupPassword').focus();
            return;
        }

        // Validate passwords match if not rejects
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            e.preventDefault();
            alert('Passwords do not match!');
            return;
        }

        // If password is strong and matches, show verification modal
        e.preventDefault(); 
        showVerificationModal();
    });
});

function showSignup() {
    document.querySelector('.login-form').classList.add('hidden');
    document.querySelector('.signup-form').classList.remove('hidden');
    document.querySelector('.signup-form').style.animation = 'fadeIn 0.5s ease-in-out';
}

function showLogin() {
    document.querySelector('.signup-form').classList.add('hidden');
    document.querySelector('.login-form').classList.remove('hidden');
    document.querySelector('.login-form').style.animation = 'fadeIn 0.5s ease-in-out';
}

function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function showVerificationModal() {
    document.querySelector('.verification-modal').classList.add('active');
}

function closeModal() {
    document.querySelector('.verification-modal').classList.remove('active');
    showLogin();    // To Switch to log in after sign up
}

// Alerts Social login functions
function loginWithGoogle() {
    alert('Sorry! login using google account will be implemented soon, Please sign up /log in with email and password');
}

function loginWithGithub() {
    alert('Sorry! login using Github account will be implemented soon, Please sign up /log in with email and password');
}

function loginWithFacebook() {
    alert('Sorry! login using facebook account will be implemented soon, Please sign up /log in with email and password');
}

// Password strength checker
function checkPasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;

    let feedback = "Weak";
    if (strength >= 5) feedback = "Strong";
    else if (strength >= 3) feedback = "Medium";

    document.getElementById('password-strength').textContent = feedback;
    document.getElementById('password-strength').style.color =
        feedback === "Strong" ? "green" : feedback === "Medium" ? "orange" : "red";
    return feedback;
}

// forgot password option
function forgotPassword() {
    alert("Password reset instructions will be sent to your email (feature coming soon).");
}
//to add reset logic here 