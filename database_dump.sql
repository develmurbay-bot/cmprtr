PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
INSERT INTO services VALUES(1,'Jasa Desain Baju Kustom','Layanan desain pakaian sesuai keinginan Anda dengan konsultasi gratis dari tim desainer berpengalaman. Kami membantu mewujudkan ide kreatif Anda menjadi produk fashion yang berkualitas.','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e0387abb-411e-443e-9e4d-74d64cf8cf23.png','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO services VALUES(2,'Produksi Garmen Berkualitas Tinggi','Produksi pakaian dengan standar kualitas tinggi menggunakan bahan pilihan dan teknologi jahit modern. Cocok untuk brand fashion, seragam perusahaan, dan kebutuhan komersial.','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e0828294-c02e-4f20-8b4d-a0ed68f2ccd6.png','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO services VALUES(3,'Pemesanan Massal dengan Harga Kompetitif','Solusi terbaik untuk pemesanan dalam jumlah besar dengan harga yang sangat kompetitif. Ideal untuk seragam sekolah, kantor, organisasi, dan event besar.','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/41da1a0c-f1bb-4314-943a-291161596e12.png','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO services VALUES(4,'Servis Jasa Jahit dan Bordir','Layanan jahit dan bordir profesional untuk berbagai kebutuhan. Dari perbaikan pakaian hingga custom embroidery dengan detail yang presisi dan hasil yang memuaskan.','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/034c08e2-3647-442b-807c-d81e7e66d30b.png','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO services VALUES(5,'Konsultasi Desain Mode','Konsultasi komprehensif untuk pengembangan produk fashion Anda. Tim ahli kami siap membantu dari konsep awal hingga produksi massal dengan strategi yang tepat.','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c7cd2c20-0862-4b89-9595-9d9e03e76299.png','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO services VALUES(6,'contoh1','deskrip1','/uploads/89baee55-3a6e-44d8-99b5-6f1fbfe621f5.png','2025-09-25 05:44:08','2025-09-25 05:44:08');
CREATE TABLE gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        image_url TEXT NOT NULL,
        category TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
INSERT INTO gallery VALUES(1,'Koleksi Pakaian Pria','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ed2d5ee8-c35a-41ac-997a-682ff5d76fef.png','Pakaian Pria','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO gallery VALUES(2,'Pakaian Wanita Modern','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8e733caf-2eb3-4393-baed-788cb3c1a515.png','Pakaian Wanita','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO gallery VALUES(3,'Uniform untuk Perusahaan','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/df3ff012-026f-458b-a56e-3e3e6f86ccf4.png','Seragam','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO gallery VALUES(4,'Aksesoris Fashion Terbaru','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d72e915a-ccf7-48f1-8069-5f0d249ab9c7.png','Aksesoris','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO gallery VALUES(5,'Portofolio Event Fashion','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6eb6ae3a-37ca-41ee-baba-94144a75b3f4.png','Event','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO gallery VALUES(6,'ini galeri baru1','/uploads/e31a9a45-c1d8-4e6a-8e26-3e84ebedc806.png','event','2025-09-25 05:53:33','2025-09-25 05:53:33');
CREATE TABLE news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        featured_image TEXT,
        published_at DATETIME,
        status TEXT DEFAULT 'draft',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
INSERT INTO news VALUES(1,'Tren Fashion Tahun 2025: Apa yang Harus Anda Ketahui','Industri fashion terus berkembang dengan tren-tren baru yang menarik. Tahun 2025 diprediksi akan didominasi oleh sustainable fashion, teknologi wearable, dan desain minimalis yang fungsional. Murbay Konveksi siap menghadirkan koleksi terbaru yang mengikuti tren global namun tetap mempertahankan kearifan lokal Indonesia.','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/84cd8814-f20b-488b-815c-300cc6f12b28.png','2024-12-20T10:00','draft','2025-08-31 14:08:01','2025-09-01 06:20:33');
INSERT INTO news VALUES(2,'Tips Memilih Bahan yang Tepat untuk Pakaian','Memilih bahan yang tepat adalah kunci utama dalam menciptakan pakaian berkualitas. Artikel ini membahas berbagai jenis kain, karakteristiknya, dan tips memilih bahan yang sesuai dengan kebutuhan dan budget Anda. Tim ahli Murbay Konveksi berbagi pengalaman dalam seleksi material terbaik.','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a1035451-6ea1-4bef-8ceb-4e7215102cc6.png','2024-12-18T14:30:00Z','published','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO news VALUES(3,'Sejarah Konveksi di Indonesia','Industri konveksi Indonesia memiliki sejarah panjang yang dimulai dari era kolonial hingga menjadi salah satu eksportir garmen terbesar di dunia. Murbay Konveksi bangga menjadi bagian dari perjalanan industri fashion Indonesia yang terus berkembang dan berinovasi.','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8e787c99-eea3-4777-9819-0108b1357d48.png','2024-12-15T09:15:00Z','published','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO news VALUES(4,'Cara Merawat Pakaian Agar Tahan Lama','Perawatan yang tepat dapat memperpanjang usia pakaian Anda. Panduan lengkap ini mencakup tips mencuci, menyimpan, dan merawat berbagai jenis kain. Investasi pada pakaian berkualitas dari Murbay Konveksi akan lebih optimal dengan perawatan yang benar.','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/978a1485-dcdb-4823-a4fb-9ab20974d91c.png','2024-12-12T16:45:00Z','published','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO news VALUES(5,'Inovasi dalam Dunia Konveksi','Teknologi terbaru dalam industri konveksi menghadirkan efisiensi dan kualitas yang lebih baik. Dari mesin jahit otomatis hingga sistem manajemen produksi digital, Murbay Konveksi terus mengadopsi inovasi untuk memberikan layanan terbaik kepada pelanggan.','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ba2794c1-198a-486e-b0f7-8aea3268ac10.png','2024-12-10T11:20:00Z','published','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO news VALUES(6,'inijudulartikel','inijudulartikel','/uploads/e43a705b-4935-401a-b404-c13b1892ba77.jpg','2025-09-25T05:51','published','2025-09-25 05:51:57','2025-09-25 05:51:57');
CREATE TABLE testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        content TEXT NOT NULL,
        customer_photo TEXT,
        rating INTEGER DEFAULT 5,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
INSERT INTO testimonials VALUES(1,'Aulia Rahman','Kualitasnya luar biasa, sangat puas! Jahitan rapi dan bahan berkualitas tinggi. Pasti akan order lagi untuk kebutuhan seragam kantor.','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c3693ec1-f93e-4fc3-bce7-40c08c594487.png',5,'approved','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO testimonials VALUES(2,'Budi Santoso','Pelayanan cepat dan efisien. Tim Murbay Konveksi sangat profesional dalam menangani pesanan seragam sekolah kami. Recommended!','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2d215f4a-1bf5-4cc7-ad18-18b6ecf77d62.png',5,'approved','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO testimonials VALUES(3,'Citra Dewi','Desainnya sesuai dengan harapan saya. Proses konsultasi sangat membantu dan hasil akhirnya memuaskan. Terima kasih Murbay Konveksi!','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/abbff5fd-3362-49ee-aade-571c34b8582f.png',4,'approved','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO testimonials VALUES(4,'Dika Pratama','Membantu saya menemukan pakaian yang sempurna untuk acara perusahaan. Kualitas premium dengan harga yang reasonable.','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e3d97301-543b-4f9f-9ea5-b3ff8661fa18.png',5,'approved','2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO testimonials VALUES(5,'Ema Sari','Sangat profesional dan ramah. Pelayanan customer service yang excellent dan hasil produksi yang memuaskan. Highly recommended!','https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/07bb4f1c-c03c-48e4-a1be-7c35e87d1090.png',5,'approved','2025-08-31 14:08:01','2025-08-31 14:08:01');
CREATE TABLE faq (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category TEXT,
        order_index INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
INSERT INTO faq VALUES(1,'Apa saja layanan yang ditawarkan?','Kami menyediakan jasa desain baju kustom, produksi garmen berkualitas tinggi, pemesanan massal dengan harga kompetitif, servis jasa jahit dan bordir, serta konsultasi desain mode.','Layanan',1,'2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO faq VALUES(2,'Berapa lama proses produksi?','Waktu produksi bervariasi tergantung kompleksitas dan jumlah pesanan. Untuk pesanan kecil (1-50 pcs) membutuhkan 3-7 hari kerja, sedangkan pesanan besar (100+ pcs) membutuhkan 1-2 minggu.','Produksi',2,'2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO faq VALUES(3,'Apakah menerima pemesanan dengan jumlah kecil?','Ya, kami melayani pemesanan mulai dari 1 piece. Namun untuk harga yang lebih ekonomis, kami merekomendasikan pemesanan minimal 10 pieces.','Pemesanan',3,'2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO faq VALUES(4,'Bagaimana cara melakukan pemesanan?','Anda dapat melakukan pemesanan melalui WhatsApp, datang langsung ke workshop kami, atau melalui form kontak di website. Tim kami akan membantu proses konsultasi dan penawaran harga.','Pemesanan',4,'2025-08-31 14:08:01','2025-08-31 14:08:01');
INSERT INTO faq VALUES(5,'Apakah ada garansi untuk produk yang dijual?','Ya, kami memberikan garansi kualitas jahitan selama 30 hari. Jika terdapat cacat produksi, kami akan memperbaiki atau mengganti tanpa biaya tambahan.','Garansi',5,'2025-08-31 14:08:01','2025-08-31 14:08:01');
CREATE TABLE contact (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'new',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      , phone TEXT, subject TEXT, response_message TEXT);
INSERT INTO contact VALUES(1,'Test User','test@example.com','This is a test message','new','2025-09-02 08:59:09','2025-09-02 08:59:09','081234567890','Test Subject',NULL);
INSERT INTO contact VALUES(2,'Test User','test@example.com','This is a test message to check if the contact form works properly.','new','2025-09-02 09:12:30','2025-09-02 09:12:30',NULL,'General Inquiry',NULL);
INSERT INTO contact VALUES(3,'mautanya sukarame','haydyn.ioan@doodrops.org','mau tanyaaaaa aasdasdasdasdasdadasdasd','new','2025-09-02 09:19:42','2025-09-02 09:19:42','+62 852-6915-8007','bolehtanya gak',NULL);
INSERT INTO contact VALUES(4,'Test User','test@example.com','This is a test message','new','2025-09-02 10:48:16','2025-09-02 10:48:16','081234567890','Test Subject',NULL);
INSERT INTO contact VALUES(5,'Test User','test@example.com','This is a test message to verify the contact form is working properly after the recent updates.','new','2025-09-02 10:59:47','2025-09-02 10:59:47','081234567890','Test Subject',NULL);
CREATE TABLE settings (
        key TEXT PRIMARY KEY,
        value TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
INSERT INTO settings VALUES('company_name','Konveksi Murbay','2025-09-09 10:17:31');
INSERT INTO settings VALUES('company_description','#refe Spesialis konveksi dan garmen berkualitas tinggi dengan pengalaman lebih dari 10 tahun. Kami melayani pembuatan seragam, pakaian kustom, dan produksi massal dengan standar kualitas internasional.','2025-09-09 10:17:31');
INSERT INTO settings VALUES('company_vision','Menjadi perusahaan konveksi terdepan di Indonesia yang menghasilkan produk fashion berkualitas tinggi dengan harga terjangkau.','2025-09-09 10:17:32');
INSERT INTO settings VALUES('company_mission','Memberikan layanan konveksi terbaik dengan mengutamakan kualitas, ketepatan waktu, dan kepuasan pelanggan melalui inovasi berkelanjutan.','2025-09-09 10:17:32');
INSERT INTO settings VALUES('company_values','Kualitas, Integritas, Inovasi, dan Kepuasan Pelanggan','2025-09-09 10:17:32');
INSERT INTO settings VALUES('phone','+62 813 5682 2255','2025-09-09 10:17:32');
INSERT INTO settings VALUES('email','infomin@tesnoni.com','2025-09-09 10:17:32');
INSERT INTO settings VALUES('address','Jl. Industri Garmen No. 123, Bandung, Jawa Barat 40123','2025-09-09 10:17:32');
INSERT INTO settings VALUES('whatsapp_number','6281356822255','2025-09-09 10:17:32');
INSERT INTO settings VALUES('whatsapp_message_template','Halo Murbay Konveksi! Saya tertarik dengan layanan konveksi Anda. Mohon informasi lebih lanjut.tesss','2025-09-09 10:17:32');
INSERT INTO settings VALUES('whatsapp_enabled','true','2025-09-09 10:17:32');
INSERT INTO settings VALUES('facebook_url','https://facebook.com/murbaykonveksiRF','2025-09-09 10:17:32');
INSERT INTO settings VALUES('instagram_url','https://instagram.com/murbaykonveksiRF','2025-09-09 10:17:32');
INSERT INTO settings VALUES('twitter_url','https://twitter.com/murbaykonveksiRF','2025-09-09 10:17:32');
INSERT INTO settings VALUES('google_maps_embed','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467128636!2d107.57311731477!3d-6.914744995007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1640123456789!5m2!1sen!2sid','2025-09-09 10:17:32');
INSERT INTO settings VALUES('meta_title','MurbayKonveksi | Jagonya Konveksi','2025-09-09 10:17:32');
INSERT INTO settings VALUES('meta_description','SEO Layanan konveksi profesional untuk seragam, pakaian kustom, dan produksi massal. Kualitas tinggi, harga kompetitif, pengalaman 10+ tahun.','2025-09-09 10:17:32');
INSERT INTO settings VALUES('meta_keywords','konveksi, garmen, seragam, pakaian kustom, jahit, bordir, fashion, lampung','2025-09-09 10:17:32');
INSERT INTO settings VALUES('company_tagline','Jagonya konveksi','2025-09-09 10:17:31');
INSERT INTO settings VALUES('address_line_1','Jl. Nawawi Gelar Dalam Gg. KENANGA No.73','2025-09-09 10:17:31');
INSERT INTO settings VALUES('address_line_2','Rajabasa Jaya','2025-09-09 10:17:32');
INSERT INTO settings VALUES('address_line_3','Bandar Lampung','2025-09-09 10:17:32');
INSERT INTO settings VALUES('address_line_4','Lampung, Indonesia','2025-09-09 10:17:32');
INSERT INTO settings VALUES('google_maps_embed_url','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3636.26679148587!2d105.2479814!3d-5.3435722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c5143b17fedf%3A0x328a8ba0124a5c64!2sMurbay%20Konfeksi!5e1!3m2!1sid!2sid!4v1756659286033!5m2!1sid!2sid','2025-09-09 10:17:32');
INSERT INTO settings VALUES('google_maps_latitude','-5.3435722','2025-09-09 10:17:32');
INSERT INTO settings VALUES('google_maps_longitude','105.2479814','2025-09-09 10:17:32');
INSERT INTO settings VALUES('vision','#RF Menjadi perusahaan konveksi terdepan di Indonesia yang dikenal karena kualitas produk dan layanan yang unggul.','2025-09-09 10:17:32');
INSERT INTO settings VALUES('mission','#RF Memberikan layanan konveksi terbaik dengan mengutamakan kualitas, inovasi, dan kepuasan pelanggan melalui produk-produk berkualitas tinggi dan pelayanan yang profesional.','2025-09-09 10:17:32');
INSERT INTO settings VALUES('values','#RF Kualitas, Integritas, Inovasi, Kepuasan Pelanggan, Komitmen Terhadap Keunggulan','2025-09-09 10:17:32');
INSERT INTO settings VALUES('satisfied_customers','2500+','2025-09-09 10:17:32');
INSERT INTO settings VALUES('products_sold','76K+','2025-09-09 10:17:32');
INSERT INTO settings VALUES('years_experience','25+','2025-09-09 10:17:32');
INSERT INTO settings VALUES('satisfaction_rate','99%','2025-09-09 10:17:32');
INSERT INTO settings VALUES('watermark_enabled','true','2025-09-09 10:17:32');
INSERT INTO settings VALUES('watermark_text','Murbay Konveksi','2025-09-09 10:17:32');
INSERT INTO settings VALUES('operating_hours_weekday','','2025-09-09 10:17:32');
INSERT INTO settings VALUES('operating_hours_saturday','','2025-09-09 10:17:32');
INSERT INTO settings VALUES('operating_hours_sunday','','2025-09-09 10:17:32');
INSERT INTO settings VALUES('services_enabled','true','2025-09-09 10:17:32');
INSERT INTO settings VALUES('services_show_count','5','2025-09-09 10:17:32');
INSERT INTO settings VALUES('gallery_enabled','true','2025-09-09 10:17:32');
INSERT INTO settings VALUES('gallery_show_count','6','2025-09-09 10:17:32');
INSERT INTO settings VALUES('news_enabled','true','2025-09-09 10:17:32');
INSERT INTO settings VALUES('news_show_count','3','2025-09-09 10:17:32');
INSERT INTO settings VALUES('testimonials_enabled','true','2025-09-09 10:17:32');
INSERT INTO settings VALUES('testimonials_show_count','3','2025-09-09 10:17:32');
INSERT INTO settings VALUES('faq_enabled','true','2025-09-09 10:17:32');
INSERT INTO settings VALUES('faq_show_count','5','2025-09-09 10:17:32');
INSERT INTO settings VALUES('business_hours_weekday','08:00 - 17:05 WIB','2025-09-09 10:17:32');
INSERT INTO settings VALUES('business_hours_saturday','08:00 - 15:05 WIB','2025-09-09 10:17:32');
INSERT INTO settings VALUES('business_hours_sunday','Tutup','2025-09-09 10:17:32');
INSERT INTO settings VALUES('company_phone','+62 812-3456-7890','2025-09-09 10:17:32');
INSERT INTO settings VALUES('company_email','info@murbaykonveksi.com','2025-09-09 10:17:32');
INSERT INTO settings VALUES('company_address','Jl. Nawawi Gelar Dalam Gg. KENANGA No.73','2025-09-09 10:17:32');
INSERT INTO settings VALUES('company_city','Rajabasa Jaya, Bandar Lampung','2025-09-09 10:17:32');
INSERT INTO settings VALUES('social_facebook','https://facebook.com/murbaykonveksi','2025-09-09 10:17:32');
INSERT INTO settings VALUES('social_instagram','https://instagram.com/murbaykonveksi','2025-09-09 10:17:32');
INSERT INTO settings VALUES('social_twitter','https://twitter.com/murbaykonveksi','2025-09-09 10:17:32');
INSERT INTO settings VALUES('social_linkedin','','2025-09-09 10:17:32');
INSERT INTO settings VALUES('social_youtube','','2025-09-09 10:17:32');
INSERT INTO settings VALUES('whatsapp_message','Halo! Saya tertarik dengan layanan konveksi Anda.','2025-09-09 10:17:32');
INSERT INTO settings VALUES('footer_text','Perusahaan konveksi terpercaya yang telah melayani berbagai kebutuhan fashion dan garmen dengan komitmen tinggi terhadap kualitas dan kepuasan pelanggan.','2025-09-09 10:17:32');
INSERT INTO settings VALUES('footer_copyright_text','Semua hak cipta dilindungi.','2025-09-09 10:17:32');
INSERT INTO settings VALUES('footer_show_social_links','true','2025-09-09 10:17:32');
INSERT INTO settings VALUES('linkedin_url','https://linkedin.com/@murbaykonveksi','2025-09-09 10:17:32');
INSERT INTO settings VALUES('youtube_url','https://youtube.com/@murbaykonveksi','2025-09-09 10:17:32');
CREATE TABLE roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT,
        permissions TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
INSERT INTO roles VALUES(1,'admin','Administrator dengan akses penuh ke semua fitur','{"services":["create","read","update","delete"],"gallery":["create","read","update","delete"],"news":["create","read","update","delete"],"testimonials":["create","read","update","delete"],"faq":["create","read","update","delete"],"contact":["read","update","delete"],"settings":["read","update"],"users":["create","read","update","delete"]}','2025-08-31 14:08:02');
INSERT INTO roles VALUES(2,'petugas','Staff petugas dengan akses terbatas (tidak bisa mengakses pengaturan toko)','{"services":["create","read","update","delete"],"gallery":["create","read","update","delete"],"news":["create","read","update","delete"],"testimonials":["create","read","update","delete"],"faq":["create","read","update","delete"],"contact":["read","update","delete"],"settings":[],"users":[]}','2025-08-31 14:08:02');
CREATE TABLE admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT,
        full_name TEXT,
        role_id INTEGER DEFAULT 1,
        theme_preference TEXT DEFAULT 'adminlte-inspired',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (role_id) REFERENCES roles (id)
      );
INSERT INTO admin_users VALUES(1,'admin','admin123','admin@murbaykonveksi.com','Administrator',1,'adminlte-inspired','2025-08-31 14:08:02','2025-08-31 14:45:02');
INSERT INTO admin_users VALUES(2,'petugas','petugas123','petugas@murbaykonveksi.com','Staff Petugas',2,'adminlte-inspired','2025-08-31 14:08:02','2025-08-31 14:08:02');
INSERT INTO sqlite_sequence VALUES('services',6);
INSERT INTO sqlite_sequence VALUES('gallery',6);
INSERT INTO sqlite_sequence VALUES('news',6);
INSERT INTO sqlite_sequence VALUES('testimonials',5);
INSERT INTO sqlite_sequence VALUES('faq',5);
INSERT INTO sqlite_sequence VALUES('roles',2);
INSERT INTO sqlite_sequence VALUES('admin_users',2);
INSERT INTO sqlite_sequence VALUES('contact',5);
COMMIT;
