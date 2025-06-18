export const vercelGitCommitRef =
  process.env.VERCEL_GIT_COMMIT_REF ??
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF;
export const vercelEnv =
  process.env.VERCEL_ENV ?? process.env.NEXT_PUBLIC_VERCEL_ENV;
export const isDevelopment =
  process.env.NODE_ENV === 'development' || vercelEnv === 'development';
export const isPreview = vercelEnv === 'preview';
export const isProduction = vercelEnv === 'production';
export const isBeta = vercelGitCommitRef === 'dev';
export const isUat = vercelGitCommitRef === 'uat';
export const isProductionLike = isProduction || isUat;
/**
 * 实验性的环境
 * @description Indicates whether this feature is experimental.
 * @note This feature is under development and not yet production-ready.
 */
export const isExperimental = !isProductionLike;
export const domain = isProduction
  ? 'app.bedrock.technology'
  : isUat
  ? 'uat-app.bedrock.technology'
  : 'beta-app.bedrock.technology';
export const origin = `https://${domain}`;
