<template>
   <footer>
        <div class="footer-container">
            <div class="footer-column">
                <h3>Giới thiệu </h3>
                <p>Uy Tín</p>
                <p>Chất Lượng</p>
                <p>Thương Hiệu</p>                
            </div>
            
            <div class="footer-column">
                <h3>Địa Chỉ</h3>
                <p>Số 72 Đường Số 7 Khu Phố 1 Phường Hiệp Bình Chánh Thành Phố Thủ Đức Hồ Chí Minh</p>
                <p>Nguyễn Võ Thành Phúc</p>
            </div>
            <div class="footer-column">
                <h3>Liên lạc</h3>  
                <a href="https://www.facebook.com/profile.php?id=100033072422223&mibextid=LQQJ4d"><img src="/Images/iconFB.png" alt="" /></a>
                 <a href="https://www.instagram.com/nguyenphuc2004aye/profilecard/?igsh=ZzF6cjh0cWg0YXBz"><img src="/Images/iconIT.png" alt="" /></a>
                 <a href="tel:+84353181426"><img src="/Images/iconPhone.png" alt="" /></a>
                 <a href="mailto:nguyenphuc2004aye@gmail.com"><img src="/Images/iconEmail.png" alt="" /></a>
                 <a href="https://www.google.com/maps/place/112+Cao+Th%E1%BA%AFng,+Ph%C6%B0%E1%BB%9Dng+4,+Qu%E1%BA%ADn+3,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.7723417,106.6772026,16.44z/data=!4m6!3m5!1s0x31752f21198a62c1:0xa091bdb5049e5008!8m2!3d10.7722385!4d106.6798733!16s%2Fg%2F11j8gz9d2z?hl=vi-VN&entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"><img src="https://w7.pngwing.com/pngs/960/425/png-transparent-google-maps-new-logo-icon-thumbnail.png" alt="" /></a>
            </div>
        </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style>
footer {
    margin-top: 20px;
    background-color: #91b0cf;
    color: #1d1c1c;
    padding: 20px;
    border-radius: 10px;
}

.footer-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
}

.footer-column {
    flex: 1;
    padding: 10px;
    min-width: 200px;
    box-sizing: border-box;
}

.footer-column h3 {
    margin-top: 0;
}

/* Định dạng các liên kết trong footer */
.footer-column a {
    color: #ffffff;
    text-decoration: none;
}

.footer-column a:hover {
    text-decoration: underline;
}

footer img {
    /* Các thuộc tính CSS */
    width: 30px; /* điều chỉnh kích thước hình ảnh */
    height: auto;
    margin-right: 10px; /* khoảng cách giữa các icon */
}
footer img {
    /* Các thuộc tính CSS */
    width: 30px; /* điều chỉnh kích thước hình ảnh */
    height: auto;
    margin-right: 10px; /* khoảng cách giữa các icon */
}

</style>