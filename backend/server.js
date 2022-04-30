const express = require('express')

const app = express()

const userRoute = require('./api/routes/userRoute')

// there are middlewares for our routes
app.use(express.json())
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))