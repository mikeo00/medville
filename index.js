const form = document.querySelector(".booking");
const otherProblemField = document.getElementById("other-problem");
const otherProblemOption = document.querySelector('input[value="other"]');

const dateOfBirth = document.getElementById("datebirth");
const today = new Date();

const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
dateOfBirth.max = minAgeDate.toISOString().split("T")[0];

const appointmentDate = document.getElementById("appointment");
appointmentDate.min = today.toISOString().split("T")[0];

document.querySelectorAll('input[name="problem"]').forEach((problem) => {
    problem.addEventListener("change", function () {
        if (otherProblemOption.checked) {
            otherProblemField.style.display = "block";
            otherProblemField.required = true;
        } else {
            otherProblemField.style.display = "none";
            otherProblemField.required = false;
        }
    });
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = sanitizeName(document.getElementById("full-name").value);
    const email = sanitizeEmail(document.getElementById("email").value);
    const phone = sanitizePhone(document.getElementById("phone").value);
    const dob = document.getElementById("datebirth").value;
    const appointment = appointmentDate.value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const problem = document.querySelector('input[name="problem"]:checked')?.value;
    const otherProblem = otherProblemField.value.trim();

    if (!name || !email || !phone || !dob || !appointment || !gender || !problem) {
        alert("Please fill in all required fields.");
        return;
    }
    window.location.href = "confirmation.html";
});

function sanitizeName(name) {

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert("Name should contain only letters and spaces.");
        return "";
    }
    return name
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

function sanitizeEmail(email) {
    email = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return "";
    }
    return email;
}

function sanitizePhone(phone) {
    phone = phone.trim().replace(/\D/g, ""); 
    if (phone.length < 8 || phone.length > 15) { 
        alert("Please enter a valid phone number.");
        return "";
    }
    return phone;
}
