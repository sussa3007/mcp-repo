import { NextRequest, NextResponse } from "next/server";
import { getImagesFromDirectory } from "@/lib/image-service";

export async function GET(request: NextRequest) {
  try {
    const directory =
      request.nextUrl.searchParams.get("directory") || "uploads";

    const images = await getImagesFromDirectory(directory);

    return NextResponse.json({
      success: true,
      images
    });
  } catch (error) {
    console.error("이미지 목록 로드 API 오류:", error);

    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
