import { seedLists } from "@/actions/seed";

export async function GET() {
  const result = await seedLists();
  return Response.json(result);
}
