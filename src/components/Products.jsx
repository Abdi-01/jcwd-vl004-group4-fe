import styled from "styled-components";
import ProductCard from "./ProductCard";

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
        <ProductCard product={product} key={product.id} />
      ))}
    </Container>
  );
};

export default Products;


