import { Ride } from "../../../Models/GetRidesResponse";
import "./travelCard.style.css";

export function TravelCard({ travel }: { travel : Ride }) {
  return (
    <>
      <div className="travel_card">
        <header className="travel_header">
          <h3>Viagem #{travel.id}</h3>
          <p className="travel_date">
            {new Date(travel.date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
            às{" "}
            {new Date(travel.date).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </header>
        <div className="travel_details">
          <p>
            <strong>Motorista:</strong> {travel.driver.name}
          </p>
          <p>
            <strong>Origem:</strong> {travel.origin}
          </p>
          <p>
            <strong>Destino:</strong> {travel.destination}
          </p>
          <p>
            <strong>Distância</strong> {travel.distance.toFixed(2)} Km
          </p>
          <p>
            <strong>Duração:</strong> {travel.duration}
          </p>
          <p>
            <strong>Valor:</strong> R$ {travel.value}
          </p>
        </div>
      </div>
    </>
  );
}
