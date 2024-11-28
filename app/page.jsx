import { redirect } from 'next/navigation';

export default function Loot() {
  // home으로 바로 이동
  return redirect(`/home`);
}
