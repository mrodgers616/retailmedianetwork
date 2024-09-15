import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="container mx-auto py-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">Small Business Collaboration Platform</Badge>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-indigo-900">
            Grow Your Business Through Collaboration
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-indigo-700 mb-8">
            Connect your Shopify or Amazon store, gain insights into your metrics, and collaborate with similar businesses to boost your sales and reach.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
            </Link>
            <Link href="/about" className={cn(buttonVariants({ variant: "outline" }), "text-lg border-indigo-600 text-indigo-600 hover:bg-indigo-50")}>
              Learn More
            </Link>
          </div>
        </header>

        <main className="container mx-auto flex-grow">
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-indigo-900">Why Choose Our Platform?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Store Integration", description: "Easily connect Shopify and Amazon stores", color: "bg-blue-50" },
                { title: "Business Insights", description: "Understand your sales and business metrics", color: "bg-indigo-50" },
                { title: "Smart Matching", description: "Connect with similar, non-competing businesses", color: "bg-purple-50" },
                { title: "Data Sharing", description: "Collaborate on email lists and customer data", color: "bg-blue-50" },
                { title: "Cross-Selling", description: "Add products to each other's online stores", color: "bg-indigo-50" },
                { title: "Upsell Opportunities", description: "Boost sales through checkout page collaborations", color: "bg-purple-50" },
              ].map((feature, index) => (
                <Card key={index} className={`text-center ${feature.color}`}>
                  <CardHeader>
                    <CardTitle className="text-indigo-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-indigo-600">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="py-16">
            <Card className="text-center p-8 bg-gradient-to-r from-indigo-100 to-blue-100">
              <CardHeader>
                <CardTitle className="text-2xl mb-4 text-indigo-900">Ready to Expand Your Business Network?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg mb-6 text-indigo-700">
                  Join thousands of small businesses that have grown their reach and sales through our collaborative platform.
                </CardDescription>
                <Link href="/signup">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">Sign Up Now</Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        </main>

        <footer className="bg-indigo-900 text-white py-8 mt-16">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Small Business Collaborator. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
