import { useDataContext, useNotify } from "../../../Hook";
import { Driver } from "../../../Models/Driver";
import { confirmRide } from "../../../Api";
import "./driverCard.style.css";
import { ConfirmRideRequest } from "../../../Models/ConfirmRideRequest";

export function DriverCard({ driver }: { driver: Driver }) {

    const { sharedData } = useDataContext();
    const { notify } = useNotify();
    async function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
      event.preventDefault();
      if (!sharedData) {
        notify("Dados inconsistentes");
        return;
      }
      try{
        const data: ConfirmRideRequest = {
          customer_id: sharedData.customer_id,
          origin: sharedData.originString,
          destination: sharedData.destinationString,
          distance: sharedData.distance,
          duration: sharedData.duration,
          driver: {
            id: driver.id,
            name: driver.name,
          },
          value: driver.value
        };
        await confirmRide(data);
        notify("Viagem confirmada");
      } catch(error: any){
        notify(error.response.data.error_description);
      }
    }

  return (
    <div className="driverCard_div">
      <div className="driverCard">
        <h3 className="driver_name">{driver.name}</h3>
        <p className="driver_description">{driver.description}</p>
        <p className="driver_vehicle">{driver.vehicle}</p>
        <div className="driver_review">
          <p className="driver_rating">Avaliação: {driver.review.rating}</p>
          <p className="driver_comment">"{driver.review.comment}"</p>
        </div>
        <p className="driver_value">Valor: R${driver.value.toFixed(2)}</p>
        <button onClick={(e)=> handleSubmit(e)} className="choose_button">Escolher</button>
      </div>
    </div>
  );
}
