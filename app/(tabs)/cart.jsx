import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';

// Context
import { useGlobalContext } from "../../context/GlobalProvider";

//Components
import { CustomButton } from '../../components';

const Cart = () => {
  const { user } = useGlobalContext();
  const [cutlery, setCutlery] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  // Placeholder for fetching cart items
  // useEffect(() => {
  //   fetchCartItems().then(setCartItems);
  // }, []);

  const cartItems = [
    { id: 1, name: 'Beef Burrito', price: 9.80 },
    { id: 2, name: 'Chicken & Egg Burrito', price: 9.80 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = 10.56;
  const deliveryFee = 5.99;
  const containerFee = 1.00;
  const serviceTax = 1.87;
  const total = subtotal - discount + deliveryFee + containerFee + serviceTax;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping Cart</Text>
      {cartItems.map(item => (
        <View key={item.id} style={styles.item}>
          <Text style={{ color: 'white' }}>{item.name}</Text>
          <Text style={{ color: 'white' }}>RM {item.price.toFixed(2)}</Text>
        </View>
      ))}

      <View style={styles.summary}>
        <Text style={styles.subtotal}>Subtotal: RM {subtotal.toFixed(2)}</Text>
        <Text style={styles.discount}>Discount: - RM {discount.toFixed(2)}</Text>
        <Text style={{ color: 'white' }}>Delivery fee: RM {deliveryFee.toFixed(2)}</Text>
        <Text style={{ color: 'white' }}>Container/Processing Fee: RM {containerFee.toFixed(2)}</Text>
        <Text style={{ color: 'white' }}>Service Tax: RM {serviceTax.toFixed(2)}</Text>
      </View>
      
      <View style={styles.cutlery}>
        <Text>Cutlery</Text>
        <Switch value={cutlery} onValueChange={setCutlery} />
      </View>
      <Text style={styles.total}>Total: RM {total.toFixed(2)}</Text>

      <CustomButton
        title="Review payment and address"
        containerStyles={{ marginTop: 28 }}
        isLoading={isSubmitting}
        // handlePress={submit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#161622',
    height: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9C01',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subtotal: {
    fontWeight: 'bold',
    marginTop: 20,
    color: 'white',
  },
  discount: {
    color: 'white',
  },
  cutlery: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 20,
  },
  summary: {
    backgroundColor: '#1B1B1B',
  }
});

export default Cart;