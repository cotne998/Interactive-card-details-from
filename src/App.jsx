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

  const [isFilled, setIsFilled] = useState({
    name: 1,
    number: 1,
    month: 1,
    year: 1,
    cvc: 1,
  });

  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <Container>
      <UpperSectionComponent
        data={data}
        setData={setData}
        isFilled={isFilled}
        setIsFilled={setIsFilled}
      />
      {isCompleted ? (
        <Complete />
      ) : (
        <LowerSection
          data={data}
          setData={setData}
          isFilled={isFilled}
          setIsFilled={setIsFilled}
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
