const express = require('express');
const app = express();
const port = 8000

// Source files
app.use(express.static('src'));
app.use('/lang', express.static('lang'));

// Bootstrap resources
app.use('/dist/bootstrap', express.static('node_modules/bootstrap/dist'));

app.listen(port, () => {
    console.info('Listening on port', port);
});
