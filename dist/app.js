"use strict";
class RegistrationForm {
    form;
    output;
    constructor() {
        this.form = document.getElementById("userDataForm");
        this.output = document.getElementById("output");
        // Bind the submit handler to `this`
        this.form.addEventListener("submit", this.autoBind(this.handleSubmit));
    }
    autoBind(fn) {
        return fn.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        // Extract form data
        const fullName = this.form.querySelector('input[name="full_name"]').value.trim();
        const username = this.form.querySelector('input[name="username"]').value.trim();
        const email = this.form.querySelector('input[name="email"]').value.trim();
        const phone = this.form.querySelector('input[name="phone"]').value.trim();
        const password = this.form.querySelector('input[name="password"]').value.trim();
        const confirmPassword = this.form.querySelector('input[name="confirm_password"]').value.trim();
        const gender = this.form.querySelector('input[name="gender"]:checked')?.value;
        // Validate the form
        if (fullName.length < 10 || !/^[a-zA-Z\s]+$/.test(fullName)) {
            this.displayError("Full Name is required.");
            return;
        }
        if (username.length < 3 || /\s/.test(username)) {
            this.displayError("Username is required.");
            return;
        }
        if (!email || !this.validateEmail(email)) {
            this.displayError("A valid Email is required.");
            return;
        }
        if (!phone || !this.validatePhone(phone)) {
            this.displayError("A valid Phone Number is required.");
            return;
        }
        if (!password || password.length < 6) {
            this.displayError("Password must be at least 6 characters long.");
            return;
        }
        if (password !== confirmPassword) {
            this.displayError("Passwords do not match.");
            return;
        }
        if (!gender) {
            this.displayError("Please select a Gender.");
            return;
        }
        // Success: Display form data
        this.displaySuccess({
            fullName,
            username,
            email,
            phone,
            gender,
        });
    }
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    validatePhone(phone) {
        const phoneRegex = /^\d{10}$/; // Example: Validates 10-digit phone numbers
        return phoneRegex.test(phone);
    }
    displayError(message) {
        this.output.innerHTML = `<p style="color: red;">${message}</p>`;
    }
    displaySuccess(data) {
        this.form.reset();
        //  alert(registration successful!!)
        // this.output.innerHTML = `
        //   <p style="color: green;">Registration Successful!</p>
        //   <pre>${JSON.stringify(data, null, 2)}</pre>
        // `;
    }
}
// private RegistrationForm(); void {
//   this.form.reset();
// }
// Initialize the registration form logic
document.addEventListener("DOMContentLoaded", () => {
    new RegistrationForm();
});
//# sourceMappingURL=app.js.map