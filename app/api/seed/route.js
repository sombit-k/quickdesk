import { seedLists, seedTickets, seedCategories, seedUsers, seedAll } from "@/actions/seed";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';

    let result;

    switch (type) {
      case 'tickets':
        result = await seedTickets();
        break;
      case 'categories':
        result = await seedCategories();
        break;
      case 'users':
        result = await seedUsers();
        break;
      case 'lists':
        result = await seedLists();
        break;
      case 'all':
      default:
        result = await seedAll();
        break;
    }

    return Response.json(result);
  } catch (error) {
    console.error('Seeding API error:', error);
    return Response.json({
      success: false,
      message: 'Seeding failed',
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { type = 'all', options = {} } = body;

    let result;

    switch (type) {
      case 'tickets':
        result = await seedTickets(options);
        break;
      case 'categories':
        result = await seedCategories(options);
        break;
      case 'users':
        result = await seedUsers(options);
        break;
      case 'lists':
        result = await seedLists(options);
        break;
      case 'all':
      default:
        result = await seedAll(options);
        break;
    }

    return Response.json(result);
  } catch (error) {
    console.error('Seeding API error:', error);
    return Response.json({
      success: false,
      message: 'Seeding failed',
      error: error.message
    }, { status: 500 });
  }
}
