import Image from "next/image";
import Link from "next/link";
import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { fetcher } from "@/lib/coingecko.actions";

type Coin = {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  image: string;
  price: number;
  marketCap: string;
  volume24h: string;
  change24h: number;
};

const coins: Coin[] = [
  {
    id: "bitcoin",
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    price: 118245.73,
    marketCap: "2.35T",
    volume24h: "48.6B",
    change24h: 2.54,
  },
  {
    id: "ethereum",
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    price: 6543.19,
    marketCap: "790.2B",
    volume24h: "26.4B",
    change24h: -1.82,
  },
];

const Page = async () => {
  const coin = await fetcher<CoinDetailsData>("/coins/bitcoin", {
    "dex-pair-format": "symbol",
  });

  return (
    <main className="main-container">
      <section className="home-grid">
        <div id="coin-overview">
          <div className="header pt-2">
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={56}
              height={56}
            />

            <div className="info">
              <p>{coin.name || coin.symbol.toUpperCase()}</p>
              <h1>{coin.market_data.current_price.usd}</h1>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold">Trending Coins</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>24h Change</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>Volume</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {coins.map((coin) => {
                const isTrendingUp = coin.change24h >= 0;

                return (
                  <TableRow key={coin.id}>
                    <TableCell>{coin.rank}</TableCell>

                    <TableCell>
                      <Link
                        href={`/coins/${coin.id}`}
                        className="flex items-center gap-3"
                      >
                        <Image
                          src={coin.image}
                          alt={coin.name}
                          width={36}
                          height={36}
                        />

                        <div>
                          <p className="font-medium">{coin.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {coin.symbol}
                          </p>
                        </div>
                      </Link>
                    </TableCell>

                    <TableCell>
                      $
                      {coin.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>

                    <TableCell>
                      <div
                        className={cn(
                          "flex items-center gap-1 font-medium",
                          isTrendingUp ? "text-green-500" : "text-red-500",
                        )}
                      >
                        {isTrendingUp ? (
                          <TrendingUp size={16} />
                        ) : (
                          <TrendingDown size={16} />
                        )}

                        <span>
                          {isTrendingUp ? "+" : ""}
                          {coin.change24h}%
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>${coin.marketCap}</TableCell>

                    <TableCell>${coin.volume24h}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="mt-7 w-full space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
};

export default Page;
