function gcd(a, b) {
    if (b === 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}

function modInverse(a, m) {
    for (let i = 1; i < m; i++) {
        if ((a * i) % m === 1) {
            return i;
        }
    }
    return -1;
}

function calculateInverse() {
    let a = parseInt(document.getElementById("keyA").value);

    if (isNaN(a)) {
        alert("Please enter key a");
        return;
    }

    if (gcd(a, 26) !== 1) {
        document.getElementById("modInverse").value = "Not Exists";
        alert("Modular inverse does not exist");
        return;
    }

    let inverse = modInverse(a, 26);
    document.getElementById("modInverse").value = inverse;
}

function encrypt() {
    let text = document.getElementById("inputText").value;
    let a = parseInt(document.getElementById("keyA").value);
    let b = parseInt(document.getElementById("keyB").value);

    if (isNaN(a) || isNaN(b)) {
        alert("Please enter both keys");
        return;
    }

    if (gcd(a, 26) !== 1) {
        alert("Key a must be coprime with 26");
        return;
    }

    let result = "";

    for (let i = 0; i < text.length; i++) {
        let ch = text[i];

        if (ch >= 'A' && ch <= 'Z') {
            let x = ch.charCodeAt(0) - 65;
            let enc = (a * x + b) % 26;
            result = result + String.fromCharCode(enc + 65);
        }
        else if (ch >= 'a' && ch <= 'z') {
            let x = ch.charCodeAt(0) - 97;
            let enc = (a * x + b) % 26;
            result = result + String.fromCharCode(enc + 97);
        }
        else {
            result = result + ch;
        }
    }

    document.getElementById("outputText").value = result;
}

function decrypt() {
    let text = document.getElementById("inputText").value;
    let a = parseInt(document.getElementById("keyA").value);
    let b = parseInt(document.getElementById("keyB").value);

    if (isNaN(a) || isNaN(b)) {
        alert("Please enter both keys");
        return;
    }

    let aInv = modInverse(a, 26);

    if (aInv === -1) {
        alert("Modular inverse does not exist");
        return;
    }

    document.getElementById("modInverse").value = aInv;

    let result = "";

    for (let i = 0; i < text.length; i++) {
        let ch = text[i];

        if (ch >= 'A' && ch <= 'Z') {
            let y = ch.charCodeAt(0) - 65;
            let dec = (aInv * (y - b + 26)) % 26;
            result = result + String.fromCharCode(dec + 65);
        }
        else if (ch >= 'a' && ch <= 'z') {
            let y = ch.charCodeAt(0) - 97;
            let dec = (aInv * (y - b + 26)) % 26;
            result = result + String.fromCharCode(dec + 97);
        }
        else {
            result = result + ch;
        }
    }

    document.getElementById("outputText").value = result;
}
