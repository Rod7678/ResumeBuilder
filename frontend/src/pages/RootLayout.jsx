import { Outlet } from "react-router";
import Header from "../components/Headers/Header.jsx";
import { useQuery } from "@tanstack/react-query";

export default function RootLayout() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["latestResume"],
    queryFn: fetchLatestResume
  });
  return (
    <>
      <Header resume={data}/>
      <Outlet />
    </>
  );
}
