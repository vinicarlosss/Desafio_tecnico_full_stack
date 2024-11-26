import "./TravelRequest.style.css";
import { Header, TravelRequestForm } from "../../Components/index";
import { useState } from "react";

export function TravelRequest() {

  const [ loading, setLoading ] = useState<boolean>(false);

  return (
    <>
      <Header />
      <TravelRequestForm loading={loading} setLoading={setLoading}/>
      
    </>
  );
}
