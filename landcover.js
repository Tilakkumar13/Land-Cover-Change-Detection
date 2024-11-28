// Define the region of interest (ROI)
var roi = ee.Geometry.Rectangle([75.0, 10.0, 80.0, 15.0]); // Example: Adjust coordinates

// Load MODIS Land Cover Type datasets for two years
var landCover2001 = ee.Image('MODIS/006/MCD12Q1/2001_01_01')
                      .select('LC_Type1')
                      .clip(roi);
var landCover2020 = ee.Image('MODIS/006/MCD12Q1/2020_01_01')
                      .select('LC_Type1')
                      .clip(roi);

// Display land cover images
Map.centerObject(roi, 6);
Map.addLayer(landCover2001, {min: 1, max: 17, palette: ['aec3d4', '162103', '235123', '399b38',
  '38eb38', '39723b', '6a2424', 'c3a55f', 'b76124', 'd9903d', '91af40', '111149',
  'cdb400', 'cc0202', '332808', 'd7cdcc', 'f7e174']}, 'Land Cover 2001');
Map.addLayer(landCover2020, {min: 1, max: 17, palette: ['aec3d4', '162103', '235123', '399b38',
  '38eb38', '39723b', '6a2424', 'c3a55f', 'b76124', 'd9903d', '91af40', '111149',
  'cdb400', 'cc0202', '332808', 'd7cdcc', 'f7e174']}, 'Land Cover 2020');

// Compute land cover change (binary: 0 = no change, 1 = change)
var change = landCover2001.neq(landCover2020).rename('Change');

// Visualize changes on the map
Map.addLayer(change, {min: 0, max: 1, palette: ['white', 'red']}, 'Land Cover Change');

// Inspect change values (optional debug)
print('Change min and max values:', change.reduceRegion({
  reducer: ee.Reducer.minMax(),
  geometry: roi,
  scale: 500,
  maxPixels: 1e13
}));

// Calculate area of change (in km²)
var pixelArea = ee.Image.pixelArea(); // Each pixel's area in m²
var changeArea = change.multiply(pixelArea).divide(1e6); // Convert area to km²

// Sum the total area of change
var stats = changeArea.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi,
  scale: 500,
  maxPixels: 1e13
});

// Print results
print('Total area of change (km²):', stats.get('Change'));

// Scale binary image for better visualization in export (0-255)
var scaledChange = change.multiply(255).uint8();  // Scale values to 0-255

// Export the scaled change image to Google Drive
Export.image.toDrive({
  image: scaledChange,  // Export scaled image
  description: 'HighQuality_LandCoverChange',  // Name of the export
  scale: 30,  // High resolution (30 meters per pixel)
  region: roi,  // Specify ROI
  maxPixels: 1e9,  // Handle large images
  fileFormat: 'GeoTIFF',  // Export as GeoTIFF
  fileNamePrefix: 'HighQuality_LandCoverChange',  // File name prefix
  crs: 'EPSG:4326',  // WGS84 geographic projection
  formatOptions: {
    cloudOptimized: true  // Enable cloud optimization for faster access
  }
});
