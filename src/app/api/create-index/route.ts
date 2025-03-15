import { createIndex } from "@/actions/createIndex";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req:NextRequest) {
    try {

        createIndex()
        NextResponse.json("✅ Created the Index")
    } catch (error : any) {

        console.error( "Error while creating the Index" , error)

        NextResponse.json("❌ Failed the create the Index")
    }

}