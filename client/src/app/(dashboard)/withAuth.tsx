import { useRouter } from "next/navigation";

export function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const userToken = localStorage.getItem("userToken");
    console.log(userToken);
    if (!userToken) {
      router.push("/login");
    }

    return <Component {...props} />;
  };
}
