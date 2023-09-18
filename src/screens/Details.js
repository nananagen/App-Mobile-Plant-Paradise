import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { addItem, increment, decrement } from "../store/cartSlice";

export default function Details({ route, navigation: { navigate, goBack } }) {
  const { data } = route.params;
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image
            style={{ width: "100%", height: 300, backgroundColor: "#fff" }}
            source={{ uri: data.image }}
          />
        </View>

        <View style={styles.titleWrapper}>
          <Text style={styles.category}>{data.category}</Text>
          <Text style={styles.title}>{data.title}</Text>
        </View>

        <View style={styles.priceWrapper}>
          <View>
          <Text style={styles.footerPrice}>$ {data.price}</Text>
          </View>
          <View style={styles.quantityWrapper}>
            <TouchableOpacity style={styles.quantitySelector}>
              <Text style={styles.quantity}>-</Text>
            </TouchableOpacity>
            <Text style={styles.dataQuantity}>
              {data.quantity ? data.quantity : 0}
            </Text>
            <TouchableOpacity style={styles.quantitySelector}>
              <Text style={styles.quantity}>+</Text>
            </TouchableOpacity>
          </View>  
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>{data.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footerWrapper}>
        <View style={styles.footerPriceWrapper}>
          <Text style={styles.footerTotal}>Total Price</Text>
          <Text style={styles.footerPrice}>$ {data.price}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => {
              dispatch(addItem(data));
            }}
          >
            <Text style={styles.cta}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    paddingTop: 5,
  },
  titleWrapper: {
    paddingStart: 10,
  },

  category: {
    marginTop: 10,
    color: '#969595',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 1.5 * 16, // 150%
  },

  title: {
    marginTop: 10,
    fontFamily: 'Poppins',
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  priceWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  price: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },

  descriptionWrapper: {
    padding: 10,
    height: 500,
    marginTop: 20,
  },

  description: {
    fontFamily: 'Poppins',
    color: "#969595",
    fontSize: 16,
    fontWeight: "400",
  },

  quantityWrapper: {
    width: "30%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
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

  footerWrapper: {
    height: 75,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  footerTotal: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
  },

  footerPrice: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },

  footerButton: {
    backgroundColor: "#418B64",
    height: 50,
    width: "auto",
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  cta: {
    fontFamily: 'Poppins',
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
});
