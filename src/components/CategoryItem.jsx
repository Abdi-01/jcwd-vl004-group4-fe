import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 60vh;
  position: relative;
`;

const Image = styled.img`
  margin-left: 50px;
  padding: 50px;
  height: 50vh;
  width: 50vh;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: black;
  font-weight: 600;
  font-size: 30px;
  margin-top: 300px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: black;
  color: white;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button onClick={() => navigate("/product-list?category=" + item.title)}>SHOP NOW</Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;
