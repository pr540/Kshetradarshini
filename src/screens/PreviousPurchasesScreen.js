import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Download, Share2, Calendar, User } from 'lucide-react-native';
import { COLORS, SIZES } from '../constants/theme';

const HISTORY_DATA = [
  {
    id: '1',
    name: 'Anjita Seva',
    location: 'Hitec City',
    date: '20 May 2024',
    devotee: 'Rohan Sharma',
    amount: '₹500',
    status: 'Upcoming',
  },
  {
    id: '2',
    name: 'Gau Seva',
    location: 'Gachibowli',
    date: '10 May 2024',
    devotee: 'Rohan Sharma',
    amount: '₹200',
    status: 'Completed',
  },
];

const PreviousPurchasesScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Upcoming');

  const renderHistoryItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.sevaName}>{item.name} - {item.location}</Text>
        <View style={[styles.statusTag, item.status === 'Completed' ? styles.completedTag : styles.upcomingTag]}>
          <Text style={[styles.statusText, item.status === 'Completed' ? styles.completedText : styles.upcomingText]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Calendar size={16} color="#757575" />
          <Text style={styles.infoText}>{item.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <User size={16} color="#757575" />
          <Text style={styles.infoText}>{item.devotee}</Text>
        </View>
        <Text style={styles.amountText}>{item.amount}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.iconButton}>
          <Download size={18} color={COLORS.secondaryDark} />
          <Text style={styles.iconButtonText}>Download PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Share2 size={18} color={COLORS.secondaryDark} />
          <Text style={styles.iconButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredData = HISTORY_DATA.filter(item => item.status === activeTab);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.tabsContainer}>
        {['Upcoming', 'Completed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} bookings found.</Text>
          </View>
        )}
      />
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
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#757575',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  listContent: {
    padding: SIZES.padding,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  sevaName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 10,
  },
  upcomingTag: {
    backgroundColor: '#E3F2FD',
  },
  completedTag: {
    backgroundColor: '#E8F5E9',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  upcomingText: {
    color: '#1976D2',
  },
  completedText: {
    color: '#2E7D32',
  },
  cardBody: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 8,
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  iconButtonText: {
    fontSize: 12,
    color: COLORS.secondaryDark,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#757575',
  },
});

export default PreviousPurchasesScreen;
