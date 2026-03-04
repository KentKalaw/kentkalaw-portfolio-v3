import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel";
import Footer from "@/components/footer/footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AppWindowIcon, CodeIcon } from "lucide-react";
import { CodeBlock, CodeBlockCommand } from "@/components/ui/code-block";
import { ReactNode } from "react";

export interface PackageManagerCommands {
  pnpm: string;
  npm: string;
  bun: string;
  yarn: string;
}

export interface ComponentDocsProps {
  title: string;
  description: string;
  preview: ReactNode;
  previewHeight?: string;
  componentCode: string;
  componentFilename: string;
  componentLanguage?: string;
  usageCode: string;
  usageFilename?: string;
  cliCommands?: PackageManagerCommands;
  dependencies: PackageManagerCommands;
  utilsFile?: string;
  additionalFiles?: Array<{
    title: string;
    code: string;
    filename: string;
    language?: string;
  }>;
}

export function ComponentDocs({
  title,
  description,
  preview,
  previewHeight = "400px",
  componentCode,
  componentFilename,
  componentLanguage = "tsx",
  usageCode,
  usageFilename = "example.tsx",
  cliCommands,
  dependencies,
  utilsFile,
  additionalFiles = [],
}: ComponentDocsProps) {
  return (
    <main className="animate-fade-in animate-delay-100 relative overflow-x-hidden pt-10 md:pt-11">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Panel>
          <PanelHeader>
            <div className="flex flex-col gap-2">
              <PanelTitle className="py-2 text-2xl tracking-[0.8em] uppercase">
                {title}
              </PanelTitle>
            </div>
          </PanelHeader>

          <PanelContent className="p-4">
            <p className="text-muted-foreground pb-4 text-sm">
              {description}
            </p>

            <Tabs defaultValue="preview" className="w-full">
              <TabsList>
                <TabsTrigger value="preview">
                  <AppWindowIcon />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code">
                  <CodeIcon />
                  Code
                </TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="mt-4">
                <div
                  className="bg-background flex items-center justify-center rounded-lg border"
                  style={{ height: previewHeight }}
                >
                  {preview}
                </div>
              </TabsContent>

              <TabsContent value="code" className="mt-4">
                <div className="overflow-y-auto" style={{ height: previewHeight }}>
                  <CodeBlock
                    code={componentCode}
                    language={componentLanguage}
                    showLineNumbers
                    filename={componentFilename}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-4">Installation</h3>
              <Tabs defaultValue={cliCommands ? "cli" : "manual"} className="w-full">
                <TabsList>
                  {cliCommands && <TabsTrigger value="cli">CLI</TabsTrigger>}
                  <TabsTrigger value="manual">Manual</TabsTrigger>
                </TabsList>

                {cliCommands && (
                  <TabsContent value="cli" className="mt-4 space-y-4">
                    <CodeBlockCommand commands={cliCommands} />
                  </TabsContent>
                )}

                <TabsContent value="manual" className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      1. Install dependencies
                    </h4>
                    <CodeBlockCommand commands={dependencies} />
                  </div>

                  {utilsFile && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        2. Add utils file (if you don&apos;t have it)
                      </h4>
                      <CodeBlock
                        code={utilsFile}
                        language="tsx"
                        filename="lib/utils.ts"
                        showLineNumbers
                      />
                    </div>
                  )}

                  {additionalFiles.map((file, index) => (
                    <div key={index}>
                      <h4 className="text-sm font-medium mb-2">
                        {utilsFile ? index + 3 : index + 2}. {file.title}
                      </h4>
                      <CodeBlock
                        code={file.code}
                        language={file.language || "tsx"}
                        filename={file.filename}
                        showLineNumbers
                      />
                    </div>
                  ))}

                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      {utilsFile
                        ? additionalFiles.length + 3
                        : additionalFiles.length + 2}
                      . Copy and paste the component code
                    </h4>
                    <div className="h-[400px] overflow-y-auto">
                      <CodeBlock
                        code={componentCode}
                        language={componentLanguage}
                        showLineNumbers
                        filename={componentFilename}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-4">Usage</h3>
                <CodeBlock
                  code={usageCode}
                  language="tsx"
                  filename={usageFilename}
                  showLineNumbers
                />
              </div>
            </div>
          </PanelContent>
        </Panel>
        <Footer />
      </div>
    </main>
  );
}
