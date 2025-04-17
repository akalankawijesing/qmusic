"use client";

import { useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AlbumArtwork } from "@/components/album-artwork";
import { useMusicPlayer } from "@/context/MusicPlayerContext";

export interface Album {
  name: string;
  artist: string;
  cover: string;
  audio: string;
}

interface JamendoTrack {
  id: string;
  name: string;
  artist_name: string;
  image: string;
  audio: string;
}


export default function TopPicks() {
  const [topPicks, setTopPicks] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { loadPlaylist } = useMusicPlayer()

  useEffect(() => {
    async function fetchTopPicks() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.jamendo.com/v3.0/tracks/?client_id=${process.env.NEXT_PUBLIC_JAMENDO_CLIENT_ID}&format=jsonpretty&limit=8&include=musicinfo&order=popularity_total_desc&imagesize=600`
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        const formattedAlbums = data.results.map((item:JamendoTrack) => ({
          name: item.name,
          artist: item.artist_name,
          cover: item.image,
          audio: item.audio,
        }));

        console.log("Fetched top picks:", formattedAlbums);
        setTopPicks(formattedAlbums);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch top picks"
        );
        console.error("Error fetching top picks:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTopPicks();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Listen Now</h2>
          <p className="text-sm text-muted-foreground">
            Top picks for you. Updated daily.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        {isLoading ? (
          <p>Loading top picks...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : topPicks.length === 0 ? (
          <p>No top picks available right now.</p>
        ) : (
          <ScrollArea>
            <div className="flex space-x-4 pb-4">
              {topPicks.map((album, index) => (
                <button
                  key={album.name}
                  onClick={() =>
                    loadPlaylist(
                      topPicks.map((track) => ({
                        title: track.name,
                        artist: track.artist,
                        cover: track.cover,
                        url: track.audio,
                      })),
                      index
                    )
                  }
                >
                  <AlbumArtwork
                    album={album}
                    className="w-[250px]"
                    aspectRatio="portrait"
                    width={250}
                    height={330}
                  />
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    </>
  );
}
