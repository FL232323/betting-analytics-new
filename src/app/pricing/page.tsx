import Link from "next/link"
import { BarChart, DollarSign, FileText, Settings, TrendingUp } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Pricing",
}

export default function PricingPage() {
  return (
    <section className="container flex flex-col gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Simple, Transparent Pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Choose the plan that works best for your betting analysis needs.
        </p>
      </div>
      <div className="grid w-full items-start gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Basic Plan</CardTitle>
            <CardDescription>
              Perfect for casual bettors looking to improve their game.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-4">
              <DollarSign />
              <div className="flex flex-col">
                <p className="text-lg font-bold">$9.99/month</p>
                <p className="text-sm text-muted-foreground">
                  Or $99/year (save 17%)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FileText className="h-5 w-5" />
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Core Features
                </p>
                <ul className="list-disc pl-4 text-sm text-muted-foreground">
                  <li>Unlimited bet history uploads</li>
                  <li>Basic performance analytics</li>
                  <li>Win/loss tracking</li>
                  <li>League analysis</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link
              href="/login"
              className={cn(buttonVariants({ size: "lg" }), "w-full")}
            >
              Get Started
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pro Plan</CardTitle>
            <CardDescription>
              Advanced analytics for serious sports bettors.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-4">
              <DollarSign />
              <div className="flex flex-col">
                <p className="text-lg font-bold">$24.99/month</p>
                <p className="text-sm text-muted-foreground">
                  Or $249/year (save 17%)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <BarChart className="h-5 w-5" />
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Everything in Basic, plus:
                </p>
                <ul className="list-disc pl-4 text-sm text-muted-foreground">
                  <li>Advanced statistical analysis</li>
                  <li>Trend identification</li>
                  <li>ROI tracking by bet type</li>
                  <li>Betting pattern insights</li>
                  <li>Performance alerts</li>
                  <li>Export reports</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "w-full"
              )}
            >
              Get Started
            </Link>
          </CardFooter>
        </Card>
      </div>
      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Need a custom solution? {" "}
          <Link
            href="/contact"
            className="font-medium text-primary underline underline-offset-4"
          >
            Contact us
          </Link>{" "}
          for enterprise pricing.
        </p>
      </div>
    </section>
  )
}
