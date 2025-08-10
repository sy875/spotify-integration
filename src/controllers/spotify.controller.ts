import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { User } from "../models/user.models"; // adjust path as needed
import { ApiError } from "../utils/api-error";
import ApiResponse from "../utils/api-response";

export const getFollowedArtists = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const user = await User.findById(userId);

    if (!user?.spotifyAccessToken) {
      throw new ApiError(401, "Spotify not connected");
    }

    const spotifyResponse = await fetch(
      "https://api.spotify.com/v1/me/following?type=artist&limit=10",
      {
        headers: {
          Authorization: `Bearer ${user.spotifyAccessToken}`,
        },
      }
    );

    if (!spotifyResponse.ok) {
      throw new ApiError(400, "Failed to fetch followed artists");
    }

    const data = await spotifyResponse.json();
    return res.status(200).json(new ApiResponse(200, data, "Success"));
  }
);

export const stopCurrentPlayback = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const user = await User.findById(userId);

    if (!user?.spotifyAccessToken) {
      throw new ApiError(401, "Spotify not connected");
    }

    const response = await fetch("https://api.spotify.com/v1/me/player/pause", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.spotifyAccessToken}`,
      },
    });

    if (response.status === 204) {
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Playback stopped successfully"));
    } else {
      throw new ApiError(400, "Failed to stop playback");
    }
  }
);

export const startPlayingTopTrack = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const trackId = req.params.trackId;

    if (!trackId) {
      throw new ApiError(400, "Track ID is required");
    }

    const user = await User.findById(userId);

    if (!user?.spotifyAccessToken) {
      throw new ApiError(401, "Spotify not connected");
    }

    // Start playback for given track
    const response = await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.spotifyAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: [`spotify:track:${trackId}`],
      }),
    });

    if (response.status === 204) {
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Playback started successfully"));
    } else {
      throw new ApiError(400, "Failed to start playback");
    }
  }
);
