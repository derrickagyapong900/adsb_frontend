import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Map, { NavigationControl, Source, Layer } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";
import Display from "./Components/Display";

const INITIAL_CENTER = [-95.712891, 37.09024];
const INITIAL_ZOOM = 3.2;

function App() {
  const mapBoxAccessToken =
    "pk.eyJ1IjoiamFtaXNvbmphbmd1bGEiLCJhIjoiY2x1MDlucTF2MDVheDJrbnllYnU4ZG52NiJ9.nA8sNULxHddPbnd9g74YLw";
  const mapRef = useRef(null);

  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [geojsonData, setGeojsonData] = useState();
  const [selectedFeature, setSelectedFeature] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hour, setHour] = useState(1);
  const [resolution, setResolution] = useState(0);
  const [day, setDay] = useState(13);
  const [month, setMonth] = useState(10);
  const [parameterSelect, setParameterSelect] = useState("nic");

  const [fillColor, setFillColors] = useState({
    value: "average_nic",
    activeColor: "#219878", // Color for average_nic > 7
    defaultColor: "#363636", // Default color
  });

  const fetchDataFromBackend = async (
    hour,
    resolution = 2,
    day = 13,
    month = 10
  ) => {
    //TODO:: ALL
    // const response = await fetch(
    //   `http://127.0.0.1:5000/get_polygons?hour=${hour}&resolution=${resolution}`
    // );
    const response = await fetch(
      `http://127.0.0.1:5000/get_daily_polygons?hour=${hour}&resolution=${resolution}&day=${day}`
    );
    const data = await response.json();
    console.log("data", data);
    data && setGeojsonData(data.geojson_data);
  };

  useState(() => {
    fetchDataFromBackend(hour, resolution, day);
  }, []);

  useEffect(() => {
    fetchDataFromBackend(hour, resolution, day);
  }, [hour, resolution, day]);

  useEffect(() => {
    if (parameterSelect == "nic") {
      setFillColors({
        value: "average_nic",
        activeColor: "#219878", // Color for average_nic > 7
        defaultColor: "#363636", // Default color
      });
    } else if (parameterSelect == "nacp") {
      setFillColors({
        value: "average_nacp",
        activeColor: "#0000ff", // Color for average_nic > 7
        defaultColor: "#363636", // Default color
      });
    } else if (parameterSelect == "nacv") {
      setFillColors({
        value: "average_nacv",
        activeColor: "#FF5733", // Color for average_nic > 7
        defaultColor: "#363636", // Default color
      });
    } else if (parameterSelect == "sil") {
      setFillColors({
        value: "average_sil",
        activeColor: "#ec90ff", // Color for average_nic > 7
        defaultColor: "#363636", // Default color
      });
    } else {
      setFillColors({
        value: "average_nic",
        activeColor: "#FF5733", // Color for average_nic > 7
        defaultColor: "#219878", // Default color
      });
    }
  }, [parameterSelect]);

  const handleMapLoad = (event) => {
    const map = event.target; // The map instance from the load event
    mapRef.current = map; // Store the map instance in the ref

    // Add click event listener
    map.on("click", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["ads_b-fill"],
      });

      if (features.length > 0) {
        const clickedFeature = features[0];

        // Check if properties exist and set state
        if (clickedFeature.properties) {
          setSelectedFeature(clickedFeature.properties);

          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(
              `
              <div class="px-7">
              <div>NIC Avg: <b>${
                clickedFeature.properties.average_nic.toFixed(2) || "N/A"
              }</b></div>
              <div>NACp Avg: <b>${
                clickedFeature.properties.average_nacp.toFixed(2) || "N/A"
              }</b></div>
              <div>NACv Avg: <b>${
                clickedFeature.properties.average_nacv.toFixed(2) || "N/A"
              }</b></div>
              <div>SIL Avg: <b>${
                clickedFeature.properties.average_sil.toFixed(2) || "N/A"
              }</b></div>
              </div>
            `
            )
            .addTo(map);
        } else {
          console.log("No properties found on the clicked feature.");
        }
      }
    });
  };

  const handleChangeHour = (e) => {
    if (e.target) {
      setHour(e.target.value);
    }
  };

  const handleChangeResolution = (e) => {
    if (e.target) {
      setResolution(e.target.value);
    }
  };

  const handleParamChange = (e) => {
    if (e.target) {
      setParameterSelect(e.target.value);
    }
  };
  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  const handlePausePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const param = ["nic", "nacp"];

    console.log("is playing");
    const intervalId = setInterval(() => {
      setHour((prevHour) => (prevHour % 24) + 1);
    }, 5000);
    const paramIntervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * param.length);
      const randomItem = param[randomIndex];

      setParameterSelect(randomItem);
    }, 7000);
    return () => {
      clearInterval(intervalId);
      clearInterval(paramIntervalId)
    };
  }, [isPlaying]);

  console.log("geojsonData", geojsonData);
  console.log("day", day);
  console.log("hour", hour);
  console.log("isPlaying", isPlaying);
  console.log("resolution", resolution);
  console.log("parameterSelect", parameterSelect);

  const handleResetBtn = () => {
    mapRef.current.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });
  };

  // const geojson = {
  //   type: "FeatureCollection",
  //   features: [
  //     {
  //       type: "Feature",
  //       geometry: { type: "Point", coordinates: [-122.4, 37.8] },
  //     },
  //   ],
  // };

  // const layerStyle = {
  //   id: "point",
  //   type: "circle",
  //   paint: {
  //     "circle-radius": 10,
  //     "circle-color": "#007cbf",
  //   },
  // };

  // Fill layer with conditional color
  const fillLayer = {
    id: "ads_b-fill",
    type: "fill",
    paint: {
      "fill-color": [
        "case",
        [">", ["get", fillColor.value], 7],
        fillColor.activeColor, // Color for average_nic > 7
        fillColor.defaultColor, // Default color
      ],
      "fill-opacity": 0.6,
    },
  };

  // Line layer for the outline
  const lineLayer = {
    id: "ads_b-line",
    type: "line",
    paint: {
      "line-color": "white",
      "line-width": 1.5,
    },
  };

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken="pk.eyJ1IjoiamFtaXNvbmphbmd1bGEiLCJhIjoiY2x1MDlucTF2MDVheDJrbnllYnU4ZG52NiJ9.nA8sNULxHddPbnd9g74YLw"
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 3,
      }}
      projection={"globe"}
      fog={{
        range: [0.5, 10],
        color: "#183f63",
        "horizon-blend": 0.5,
        "high-color": "#245",
        "space-color": "#000",
        "star-intensity": 0.5,
      }}
      // style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onLoad={handleMapLoad}
    >
      <Display
        hour={hour}
        handleChangeHour={handleChangeHour}
        resolution={resolution}
        handleChangeResolution={handleChangeResolution}
        isPlaying={isPlaying}
        handlePausePlay={handlePausePlay}
        parameterSelect={parameterSelect}
        handleParamChange={handleParamChange}
        day={day}
        handleDayChange={handleDayChange}
        month={month}
      />

      <Source id="ads_b" type="geojson" data={geojsonData}>
        {/* <Layer {...layerStyle} /> */}
        <Layer {...fillLayer} />
        <Layer {...lineLayer} />
      </Source>
      <NavigationControl />
    </Map>
  );
}

export default App;
