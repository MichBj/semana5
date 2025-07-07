// Select DOM elements for image gallery
const imageUrlInput = document.getElementById('imageUrl');
const addImageBtn = document.getElementById('addImageBtn');
const deleteImageBtn = document.getElementById('deleteImageBtn');
const imageGallery = document.getElementById('imageGallery');

let selectedImage = null; // Track the currently selected image

// Select DOM elements for font section
const fontSelect = document.getElementById('fontSelect');
const applyFontBtn = document.getElementById('applyFontBtn');

// Function to add an image to the gallery
function addImage() {
    const url = imageUrlInput.value.trim();
    if (!url) {
        alert('Please enter a valid image URL');
        return;
    }

    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Gallery Image';
    img.className = 'gallery-image';
    
    img.style.opacity = '0';
    img.style.transform = 'scale(0.8)';
    
    img.onload = () => {
        img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
        imageGallery.appendChild(img);
    };
    img.onerror = () => {
        alert('Failed to load image. Please check the URL.');
    };

    img.addEventListener('click', () => selectImage(img));
    imageGallery.appendChild(img);
    imageUrlInput.value = '';
}

// Function to select an image
function selectImage(img) {
    if (selectedImage) {
        selectedImage.classList.remove('selected');
    }
    selectedImage = img;
    selectedImage.classList.add('selected');
    deleteImageBtn.disabled = false;
}

// Function to delete the selected image
function deleteImage() {
    if (selectedImage) {
        selectedImage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        selectedImage.style.opacity = '0';
        selectedImage.style.transform = 'scale(0.8)';
        setTimeout(() => {
            selectedImage.remove();
            selectedImage = null;
            deleteImageBtn.disabled = true;
        }, 300);
    }
}

// Function to apply the selected font to all text
function applyFont() {
    const selectedFont = fontSelect.value;
    document.body.style.fontFamily = selectedFont;
    const elements = document.getElementsByTagName('*');
    for (let element of elements) {
        element.style.fontFamily = selectedFont;
    }
}

// Event listeners for image gallery
addImageBtn.addEventListener('click', addImage);
imageUrlInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addImage();
    }
});
deleteImageBtn.addEventListener('click', deleteImage);

// Event listeners for font section
applyFontBtn.addEventListener('click', applyFont);

// Elementos del DOM para el formulario de registro
const form = document.getElementById('registroForm');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const edad = document.getElementById('edad');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

const nombreError = document.getElementById('nombreError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const edadError = document.getElementById('edadError');

// Expresión regular para correo
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Expresión regular para contraseña (mínimo 8 caracteres, un número y un carácter especial)
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})$/;

// Validaciones en tiempo real
function validateForm() {
    let isValid = true;

    // Nombre (mínimo 3 caracteres)
    if (nombre.value.length < 3) {
        nombreError.textContent = 'El nombre debe tener al menos 3 caracteres.';
        nombre.classList.remove('valid');
        nombre.classList.add('invalid');
        isValid = false;
    } else {
        nombreError.textContent = '';
        nombre.classList.remove('invalid');
        nombre.classList.add('valid');
    }

    // Correo (formato válido)
    if (!emailRegex.test(email.value)) {
        emailError.textContent = 'Por favor, ingresa un correo válido.';
        email.classList.remove('valid');
        email.classList.add('invalid');
        isValid = false;
    } else {
        emailError.textContent = '';
        email.classList.remove('invalid');
        email.classList.add('valid');
    }

    // Contraseña (mínimo 8 caracteres, número y carácter especial)
    if (!passwordRegex.test(password.value)) {
        passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres, un número y un carácter especial.';
        password.classList.remove('valid');
        password.classList.add('invalid');
        isValid = false;
    } else {
        passwordError.textContent = '';
        password.classList.remove('invalid');
        password.classList.add('valid');
    }

    // Confirmación de contraseña
    if (confirmPassword.value !== password.value || confirmPassword.value === '') {
        confirmPasswordError.textContent = 'Las contraseñas no coinciden.';
        confirmPassword.classList.remove('valid');
        confirmPassword.classList.add('invalid');
        isValid = false;
    } else {
        confirmPasswordError.textContent = '';
        confirmPassword.classList.remove('invalid');
        confirmPassword.classList.add('valid');
    }

    // Edad (mayor o igual a 18)
    if (edad.value < 18 || isNaN(edad.value)) {
        edadError.textContent = 'Debes ser mayor de 18 años.';
        edad.classList.remove('valid');
        edad.classList.add('invalid');
        isValid = false;
    } else {
        edadError.textContent = '';
        edad.classList.remove('invalid');
        edad.classList.add('valid');
    }

    // Habilitar/deshabilitar botón de envío
    submitBtn.disabled = !isValid;
    console.log('Validación:', isValid); // Depuración
    return isValid;
}

// Event listeners para validación en tiempo real
[nombre, email, password, confirmPassword, edad].forEach(input => {
    input.addEventListener('input', validateForm);
});

// Enviar formulario
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Temporalmente desactiva para probar
    if (validateForm()) {
        console.log('Formulario válido, enviando...');
        alert('¡Formulario enviado con éxito! Todos los campos son válidos.');
    } else {
        console.log('Formulario inválido. Revisa los campos.');
    }
});

// Reiniciar formulario
resetBtn.addEventListener('click', () => {
    form.reset();
    [nombre, email, password, confirmPassword, edad].forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
    [nombreError, emailError, passwordError, confirmPasswordError, edadError].forEach(error => {
        error.textContent = '';
    });
    submitBtn.disabled = true;
});