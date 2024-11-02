const Info = () => {
    const info = `add_action('init', function() {
    // Register focus keyword field
    register_post_meta('page', '_yoast_wpseo_focuskw', [
        'show_in_rest' => true,    // Make it available in REST API
        'single' => true,          // Single value (not an array)
        'type' => 'string',        // Data type
        'auth_callback' => function() {
            return current_user_can('edit_posts'); // Only allow editors/admins
        }
    ]);
    
    // Register meta description field
    register_post_meta('page', '_yoast_wpseo_metadesc', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);
    
    // Register SEO title field
    register_post_meta('page', '_yoast_wpseo_title', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);
});

// Optional: Also register for posts if you're creating posts
add_action('init', function() {
    // Register focus keyword field for posts
    register_post_meta('post', '_yoast_wpseo_focuskw', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);
    
    // Register meta description field for posts
    register_post_meta('post', '_yoast_wpseo_metadesc', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);
    
    // Register SEO title field for posts
    register_post_meta('post', '_yoast_wpseo_title', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);
});`;
  return (
    <div>
      <div>
      Log in to your WordPress admin panel
Go to Users → Your Profile
Scroll down to "Application Passwords" section
Delete any existing application passwords
Create a new application password:

Name it something recognizable (e.g., "API Access")
Click "Add New Application Password"
Copy the generated password (you'll only see it once)


Important: Make sure your user has the correct role:

Go to Users → All Users
Find your user
Make sure they have "Administrator" or "Editor" role
If not, edit the user and change their role


Check that the REST API is enabled:

Go to Settings → Permalinks
Make sure you're not using "Plain" permalinks
Save changes even if you didn't change anything


If you're using any security plugins:

Disable them temporarily to test
Or configure them to allow REST API access
Common plugins to check:

Wordfence
iThemes Security
All In One WP Security
      </div>
      <div>
      add this to your functions.php file 
      <div>
        {info}
      </div>
      
    </div>
    </div>
  );

}

export default Info;