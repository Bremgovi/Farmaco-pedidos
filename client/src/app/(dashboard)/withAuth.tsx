// hoc/withAuth.tsx
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/redux";

export function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const userToken = useAppSelector((state) => state.global.userToken);
    const userInfo = useAppSelector((state) => state.global.userInfo);
    console.log("Token: " + userToken);
    console.log("Data: " + JSON.stringify(userInfo));
    if (!userToken) {
      router.push("/login");
    }

    return <Component {...props} />;
  };
}
