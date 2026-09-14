import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import GoogleIcon from "@/components/auth/GoogleIcon";
import { Link } from "react-router-dom";
import { loginWithGoogle, registerWithEmail } from "@/api/firebaseAuth";
import { sendIdTokenToBackend } from "@/api/auth.api";
import { getFirebaseErrorMessage } from "@/lib/firebaseErrors";
import { toast } from "sonner";
import { setAccessToken } from "@/api/tokenStore";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const result = await registerWithEmail(data.email, data.password);
      const idToken = await result.user.getIdToken();
      const backendRes = await sendIdTokenToBackend(idToken, data.name);
      setAccessToken(backendRes.data.accessToken);
      toast.success("Account created!");
      // navigate to dashboard next
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error));
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await loginWithGoogle();
      const idToken = await result.user.getIdToken();
      const backendRes = await sendIdTokenToBackend(
        idToken,
        result.user.displayName ?? undefined,
      );
      setAccessToken(backendRes.data.accessToken);
      toast.success("Account created!");
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error));
    }
  };

  return (
    <AuthLayout
      heading="Your resume, tailored to every job you want."
      subheading="Start free with 3 optimization attempts."
    >
      <h2 className="font-heading text-2xl mb-6">Create an account</h2>

      <Button
        variant="outline"
        type="button"
        className="w-full mb-4 cursor-pointer"
        onClick={handleGoogleSignup}
      >
        <GoogleIcon />
        Continue with Google
      </Button>

      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" {...register("name")} />
          {errors.name && (
            <p className="text-destructive text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-destructive text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-destructive text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-primary underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
