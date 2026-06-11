import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || '';

    const currentHost = hostname
        .replace('.localhost:3000', '')
        .replace('.onionloop.com', '')
        .replace('.onionloop-web.vercel.app', '');

    const url = request.nextUrl.clone();

    if (currentHost === 'mega') {
        url.pathname = `/(onionmega)${request.nextUrl.pathname}`;
        return NextResponse.rewrite(url);
    }

    if (currentHost === 'aggregator') {
        url.pathname = `/(aggregator)${request.nextUrl.pathname}`;
        return NextResponse.rewrite(url);
    }

    if (currentHost === 'crew' || currentHost === 'www' || currentHost === '' || currentHost === 'onionloop-web.vercel.app') {
        url.pathname = `/(onioncrew)${request.nextUrl.pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|site.webmanifest|sitemap.xml|robots.txt).*)',
    ],
};