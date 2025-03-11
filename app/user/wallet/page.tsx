"use client"

import { useState } from "react"
import Link from "next/link"
import { UserHeader } from "@/components/user-header"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, Clock, Filter } from "lucide-react"

// Mock wallet  CreditCard, Calendar, Clock, DollarSign, Filter } from "lucide-react"

// Mock wallet data
const walletData = {
  balance: 250.75,
  pendingBalance: 50.0,
  transactions: [
    {
      id: "tx1",
      type: "deposit",
      amount: 100.0,
      date: "2025-03-08T14:30:00Z",
      status: "completed",
      description: "Wallet Top-up",
    },
    {
      id: "tx2",
      type: "payment",
      amount: 75.0,
      date: "2025-03-05T10:15:00Z",
      status: "completed",
      description: "Payment for Health Seminar",
      eventId: "2",
      eventTitle: "Health Seminar",
    },
    {
      id: "tx3",
      type: "refund",
      amount: 150.0,
      date: "2025-02-28T16:45:00Z",
      status: "completed",
      description: "Refund for Cancelled Event",
      eventId: "7",
      eventTitle: "Nutrition Workshop",
    },
    {
      id: "tx4",
      type: "deposit",
      amount: 200.0,
      date: "2025-02-20T09:00:00Z",
      status: "completed",
      description: "Wallet Top-up",
    },
    {
      id: "tx5",
      type: "payment",
      amount: 125.0,
      date: "2025-02-15T13:20:00Z",
      status: "completed",
      description: "Payment for Pediatrics Summit",
      eventId: "6",
      eventTitle: "Pediatrics Summit",
    },
  ],
  cards: [
    {
      id: "card1",
      type: "visa",
      last4: "4242",
      expiryDate: "05/26",
      isDefault: true,
    },
    {
      id: "card2",
      type: "mastercard",
      last4: "8888",
      expiryDate: "09/27",
      isDefault: false,
    },
  ],
}

export default function WalletPage() {
  const { toast } = useToast()
  const [topupAmount, setTopupAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [transactionFilter, setTransactionFilter] = useState("all")

  const filteredTransactions = walletData.transactions.filter((transaction) => {
    if (transactionFilter === "all") return true
    return transaction.type === transactionFilter
  })

  const handleTopup = async () => {
    const amount = Number.parseFloat(topupAmount)

    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid amount to top up your wallet.",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Top-up successful",
        description: `$${amount.toFixed(2)} has been added to your wallet.`,
      })

      setTopupAmount("")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Top-up failed",
        description: "There was an error processing your top-up. Please try again.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleAddCard = () => {
    toast({
      title: "Add payment method",
      description: "This feature would allow adding a new payment method in production.",
    })
  }

  const handleSetDefaultCard = (cardId: string) => {
    toast({
      title: "Default card updated",
      description: "Your default payment method has been updated.",
    })
  }

  const handleRemoveCard = (cardId: string) => {
    toast({
      title: "Card removed",
      description: "Your payment method has been removed.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <UserHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <UserNav className="p-1" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden pt-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Medical Wallet</h1>
            <p className="text-muted-foreground">Manage your wallet and payment methods</p>
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${walletData.balance.toFixed(2)}</div>
                    {walletData.pendingBalance > 0 && (
                      <p className="text-xs text-muted-foreground">${walletData.pendingBalance.toFixed(2)} pending</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="topup-amount">Top Up Wallet</Label>
                      <div className="flex space-x-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                          <Input
                            id="topup-amount"
                            type="number"
                            placeholder="0.00"
                            className="pl-7"
                            value={topupAmount}
                            onChange={(e) => setTopupAmount(e.target.value)}
                          />
                        </div>
                        <Button onClick={handleTopup} disabled={isProcessing}>
                          {isProcessing ? "Processing..." : "Top Up"}
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end space-y-2">
                      <Link href="/user/payment/history">
                        <Button variant="outline" className="w-full">
                          <Clock className="mr-2 h-4 w-4" />
                          Payment History
                        </Button>
                      </Link>
                      <Link href="/user/wallet/settings">
                        <Button variant="outline" className="w-full">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Manage Payment Methods
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your most recent wallet activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {walletData.transactions.slice(0, 3).map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {transaction.type === "deposit" ? (
                                <ArrowDownLeft className="h-4 w-4 text-green-500" />
                              ) : transaction.type === "refund" ? (
                                <ArrowDownLeft className="h-4 w-4 text-blue-500" />
                              ) : (
                                <ArrowUpRight className="h-4 w-4 text-red-500" />
                              )}
                              <span>{transaction.description}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(transaction.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </TableCell>
                          <TableCell className={transaction.type === "payment" ? "text-red-500" : "text-green-500"}>
                            {transaction.type === "payment" ? "-" : "+"}${transaction.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge variant={transaction.status === "completed" ? "outline" : "secondary"}>
                              {transaction.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("transactions")}>
                    View All Transactions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle>Transaction History</CardTitle>
                      <CardDescription>View all your wallet transactions</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <select
                        className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                        value={transactionFilter}
                        onChange={(e) => setTransactionFilter(e.target.value)}
                      >
                        <option value="all">All Transactions</option>
                        <option value="deposit">Deposits</option>
                        <option value="payment">Payments</option>
                        <option value="refund">Refunds</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {transaction.type === "deposit" ? (
                                <ArrowDownLeft className="h-4 w-4 text-green-500" />
                              ) : transaction.type === "refund" ? (
                                <ArrowDownLeft className="h-4 w-4 text-blue-500" />
                              ) : (
                                <ArrowUpRight className="h-4 w-4 text-red-500" />
                              )}
                              <div>
                                <div>{transaction.description}</div>
                                {transaction.eventTitle && (
                                  <div className="text-xs text-muted-foreground">
                                    <Link href={`/user/events/${transaction.eventId}`} className="hover:underline">
                                      {transaction.eventTitle}
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(transaction.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </TableCell>
                          <TableCell className={transaction.type === "payment" ? "text-red-500" : "text-green-500"}>
                            {transaction.type === "payment" ? "-" : "+"}${transaction.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge variant={transaction.status === "completed" ? "outline" : "secondary"}>
                              {transaction.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment-methods" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your saved payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {walletData.cards.map((card) => (
                    <div key={card.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-16 items-center justify-center rounded-md bg-muted">
                          {card.type === "visa" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <path d="M7 15V9l3 6h1l3-6v6" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <circle cx="12" cy="12" r="3" />
                              <circle cx="19" cy="12" r="1" fill="currentColor" />
                              <circle cx="5" cy="12" r="1" fill="currentColor" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {card.type.charAt(0).toUpperCase() + card.type.slice(1)} ending in {card.last4}
                          </p>
                          <p className="text-sm text-muted-foreground">Expires {card.expiryDate}</p>
                        </div>
                        {card.isDefault && (
                          <Badge variant="outline" className="ml-4">
                            Default
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!card.isDefault && (
                          <Button variant="ghost" size="sm" onClick={() => handleSetDefaultCard(card.id)}>
                            Set Default
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveCard(card.id)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button className="w-full" variant="outline" onClick={handleAddCard}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

