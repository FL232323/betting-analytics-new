export class BetParser {
  private parseDate(dateStr: string): Date {
    return new Date(dateStr);
  }

  private parseNumber(value: string): number {
    return parseFloat(value.replace(/[^0-9.-]+/g, ""));
  }

  async parseXMLBets(xmlContent: string) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
    const rows = xmlDoc.getElementsByTagName("ss:Row");
    
    const bets: any[] = [];
    let currentBet: any = null;
    
    // Skip header row
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("ss:Cell");
      const dateCell = cells[0]?.getElementsByTagName("ss:Data")[0]?.textContent;
      
      if (dateCell && dateCell.trim()) {
        // This is a main bet row
        if (currentBet) {
          bets.push(currentBet);
        }
        
        currentBet = {
          datePlace: this.parseDate(dateCell),
          status: cells[1]?.getElementsByTagName("ss:Data")[0]?.textContent || "",
          league: cells[2]?.getElementsByTagName("ss:Data")[0]?.textContent || "",
          match: cells[3]?.getElementsByTagName("ss:Data")[0]?.textContent || "",
          betType: cells[4]?.getElementsByTagName("ss:Data")[0]?.textContent || "",
          market: cells[5]?.getElementsByTagName("ss:Data")[0]?.textContent || "",
          price: this.parseNumber(cells[6]?.getElementsByTagName("ss:Data")[0]?.textContent || "0"),
          wager: this.parseNumber(cells[7]?.getElementsByTagName("ss:Data")[0]?.textContent || "0"),
          winnings: this.parseNumber(cells[8]?.getElementsByTagName("ss:Data")[0]?.textContent || "0"),
          payout: this.parseNumber(cells[9]?.getElementsByTagName("ss:Data")[0]?.textContent || "0"),
          potentialPayout: this.parseNumber(cells[10]?.getElementsByTagName("ss:Data")[0]?.textContent || "0"),
          result: cells[11]?.getElementsByTagName("ss:Data")[0]?.textContent || "",
          betSlipId: cells[12]?.getElementsByTagName("ss:Data")[0]?.textContent || "",
          legs: []
        };
      } else if (currentBet && currentBet.betType === "MULTIPLE") {
        // This is a leg of a multiple bet
        currentBet.legs.push({
          status: cells[1]?.getElementsByTagName("ss:Data")[0]?.textContent || "",
          league: cells[2]?.getElementsByTagName("ss:Data")[0]?.textContent || "",
          match: cells[3]?.getElementsByTagName("ss:Data")[0]?.textContent || "",
          betType: cells[4]?.getElementsByTagName("ss:Data")[0]?.textContent || "",
          market: cells[5]?.getElementsByTagName("ss:Data")[0]?.textContent || "",
          price: this.parseNumber(cells[6]?.getElementsByTagName("ss:Data")[0]?.textContent || "0"),
          result: cells[11]?.getElementsByTagName("ss:Data")[0]?.textContent || ""
        });
      }
    }
    
    // Don't forget to add the last bet
    if (currentBet) {
      bets.push(currentBet);
    }
    
    return bets;
  }
}
