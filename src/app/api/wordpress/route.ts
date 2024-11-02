import { NextRequest, NextResponse } from 'next/server';

interface WordPressResponse {
  id: number;
  link: string;
  status: string;
}

interface WPCredentials {
  url: string;
  username: string;
  applicationPassword: string;
}

interface YoastMeta {
  focusKeyphrase: string;
  metaDesc: string;
  metaTitle: string;
}

async function createWordPressPost(
  title: string,
  content: string,
  yoastMeta: YoastMeta,
  credentials: WPCredentials
) {
  const baseUrl = credentials.url.replace(/\/+$/, '');
  const endpoint = `${baseUrl}/wp-json/wp/v2/pages`;

  // Properly encode authorization header
  const authString = `${credentials.username}:${credentials.applicationPassword}`;
  const base64Auth = Buffer.from(authString).toString('base64');

  try {
    // First create the post
    const postResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${base64Auth}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
        status: 'draft',
        meta: {
          '_yoast_wpseo_focuskw': yoastMeta.focusKeyphrase,
          '_yoast_wpseo_metadesc': yoastMeta.metaDesc,
          '_yoast_wpseo_title': yoastMeta.metaTitle
        }
      })
    });

    if (!postResponse.ok) {
      const errorData = await postResponse.json();
      console.error('WordPress error details:', errorData);
      throw new Error(`${postResponse.status} ${postResponse.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data: WordPressResponse = await postResponse.json();

    // Update Yoast metadata using the REST API
    const metaEndpoint = `${baseUrl}/wp-json/wp/v2/pages/${data.id}`;
    const metaResponse = await fetch(metaEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${base64Auth}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        meta: {
          '_yoast_wpseo_focuskw': yoastMeta.focusKeyphrase,
          '_yoast_wpseo_metadesc': yoastMeta.metaDesc,
          '_yoast_wpseo_title': yoastMeta.metaTitle
        }
      })
    });

    if (!metaResponse.ok) {
      console.error('Failed to update Yoast metadata:', await metaResponse.json());
    }

    // Also try updating via the Yoast REST API endpoint if available
    try {
      const yoastEndpoint = `${baseUrl}/wp-json/yoast/v1/meta/${data.id}`;
      await fetch(yoastEndpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${base64Auth}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          focus_keyword: yoastMeta.focusKeyphrase,
          meta_description: yoastMeta.metaDesc,
          title: yoastMeta.metaTitle
        })
      });
    } catch (error) {
      console.error('Failed to update via Yoast API:', error);
    }

    return {
      success: true,
      post: data
    };

  } catch (error) {
    console.error('WordPress API error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, yoastMeta, wpCredentials } = body;
    console.log("Received yoastMeta:", yoastMeta);

    // Validate credentials
    if (!wpCredentials?.url || !wpCredentials?.username || !wpCredentials?.applicationPassword) {
      return NextResponse.json(
        { error: 'WordPress credentials are missing' },
        { status: 400 }
      );
    }

    // Validate Yoast metadata
    if (!yoastMeta?.focusKeyphrase || !yoastMeta?.metaDesc || !yoastMeta?.metaTitle) {
      console.warn('Incomplete Yoast metadata:', yoastMeta);
    }

    const post = await createWordPressPost(
      title,
      content,
      yoastMeta,
      wpCredentials
    );

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error in WordPress API route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create WordPress post' },
      { status: 500 }
    );
  }
}