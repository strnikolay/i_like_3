'use client'

import React, {FC, useEffect, useState } from 'react';
import Image from 'next/image';
import "./Product_card.css";
import {brandList, categoryList} from "@/api/db"
import {IProduct} from "@/store/interfaces"
import { useStore } from "@/store/storeProvidert";
import { observer } from 'mobx-react';
import { toast } from "react-toastify";



interface Props {
    el:IProduct;
    index: number;
}



const Product_card:FC<Props> = observer(({el, index}) => {
    const {Store, Cart_Store, Product_Store} = useStore()
    const [isFav, setIsFav] = useState(false)
    const [isInCart, setIsInCart] = useState(false)
    //console.log(el)

    useEffect(()=>{
        //console.log(typeof Store.user.fav)
        if(Store.user.fav){
            if(Store.user.fav.includes(el.id)){
            setIsFav(true)
        } else {
            setIsFav(false)
        }}
    },[Store.user.fav, el])

    useEffect(()=>{
        if(Store.user.cart){
        const findItem = Store.user.cart.find((elInCart)=> elInCart.id === el.id)
        if(findItem){
            setIsInCart(true)
        } else {
            setIsInCart(false)
        }}
    },[Store.user.cart, el])

    const brand = brandList[el.brand]
    const category = categoryList[el.cat-1]

    const addToFavHandler = () =>{
        if(isFav){
            //console.log("handler remove")
            Store.removeFav(el.id)
            setIsFav(false)
            toast.success("Удалено из избранного")
        } else {
            //console.log("handler add")
            Store.addToFav(el.id)
            setIsFav(true)
            toast.success("Добавлено в избранное")
        }
    }

    const addToCartHandler = () =>{
        if(isInCart){
            //console.log("handler remove")
            Cart_Store.removeFromCart(el.id)
            setIsInCart(false)
            toast.success("Удалено из корзины")
        } else {
            //console.log("handler add")
            Cart_Store.addToCart(el.id)
            setIsInCart(true)
            toast.success("Добавлено в корзину")
        }
    }

    const popupHandler = () =>{
        Product_Store.setPopupCardId(el.id)
        Store.SetPopup("product-big-cart")

    }

    return (
    <div key={index} className="product-card-wrap">
        <div className='title'>
            id {el.id} {brand} {categoryList[el.cat]}
        </div>
        <div className="image">
            <div className="images-add">
                <Image src={el.img[0]} fill sizes="10vw" alt="" className="img-responsive"/>
            </div>
            <div className="sticker">Хит</div>
            {/*<div className="add-to-cart"></div>*/}
            <input 
                type='button' 
                className={`cart-icon `+(isInCart?"remove-cart":"add-cart")} 
                onClick={addToCartHandler}
            />
            <input 
                type='button' 
                className={`fav-icon `+(isFav?"remove-fav":"add-fav")} 
                onClick={addToFavHandler}
            />
            <div className="rating">
                <div className='star'></div>
                4.5
            </div>
        </div>

        <div className="caption">
            <div className="price_block">
                В наличии: 697 шт.
            </div>
            
            <div className='desc'>{el.desc}</div>
            
            <div className="card-footer">
                    <div className='price'>
                        ЦЕНА: {Store.isAuth?el.price:<div className='lock' title="Цена достувна авторизированым пользователям"/>}
                    </div>
                    <input type='button' onClick={popupHandler} className="more_btn" value="Подробнее" />                    
            </div>
        </div>
    </div>
    );
});

export default (Product_card)
 