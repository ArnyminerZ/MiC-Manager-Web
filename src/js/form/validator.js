const buildErrorField = (text) => {
    const div = document.createElement('div');
    div.classList.add('invalid-feedback');
    div.innerText = text;
    return div;
};

/**
 * All the letters for each mod of the DNI. Mod matches index.
 * @author Arnau Mora
 * @since 20221213
 * @type {string[]}
 */
const dniLetters = ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E'];

/**
 * Displays an error on the given field. Fetches the text from the translations.
 * @author Arnau Mora
 * @since 20221213
 * @param {HTMLInputElement} field The field to show the error into.
 * @param {string} key The translation key of the error to display.
 */
const showError = (field, key) => {
    /** @type {HTMLElement} */
    const parent = field.parentElement;

    field.classList.add('is-invalid');
    const err = getTranslation(key);
    field.setCustomValidity(err);
    [...parent.getElementsByClassName('invalid-feedback')].forEach(el => el.remove());
    parent.append(buildErrorField(err));
};

/**
 * Checks that a field with the `data-validate` attribute is correct. Accepts the following validations.
 * * `nif`
 * @author Arnau Mora
 * @since 20221213
 * @param {HTMLInputElement} field The field to check the validity for.
 */
const checkField = (field) => {
    const type = field.getAttribute('data-validate');
    /** @type {string} */
    const value = field.value;

    field.classList.remove('is-valid');
    field.classList.remove('is-invalid');

    switch (type) {
        case 'nif':
            // Check if the format is correct
            if (!/^([0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE])|([XYZ][0-9]{7}[A-Z])$/g.test(value))
                return showError(field, 'validation-error-nif-format');
            if (value.length === 9) {
                const num = value.substring(0, 8);
                const number = parseInt(num);
                const mod = number % 23;
                const correctLetter = dniLetters[mod];
                const letter = value.charAt(8);
                if (letter !== correctLetter)
                    return showError(field, 'validation-error-nif-letter');
            }
            field.classList.add('is-valid');
            break;
    }
};

window.addEventListener('load', () => {
    const fields = document.querySelectorAll('[data-validate]');
    for (const field of fields)
        field.addEventListener('change', () => checkField(field));
});