import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, ChevronLeft } from 'lucide-react-native';
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

  const methods = ['UPI', 'Debit Card', 'Credit Card', 'Net Banking'];

  const handlePay = () => {
    setIsPaying(true);
    // Mocking payment gateway delay
    setTimeout(() => {
      setIsPaying(false);
      navigation.navigate('SuccessScreen', {
        bookingId: 'KS-' + Math.floor(Math.random() * 90000 + 10000),
        seva,
        count,
        name,
        date,
        time,
        totalPrice
      });
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review & Pay</Text>
        <View style={{ width: 28 }} />
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
          <Text style={styles.cardTitle}>Booking Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Seva</Text>
            <Text style={styles.summaryValue}>{seva.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Devotee</Text>
            <Text style={styles.summaryValue}>{name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date</Text>
            <Text style={styles.summaryValue}>{date}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Time</Text>
            <Text style={styles.summaryValue}>{time}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Persons</Text>
            <Text style={styles.summaryValue}>{count}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{totalPrice}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.methodsContainer}>
          {methods.map((method) => (
            <TouchableOpacity
              key={method}
              style={[
                styles.methodChip,
                selectedMethod === method && styles.activeMethodChip,
              ]}
              onPress={() => setSelectedMethod(method)}
            >
              <Text
                style={[
                  styles.methodText,
                  selectedMethod === method && styles.activeMethodText,
                ]}
              >
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.payButton, isPaying && { opacity: 0.7 }]}
          onPress={handlePay}
          disabled={isPaying}
        >
          <Text style={styles.payButtonText}>{isPaying ? 'Contacting Gateway...' : 'Confirm & Pay'}</Text>
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
  scrollContent: {
    padding: SIZES.padding,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    color: COLORS.text,
  },
  templeAddress: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#757575',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  methodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  methodChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
    marginBottom: 10,
  },
  activeMethodChip: {
    borderColor: COLORS.primary,
    backgroundColor: '#FDECEA',
  },
  methodText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  activeMethodText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  footer: {
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  payButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  payButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentReviewScreen;
