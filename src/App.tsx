import { FileIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import ButtonIcon from "./components/button-icon";
import Button from "./components/button";

export default function App() {
 
  return (
    <main className="p-5 flex flex-col items-center gap-6 w-full">
      <div className="space-y-3 flex flex-col w-full">
        <Button>Label</Button>
        <Button disabled>Label</Button>
        <Button variant="outline" className="">
          <FileIcon size={18} /> Abrir comprovante
        </Button>
      </div>
      <div className="space-y-3 flex flex-col w-full">
        <ButtonIcon icon={MagnifyingGlassIcon} />
        <ButtonIcon disabled icon={MagnifyingGlassIcon} />
      </div>
    </main>
  )
}