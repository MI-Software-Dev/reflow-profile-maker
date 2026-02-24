"use client";
import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { kitReflowNumberStore } from "./store";
import { SearchField, Table } from "@/client/components/molecules";
import { TableColumn } from "@/client/components/molecules/Table/type";
import { KitReflow } from "./schema";
import { PageContent } from "@/client/components/templates";

const Page: FC = observer(() => {
  const { kitReflows, onSearch } = kitReflowNumberStore;
  const columns: TableColumn<KitReflow>[] = [
    {
      header: "Kit name",
      key: "kitName",
      sortable: true,
      render: (val) => {
        return val;
      },
    },
    {
      header: "Reflow number",
      key: "reflowNumber",
      render: (val) => {
        return val;
      },
    },
  ];
  useEffect(() => {
    kitReflowNumberStore.init();
  }, []);
  return (
    <PageContent>
      <div className="flex flex-col gap-2 p-4">
        <SearchField
          size="md"
          placeholder="Seach kit names..."
          onSearch={onSearch}
        />
        <Table data={kitReflows} columns={columns} />
      </div>
    </PageContent>
  );
});
export default Page;
