import { SitemapStream, streamToPromise } from 'sitemap';
import { photoRepo, urlHelpers } from '../../../helpers'

const photoSitemap = async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000,
    });

    [...new Set(photoRepo.getPhotos().map((photo) => photo.category))].forEach((category) => {
      smStream.write({
        url: `/photos/${category}`,
        changefreq: 'weekly',
        priority: 0.8,
      });
    });

    photoRepo.getPhotos().forEach(photo => {
      smStream.write({
        url: `/photos/${photo.category}/${urlHelpers.toSeoFriendly(photo.title)}`,
        changefreq: 'weekly',
        priority: 0.8,
      });
    });

    smStream.end();

    const sitemapOutput = (await streamToPromise(smStream)).toString();

    res.setHeader('Content-Type', 'application/xml');

    res.end(sitemapOutput);
  } catch (err) {
    res.send(JSON.stringify(err));
  }
};

export default photoSitemap;