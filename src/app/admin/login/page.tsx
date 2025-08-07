
"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Github } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      sessionStorage.setItem("isAdmin", "true");
      router.push("/admin/dashboard");
      toast({
        title: "Success!",
        description: "You have been logged in.",
      });
    } catch (error) {
      console.error("Error during Google login:", error);
      toast({
        title: "Error",
        description: "Failed to login with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
          <CardDescription>Sign in to manage your portfolio.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGoogleLogin} className="w-full">
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-72.2 68.7C297.6 116.2 274.2 104 248 104c-73.8 0-134.3 60.3-134.3 134.3s60.5 134.3 134.3 134.3c84.3 0 115.7-60.2 120.7-91.8H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
