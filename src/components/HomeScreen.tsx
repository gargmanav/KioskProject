import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadRides } from '../redux/ridesSlice';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

type Ride = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const ridesData: Ride[] = [
  {
    id: '1',
    name: 'Corkscrew',
    price: 15.0,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Corkscrew_%28Cedar_Point%29_01.jpg/275px-Corkscrew_%28Cedar_Point%29_01.jpg',
  },
  {
    id: '2',
    name: 'Gate Keeper',
    price: 15.0,
    image: 'https://image.mlive.com/home/mlive-media/pgfull/img/detroit/photo/2013/05/-1c5b8df7723ad838.JPG',
  },
  {
    id: '3',
    name: 'Gemini',
    price: 15.0,
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Gemini_Cedar_Point.JPG',
  },
  {
    id: '4',
    name: 'Maveric',
    price: 15.0,
    image: 'https://i.ytimg.com/vi/v-41iosa9V0/maxresdefault.jpg',
  },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const rides = useSelector((state: RootState) => state.rides.rides);
    const dispatch = useDispatch<AppDispatch>(); 
    
    
      useEffect(() => {
        dispatch(loadRides());
      }, [dispatch]);


  const [selectedRides, setSelectedRides] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

  const handleSelectRide = (rideId: string, price: number) => {
    if (selectedRides.includes(rideId)) {
      setSelectedRides(selectedRides.filter((id) => id !== rideId));
      setTotal(total - price);
    } else {
      setSelectedRides([...selectedRides, rideId]);
      setTotal(total + price);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Rides To Buy Tickets</Text>
      <FlatList
        contentContainerStyle={{marginHorizontal:20}}
        data={ridesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              selectedRides.includes(item.id) ? styles.selectedItem : styles.unselectedItem,
            ]}
            onPress={() => handleSelectRide(item.id, item.price)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>{selectedRides.length} Rides Added</Text>
        <Text style={[styles.totalText,{fontFamily:"Poppins-Regular",fontSize:14}]}>Total: ${total.toFixed(2)}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={[styles.buttonText,{color:"#00357B"}]}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkoutButton} 
          onPress={() => navigation.navigate('Payment', { total })}
          >
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F5FC",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontFamily:"Poppins-Bold",
    color: "#1A2A4B",
    margin:20
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:5,
    marginVertical: 8,
    borderRadius: 10,
  },
  selectedItem: {
    backgroundColor: '#fff',
    elevation: 8,
  },
  unselectedItem: {
    backgroundColor: '#fff',
    elevation: 0,
  },
  image: {
    width: 65,
    height: 65,
    marginRight: 15,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontFamily:"Poppins-SemiBold",
    color: "#1A2A4B",
  },
  price: {
    fontSize: 16,
    color: '#F44336',
    fontFamily:"Poppins-Bold",
  },
  footer: {
    marginTop: 'auto',
    padding: 15,
    backgroundColor: "#fff",
  },
  totalText: {
    fontSize: 16,
    color:"black",
    fontFamily:"Poppins-SemiBold"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:"100%"
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderColor:"#00357B",
    borderWidth: 2,
    width:"48%",
    borderRadius:8

  },
  checkoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#00357B",
    borderRadius: 8,
     width:"48%",
     borderWidth: 2,
     borderColor:"#00357B"
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontFamily:"Poppins-Medium",
    textAlign:"center"
  },
});

export default HomeScreen;
