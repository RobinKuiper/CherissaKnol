import { NextResponse } from 'next/server';
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req, res){
    return NextResponse.next();
  }
)