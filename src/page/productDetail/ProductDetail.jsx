import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaHeart, FaFlag } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import { useNavigate, useParams } from 'react-router-dom';
import { FcOk } from "react-icons/fc";
import axios from 'axios';
import style from "./productDetail.module.css"
import Header from '../../layout/header/Header';

const ProductDetail = () => {
    const [openComplaintBox, setOpenComplaintBox] = useState(false);
    const [product, setProduct] = useState({});
    const [mainImage, setMainImage] = useState(null);
    const { id } = useParams();  // Get the 'id' from the URL params
    const navigate = useNavigate();

    useEffect(() => {
        // Check if 'id' is available before making the API request
        if (id) {
            const getProduct = async () => {
                try {
                    const response = await axios.get(
                        `http://restartbaku-001-site4.htempurl.com/api/Product/get-product/${id}`
                    );
                    if (response.data.isSuccessful) {
                        setProduct(response.data.data);
                        setMainImage(response.data.data.thumbnail);
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
    }, [id]); // Re-run the effect if 'id' changes

    const handleImageClick = (newImage) => {
        setMainImage(newImage);
    };

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
                                        src={mainImage || product.thumbnail}
                                        alt="Product"
                                        className={style.detailPage_main_head_left_mainImgBox_img}
                                    />
                                </div>
                                <div className={style.detailPage_main_head_left_slideImgBox}>
                                    {product.images && product.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Slide ${index + 1}`}
                                            className={style.detailPage_main_head_left_slideImgBox_img}
                                            onClick={() => handleImageClick(image)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className={style.detailPage_main_head_right}>
                                <h4 className={style.detailPage_main_head_right_humanName}>
                                    {product.productTitle || "Unknown Seller"}
                                </h4>
                                <p className={style.detailPage_main_head_right_phone}>
                                    <FaPhoneAlt className={style.detailPage_main_head_right_phone_icon} /> 
                                    {product.phone || "0504002200"}
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
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Qiymət:</span> <span>{product.price || "300"}</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Şəhər:</span> <span>{product.city || "Bakı"}</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Marka:</span> <span>{product.brand || "LAND ROVER"}</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Model:</span> <span>{product.model || "RANGE ROVER"}</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Sürətlər qutusu:</span> <span>{product.transmission || "Avtomat"}</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Ötürücü:</span> <span>{product.drivetrain || "Arxa"}</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Yanacaq növü:</span> <span>{product.fuel || "Dizel"}</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Mühərik:</span> <span>{product.engine || "3"}</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>İl:</span> <span>{product.year || "2017"}</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Ban növü:</span> <span>{product.bodyType || "Offroader"}</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Rəng:</span> <span>{product.color || "Gümüşü"}</span>
                                </div>
                            </div>
                            <div className={style.detailPage_main_bottom_right}>
                                <p>Elanın nömrəsi: {product.id || "2221"}</p>
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
