import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView } from 'react-native';

export default function AdminDashboard() {
  // Mock stats
  const stats = {
    agents: 24,
    customers: 148,
    properties: {
      rent: 62,
      forSale: 55,
      sold: 31,
      remaining: 18,
    },
  };

  // Simple monthly chart data (Jan-Dec)
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const sold =   [2, 3, 4, 3, 2, 5, 4, 3, 6, 7, 5, 7];
  const rent =   [3, 4, 2, 5, 6, 4, 5, 6, 4, 5, 6, 8];
  const maxY = Math.max(...sold, ...rent) + 2;

  const feedback = [
    { id: 'f1', customer: 'Alice Johnson', agent: 'Evan Brooks', note: 'Quick response and smooth process.' },
    { id: 'f2', customer: 'Bob Smith', agent: 'Dana Williams', note: 'Helpful in finding rental options within budget.' },
    { id: 'f3', customer: 'Carol Lee', agent: 'Franklin Reed', note: 'Great follow-up after sale completion.' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B1F3A' }} edges={['bottom']}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24, paddingTop: 0, gap: 16 }}
      >
        {/* Top stats */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <View style={{ flexBasis: '48%', backgroundColor: '#0A274D', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#1A3B6B' }}>
            <Text style={{ color: '#C6D0E0', fontSize: 12 }}>Agents</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '700', marginTop: 4 }}>{stats.agents}</Text>
          </View>
          <View style={{ flexBasis: '48%', backgroundColor: '#0A274D', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#1A3B6B' }}>
            <Text style={{ color: '#C6D0E0', fontSize: 12 }}>Customers</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '700', marginTop: 4 }}>{stats.customers}</Text>
          </View>
          <View style={{ flexBasis: '48%', backgroundColor: '#0A274D', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#1A3B6B' }}>
            <Text style={{ color: '#C6D0E0', fontSize: 12 }}>For Rent</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '700', marginTop: 4 }}>{stats.properties.rent}</Text>
          </View>
          <View style={{ flexBasis: '48%', backgroundColor: '#0A274D', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#1A3B6B' }}>
            <Text style={{ color: '#C6D0E0', fontSize: 12 }}>For Sale</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '700', marginTop: 4 }}>{stats.properties.forSale}</Text>
          </View>
          <View style={{ flexBasis: '48%', backgroundColor: '#0A274D', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#1A3B6B' }}>
            <Text style={{ color: '#C6D0E0', fontSize: 12 }}>Sold</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '700', marginTop: 4 }}>{stats.properties.sold}</Text>
          </View>
          <View style={{ flexBasis: '48%', backgroundColor: '#0A274D', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#1A3B6B' }}>
            <Text style={{ color: '#C6D0E0', fontSize: 12 }}>Remaining</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '700', marginTop: 4 }}>{stats.properties.remaining}</Text>
          </View>
        </View>

        {/* Monthly chart */}
        <View style={{ backgroundColor: '#0A274D', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#1A3B6B' }}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>Monthly Performance</Text>
          <Text style={{ color: '#C6D0E0', marginTop: 4, fontSize: 12 }}>Sold vs Rent</Text>
          <View style={{ height: 160, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 12 }}>
            {months.map((m, i) => {
              const soldH = (sold[i] / maxY) * 140 + 6;
              const rentH = (rent[i] / maxY) * 140 + 6;
              return (
                <View key={m + i} style={{ alignItems: 'center', width: 18 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2 }}>
                    <View style={{ width: 6, height: rentH, backgroundColor: '#3B82F6', borderTopLeftRadius: 3, borderTopRightRadius: 3 }} />
                    <View style={{ width: 6, height: soldH, backgroundColor: '#10B981', borderTopLeftRadius: 3, borderTopRightRadius: 3 }} />
                  </View>
                  <Text style={{ color: '#C6D0E0', fontSize: 10, marginTop: 6 }}>{m}</Text>
                </View>
              );
            })}
          </View>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 10, height: 10, backgroundColor: '#3B82F6', borderRadius: 2, marginRight: 6 }} />
              <Text style={{ color: '#C6D0E0', fontSize: 12 }}>Rent</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 10, height: 10, backgroundColor: '#10B981', borderRadius: 2, marginRight: 6 }} />
              <Text style={{ color: '#C6D0E0', fontSize: 12 }}>Sold</Text>
            </View>
          </View>
        </View>

        {/* Customer feedback */}
        <View style={{ backgroundColor: '#0A274D', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#1A3B6B' }}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>Customer Feedback</Text>
          <View style={{ marginTop: 12, gap: 8 }}>
            {feedback.map((f) => (
              <View key={f.id} style={{ backgroundColor: '#0B1F3A', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#1A3B6B' }}>
                <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>{f.customer} → {f.agent}</Text>
                <Text style={{ color: '#C6D0E0', marginTop: 4, lineHeight: 18 }}>{f.note}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
 }
