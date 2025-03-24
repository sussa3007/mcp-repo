"use server";

import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";

export type UploadedImage = {
  id: string;
  filename: string;
  path: string;
  size: number;
  type: string;
  width?: number;
  height?: number;
  createdAt: string;
};

// 이미지 업로드 처리 함수
export async function saveImageToServer(
  formData: FormData,
  subDirectory: string = "uploads"
): Promise<UploadedImage | null> {
  try {
    const file = formData.get("file") as File;
    if (!file) return null;

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}_${file.name.replace(/\s+/g, "_")}`;

    // 서버 이미지 저장 경로
    const publicDir = path.join(process.cwd(), "public");
    const imagesDir = path.join(publicDir, "images");
    const targetDir = path.join(imagesDir, subDirectory);

    // 디렉토리가 없으면 생성
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, filename);
    fs.writeFileSync(filePath, buffer);

    // 클라이언트측에서 참조할 경로
    const publicPath = `/images/${subDirectory}/${filename}`;

    const image: UploadedImage = {
      id: uuidv4(),
      filename,
      path: publicPath,
      size: file.size,
      type: file.type,
      createdAt: new Date().toISOString()
    };

    // 관련 경로 데이터 갱신
    revalidatePath("/");

    return image;
  } catch (error) {
    console.error("이미지 업로드 오류:", error);
    return null;
  }
}

// 서버에서 이미지 삭제
export async function deleteImageFromServer(
  imagePath: string
): Promise<boolean> {
  try {
    if (!imagePath.startsWith("/images/")) {
      return false;
    }

    // 경로 처리
    const relativePath = imagePath.replace("/images/", "");
    const fullPath = path.join(process.cwd(), "public", "images", relativePath);

    // 파일 존재 확인 및 삭제
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);

      // 관련 경로 데이터 갱신
      revalidatePath("/");

      return true;
    }

    return false;
  } catch (error) {
    console.error("이미지 삭제 오류:", error);
    return false;
  }
}

// 특정 폴더의 모든 이미지 가져오기
export async function getImagesFromDirectory(
  subDirectory: string = "uploads"
): Promise<UploadedImage[]> {
  try {
    const imagesDir = path.join(
      process.cwd(),
      "public",
      "images",
      subDirectory
    );

    // 디렉토리가 없으면 빈 배열 반환
    if (!fs.existsSync(imagesDir)) {
      return [];
    }

    const files = fs.readdirSync(imagesDir);

    const images: UploadedImage[] = files.map((filename) => {
      const filePath = path.join(imagesDir, filename);
      const stats = fs.statSync(filePath);

      return {
        id: filename.split("_")[0], // UUID 부분만 사용
        filename,
        path: `/images/${subDirectory}/${filename}`,
        size: stats.size,
        type: path.extname(filename).substring(1), // .jpg => jpg
        createdAt: stats.birthtime.toISOString()
      };
    });

    // 최신 이미지 순으로 정렬
    return images.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("이미지 조회 오류:", error);
    return [];
  }
}
