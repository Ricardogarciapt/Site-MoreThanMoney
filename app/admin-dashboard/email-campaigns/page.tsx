"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Send, UserCheck, Calendar } from "lucide-react"

export default function EmailCampaignsPage() {
  const [campaignName, setCampaignName] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [audience, setAudience] = useState("all")

  // Sample campaigns data
  const campaigns = [
    {
      id: 1,
      name: "Welcome Series",
      subject: "Welcome to MoreThanMoney!",
      sentDate: "2023-12-10",
      recipients: 145,
      opens: 89,
      clicks: 34,
    },
    {
      id: 2,
      name: "December Promotion",
      subject: "Special Year-End Offer Inside",
      sentDate: "2023-12-15",
      recipients: 521,
      opens: 356,
      clicks: 128,
    },
    {
      id: 3,
      name: "New Features Announcement",
      subject: "Check Out What's New!",
      sentDate: "2023-12-20",
      recipients: 498,
      opens: 312,
      clicks: 87,
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Campaign "${campaignName}" created! Ready to be scheduled or sent.`)
    // Reset form
    setCampaignName("")
    setSubject("")
    setContent("")
    setAudience("all")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Email Campaigns</h1>
        <Button>
          <Send className="mr-2 h-4 w-4" />
          Send Test Email
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create New Campaign</CardTitle>
            <CardDescription>Design your email campaign and select your audience</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="campaign-name">Campaign Name</label>
                <Input
                  id="campaign-name"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., January Newsletter"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject">Email Subject</label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject line"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="audience">Target Audience</label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subscribers</SelectItem>
                    <SelectItem value="active">Active Members</SelectItem>
                    <SelectItem value="inactive">Inactive Members</SelectItem>
                    <SelectItem value="premium">Premium Members</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="content">Email Content</label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your email content here..."
                  className="min-h-[200px]"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="schedule" />
                <label htmlFor="schedule">Schedule for later</label>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Create Campaign
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Statistics</CardTitle>
            <CardDescription>View performance of your previous campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <UserCheck className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                <h3 className="text-2xl font-bold">1,164</h3>
                <p className="text-sm text-gray-500">Total Subscribers</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Mail className="h-6 w-6 mx-auto text-green-600 mb-2" />
                <h3 className="text-2xl font-bold">68%</h3>
                <p className="text-sm text-gray-500">Avg. Open Rate</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <Calendar className="h-6 w-6 mx-auto text-purple-600 mb-2" />
                <h3 className="text-2xl font-bold">3</h3>
                <p className="text-sm text-gray-500">Active Campaigns</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead className="hidden md:table-cell">Sent Date</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Opens</TableHead>
                    <TableHead>Clicks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{campaign.name}</p>
                          <p className="text-sm text-gray-500 hidden md:block">{campaign.subject}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{campaign.sentDate}</TableCell>
                      <TableCell>{campaign.recipients}</TableCell>
                      <TableCell>
                        {campaign.opens}
                        <span className="text-sm text-gray-500 ml-1">
                          ({Math.round((campaign.opens / campaign.recipients) * 100)}%)
                        </span>
                      </TableCell>
                      <TableCell>
                        {campaign.clicks}
                        <span className="text-sm text-gray-500 ml-1">
                          ({Math.round((campaign.clicks / campaign.recipients) * 100)}%)
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
