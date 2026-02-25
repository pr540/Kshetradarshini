import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircleCheck, Download, Share2 } from 'lucide-react-native';
import { COLORS, SIZES } from '../constants/theme';

const SuccessScreen = ({ route, navigation }) => {
  const { bookingId, seva, totalPrice, name, date } = route.params || {
    bookingId: '#KS-98234',
    seva: { name: 'Anjita Seva' },
    totalPrice: 500,
    name: 'Devotee',
    date: 'May 15, 2024'
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Namaste! I have just booked ${seva.name} at Kshetradarshini Temple. Booking ID: ${bookingId}. Divine blessings!`,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share at this moment');
    }
  };

  const handleDownload = () => {
    Alert.alert(
      'Download Receipt',
      'Your receipt is being generated and will be saved to your downloads folder.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIconContainer}>
          <CircleCheck size={100} color={COLORS.secondary} strokeWidth={1.5} />
        </View>
        <Text style={styles.successTitle}>Seva Booked Successfully!</Text>
        <Text style={styles.successSubtitle}>May the blessings of the divine be with you.</Text>

        <View style={styles.receiptCard}>
          <View style={styles.receiptHeader}>
            <Text style={styles.receiptTitle}>Booking Receipt</Text>
            <View style={styles.goldLine} />
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Booking ID</Text>
            <Text style={styles.receiptValue}>{bookingId}</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Seva</Text>
            <Text style={styles.receiptValue}>{seva.name}</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Devotee</Text>
            <Text style={styles.receiptValue}>{name}</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Amount Paid</Text>
            <Text style={styles.receiptValue}>₹{totalPrice}</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Transaction Date</Text>
            <Text style={styles.receiptValue}>{date}</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.outlineButton} onPress={handleDownload}>
            <Download size={20} color={COLORS.secondaryDark} />
            <Text style={styles.outlineButtonText}>Download PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineButton} onPress={handleShare}>
            <Share2 size={20} color={COLORS.secondaryDark} />
            <Text style={styles.outlineButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
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
  content: {
    flex: 1,
    alignItems: 'center',
    padding: SIZES.padding,
    justifyContent: 'center',
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
  receiptCard: {
    backgroundColor: COLORS.white,
    width: '100%',
    borderRadius: SIZES.radius,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  receiptTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
    textAlign: 'center',
  },
  receiptHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  goldLine: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.secondary,
    borderRadius: 2,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  receiptLabel: {
    fontSize: 14,
    color: '#757575',
  },
  receiptValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  outlineButtonText: {
    color: COLORS.secondaryDark,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footer: {
    padding: SIZES.padding,
  },
  homeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  homeButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SuccessScreen;
