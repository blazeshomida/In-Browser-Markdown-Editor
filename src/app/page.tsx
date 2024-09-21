import { cookies } from "next/dist/client/components/headers";
import SidebarNav from "../components/SidebarNav";
import MainContent from "@/components/MainContent";

export default function App() {
  const layout = cookies().get("react-resizable-panels:layout");
  let defaultLayout;
  if (layout) {
    defaultLayout = JSON.parse(layout.value);
  }
  return (
    <>
      <SidebarNav />
      <MainContent defaultLayout={defaultLayout} />
    </>
  );
}
