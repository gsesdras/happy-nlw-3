import React, { useEffect, useState } from "react";
import mapMarkerImg from "../images/map-marker.svg";
import { Link } from "react-router-dom";
import { FiPlus, FiSun, FiArrowRight } from "react-icons/fi";
import "../styles/pages/orphanages-map.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("orphanages").then((res) => {
      setOrphanages(res.data);
    });
  }, []);

  const [mode, setMode] = useState("light");
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Aracaju</strong>
          <span>Sergipe</span>
        </footer>
      </aside>

      <Map
        center={[-10.942606, -37.0718033]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${mode}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`orphanages/${orphanage.id}`}>
                  <FiArrowRight size={28} />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link
        to="#"
        className="dark-mode"
        onClick={() => {
          if (mode == "light") {
            setMode("dark");
          } else {
            setMode("light");
          }
        }}
      >
        <FiSun size={32} color="#FFF" />
      </Link>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
