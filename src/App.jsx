import "./App.css";
import styled from "styled-components";
import UpperSectionComponent from "./UpperSectionComponent";
import LowerSection from "./LowerSection";
import { useState } from "react";
import Complete from "./Complete";

function App() {
  const [data, setData] = useState({
    name: "",
    number: "",
    month: "",
    year: "",
    cvc: "",
  });

  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <Container>
      <UpperSectionComponent data={data} setData={setData} />
      {isCompleted ? (
        <Complete />
      ) : (
        <LowerSection
          data={data}
          setData={setData}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
        />
      )}
    </Container>
  );
}

export default App;

const Container = styled.div`
  max-width: 100rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 9.5rem;

  @media only screen and (min-width: 90rem) {
    flex-direction: row;
    min-width: 100%;
    gap: 25%;
    align-items: center;
  }
`;
