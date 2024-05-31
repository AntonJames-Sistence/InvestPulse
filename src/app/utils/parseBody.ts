export async function parseBody(req: Request): Promise<any> {
    const contentType = req.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await req.json();
    }
    return null;
}