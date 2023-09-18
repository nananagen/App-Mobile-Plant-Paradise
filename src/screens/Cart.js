import React, { useState } from "react";
import { useEffect } from "react";
import * as Font from "expo-font";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart, increment, decrement } from "../store/cartSlice";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CustomModal from "../components/CustomModal"; // Importe o componente Modal

export default function Cart({ navigation }) {
  const dispatch = useDispatch();
  const itemsCart = useSelector((state) => state.cart.items);

  const [showCongratulations, setShowCongratulations] = useState(false);

  const limitString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength) + "...";
    }
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const item of itemsCart) {
      subtotal += item.price * item.quantity;
    }
    return subtotal;
  };

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Poppins: require("../../assets/fonts/Poppins-SemiBold.ttf"),
        PoppinsL: require("../../assets/fonts/Poppins-Light.ttf"),
      });
    }
    loadFonts();
  }, []);

  return (
    <View style={styles.container}>
      {itemsCart.length === 0 ? (
        <View>
          <Text style={styles.title}>Seu carrinho está vazio!</Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Cart</Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(clearCart());
              }}
            >
              <Text style={styles.subTitle}>Clear Cart</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.checkoutList}
            showsVerticalScrollIndicator={false}
          >
            {itemsCart.map((item) => (
              <View style={styles.checkoutItem} key={item}>
                <View style={styles.checkoutImageContainer}>
                <Image source={{ uri: item.image }} style={styles.favoriteImage} />
                </View>
                <View style={styles.checkoutContentWrapper}>
                  <View style={styles.checkoutTitles}>
                    <Text style={styles.checkoutTitle}>
                      {limitString(item.title, 9)}
                    </Text>
                    <Text style={styles.checkoutsubTitle}>{item.price}</Text>
                  </View>

                  <View style={styles.priceWrapper}>
                    <View style={styles.quantityWrapper}>
                      <TouchableOpacity
                        style={styles.quantitySelector}
                        onPress={() => {
                          dispatch(decrement(item));
                        }}
                      >
                        <Text style={styles.quantity}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.dataQuantity}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.quantitySelector}
                        onPress={() => {
                          dispatch(increment(item));
                        }}
                      >
                        <Text style={styles.quantity}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Conteúdo do carrinho de compras */}
          <View style={styles.content}>
            <View style={styles.subtotalContainer}>
              <View style={styles.subtotalBox}>
                <Text style={styles.subtotalText}>Subtotal:</Text>
                <Text style={styles.subtotalAmount}>${calculateSubtotal().toFixed(2)}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => {
                setShowCongratulations(true);
              }}
            >

              <Text style={styles.buttonText}>Go to Checkout</Text>
            </TouchableOpacity>
            <CustomModal
              visible={showCongratulations}
              onClose={() => setShowCongratulations(false)}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontFamily: "Poppins",
    fontSize: 24,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  subTitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "indianred",
  },

  checkoutList: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 8,
    paddingTop: 4,
    height: 300,
  },
  checkoutItem: {
    height: "auto",
    marginBottom: 10,
    borderRadius: 0.5 * 16,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#ECF8F3",
  },
  checkoutImageContainer: {
    height: 100,
    width: 100,
    borderRadius: 0.5 * 16,
    backgroundColor: "lightgray",
    overflow: "hidden",
  },
  favoriteImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  checkoutContentWrapper: {
    paddingStart: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
  checkoutTitles: {
    height: "100%",
    display: "flex",
  },

  checkoutTitle: {
    fontSize: 24,
    fontFamily: "Poppins",
    paddingTop: 20,
  },
  checkoutsubTitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
  },

  priceWrapper: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },

  quantityWrapper: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantitySelector: {
    backgroundColor: "#418B64",
    borderRadius: 50,
    width: 35,
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  quantity: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },

  dataQuantity: {
    fontSize: 20,
    fontWeight: "700",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  subtotalContainer: {
    marginBottom: 20,
  },
  subtotalBox: {
    width: 20.25 * 16,
    height: 1.875 * 16,
    flexShrink: 0,
    borderRadius: 0.25 * 16,
    borderWidth: 1,
    borderColor: "#418B64",
    backgroundColor: "#ECF8F3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  subtotalText: {
    fontSize: 16,
    fontFamily: "PoppinsL",
  },
  checkoutButton: {
    width: 20.4375 * 16,
    height: 3 * 16,
    borderRadius: 0.5 * 16,
    backgroundColor: "#418B64",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins",
    textAlign: "center",
    lineHeight: 3 * 15,
  },
});
