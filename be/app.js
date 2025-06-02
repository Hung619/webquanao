// express: Framework giúp tạo server nhanh chóng.
const express = require('express');

// body-parser: Hỗ trợ phân tích dữ liệu từ request body.
const bodyParser = require('body-parser');

// path: Xử lý đường dẫn file hệ thống.
const path = require('path');

// cors: Cho phép truy cập API từ các domain khác nhau.
const cors = require('cors');

// dotenv: Load biến môi trường từ file .env.
const dotenv = require('dotenv');
dotenv.config();

// port: Cổng chạy server, ưu tiên lấy từ process.env.PORT, nếu không có thì mặc định là 3000.
// app: Khởi tạo một ứng dụng Express.
const port = 3000 || process.env.PORT;
const app = express();

// app.use(cors()): Cho phép tất cả các request từ bên ngoài (fix lỗi CORS).
app.use(cors());

// morgan: Middleware giúp log request vào server.
const morgan = require('morgan');

// app.use(morgan('combined')): Ghi log chi tiết request đến server.
app.use(morgan('combined'));

// app.use(bodyParser.urlencoded({ extended: true })): Hỗ trợ lấy dữ liệu từ form HTML (POST request).
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.json()): Hỗ trợ đọc dữ liệu JSON từ request body.
app.use(bodyParser.json());

// app.set('view engine', 'pug'): Sử dụng Pug làm template engine để render giao diện.
app.set('view engine', 'pug');

// app.set('views', './src/views'): Định nghĩa thư mục chứa các file .pug.
app.set('views', './src/views');

// express.static(...): Cho phép truy cập các file tĩnh (CSS, JS, hình ảnh) từ thư mục public.
app.use(express.static(path.join(__dirname, 'public')));

//////////////////////
const nguoiDung = require('./src/routes/nguoiDungRouter')
app.use('/nguoiDung',nguoiDung)
//
const sanPham = require('./src/routes/sanPhamRouter')
app.use('/sanPham',sanPham)
//
const chiTietSanPham = require('./src/routes/chiTietSanPhamRouter')
app.use('/chiTietSanPham',chiTietSanPham)
//
const chitietdonhangRoute = require('./src/routes/chiTietDonHangRoute')
app.use('/chiTietDonHang',chitietdonhangRoute)
//
const donDatHangRoute = require('./src/routes/donDatHangRoute')
app.use('/dondathang',donDatHangRoute)
//
const gioHangRoute = require('./src/routes/gioHangRoute')
app.use('/giohang',gioHangRoute)
//////////////////////


app.get('/', (req, res) => {
    res.render('index',); 
});
app.use((req, res, next) => {
    console.log('404 middleware hit');
    res.status(404).json({ message: "Route not found" }); 
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
