export function checksum(s) {
  var hash = 0,
    strlen = s.length,
    i,
    c;
  if (strlen === 0) {
    return hash;
  }
  for (i = 0; i < strlen; i++) {
    c = s.charCodeAt(i);
    hash = (hash << 5) - hash + c;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function generateDeviceId() {
  var nav = window.navigator;
  var screen = window.screen;
  var deviceId = nav.mimeTypes.length;
  Object.values(navigator.mimeTypes).forEach((p) => (deviceId += p.type));
  deviceId += nav.userAgent.replace(/\D+/g, ""); //Only use digits
  deviceId += nav.plugins.length;
  Object.values(navigator.plugins).forEach((p) => (deviceId += p.filename));
  deviceId += screen.height || "";
  deviceId += screen.width || "";
  deviceId += screen.pixelDepth || "";
  return checksum(deviceId);
}
