import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || '';
    const url = request.nextUrl.clone();
    const pathname = request.nextUrl.pathname;

    if (hostname === 'onionloop-web.vercel.app') {
        if (pathname.startsWith('/mega')) {
            url.pathname = `/(onionmega)${pathname}`;
            return NextResponse.rewrite(url);
        }
        if (pathname.startsWith('/aggregator')) {
            url.pathname = `/(aggregator)${pathname}`;
            return NextResponse.rewrite(url);
        }
        if (pathname.startsWith('/crew')) {
            url.pathname = `/(onioncrew)${pathname}`;
            return NextResponse.rewrite(url);
        }
        return NextResponse.next();
    }

    const currentHost = hostname
        .replace('.localhost:3000', '')
        .replace('.onionloop.com', '');

    if (currentHost === 'mega') {
        url.pathname = `/(onionmega)${pathname}`;
        return NextResponse.rewrite(url);
    }

    if (currentHost === 'aggregator') {
        url.pathname = `/(aggregator)${pathname}`;
        return NextResponse.rewrite(url);
    }

    if (currentHost === 'crew' || currentHost === 'www' || currentHost === '') {
        url.pathname = `/(onioncrew)${pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|site.webmanifest|sitemap.xml|robots.txt).*)',
    ],
};