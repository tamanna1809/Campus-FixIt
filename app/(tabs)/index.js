import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Home() {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Student</Text>
          <Text style={styles.subtitle}>What needs fixing today?</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        <View style={styles.actionGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/create")}
          >
            <View style={[styles.iconBox, { backgroundColor: "#E0E7FF" }]}>
              <Ionicons name="warning-outline" size={28} color="#4F46E5" />
            </View>
            <Text style={styles.actionText}>Report Issue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/my-issues")}
          >
            <View style={[styles.iconBox, { backgroundColor: "#DCFCE7" }]}>
              <Ionicons name="time-outline" size={28} color="#16A34A" />
            </View>
            <Text style={styles.actionText}>Track Status</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Updates */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Updates</Text>
          <TouchableOpacity onPress={() => router.push("/my-issues")}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Mock Issue Card */}
        <View style={styles.issueCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.issueTitle}>Broken Projector</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>In Progress</Text>
            </View>
          </View>
          <Text style={styles.issueLocation}>Room 304 • Science Block</Text>
          <Text style={styles.issueDate}>Reported 2 days ago</Text>
        </View>

        <View style={styles.issueCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.issueTitle}>Water Leak</Text>
            <View style={[styles.statusBadge, { backgroundColor: "#FEF3C7" }]}>
              <Text style={[styles.statusText, { color: "#D97706" }]}>Pending</Text>
            </View>
          </View>
          <Text style={styles.issueLocation}>2nd Floor Washroom • Library</Text>
          <Text style={styles.issueDate}>Reported 5 hours ago</Text>
        </View>
      </ScrollView>
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
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
  },
  content: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  actionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  actionCard: {
    backgroundColor: "#FFFFFF",
    width: "48%",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  actionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },
  seeAll: {
    color: "#4F46E5",
    fontSize: 14,
    fontWeight: "600",
  },
  issueCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
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
  issueTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },
  statusBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2563EB",
  },
  issueLocation: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 4,
  },
  issueDate: {
    fontSize: 12,
    color: "#9CA3AF",
  },
});
