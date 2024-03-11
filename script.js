function btnEncriptar() {
    let texto = document.getElementById("texto").value.trim();

    if (!validarTextoDesencriptar(texto)) {
        return;
    }

    document.getElementById("parrafo").innerText = "El texto encriptado es: ";
    document.getElementById("img-titulo").style.display = "none";

    encriptarTexto(texto);
}

function encriptarTexto(texto) {
    const conversiones = {
        "a": "ai",
        "e": "enter",
        "i": "imes",
        "o": "ober",
        "u": "ufat"
    };

    let textoEncriptado = texto.split('').map(caracter => conversiones[caracter] || caracter).join('');
    
    actualizarTexto(textoEncriptado);
}

function btnDesencriptar() {
    let texto = document.getElementById("texto").value.trim();

    if (!validarTextoDesencriptar(texto)) {
        return;
    }

    document.getElementById("parrafo").innerText = "El texto encriptado es: ";
    document.getElementById("img-titulo").style.display = "none";

    let textoDesencriptado = desencriptarTexto(texto);

    actualizarTexto(textoDesencriptado);
}

function desencriptarTexto(texto) {
    const conversionesInversas = {
        "ai": "a",
        "enter": "e",
        "imes": "i",
        "ober": "o",
        "ufat": "u"
    };

    let textoDesencriptado = "";
    let index = 0;

    while (index < texto.length) {
        let encontrado = false;

        for (let clave in conversionesInversas) {
            if (texto.substring(index, index + clave.length) === clave) {
                textoDesencriptado += conversionesInversas[clave];
                index += clave.length;
                encontrado = true;
                break;
            }
        }

        if (!encontrado) {
            textoDesencriptado += texto[index];
            index++;
        }
    }

    return textoDesencriptado;
}

function contieneCaracteresIncorrectos(texto) {
    return /[A-ZáéíóúüÁÉÍÓÚÜ]/.test(texto);
}

function validarTextoDesencriptar(texto) {
    if (!texto) {
        alert("Por favor ingrese un texto antes de encriptar o desencriptar");
        return false;
    }

    if (contieneCaracteresIncorrectos(texto)) {
        alert("Se ha detectado caracteres en mayúsculas o acentos.");
        return false;
    }

    return true;
}

function actualizarTexto(texto) {
    document.getElementById("texto2").value = texto;

    const botonEncriptar = document.getElementById("btn-Encriptar");
    const botonCopiar = document.getElementById("btn-copiar");

    botonCopiar.style.display = botonEncriptar.style.display = "inline-block";

    ajustarAlturaTexto();
}

function ajustarAlturaTexto() {
    let areaTexto = document.getElementById("texto2");
    let pantallaPequeña = window.matchMedia("(max-width:768px)");
    let pantallaTablet = window.matchMedia("(min-width:769px) and (max-width:1024px)");
    let pantallaTabletLado = window.matchMedia("(min-device-width:768px) and (max-device-width:1024px) and (orientation: landscape)");

    if (pantallaPequeña.matches) {
        areaTexto.style.height = "95px";
        areaTexto.style.width = "94%";
    } else if (pantallaTablet.matches) {
        areaTexto.style.height = "150px";
    } else if (pantallaTabletLado.matches) {
        areaTexto.style.height = "352px";
    } else {
        areaTexto.style.height = "416px";
    }
}

function copiarTexto() {
    let textarea = document.getElementById("texto2");

    let inputTemp = document.createElement("input");
    inputTemp.value = textarea.value;

    document.body.appendChild(inputTemp);

    inputTemp.select();
    document.execCommand("copy");

    document.body.removeChild(inputTemp);

    alert("Texto copiado al portapapeles");

    const botonCopiar = document.getElementById("btn-copiar");
    botonCopiar.style.display = "none";

    limpiarInput();
}

function limpiarInput() {
    document.getElementById("texto2").value = "";
    document.getElementById("texto").value = "";
}
