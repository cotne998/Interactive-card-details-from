import "./index.css";
import styled from "styled-components";

export default function Complete() {
  return (
    <Container>
      <CompleteImg src="/images/icon-complete.svg" />
      <TextWrap>
        <ThankYouMessage>THANK YOU!</ThankYouMessage>
        <AddText>We’ve added your card details</AddText>
      </TextWrap>
      <ContinueButton>Continue</ContinueButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
  width: 100%;
  padding: 0 2.4rem;

  @media only screen and (min-width: 90rem) {
    max-width: 38.5rem;
  }
`;

const CompleteImg = styled.img`
  width: 8rem;
`;

const TextWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.7rem;
`;

const ThankYouMessage = styled.h1`
  font-size: 2.8rem;
  color: #21092f;
  width: 100%;
  text-align: center;
  letter-spacing: 4px;
`;

const AddText = styled.span`
  color: #8f8694;
  font-size: 1.8rem;
  width: 100%;
  text-align: center;
`;

const ContinueButton = styled.button`
  color: white;
  padding: 1.5rem;
  background-color: #21092f;
  border: none;
  border-radius: 0.8rem;
  font-size: 1.8rem;
  width: 100%;

  &:hover {
    cursor: pointer;
    background-color: #390f51;
    transition: 0.2s;
  }
`;
