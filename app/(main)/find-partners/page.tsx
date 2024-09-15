"use client";

import { FC, useState } from "react";
import { MainNav } from "@/components/demo-dashboard/main-nav";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Partner {
  id: string;
  name: string;
  description: string;
  industry: string;
}

const dummyPartners: Partner[] = [
  {
    id: "1",
    name: "TechInnovate Solutions",
    description: "Specializing in cutting-edge software development and AI integration.",
    industry: "Technology",
  },
  {
    id: "2",
    name: "GreenLeaf Organics",
    description: "Organic food producer with a focus on sustainable farming practices.",
    industry: "Agriculture",
  },
  {
    id: "3",
    name: "UrbanChic Apparel",
    description: "Trendsetting fashion brand for the modern urban lifestyle.",
    industry: "Fashion",
  },
  {
    id: "4",
    name: "EcoEnergy Systems",
    description: "Renewable energy solutions for residential and commercial applications.",
    industry: "Energy",
  },
  {
    id: "5",
    name: "HealthFirst Wellness",
    description: "Holistic health and wellness products for mind and body.",
    industry: "Health & Wellness",
  },
];

const FindPartnersPage: FC = () => {
  const [partners] = useState<Partner[]>(dummyPartners);

  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center bg-muted px-6 rounded-xl mx-6">
          <MainNav />
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6 mx-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Find Partners</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <Card key={partner.id}>
              <CardHeader>
                <CardTitle>{partner.name}</CardTitle>
                <CardDescription>{partner.industry}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{partner.description}</p>
                <Button>Connect</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindPartnersPage;
