"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Button() {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => {
          router.push("/create");
        }}
      >
        이동
      </button>
    </>
  );
}
