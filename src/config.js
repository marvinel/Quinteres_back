var config = {}

config.MONGODB_USER = process.env.MONGODB_USER || "mhuser";
config.MONGODB_PASS = process.env.MONGODB_PASS || "WYxe4L4wZMkmfLil";
config.MONGODB_DBNAME = process.env.MONGODB_DBNAME || "instagrem_fv";
config.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dh8qfzqgr";
config.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_ || "358891884293293";
config.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "ERPPAvj6mbDb8YWEG-M25o9NQzI";
config.PORT = process.env.PORT || 3000;

module.exports = config;
//module.exports =  MONGODB_URI = process.env.MONGODB_URI;




