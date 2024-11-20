import { redirect } from "next/navigation";

export default function Main() {
  // home으로 바로 이동
  return redirect(`/home`);
}
