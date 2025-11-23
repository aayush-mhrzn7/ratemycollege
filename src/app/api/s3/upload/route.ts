import { error } from "console";
import { NextResponse } from "next/server";
import z from "zod";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/s3Client";
const s3Schema = z.object({
  fileName: z.string(),
  contentType: z.string(),
  fileSize: z.number(),
});
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = s3Schema.safeParse(body);
    if (validation.error) {
      return NextResponse.json(
        { error: "All Fields are required" },
        { status: 400 }
      );
    }
    const { contentType, fileName, fileSize } = validation.data;
    const uniqueIdentifier = `${uuidv4()}-${fileName}`;
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: uniqueIdentifier,
      ContentType: contentType,
      ContentLength: fileSize,
    });
    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360,
    });
    console.log("server presigned url", presignedUrl);
    const res = {
      presignedUrl,
      key: uniqueIdentifier,
    };
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    NextResponse.json({ error: "Internal Server error" }, { status: 500 });
  }
}
