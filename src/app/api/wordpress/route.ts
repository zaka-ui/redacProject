// app/api/wordpress/route.ts

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

interface ElementorTemplate {
  title: string;
  content: string;
  template_type: string;
  elementor_data: string;
}
async function getElementorVersion(credentials: WPCredentials) {
  const baseUrl = credentials.url.replace(/\/+$/, '');
  const endpoint = `${baseUrl}/wp-json/elementor/v1/system-info`;

  const authString = `${credentials.username}:${credentials.applicationPassword}`;
  const base64Auth = Buffer.from(authString).toString('base64');

  try {
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Basic ${base64Auth}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      // Fallback to a safe default version if we can't get the actual version
      return '3.7.0';
    }

    const data = await response.json();
    return data.elementor?.version || '3.7.0';
  } catch (error) {
    console.error('Failed to get Elementor version:', error);
    // Fallback to a safe default version
    return '3.7.0';
  }
}
async function createElementorPage(
  title: string,
  content: string,
  yoastMeta: any,
  elementorData: string,
  credentials: WPCredentials
) {
  const elementorVersion = await getElementorVersion(credentials);
  console.log('Detected Elementor version:', elementorVersion);
  const baseUrl = credentials.url.replace(/\/+$/, '');
  const endpoint = `${baseUrl}/wp-json/wp/v2/pages`;

  const authString = `${credentials.username}:${credentials.applicationPassword}`;
  const base64Auth = Buffer.from(authString).toString('base64');

  try {
    // First, create the page with Elementor data
    const postResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${base64Auth}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        title: `*** ${title}`,
        content: content,
        status: 'draft',
        meta: {
          _elementor_edit_mode: 'builder',
          _elementor_template_type: 'page',
          _elementor_version: elementorVersion,
          _elementor_data: elementorData,
          _wp_page_template: 'elementor_header_footer',
          _yoast_wpseo_focuskw: yoastMeta.focusKeyphrase,
          _yoast_wpseo_metadesc: yoastMeta.metaDesc,
          _yoast_wpseo_title: yoastMeta.metaTitle
        }
      })
    });

    if (!postResponse.ok) {
      const errorData = await postResponse.json();
      throw new Error(`${postResponse.status} ${postResponse.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data: WordPressResponse = await postResponse.json();

    // Update Elementor data using Elementor's API if needed
    try {
      const elementorEndpoint = `${baseUrl}/wp-json/elementor/v1/document/save/draft`;
      await fetch(elementorEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${base64Auth}`,
        },
        body: JSON.stringify({
          post_id: data.id,
          status: 'draft',
          elements: JSON.parse(elementorData),
        })
      });
    } catch (error) {
      console.warn('Failed to update via Elementor API:', error);
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
    const { title, content, yoastMeta, wpCredentials, elementorData } = body;

    // Validate credentials
    if (!wpCredentials?.url || !wpCredentials?.username || !wpCredentials?.applicationPassword) {
      return NextResponse.json(
        { error: 'WordPress credentials are missing' },
        { status: 400 }
      );
    }

    const post = await createElementorPage(
      title,
      content,
      yoastMeta,
      elementorData,
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