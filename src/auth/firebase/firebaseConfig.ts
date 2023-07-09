const config = {
    "api_key": process.env['FIREBASE_CONFIG_API_KEY'],
    "app_id": process.env['FIREBASE_CONFIG_APP_ID'],
    "auth_domain": process.env['FIREBASE_CONFIG_AUTH_DOMAIIN'],
    "auth_provider_x509_cert_url": process.env['FIREBASE_CONFIG_AUTH_PROVIDER'],
    "auth_uri": process.env['FIREBASE_CONFIG_AUTH_URI'],
    "client_email": process.env['FIREBASE_CONFIG_CLIENT_EMAIL'],
    "client_id": process.env['FIREBASE_CONFIG_CLIENT_ID'],
    "client_x509_cert_url": process.env['FIREBASE_CONFIG_CLIENT_CERTIFICATE_URL'],
    "measurement_id": process.env['FIREBASE_CONFIG_MEASUREMENT_ID'],
    "message_sender_id": process.env['FIREBASE_CONFIG_MESSAGE_SENDER_ID'],
    "private_key": process.env['FIREBASE_CONFIG_PRIVATE_KEY'].replace(/\\n/g, '\n'),
    "private_key_id": process.env['FIREBASE_CONFIG_PRIVATE_KEY_ID'],
    "project_id": process.env['FIREBASE_CONFIG_PROJECT_ID'],
    "type": process.env['FIREBASE_CONFIG_TYPE'],
    "token_uri": process.env['FIREBASE_CONFIG_TOKEN_URI'],
    "storage_bucket": process.env[''],
    "universe_domain": process.env['FIREBASE_CONFIG_UNIVERSE_DOMAIN']
}

export default config;