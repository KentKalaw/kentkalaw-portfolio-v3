import Link from "next/link";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel";
import Footer from "@/components/footer/footer";
import { uiComponents, customComponents } from "@/lib/component-data";

export default function Components() {
  return (
    <main className="animate-fade-in animate-delay-100 relative overflow-x-hidden pt-10 md:pt-11">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Panel>
          <PanelHeader>
            <div className="flex flex-col gap-2">
              <PanelTitle className="py-2 text-2xl tracking-[0.8em] uppercase">
                Components
              </PanelTitle>
            </div>
          </PanelHeader>
          <PanelContent className="p-4">
             <p className="text-sm text-muted-foreground pb-2">
                All custom-built UI components used across the portfolio, along with their documentation and usage guidelines.
              </p>
            <div className="space-y-8">
              <div>
                
                <h2 className="mb-4 text-lg text-muted-foreground font-semibold">UI</h2>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {uiComponents.map((component) => (
                    <Link
                      key={component.name}
                      href={component.href}
                      className="group flex items-center px-3 py-2 text-sm font-medium"
                    >
                      <span className="group-hover:underline">{component.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="mb-4 text-lg text-muted-foreground font-semibold">Components</h2>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {customComponents.map((component) => (
                    <Link
                      key={component.name}
                      href={component.href}
                      className="group flex items-center px-3 py-2 text-sm font-medium"
                    >
                      <span className="group-hover:underline">{component.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </PanelContent>
        </Panel>
        <Footer/>
      </div>
    </main>
  );
}
