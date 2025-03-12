import "./index.css";
import styled from "styled-components";
import { useEffect, useState } from "react";

export default function LowerSection({ data, setData, setIsCompleted }) {
  const [errors, setErrors] = useState({
    name: "",
    number: "",
    month: "",
    year: "",
    cvc: "",
  });

  const handleClick = (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z\s]+$/;
    const cardNumberRegex = /^\d{4}(\s|-)?\d{4}(\s|-)?\d{4}(\s|-)?\d{4}$/;
    const monthRegex = /^(0[1-9]|1[0-2])$/;
    const yearRegex = /^\d{2}$/;
    const cvcRegex = /^(?!000)[0-9]{3,4}$/;

    const newErrors = {
      name: "",
      number: "",
      month: "",
      year: "",
      cvc: "",
    };

    if (!data.name) {
      newErrors.name = "Can't be blank";
    } else if (!nameRegex.test(data.name)) {
      newErrors.name = "Invalid name";
    }

    if (!data.number) {
      newErrors.number = "Can't be blank";
    } else if (!cardNumberRegex.test(data.number)) {
      newErrors.number = "Invalid number";
    }

    if (!data.month) {
      newErrors.month = "Can't be blank";
    } else if (!monthRegex.test(data.month)) {
      newErrors.month = "Invalid month";
    }

    if (!data.year) {
      newErrors.year = "Can't be blank";
    } else if (!yearRegex.test(data.year)) {
      newErrors.year = "Invalid year";
    }

    if (!data.cvc) {
      newErrors.cvc = "Can't be blank";
    } else if (!cvcRegex.test(data.cvc)) {
      newErrors.cvc = "Invalid cvc";
    }

    setErrors(newErrors);

    const allErrorsEmpty = Object.values(newErrors).every(
      (error) => error === ""
    );
    if (allErrorsEmpty) {
      setIsCompleted(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      const digitsOnly = value.replace(/\D/g, "");
      const formattedValue = digitsOnly.match(/.{1,4}/g)?.join(" ") || "";
      setData({ ...data, number: formattedValue });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  return (
    <Container onSubmit={handleClick}>
      <InputSection>
        <label htmlFor="name">CARDHOLDER NAME</label>
        <input
          value={data.name}
          id="name"
          name="name"
          onChange={handleChange}
          style={errors.name ? { borderColor: "#FF5050" } : {}}
          placeholder="e.g Jane Appleseed"
        />
        {errors.name && (
          <span className="returned-span" style={{ color: "#FF5050" }}>
            {errors.name}
          </span>
        )}
      </InputSection>

      <InputSection>
        <label htmlFor="number">CARD NUMBER</label>
        <input
          value={data.number}
          id="number"
          name="number"
          onChange={handleChange}
          style={errors.number ? { borderColor: "#FF5050" } : {}}
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
          <label htmlFor="exp-date">EXP. DATE (MM/YY)</label>
          <DateWrap>
            <InputSection>
              <input
                id="exp-month"
                name="month"
                value={data.month}
                onChange={handleChange}
                style={errors.month ? { borderColor: "#FF5050" } : {}}
                type="text"
                maxLength={2}
                placeholder="MM"
              />
            </InputSection>
            <InputSection>
              <input
                id="exp-year"
                name="year"
                value={data.year}
                onChange={handleChange}
                style={errors.year ? { borderColor: "#FF5050" } : {}}
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
          <label htmlFor="cvc">CVC</label>
          <input
            id="cvc"
            name="cvc"
            value={data.cvc}
            onChange={handleChange}
            style={errors.cvc ? { borderColor: "#FF5050" } : {}}
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

      <ConfirmButton type="submit">Confirm</ConfirmButton>
    </Container>
  );
}

const Container = styled.form`
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

  label {
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
