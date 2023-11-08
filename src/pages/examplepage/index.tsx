import Link from "next/link";

export default function Example() {
  return (
    <div className="flex h-96 flex-col items-center justify-center border-2 border-solid border-slate-950">
      <p>example-page for dev</p>
      <Link href="/">Home</Link>
    </div>
  );
}
