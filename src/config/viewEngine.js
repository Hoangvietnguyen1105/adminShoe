let express = require('express')


let configViewEngine = (app)=>{
    app.use(express.static("./src/public"))
    app.set("view engine","ejs") //cài dặt view engine sẽ sử dụng, nch là giống với handlebars ở f8
    app.set("views","./src/views") // config để khi nào render chỉ cần ghi tên file sẽ tự tìm vào trong src/views 
}

module.exports = {configViewEngine}