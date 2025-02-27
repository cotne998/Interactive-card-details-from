import "./index.css";
import styled from "styled-components";

export default function LowerSection({
  data,
  setData,
  isFilled,
  setIsFilled,
  setIsCompleted,
}) {
  const handleClick = () => {
    const allFieldsFilled = Object.values(isFilled).every(
      (filled) => filled === true
    );

    if (allFieldsFilled) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }

    setIsFilled((prev) => {
      const updated = { ...prev };

      for (let key in data) {
        if (!data[key] || data[key].trim() === "") {
          updated[key] = false;
        } else {
          updated[key] = true;
        }

        if (key === "number") {
          const numberWithoutSpaces = data[key].replace(/\s+/g, "");
          if (
            numberWithoutSpaces.length < 16 ||
            isNaN(Number(numberWithoutSpaces))
          ) {
            updated[key] = false;
          }
        }

        if (
          key === "month" &&
          (isNaN(Number(data.month)) ||
            Number(data.month) > 12 ||
            Number(data.month) < 1)
        ) {
          updated[key] = false;
        }

        if (
          key === "year" &&
          (isNaN(Number(data.year)) || data.year.length !== 2)
        ) {
          updated[key] = false;
        }

        if (key === "name" && !/^[a-zA-Z\s]+$/.test(data.name)) {
          updated[key] = false;
        }

        if (key === "cvc" && isNaN(Number(data.cvc))) {
          updated[key] = false;
        }
      }

      return updated;
    });
  };

  return (
    <Container>
      <InputSection>
        <span>CARDHOLDER NAME</span>
        <input
          value={data.name}
          onChange={(event) =>
            setData((prevData) => ({ ...prevData, name: event.target.value }))
          }
          style={!isFilled.name ? { borderColor: "#FF5050" } : {}}
          placeholder="e.g Jane Appleseed"
        />
        {!isFilled.name && (
          <span className="returned-span" style={{ color: "#FF5050" }}>
            {data.name === ""
              ? "Can't be blank"
              : !/^[a-zA-Z\s]+$/.test(data.name)
              ? "Can't contain numbers or symbols"
              : null}
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
            setData((prevData) => ({
              ...prevData,
              number: formattedValue,
            }));
          }}
          style={!isFilled.number ? { borderColor: "#FF5050" } : {}}
          maxLength={19}
          type="text"
          placeholder="e.g 1234 5678 9123 0000"
        />
        {!isFilled.number && (
          <span className="returned-span" style={{ color: "#FF5050" }}>
            {data.number.replace(/\s+/g, "").length < 16
              ? "Card number length is not enough!"
              : "Wrong format, numbers only!"}
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
                  setData((prevData) => ({
                    ...prevData,
                    month: event.target.value,
                  }))
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
                  setData((prevData) => ({
                    ...prevData,
                    year: event.target.value,
                  }))
                }
                style={!isFilled.year ? { borderColor: "#FF5050" } : {}}
                type="text"
                maxLength={2}
                placeholder="YY"
              />
            </InputSection>
          </DateWrap>
          {!isFilled.month || !isFilled.year ? (
            <span
              className="returned-span"
              style={{ display: "flex", width: "100%", color: "#FF5050" }}>
              {data.month === "" || data.year === ""
                ? "Can't be blank"
                : isNaN(Number(data.month)) ||
                  Number(data.month) > 12 ||
                  Number(data.month) < 1
                ? "Invalid month"
                : isNaN(Number(data.year))
                ? "Must be a number"
                : null}
            </span>
          ) : null}
        </DoubleInput>

        <InputSection>
          <span>CVC</span>
          <input
            value={data.cvc}
            onChange={(event) =>
              setData((prevData) => ({
                ...prevData,
                cvc: event.target.value,
              }))
            }
            style={!isFilled.cvc ? { borderColor: "#FF5050" } : {}}
            type="text"
            maxLength={3}
            placeholder="e.g. 123"
          />
          {!isFilled.cvc ? (
            <span className="returned-span" style={{ color: "#FF5050" }}>
              Can't be blank
            </span>
          ) : isNaN(Number(data.cvc)) ? (
            <span className="returned-span" style={{ color: "#FF5050" }}>
              Must be a number
            </span>
          ) : null}
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
