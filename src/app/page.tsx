"use client";

import { Button } from "react-aria-components";
import SidebarNav from "../components/SidebarNav";
import { useMenuOpen } from "@/hooks/useAppStore";
import SplitPane from "@/components/SplitPane";

export default function App() {
  return (
    <div>
      <SidebarNav />
      <SplitPane range={10} defaultSplit={50} minSizeLeft={30} maxSizeLeft={70}>
        <div className="h-full p-6">
          <h1>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
            maiores, ullam consequatur culpa inventore delectus nobis earum
            architecto quaerat, eum odit, necessitatibus nam hic ut eveniet
            suscipit? Inventore, expedita quo? Magnam veniam, natus sunt maiores
            sapiente impedit delectus amet consequatur exercitationem nesciunt
            inventore soluta vitae quisquam libero quas vel fugit ratione,
            similique recusandae. Totam quae, nihil blanditiis cumque vel fugit?
            Cupiditate reprehenderit voluptatibus eius nesciunt, quasi iusto
            officiis rem voluptas tempora, ab consectetur saepe optio suscipit
            deleniti alias, accusantium dolorem maxime dolor! Corrupti in cumque
            quasi exercitationem illum numquam aspernatur? Rerum dicta vero nisi
            tempora adipisci eos, soluta fuga ab, ipsam atque molestias vel
            repellat nihil ipsa error incidunt, nostrum provident nulla veniam
            unde ipsum rem consequatur! Vitae, facilis repellat? Aliquid nobis
            hic eum reprehenderit exercitationem nesciunt modi odio aperiam.
            Fugiat minima quaerat cupiditate aspernatur animi, consectetur est
            corrupti ipsam laudantium iste dicta a veritatis incidunt laborum
            nobis provident expedita.
          </h1>
        </div>
        <div className="h-full p-6">
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A deleniti
            consequatur corporis ipsa consequuntur nemo dicta nobis eaque?
            Corrupti at fuga omnis debitis in! Aliquid fugiat temporibus officia
            rem. Omnis! Cupiditate autem iste placeat modi praesentium
            blanditiis fugiat magnam similique odit ipsam quo quibusdam
            voluptatem minima incidunt maiores veniam corrupti quae,
            consequuntur rem et facilis accusantium aperiam ratione iure!
            Blanditiis. Explicabo quasi maiores facere quisquam corrupti
            aliquid, recusandae reprehenderit. Id velit cumque fugit aperiam
            dicta sapiente voluptates vero fuga ea quisquam, cupiditate, qui,
            nulla quod natus tempora hic deserunt reprehenderit. Dolore aliquam
            nobis facilis praesentium sed nemo. Suscipit vitae fuga delectus
            quia dolorem at nesciunt. Doloremque nemo optio soluta, maxime
            dolorum repellendus accusamus. Praesentium, amet nobis perspiciatis
            nemo vitae dolor. Maiores culpa architecto eveniet placeat porro!
            Maxime veritatis ut nihil consectetur corrupti inventore dolore
            quasi ratione iste magnam. Dolor eligendi velit sunt alias ipsam,
            quia temporibus ut minus incidunt id?
          </h1>
        </div>
      </SplitPane>
    </div>
  );
}
