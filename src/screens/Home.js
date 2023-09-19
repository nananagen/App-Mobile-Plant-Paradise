import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addOrRemoveFromFavorites } from "../store/favoritesSlice";
import { addItem } from "../store/cartSlice";

import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";

import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("All");
  const [mostPopular, setMostPopular] = useState([]);
  const [items, setItems] = useState([]);
  const [verticalItems, setVerticalItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Poppins: require("../../assets/fonts/Poppins-SemiBold.ttf"),
        PoppinsL: require("../../assets/fonts/Poppins-Light.ttf"),
      });
    }
    loadFonts();
  }, []);

  useEffect(() => {
    axios
      .get("https://8jcox47hg2.execute-api.us-east-2.amazonaws.com/dev/")
      .then((res) => {
        console.log(res.data.body.data);
        setMostPopular(res.data.body.data.mostPopular);
        setItems(res.data.body.data.items);
        setVerticalItems(res.data.body.data.items);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleSetActiveTab = (tabText) => {
    if (tabText === "All") {
      setActiveTab(tabText);
      setVerticalItems(items);
      return;
    }
    setActiveTab(tabText);
    const filteredItems = items.filter((item) => item.category === tabText);
    setVerticalItems(filteredItems);
    console.log(filteredItems);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Hi, John</Text>
        <TouchableOpacity
          style={styles.profileIconWrapper}
          onPress={() => navigation.navigate("Profile")}
        >
          <Feather name="user" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.subtitle}>Most popular</Text>

        <FlatList
          data={mostPopular}
          style={{ height: 220 }}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.horizontalGridItem}
              onPress={() => navigation.navigate("Details", { data: item })}
            >
              <TouchableOpacity
                style={styles.wishlisIcon}
                onPress={() => {
                  dispatch(addOrRemoveFromFavorites(item));
                }}
              >
                <Octicons name="heart" size={15} color="black" />
              </TouchableOpacity>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
              <View style={styles.content}>
                <View>
                  <Text style={styles.contentItem}>{item.title}</Text>
                  <Text style={styles.contentPrice}>${item.price}</Text>
                </View>

                <View>
                  <TouchableOpacity
                    style={styles.contentButtonWrapper}
                    onPress={() => {
                      dispatch(addItem(item));
                    }}
                  >
                    <Text style={styles.contentButton}>Add to cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            onPress={() => handleSetActiveTab("All")}
            style={[
              styles.tabButton,
              activeTab === "All" ? styles.activeTabButton : null,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "All" ? styles.activeTabText : null,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSetActiveTab("Indoor")}
            style={[
              styles.tabButton,
              activeTab === "Indoor" ? styles.activeTabButton : null,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Indoor" ? styles.activeTabText : null,
              ]}
            >
              Indoor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSetActiveTab("Outdoor")}
            style={[
              styles.tabButton,
              activeTab === "Outdoor" ? styles.activeTabButton : null,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Outdoor" ? styles.activeTabText : null,
              ]}
            >
              Outdoor
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.verticalCenter}>
          {verticalItems.map((item) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Details", { data: item })}
            >
              <View style={styles.gridItem} key={item.id}>
              <TouchableOpacity
                style={styles.wishlisIcon}
                onPress={() => {
                  dispatch(addOrRemoveFromFavorites(item));
                }}
              >
                <Octicons name="heart" size={15} color="black" />
              </TouchableOpacity>
                <Image
                  source={{ uri: item.image }}
                  style={styles.verticalImage}
                />
                <View style={styles.verticalContentWrapper}>
                  <View style={styles.verticalTitleContainer}>
                    <Text style={styles.verticalTitle}>{item.title}</Text>
                    <Text style={styles.verticalsubTitle}>${item.price}</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.shopWrapper}
                      onPress={() => {
                        dispatch(addItem(item));
                      }}
                    >
                      <Feather name="shopping-bag" size={15} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileIconWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
    paddingEnd: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: "Poppins",
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Poppins",
    marginVertical: 10,
    marginLeft: 20,
  },
  horizontalGridItem: {
    fontSize: 20,
    fontFamily: "Poppins",
    width: 350,
    height: "auto",
    margin: 10,
    borderRadius: 0.5 * 16,
    backgroundColor: "#FFF",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: "row",
  },
  content: {
    marginStart: 15,
    display: "flex",
    justifyContent: "space-around",
  },
  contentItem: {
    fontSize: 16,
    fontWeight: "600",
  },
  contentPrice: {
    fontSize: 16,
    fontWeight: "600",
  },
  contentButtonWrapper: {
    borderRadius: 8,
    height: 35,
    width: 150,
    backgroundColor: "#418B64",
    marginTop: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentButton: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    fontSize: 16,
  },
  wishlisIcon: {
    position: "absolute",
    left: 8,
    top: 8,
    zIndex: 99,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
  },
  verticalContainer: {
    flexDirection: "column",
  },

  image: {
    height: "100%",
    width: "100%",
  },

  imageContainer: {
    width: "50%",
    height: "auto",
  },

  gridItem: {
    width: 20.4375 * 16,
    height: 13.0625 * 16,
    margin: 20,
    marginBottom: 50,
    borderRadius: 0.5 * 16,
    backgroundColor: "#e7e7e7",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    position: "absolute",
    top: 10,
    right: 20,
    width: 1.875 * 16,
    height: 1.875 * 16,
    flexShrink: 0,
    resizeMode: "cover",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    marginStart: 20,
  },
  tabButton: {
    paddingVertical: 5,
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: 1.5 * 16,
    fontStyle: "normal",
    color: "#969595",
    marginEnd: 30,
  },
  activeTabText: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "700",
    lineHeight: 1.5 * 16,
    fontStyle: "normal",
    color: "#000",
  },
  verticalCenter: {
    alignItems: "center",
    padding: 5,
    marginBottom: 20,
  },
  verticalContentWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  verticalTitleContainer: {
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "start",
    paddingHorizontal: 20,
  },
  verticalTitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "700",
    lineHeight: 1.5 * 16,
    fontStyle: "normal",
    color: "#000",
  },
  verticalsubTitle: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: 1.5 * 16,
    fontStyle: "normal",
    color: "#000",
  },
  shopWrapper: {
    padding: 8,
    backgroundColor: "#418B64",
    borderRadius: 50,
    marginEnd: 10,
  },
  verticalImage: {
    height: "100%",
    width: "100%",
  },
  homeBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
