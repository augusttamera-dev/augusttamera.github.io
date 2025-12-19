const firstname = document.getElementById("firstname");
const middleinit = document.getElementById("middleinit");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const ssn = document.getElementById("ssn");
const dob = document.getElementById("dob");
const phone = document.getElementById("phone");
const un = document.getElementById("un");
const pass = document.getElementById("pass");
const pass2 = document.getElementById("pass2");

function getCookie(name) {
    let c = document.cookie.split("; ");
    for (let i of c) {
        let p = i.split("=");
        if (p[0] === name) return decodeURIComponent(p[1]);
    }
    return null;
}

function setCookie(name, value, hours) {
    let d = new Date();
    d.setTime(d.getTime() + hours * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString() + ";path=/";
}

function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
}

let fname = getCookie("firstname");

if (fname) {
    document.getElementById("welcomeMsg").innerText = "Welcome back, " + fname;
    document.getElementById("storedName").innerText = fname;
    document.getElementById("newUserBox").style.display = "block";
    firstname.value = fname;
} else {
    document.getElementById("welcomeMsg").innerText = "Hello New User";
}

document.getElementById("newUserCheck").onchange = function () {
    if (this.checked) {
        deleteCookie("firstname");
        localStorage.clear();
        document.getElementById("signup").reset();
        location.reload();
    }
};

document.getElementById("signup").onsubmit = function () {
    if (document.getElementById("rememberMe").checked) {
        setCookie("firstname", firstname.value, 48);
        localStorage.setItem("firstname", firstname.value);
    } else {
        deleteCookie("firstname");
        localStorage.clear();
    }
};

fetch("https://jsonplaceholder.typicode.com/users/1")
.then(res => res.json())
.then(data => {
    document.getElementById("outputformdata").innerText =
        "Fetch API Loaded User: " + data.name;
});
