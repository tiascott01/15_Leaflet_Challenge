# 15_Leaflet_Challenge

#### View my web dahsboard here: https://tiascott01.github.io/14_NavelBiodiversity_Challenge/

## Overview

This repository contains a several files and folders for launching and running a website with leaflet, analyzing earthquake data from USGS. The main files ('index.html' and 'logic.js' (inside the static/js folder)) are for the running, styling and data handling of the website and activating analysis of the website and leaflet handling. Additional files and folders are in the repository as well, ('images') which contain images used in of the website.

## Results

In the 15_Leaflet_Challenge, the setup is to read-in a hosted .json file from USGS website containing data about earthquakes, location and magnitude all over the world. The purpose of the challenge was to create a leaflet map that maps the coordinating earthquake site and correlate the size and magnitude with a custom depth color to indicate the severity of the earthquake. Since no methodology was read-into the original source files I came up with a brief organization of my 'logic.js' to help streamline my creation and where I was needing functions and code to execute the dashboard. The organization is as follows:

1. Read in the sample Data url

2. Map creation and initialization
   
3. Create a custom color based on the depth

4. Create the circle markers

5. Fetch and process the earthquake data

6. Create the legend and add styling for readability


## Usage

You can use this file to setup the data in the corresponding notebook.

1. Click through to the above link.

2. Once the site is loaded you can look at data across the globe and the correlating legend. 
    <p align="center">
    <img src="https://github.com/tiascott01/15_Leaflet_Challenge/blob/main/Images/Leaflet.png" width="750">
    </p>


## Resources and Citations

1. General - ChatGpt.com
