import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Upload, Trash2, Download, Copy, Check } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/media")({
  component: AdminMedia,
});

function AdminMedia() {
  const qc = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadFolder, setUploadFolder] = useState("media");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const { data: files = [], isLoading } = useQuery({
    queryKey: ["admin", "media-files"],
    queryFn: async () => {
      const { data, error } = await supabase.storage.from("media").list("", { sortBy: { column: "created_at", order: "desc" } });
      if (error) throw error;
      return data ?? [];
    },
  });

  const uploadFile = useMutation({
    mutationFn: async () => {
      if (!selectedFile) throw new Error("No file selected");
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${uploadFolder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      return publicUrl;
    },
    onSuccess: () => {
      toast.success("File uploaded successfully");
      setSelectedFile(null);
      qc.invalidateQueries({ queryKey: ["admin", "media-files"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteFile = useMutation({
    mutationFn: async (path: string) => {
      const { error } = await supabase.storage.from("media").remove([path]);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("File deleted");
      qc.invalidateQueries({ queryKey: ["admin", "media-files"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success("URL copied to clipboard");
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const getPublicUrl = (path: string) => {
    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
    return publicUrl;
  };

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to="/admin">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to admin
        </Link>
      </Button>

      <header>
        <h1 className="text-2xl font-semibold">Media Library</h1>
        <p className="text-sm text-muted-foreground">Manage your media files</p>
      </header>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New File</CardTitle>
          <CardDescription>Upload images and other media files</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Folder</Label>
            <Input
              value={uploadFolder}
              onChange={(e) => setUploadFolder(e.target.value)}
              placeholder="media"
            />
          </div>
          <div className="space-y-2">
            <Label>File</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
          </div>
          <Button
            onClick={() => uploadFile.mutate()}
            disabled={!selectedFile || uploadFile.isPending}
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploadFile.isPending ? "Uploading..." : "Upload"}
          </Button>
        </CardContent>
      </Card>

      {/* Files Grid */}
      {isLoading ? (
        <p className="text-muted-foreground">Loading files...</p>
      ) : files.length === 0 ? (
        <p className="text-muted-foreground">No files yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {files.map((file: any) => {
            const publicUrl = getPublicUrl(file.name);
            const isImage = file.metadata?.mimetype?.startsWith("image/") || 
                           file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);

            return (
              <Card key={file.id} className="overflow-hidden">
                <div className="aspect-square bg-muted flex items-center justify-center relative">
                  {isImage ? (
                    <img
                      src={publicUrl}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <p className="text-xs text-muted-foreground break-all">{file.name}</p>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0"
                      onClick={() => copyToClipboard(publicUrl)}
                    >
                      {copiedUrl === publicUrl ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        if (confirm(`Delete "${file.name}"?`)) {
                          deleteFile.mutate(file.name);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="text-xs text-muted-foreground truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.metadata?.size / 1024).toFixed(1)} KB
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
