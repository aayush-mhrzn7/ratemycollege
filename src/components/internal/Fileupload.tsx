"use client";
import { env } from "@/lib/env";
import { ArrowDownLeft, ArrowDownRight, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { ControllerRenderProps } from "react-hook-form";
import { cn } from "@/lib/utils";

interface CustomDropZoneInterface {
  id: string;
  value: string[];
  onChange: ControllerRenderProps["onChange"];
  isMulti: boolean;
  className?: string;
  error?: boolean;
}

interface FileType {
  id: string;
  uploading: boolean;
  progress: number;
  file: File;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl: string;
}

export default function CustomDropzone({
  id,
  value,
  isMulti,
  error,
  className,
  onChange,
}: CustomDropZoneInterface) {
  const [files, setFiles] = useState<FileType[]>([]);

  // ✅ FIX 3: Load existing files from value prop on mount
  useEffect(() => {
    if (value && value.length > 0) {
      const existingFiles = value.map((key) => ({
        id: uuidv4(),
        uploading: false,
        progress: 100,
        file: null as any, // Existing files don't have File object
        key: key,
        isDeleting: false,
        error: false,
        // Construct S3 URL from key
        objectUrl: `https://.s3.$.amazonaws.com/${key}`,
      }));
      setFiles(existingFiles);
    }
  }, []); // Only run on mount

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      if (!isMulti && files.length > 0) {
        const oldFile = files[0];
        if (oldFile.key) {
          deleteFromS3(oldFile.key);
        }
        setFiles([]);
      }

      // Add new files to state
      setFiles((prev) => {
        const newFiles = acceptedFiles.map((file) => ({
          id: uuidv4(),
          uploading: false,
          file: file,
          key: "",
          progress: 0,
          isDeleting: false,
          error: false,
          objectUrl: URL.createObjectURL(file),
        }));

        // If not multi, replace; if multi, append
        return isMulti ? [...prev, ...newFiles] : newFiles;
      });

      // Start uploading
      acceptedFiles.forEach((file) => uploadFile(file));
    },
    [files, isMulti]
  );

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      const tooManyFiles = fileRejections.find(
        (rejection) => rejection.errors[0].code === "too-many-files"
      );
      const fileSizeLarge = fileRejections.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
      );
      if (tooManyFiles) {
        alert("Too many files. Maximum 6 files allowed.");
      }
      if (fileSizeLarge) {
        alert(
          `File size too large. Maximum ${env.NEXT_PUBLIC_MAX_FILE_SIZE}MB allowed.`
        );
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: isMulti ? 6 : 1,
    accept: {
      "image/*": [],
    },
    multiple: isMulti,
    maxSize: Number(env.NEXT_PUBLIC_MAX_FILE_SIZE) * 1024 * 1024,
  });

  const uploadFile = async (file: File) => {
    // Mark file as uploading
    setFiles((prev) =>
      prev.map((f) => (f.file === file ? { ...f, uploading: true } : f))
    );

    try {
      // Get presigned URL
      const presignedUrlResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          fileSize: file.size,
          contentType: file.type,
        }),
      });

      if (!presignedUrlResponse.ok) {
        throw new Error("Failed to get presigned URL");
      }

      const { presignedUrl, key } = await presignedUrlResponse.json();

      // Upload to S3 with progress tracking
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentage = (event.loaded / event.total) * 100;
            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.file === file
                  ? {
                      ...f,
                      progress: Math.round(percentage),
                      key: key,
                    }
                  : f
              )
            );
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFiles((prevFiles) => {
              const updatedFiles = prevFiles.map((f) =>
                f.file === file
                  ? {
                      ...f,
                      uploading: false,
                      progress: 100,
                      error: false,
                      key: key,
                    }
                  : f
              );

              // Notify form of updated keys
              const uploadedKeys = updatedFiles
                .filter((f) => f.key && !f.uploading && !f.error)
                .map((f) => f.key!);

              onChange(isMulti ? uploadedKeys : uploadedKeys[0] || "");

              return updatedFiles;
            });
            resolve();
          } else {
            reject(new Error("Upload failed"));
          }
        };

        xhr.onerror = () => {
          reject(new Error("Upload failed"));
        };

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch (error) {
      console.error("Upload error:", error);
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.file === file
            ? {
                ...f,
                uploading: false,
                error: true,
                progress: 0,
              }
            : f
        )
      );
    }
  };

  // Helper function to delete from S3
  const deleteFromS3 = async (key: string) => {
    try {
      await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ key }),
      });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const Removefile = async (fileId: string) => {
    const file = files.find((f) => f.id === fileId);
    if (!file) return;

    // Revoke object URL to free memory
    if (file.objectUrl && file.objectUrl.startsWith("blob:")) {
      URL.revokeObjectURL(file.objectUrl);
    }

    // Mark as deleting
    setFiles((prevFiles) =>
      prevFiles.map((f) => (f.id === fileId ? { ...f, isDeleting: true } : f))
    );

    try {
      // Delete from S3 if it has a key
      if (file.key) {
        const delRes = await fetch("/api/s3/delete", {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            key: file.key,
          }),
        });

        if (!delRes.ok) {
          throw new Error("Delete failed");
        }
      }

      // Remove file and update form
      setFiles((prevFiles) => {
        const updatedFiles = prevFiles.filter((f) => f.id !== fileId);
        const uploadedKeys = updatedFiles
          .filter((f) => f.key && !f.uploading && !f.error)
          .map((f) => f.key!);

        onChange(isMulti ? uploadedKeys : uploadedKeys[0] || "");

        return updatedFiles;
      });
    } catch (error) {
      console.error("Remove file error:", error);
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === fileId ? { ...f, isDeleting: false, error: true } : f
        )
      );
    }
  };

  return (
    <>
      <div {...getRootProps()} className={cn(className)}>
        <input
          accept="image/*"
          multiple={isMulti}
          {...getInputProps()}
          id={id}
        />
        {isDragActive ? (
          <div className="h-[300px] relative w-full min-w-[300px] rounded-2xl border-border flex flex-col gap-6 justify-center items-center border-2 border-dashed">
            <ArrowDownLeft className="absolute size-10 top-1/3 animate-bounce right-1/3 text-primary" />
            <ArrowDownRight className="absolute size-10 top-1/3 left-1/3 animate-bounce text-primary" />
            <span className="font-black text-muted-foreground text-2xl">
              DROP'EM HERE
            </span>
          </div>
        ) : (
          <div className="h-[300px] cursor-pointer min-w-[300px] rounded-2xl border-border flex flex-col gap-6 justify-center items-center border-2 border-dashed">
            <Button
              size={"lg"}
              className="flex gap-2 items-center"
              type="button"
              variant={error ? "destructive" : "default"}
            >
              <Upload />
              Upload
            </Button>
            <div className="flex flex-col text-center gap-2">
              <p>Choose Images or Drag and Drop it here.</p>
              <span>
                JPG, JPEG, PNG and WEBP
                <span className="font-black">
                  {" "}
                  MAX SIZE {env.NEXT_PUBLIC_MAX_FILE_SIZE}MB
                </span>
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-7">
        {files.map((file) => (
          <div key={file.id} className="relative">
            <Image
              src={file.objectUrl}
              alt={file.key || file.id}
              height={200}
              width={200}
              className="object-cover w-full min-w-[200px] h-[200px] border-2 border-border rounded-xl"
            />
            <Button
              type="button"
              variant={"destructive"}
              className="absolute top-4 right-4"
              onClick={() => Removefile(file.id)}
              disabled={file.isDeleting}
            >
              {file.isDeleting ? "..." : <X />}
            </Button>
            <span className="max-w-[200px] w-fit block truncate">
              {file.file?.name || "Existing image"}
            </span>

            {/* Show progress bar while uploading */}
            {file.uploading && (
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-400 h-2 block transition-all rounded-full"
                  style={{ width: `${file.progress}%` }}
                />
              </div>
            )}

            {/* Show error state */}
            {file.error && (
              <div className="text-red-500 text-sm mt-1">Upload failed</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
