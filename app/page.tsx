import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Time Log</h1>
      <p>출퇴근 시간을 기록하고 관리하는 웹 애플리케이션</p>
      <Image src="/logo.svg" alt="logo" width={100} height={100}/>
    </div>
  );
}
