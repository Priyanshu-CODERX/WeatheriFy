import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image } from 'react-native';
import Constants from 'expo-constants';

export default function Weather() {
  const [search, setSearch] = useState('kolkata');
  const [tempInfo, setTempInfo] = useState({});
  const [weatherState, setWeatherState] = useState("");

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid={api key}`;
      let res = await fetch(url);
      let data = await res.json();
      const { temp, pressure, humidity } = data.main;
      const { main: weatherstat } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country } = data.sys;

      const weatherInfo = {
        temp,
        pressure,
        humidity,
        weatherstat,
        name,
        speed,
        country,
      };

      setTempInfo(weatherInfo);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  useEffect(() => {
    if(tempInfo.weatherstat) {
      switch(tempInfo.weatherstat){
        case "Clouds": 
          setWeatherState("https://i.ibb.co/7j0v1sG/cloudy.png");
          break;
        case "Haze": 
          setWeatherState("https://i.ibb.co/TgNqQb4/haze.png");
          break;
        case "Clear": 
          setWeatherState("https://i.ibb.co/FHxrbTD/Clear.png");
          break;
        case "Rain": 
          setWeatherState("https://i.ibb.co/BZbsB7H/rain.png");
          break;
        default: 
          setWeatherState("https://i.ibb.co/FHxrbTD/Clear.png");
          break;
      }
    }
  }, [tempInfo.weatherstat]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        placeholder="City"
        onChangeText={(text) => setSearch(text)}
      />
      <Button title="Search" onPress={getWeatherInfo} />
      <View style={styles.boxShadow}>
      <Image style={{width: 150, height: 150, margin: 10}} source={{uri: weatherState}}/>
        <Text style={styles.p}>City: {tempInfo.name}</Text>
        <Text style={styles.p}>Temperature: {tempInfo.temp}° C</Text>
        <Text style={styles.p}>Weather Condition: {tempInfo.weatherstat}</Text>
        <Text style={styles.p}>Pressure: {tempInfo.pressure}</Text>
        <Text style={styles.p}>Humidity: {tempInfo.humidity}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FFA726",
  },
  inputBox: {
    width: '90%',
    borderWidth: 2,
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  p: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  boxShadow: {
    width: '90%',
    elevation: 5,
    borderRadius: 10,
    margin: 10,
    height: '60%',
    backgroundColor: '#FFCA28',
    flex:1,
    alignItems: 'center',
  },
});
