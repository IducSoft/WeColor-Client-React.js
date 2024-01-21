

export function checkPasswordStrength(password="") {
    let strength = 0;
    let tips = "";

    if (password.length < 8) {
        tips += "Haz la contraseña más larga. ";
    } else {
        strength += 1;
    }
    
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
        strength += 1;
    } else {
        tips += "Usa tanto letras minúsculas como mayúsculas. ";
    }

    if (password.match(/\d/)) {
        strength += 1;
    } else {
        tips += "Incluye al menos un número. ";
    }

    if (password.match(/[^a-zA-Z\d]/)) {
        strength += 1;
    } else {
        tips += "Incluye al menos un carácter especial. ";
    }

    if (strength < 2) {
        return "Fácil de adivinar. " + tips;
    } else if (strength === 2) {
        return "Dificultad media. " + tips;
    } else if (strength === 3) {
        return "Difícil. " + tips;
    } else {
        return "Extremadamente difícil. " + tips;
    }
}
