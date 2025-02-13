import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart2, DollarSign, FileUp, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Analyze Your Hard Rock Bets Like a Pro
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            One-click analysis of your sports betting history. Just drag and drop your Hard Rock Bet exports and get instant insights into your performance.
          </p>
          <div className="space-x-4">
            <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Pricing
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Turn your betting history into actionable insights with our powerful analytics platform.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <Card className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <FileUp className="h-12 w-12 fill-current" />
            <div className="space-y-2">
              <h3 className="font-bold">Easy Upload</h3>
              <p className="text-sm text-muted-foreground">
                Just drag and drop your Hard Rock Bet history exports. We handle the rest.
              </p>
            </div>
          </Card>
          <Card className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <BarChart2 className="h-12 w-12 fill-current" />
            <div className="space-y-2">
              <h3 className="font-bold">Detailed Analysis</h3>
              <p className="text-sm text-muted-foreground">
                See your win rates, ROI, and performance by sport, league, and bet type.
              </p>
            </div>
          </Card>
          <Card className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <TrendingUp className="h-12 w-12 fill-current" />
            <div className="space-y-2">
              <h3 className="font-bold">Performance Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Track your betting trends and identify profitable patterns.
              </p>
            </div>
          </Card>
        </div>
        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            We support XML exports from Hard Rock Bet. Additional sportsbook support coming soon.
          </p>
        </div>
      </section>
      <section id="testimonials" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Take Control of Your Betting
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Stop guessing. Start analyzing. Know exactly where you're winning and losing.
          </p>
          <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }))}>
            Try It Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
