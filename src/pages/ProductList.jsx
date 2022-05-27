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

  // set initial page if offset exists in URL.
  let defOffset = searchParams.get("offset");
  let defPage = 1;
  if (defOffset) defPage = Math.floor(defOffset / 8) + 1;

  const [products, setProducts] = useState([]);
  let [pageCount, setPageCount] = useState(1);
  // const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    getProductsData();
  }, [searchParams]);

  let getParamOrDefault = (name, def) => {
    let val = searchParams.get(name);
    if (val) return val;
    return def;
  };

  let defSort = getParamOrDefault("sort", "");
  let defBottleCap = getParamOrDefault("bottlecap", "");
  let defCategory = getParamOrDefault("category", "");

  const getProductsData = async () => {
    try {
      console.log(searchParams.toString(), defCategory);
      let sort = getSortInfo(searchParams.get("sort"));

      const res = await Axios.get(`${API_URL}/products/get-all-products`, {
        params: {
          category: searchParams.get("category"),
          bottle_capacity: searchParams.get("bottlecap"),
          sortField: sort.field,
          sortDirection: sort.dir,
          search: searchParams.get("name"),
          offset: searchParams.get("offset"),
        },
      });
      console.log(res.data);
      setProducts(res.data.allProducts);
      setPageCount(res.data.pageCount);
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
    searchParams.set("offset", 0);
    setSearchParams(searchParams);
  };

  let getSortInfo = (sort) => {
    if (!sort) {
      return {
        field: "name",
        dir: "ASC",
      };
    }

    return {
      field: sort.split("-")[0],
      dir: sort.split("-")[1].toUpperCase(),
    };
  };

  let setCategory = (category) => {
    console.log(category);
    searchParams.set("category", category);
    searchParams.set("offset", 0);
    setSearchParams(searchParams);
  };

  let setSort = (sort) => {
    console.log(sort);
    searchParams.set("sort", sort);
    searchParams.set("offset", 0);
    setSearchParams(searchParams);
  };

  let setBottleCap = (bottlecap) => {
    console.log(bottlecap);
    searchParams.set("bottlecap", bottlecap);
    searchParams.set("offset", 0);
    setSearchParams(searchParams);
  };

  return (
    <Container>
      <Title>Products</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select
            value={defCategory}
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
          <Select
            value={defBottleCap}
            onChange={(ev) => setBottleCap(ev.target.value)}
          >
            {/* <Option disabled selected>
              Bottle Capacity:
            </Option> */}
            <Option value="">Show All</Option>
            <Option value="500">500</Option>
            <Option value="300">300</Option>
            <Option value="1000">1000</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select value={defSort} onChange={(ev) => setSort(ev.target.value)}>
            <Option value="">Default</Option>
            <Option value="sell_price-asc">Price (ASC)</Option>
            <Option value="sell_price-desc">Price (DESC)</Option>
            <Option value="name-asc">A - Z</Option>
            <Option value="name-desc">Z - A</Option>
            {/* <Option value="Best Seller">Best Seller</Option> */}
          </Select>
        </Filter>
        <Filter>
          <FilterText>Search:</FilterText>
          <Input
            onChange={(ev) => setSearch(ev.target.value)}
            type="text"
            defaultValue={searchParams.get("name")}
          ></Input>
        </Filter>
      </FilterContainer>
      <Products products={products} />
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Pagination
          page={defPage}
          count={pageCount}
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
