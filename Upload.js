document.getElementById('upload-photo').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-image').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function updateProfile() {
    const name = document.getElementById('input-name').value;
    const age = document.getElementById('input-age').value;
    const location = document.getElementById('input-location').value;
    const aboutMe = document.getElementById('input-about-me').value;

    document.getElementById('name').innerText = name;
    document.getElementById('age').innerText = age;
    document.getElementById('location').innerText = location;
    document.getElementById('about-me-text').innerText = aboutMe;
}
