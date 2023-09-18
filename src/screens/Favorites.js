import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addOrRemoveFromFavorites } from "../store/favoritesSlice";
import { useEffect } from 'react';
import * as Font from 'expo-font';

export default function Favorites({ navigation }) {
  const dispatch = useDispatch();
  const favoritesData = useSelector((state) => state.favorites.items);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins': require('../../assets/fonts/Poppins-SemiBold.ttf'),
      });
    }
    loadFonts();
  },[]);

  return (
    <View style={styles.container}>

      {favoritesData.length === 0 ? (
        <View>
        <Text style={styles.title}>Sem favoritos</Text>
        </View>
      ) : (
        // Lista de favoritos
        <ScrollView
          style={styles.favoriteList}
          showsVerticalScrollIndicator={false}
        >
          {favoritesData.map((item) => (
            <View style={styles.favoriteItem} key={item.id}>
              <View style={styles.favoriteImageContainer}>
                <Image source={{ uri: item.image }} style={styles.favoriteImage} />
              </View>
              <View style={styles.favoriteContentWrapper}>
                <View style={styles.favoriteTitles}>
                  <Text style={styles.favoriteTitle}>{item.title}</Text>
                  <Text style={styles.checkoutsubTitle}>{item.price}</Text>
                </View>

                <TouchableOpacity
                  style={styles.favoriteIconWrapper}
                  onPress={() => {
                    // Dispatch da ação para adicionar ou remover dos favoritos
                    dispatch(addOrRemoveFromFavorites(item));
                  }}
                >
                  <Entypo name="heart" size={24} color="#418B64" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins",
    paddingTop: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginLeft: 10,
  },
  favoriteList: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  favoriteItem: {
    // width: 20.4375 * 16,
    // height: 4.5 * 16,
    height: "auto",
    marginBottom: 10,
    borderRadius: 0.5 * 16,
    backgroundColor: "#ECF8F3",
    flexDirection: "row",
  },
  favoriteImageContainer: {
    // width: 5.6875 * 16,
    // height: 4.5625 * 16,
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
  favoriteContentWrapper: {
    paddingStart: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
    height: "100%",
    width: "75%",
  },
  favoriteTitles:{
    paddingTop: 5,
    height:"100%",
    display:"flex",
    justifyContent:"flex-start"
  },
  favoriteIconWrapper: {
    padding: 10,
    marginEnd: 20,
    backgroundColor: "#fff",
    borderRadius: 50,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  favoriteTitle: {
    fontSize: 20,
    fontFamily: "Poppins",
    paddingTop: 20,
  },
  favoritesubTitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
  },
  // Estilos da HomeBar no canto inferior da tela
  homeBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  checkoutsubTitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
  },
});
