window.addEventListener('load', async () => {
    setUpLanguages('en-US', 'en-US', {
        "en-US": "English"
    }, "/lang/");
    await loadLanguage();
});
