import styled from "styled-components";
// import { popularProducts } from "../data";
import ProductDetail from "./ProductDetail";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ products }) => {

  return (
    <Container>
      {products.map(product => (
        <ProductDetail product={product} key={product.id} />
      ))}
    </Container>
  );
};

export default Products;


