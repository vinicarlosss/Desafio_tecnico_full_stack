import "./TravelRequestForm.style.css";

export function TravelRequestForm() {
  return (
    <main className="travelRequestForm--main">
      <form className="travelRequestForm--form">
        <h1>Requisição de viagem:</h1>
        <div className="travelRequestForm--form_div">
          <span className="travelRequestForm--form_text">Id do usuário:</span>
          <input
            className="travelRequestForm--form_input"
            type="text"
            placeholder="Digite o ID do usuário"
          />
        </div>
        <div className="travelRequestForm--form_div">
          <span className="travelRequestForm--form_text">Endereço de origem:</span>
          <input
            className="travelRequestForm--form_input"
            type="text"
            placeholder="Digite o endereço de origem"
          />
        </div>
        <div className="travelRequestForm--form_div">
          <span className="travelRequestForm--form_text">Endereço de destino:</span>
          <input
            className="travelRequestForm--form_input"
            type="text"
            placeholder="Digite o endereço de destino"
          />
        </div>
        <button type="submit" className="travelRequestForm--form_button">
          Enviar Requisição
        </button>
      </form>
    </main>
  );
}
