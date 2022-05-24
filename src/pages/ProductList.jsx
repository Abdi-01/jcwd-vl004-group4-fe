import styled from "styled-components";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "react-router-dom";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const Input = styled.input``;

const ProductList = () => {
  // contain all products data

  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  const [products, setProducts] = useState([]);
  let [page, setPage] = useState(1);
  // const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    getProductsData();
  }, [searchParams]);

  const getProductsData = async () => {
    try {
      const res = await Axios.get(`${API_URL}/products/get-all-products`, {
        params: {
          category: searchParams.get("category"),
          bottle_capacity: searchParams.get("bottlecap"),
          sortField: searchParams.get("sortField"),
          sortDirection: searchParams.get("sortDirection"),
          search: searchParams.get("name"),
          offset: searchParams.get("offset"),
        },
      });
      console.log(res.data);
      setProducts(res.data.allProducts);
      setPage(res.data.pageCount);
    } catch (err) {
      console.log(err);
      swal.fire({
        title: "There is some mistake in server",
        icon: "warning",
        confirm: true,
      });
      return;
    }
  };

  // const getBestSellerData = async () => {
  //   try {
  //     const res = await Axios.get(`${API_URL}/products/get-best-seller`);
  //     setBestSeller(res.data.bestSeller);
  //   } catch (err) {
  //     console.log(err);
  //     swal.fire({
  //       title: "There is some mistake in server",
  //       icon: "warning",
  //       confirm: true,
  //     });
  //     return;
  //   }
  // };

  let paginationHandler = (page) => {
    console.log(page);
    let offset = (page - 1) * 8; // 8 is limit
    setOffset(offset);
  };

  let setOffset = (offset) => {
    console.log(offset);
    searchParams.set("offset", offset);
    setSearchParams(searchParams);
  };

  let setSearch = (search) => {
    console.log(search);
    searchParams.set("name", search);
    setSearchParams(searchParams);
  };

  let setSort = (sort) => {
    console.log(sort);
    if (sort == "Name (ASC)") {
      searchParams.set("sortField", "name");
      searchParams.set("sortDirection", "ASC");
      setSearchParams(searchParams);
    } else if (sort == "Name (DESC)") {
      searchParams.set("sortField", "name");
      searchParams.set("sortDirection", "DESC");
      setSearchParams(searchParams);
    } else if (sort == "Price (ASC)") {
      searchParams.set("sortField", "sell_price");
      searchParams.set("sortDirection", "ASC");
      setSearchParams(searchParams);
    } else if (sort == "Price (DESC)") {
      searchParams.set("sortField", "sell_price");
      searchParams.set("sortDirection", "DESC");
      setSearchParams(searchParams);
    }
  };

  let setCategory = (category) => {
    console.log(category);
    searchParams.set("category", category);
    setSearchParams(searchParams);
  };

  let setBottleCap = (bottlecap) => {
    console.log(bottlecap);
    searchParams.set("bottlecap", bottlecap);
    setSearchParams(searchParams);
  };

  return (
    <Container>
      <Title>Products</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select
            defaultValue={searchParams.get("category")}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {/* <Option disabled selected>
              Categories:
            </Option> */}
            <Option value="">Show All</Option>
            <Option value="tablet">Tablet</Option>
            <Option value="capsule">Capsule</Option>
            <Option value="liquid">Liquid</Option>
          </Select>
          <Select onChange={(ev) => setBottleCap(ev.target.value)}>
            <Option disabled selected>
              Bottle Capacity:
            </Option>
            <Option value="">Show All</Option>
            <Option value="500">500</Option>
            <Option value="300">300</Option>
            <Option value="1000">1000</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(ev) => setSort(ev.target.value)}>
            <Option selected value="Name (ASC)">
              Default
            </Option>
            <Option value="Price (ASC)">Price (ASC)</Option>
            <Option value="Price (DESC)">Price (DESC)</Option>
            <Option value="Name (ASC)">A - Z</Option>
            <Option value="Name (DESC)">Z - A</Option>
            {/* <Option value="Best Seller">Best Seller</Option> */}
          </Select>
        </Filter>
        <Filter>
          <FilterText>Search:</FilterText>
          <Input
            onChange={(ev) => setSearch(ev.target.value)}
            type="text"
          ></Input>
        </Filter>
      </FilterContainer>
      <Products products={products}/>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Pagination
          count={page}
          variant="outlined"
          siblingCount={1}
          shape="rounded"
          onChange={(ev, page) => paginationHandler(page)}
        />
      </Stack>
      <Footer />
    </Container>
  );
};

export default ProductList;
