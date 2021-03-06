const weatherForm = document.querySelector('form');
const weatherSearchInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = weatherSearchInput.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then(({ err, location, forecast }) => {
            if (err) {
                return (messageOne.textContent = err);
            }

            messageOne.textContent = location;
            messageTwo.textContent = forecast;
        });
    });
});
