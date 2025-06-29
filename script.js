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
    // Apply font to all elements (optional, can be more specific)
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