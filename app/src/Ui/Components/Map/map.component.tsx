import { useEffect } from "react";
import "./map.style.css";
import { useNavigate } from "react-router-dom";

export function Map({
  encodedPolyLine,
}: {
  encodedPolyLine: string | undefined;
}) {
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const mapUrl = `http://maps.googleapis.com/maps/api/staticmap?size=800x800&path=enc:${encodedPolyLine}&key=${GOOGLE_API_KEY}`;
  const navigate = useNavigate();


  useEffect(()=>{
    if (encodedPolyLine === undefined){
        navigate("/")
    }
  }, [encodedPolyLine])

  return (
    <section className="map_graph--section">
      <h2 className="map_graph--title">Mapa da rota</h2>
      <img src={mapUrl} alt="Mapa com a rota" className="map_graph--img" />
    </section>
  );
}
