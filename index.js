

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');

    const formAddError = (input) => {
        input.classList.add('_error');
    };

    const formRemoveError = (input) => {
        input.classList.remove('_error');
    };

    const formSend = async (e) => {
        e.preventDefault();
        let errors = formValidate();
        let formData = new FormData(form);
        if (errors === 0) {
            let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                alert('Форма отправлена');
                form.reset();
            } else {
                alert('Произошла ошибка');
            }
        } else if (errors > 0) {
            alert('Заполните правильно поля');
        }
    };

    const formValidate = () => {
        let error = 0;
        const phoneReg = /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/g;
        const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const formInputs = document.querySelectorAll('.input');

        for (let i = 0; i < formInputs.length; i++) {
            const input = formInputs[i];
            formRemoveError(input);
            
            if (input.classList.contains('form__input_name') && input.value.length < 2) {
                formAddError(input);
                error++;
            } else if (input.classList.contains('form__input_phone') && phoneReg.test(input.value) === false) {
                formAddError(input);
                error++;
            } else if (input.classList.contains('form__input_email') && emailReg.test(input.value) === false) {
                formAddError(input);
                error++;
            };
        };
        return error;
    };
    
    form.addEventListener('submit', formSend);
})