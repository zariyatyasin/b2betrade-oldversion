// Import necessary modules
import { NextResponse } from 'next/server';
import { getCurrentUser } from '../../../../utils/session';
import db from '../../../../utils/db';
import HomeHero from '../../../../model/HomeHero';

export const POST = async (request) => {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json('You must be logged in', {
      status: 401,
    });
  }

  try {
    await db.connectDb();

  
    const { title, description, imageType, heroImageSide, images } = await request.json();

   
    const newHero = new HomeHero({
      title,
      description,
       images,  
      imageType,
      heroImageSide,
       
    });

     
    await newHero.save();

    await db.disconnectDb();

    return NextResponse.json(
      {
        message: 'Hero created successfully!',
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
