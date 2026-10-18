import { NextResponse } from 'next/server';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { csrfMiddleware } from '@/middleware/csrf';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export async function GET(request) {
  return csrfMiddleware(request);
}


export async function POST(request) {
  try {

    const csrfError = csrfMiddleware(request);
    if (csrfError) return csrfError;


    const body = await request.json();
    
   
    const cleanData = {
      name: DOMPurify.sanitize(body.name),
      email: DOMPurify.sanitize(body.email),
      phone: DOMPurify.sanitize(body.phone),
      plan: DOMPurify.sanitize(body.plan),
      agree: body.agree,
    };

    console.log('🔍 Dữ liệu TRƯỚC khi lọc:', body);
    console.log('✅ Dữ liệu SAU khi lọc:', cleanData);

    
    return NextResponse.json({
      message: 'Đăng ký thành công!',
      data: cleanData,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}