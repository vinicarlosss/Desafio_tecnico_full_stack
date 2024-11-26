import { useDataContext } from "../../../Hook/UseDataContext/useDataContext";
import { Header, Map } from "../../Components";

export function TravelOptions() {
  const { sharedData } = useDataContext();
  const encodedPolyLine:string | undefined= sharedData?.routeResponse?.routes[0].polyline.encodedPolyline;

  return (
    <>
      <Header />
      <main className="travelOptions_main">
        
      </main>
      <Map encodedPolyLine={encodedPolyLine}/>
    </>
  );
}
