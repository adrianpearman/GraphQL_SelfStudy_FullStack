const app = require('./server/server')
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
})
