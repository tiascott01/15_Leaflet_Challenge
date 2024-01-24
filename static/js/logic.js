// Constants
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Map Initialization
const myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Function to Get Color based on Depth
function getColor(depth) {
  return depth > 90 ? '#8B0000' :
         depth > 70 ? '#B22222' :
         depth > 50 ? '#FF8C00' :
         depth > 30 ? '#FFD700' :
         depth > 10 ? '#ADFF2F' :
         '#00FF00';  
}

// Function to Create Circle Markers
function createCircleMarker(geometry, properties) {
    const { place, mag, time, url } = properties;
    const depth = geometry.coordinates[2];
    const date = new Date(time).toLocaleDateString("en-US");
  
    const circleMarker = L.circle([geometry.coordinates[1], geometry.coordinates[0]], {
      fillOpacity: 0.2,
      color: "black",
      weight: 0.5,
      fillColor: getColor(depth),
      radius: mag * 40000 * 0.5
    });
  
    const popupContent = `
      <h1>${place}</h1>
      <hr>
      <h3>Magnitude: ${mag}</h3>
      <h4>Date: ${date}</h4>
      <h5>Depth: ${depth}</h5>
      <a href="${url}" target="_blank">Event Details</a>
    `;
  
    return circleMarker.bindPopup(popupContent);
}

// Fetch and Process Earthquake Data
d3.json(url).then(({ features }) => {
    features
      .filter(({ properties }) => properties.mag !== null && !isNaN(properties.mag) && properties.mag >= 0.001)
      .forEach(({ geometry, properties }) => createCircleMarker(geometry, properties).addTo(myMap));
  });

// Create Static Legend
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
  const div = L.DomUtil.create('div', 'info legend');
  div.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
  div.style.padding = '10px';
  const depthRanges = [
    { min: -10, max: 10 },
    { min: 10, max: 30 },
    { min: 30, max: 50 },
    { min: 50, max: 70 },
    { min: 70, max: 90 },
    { min: 90, max: Infinity }
  ];

  // Add title to the legend with some margin
  div.innerHTML = '<div style="margin-bottom: 8px;"><strong>Depth Legend</strong></div>';

  // Generate a label with a colored square for each depth range using map
  div.innerHTML += depthRanges.map(({ min, max }) => {
    const color = getColor(max);
    const label = max !== Infinity ? `${min} &ndash; ${max}` : `${min}+`;
    return `<div><i style="background:${color}; width: 18px; height: 18px; display: inline-block; margin-right: 5px;"></i>${label}</div>`;
  }).join('');

  return div;
};

legend.addTo(myMap);
