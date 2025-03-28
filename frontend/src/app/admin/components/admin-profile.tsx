import { User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"

export default function AdminProfile() {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="/admin-avatar.png" alt="Admin" />
        <AvatarFallback>
          <User className="h-6 w-6" />
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">ADMIN</p>
        <p className="text-xs text-muted-foreground"></p>
      </div>
    </div>
  )
}