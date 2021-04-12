import PageContainer from "desktop-app/components/layouts/page-container";
import {
  Sidebar,
  SidebarWrapper,
  MainContent
} from "desktop-app/components/sidebar-wrapper";
import { useState } from "react";
import styles from "./styles.module.scss";

type SearchPageProps = {};

function SearchPage({ ...props }: SearchPageProps) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  function toggleSidebar() {
    setSidebarIsOpen((isOpen) => !isOpen);
  }

  return (
    <PageContainer>
      <SidebarWrapper isOpen={sidebarIsOpen}>
        <Sidebar width={358}>
          <h2>Filtrar por</h2>
        </Sidebar>
        <MainContent>
          <div className="container">
            <h2>Hello Content</h2>
            <button type="button" onClick={toggleSidebar}>
              Toggle
            </button>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
              magni minima natus illo quidem, illum a quasi molestias
              repudiandae accusamus, maiores, blanditiis quia necessitatibus rem
              omnis recusandae? Eos, nesciunt vel reprehenderit doloremque quo
              nulla et cum repellendus possimus ratione voluptas harum deleniti
              eveniet quis voluptate, aperiam pariatur aut inventore cupiditate,
              sequi recusandae. Esse repudiandae doloribus obcaecati harum
              laborum quibusdam magni optio ullam neque quidem totam saepe
              nostrum mollitia qui quis voluptatum deserunt doloremque nobis
              consectetur exercitationem dolorum vitae ipsa, aliquid velit.
              Omnis pariatur quam ut modi, reprehenderit deleniti? Est pariatur
              a dolores laudantium exercitationem vel sunt architecto ut ipsum
              maiores modi temporibus optio consequatur totam voluptate quod,
              eos asperiores tempora! Mollitia molestiae animi rem unde adipisci
              alias, dolores quod harum, dolore accusantium, voluptates ratione
              expedita aliquid. Illo doloremque accusantium eveniet libero,
              repellat debitis ea, praesentium ducimus quasi nesciunt eum est?
              Esse corporis pariatur aliquam qui alias obcaecati, repudiandae
              libero ullam minus consequatur nulla, dolor dolore dicta sit
              tempore quos voluptate numquam soluta tempora id. Dolore,
              dignissimos amet? Possimus facilis itaque voluptatibus eum maiores
              aperiam totam ab veritatis illum cupiditate culpa est mollitia,
              odio laborum enim. Dolor odio vitae, vero quod totam, aut, qui
              adipisci illo consectetur molestias earum delectus tenetur
              distinctio excepturi? Esse, inventore quasi? Delectus dicta rem,
              culpa, similique velit placeat sed voluptates amet voluptatum,
              aliquam earum maxime sint saepe consectetur ratione vel error
              temporibus a quis! Dolore temporibus cupiditate nulla unde
              assumenda perspiciatis, blanditiis animi totam libero sit ad est
              explicabo repellat doloremque sed alias. Eligendi nemo incidunt
              nihil quam necessitatibus voluptates accusamus, hic labore
              reprehenderit dicta repudiandae at quae commodi alias, ex odio
              inventore nostrum recusandae optio? Recusandae consectetur
              officiis aperiam odit saepe vel dolore ratione veritatis, ab
              inventore porro dolorem temporibus voluptate unde tempore, quod
              similique sint, ducimus quae cumque voluptates enim eum!
              Cupiditate reiciendis dolorum tenetur quas veniam obcaecati illo,
              quo, eaque sed officia vel. Ut officia commodi pariatur nihil
              beatae animi dolorum similique natus nam. Explicabo soluta
              dignissimos voluptas aliquam amet repellat quis quam natus eius.
              Iste similique, quia sapiente, a molestiae harum unde dolores
              magnam laborum neque culpa autem ullam quisquam eligendi
              recusandae! Reiciendis numquam enim cumque fugit modi,
              reprehenderit adipisci rem fuga? Repellendus, qui, libero
              voluptas, omnis voluptatem necessitatibus non vero nam porro
              incidunt est nostrum ratione nobis! Sequi voluptatibus accusamus
              quo quidem enim perferendis molestiae ullam nesciunt aliquid
              veniam deserunt nostrum molestias fuga est eveniet facere, id,
              harum tempora. Veniam, repudiandae?
            </p>
          </div>
        </MainContent>
      </SidebarWrapper>
    </PageContainer>
  );
}

export { SearchPage };
