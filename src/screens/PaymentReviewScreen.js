import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, ChevronLeft, CreditCard, Lock, Bell, Clock } from 'lucide-react-native';
import { COLORS, SIZES } from '../constants/theme';

const PaymentReviewScreen = ({ route, navigation }) => {
  const { seva, count, name, date, time, totalPrice } = route.params || {
    seva: { name: 'Anjita Seva' },
    count: 1,
    name: 'Devotee',
    date: '20 May 2024',
    time: '08:00 AM',
    totalPrice: 500
  };

  const [selectedMethod, setSelectedMethod] = useState('UPI');
  const [isPaying, setIsPaying] = useState(false);
  const [timer, setTimer] = useState(240); // 4 minutes in seconds

  useEffect(() => {
    if (timer === 0) {
      Alert.alert(
        'Session Expired',
        'Your payment session has timed out after 4 minutes. Please try again.',
        [{ text: 'OK', onPress: () => navigation.navigate('HomeScreen') }]
      );
      return;
    }

    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const methods = [
    { id: 'UPI', label: 'UPI (PhonePe, GPay)', icon: '📱' },
    { id: 'Debit', label: 'Debit Card', icon: '💳' },
    { id: 'Credit', label: 'Credit Card', icon: '🏦' },
    { id: 'Wallet', label: 'Wallets', icon: '👛' },
  ];

  const handlePay = () => {
    setIsPaying(true);

    // Simulating bank communication
    setTimeout(() => {
      setIsPaying(false);
      // Fail if timer is too low or random 10% failure
      const isRandomFail = Math.random() < 0.1;

      if (!isRandomFail && timer > 0) {
        navigation.navigate('SuccessScreen', {
          bookingId: 'KS-' + Math.floor(Math.random() * 90000 + 10000),
          seva,
          count,
          name,
          date,
          time,
          totalPrice
        });
      } else {
        Alert.alert(
          'Payment Unsuccessful',
          'Transaction was declined by the bank or the session expired. Please verify your details and try again.',
          [{ text: 'Try Again' }]
        );
      }
    }, 2500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={[styles.timerContainer, timer < 60 && styles.timerWarning]}>
          <Clock size={16} color={timer < 60 ? '#FFF' : COLORS.primary} />
          <Text style={[styles.timerText, timer < 60 && { color: '#FFF' }]}>
            {formatTime(timer)}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.locationHeader}>
            <MapPin size={24} color={COLORS.primary} />
            <View style={styles.locationTextContainer}>
              <Text style={styles.templeName}>Sri Kshetradarshini Temple</Text>
              <Text style={styles.templeAddress}>Hitec City, Hyderabad, 500081</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Bell size={20} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Booking Summary</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Seva Name</Text>
            <Text style={styles.summaryValue}>{seva.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Devotee</Text>
            <Text style={styles.summaryValue}>{name || 'Devotee'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Schedule</Text>
            <Text style={styles.summaryValue}>{date} • {time}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Persons</Text>
            <Text style={styles.summaryValue}>{count}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>₹{totalPrice}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.methodsContainer}>
          {methods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodItem,
                selectedMethod === method.id && styles.activeMethodItem,
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <Text style={styles.methodIcon}>{method.icon}</Text>
              <Text style={[styles.methodText, selectedMethod === method.id && styles.activeMethodText]}>
                {method.label}
              </Text>
              <View style={[styles.radio, selectedMethod === method.id && styles.radioActive]} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.securityNote}>
          <Lock size={14} color="#757575" />
          <Text style={styles.securityText}>Payments are 100% Secure & Encrypted</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {isPaying ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Verifying with Bank...</Text>
          </View>
        ) : (
            <TouchableOpacity
              style={styles.payButton}
              onPress={handlePay}
            >
              <Text style={styles.payButtonText}>Pay ₹{totalPrice} Now</Text>
            </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timerWarning: {
    backgroundColor: '#C62828',
  },
  timerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 6,
  },
  scrollContent: {
    padding: SIZES.padding,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTextContainer: {
    marginLeft: 12,
  },
  templeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  templeAddress: {
    fontSize: 12,
    color: '#757575',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#757575',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  methodsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    overflow: 'hidden',
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  activeMethodItem: {
    backgroundColor: '#FFF8F1',
  },
  methodIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  methodText: {
    flex: 1,
    fontSize: 15,
  },
  activeMethodText: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCC',
  },
  radioActive: {
    borderColor: COLORS.primary,
    borderWidth: 6,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  securityText: {
    fontSize: 11,
    color: '#757575',
    marginLeft: 8,
  },
  footer: {
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  payButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentReviewScreen;
