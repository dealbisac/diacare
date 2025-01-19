import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LineChart from "@/components/line-chart";
import AppointmentList from "@/components/appointment-list";
import AlertList from "@/components/alert-list";
import { LatestReadings } from "@/components/latest-readings";
import { DeviceStatus } from "@/components/device-status";
import { FamilySharing } from "@/components/family-sharing";
import { EmergencyContacts } from "@/components/emergency-contacts";
import { AlertSettings } from "@/components/alert-settings";

// Dummy Data
const glucoseTrendsData = {
  labels: ["2025-01-10", "2025-01-11", "2025-01-12", "2025-01-13", "2025-01-14"],
  datasets: [
    {
      label: "Blood Glucose Level (mg/dL)",
      data: [90, 100, 110, 105, 95],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.4,
    },
  ],
};

const upcomingAppointments = [
  { id: 1, date: "2025-01-20", time: "10:00 AM", doctor: "Dr. Smith" },
  { id: 2, date: "2025-01-22", time: "2:00 PM", doctor: "Dr. Taylor" },
];

const alertSettingsData = [
  { id: 1, type: "High Glucose", threshold: "Above 180 mg/dL", enabled: true },
  { id: 2, type: "Low Glucose", threshold: "Below 70 mg/dL", enabled: true },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">DiaCare Dashboard</h1>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Blood Glucose Trends */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Blood Glucose Trends</CardTitle>
                <CardDescription>Your blood glucose levels over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[50px] w-full" />}>
                  <LineChart data={glucoseTrendsData} />
                </Suspense>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                  <AppointmentList appointments={upcomingAppointments} />
                </Suspense>
              </CardContent>
            </Card>

            {/* Alerts and Notifications*/}
            <Card>
              <CardHeader>
                <CardTitle>Notifications & Alerts</CardTitle>
                <CardDescription>Manage your medical alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="notifications">
                  <TabsList>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="alerts">Alerts</TabsTrigger>
                  </TabsList>
                  <TabsContent value="notifications">
                    <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                      <AlertList alerts={alertSettingsData} />
                    </Suspense>
                  </TabsContent>
                  <TabsContent value="alerts">
                    <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                      <AlertSettings />
                    </Suspense>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Latest Readings */}
            <Card>
              <CardHeader>
                <CardTitle>Latest Readings</CardTitle>
                <CardDescription>Your most recent blood glucose measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                  <LatestReadings />
                </Suspense>
              </CardContent>
            </Card>

            {/* Connected Devices */}
            <Card>
              <CardHeader>
                <CardTitle>Connected Devices</CardTitle>
                <CardDescription>Status of your medical devices</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                  <DeviceStatus />
                </Suspense>
              </CardContent>
            </Card>

            {/* Family Sharing */}
            <Card>
              <CardHeader>
                <CardTitle>Family Sharing</CardTitle>
                <CardDescription>Manage access for family members</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                  <FamilySharing />
                </Suspense>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
                <CardDescription>Manage your emergency contacts</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                  <EmergencyContacts />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
