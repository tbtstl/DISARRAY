import { minify } from 'uglify-js';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function (req: VercelRequest, res: VercelResponse) {
  const minified = minify(req.body, {});

  if (minified.error) {
    throw minified.error;
  }

  return res.json({ encoded: new Buffer(minified.code).toString('base64') });
}
