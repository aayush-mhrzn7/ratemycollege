"use client";
import { env } from "@/lib/env";
import { ArrowDownLeft, ArrowDownRight, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";

export default function CustomDropzone() {
  const [files, setFiles] = useState<
    {
      id: string;
      uploading: boolean;
      progress: number;
      file: File;
      key?: string;
      isDeleting: boolean;
      error: boolean;
      objectUrl: string;
    }[]
  >([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFiles((prev) => [
        ...prev,
        ...acceptedFiles.map((file) => ({
          id: uuidv4(),
          uploading: false,
          file: file,
          key: "",
          progress: 0,
          isDeleting: false,
          error: false,
          objectUrl: URL.createObjectURL(file),
        })),
      ]);
    }
    acceptedFiles.forEach((file) => uploadFile(file));
  }, []);
  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      const tooManyFiles = fileRejections.find(
        (rejection) => rejection.errors[0].code == "too-many-files"
      );
      const fileSizeLarge = fileRejections.find(
        (rejection) => rejection.errors[0].code == "file-too-large"
      );
      if (tooManyFiles) {
        alert("too many files");
      }
      if (fileSizeLarge) {
        alert("large file size");
      }
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 6,
    accept: {
      "image/*": [],
    },
    maxSize: Number(env.NEXT_PUBLIC_MAX_FILE_SIZE) * 1024 * 1024,
  });
  const uploadFile = async (file: File) => {
    setFiles((prev) =>
      prev.map((file) => (file.file ? { ...file, uploading: true } : file))
    );
    try {
      const presignedURl = await fetch("/api/s3/upload", {
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
      if (!presignedURl.ok) {
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.file == file
              ? { ...f, uploading: false, progress: 0, error: true }
              : f
          )
        );
        return;
      }
      const { presignedUrl, key } = await presignedURl.json();
      console.log(presignedUrl, key);
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentage = (event.loaded / event.total) * 100;
            console.log(percentage, "percentage");
            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.file == file
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
          if (xhr.status == 200 || xhr.status == 204) {
            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.file == file
                  ? {
                      ...f,
                      uploading: false,
                      progress: 100,
                      error: false,
                    }
                  : f
              )
            );
            resolve();
          } else {
            reject(new Error("Status Failed"));
          }
        };
        xhr.onerror = () => {
          reject(new Error("Upload failed"));
        };

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.file == file
            ? { ...f, uploading: false, progress: 0, error: false }
            : f
        )
      );
    } catch (error) {
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.file == file
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
  const Removefile = async (fileId: string) => {
    const file = files.find((file) => file.id == fileId);
    if (file) {
      if (file.objectUrl) {
        URL.revokeObjectURL(file.objectUrl);
      }
      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.id == fileId ? { ...f, isDeleting: true } : f))
      );
      try {
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
          console.log("faio;ed");
          setFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.id == fileId ? { ...f, isDeleting: false, error: true } : f
            )
          );
        }
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.id == fileId ? { ...f, isDeleting: false, error: false } : f
          )
        );
        console.log("Sucessfuly deleted");
        setFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileId));
      } catch (error) {
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.id == fileId ? { ...f, isDeleting: false, error: true } : f
          )
        );
      }
    }
  };
  return (
    <>
      <div {...getRootProps()}>
        <input accept="image/*" multiple {...getInputProps()} />
        {isDragActive ? (
          <div className="h-[300px] relative w-full min-w-[300px] rounded-2xl border-border flex flex-col gap-6 justify-center items-center  border-2 border-dashed">
            <ArrowDownLeft className="absolute  size-10 top-1/3 animate-bounce right-1/3 text-primary" />
            <ArrowDownRight className="absolute size-10  top-1/3 left-1/3 animate-bounce text-primary" />
            <span className="font-black text-muted-foreground text-2xl">
              DROP'EM HERE
            </span>
          </div>
        ) : (
          <>
            <div className="h-[300px] cursor-pointer  min-w-[300px] rounded-2xl border-border flex flex-col gap-6 justify-center items-center  border-2 border-dashed">
              <Button size={"lg"} className="flex gap-2 items-center">
                <Upload />
                Upload
              </Button>
              <div className="flex flex-col text-center gap-2 ">
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
          </>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-7">
        {files.map((file) => (
          <div className="relative">
            <Image
              id={file.id}
              src={file.objectUrl}
              alt={file.id}
              height={200}
              width={200}
              className="object-cover w-full min-w-[200px] h-[200px] border-2 border-border rounded-xl"
            />
            <Button
              type="button"
              variant={"destructive"}
              className="absolute top-4 right-4"
              onClick={() => {
                Removefile(file.id);
              }}
            >
              <X />
            </Button>
            <span className="max-w-[200px] w-fit block  truncate">
              {file.file.name}
            </span>
            {file.uploading && (
              <div
                className="bg-green-400 h-2 block transition-all rounded-2xl"
                style={{ width: `${file.progress}%` }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
