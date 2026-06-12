import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { isAuthenticated, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ready) return;
    navigate({ to: isAuthenticated ? "/dashboard" : "/login" });
  }, [ready, isAuthenticated, navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-cream">
      <div className="h-8 w-8 animate-pulse rounded-full bg-gradient-teal" />
    </div>
  );
}
