"use client";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Input } from "./ui/input";
import debounce from "lodash.debounce";

type GifData = {
  type: string;
  id: string;
  url: string;
  username?: string;
  title: string;
  images: {
    original: {
      url: string;
    };
  };
};

type GifResData = {
  data: GifData[];
  pagination: {
    count: number;
    offset: number;
    total_count: number;
  };
};

const GiphyPage = () => {
  const LIMIT = 30;
  const [query, setQuery] = useState("");

  // Data Fetch
  const fetchGif = async (query: string, pageParam: number | undefined = 0): Promise<GifResData> => {
    const offset = pageParam || 0;
    const GIPHY_API = process.env.NEXT_PUBLIC_GIPHY_API;
    const GIPHY_TRENDING_URL = "https://api.giphy.com/v1/gifs/trending";
    const GIPHY_SEARCH_URL = "https://api.giphy.com/v1/gifs/search";
    try {
      let url = query
        ? `${GIPHY_SEARCH_URL}?api_key=${GIPHY_API}&q=${encodeURIComponent(query)}&limit=${LIMIT}&offset=${offset}&rating=g`
        : `${GIPHY_TRENDING_URL}?api_key=${GIPHY_API}&limit=${LIMIT}&offset=${offset}}&rating=g`;
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 429) {
        console.error("Rate limit exceeded. Please try again later");
      }
      throw new Error("Failed to fetch data");
    }
  };

  // Infinite Query
  const {
    data: infiniteQueryData,
    error,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery<GifResData>({
    queryKey: ["gif", query],
    queryFn: ({ pageParam }) => fetchGif(query, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const currentOffset = allPages.length * LIMIT;
      if (currentOffset < lastPage.pagination.total_count) {
        return currentOffset;
      }
      return undefined;
    },
  });

  // Load data when scrolling down
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetchingNextPage]);

  if (isFetching && infiniteQueryData?.pages.length === 0) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>{(error as Error).message}</h3>;
  }

  return (
    <div>
      <div className="w-full max-w-lg mx-auto mb-6">
      <Input
        type="text"
        placeholder="Search GIFs here..."
        onChange={debounce((e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
        }, 500)}
      />
      <div className="border-b-2 border-gray-300 mt-2"></div>
      </div>

      {/* Masonry layout container */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
        {infiniteQueryData?.pages.map((page, pageIndex) =>
          page.data.map((gif) => (
            <div
              key={`${gif.id}-${pageIndex}`}
              className="relative mb-4 break-inside-avoid overflow-hidden rounded-lg shadow-md group"
            >
              {/* GIF Image */}
              <Image
                src={gif.images.original.url}
                alt={gif.title}
                width={300}
                height={300}
                className="object-cover w-full h-auto"
                unoptimized
              />

              {/* Hover Overlay of GIF */}
              <div className="absolute bottom-0 left-0 bg-black/50 p-2 w-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-start text-white">
                <p className="text-sm font-bold">{gif.title || "No Title"}</p>
                <p className="text-xs">{gif.username || "Unknown"}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div ref={ref} className="py-5 text-center">
        {isFetchingNextPage && <h3>Loading More GIFs...</h3>}
      </div>
    </div>
  );
};

export default GiphyPage;