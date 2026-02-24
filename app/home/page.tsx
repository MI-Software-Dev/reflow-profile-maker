"use client";

import { FC, useEffect } from "react";
import { Measureboard, ProductionInformation } from "./layouts";
import { observer } from "mobx-react";
import { homeStore } from "./store";

const Page: FC = observer(() => {
  useEffect(() => {
    homeStore.init();
  }, []);
  return (
    <div className="bg-base-100 min-h-screen pt-16">
      <div className="drawer lg:drawer-open size-full">
        <input
          id="my-drawer-1"
          type="checkbox"
          className="drawer-toggle hidden"
        />
        <div className="drawer-content">
          <Measureboard />
        </div>
        <div className="drawer-side lg:z-0 lg:h-[calc(100vh-4rem)]">
          <label
            htmlFor="my-drawer-1"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="bg-base-100 flex h-full overflow-y-auto">
            <ProductionInformation />
          </div>
        </div>
      </div>
    </div>
  );
});
export default Page;
