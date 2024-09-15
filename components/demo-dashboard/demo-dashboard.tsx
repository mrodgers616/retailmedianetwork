import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { MainNav } from "@/components/demo-dashboard/main-nav";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useFirestore, useUser } from "reactfire";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const DemoDashboard: FC = () => {
  const [businessData, setBusinessData] = useState({
    totalSales: 0,
    averageOrderValue: 0,
    connectedStores: 0,
    recentCollaborations: [],
  });

  const { data: user } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    const fetchBusinessData = async () => {
      if (user) {
        const businessDocRef = doc(firestore, 'businesses', user.uid);
        const businessDocSnap = await getDoc(businessDocRef);
        
        if (businessDocSnap.exists()) {
          const businessData = businessDocSnap.data();
          setBusinessData({
            totalSales: businessData.totalSales || 0,
            averageOrderValue: businessData.averageOrderValue || 0,
            connectedStores: businessData.connectedStores || 0,
            recentCollaborations: [],
          });
        }

        const collaborationsRef = collection(firestore, 'collaborations');
        const q = query(collaborationsRef, where("businessId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        
        let recentCollaborations: any = [];

        querySnapshot.forEach((doc) => {
          const collaboration = doc.data();
          recentCollaborations.push(collaboration);
        });

        setBusinessData(prevState => ({ 
          ...prevState,
          recentCollaborations: recentCollaborations.slice(0, 5),
        }));
      }
    };

    fetchBusinessData();
  }, [user, firestore]);

  const chartData = [
    { name: 'Jan', sales: 6500 },
    { name: 'Feb', sales: 5900 },
    { name: 'Mar', sales: 8000 },
    { name: 'Apr', sales: 8100 },
    { name: 'May', sales: 7600 },
    { name: 'Jun', sales: 8500 },
  ];

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="flex items-end justify-between space-y-2 mb-6">
          <h2 className="text-3xl leading-5 font-bold tracking-tight">
            Business Dashboard
          </h2>
        </div>
        <div className="flex h-16 items-center bg-muted px-6 rounded-xl">
          <MainNav />
        </div>
        <div className="flex-1 space-y-4 pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Sales
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${businessData.totalSales.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Total sales across all platforms
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Order Value
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${businessData.averageOrderValue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  Average value per order
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Connected Stores</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{businessData.connectedStores}</div>
                <p className="text-xs text-muted-foreground">
                  Shopify and Amazon stores linked
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Collaborations</CardTitle>
                <CardDescription>
                  Your last {businessData.recentCollaborations.length} business collaborations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <RecentCollaborations collaborations={businessData.recentCollaborations} /> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
