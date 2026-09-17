import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import GoogleIcon from "@/components/auth/GoogleIcon";
import { Link } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "@/api/firebaseAuth";
import { sendIdTokenToBackend } from "@/api/auth.api";
import { toast } from "sonner";
import { getFirebaseErrorMessage } from "@/lib/firebaseErrors";
import { useAppDispatch } from "@/app/hooks";
import { setCredentials } from "@/features/auth/authSlice";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await loginWithEmail(data.email, data.password);
      const idToken = await result.user.getIdToken();
      const backendRes = await sendIdTokenToBackend(idToken);

      dispatch(
        setCredentials({
          accessToken: backendRes.data.accessToken,
          user: {
            id: backendRes.data.user._id,
            email: backendRes.data.user.email,
            emailVerified: backendRes.data.user.emailVerified,
            name: backendRes.data.user.name,
            role: backendRes.data.user.role,
          },
        }),
      );
      toast.success("Welcome back!");
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      const idToken = await result.user.getIdToken();
      const backendRes = await sendIdTokenToBackend(
        idToken,
        result.user.displayName ?? undefined,
      );

      dispatch(
        setCredentials({
          accessToken: backendRes.data.accessToken,
          user: {
            id: backendRes.data.user._id,
            email: backendRes.data.user.email,
            emailVerified: backendRes.data.user.emailVerified,
            name: backendRes.data.user.name,
            role: backendRes.data.user.role,
          },
        }),
      );

      toast.success("Welcome back!");
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error));
    }
  };

  return (
    <AuthLayout
      heading="Turn one resume into the one that gets read."
      subheading="Built for ATS scoring, not just keyword stuffing."
    >
      <h2 className="font-heading text-2xl mb-6">Welcome back</h2>

      <Button
        variant="outline"
        type="button"
        className="w-full mb-4 cursor-pointer"
        onClick={handleGoogleLogin}
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

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="text-sm text-muted-foreground mt-4">
        New here?{" "}
        <Link to="/register" className="text-primary underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
