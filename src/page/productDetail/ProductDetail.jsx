import React, { useState, useEffect } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import { FcOk } from "react-icons/fc";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import style from "./productDetail.module.css";
import Header from '../../layout/header/Header';

const ProductDetail = () => {
    const [product, setProduct] = useState({});
    const [message, setMessage] = useState(""); // Adminin rəyini saxlamaq üçün state
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

    // Testiq et düyməsinə kliklədikdə çağırılacaq funksiya
    const handleApprove = async () => {
        console.log(product.productId);
        
        const data = {
            productId: product.productId, // productId göndərilir
            productStatusId: 2, // Testiq et üçün status 2
            productNotificationTranslates: [
                {
                    languageId: 1,
                    productNotificationTitle: message, // Adminin rəyi
                }
            ]
        };

        try {
            const response = await axios.post(
                "https://restartbaku-001-site4.htempurl.com/api/Product/change-product-status",
                data
            );
            if (response.data.isSuccessful) {
                alert("Ürün təsdiq edildi!");
            } else {
                alert("Təsdiq edilərkən xəta baş verdi: " + response.data.message);
            }
        } catch (error) {
            console.error("API xətası:", error);
            alert("Xəta baş verdi! Lütfən sonra yenidən cəhd edin.");
        }
    };

    // Redd et düyməsinə kliklədikdə çağırılacaq funksiya
    const handleReject = async () => {
        const data = {
            productId: product.productId, // productId göndərilir
            productStatusId: 1, // Redd et üçün status 1
            productNotificationTranslates: [
                {
                    languageId: 1,
                    productNotificationTitle: message, // Adminin rəyi
                }
            ]
        };

        try {
            const response = await axios.post(
                "https://restartbaku-001-site4.htempurl.com/api/Product/change-product-status",
                data
            );
            if (response.data.isSuccessful) {
                alert("Ürün reddedildi!");
            } else {
                alert("Redd edilməkdə xəta baş verdi: " + response.data.message);
            }
        } catch (error) {
            console.error("API xətası:", error);
            alert("Xəta baş verdi! Lütfən sonra yenidən cəhd edin.");
        }
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
                                {/* Display Main Image */}
                                <div className={style.detailPage_main_head_left_mainImgBox}>
                                    <img
                                        src={product.coverImage || ""}
                                        alt="Product"
                                        className={style.detailPage_main_head_left_mainImgBox_img}
                                    />
                                </div>

                                {/* Display Gallery Images */}
                                <div className={style.detailPage_main_head_left_slideImgBox}>
                                    {product.productGalleries && product.productGalleries.map((gallery, index) => (
                                        <img
                                            key={index}
                                            src={gallery.productGalleryFile}
                                            alt={`Gallery Image ${index + 1}`}
                                            className={style.detailPage_main_head_left_slideImgBox_img}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className={style.detailPage_main_head_right}>
                                <h4 className={style.detailPage_main_head_right_humanName}>
                                    {product.productTranslates?.[0]?.productTitle || "Unknown Product"}
                                </h4>

                                {/* Adminin rəyini yazması üçün textarea */}
                                <textarea
                                    className={style.detailPage_main_head_right_textarea}
                                    placeholder="Admin rəyi və ya təsdiq mesajı..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>

                                <button className={style.detailPage_main_head_right_btn_ok} onClick={handleApprove}>
                                    <FcOk /> Testiq et
                                </button>
                                <button className={style.detailPage_main_head_right_btn_reject} onClick={handleReject}>
                                    <PiWarningCircleFill /> Redd et
                                </button>

                                <p className={style.detailPage_main_head_right_otherSale}>Satıcının bütün elanlarını gör</p>
                            </div>
                        </div>
                        <div className={style.detailPage_main_bottom}>
                            <div className={style.detailPage_main_bottom_left}>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Product ID:</span> <span>{product.productId}</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Title:</span> <span>{product.productTranslates?.[0]?.productTitle}</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Description:</span> <span>{product.productTranslates?.[0]?.productDescription}</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Price:</span> <span>{product.price} {product.currencyId === 1 ? "AZN" : "USD"}</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Slug:</span> <span>{product.slug}</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Product Weight:</span> <span>{product.productWeight} kg</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>View Count:</span> <span>{product.viewCount}</span>
                                </div>
                                <div className={style.detailPage_main_bottom_left_box}>
                                    <span>Created At:</span> <span>{new Date(product.createDate).toLocaleString()}</span>
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
