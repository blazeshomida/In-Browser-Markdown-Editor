import { cookies } from "next/dist/client/components/headers";
import MainContent from "@/components/MainContent";
import SidebarNav from "@/components/SidebarNav";

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
