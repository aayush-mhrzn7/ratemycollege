import { S3 } from "@/lib/s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { error } from "console";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const key = body.key;
    if (!key) {
      return NextResponse.json({ error: "no key" }, { status: 400 });
    }
    const cmd = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    });
    await S3.send(cmd);
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {}
}
