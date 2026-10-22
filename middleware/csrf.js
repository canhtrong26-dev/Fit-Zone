import Tokens from 'csrf';
import { NextResponse } from 'next/server';

const tokens = new Tokens();
const CSRF_SECRET = process.env.CSRF_SECRET;

export function csrfMiddleware(request) {
  const method = request.method;

  if (method === 'GET') {
    const token = tokens.create(CSRF_SECRET);
    
    const response = NextResponse.json({ message: 'Token created' });
    response.cookies.set('csrfToken', token, {
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60,
    });
    return response;
  }

 
  if (method === 'POST') {
    const token = request.cookies.get('csrfToken')?.value;
    
    if (!token || !tokens.verify(CSRF_SECRET, token)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }
    return null;
  }

  return null;
}