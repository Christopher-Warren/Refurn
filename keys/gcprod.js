module.exports = {
  type: process.env.gc_type,
  project_id: process.env.gc_project_id,
  private_key_id: process.env.gc_private_key_id,
  private_key: process.env.gc_private_key,
  client_email: process.env.gc_client_email,
  client_id: process.env.gc_client_id,
  auth_uri: process.env.gc_auth_uri,
  token_uri: process.env.gc_token_uri,
  auth_provider_x509_cert_url: process.env.gc_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.gc_client_x509_cert_url,
};
