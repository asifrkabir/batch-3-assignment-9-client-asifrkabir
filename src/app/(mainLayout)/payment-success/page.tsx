"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";
import Link from "next/link";

const PaymentSuccessPage = () => {
  return (
    <div className="flex flex-col justify-center items-center p-6 mt-40 text-center">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold text-emerald-600">
          Payment Successful!
        </h1>
        <p className="text-gray-600">
          Thank you for your purchase! We hope you to see you again soon.
        </p>
      </div>

      <div className="flex space-x-4">
        <Link href="/products">
          <Button variant="outline" className="gap-2">
            View More Products <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>

        <Link href="/">
          <Button className="bg-emerald-500 hover:bg-emerald-700 gap-2 text-white">
            Go to Homepage <Home className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
