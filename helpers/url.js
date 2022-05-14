const toSeoFriendly = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const urlHelpers = {
  toSeoFriendly
}

export default urlHelpers