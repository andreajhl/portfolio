import { useEffect } from "react";
import { useRouter } from "next/router";

type RedirectProps = {
  to: string | {};
  push?: boolean;
};

function Redirect({ to, push = false }: RedirectProps) {
  const router = useRouter();
  const method = push ? router.push : router.replace;

  useEffect(() => {
    if (!to) throw new TypeError("The argument 'to' is required");
    method(to);
  }, [method, to]);

  return null;
}

export { Redirect };
