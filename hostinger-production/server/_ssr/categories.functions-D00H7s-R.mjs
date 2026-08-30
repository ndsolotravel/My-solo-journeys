import { c as createSsrRpc } from "./admin.functions-OVCuV9an.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BO6ULLpK.mjs";
import { o as objectType, s as stringType, n as numberType, e as enumType } from "../_libs/zod.mjs";
function slugify(text) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const listCategories = createServerFn({
  method: "GET"
}).handler(createSsrRpc("11f09a767096a7c8056f64f933b9d4604fa74357d694e1436af5782976dc3b74"));
const getCategoryBySlug = createServerFn({
  method: "GET"
}).validator((input) => objectType({
  slug: stringType().min(1)
}).parse(input)).handler(createSsrRpc("36c6a4e76a76bf4a189af9bbed4e4d6439e9a4acdb9c4f52ab791b173a03cbe1"));
const adminListCategories = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("85dbbed3f83f5c7974101e536e5abd4a20f4781da47096aacd133095d93fc1f1"));
const adminUpsertCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => objectType({
  id: stringType().optional(),
  name: stringType().min(1, "Category name is required").max(100),
  slug: stringType().max(100).optional(),
  description: stringType().max(500).optional().nullable(),
  image_url: stringType().optional().nullable(),
  status: enumType(["active", "inactive"]).default("active"),
  display_order: numberType().int().default(0),
  seo_title: stringType().max(200).optional().nullable(),
  seo_description: stringType().max(500).optional().nullable()
}).parse(input)).handler(createSsrRpc("4184e107b02cc5d3386f814d73d2a7f40796b5b94d0a73f13fa8faa643f6df33"));
const adminDeleteCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => objectType({
  id: stringType().min(1)
}).parse(input)).handler(createSsrRpc("1032c4f50ff9d1b08d12ac5e025fafed9684ba93d59634e544902732947b5f98"));
export {
  adminListCategories as a,
  adminUpsertCategory as b,
  adminDeleteCategory as c,
  getCategoryBySlug as g,
  listCategories as l,
  slugify as s
};
