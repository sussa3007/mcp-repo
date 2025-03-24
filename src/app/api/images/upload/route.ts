import { NextRequest, NextResponse } from "next/server";
import { saveImageToServer } from "@/lib/image-service";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const subDirectory =
      request.nextUrl.searchParams.get("directory") || "uploads";

    const result = await saveImageToServer(formData, subDirectory);

    if (!result) {
      return NextResponse.json(
        { error: "이미지 업로드에 실패했습니다." },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("이미지 업로드 API 오류:", error);

    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
