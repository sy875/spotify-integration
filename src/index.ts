import app from "./app";
import connectDb from "./db";

const port = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(port, () => console.log(`Server started on port `, 3000));
  })
  .catch((err) => {
    console.log("Failed to start server");
  });
