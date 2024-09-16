'use client';

import * as React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FC, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "reactfire";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

interface SignUpFormProps {
  onShowLogin: () => void;
  onSignUp?: () => void;
}

export const SignUpForm: FC<SignUpFormProps> = ({ onShowLogin, onSignUp }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const auth = useAuth();

  const signup = async ({ email, password }: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user?.user.uid && user.user.email) {
        const db = getFirestore();

        await setDoc(doc(db, "users", user.user.uid), {
          email: user.user.email,
          createdAt: new Date(),
          paid: false,
        });

        console.log("User added to Firestore database");
        toast({ title: "Account created!" });
        onSignUp?.();
      }
    } catch (err: any) {
      if ("code" in err && err.code.includes("already")) {
        toast({ title: "User already exists" });
      } else {
        toast({ title: "Error signing up", description: `${err}` });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signup)} className="space-y-6">
          <fieldset disabled={isLoading} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} className="w-full" />
                  </FormControl>
                  <FormDescription className="text-sm">
                    A valid email is required.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="w-full" />
                  </FormControl>
                  <FormDescription className="text-sm">
                    Must be at least 8 characters long.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </fieldset>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm">
          Already joined?{" "}
          <Button variant="link" onClick={onShowLogin} className="p-0">
            Sign in instead.
          </Button>
        </p>
      </div>
    </div>
  );
};
