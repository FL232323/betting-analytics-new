import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar 
} from "recharts"

async function getData(userId: string) {
  const bets = await db.bet.findMany({
    where: { userId },
    include: { legs: true },
    orderBy: { datePlace: "asc" },
  })

  // Calculate running profit/loss
  let runningPL = 0
  const profitData = bets.map(bet => {
    runningPL += (bet.winnings - bet.wager)
    return {
      date: bet.datePlace.toISOString().split("T")[0],
      profit: runningPL
    }
  })

  // Calculate win rate by league
  const leagueStats = bets.reduce((acc: any, bet) => {
    if (!acc[bet.league]) {
      acc[bet.league] = { wins: 0, total: 0 }
    }
    acc[bet.league].total++
    if (bet.winnings > 0) acc[bet.league].wins++
    return acc
  }, {})

  const leagueData = Object.entries(leagueStats).map(([league, stats]: [string, any]) => ({
    league,
    winRate: Math.round((stats.wins / stats.total) * 100)
  }))

  return {
    profitData,
    leagueData,
    totalBets: bets.length,
    totalWagered: bets.reduce((sum, bet) => sum + bet.wager, 0),
    totalProfit: bets.reduce((sum, bet) => sum + (bet.winnings - bet.wager), 0),
    winRate: Math.round((bets.filter(b => b.winnings > 0).length / bets.length) * 100)
  }
}

export default async function AnalyticsPage() {
  const session = await auth()
  if (!session?.user?.id) return null

  const data = await getData(session.user.id)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Betting Analytics"
        text="View your betting performance and statistics."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalBets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Wagered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.totalWagered.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${data.totalProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${data.totalProfit.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.winRate}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 pt-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Profit/Loss Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.profitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Win Rate by League</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.leagueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="league" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="winRate" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
