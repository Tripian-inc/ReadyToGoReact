/* eslint-disable no-console */
const isGoogle = (): boolean => {
  if (!google) {
    console.error('[GoogleMaps]: Google script not loaded');
    return false;
  }

  if (!google.maps) {
    console.error('[GoogleMaps]: Google maps script not loaded');
    return false;
  }

  if (!google.maps.Map) {
    console.error('[GoogleMaps]: Google maps Map script not loaded');
    return false;
  }

  if (!google.maps.places) {
    console.error('[GoogleMaps]: Google maps places script not loaded');
    return false;
  }

  return true;
};

export default isGoogle;
