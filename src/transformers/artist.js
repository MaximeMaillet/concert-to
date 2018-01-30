const get = require('lodash.get');

const _groups = {
  'es': {
    artist: ['id', 'name', 'events'],
    events: ['id', 'name', 'date_start', 'date_end', 'location'],
    location: ['id', 'name', 'address', 'cp', 'city', 'country', 'geoloc'],
  }
};

module.exports = {
  transform,
};

function transform(data, groups) {

  if(typeof data === 'object') {
    return transformAllAsObject(data, groups);
  } else if(Array.isArray(data)) {
    return transformAll(data, groups);
  } else {
    return transformOne(data, groups);
  }
}

function transformAll(data, groups) {
  const array = [];
  for(const i in data) {
    array.push(transformOne(data[i], groups));
  }
  return array;
}

function transformAllAsObject(data, groups) {
  const array = [];
  for(const i in data) {
    const artist = data[i].toJSON();
    array.push(transformOne(artist, groups));
  }
  return array;
}

function transformOne(data, groups) {
  const artist = {};
  const _g = _groups[groups].artist;
  for(const i in _g) {
    artist[_g[i]] = get(data, _g[i], null);
  }

  if(artist.events) {
    const events = [];
    for(const i in data.events) {
      const event = transformData(data.events[i], _groups[groups].events);
      if(event.location) {
        event.location = transformData(data.events[i].location, _groups[groups].location);
        if(_groups[groups].location.indexOf('geoloc') !== -1) {
          event.location.geoloc = {
            lat: get(data.events[i].location, 'latitude', 0),
            lon: get(data.events[i].location, 'longitude', 0),
          };
        }
      }
      events.push(event);
    }
    artist.events = events;
  }

  return artist;
}

function transformData(data, pattern) {
  const object = {};
  for(const i in pattern) {
    object[pattern[i]] = get(data, pattern[i], null);
  }
  return object;
}