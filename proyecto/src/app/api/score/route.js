
export async function GET(req) {// Obtener el username de la query string


    return new Response(JSON.stringify({ message: "Usuario no proporcionado." }))

};
