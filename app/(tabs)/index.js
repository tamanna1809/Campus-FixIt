import React, { useContext, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { API_URL } from "../config/api";

export default function Home() {
  const { logout, userToken, userInfo } = useContext(AuthContext);
  const router = useRouter();
  const [recentIssues, setRecentIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchRecentIssues();
    }, [])
  );
  
  const fetchRecentIssues = async () => {
    try {
      const res = await fetch(`${API_URL}/issues/mine`, {
        headers: { Authorization: userToken },
      });
      const data = await res.json();
      if (res.ok) {
        setRecentIssues(data);
      }
    } catch (error) {
      console.error("Failed to fetch issues", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Resolved") return "green";
    if (status === "In Progress") return "orange";
    return "#2563EB";
  };

  const getStatusBg = (status) => {
    if (status === "Resolved") return "#DCFCE7";
    if (status === "In Progress") return "#FEF3C7";
    return "#DBEAFE";
  }; 

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {userInfo?.name || "Student"}</Text>
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

        {loading ? (
          <ActivityIndicator size="large" color="#4F46E5" />
        ) : recentIssues.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="checkmark-circle-outline" size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>No tickets raised yet</Text>
          </View>
        ) : (
          recentIssues.slice(0, 2).map((issue) => (
            <View key={issue._id} style={styles.issueCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.issueTitle}>{issue.title}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusBg(issue.status) }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(issue.status) }]}>
                    {issue.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.issueLocation}>{issue.location} • {issue.category}</Text>
              <Text style={styles.issueDate}>Reported on {new Date(issue.date).toLocaleDateString()}</Text>
            </View>
          ))
        )}
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
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 1
  },
  emptyText: {
    color: "#9CA3AF",
    marginTop: 10,
    fontSize: 14
  }
});
