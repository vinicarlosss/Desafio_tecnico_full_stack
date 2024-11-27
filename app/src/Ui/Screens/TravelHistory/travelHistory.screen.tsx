import { useEffect, useState } from "react";
import { getRides } from "../../../Api/Ride/getRides.api";
import { useNotify, usePage, useTravelHistoryFormInputs } from "../../../Hook";
import { GetRidesResponse } from "../../../Models/GetRidesResponse";
import { Header, TravelCard } from "../../Components";
import "./travelHistory.style.css";
import { ToastContainer } from "react-toastify";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getAllDrivers } from "../../../Api/Driver/getAllDrivers.api";
import { GetAllDriversResponse } from "../../../Models/GetAllDriversResponse";

export function TravelHistory() {
  const { travelHistoryFormInputs, handleChange } = useTravelHistoryFormInputs({
    customer_id: "",
    driver_id: "",
  });
  const [rides, setRides] = useState<GetRidesResponse>();
  const [ drivers, setDrivers ] = useState<GetAllDriversResponse[]>();
  const { notify } = useNotify();
  const { page, handlePreviousPage, handleNextPage } = usePage();
  const travelHistory = rides?.rides;
  const travelsPerPage = 10;
  const indexOfLastRide = (page + 1) * travelsPerPage;
  const indexOfFirstTravel = indexOfLastRide - travelsPerPage;
  const currentTravels = travelHistory
    ?.slice(indexOfFirstTravel, indexOfLastRide)
    ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const hasMoreTravels =
    currentTravels && currentTravels.length === travelsPerPage;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRides(undefined);
    try {
      const result = await getRides(travelHistoryFormInputs);
      setRides(result.data);
    } catch (error: any) {
      notify(error.response.data.error_description);
    }
  }

  async function fetchDrivers(){
    try{
      const response = await getAllDrivers();
      setDrivers(response.data);
    } catch(error: any){
      notify(error.response.data.error_description);
    };
  };

  useEffect(()=>{
    fetchDrivers();
  }, []);


  return (
    <>
      <Header />
      <main className="travelHistory--main">
        <form className="travelHistory--form" onSubmit={handleSubmit}>
          <span>Id do usuário:</span>
          <input
            name="customer_id"
            onChange={handleChange}
            placeholder="Digite o id do usuário"
          />
          <span>Motorista:</span>
          <select name="driver_id" onChange={handleChange}>
            <option value="">Todos</option>
            {drivers?.map((driver)=>{
              return(
                <option key={driver.id} value={driver.id}>{driver.name}</option>
              )
            })}
          </select>
          <button>Aplicar</button>
        </form>
        <section className="travelHistory_travels--section">
          <button
            onClick={handlePreviousPage}
            disabled={page === 0}
            className="pagination-arrow left-arrow"
          >
            <FaChevronLeft />
          </button>
          <div className="travelHistory--card--div">
            {currentTravels?.map((travel) => (
              <TravelCard key={travel.id} travel = {travel}/>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            disabled={!hasMoreTravels}
            className="pagination-arrow right-arrow"
          >
            <FaChevronRight />
          </button>
        </section>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{ textAlign: "justify", zIndex: "200" }}
        />
      </main>
    </>
  );
}
