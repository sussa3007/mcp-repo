import { User } from "@/types/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfileProps {
  userInfo: User;
}

export default function UserProfile({ userInfo }: UserProfileProps) {
  // Function to get the first letter of the name
  const getInitials = (name: string) => {
    return name?.charAt(0).toUpperCase() || "U";
  };

  // Format social type
  const getSocialTypeDisplay = (type: string) => {
    switch (type) {
      case "GOOGLE":
        return "Google Account";
      case "GITHUB":
        return "GitHub Account";
      case "EMAIL":
        return "Email";
      default:
        return type;
    }
  };

  return (
    <Card className="bg-zinc-800/50 border-zinc-700">
      <CardHeader>
        <CardTitle className="text-xl text-white">My Profile</CardTitle>
        <CardDescription className="text-zinc-400">
          View your account information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={userInfo.imageUrl} alt={userInfo.name} />
            <AvatarFallback className="bg-primary text-white text-lg">
              {getInitials(userInfo.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-medium text-white">{userInfo.name}</h3>
            <p className="text-sm text-zinc-400">{userInfo.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-400">Sign In Method</p>
            <p className="text-white">
              {getSocialTypeDisplay(userInfo.socialType)}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-400">Role</p>
            <p className="text-white">
              {userInfo.role === "ADMIN" ? "Administrator" : "Regular User"}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-400">Join Date</p>
            <p className="text-white">
              {new Date(userInfo.createdAt).toLocaleDateString("en-US")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
