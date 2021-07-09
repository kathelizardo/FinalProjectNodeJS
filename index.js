//NodeJS Final Project Kathe
const express = require ('express');
const mongoose = require ('mongoose');
const User = require('./models/user');

//Local Connection
const mongoUrl = "mongodb://localhost:27017/RegistroPessoas";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error Connection MongoDB"));


const app = express()
const port = 3000
app.use(express.json())

//Welcome
app.get('/', (req, res) => {
    res.send('Welcome!! :D')
})

//Get All Users
app.get('/read', async (req, res) => {
    const user = await User.find({ })

    res.json({ user })
})

//Get a user by Id
app.get('/read/:id', async (req, res) => {
    const user = await User.findById(req.params.id)

    res.json({ user })
})

//Add a new User
app.post('/create', async (req, res) => {
    const user = await User.create({ 
        name: req.body.name,
        date_birth: req.body.date_birth,
        status: req.body.status
    })
    await user.save()
    res.send({ user })
})

// Edit user
app.put('/update/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    user.name = req.body.name
    user.date_birth = req.body.date_birth,
    user.status = req.body.status

    await user.save()
    res.send({ user })
})

//Delete user
app.delete('/delete/:id', async (req, res) => {
    await User.deleteOne({ _id: req.params.id }, () => {
        console.log('Item Deleted')
    })

    res.send('Successfully Deleted!')
})

app.listen(port, () => {
    console.log(`Node project listening at http://localhost:${port}`)
})
