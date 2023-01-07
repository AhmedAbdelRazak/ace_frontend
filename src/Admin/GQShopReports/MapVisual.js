/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import MapGL from "react-map-gl";

const MAPBOX_TOKEN = process.env.REACT_APP_MAP_BOX;
const MapVisual = () => {
	const [viewport, setViewport] = useState({
		latitude: 37.7577,
		longitude: -122.4376,
		zoom: 8,
		width: window.innerWidth,
		height: window.innerHeight,
	});

	return (
		<MapVisualWrapper>
			<div>Hello From Map</div>
			<MapGL
				mapboxAccessToken={MAPBOX_TOKEN}
				initialViewState={viewport}
				onViewportChange={(newView) => {
					setViewport({ ...viewport, newView });
				}}
				mapStyle='mapbox://styles/kalipsik/ckb2fyfqu123n1ilb5yi7uyns/'
			/>
		</MapVisualWrapper>
	);
};

export default MapVisual;

const MapVisualWrapper = styled.div`
	#map {
		width: 100vw !important;
		height: 100vh !important;
	}
`;
