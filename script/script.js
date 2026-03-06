  document.getElementById("login-btn").addEventListener("click", () => {
    const userName = document.getElementById("username");
    const passwordField = document.getElementById("password")
    const userNameValue = userName.value;
    const passwordFieldBValue = passwordField.value;

    if (userNameValue === "admin" && passwordFieldBValue === "admin123") {
        alert("Login Successful");
        window.location.href = "dashboard.html";
    }
    else {
        alert("Enter a Valid Username or Password")
    }
})