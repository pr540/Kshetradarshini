// Complete stub for lucide-react-native using @expo/vector-icons
// This satisfies all imports from Profile, Home, Booking, Settings, etc.
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const createIcon = (ioniconName) => ({ size = 24, color = 'black', style }) => (
    <Ionicons name={ioniconName} size={size} color={color} style={style} />
);

const iconMap = {
    Calendar: 'calendar-outline',
    Clock: 'time-outline',
    User: 'person-outline',
    ChevronLeft: 'chevron-back',
    MapPin: 'location-outline',
    CircleCheck: 'checkmark-circle-outline',
    Download: 'download-outline',
    Share2: 'share-social-outline',
    ChevronRight: 'chevron-forward',
    Home: 'home-outline',
    Mail: 'mail-outline',
    Lock: 'lock-closed-outline',
    LogIn: 'log-in-outline',
    Instagram: 'logo-instagram',
    Settings: 'settings-outline',
    CreditCard: 'card-outline',
    Bell: 'notifications-outline',
    LogOut: 'log-out-outline',
    Github: 'logo-github',
    Linkedin: 'logo-linkedin',
    MessageCircle: 'chatbubble-outline',
    Eye: 'eye-outline',
    Languages: 'language-outline',
    HelpCircle: 'help-circle-outline',
    Phone: 'call-outline',
};

export const Calendar = createIcon(iconMap.Calendar);
export const Clock = createIcon(iconMap.Clock);
export const User = createIcon(iconMap.User);
export const ChevronLeft = createIcon(iconMap.ChevronLeft);
export const MapPin = createIcon(iconMap.MapPin);
export const CircleCheck = createIcon(iconMap.CircleCheck);
export const Download = createIcon(iconMap.Download);
export const Share2 = createIcon(iconMap.Share2);
export const ChevronRight = createIcon(iconMap.ChevronRight);
export const Home = createIcon(iconMap.Home);
export const Mail = createIcon(iconMap.Mail);
export const Lock = createIcon(iconMap.Lock);
export const LogIn = createIcon(iconMap.LogIn);
export const Instagram = createIcon(iconMap.Instagram);
export const Settings = createIcon(iconMap.Settings);
export const CreditCard = createIcon(iconMap.CreditCard);
export const Bell = createIcon(iconMap.Bell);
export const LogOut = createIcon(iconMap.LogOut);
export const Github = createIcon(iconMap.Github);
export const Linkedin = createIcon(iconMap.Linkedin);
export const MessageCircle = createIcon(iconMap.MessageCircle);
export const Eye = createIcon(iconMap.Eye);
export const Languages = createIcon(iconMap.Languages);
export const HelpCircle = createIcon(iconMap.HelpCircle);
export const Phone = createIcon(iconMap.Phone);

// For aliased imports like User as UserIconProfile or UserIcon
export const UserIcon = User;
export const UserIconProfile = User;

export default createIcon('help-circle-outline');
