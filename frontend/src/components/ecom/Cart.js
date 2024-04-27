import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Img,
  Select,
  Text,
  Image,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import styles from "../../Styling/Cart.module.css";
import axios from "axios";

import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Cart = () => {
  const [data, setdata] = useState([]);
  const [cartData, setCardData] = useState([]);
  const [block, setblock] = useState(false);
  const [totalSum, setTotalSum] = useState();

  const toast = useToast();

  useEffect(() => {
    getCartData();
  }, []);

  const baseUrl = "https://healthcube.onrender.com";
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getCartData = async () => {
    try {
      if (!token) {
        console.log("Please log in to access cart data");
        return;
      }

      const res = await axios.get(`${baseUrl}/cart`, config);

      console.log(res);
      const cartItems = res.data.map((item) => ({
        ...item,
        totalPrice: item.price * item.quantity,
      }));
      const findSum = cartItems.reduce(
        (accumulator, currentItem) => accumulator + currentItem.totalPrice,
        0
      );

      setTotalSum(findSum);

      setCardData(cartItems);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (productId) => {
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .delete(`${baseUrl}/cart/${productId}`, { headers })
      .then((response) => {
        toast({
          title: "Product Deleted to the cart.",
          description: "Deleted Sucessfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        console.log(`Product with ID ${productId} deleted successfully`);
        setCardData((prevData) =>
          prevData.filter((item) => item.id !== productId)
        );
        getCartData();
      })
      .catch((error) => {
        // handle error response
        console.error(
          `Error deleting product with ID ${productId}: ${error.message}`
        );
      });
  };

  let handlequantity = (id, quantity) => {
    axios
      .patch(`${baseUrl}/cart/increase`, { id, quantity }, config)
      .then(() => getCartData());
  };

  return (
    <>
      <Navbar />
      <Grid
        gridTemplateColumns={{ sm: "repeat(1,1fr)", md: "1fr 25%" }}
        p={"20px"}
        gap={5}
        mb={"10px"}
      >
        <GridItem
          position="relative"
          p={"20px"}
          mb={"10px"}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        >
          <Text pb={5} color={"#ff6f61"} className={styles.shopCart}>
            {" "}
            Shopping Cart
          </Text>
          {/* <span className={styles.deselect} onClick={handleSelect}> */}

          <Text as="b" fontSize="md" className={styles.right}>
            Price
          </Text>
          <hr />
          <br />
          <br />
          {cartData &&
            cartData.map((el, i) => {
              return (
                <Grid
                  key={i}
                  gridTemplateColumns={{ sm: "repeat(1,1fr)", md: "20% 1fr" }}
                  pb={"30px"}
                  mb={"30px"}
                  gap={10}
                  borderBottom="1px solid #CFD8DC"
                >
                  <GridItem position="relative" mb={"30px"} key={el.id}>
                    <Text display={"flex"}>
                      <Text position={"relative"} top="70px">
                        <Image
                          src={el.image}
                          width={"80%"}
                          height={"250px"}
                          m={"auto"}
                        />
                      </Text>
                    </Text>
                  </GridItem>
                  <GridItem position="relative">
                    <Text
                      fontSize="xl"
                      className={styles.title}
                      display="inline"
                    >
                      {el.name}
                    </Text>
                    <br />
                    <Text
                      fontSize="sm"
                      className={styles.title}
                      display="inline"
                    >
                      {el.category}
                    </Text>
                    <Text
                      position={"absolute"}
                      right="5px"
                      top={"30px"}
                      display="inline"
                      className={styles.priceCart}
                    >
                      ₹{el.totalPrice.toFixed(2)}
                    </Text>
                    <Text className={styles.cartDays}>
                      Usually dispatched in{" "}
                      {Math.floor(Math.random() * 10) || 2}
                      Days.
                    </Text>
                    <Text className={styles.bywhom}>by {el.brand}</Text>
                    <Text
                      className={styles.purple}
                      m={"5px 0px"}
                      bg={"#ff6f61"}
                      display={i % 2 != 0 ? "none " : "inline"}
                    >
                      #1 Best Seller
                    </Text>
                    <Text
                      display={i % 2 == 0 ? "none " : "block"}
                      m={"5px 0px"}
                    >
                      <img
                        width={30}
                        src="https://assets-global.website-files.com/59ee0c0f13651700017e6ed2/5d7e518fc5774119be64fbca_hc.jpeg"
                      ></img>
                    </Text>
                    <Text className={styles.cartGreen} fontSize={"14px"}>
                      In Stock
                    </Text>
                    <Text className={styles.free} m={"2px 0px"}>
                      Eligible for FREE Shipping
                    </Text>
                    <span
                      style={{ paddingRight: "10px" }}
                      className={styles.sold}
                    >
                      Sold by:
                    </span>
                    <span
                      className={`${styles.cartGreen} ${styles.cartUnderLine}`}
                      style={{ fontSize: "15px" }}
                    >
                      {el.brand}
                    </span>
                    <Text display={"flex"} alignItems="center">
                      <Img
                        className={styles.img}
                        src="https://assets-global.website-files.com/59ee0c0f13651700017e6ed2/5d7e518fc5774119be64fbca_hc.jpeg"
                      ></Img>
                      <Text bg={"#ff6f61"} className={styles.purple}>
                        Health Cube Delivered
                      </Text>
                    </Text>
                    <Text fontWeight={450} mb={"10px"} fontSize={"15px"}>
                      Gift options not available.Gift options not available.
                      <span
                        className={`${styles.cartGreen} ${styles.cartUnderLine}`}
                      >
                        Learn more
                      </span>
                    </Text>
                    <Text display={"flex"} alignItems="center" gap={3}>
                      <Select
                        w={"110px"}
                        className={styles.cartSelect}
                        onChange={(e) => handlequantity(el._id, e.target.value)}
                      >
                        <option value={el.quantity}>Qty: {el.quantity}</option>
                        <option value={1}>Qty: 1</option>
                        <option value={2}>Qty: 2</option>
                        <option value={3}>Qty: 3</option>
                        <option value={4}>Qty: 4</option>
                        <option value={5}>Qty: 5</option>
                        <option value={6}>Qty: 6</option>
                        <option value={7}>Qty: 7</option>
                      </Select>
                      |
                      <Text
                        className={`${styles.cartGreen} ${styles.cartUnderLine}`}
                        onClick={() => handleDelete(el._id)}
                        fontSize={"14px"}
                      >
                        Delete
                      </Text>
                      |
                      <Text
                        className={`${styles.cartGreen} ${styles.cartUnderLine}`}
                        fontSize={"14px"}
                        // onClick={() => handleLater(el.id, el)}
                      >
                        Save For Later
                      </Text>
                    </Text>
                  </GridItem>
                </Grid>
              );
            })}
        </GridItem>

        <GridItem>
          <Grid rowGap={6}>
            <GridItem
              position={"relative"}
              boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
              p={"20px 10px"}
            >
              <Text fontSize={"14px"} color="#007600">
                Part of your order qualifies for FREE Delivery. Select this
                option at checkout. Details
              </Text>
              <Checkbox
                colorScheme="green"
                defaultChecked
                mt={"5px"}
                marginRight={"5px"}
              ></Checkbox>
              <span>This order contains a gift</span>
              <br />
              <span className={styles.subtotal}>
                Subtotal ({cartData.length} items):{}
              </span>
              <span className={styles.priceCart}>{totalSum}</span>
              {/* <span className={styles.priceCart}>{total}.00</span> */}
              <Link to={"/checkout"}>
                <Button
                  bg={"#ff6f61"}
                  w={"100%"}
                  borderRadius={"15px"}
                  m={"20px 0px "}
                  _hover={"red"}
                >
                  Proceed to Buy
                </Button>
              </Link>
              <Box border={"1px solid #2b6389"}>
                <Text
                  p={"10px 5px"}
                  position="relative"
                  cursor={"pointer"}
                  onClick={() => setblock(!block)}
                >
                  EMI Available
                  {block ? (
                    <ChevronDownIcon
                      fontSize={"30px"}
                      position="absolute"
                      right={"10px"}
                    />
                  ) : (
                    <ChevronUpIcon
                      fontSize={"30px"}
                      position="absolute"
                      right={"10px"}
                    />
                  )}
                </Text>
                <Text
                  display={block ? "block" : "none"}
                  fontSize="16px"
                  p={"10px 5px"}
                >
                  Your order qualifies for EMI with valid credit cards (not
                  available on purchase of Gold, Jewelry, Gift cards and Amazon
                  pay balance top up).{" "}
                  <span
                    className={`${styles.cartGreen} ${styles.cartUnderLine}`}
                  >
                    Learn more
                  </span>
                </Text>
              </Box>
            </GridItem>
            <GridItem
              boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
              p={"10px 10px"}
            >
              <Text fontWeight={500}>
                Frequently bought together with Cracking the Coding Interview:
                189 Programming Question
              </Text>
              {data &&
                data.map((el) => {
                  return (
                    <Grid
                      gridTemplateColumns={"repeat(2,1fr)"}
                      p={"20px 5px"}
                      columnGap={3}
                    >
                      <GridItem>
                        <Image
                          src={el.image}
                          width={"200px"}
                          height={"100px"}
                          key={el.id}
                        />
                      </GridItem>
                      <GridItem>
                        <Text
                          fontWeight={500}
                          className={`${styles.cartGreen} ${styles.cartUnderLine}`}
                        >
                          {el.description}
                        </Text>
                        <Text color={"teal"}>
                          &#9733;&#9733;&#9733;&#9733;&#9734;
                        </Text>
                        <Text color={"gray.500"}>{el.brand}</Text>
                        <Text fontWeight={500}>₹{el.price}</Text>
                        <button
                          className={styles.cartbtn}
                          // onClick={() => handleAdd(el)}
                        ></button>
                      </GridItem>
                    </Grid>
                  );
                })}
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
      <Footer />
    </>
  );
};

export default Cart;
