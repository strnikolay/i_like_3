import { prisma } from '../../../../prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function POST(req: NextRequest) {
  const data = await req.json();
  //console.log("data в route",data.email)
  const res = await prisma.user.findUnique({
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

  //console.log("route", res)
    
  return NextResponse.json(res)
} 

export async function PATCH(req: NextRequest) {
  const data = await req.json();

  if(data.fav){
    const updateUser = await prisma.user.update({
      where: {
        email: data.email,
      },
      data: {
        fav: data.fav,
      },
    })
    return updateUser
    //console.log("fav", data.fav)
  }

  /*if(data.cart){
    const updateUser = await prisma.user.update({
      where: {
        email: data.email,
      },
      data: {
        cart: data.cart,
      },
    })
  }*/

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
 