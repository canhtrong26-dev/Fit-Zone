import { NextResponse } from 'next/server';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export async function POST(request) {
  try {
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
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
}