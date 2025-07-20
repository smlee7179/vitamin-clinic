"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("admin-auth");
    router.replace("/admin/login");
  }, [router]);
  return null;
} 