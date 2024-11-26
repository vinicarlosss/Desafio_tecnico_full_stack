import "./TravelRequest.style.css";
import { Header, TravelRequestForm } from "../../Components/index";
import { useState } from "react";

export function TravelRequest() {

  const [ requestMade, setRequestMade ] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(false);


  return (
    <>
      <Header />
      {requestMade ? null:<TravelRequestForm/>}
      
    </>
  );
}
