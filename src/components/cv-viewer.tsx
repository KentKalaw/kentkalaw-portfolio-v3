import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

export interface CVViewerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CVViewerDialog = ({ open, onOpenChange }: CVViewerDialogProps) => {
  const cvPath = "/Kent-Francis-Kalaw-Resume.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = cvPath;
    link.download = "Kent-Francis-Kalaw-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="cv-preview-description" className="flex h-[95vh] w-full max-w-[95vw] flex-col p-0 md:h-[90vh] md:max-w-4xl [&>button]:hidden">
        <DialogHeader className="border-border shrink-0 border-b px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="text-sm font-semibold md:text-lg">
              My Resume
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="rounded-full bg-transparent"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-hidden">
          <iframe
            src={cvPath}
            className="h-full w-full border-0"
            title="CV Preview"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
