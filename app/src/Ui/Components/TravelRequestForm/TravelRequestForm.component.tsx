import "./TravelRequestForm.style.css";
import { useTravelRequestFormInputs, useNotify } from "../../../Hook/index";
import { estimateRideValue } from "../../../Api/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingGif from "../../../Assets/loading.gif";
import { Dispatch, SetStateAction } from "react";
import { useDataContext } from "../../../Hook/UseDataContext/useDataContext";
import { useNavigate } from "react-router-dom";

export function TravelRequestForm({
  loading,
  setLoading
}: {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const { travelRequestFormInputs, handleChange } = useTravelRequestFormInputs({
    customer_id: "",
    origin: "",
    destination: "",
  });
  const { setSharedData } = useDataContext();
  const { notify } = useNotify();
  const navigate = useNavigate();

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const { customer_id, origin, destination } = travelRequestFormInputs;
    try {
      const response = await estimateRideValue({
        customer_id,
        origin,
        destination,
      });
      let data = response.data;
      data = {
        ...data,
        customer_id: customer_id,
        originString: origin,
        destinationString: destination
      }
      setSharedData(data);
      setLoading(false);
      navigate("/opcoesViagens");
    } catch (error: any) {
      setLoading(false);
      notify(error.response.data.error_description);
    }
  }

  return (
    <>
      <main className="travelRequestForm--main">
        <form className="travelRequestForm--form" onSubmit={handleSubmit}>
          <h1>Requisição de viagem:</h1>
          <div className="travelRequestForm--form_div">
            <span className="travelRequestForm--form_text">Id do usuário:</span>
            <input
              className="travelRequestForm--form_input"
              type="text"
              placeholder="Digite o ID do usuário"
              name="customer_id"
              onChange={handleChange}
            />
          </div>
          <div className="travelRequestForm--form_div">
            <span className="travelRequestForm--form_text">
              Endereço de origem:
            </span>
            <input
              className="travelRequestForm--form_input"
              type="text"
              placeholder="Digite o endereço de origem"
              name="origin"
              onChange={handleChange}
            />
          </div>
          <div className="travelRequestForm--form_div">
            <span className="travelRequestForm--form_text">
              Endereço de destino:
            </span>
            <input
              className="travelRequestForm--form_input"
              type="text"
              placeholder="Digite o endereço de destino"
              name="destination"
              onChange={handleChange}
            />
          </div>
          {loading ? (<img className="travelRequestForm--loading" src={loadingGif} alt="gif para representar carregamento da requisição"/>) : (
            <button type="submit" className="travelRequestForm--form_button">
              Procurar Viagem
            </button>
          )}
        </form>
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
