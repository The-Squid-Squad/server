require("dotenv").config();
const app = require('./server');
const port = process.env.PORT || 9000;

app.listen( port, () => {
    console.log(`Server is running on port: ${port}`);
});