import "./travelOptions.style.css";
import { useDataContext, usePage } from "../../../Hook/";
import { DriverCard, Header, Map } from "../../Components";

export function TravelOptions() {
  const { sharedData } = useDataContext();
  const { page, handlePreviousPage, handleNextPage } = usePage();
  const driverOptions = sharedData?.options?.sort((a, b) => a.value - b.value);
  const encodedPolyLine: string | undefined =
    sharedData?.routeResponse?.routes[0].polyline.encodedPolyline;
  const driversPerPage = 3;
  const indexOfLastDriver = ( page+1 ) * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = driverOptions?.slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );
  const hasMoreDrivers =
    currentDrivers && currentDrivers.length === driversPerPage;

  return (
    <>
      <Header />
      <main className="travelOptions_main">
        <Map encodedPolyLine={encodedPolyLine} />
        <section className="travelOptions_drivers--section">
          {currentDrivers?.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
          {( driverOptions?.length || 0 ) <= driversPerPage ? null :(
            <div className="pagination">
            <button onClick={handlePreviousPage} disabled={page === 0}>
              Anterior
            </button>
            <span>Página { page + 1 }</span>
            <button onClick={handleNextPage} disabled={!hasMoreDrivers}>
              Próxima
            </button>
          </div>
          )}
        </section>
      </main>
    </>
  );
}
