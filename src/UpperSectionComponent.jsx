import "./index.css";
import styled from "styled-components";
import CardBack from "/images/bg-card-back.png";
import CardFront from "/images/bg-card-front.png";
import Logo from "/images/card-logo.svg";

export default function UpperSectionComponent({
  data,
  setData,
  isFilled,
  setIsFilled,
}) {
  return (
    <UpperSection>
      <div className="card-back-div">
        <CardInsideBack>
          <CardBackImg src={CardBack} alt="card backside" />
          <span>{data.cvc === "" ? `123` : data.cvc}</span>
        </CardInsideBack>
      </div>
      <div className="card-front-div">
        <CardFrontImg src={CardFront} alt="" />
        <CardInfo>
          <LogoImg src={Logo} alt="" />
          <CardDetails>
            <CardNumber>
              {data.number === "" ? `0000 0000 0000 0000` : data.number}
            </CardNumber>
            <CardOwner>
              <OwnerName>
                {data.name === "" ? "Your Name" : data.name}
              </OwnerName>
              <ExpireDate>
                {data.month === "" && data.year === ""
                  ? `00/00`
                  : `${data.month}/${data.year}`}
              </ExpireDate>
            </CardOwner>
          </CardDetails>
        </CardInfo>
      </div>
    </UpperSection>
  );
}

const UpperSection = styled.div`
  width: 100%;
  height: 24rem;
  background-color: #21092f;
  position: relative;

  @media only screen and (min-width: 90rem) {
    height: 100vh;
    max-width: 48.5rem;
  }
`;

const CardBackImg = styled.img`
  width: 28.6rem;

  @media only screen and (min-width: 90rem) {
    width: 44.7rem;
  }
`;

const CardFrontImg = styled.img`
  width: 28.6rem;

  @media only screen and (min-width: 90rem) {
    width: 44.7rem;
  }
`;

const CardInsideBack = styled.div`
  position: relative;

  span {
    position: absolute;
    top: 49%;
    transform: translateY(-50%);
    right: 3.7rem;
  }

  @media only screen and (min-width: 90rem) {
    span {
      top: 49%;
      transform: translateY(-50%);
      right: 5.7rem;
      font-size: 1.4rem;
    }
  }
`;

const CardInfo = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 1.76rem 1.9rem 1.9rem;
  display: flex;
  flex-direction: column;
  gap: 3.7rem;

  @media only screen and (min-width: 90rem) {
    gap: 6.4rem;
    padding: 2.8rem 3.2rem 2.65rem;
  }
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
  width: 100%;
`;

const CardNumber = styled.span`
  font-size: 1.8rem;
  color: white;
  letter-spacing: 2.4px;
  text-align: center;

  @media only screen and (min-width: 90rem) {
    font-size: 2.8rem;
    letter-spacing: 3px;
  }
`;

const LogoImg = styled.img`
  width: 5.4rem;

  @media only screen and (min-width: 90rem) {
    width: 8.4rem;
  }
`;

const CardOwner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const OwnerName = styled.span`
  font-size: 0.9rem;
  color: white;

  @media only screen and (min-width: 90rem) {
    font-size: 1.4rem;
  }
`;

const ExpireDate = styled.span`
  font-size: 0.9rem;
  color: white;

  @media only screen and (min-width: 90rem) {
    font-size: 1.4rem;
  }
`;
