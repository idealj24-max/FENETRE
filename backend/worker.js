
/**
 * FENÊTRE
 * Global Social Video Platform
 * Cloudflare Workers API
 * Version 1.0.0
 */

const VERSION = "1.0.0";

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: HEADERS
  });
}

function error(message, status = 400) {
  return json({
    success: false,
    error: message,
    service: "FENÊTRE"
  }, status);
}

async function readBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: HEADERS
    });
  }

  if (path === "/" && request.method === "GET") {
    return json({
      success: true,
      application: "FENÊTRE",
      message: "Bienvenue sur le serveur FENÊTRE.",
      version: VERSION,
      status: "online"
    });
  }

  if (path === "/api/health" && request.method === "GET") {
    return json({
      success: true,
      service: "fenetre-api",
      version: VERSION,
      status: "healthy",
      timestamp: new Date().toISOString()
    });
  }

  if (path === "/api" && request.method === "GET") {
    return json({
      success: true,
      name: "FENÊTRE API",
      version: VERSION,
      endpoints: [
        "GET /",
        "GET /api/health",
        "GET /api/feed",
        "POST /api/auth/register",
        "POST /api/auth/login",
        "POST /api/videos"
      ]
    });
  }

  if (path === "/api/feed" && request.method === "GET") {
    return json({
      success: true,
      videos: [],
      message: "Le flux vidéo sera connecté à la base de données."
    });
  }

  if (path === "/api/auth/register" &&
      request.method === "POST") {
    const body = await readBody(request);

    if (!body || !body.email || !body.password) {
      return error("Adresse email et mot de passe requis.");
    }

    return json({
      success: false,
      status: "not_configured",
      message: "Le système sécurisé d'inscription doit encore être connecté à la base de données."
    }, 501);
  }

  if (path === "/api/auth/login" &&
      request.method === "POST") {
    const body = await readBody(request);

    if (!body || !body.email || !body.password) {
      return error("Adresse email et mot de passe requis.");
    }

    return json({
      success: false,
      status: "not_configured",
      message: "Le système de connexion sécurisé sera activé après configuration de l'authentification."
    }, 501);
  }

  if (path === "/api/videos" &&
      request.method === "POST") {
    return json({
      success: false,
      status: "not_configured",
      message: "Le stockage vidéo et l'authentification doivent être configurés avant toute publication."
    }, 501);
  }

  return error("Route introuvable.", 404);
}

export default {
  async fetch(request, env, ctx) {
    try {
      return await handleRequest(request, env);
    } catch (err) {
      return json({
        success: false,
        error: "Erreur interne du serveur.",
        service: "FENÊTRE"
      }, 500);
    }
  }
};

