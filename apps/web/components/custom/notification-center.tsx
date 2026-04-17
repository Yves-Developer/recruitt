"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  IconBell, 
  IconMail, 
  IconTrash, 
  IconSend, 
  IconCircleCheck, 
  IconLoader2 
} from "@tabler/icons-react"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface NotificationCenterProps {
  jobId: string;
  onSent?: () => void;
}

export function NotificationCenter({ jobId, onSent }: NotificationCenterProps) {
  const [notifications, setNotifications] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSending, setIsSending] = React.useState(false)

  const fetchNotifications = React.useCallback(async () => {
    if (!jobId) return
    setIsLoading(true)
    try {
      const data = await api.getStagedNotifications(jobId)
      setNotifications(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [jobId])

  // Fetch initial count and listen for staging events
  React.useEffect(() => {
    fetchNotifications();

    const handleStaged = () => fetchNotifications();
    window.addEventListener("notification-staged", handleStaged);
    return () => window.removeEventListener("notification-staged", handleStaged);
  }, [fetchNotifications]);

  const handleDelete = async (id: string) => {
    try {
      await api.deleteNotification(id)
      setNotifications(prev => prev.filter(n => n._id !== id))
      toast.success("Draft removed")
    } catch (error) {
      toast.error("Failed to delete draft")
    }
  }

  const handleSendAll = async () => {
    if (notifications.length === 0) return
    setIsSending(true)
    try {
      const result = await api.sendAllStaged(jobId)
      toast.success(`Success! ${result.sent} emails delivered.`)
      setNotifications([])
      if (onSent) onSent()
    } catch (error) {
      toast.error("Failed to blast notifications")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Sheet onOpenChange={(open) => open && fetchNotifications()}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative gap-2 border-primary/20 hover:bg-primary/5">
          <IconBell size={18} className="text-primary" />
          <span className="hidden sm:inline">Notification Queue</span>
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
              {notifications.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[450px] flex flex-col p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="flex items-center gap-2">
            <IconBell className="text-primary" /> Pending Notifications
          </SheetTitle>
          <SheetDescription>
            Review and send automated status updates to evaluated candidates.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <div className="flex h-full items-center justify-center p-8 text-muted-foreground animate-pulse">
              <IconLoader2 className="mr-2 animate-spin" /> Fetching staged drafts...
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center text-muted-foreground">
              <div className="p-4 rounded-full bg-muted mb-4 opacity-50">
                <IconMail size={40} />
              </div>
              <p className="font-medium">No pending emails</p>
              <p className="text-sm">Change candidate status to "Shortlist" or "Reject" to stage notifications here.</p>
            </div>
          ) : (
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {notifications.map((note) => (
                  <div key={note._id} className="group p-4 rounded-xl border bg-card hover:border-primary/50 transition-all space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-sm font-bold">{note.recipientName}</p>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-[10px] uppercase tracking-wider",
                            note.type === "shortlist" ? "text-green-500 border-green-500/30 bg-green-500/5" : "text-amber-500 border-amber-500/30 bg-amber-500/5"
                          )}
                        >
                          {note.type} Draft
                        </Badge>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(note._id)}
                      >
                        <IconTrash size={16} />
                      </Button>
                    </div>
                    
                    <div className="text-xs text-muted-foreground border-t pt-2 max-h-24 overflow-hidden mask-fade-bottom">
                      <p className="font-semibold text-foreground mb-1">{note.subject}</p>
                      <div dangerouslySetInnerHTML={{ __html: note.content.replace(/<style>[\s\S]*?<\/style>/, '') }} />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        <SheetFooter className="p-6 border-t bg-muted/30">
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <span>Delivery Status</span>
              <span className="text-muted-foreground">{notifications.length} ready to blast</span>
            </div>
            <Button 
              className="w-full h-12 gap-2 text-base font-bold" 
              disabled={notifications.length === 0 || isSending}
              onClick={handleSendAll}
            >
              {isSending ? (
                <> <IconLoader2 className="animate-spin" /> Processing Matrix... </>
              ) : (
                <> <IconSend size={18} /> Send All Staged Notifications </>
              )}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
