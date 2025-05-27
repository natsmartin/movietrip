"use client";

import React, { useState } from "react";
import ModalVideo from "react-modal-video";

const MovieTrailer = ({ movietrailer }: { movietrailer: any }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div
        className={
          isOpen
            ? "modal-video [&_iframe]:w-[320px] [&_iframe]:md:w-[100dvh] [&_iframe]:md:h-[50dvw]"
            : "hidden"
        }
      >
        <ModalVideo
          classNames={{
            modalVideo: "modal-video",
            modalVideoClose: "modal-video-close",
            modalVideoBody: "modal-video-body",
            modalVideoInner: "modal-video-inner",
            modalVideoIframeWrap: "modal-video-movie-wrap",
            modalVideoCloseBtn: "modal-video-close-btn",
            modalVideoEffect: "modal-video-effect",
          }}
          channel="youtube"
          youtube={{ mute: 1, autoplay: 1 }}
          isOpen={isOpen}
          videoId={movietrailer[0]?.key}
          onClose={() => setOpen(false)}
        />
      </div>

      <div className={`${!movietrailer.length ? "hidden" : ""}`}>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center bg-red-500 w-fit font-bold text-white p-2 rounded-md text-xs text-center md:text-base
            hover:opacity-80"
        >
          <svg
            className="w-6 h-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z"
            />
          </svg>
          Watch Trailer
        </button>
      </div>
    </>
  );
};

export default MovieTrailer;
