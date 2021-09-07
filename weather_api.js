const express = require('express')
const https = require('https')
app = express()

const bp = require('body-parser')
const { response } = require('express')

app.use(bp.urlencoded({extended:true}))

app.listen(3000, function(){
    console.log("weather api is running on http://localhost:3000")

})


app.get('/', function(req,res){
    res.sendFile(__dirname+ "/index.html")
})

app.post('/city',function(req,res){
    var city = req.body.city;
    const url= 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=d50dec12a2576c00fc100c4e80f0c4cf&units=metric'
    https.get(url,function(response){

        response.on("data",function(data){

            const weather_data= JSON.parse(data)
            const temp = weather_data.main.temp
            res.send("<h1> The Temperature in " + city +" is "+ temp +" degree Celcius </h1> ")
            
        })    
    })
})
