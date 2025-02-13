import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { BetParser } from "@/lib/parsers/bet-parser"
import { db } from "@/lib/db"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File
    if (!file) {
      return new NextResponse("No file uploaded", { status: 400 })
    }

    const parser = new BetParser()
    const bets = await parser.parseXMLBets(await file.text())

    // Store bets and their legs in the database
    for (const bet of bets) {
      const createdBet = await db.bet.create({
        data: {
          userId: session.user.id,
          datePlace: bet.datePlace,
          status: bet.status,
          league: bet.league,
          match: bet.match,
          betType: bet.betType,
          market: bet.market,
          price: bet.price,
          wager: bet.wager,
          winnings: bet.winnings,
          payout: bet.payout,
          potentialPayout: bet.potentialPayout,
          betSlipId: bet.betSlipId,
        },
      })

      if (bet.legs?.length > 0) {
        await db.betLeg.createMany({
          data: bet.legs.map((leg: any) => ({
            betId: createdBet.id,
            userId: session.user.id,
            status: leg.status,
            league: leg.league,
            match: leg.match,
            betType: leg.betType,
            market: leg.market,
            price: leg.price,
            result: leg.result,
          })),
        })
      }
    }

    return NextResponse.json({ success: true, count: bets.length })
  } catch (error) {
    console.error("Upload error:", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
