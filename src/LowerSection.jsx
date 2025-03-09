import "./index.css";
import styled from "styled-components";
import { useEffect, useState } from "react";

export default function LowerSection({
  data,
  setData,
  isFilled,
  setIsFilled,
  setIsCompleted,
}) {
  const [errors, setErrors] = useState({
    name: "",
    number: "",
    month: "",
    year: "",
    cvc: "",
  });

  const handleClick = () => {
    const updatedErrors = {
      name: "",
      number: "",
      month: "",
      year: "",
      cvc: "",
    };

    const updatedIsFilled = { ...isFilled };

    for (let key in data) {
      if (!data[key] || data[key].trim() === "") {
        updatedIsFilled[key] = false;
        updatedErrors[key] = "Can't be blank";
      } else {
        updatedIsFilled[key] = true;
      }

      if (key === "number" && updatedErrors[key] === "") {
        const numberWithoutSpaces = data[key].replace(/\s+/g, "");
        if (numberWithoutSpaces.length < 16) {
          updatedIsFilled[key] = false;
          updatedErrors[key] = "Not enough length";
        } else if (isNaN(Number(numberWithoutSpaces))) {
          updatedIsFilled[key] = false;
          updatedErrors[key] = "Wrong format, numbers only!";
        }
      }

      if (key === "month" && updatedErrors[key] === "") {
        if (
          isNaN(Number(data.month)) ||
          Number(data.month) > 12 ||
          Number(data.month) < 1
        ) {
          updatedIsFilled[key] = false;
          updatedErrors[key] = "Invalid month";
        }
      }

      if (key === "year" && updatedErrors[key] === "") {
        if (isNaN(Number(data.year)) || data.year.length !== 2) {
          updatedIsFilled[key] = false;
          updatedErrors[key] = "Must be a number";
        }
      }

      if (key === "name" && updatedErrors[key] === "") {
        if (!/^[a-zA-Z\s]+$/.test(data.name)) {
          updatedIsFilled[key] = false;
          updatedErrors[key] = "Can't contain numbers or symbols";
        }
      }

      if (key === "cvc" && updatedErrors[key] === "") {
        if (isNaN(Number(data.cvc))) {
          updatedIsFilled[key] = false;
          updatedErrors[key] = "Must be a number";
        }
      }
    }

    setIsFilled(updatedIsFilled);
    setErrors(updatedErrors);
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(isFilled).every(
      (filled) => filled === true
    );
    setIsCompleted(allFieldsFilled);
  }, [isFilled, setIsCompleted]);

  const handleInputChange = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [key]: "" }));
  };

  return (
    <Container>
      <InputSection>
        <span>CARDHOLDER NAME</span>
        <input
          value={data.name}
          onChange={(event) => handleInputChange("name", event.target.value)}
          style={!isFilled.name ? { borderColor: "#FF5050" } : {}}
          placeholder="e.g Jane Appleseed"
        />
        {errors.name && (
          <span className="returned-span" style={{ color: "#FF5050" }}>
            {errors.name}
          </span>
        )}
      </InputSection>

      <InputSection>
        <span>CARD NUMBER</span>
        <input
          value={data.number}
          onChange={(event) => {
            let inputValue = event.target.value.replace(/\s+/g, "");
            let formattedValue = "";

            for (let i = 0; i < inputValue.length; i += 4) {
              formattedValue += inputValue.slice(i, i + 4) + " ";
            }

            formattedValue = formattedValue.trim();
            handleInputChange("number", formattedValue);
          }}
          style={!isFilled.number ? { borderColor: "#FF5050" } : {}}
          maxLength={19}
          type="text"
          placeholder="e.g 1234 5678 9123 0000"
        />
        {errors.number && (
          <span className="returned-span" style={{ color: "#FF5050" }}>
            {errors.number}
          </span>
        )}
      </InputSection>

      <OtherDetailsSection>
        <DoubleInput>
          <span>EXP.DATE (MM/YY)</span>
          <DateWrap>
            <InputSection>
              <input
                value={data.month}
                onChange={(event) =>
                  handleInputChange("month", event.target.value)
                }
                style={!isFilled.month ? { borderColor: "#FF5050" } : {}}
                type="text"
                maxLength={2}
                placeholder="MM"
              />
            </InputSection>
            <InputSection>
              <input
                value={data.year}
                onChange={(event) =>
                  handleInputChange("year", event.target.value)
                }
                style={!isFilled.year ? { borderColor: "#FF5050" } : {}}
                type="text"
                maxLength={2}
                placeholder="YY"
              />
            </InputSection>
          </DateWrap>
          {(errors.month || errors.year) && (
            <span
              className="returned-span"
              style={{ display: "flex", width: "100%", color: "#FF5050" }}>
              {errors.month || errors.year}
            </span>
          )}
        </DoubleInput>

        <InputSection>
          <span>CVC</span>
          <input
            value={data.cvc}
            onChange={(event) => handleInputChange("cvc", event.target.value)}
            style={!isFilled.cvc ? { borderColor: "#FF5050" } : {}}
            type="text"
            maxLength={3}
            placeholder="e.g. 123"
          />
          {errors.cvc && (
            <span className="returned-span" style={{ color: "#FF5050" }}>
              {errors.cvc}
            </span>
          )}
        </InputSection>
      </OtherDetailsSection>

      <ConfirmButton onClick={handleClick}>Confirm</ConfirmButton>
    </Container>
  );
}

const Container = styled.section`
  padding: 0 2.4rem 4.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media only screen and (min-width: 90rem) {
    gap: 2.6rem;
    max-width: 38.2rem;
    padding: unset;
  }
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  span {
    color: #21092f;
    font-size: 1.2rem;
    letter-spacing: 1px;
  }

  input {
    all: unset;
    border: 0.5px solid #dfdee0;
    padding: 1.2rem 1.6rem;
    font-size: 1.8rem;
    border-radius: 0.8rem;

    &::placeholder {
      color: #b4b4b5;
    }
  }
`;

const OtherDetailsSection = styled.div`
  display: grid;
  grid-template-columns: 40% 55%;
  justify-content: space-between;
  align-items: start;
  width: 100%;
`;

const DateWrap = styled.div`
  display: grid;
  grid-template-columns: 47% 47%;
  justify-content: space-between;
  align-items: end;
`;

const DoubleInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  span {
    color: #21092f;
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
`;

const ConfirmButton = styled.button`
  color: white;
  padding: 1.5rem;
  background-color: #21092f;
  border: none;
  border-radius: 0.8rem;
  font-size: 1.8rem;

  &:hover {
    cursor: pointer;
    background-color: #390f51;
    transition: 0.2s;
  }
`;
