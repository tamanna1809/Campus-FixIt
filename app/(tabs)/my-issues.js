import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const MOCK_ISSUES = [
  {
    id: "1",
    title: "Broken Projector",
    location: "Room 304, Science Block",
    status: "In Progress",
    statusColor: "blue",
    date: "2 days ago",
  },
  {
    id: "2",
    title: "Water Leak",
    location: "2nd Floor Washroom, Library",
    status: "Pending",
    statusColor: "yellow",
    date: "5 hours ago",
  },
  {
    id: "3",
    title: "Loose Wiring",
    location: "Corridor A, Main Building",
    status: "Resolved",
    statusColor: "green",
    date: "1 week ago",
  },
];

export default function MyIssues() {
  const renderItem = ({ item }) => {
    let badgeBg, badgeText;
    if (item.statusColor === "blue") {
      badgeBg = "#DBEAFE";
      badgeText = "#2563EB";
    } else if (item.statusColor === "yellow") {
      badgeBg = "#FEF3C7";
      badgeText = "#D97706";
    } else if (item.statusColor === "green") {
      badgeBg = "#DCFCE7";
      badgeText = "#16A34A";
    }

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={[styles.badge, { backgroundColor: badgeBg }]}>
            <Text style={[styles.badgeText, { color: badgeText }]}>
              {item.status}
            </Text>
          </View>
        </View>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Issues</Text>
      </View>
      <FlatList
        data={MOCK_ISSUES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  listContent: {
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  location: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#9CA3AF",
  },
});
