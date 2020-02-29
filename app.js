const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

//載入db
const mongoose = require('mongoose')
//connect to db
mongoose.connect('mongodb://localhost/restaurant', {
  useNewUrlParser: true, useUnifiedTopology: true
})
//get db info
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//require db model
const Restaurant = require('./models/restaurant')


//首頁 
app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

//列出所有餐廳清單
app.get('/restaurants', (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurant: restaurants })
    })
})

//新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  res.send('新增頁面')
})

//顯示詳細資料
app.get('/restaurants/:id', (req, res) => {
  res.send('餐廳詳細')
})

//新增餐廳
app.post('/restaurants', (req, res) => {
  res.send('新增餐廳')
})

// 修改餐廳詳細頁面
app.get('/restaurants/:id/edit', (req, res) => {
  res.send('修改餐廳頁面')
})

// 修改餐廳
app.post('/restaurants/:id/edit', (req, res) => {
  res.send('修改餐廳')
})

//刪除
app.post('/restaurants/:id/delete', (req, res) => {
  res.send('刪除餐廳')
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

// search function

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurant = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurant: restaurant, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})