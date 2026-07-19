import { Suspense } from "react";
import LoginPage from "./LoginPage";

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}