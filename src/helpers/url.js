const slugify = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const urlHelpers = {
  slugify
}

export default urlHelpers