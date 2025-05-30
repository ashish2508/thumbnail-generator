"use server";

import AWS from "aws-sdk";
import { auth } from "@clerk/nextjs/server";
import { env } from "~/env";
import { format } from "date-fns";
import { redirect } from "next/navigation";

const s3 = new AWS.S3({
  accessKeyId: env.MY_AWS_ACCESS_KEY,
  secretAccessKey: env.MY_AWS_SECRET_KEY,
  region: env.MY_AWS_REGION,
});

export const getPresignedUrl = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const timestamp = format(new Date(), "yyyyMMddHHmmss");
  const key = `${userId}/${timestamp}.png`;

  const params = {
    Bucket: env.MY_AWS_BUCKET_NAME,
    Key: key,
    Expires: 60,
    ContentType: "image/png",
  };

  const uploadUrl = s3.getSignedUrl("putObject", params);

  return uploadUrl;
};

export const downloadS3File = async (url: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const key = url.replace(
    `https://${env.MY_AWS_BUCKET_NAME}.s3.${env.MY_AWS_REGION}.amazonaws.com/`,
    "",
  );

  const params = {
    Bucket: env.MY_AWS_BUCKET_NAME,
    Key: key,
    Expires: 3600,
    ResponseContentDisposition: 'attachment; filename="thumbnail.png"',
  };

  const downloadUrl = s3.getSignedUrl("getObject", params);

  redirect(downloadUrl);
};

