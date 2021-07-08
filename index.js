const express = require ('express')
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

app.get('/create', async (req, res) => {
    const user = await User.create({ 
        name: 'Wanda Maximoff',
        date_birth: '1989',
        status: true
    })

    res.json({ user })
})

app.get('/read', async (req, res) => {
    const user = await User.find({ })

    res.json({ user })
})

app.get('/update/:id', async (req, res) => {
    const user = await User.findById(req.params.id)

    user.name = 'Scarlet Witch'
    user.date_birth = '2010-04-03'
    user.status = true

    await user.save()

    res.send({ user })
})

app.get('/delete/:id', async (req, res) => {
    await User.deleteOne({ _id: req.params.id }, () => {
        console.log('Item Deleted')
    })

    res.send('Deleted!')
})

app.listen(port, () => {
    console.log(`Node project listening at http://localhost:${port}`)
})
