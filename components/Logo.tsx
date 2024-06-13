import { logo } from "@/config";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logo-text.png"
        alt="Logo"
        width={400}
        height={100}
        layout="fixed"
        quality={100}
        className="w-48"
      />
    </Link>
  );
}
