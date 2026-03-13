const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = './client/public/images';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const images = {
    "iphone.jpg": "https://sl.bing.net/7gmCQT0g1I", // Placeholder high-res
    "samsung_s23.jpg": "https://sl.bing.net/hFgDdKMVzK8",
    "realme_narzo.jpg": "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "oneplus11.jpg": "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "vivo_v29.jpg": "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "redmi_note13.jpg": "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "iphone13.jpg": "https://m.media-amazon.com/images/I/71xb2xkN5tL._SL1500_.jpg",
    "samsung_a54.jpg": "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "realme_gtneo.jpg": "https://images.pexels.com/photos/1447254/pexels-photo-1447254.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "nord_ce.jpg": "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "vivo_y100.jpg": "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "hp_pavilion.jpg": "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "dell_inspiron.jpg": "https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "lenovo_ideapad.jpg": "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1000",
    "macbook_air.jpg": "https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1000",
    "asus_tuf.jpg": "https://images.pexels.com/photos/459654/pexels-photo-459654.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "sony_tv.jpg": "https://images.pexels.com/photos/5721882/pexels-photo-5721882.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "samsung_tv.jpg": "https://images.pexels.com/photos/1046639/pexels-photo-1046639.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "lg_oled.jpg": "https://images.pexels.com/photos/5202925/pexels-photo-5202925.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "nike_shoes.jpg": "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1000"
};

const download = (url, filename) => {
    const filePath = path.join(dir, filename);
    const file = fs.createWriteStream(filePath);
    
    const request = https.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
            // Follow Redirects
            download(response.headers.location, filename);
            return;
        }
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`✅ Downloaded: ${filename}`);
        });
    });

    request.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete empty file on error
        console.error(`❌ Error ${filename}:`, err.message);
    });
};

Object.entries(images).forEach(([name, url]) => download(url, name));