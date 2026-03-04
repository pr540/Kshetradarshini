import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  ScrollView,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircleCheck, Download, Share2, Instagram, Github, MessageCircle } from 'lucide-react-native';
import { COLORS, SIZES } from '../constants/theme';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const SuccessScreen = ({ route, navigation }) => {
  const { bookingId, seva, totalPrice, name, date } = route.params || {
    bookingId: '#KS-98234',
    seva: { name: 'Anjita Seva' },
    totalPrice: 500,
    name: 'Devotee',
    date: 'May 15, 2024'
  };

  const shareMessage = `🙏 Namaste! I have just booked ${seva.name} for ${name} at Kshetradarshini Temple. \n\nBooking ID: ${bookingId}\nDivine blessings await! Check out the app: https://kshetradarshini.app`;

  const handleGeneralShare = async () => {
    try {
      await Share.share({ message: shareMessage });
    } catch (error) {
      Alert.alert('Error', 'Unable to share');
    }
  };

  const shareToApp = (platform) => {
    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `whatsapp://send?text=${encodeURIComponent(shareMessage)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://kshetradarshini.app')}&quote=${encodeURIComponent(shareMessage)}`;
        break;
      case 'instagram':
        url = `instagram://camera`; // Instagram usually requires direct image sharing, but we can open the app
        break;
      case 'github':
        url = `https://github.com/kshetradarshini-app`;
        break;
    }

    Linking.openURL(url).catch(() => {
      if (platform === 'whatsapp') Alert.alert('WhatsApp not installed');
      else Linking.openURL(url.replace('whatsapp://', 'https://wa.me/'));
    });
  };

  const handleDownload = async () => {
    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body { font-family: 'Helvetica'; padding: 40px; text-align: center; background-color: #FFF9F2; }
            .receipt { background: white; border: 2px solid #D4AF37; border-radius: 20px; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
            h1 { color: #C62828; margin-bottom: 5px; }
            .id { font-weight: bold; color: #757575; margin-bottom: 20px; }
            .row { display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 8px; text-align: left; }
            .label { color: #666; }
            .value { font-weight: bold; color: #333; }
            .footer { margin-top: 40px; color: #888; font-style: italic; }
          </style>
        </head>
        <body>
          <div class="receipt">
            <h1>Kshetradarshini</h1>
            <div class="id">Booking Confirmation</div>
            <hr style="border: 1px solid #D4AF37; margin: 20px 0;" />
            <div class="row"><span class="label">Booking ID</span><span class="value">${bookingId}</span></div>
            <div class="row"><span class="label">Seva</span><span class="value">${seva.name}</span></div>
            <div class="row"><span class="label">Devotee</span><span class="value">${name}</span></div>
            <div class="row"><span class="label">Amount</span><span class="value">₹${totalPrice}</span></div>
            <div class="row"><span class="label">Date</span><span class="value">${date}</span></div>
            <div class="footer">May the divine blessings of Lord Shiva be with you.</div>
          </div>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      Alert.alert('Error', 'Could not generate PDF');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.successHeader}>
          <CircleCheck size={80} color="#2E7D32" strokeWidth={2} />
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successSubtitle}>Your Seva has been successfully scheduled.</Text>
        </View>

        <View style={styles.receiptCard}>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Transaction ID</Text>
            <Text style={styles.receiptValue}>{bookingId}</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Seva Name</Text>
            <Text style={styles.receiptValue}>{seva.name}</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Devotee</Text>
            <Text style={styles.receiptValue}>{name}</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Total Paid</Text>
            <Text style={[styles.receiptValue, { color: COLORS.primary }]}>₹{totalPrice}</Text>
          </View>
        </View>

        <Text style={styles.shareTitle}>Share Divine Blessings</Text>
        <View style={styles.socialRow}>
          <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#25D366' }]} onPress={() => shareToApp('whatsapp')}>
            <MessageCircle size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#E4405F' }]} onPress={() => shareToApp('instagram')}>
            <Instagram size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#1877F2' }]} onPress={() => shareToApp('facebook')}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>f</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#333' }]} onPress={() => shareToApp('github')}>
            <Github size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialBtn, { backgroundColor: COLORS.secondaryDark }]} onPress={handleGeneralShare}>
            <Share2 size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
          <Download size={20} color={COLORS.primary} style={{ marginRight: 10 }} />
          <Text style={styles.downloadText}>Download Digital Receipt</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.homeButtonText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F2',
  },
  scrollContent: {
    alignItems: 'center',
    padding: SIZES.padding,
  },
  successHeader: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginTop: 15,
  },
  successSubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  receiptCard: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    marginBottom: 30,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  receiptLabel: {
    fontSize: 14,
    color: '#757575',
  },
  receiptValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  shareTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondaryDark,
    marginBottom: 20,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 3,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(198, 40, 40, 0.05)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  downloadText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  footer: {
    padding: SIZES.padding,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  homeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  homeButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SuccessScreen;
