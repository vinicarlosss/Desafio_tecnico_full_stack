import "./travelOptions.style.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
        <section className="travelOptions_drivers--container">
          <button
            onClick={handlePreviousPage}
            disabled={page === 0}
            className="pagination-arrow left-arrow"
          >
            <FaChevronLeft />
          </button>
          
          <div className="travelOptions_drivers--list">
            {currentDrivers?.map((driver) => (
              <DriverCard key={driver.id} driver={driver} />
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={!hasMoreDrivers}
            className="pagination-arrow right-arrow"
          >
            <FaChevronRight />
          </button>
        </section>
      </main>
    </>
  );
}
