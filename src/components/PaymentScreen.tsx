import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import LinearGradient from 'react-native-linear-gradient';
import { RouteProp } from '@react-navigation/native';

type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Payment'>;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;

type Props = {
  navigation: PaymentScreenNavigationProp;
  route: PaymentScreenRouteProp;
};

const PaymentScreen: React.FC<Props> = ({ navigation,route }) => {
  const [paymentState, setPaymentState] = useState<'scan' | 'failed' | 'success' | 'complete'>('scan');
  const { total } = route.params;
  const subtotal = total
  const tax = (subtotal * 0.18).toFixed(2); // 18% GST
  const totalvalue = (subtotal + parseFloat(tax)).toFixed(2);

  useEffect(() => {
    if (paymentState === 'success') {
      setTimeout(() => {
        setPaymentState('complete');
      }, 2500);
    }
  }, [paymentState]);

  const renderContent = () => {
    switch (paymentState) {
      case 'scan':
        return (
          <><View style={{justifyContent:"space-evenly",flex:1}}>
            <Image source={require("../assets/creditcard.png")} style={{width:100,height:100,marginTop:20,alignSelf:"center"}}/>
            <Text style={styles.title}>Pay With Card</Text>
            <Text style={styles.subTitle}>Please Tap, Swipe Or Insert{"\n"}Your Card</Text>
            <View style={styles.amountContainer}>
            <View style={{justifyContent:"space-between",flexDirection:"row"}}>
              <Text style={styles.amountText}>Subtotal:</Text>
              <Text style={styles.amountText}> Rs.  {subtotal.toFixed(2)}</Text>
              </View>
              <View style={{justifyContent:"space-between",flexDirection:"row",marginVertical:5}}>
              <Text style={styles.amountText}>Tax:</Text>
              <Text style={styles.amountText}> Rs.   {tax}</Text>
              </View>
              <View style={{borderWidth:0.5,borderColor:'#F0F0F0',marginVertical:12}}></View>
              <View style={{justifyContent:"space-between",flexDirection:"row",}}>
              <Text style={[styles.amountText, styles.totalText]}>Total:</Text>
              <Text style={[styles.amountText, styles.totalText]}> Rs. {totalvalue}</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setPaymentState('failed')}>
                <Text style={[styles.buttonText,{color:"#00357B"}]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={() => setPaymentState('success')}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
            </View>
          </>
        );
      case 'failed':
        return (
          <> 
            <Image source={require("../assets/failure.png")} style={{width:80,height:80,alignSelf:"center",marginTop:80}} />
            <Text style={[styles.title,{marginTop:100}]}>Payment Failed</Text>
            <Text style={styles.subTitle}>Please Try Again</Text>
            <TouchableOpacity style={[styles.cancelButton,{alignSelf:"center",marginTop:150}]} onPress={() => navigation.goBack()}>
              <Text style={[styles.buttonText,{color:"#00357B"}]}>Cancel</Text>
            </TouchableOpacity>
          </>
        );
      case 'success':
        return (
          <><View style={{justifyContent:"center",flex:1}}>
            <Text style={styles.title}>Thank You</Text>
            <Text style={styles.subTitle}>Your Payment Is Successful</Text>
            <View style={styles.amountContainer}>
            <View style={{justifyContent:"space-between",flexDirection:"row"}}>
              <Text style={styles.amountText}>Subtotal:</Text>
              <Text style={styles.amountText}> Rs.  {subtotal.toFixed(2)}</Text>
              </View>
              <View style={{justifyContent:"space-between",flexDirection:"row",marginVertical:5}}>
              <Text style={styles.amountText}>Tax:</Text>
              <Text style={styles.amountText}> Rs.   {tax}</Text>
              </View>
              <View style={{borderWidth:0.5,borderColor:'#F0F0F0',marginVertical:12}}></View>
              <View style={{justifyContent:"space-between",flexDirection:"row",}}>
              <Text style={[styles.amountText, styles.totalText]}>Total:</Text>
              <Text style={[styles.amountText, styles.totalText]}> Rs. {totalvalue}</Text>
              </View>
            </View>
            </View>
          </>
        );
      case 'complete':
        return (
          <>
            <View style={{justifyContent:"center",flex:1}}>
            <Image source={require("../assets/complete.png")} style={{width:110,height:110,alignSelf:"center"}} />
            <Text style={styles.title}>Enjoy Your Ride!</Text>
            <Text style={styles.subTitle}>Please Pickup Your Printed Tickets.</Text>
            </View>
          </>
        );
    }
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#C0E3F8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {renderContent()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems:"center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    textTransform:"uppercase",
    fontFamily: "Poppins-Bold",
    color: "#1A2A4B",
    marginTop:20
  },
  subTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
    color: "#1A2A4B",
  },
  amountContainer: {
    marginBottom: 20,
    backgroundColor:"#FFF",
    borderRadius:12,
    width:"100%",
    padding:20

  },
  amountText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#1A2A4B",
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:"100%"
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "#00357B",
    borderWidth: 2,
    borderRadius: 8,
    width: "45%",
    alignItems: 'center',
  },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#00357B",
    borderRadius: 8,
    width: "45%",
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "#00357B",

  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Poppins-Medium",
    
  },
});

export default PaymentScreen;
