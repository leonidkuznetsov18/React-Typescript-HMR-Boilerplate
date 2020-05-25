const express = require('express');
const path = require('path');
const app = express();
const portNumber = 3000;
const sourceDir = 'build';

app.use(express.static(sourceDir));

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, `${sourceDir}/index.html`));
});
