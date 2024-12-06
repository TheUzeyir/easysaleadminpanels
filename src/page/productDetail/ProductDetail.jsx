import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaHeart, FaFlag } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import { useNavigate, useParams } from 'react-router-dom';
import { FcOk } from "react-icons/fc";
import axios from 'axios';
import style from "./productDetail.module.css";
import Header from '../../layout/header/Header';

const ProductDetail = () => {
    const [openComplaintBox, setOpenComplaintBox] = useState(false);
    const [product, setProduct] = useState({});
    const { id } = useParams();  
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const getProduct = async () => {
                try {
                    const response = await axios.get(
                        `https://restartbaku-001-site4.htempurl.com/api/Product/get-product-by-id?Id=${id}`
                    );
                    if (response.data.isSuccessful) {
                        setProduct(response.data.data);
                        console.log(response.data.data);
                        
                    } else {
                        console.error("Ürün bulunamadı:", response.data.message);
                    }
                } catch (error) {
                    console.error("API hatası:", error);
                }
            };
            getProduct();
        } else {
            console.error("Product ID is missing or invalid.");
        }
    }, [id]);

    const toggleComplaintBox = () => {
        setOpenComplaintBox(prev => !prev);
    };

    return (
        <div className="detailPageContainer">
            <Header />
            <div className={style.detailPage}>
                <div className="container">
                    <p className={style.detailPage_goBack} onClick={() => navigate(-1)}>
                        <MdOutlineKeyboardArrowLeft /> Go Back
                    </p>
                    <div className={style.detailPage_main}>
                        <div className={style.detailPage_main_head}>
                            <div className={style.detailPage_main_head_left}>
                                <div className={style.detailPage_main_head_left_mainImgBox}>
                                    <img
                                        src={product.coverImage || ""}
                                        alt="Product"
                                        className={style.detailPage_main_head_left_mainImgBox_img}
                                    />
                                </div>
                                <div className={style.detailPage_main_head_left_slideImgBox}>
                                    {product.productGalleries && product.productGalleries.map((gallery, index) => (
                                        <img
                                            key={index}
                                            src={gallery.productGalleryFile}
                                            alt={`Slide ${index + 1}`}
                                            className={style.detailPage_main_head_left_slideImgBox_img}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className={style.detailPage_main_head_right}>
                                <h4 className={style.detailPage_main_head_right_humanName}>
                                    {product.productTranslates?.[0]?.productTitle || "Unknown Seller"}
                                </h4>
                                <p className={style.detailPage_main_head_right_phone}>
                                    <FaPhoneAlt className={style.detailPage_main_head_right_phone_icon} /> 
                                    0504002200 {/* Telefon məlumatı gəlmədiyi üçün bu statik saxlanılıb */}
                                </p>
                                <button className={style.detailPage_main_head_right_btn_ok}>
                                    <FcOk /> Testiq et
                                </button>
                                <button className={style.detailPage_main_head_right_btn_reject}>
                                    <PiWarningCircleFill /> Redd et
                                </button> 
                                <p className={style.detailPage_main_head_right_otherSale}>Satıcının bütün elanlarını gör</p>
                            </div>
                        </div> 
                        <div className={style.detailPage_main_bottom}>
                            <div className={style.detailPage_main_bottom_left}>
                                {Object.entries(product).map(([key, value]) => (
                                    <div key={key} className={style.detailPage_main_bottom_left_box}>
                                        <span>{key}:</span> <span>{typeof value === 'object' ? JSON.stringify(value) : value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className={style.detailPage_main_bottom_right}>
                                <p>Elanın nömrəsi: {product.productId || "2221"}</p>
                                <p>Günlük icarəyə verilir.</p>
                                <div className={style.detailPage_main_bottom_right_card}>
                                    <p className={style.detailPage_main_bottom_right_card_title}>
                                        <FaHeart className={style.detailPage_main_bottom_right_card_title_icon} /> Bəyənilənlərə əlavə et
                                    </p>
                                    <p className={style.detailPage_main_bottom_right_card_subtitle} onClick={toggleComplaintBox}>
                                        <FaFlag className={style.detailPage_main_bottom_right_card_subtitle_icon} /> Şikayət et
                                    </p>
                                    {openComplaintBox && (
                                        <div className={style.detailPage_main_bottom_right_card_complaintBox_container}>
                                            <div className={style.detailPage_main_bottom_right_card_complaintBox}>
                                                <textarea placeholder="Şikayət mətni" />
                                                <button className={style.detailPage_main_bottom_right_card_complaintBox_btn}>Göndər</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
