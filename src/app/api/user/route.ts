import { prisma } from '../../../../prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { IcartItemParam, IUser } from '@/store/interfaces';

export async function POST(req: NextRequest) {
  const data = await req.json();
  //console.log("data в route",data.email)
  const user:IUser = await prisma.user.findUnique({
    relationLoadStrategy: 'join',
    where: {
      email: data.email,
    },
    include: {
      contact: true,
      adress: true,
      orderHistory: true,
    }
  })
  
  user.cart = user.orderHistory?.find((order)=>order.status==="inCart")
  
  const productParams:IcartItemParam = await prisma.cartItem.findMany({
    relationLoadStrategy: 'join',
    where: {
      orderId:user.cart?.id  
    },
    include:{
      itemParams:true,
    }
  })
  console.log("productParams",productParams)
  user.cart?.productParams = [productParams]
  //console.log("route get_user", user)
    
  return NextResponse.json(user)
} 

export async function PATCH(req: NextRequest) {
  const data = await req.json();

  console.log("route user patch data", data)

  if(data.fav){
    const updateUser = await prisma.user.update({
      where: {
        email: data.email,
      },
      data: {
        fav: data.fav,
      },
    })
    //console.log("updateUser", updateUser)
    //return updateUser
    return NextResponse.json(updateUser)
    //console.log("fav", data.fav)
  }

  //console.log("patch11", req)
  //console.log("data", data)
  //console.log("data в route",data.email)
  /*const res = await prisma.user.findUnique({
    relationLoadStrategy: 'join',
    where: {
      email: data.email,
    },
    include: {
      contact: true,
      adress: true,
      orderHistory: true,
    }
  })*/

  //console.log("route", res)
    
  //return NextResponse.json(res)
} 
 