import { Suspense } from 'react';
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlucoseChart } from "@/components/glucose-chart";
import { LatestReadings } from "@/components/latest-readings";
import { DeviceStatus } from "@/components/device-status";
import { UpcomingAppointments } from "@/components/upcoming-appointments";
import { AlertSettings } from "@/components/alert-settings";
import { FamilySharing } from "@/components/family-sharing";
import { EmergencyContacts } from "@/components/emergency-contacts";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Blood Glucose Trends</CardTitle>
                <CardDescription>Your blood glucose levels over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
                  <GlucoseChart />
                </Suspense>
              </CardContent>
            </Card>

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

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Appointments & Alerts</CardTitle>
                <CardDescription>Manage your medical appointments and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="appointments">
                  <TabsList>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                    <TabsTrigger value="alerts">Alerts</TabsTrigger>
                  </TabsList>
                  <TabsContent value="appointments">
                    <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                      <UpcomingAppointments />
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