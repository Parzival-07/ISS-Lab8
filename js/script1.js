const form = document.getElementById('registrationForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

const emailRegex = /^[^\s@]+@(gmail\.com|students\.iiit\.ac\.in|research\.iiit\.ac\.in)$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Function to display error messages
function showError(inputElement, errorElement, message) {
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  inputElement.style.borderColor = 'red'; 
}

// Function to clear error messages
function clearError(inputElement, errorElement) {
  errorElement.textContent = '';
  errorElement.style.display = 'none';
  inputElement.style.borderColor = '#ddd'; 
}

fullNameInput.addEventListener('input', () => clearError(fullNameInput, fullNameError));
emailInput.addEventListener('input', () => clearError(emailInput, emailError));
passwordInput.addEventListener('input', () => clearError(passwordInput, passwordError));
confirmPasswordInput.addEventListener('input', () => clearError(confirmPasswordInput, confirmPasswordError));

form.addEventListener('submit', function(event) {
  event.preventDefault(); 

  let isValid = true;

  if (fullNameInput.value.trim() === '') {
    showError(fullNameInput, fullNameError, 'Full Name is required.');
    isValid = false;
  } else {
    clearError(fullNameInput, fullNameError);
  }

  if (!emailRegex.test(emailInput.value.trim())) {
    showError(emailInput, emailError, 'Please enter a valid email address (gmail.com, students.iiit.ac.in, or research.iiit.ac.in).');
    isValid = false;
  } else {
    clearError(emailInput, emailError);
  }

  const password = passwordInput.value;
  if (!passwordRegex.test(password)) {
    showError(passwordInput, passwordError, 'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one number.');
    isValid = false;
  } else {
    clearError(passwordInput, passwordError);
  }

  const confirmPassword = confirmPasswordInput.value;
  if (password !== confirmPassword || confirmPassword === '') {
    showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match.');
    isValid = false;
  } else {
    if (passwordRegex.test(password)) {
        clearError(confirmPasswordInput, confirmPasswordError);
    }
  }

  // Handle Success
  if (isValid) {
    alert('Registration successful!');
    form.reset(); 
    clearError(fullNameInput, fullNameError);
    clearError(emailInput, emailError);
    clearError(passwordInput, passwordError);
    clearError(confirmPasswordInput, confirmPasswordError);
  }
});