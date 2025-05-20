"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { fundWallet } from "@/app/actions/auth-actions"

const fundSchema = z.object({
  amount: z.coerce.number().positive({
    message: "Amount must be greater than 0",
  }),
})

type FundFormValues = z.infer<typeof fundSchema>

export function WalletFundForm({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<FundFormValues>({
    resolver: zodResolver(fundSchema),
    defaultValues: {
      amount: 100,
    },
  })

  async function onSubmit(data: FundFormValues) {
    setIsLoading(true)
    try {
      const result = await fundWallet(userId, data.amount)

      toast({
        title: "Wallet funded",
        description: `Successfully added ${data.amount} USDC to your wallet. New balance: ${result.newBalance} USDC`,
      })

      // Reset form
      form.reset({ amount: 100 })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Funding failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (USDC)</FormLabel>
              <FormControl>
                <Input type="number" min="1" step="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-sm">
          <p className="font-medium text-primary">In a real application:</p>
          <p className="text-muted-foreground mt-1">
            This would connect to a payment processor or crypto wallet to transfer actual funds. For this demo, we're
            simulating the funding process.
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Fund Wallet"
          )}
        </Button>
      </form>
    </Form>
  )
}
