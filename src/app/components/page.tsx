import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel";

export default function Components() {
  return (
    <main className="animate-fade-in animate-delay-100 relative overflow-x-hidden pt-10 md:pt-11">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Panel>
          <PanelHeader>
            <div className="flex items-center justify-between">
              <PanelTitle className="py-2 text-2xl tracking-[0.8em] uppercase">
                Components
              </PanelTitle>
            </div>
          </PanelHeader>
          <PanelContent className="p-0">
            <div className="p-4">
              <p className="text-sm">todo: components page</p>
            </div>
          </PanelContent>
        </Panel>
      </div>
    </main>
  );
}
