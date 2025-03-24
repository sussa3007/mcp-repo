This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

The project uses environment variables for configuration. Create a `.env.local` file in the root directory of the project with the following variables:

```
# API 기본 URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# 애플리케이션 환경
NEXT_PUBLIC_APP_ENV=development

# 이미지 베이스 URL (선택사항)
NEXT_PUBLIC_IMAGE_BASE_URL=/assets/images
```

For production deployment, set these environment variables in your hosting platform (e.g., Vercel).

### Environment Files

- `.env.local`: Local development overrides (not committed to git)
- `.env.development`: Development environment defaults
- `.env.production`: Production environment defaults
- `.env.test`: Testing environment defaults

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deployment

This project is deployed using GitHub Actions and Vercel.

### Setup Instructions

1. Add the following secrets to your GitHub repository:

- `VERCEL_TOKEN`: Vercel API token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID

2. Pushing to the main branch will automatically deploy to the Vercel production environment via GitHub Actions.
3. Creating a Pull Request will automatically generate a preview deployment.

### Local Development

```bash
# 개발 서버 실행
npm run dev

# 타입 체크
npm run type-check

# 린팅
npm run lint

# 빌드
npm run build
```
