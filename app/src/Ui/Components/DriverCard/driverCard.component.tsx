import { useDataContext } from "../../../Hook";
import { Driver } from "../../../Models/Driver";
import "./driverCard.style.css";

export function DriverCard({ driver }: { driver: Driver }) {

    const { sharedData } = useDataContext();

  return (
    <div className="driverCard_div">
      <div className="driverCard">
        <h3 className="driver_name">{driver.name}</h3>
        <p className="driver_description">{driver.description}</p>
        <p className="driver_vehicle">{driver.vehicle}</p>
        <div className="driver_review">
          <p className="driver_rating">Rating: {driver.review.rating}</p>
          <p className="driver_comment">"{driver.review.comment}"</p>
        </div>
        <p className="driver_value">Valor: R${driver.value.toFixed(2)}</p>
        <button className="choose_button">Escolher</button>
      </div>
    </div>
  );
}
