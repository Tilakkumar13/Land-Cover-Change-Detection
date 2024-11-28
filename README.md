# Land Cover Change Detection and Analysis Using Google Earth Engine

This project demonstrates the detection and analysis of land cover changes over a region of interest (ROI) using Google Earth Engine (GEE) and MODIS land cover datasets. The tool allows users to visualize land cover classifications for specific years, identify areas of significant change, and calculate the total area impacted.

---

## Features

- **Land Cover Data Analysis**: Uses MODIS MCD12Q1 datasets for the years 2001 and 2020.
- **Change Detection**:
  - Identifies changes between land cover classes.
  - Highlights changes on a binary map (No Change = White, Change = Red).
- **Quantitative Analysis**:
  - Calculates the total area of land cover change in square kilometers.
- **High-Quality Export**:
  - Exports the change detection map as a GeoTIFF file at 30-meter resolution.
  - Includes cloud optimization for efficient access and storage.

---

## Dataset

- **MODIS MCD12Q1**: Annual land cover type classification product.
  - Source: [MODIS Land Cover Type Product](https://developers.google.com/earth-engine/datasets/catalog/MODIS_006_MCD12Q1)
  - Classes: 17 land cover types, including forests, croplands, water, and urban areas.

---

## Prerequisites

1. A [Google Earth Engine](https://earthengine.google.com/) account.
2. Basic knowledge of JavaScript and GEE's Code Editor.

---


