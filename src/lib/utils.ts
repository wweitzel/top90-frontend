export function cloudfrontEnabled() {
  return import.meta.env.VITE_TOP90_CLOUDFRONT_ENABLED !== 'false';
}
