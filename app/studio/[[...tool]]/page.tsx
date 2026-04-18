'use client';

import nextDynamic from "next/dynamic";
import config from "@/sanity/sanity.config";

const NextStudio = nextDynamic(() => import("next-sanity/studio").then((m) => m.NextStudio), {
  ssr: false,
});

function isConfiguredSanityProjectId(id: string | undefined): boolean {
  if (!id?.trim()) return false;
  const t = id.trim().toLowerCase();
  if (t === "placeholder") return false;
  return /^[a-z0-9]{6,32}$/.test(t);
}

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  if (!isConfiguredSanityProjectId(projectId)) {
    return (
      <main className="min-h-dvh flex flex-col items-center justify-center gap-4 px-6 py-16 bg-surface-muted text-text-primary">
        <h1 className="text-xl font-semibold text-center">Chưa cấu hình Sanity Studio</h1>
        <p className="max-w-lg text-center text-text-secondary text-sm leading-relaxed">
          Biến môi trường <code className="text-text-primary font-mono text-xs">NEXT_PUBLIC_SANITY_PROJECT_ID</code> đang
          thiếu hoặc không hợp lệ, nên Studio báo lỗi &quot;Invalid project id&quot;. Tạo file{" "}
          <code className="text-text-primary font-mono text-xs">.env.local</code> ở thư mục gốc dự án và thêm ID
          project thật (chuỗi chữ thường và số, thường khoảng 8 ký tự) lấy từ{" "}
          <a
            className="text-primary underline underline-offset-2"
            href="https://www.sanity.io/manage"
            target="_blank"
            rel="noopener noreferrer"
          >
            sanity.io/manage
          </a>
          , rồi khởi động lại <code className="font-mono text-xs">npm run dev</code>.
        </p>
      </main>
    );
  }

  return (
    <NextStudio
      config={config}
      unstable__noScript={false}
    />
  );
}
