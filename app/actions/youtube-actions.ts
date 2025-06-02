"use server"

import { type Module, type VideoItem, organizeVideosByModules } from "@/lib/youtube-service"

// Constantes
const PLAYLIST_ID = "PL6XU0y2YUMZLpIsO63P_E6w4OCY8Y467m"
const CACHE_DURATION = 3600000 // 1 hora em milissegundos

// Dados de fallback para quando a API falha
const FALLBACK_DATA: Module[] = [
  {
    title: "Módulo 1: Introdução ao Trading",
    videos: [
      {
        id: "sample1",
        title: "Introdução ao Bootcamp MoreThanMoney",
        description: "Visão geral do bootcamp e o que você vai aprender.",
        thumbnail: "/placeholder-ckgdy.png",
        position: 0,
        publishedAt: new Date().toISOString(),
      },
      {
        id: "sample2",
        title: "Fundamentos do Mercado Financeiro",
        description: "Conceitos básicos que todo trader precisa conhecer.",
        thumbnail: "/placeholder-ckgdy.png",
        position: 1,
        publishedAt: new Date().toISOString(),
      },
    ],
  },
]

// Cache para armazenar os dados da playlist (no servidor)
let playlistCache: {
  data: Module[] | null
  timestamp: number
} = {
  data: null,
  timestamp: 0,
}

// Função para buscar os dados da playlist (executada no servidor)
export async function fetchPlaylistData(forceRefresh = false): Promise<Module[]> {
  const now = Date.now()

  // Verifica se há dados em cache e se ainda são válidos
  if (!forceRefresh && playlistCache.data && now - playlistCache.timestamp < CACHE_DURATION) {
    return playlistCache.data
  }

  try {
    // Obtém a chave da API do ambiente do servidor (NUNCA exposta ao cliente)
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

    if (!YOUTUBE_API_KEY) {
      console.error("Chave da API do YouTube não configurada no servidor")
      return FALLBACK_DATA
    }

    // Busca os itens da playlist
    const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Erro na API do YouTube (${response.status}): ${errorText}`)

      // Se houver dados em cache, retorna-os mesmo que estejam expirados
      if (playlistCache.data) {
        return playlistCache.data
      }

      return FALLBACK_DATA
    }

    const data = await response.json()

    // Verifica se a resposta contém os itens esperados
    if (!data.items || !Array.isArray(data.items)) {
      console.error("Formato de resposta da API do YouTube inesperado:", data)
      return playlistCache.data || FALLBACK_DATA
    }

    // Processa os itens da playlist
    const videos: VideoItem[] = data.items.map((item: any, index: number) => ({
      id: item.snippet?.resourceId?.videoId || `unknown-${index}`,
      title: item.snippet?.title || `Vídeo ${index + 1}`,
      description: item.snippet?.description || "",
      thumbnail:
        item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || "/placeholder-ckgdy.png",
      position: item.snippet?.position !== undefined ? item.snippet.position : index,
      publishedAt: item.snippet?.publishedAt || new Date().toISOString(),
    }))

    // Organiza os vídeos em módulos
    const modules = organizeVideosByModules(videos)

    // Atualiza o cache
    playlistCache = {
      data: modules,
      timestamp: now,
    }

    return modules
  } catch (error) {
    console.error("Erro ao buscar dados da playlist:", error)

    // Se houver dados em cache, retorna-os mesmo que estejam expirados
    if (playlistCache.data) {
      return playlistCache.data
    }

    // Caso contrário, retorna dados de fallback
    return FALLBACK_DATA
  }
}

// Função para buscar a imagem de capa da playlist (executada no servidor)
export async function fetchPlaylistThumbnail(): Promise<string> {
  try {
    // Obtém a chave da API do ambiente do servidor (NUNCA exposta ao cliente)
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

    if (!YOUTUBE_API_KEY) {
      console.error("Chave da API do YouTube não configurada no servidor")
      return "/placeholder-ckgdy.png"
    }

    const apiUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      console.error(`Erro ao buscar thumbnail (${response.status}): ${await response.text()}`)
      return "/placeholder-ckgdy.png"
    }

    const data = await response.json()

    if (data.items && data.items.length > 0 && data.items[0].snippet && data.items[0].snippet.thumbnails) {
      const thumbnails = data.items[0].snippet.thumbnails
      return (
        thumbnails.maxres?.url ||
        thumbnails.high?.url ||
        thumbnails.medium?.url ||
        thumbnails.default?.url ||
        "/placeholder-ckgdy.png"
      )
    }

    return "/placeholder-ckgdy.png"
  } catch (error) {
    console.error("Erro ao buscar thumbnail da playlist:", error)
    return "/placeholder-ckgdy.png"
  }
}
