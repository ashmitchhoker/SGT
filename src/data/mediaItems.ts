export interface MediaItem {
  type: "image" | "video";
  src: string;
  caption: string;
  answer: boolean;
  explanation?: string;
}

export const mediaItems: MediaItem[] = [
  // Videos (12 total)
  {
    type: "video",
    src: "/videos/1.mp4",
    caption: "Cybersecurity Dashboard",
    answer: false,
  },
  {
    type: "video",
    src: "/videos/2.mp4",
    caption: "Hacking Attempt Visualization",
    answer: true,
  },
  {
    type: "video",
    src: "/videos/3.mp4",
    caption: "Ganesh",
    answer: true,
  },
  {
    type: "video",
    src: "/videos/4.mp4",
    caption: "Animation Sample",
    answer: false,
  },
  {
    type: "video",
    src: "/videos/5.mp4",
    caption: "Data Privacy Concept",
    answer: true,
  },
  {
    type: "video",
    src: "/videos/6.mp4",
    caption: "Code on Screen",
    answer: false,
  },
  {
    type: "video",
    src: "/videos/7.mp4",
    caption: "Digital Security Lock",
    answer: false,
  },
  {
    type: "video",
    src: "/videos/8.mp4",
    caption: "Anonymous Hacker",
    answer: true,
  },
  {
    type: "video",
    src: "/videos/9.mp4",
    caption: "Matrix Style Code",
    answer: false,
  },
  {
    type: "video",
    src: "/videos/10.mp4",
    caption: "Technology and Security",
    answer: false,
  },
  {
    type: "video",
    src: "/videos/11.mp4",
    caption: "Security Awareness",
    answer: false,
  },
  {
    type: "video",
    src: "/videos/12.mp4",
    caption: "Randi Saali Hatt",
    answer: true,
  },
  // Images (39 placeholders - replace with actual image paths)
  {
    type: "image",
    src: "/images/1.jpeg",
    caption: "Image 1",
    answer: true,
  },
  {
    type: "image",
    src: "/images/2.jpg",
    caption: "Image 2",
    answer: false,
  },
  {
    type: "image",
    src: "/images/3.jpeg",
    caption: "Image 3",
    answer: true,
  },
  {
    type: "image",
    src: "/images/4.jpg",
    caption: "fair and lovely 4",
    answer: true,
  },
  // {
  //   type: "image",
  //   src: "/images/image5.jpg",
  //   caption: "Image 5",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image6.jpg",
  //   caption: "Image 6",
  //   answer: true,
  // },
  // {
  //   type: "image",
  //   src: "/images/image7.jpg",
  //   caption: "Image 7",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image8.jpg",
  //   caption: "Image 8",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image9.jpg",
  //   caption: "Image 9",
  //   answer: true,
  // },
  // {
  //   type: "image",
  //   src: "/images/image10.jpg",
  //   caption: "Image 10",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image11.jpg",
  //   caption: "Image 11",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image12.jpg",
  //   caption: "Image 12",
  //   answer: true,
  // },
  // {
  //   type: "image",
  //   src: "/images/image13.jpg",
  //   caption: "Image 13",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image14.jpg",
  //   caption: "Image 14",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image15.jpg",
  //   caption: "Image 15",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image16.jpg",
  //   caption: "Image 16",
  //   answer: true,
  // },
  // {
  //   type: "image",
  //   src: "/images/image17.jpg",
  //   caption: "Image 17",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image18.jpg",
  //   caption: "Image 18",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image19.jpg",
  //   caption: "Image 19",
  //   answer: true,
  // },
  // {
  //   type: "image",
  //   src: "/images/image20.jpg",
  //   caption: "Image 20",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image21.jpg",
  //   caption: "Image 21",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image22.jpg",
  //   caption: "Image 22",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image23.jpg",
  //   caption: "Image 23",
  //   answer: true,
  // },
  // {
  //   type: "image",
  //   src: "/images/image24.jpg",
  //   caption: "Image 24",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image25.jpg",
  //   caption: "Image 25",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image26.jpg",
  //   caption: "Image 26",
  //   answer: true,
  // },
  // {
  //   type: "image",
  //   src: "/images/image27.jpg",
  //   caption: "Image 27",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image28.jpg",
  //   caption: "Image 28",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image29.jpg",
  //   caption: "Image 29",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image30.jpg",
  //   caption: "Image 30",
  //   answer: true,
  // },
  // {
  //   type: "image",
  //   src: "/images/image31.jpg",
  //   caption: "Image 31",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image32.jpg",
  //   caption: "Image 32",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image33.jpg",
  //   caption: "Image 33",
  //   answer: true,
  // },
  // {
  //   type: "image",
  //   src: "/images/image34.jpg",
  //   caption: "Image 34",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image35.jpg",
  //   caption: "Image 35",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image36.jpg",
  //   caption: "Image 36",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image37.jpg",
  //   caption: "Image 37",
  //   answer: true,
  // },
  // {
  //   type: "image",
  //   src: "/images/image38.jpg",
  //   caption: "Image 38",
  //   answer: false,
  // },
  // {
  //   type: "image",
  //   src: "/images/image39.jpg",
  //   caption: "Image 39",
  //   answer: false,
  // },
];
