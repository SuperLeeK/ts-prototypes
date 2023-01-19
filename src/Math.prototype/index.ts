declare global {
  interface Math {
    dfs_xy_conv: (latlng: { lat: number; lng: number }) => {
      x: number;
      y: number;
    };
    mid: (min: number, value: number, max: number) => number;
    distance: (x0: number, y0: number, x1: number, y1: number) => number;
    distanceWGS84: (lat1: number, long1: number, lat2: number, long2: number) => number;
    betweenRandom: (max: number, min: number, isInt?: boolean) => number;
  }
}

export {};

Math.dfs_xy_conv = (latlng) => {
  const RE = 6371.00877; // Earth Radius (km)
  const GRID = 5.0; // Grid Distance(km)
  const SLAT1 = 30.0; // Projection Latitude1 (degree)
  const SLAT2 = 60.0; // Projection Latitude (degree)
  const OLON = 126.0; // Target Longitude(degree)
  const OLAT = 38.0; // Target Latitude (degree)
  const XO = 43; // Reference X Coordinate(GRID)
  const YO = 136; // Reference Y Coordinate(GRID)

  const D2R = Math.PI / 180.0;

  const re = RE / GRID;
  const slat1 = SLAT1 * D2R;
  const slat2 = SLAT2 * D2R;
  const olon = OLON * D2R;
  const olat = OLAT * D2R;

  const sn =
    Math.log(Math.cos(slat1) / Math.cos(slat2)) /
    Math.log(Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5));
  const sf = (Math.pow(Math.tan(Math.PI * 0.25 + slat1 * 0.5), sn) * Math.cos(slat1)) / sn;
  const ro = (re * sf) / Math.pow(Math.tan(Math.PI * 0.25 + olat * 0.5), sn);
  const ra = (re * sf) / Math.pow(Math.tan(Math.PI * 0.25 + latlng.lat * D2R * 0.5), sn);
  let theta = latlng.lng * D2R - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  // console.log("GPSService", "theta: " + theta);
  // console.log("GPSService", "double gridx: " + Math.floor(ra * Math.sin(theta) + XO + 0.5));

  return {
    x: Math.floor(ra * Math.sin(theta) + XO + 0.5),
    y: Math.floor(ro - ra * Math.cos(theta) + YO + 0.5)
  };
};

Math.mid = (min, value, max) => Math.min(max, Math.max(min, value));

Math.distance = (x0, y0, x1, y1) => Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));

Math.distanceWGS84 = (lat1, long1, lat2, long2) => {
  const R = 6371.00877; // earth radius with km
  const a =
    Math.pow(Math.sin(((lat2 - lat1) * Math.PI) / 360), 2) +
    Math.pow(Math.sin(((long2 - long1) * Math.PI) / 360), 2) *
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180);
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

type EParse = (string: string, radix?: number) => number;
Math.betweenRandom = (_max, _min, isInt = true) => {
  if (_max == _min) return _min;
  const parse: EParse = isInt ? parseInt : parseFloat;
  const max = parse(String(_max > _min ? _max : _min));
  const min = parse(String(_max < _min ? _max : _min));
  return parse(String(Math.random() * (max - min) + min));
};
