import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const secret = process.env.REVALIDATION_SECRET_TOKEN;

  // Verify Bearer Secret Token
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json(
      { message: 'Unauthorized: Invalid secret token' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { slug, category } = body;

    if (!slug || !category) {
      return NextResponse.json(
        { message: 'Bad Request: Missing slug or category parameter' },
        { status: 400 }
      );
    }

    // On-Demand ISR Invalidation
    revalidatePath(`/${category}/${slug}`);
    revalidatePath(`/${category}`);
    revalidatePath('/');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({
      revalidated: true,
      path: `/${category}/${slug}`,
      timestamp: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error during revalidation', error: String(err) },
      { status: 500 }
    );
  }
}
