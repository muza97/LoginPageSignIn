import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => console.log("Account deleted"), style: "destructive" },
      ]
    );
  };

  return (
    <ScrollView className="bg-white flex-1 px-4 py-8">
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-6">
        <Ionicons name="arrow-back-outline" size={30} className="text-black" />
      </TouchableOpacity>

      {/* Åkturspreferenser */}
      <Section title="Åkturspreferenser">
        <SettingItem label="Favoritdestinationer" iconName="heart-outline" />
        <SettingItem label="Förvalda dricksinställningar" iconName="cash-outline" />
        <SettingItem label="Musik under åkturen" iconName="musical-notes-outline" hasSwitch />
        <SettingItem label="Fordonstyp" iconName="car-outline" />
      </Section>

      {/* Säkerhetsinställningar */}
      <Section title="Säkerhetsinställningar">
        <SettingItem label="Nödfunktion" iconName="alert-circle-outline" hasSwitch />
        <SettingItem label="Dela åkturer" iconName="share-social-outline" />
        <SettingItem label="Integritetskontroller" iconName="lock-closed-outline" />
      </Section>

      {/* Notifikationsinställningar */}
      <Section title="Notifikationsinställningar">
        <SettingItem label="Notisinställningar" iconName="notifications-outline" hasSwitch />
      </Section>

      {/* Tillgänglighetsalternativ */}
      <Section title="Tillgänglighetsalternativ">
        <SettingItem label="Textstorlek" iconName="text-outline" />
        <SettingItem label="Kontrast" iconName="contrast-outline" />
      </Section>

      {/* Språk och region */}
      <Section title="Språk och region">
        <SettingItem label="Språk" iconName="language-outline" />
        <SettingItem label="Datum- och tidformat" iconName="time-outline" />
      </Section>

      {/* Kontoinställningar */}
      <Section title="Kontoinställningar">
        <SettingItem label="Byt lösenord" iconName="key-outline" />
        <SettingItem label="Logga ut från alla enheter" iconName="log-out-outline" />
      </Section>

      {/* Support och hjälp */}
      <Section title="Support och hjälp">
        <SettingItem label="Kundsupport" iconName="help-circle-outline" />
        <SettingItem label="Feedback" iconName="thumbs-up-outline" />
      </Section>

      {/* Juridiska och sekretess */}
      <Section title="Juridiska och sekretess">
        <SettingItem label="Användarvillkor" iconName="document-text-outline" />
        <SettingItem label="Integritetspolicy" iconName="shield-checkmark-outline" />
      </Section>

      {/* Ta bort konto */}
      <TouchableOpacity onPress={handleDeleteAccount} className="mt-6 mb-9 p-4 border border-red-500 rounded-md">
        <Text className="text-red-500 text-center">Delete Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Hjälpkomponenter
const Section = ({ title, children }) => (
  <View className="mt-4">
    <Text className="text-lg font-semibold mb-2">{title}</Text>
    {children}
  </View>
);

const SettingItem = ({ label, iconName, hasSwitch }) => (
  <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
    <Ionicons name={iconName} size={24} className="text-gray-600" />
    <Text className="flex-1 ml-3 text-lg">{label}</Text>
    {hasSwitch && <Switch />}
    {!hasSwitch && <Ionicons name="chevron-forward-outline" size={24} className="text-gray-600" />}
  </View>
);