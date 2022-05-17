import styled from "styled-components";
import Footer from "../components/Footer";

const Image = styled.img`
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  height: 80vh;
  width: 100%;
  align-content: center;
  justify-content: center;
  object-fit: contain;
`;

const AboutUs = () => {
  return (
    <div style={{ marginTop: "70px" }}>
      <h2
        style={{ textAlign: "center", fontWeight: "bolder", padding: "50px" }}
      >
        Pharmacy-App-4 is Globally Present to Make People <br />
        Live a Healthier and Meaningful Life
      </h2>
      <Image src="https://sobeyspharmacy.com/wp-content/uploads/2016/02/PharmacyTeam_4people-sm-1-1024x661.png"></Image>
      <p style={{ fontSize: "18px", padding: "50px" }}>
        Pharmacy-App-4 offers over-the-counter drugs with therapeutic benefits.
        We produce consumer products with health benefits, including supplements
        and other preventive products. Pharmacy-App-4's over-the-counter
        portfolio categories cover more than six therapeutical classes with
        solid brands, commanding a dominant market share over recent decades.
        <br />
        <br />
        Innovation is the key to Pharmacy-App-4, and we adhere to our
        commitment to nourish the nation, which we always take care of jointly.
        We always provide health solutions ranging from digestive and skin
        categories, multivitamins, respiratory care, food supplements, and
        healthy foods. <br />
        <br />
        We provide Innovative and Trustworthy products and services as a
        solution for daily health management. <br />
        <br />
        We ensure that all products are developed responsibly to make the lives
        of many people healthier globally.
      </p>
      <Footer />
    </div>
  );
};

export default AboutUs;
