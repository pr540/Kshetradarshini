import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, MapPin, ChevronRight, Home, Calendar, User as UserIcon } from 'lucide-react-native';
import { COLORS, SIZES } from '../constants/theme';

const { width } = Dimensions.get('window');

const LINEAGE_DATA = [
  { id: '1', name: 'Acharya 1', image: 'https://api.a0.dev/assets/image?text=hindu%20acharya%20portrait&aspect=1:1' },
  { id: '2', name: 'Acharya 2', image: 'https://api.a0.dev/assets/image?text=spiritual%20guru%20portrait&aspect=1:1' },
  { id: '3', name: 'Acharya 3', image: 'https://api.a0.dev/assets/image?text=monk%20portrait&aspect=1:1' },
  { id: '4', name: 'Acharya 4', image: 'https://api.a0.dev/assets/image?text=vedic%20scholar%20portrait&aspect=1:1' },
  { id: '5', name: 'Acharya 5', image: 'https://api.a0.dev/assets/image?text=sanyasi%20portrait&aspect=1:1' },
];

const SEVAS_DATA = [
  {
    id: '1',
    name: 'Go Seva',
    location: 'Kanchipeetam Temple',
    price: '₹500',
    time: 'Morning',
    icon: '🐄',
  },
  {
    id: '2',
    name: 'Veda Rakshana',
    location: 'Kanchipeetam Temple',
    price: '₹1,000',
    time: 'Evening',
    icon: '📿',
  },
  {
    id: '3',
    name: 'Aalya Seva',
    location: 'Kanchipeetam Temple',
    price: '₹750',
    time: 'All Day',
    icon: '🏛️',
  },
  {
    id: '4',
    name: 'Maha Rudrabhishekam',
    location: 'Kanchipeetam Temple',
    price: '₹1,500',
    time: 'Weekend',
    icon: '🔱',
  },
];

import { getSevas, getLineage } from '../services/api';

import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';

const HomeScreen = ({ route, navigation }) => {
  const { userEmail } = route.params || { userEmail: 'devotee@temple.com' };
  const [sevas, setSevas] = useState([]);
  const [lineage, setLineage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [locationName, setLocationName] = useState('Fetching location...');

  // Use useFocusEffect to ensure sevas reflect latest DB state every time user returns to Home
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      getCurrentLocation();
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationName('Hitec City, Hyderabad');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        let address = reverseGeocode[0];
        setLocationName(`${address.city || address.region}, ${address.region}`);
      } else {
        setLocationName('Hyderabad, TS');
      }
    } catch (error) {
      console.log('Location error:', error);
      setLocationName('Temple Proximity... (Hyderabad)');
    }
  };

  const fetchData = async () => {
    try {
      const [sevasData, lineageData] = await Promise.all([
        getSevas().catch(() => SEVAS_DATA),
        getLineage().catch(() => LINEAGE_DATA)
      ]);
      setSevas(sevasData);
      setLineage(lineageData);
    } catch (err) {
      console.log('Error fetching data');
      setSevas(SEVAS_DATA);
      setLineage(LINEAGE_DATA);
    } finally {
      setLoading(false);
    }
  };

  const renderLineageItem = ({ item }) => (
    <View style={styles.lineageItem}>
      <Image source={{ uri: item.image }} style={styles.lineageImage} />
    </View>
  );

  const renderSevaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.sevaCard}
      onPress={() => navigation.navigate('BookingScreen', { seva: item })}
    >
      <View style={styles.sevaIconBg}>
        <Text style={styles.sevaEmoji}>{item.icon}</Text>
      </View>
      <View style={styles.sevaInfo}>
        <Text style={styles.sevaName}>{item.name}</Text>
        <Text style={styles.sevaLocationText}>{item.location}</Text>
      </View>
      <View style={styles.sevaPriceContainer}>
        <Text style={styles.sevaPriceText}>
          {typeof item.price === 'number' ? `₹${item.price}` : item.price}
        </Text>
        <View style={styles.timeTag}>
          <Text style={styles.timeTagText}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Kshetradarshini</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MapPin size={12} color={COLORS.secondary} style={{ marginRight: 4 }} />
            <Text style={styles.headerSubtitle}>{locationName}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.profileIcon}
          onPress={() => navigation.navigate('ProfileScreen', { email: userEmail })}
        >
          <Text style={styles.profileInitial}>H</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
        }
      >
        <View style={styles.content}>
          {loading && !refreshing ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 50 }} />
          ) : (
            <>
                <View style={styles.bannerCard}>
                  <View style={styles.bannerTag}>
                    <Text style={styles.bannerTagText}>🙏 Kanchi Peetham Acharyas</Text>
                  </View>
                  <Text style={styles.bannerTitle}>Blessings of the Divine Lineage</Text>

                  <View style={styles.lineageListContainer}>
                    <FlatList
                      horizontal
                      data={lineage.length > 0 ? lineage : LINEAGE_DATA}
                      renderItem={renderLineageItem}
                      keyExtractor={(item) => item.id.toString()}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                  <View style={styles.pagination}>
                    <View style={[styles.dot, styles.activeDot]} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                  </View>
                </View>

                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Available Sevas</Text>
                  <TouchableOpacity>
                    <Text style={styles.viewAll}>View All</Text>
                  </TouchableOpacity>
                </View>

                {sevas.map((item) => (
                  <View key={item.id}>{renderSevaItem({ item })}</View>
                ))}
            </>
          )}
        </View>
      </ScrollView>

      {/* Bottom Tab Mock */}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabItem}>
          <Home size={24} color={COLORS.primary} />
          <Text style={[styles.tabText, { color: COLORS.primary }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('PreviousPurchasesScreen')}
        >
          <Calendar size={24} color="#757575" />
          <Text style={styles.tabText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('ProfileScreen', { email: userEmail })}
        >
          <UserIcon size={24} color="#757575" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  profileIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  profileInitial: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 20,
  },
  bannerCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 20,
    marginBottom: 25,
    elevation: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  bannerTag: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  bannerTagText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 15,
  },
  lineageListContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    padding: 10,
  },
  lineageItem: {
    marginRight: 10,
  },
  lineageImage: {
    width: 60,
    height: 70,
    borderRadius: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: COLORS.white,
    width: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  viewAll: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '500',
  },
  sevaCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sevaIconBg: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  sevaEmoji: {
    fontSize: 30,
  },
  sevaInfo: {
    flex: 1,
  },
  sevaName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  sevaLocationText: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  sevaPriceContainer: {
    alignItems: 'flex-end',
  },
  sevaPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  timeTag: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 5,
  },
  timeTagText: {
    fontSize: 10,
    color: COLORS.accent,
    fontWeight: '500',
  },
  bottomTab: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#757575',
  },
});

export default HomeScreen;
