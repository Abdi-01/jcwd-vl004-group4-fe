import { Link } from "react-router-dom";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { API_URL } from "../constants/API";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 50%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const ProductCard = (props) => {
  return (
    <Container as={Link} to={`/product-detail/${props.product.id}`}>
      <Circle />

      {/* DATA ASLI */}
      <Image src={`${API_URL}/${props.product.image}`} />
      {/* DATA DUMMY */}
      {/* <Image src={product.image} /> */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          zIndex: 1000,
          position: "absolute",
          color: "black",
          left: 10,
          bottom: 0,
          alignItems: "flex-start",
          justifyContent: "flex-end",
        }}
      >
        <p className="m-0">Name: {props.product.name}</p>
        <p className="m-0">
          Price: {props.product.sell_price.toLocaleString("id-ID")}
        </p>
        <p className="m-0">Stock: {props.product.stock} pcs</p>
      </div>

      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <SearchOutlined />
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default ProductCard;
