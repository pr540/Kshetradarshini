import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, User, ChevronLeft } from 'lucide-react-native';
import { COLORS, SIZES } from '../constants/theme';

import { createBooking } from '../services/api';

const BookingScreen = ({ route, navigation }) => {
  const { seva } = route.params || { seva: { id: 1, name: 'Anjita Seva', price: '₹500' } };
  const basePrice = typeof seva.price === 'string' ? parseInt(seva.price.replace('₹', '').replace(',', '')) : seva.price;

  const [count, setCount] = useState(1);
  const [name, setName] = useState('');
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [date, setDate] = useState('2024-05-20');
  const [time, setTime] = useState('08:00 AM');
  const [loading, setLoading] = useState(false);

  const totalPrice = basePrice * count;

  const handleProceed = async () => {
    setLoading(true);
    try {
      const bookingData = {
        user_id: 1, // Mock user ID for now
        seva_id: seva.id,
        time_slot: time,
        devotee_name: name,
        num_persons: count,
        total_price: totalPrice,
      };
      await createBooking(bookingData);
      navigation.navigate('PaymentReviewScreen', { seva, count, name, date, time, totalPrice });
    } catch (err) {
      console.log('Error creating booking:', err.message);
      // Fallback for demo
      navigation.navigate('PaymentReviewScreen', { seva, count, name, date, time, totalPrice });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={{ width: 28 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.sevaTitle}>{seva.name}</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Devotee Name</Text>
              <View style={[styles.inputWrapper, isNameFocused && styles.inputFocused]}>
                <User size={20} color={isNameFocused ? COLORS.primary : '#757575'} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter Devotee Name"
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setIsNameFocused(true)}
                  onBlur={() => setIsNameFocused(false)}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.inputLabel}>Select Date</Text>
                <TouchableOpacity style={styles.inputWrapper}>
                  <Calendar size={20} color="#757575" />
                  <Text style={styles.placeholderText}>{date}</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Time Slot</Text>
                <TouchableOpacity style={styles.inputWrapper}>
                  <Clock size={20} color="#757575" />
                  <Text style={styles.placeholderText}>{time}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.counterSection}>
              <Text style={styles.counterLabel}>Number of Persons</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => count > 1 && setCount(count - 1)}
                >
                  <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.countText}>{count}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => setCount(count + 1)}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total Price</Text>
              <Text style={styles.totalPrice}>₹{totalPrice}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.proceedButton, loading && { opacity: 0.7 }]}
          onPress={handleProceed}
          disabled={loading}
        >
          <Text style={styles.proceedButtonText}>
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  backButton: {
    padding: 4,
  },
  scrollContent: {
    padding: SIZES.padding,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sevaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.border,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  inputFocused: {
    borderBottomColor: COLORS.primary,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.text,
  },
  placeholderText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.text,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  counterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  counterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    padding: 5,
  },
  counterButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: 15,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  footer: {
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  proceedButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
