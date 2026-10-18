import Tokens from 'csrf';
import { NextResponse } from 'next/server';

const tokens = new Tokens();
const CSRF_SECRET = process.env.CSRF_SECRET;

export function csrfMiddleware(request) {
  const method = request.method;

 
  if (method === 'GET') {
    const token = tokens.create(CSRF_SECRET);
    return NextResponse.json({
      csrfToken: token,
      message: 'Token created',
    });
  }

  if (method === 'POST') {
    const token = request.headers.get('x-csrf-token');

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