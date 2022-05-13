const toSeoFriendly = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// .val().toLowerCase().replace(/ +/g,'_').replace(/[0-9]/g,'').replace(/[^a-z0-9-_]/g,'').trim();

const helpers = { toSeoFriendly };

export default helpers;